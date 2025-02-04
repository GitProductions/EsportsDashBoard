const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');

const validateGameConfigsFolder = () => {
    try {
        const baseFolder = path.join(__dirname, '..', '..', 'Game Configs');
        const assetsFolder = path.join(baseFolder, 'assets');

        if (!fs.existsSync(baseFolder)) {
            console.error('Error: Game Configs folder not found');
            return false;
        }

        if (!fs.existsSync(assetsFolder)) {
            console.error('Error: assets folder not found in Game Configs');
            return false;
        }

        console.log('✓ Game Configs folder structure validated');
        return assetsFolder;
    } catch (error) {
        console.error('Error validating folder structure:', error);
        return false;
    }
};

const findXamlInConfigFolder = (gameFolderPath) => {
    try {
        const configFolders = fs.readdirSync(gameFolderPath)
            .filter(item => {
                const fullPath = path.join(gameFolderPath, item);
                return fs.statSync(fullPath).isDirectory();
            });

        // Find first config folder with XAML
        for (const configFolder of configFolders) {
            const fullConfigPath = path.join(gameFolderPath, configFolder);
            const files = fs.readdirSync(fullConfigPath);
            if (files.some(file => path.extname(file).toLowerCase() === '.xaml')) {
                return fullConfigPath;
            }
        }

        return null;
    } catch (error) {
        console.error(`Error searching for XAML in ${gameFolderPath}:`, error);
        return null;
    }
};
const getXamlInfo = (folderPath) => {
    try {
        const files = fs.readdirSync(folderPath);
        console.log(`Searching for XAML in: ${folderPath}`);
        
        const xamlFile = files.find(file => path.extname(file).toLowerCase() === '.xaml');
        if (!xamlFile) return null;
        
        console.log(`Found XAML file: ${xamlFile}`);
        const xamlPath = path.join(folderPath, xamlFile);
        const xamlContent = fs.readFileSync(xamlPath, 'utf8');
        
        // Updated regex patterns to match XML format
        const idMatch = xamlContent.match(/<id>([^<]+)<\/id>/);
        const versionMatch = xamlContent.match(/<version>([^<]+)<\/version>/);
        
        const info = {
            id: idMatch ? idMatch[1] : 'unknown',
            version: versionMatch ? versionMatch[1] : '1.0'
        };
        
        console.log('XAML Info:', info);
        return info;
    } catch (error) {
        console.error('Error reading XAML file:', error);
        return {
            id: 'error',
            version: '1.0'
        };
    }
};

const zipGameConfigs = async () => {
    try {
        const assetsFolder = validateGameConfigsFolder();
        if (!assetsFolder) {
            console.error('Aborting zip process');
            return;
        }

        // Get all game folders
        const gameFolders = fs.readdirSync(assetsFolder)
            .filter(item => {
                const fullPath = path.join(assetsFolder, item);
                return fs.statSync(fullPath).isDirectory();
            });

        // Process each game folder
        for (const gameFolder of gameFolders) {
            const fullGamePath = path.join(assetsFolder, gameFolder);
            const configFolderWithXaml = findXamlInConfigFolder(fullGamePath);

            if (configFolderWithXaml) {
                const xamlInfo = getXamlInfo(configFolderWithXaml);
                if (!xamlInfo) continue;

                const zip = new JSZip();

                // this is how we probably should package it but need to change things in app first..
                // currently in app we make a folder for it based on name,author,version 
                // but using the ID as shown here is better
                
                // const gameConfigZip = zip.folder(path.basename(configFolderWithXaml));


                // Recursively add all files and subdirectories
                const addToZip = (sourcePath, zipFolder) => {
                    const files = fs.readdirSync(sourcePath);

                    for (const file of files) {
                        const fullFilePath = path.join(sourcePath, file);
                        const stats = fs.statSync(fullFilePath);

                        if (stats.isDirectory()) {
                            const subFolder = zipFolder.folder(file);
                            addToZip(fullFilePath, subFolder);
                        } else {
                            const fileContent = fs.readFileSync(fullFilePath);
                            zipFolder.file(file, fileContent);
                        }
                    }
                };

                // Add all contents of the config folder to the zip
                addToZip(configFolderWithXaml, zip);

                // Generate and save the zip file
                const zipContent = await zip.generateAsync({ type: 'nodebuffer' });
                const fileName = `${xamlInfo.id}_v${xamlInfo.version}.zip`;
                const outputPath = path.join(__dirname, fileName);
                fs.writeFileSync(outputPath, zipContent);
                console.log(`Zip file created: ${fileName}`);
            
            }
        }

        console.log('Zip process completed');
    } catch (error) {
        console.error('Error during zip creation:', error);
    }
};

zipGameConfigs();