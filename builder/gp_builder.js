import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import JSZip from 'jszip';
import { dirname } from 'path';
import inquirer from 'inquirer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class GameConfigPacker {
    constructor() {
        this.baseFolder = path.join(__dirname, '..', 'Game Configs');
        this.assetsFolder = path.join(this.baseFolder, 'assets');
        this.requiredXamlKeys = ['id', 'game', 'version', 'author'];
    }

    async validateFolderStructure() {
        try {
            await fs.access(this.baseFolder);
            await fs.access(this.assetsFolder);
            return true;
        } catch (error) {
            throw new Error(`Invalid folder structure: ${error.message}`);
        }
    }

    async getAvailableGames() {
        const items = await fs.readdir(this.assetsFolder, { withFileTypes: true });
        return items.filter(item => item.isDirectory()).map(dir => dir.name);
    }

    async findConfigFoldersWithXaml(gameFolderPath) {
        const items = await fs.readdir(gameFolderPath, { withFileTypes: true });
        const configFolders = items.filter(item => item.isDirectory());

        for (const folder of configFolders) {
            const fullPath = path.join(gameFolderPath, folder.name);
            const files = await fs.readdir(fullPath);
            if (files.some(file => path.extname(file).toLowerCase() === '.xaml')) {
                return fullPath;
            }
        }
        return null;
    }

    async validateXamlContent(xamlContent) {
        const validationResults = {};
        
        for (const key of this.requiredXamlKeys) {
            const match = xamlContent.match(new RegExp(`<${key}>([^<]+)</${key}>`));
            if (!match) {
                throw new Error(`Missing required key: ${key}`);
            }
            validationResults[key] = match[1];
        }
        
        return validationResults;
    }

    async extractXamlInfo(folderPath) {
        const files = await fs.readdir(folderPath);
        const xamlFile = files.find(file => path.extname(file).toLowerCase() === '.xaml');
        
        if (!xamlFile) return null;
        
        const xamlPath = path.join(folderPath, xamlFile);
        const xamlContent = await fs.readFile(xamlPath, 'utf8');
        
        try {
            return await this.validateXamlContent(xamlContent);
        } catch (error) {
            console.error(`Invalid XAML in ${xamlFile}: ${error.message}`);
            return null;
        }
    }

    async addFolderToZip(sourcePath, zipFolder) {
        const files = await fs.readdir(sourcePath, { withFileTypes: true });
        for (const file of files) {
            const fullPath = path.join(sourcePath, file.name);
            if (file.isDirectory()) {
                const subFolder = zipFolder.folder(file.name);
                await this.addFolderToZip(fullPath, subFolder);
            } else {
                const content = await fs.readFile(fullPath);
                zipFolder.file(file.name, content);
            }
        }
    }

    async packSingleConfig(gameFolder) {
        const gamePath = path.join(this.assetsFolder, gameFolder);
        const configPath = await this.findConfigFoldersWithXaml(gamePath);

        if (!configPath) {
            console.error(`No valid config found for ${gameFolder}`);
            return;
        }

        const xamlInfo = await this.extractXamlInfo(configPath);
        if (!xamlInfo) return;

        const zip = new JSZip();
        await this.addFolderToZip(configPath, zip);

        const zipContent = await zip.generateAsync({ type: 'nodebuffer' });
        const fileName = `${xamlInfo.id}_v${xamlInfo.version}.bgg`;
        const outputPath = path.join(__dirname, fileName);
        
        await fs.writeFile(outputPath, zipContent);
        console.log(`Created: ${fileName}`);
    }

    async packConfigs() {
        try {
            await this.validateFolderStructure();
            const games = await this.getAvailableGames();

            const { packChoice } = await inquirer.prompt([{
                type: 'list',
                name: 'packChoice',
                message: 'What would you like to pack?',
                choices: [
                    'All Configs',
                    'Single Config'
                ]
            }]);

            if (packChoice === 'Single Config') {
                const { selectedGame } = await inquirer.prompt([{
                    type: 'list',
                    name: 'selectedGame',
                    message: 'Select a game:',
                    choices: games
                }]);
                await this.packSingleConfig(selectedGame);
            } else {
                for (const game of games) {
                    await this.packSingleConfig(game);
                }
            }
        } catch (error) {
            console.error(`Failed to pack configs: ${error.message}`);
            process.exit(1);
        }
    }
}

const main = async () => {
    const packer = new GameConfigPacker();
    await packer.packConfigs();
};

main();