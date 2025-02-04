// THIS NEEDS AN ENTIRE RE-WORK FROM THE GROUND UP.. STEP BY STEP and SEPERATE the logic 
// Must validate all aspects and assure proper formatting and error handling




const globalConfigURL = '../../globalConfig.json';

// On page load, fetch globalConfig and populate the select elements
window.onload = async function() {
    try {
        const globalConfigResponse = await fetch(globalConfigURL);
        if (!globalConfigResponse.ok) {
            throw new Error(`Failed to fetch global config: ${globalConfigResponse.statusText}`);
        }
        const globalConfig = await globalConfigResponse.json();

        console.log(globalConfig['HTML Packs']);

        populateGameSelect(globalConfig);
    } catch (error) {
        alert("Failed to load global config: " + error);
    }
};

// Populate game dropdown with options
function populateGameSelect(globalConfig) {
    const gameSelect = document.getElementById('gameSelect');
    const games = Object.keys(globalConfig["HTML Packs"]);

    games.forEach(game => {
        const opt = document.createElement('option');
        opt.value = game;
        opt.text = game;
        gameSelect.add(opt);
    });

    // Add event listener to populate HTML packs and game configs based on selected game
    gameSelect.addEventListener('change', function() {
        const selectedGame = gameSelect.value;
        populateSelect('htmlPack', globalConfig["HTML Packs"][selectedGame]);
        populateSelect('gameConfig', globalConfig["Game Configs"][selectedGame]);
    });
}

// Populate dropdown with options
function populateSelect(id, options) {
    const select = document.getElementById(id);
    select.innerHTML = ''; // Clear existing options

    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = JSON.stringify(option); // Use the entire option object as the value
        opt.text = `${option.name} (Author: ${option.author}, Version: ${option.version})`; // Include author and version in the text
        select.add(opt);
    });
}





const JSZip = window.JSZip;

async function fetchLocalFile(filePath) {
    const response = await fetch(filePath);
    if (!response.ok) {
        throw new Error(`Failed to fetch file: ${filePath}`);
    }
    return response.blob();
}

async function fetchDirectoryContents(path, parentFolder, statusElement) {

    console.log(`fetching directory contents: ${path}, parentFolder: ${parentFolder}, statusElement: ${statusElement}`);
    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`Failed to fetch directory contents: ${path}`);
        }
        const contents = await response.json();
        
        for (const item of contents) {
            const fullPath = `${path}/${item.name}`;
            
            if (item.type === 'file') {
                const blob = await fetchLocalFile(fullPath);

                // Get the file path relative to the directory
                const relativePath = fullPath.replace(/^.*[\\\/]/, '');

                // Add file to the html folder maintaining subfolder structure
                parentFolder.file(relativePath, blob);
                statusElement.innerText = `Added ${relativePath} to html folder`;
            } else if (item.type === 'dir') {
                // Recursively process subdirectories
                const subFolder = parentFolder.folder(item.name);
                await fetchDirectoryContents(fullPath, subFolder, statusElement);
            }
        }
    } catch (error) {
        console.error(`Error fetching directory contents: ${error}`);
    }
}

async function addObsConfig(mainFolder, htmlPack, statusElement) {
    const obsConfigURL = `../../${htmlPack.folderPath}/obsConfig.json`;
    try {
        const obsConfigBlob = await fetchLocalFile(obsConfigURL);
        mainFolder.file('obsConfig.json', obsConfigBlob);
        statusElement.innerText = 'Added obsConfig.json';
    } catch (error) {
        alert("Warning: Could not fetch obsConfig.json: " + error);
        statusElement.innerText = "Warning: Missing obsConfig.json";
    }
}

async function addGameConfig(mainFolder, gameConfig) {
    const gameConfigURL = `../../${gameConfig.folderPath}/${gameConfig.fileName}`;
    const gameConfigBlob = await fetchLocalFile(gameConfigURL);
    mainFolder.file(gameConfig.fileName, gameConfigBlob);
}

function addConfigIni(mainFolder, configName, configAuthor, configVersion, pathToReplace) {
    const configIni = `name=${configName}\nauthor=${configAuthor}\nversion=${configVersion}\npathToReplace=${pathToReplace}`;
    mainFolder.file('config.ini', configIni);
}

async function generateZip() {
    const htmlPack = JSON.parse(document.getElementById('htmlPack').value);
    const gameConfig = JSON.parse(document.getElementById('gameConfig').value);
    const configName = document.getElementById('configName').value;
    const configAuthor = document.getElementById('configAuthor').value;
    const configVersion = document.getElementById('configVersion').value;
    const pathToReplace = document.getElementById('pathToReplace').value;

    const zip = new JSZip();
    const statusElement = document.getElementById('status');

    try {
        const mainFolder = zip.folder(`${gameConfig.fileName.replace('.bgg','')}`);
        const htmlFolder = mainFolder.folder('html');

        // Add obsconfig.json
        await addObsConfig(mainFolder, htmlPack, statusElement);

        // Fetch all HTML files recursively from the local directory
        statusElement.innerText = `Fetching contents of ../../${htmlPack.folderPath}/html/...`;
        await fetchDirectoryContents(`../../${htmlPack.folderPath}/html`, htmlFolder, statusElement);

        // Add game config file
        await addGameConfig(mainFolder, gameConfig);

        // Add config.ini to root folder
        addConfigIni(mainFolder, configName, configAuthor, configVersion, pathToReplace);

        // Generate zip file
        statusElement.innerText = "Generating zip file...";
        const content = await zip.generateAsync({ type: "blob" });

        const a = document.createElement('a');
        a.href = URL.createObjectURL(content);
        a.download = `${configName}_v${configVersion}.bggstarter`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href);

        statusElement.innerText = "Download complete!";
    } catch (error) {
        alert("Error generating starter pack: " + error);
        statusElement.innerText = "Error occurred!";
    }
}

document.getElementById('generateZip').addEventListener('click', generateZip);