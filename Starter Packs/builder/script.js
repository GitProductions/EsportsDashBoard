const githubRepoPath = "https://api.github.com/repos/GitProductions/EsportsDashBoard/contents";
const GITHUB_RAW_URL = "https://raw.githubusercontent.com/GitProductions/EsportsDashBoard/main";

const globalConfigURL = `${githubRepoPath}/globalConfig.json`;

// On page load, fetch globalConfig and populate the select elements
window.onload = async function() {
    try {
        const globalConfigResponse = await fetch(globalConfigURL);
        const globalConfigData = await globalConfigResponse.json();
        let globalConfig = decodeBase64(globalConfigData.content); // Decode base64-encoded content

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
        opt.value = option.fileName; // Use fileName as the value
        opt.text = `${option.name} v${option.version} by ${option.author}`;
        select.add(opt);
    });
}

function decodeBase64(base64) {
    const decodedStr = atob(base64);
    return JSON.parse(decodedStr); 
}

const JSZip = window.JSZip; 

async function fetchFolderContents(folderKey) {
    const folderURL = `${githubRepoPath}/${folderKey}`;
    const response = await fetch(folderURL);
    if (!response.ok) {
        throw new Error(`Failed to fetch folder contents: ${folderKey}`);
    }
    return response.json(); 
}

document.getElementById('generateZip').addEventListener('click', async () => {
    const htmlPackKey = document.getElementById('htmlPack').value;
    const gameConfigKey = document.getElementById('gameConfig').value;
    const baseURL = document.getElementById('baseURL').value;
    const configName = document.getElementById('configName').value;
    const configAuthor = document.getElementById('configAuthor').value;
    const configVersion = document.getElementById('configVersion').value;
    const pathToReplace = document.getElementById('pathToReplace').value;

    const zip = new JSZip();
    const statusElement = document.getElementById('status');

    // Helper function to recursively fetch files from a directory
    async function fetchDirectoryContents(path, parentFolder) {
        const contents = await fetchFolderContents(path);
        
        for (const item of contents) {
            const fullPath = `${GITHUB_RAW_URL}/${item.path}`;
            
            if (item.type === 'file') {
                const response = await fetch(fullPath);
                if (!response.ok) {
                    throw new Error(`Failed to fetch file: ${item.path}`);
                }
                const blob = await response.blob();

                // Get the file path relative to the /raw/ directory
                const pathParts = item.path.split('/');
                const rawIndex = pathParts.indexOf('html');
                const relativePath = pathParts.slice(rawIndex + 1).join('/');

                // Add file to the html folder maintaining subfolder structure
                parentFolder.file(relativePath, blob);
                statusElement.innerText = `Added ${relativePath} to html folder`;
            } else if (item.type === 'dir') {
                // Recursively process subdirectories
                await fetchDirectoryContents(item.path, parentFolder);
            }
        }
    }

    try {
        const mainFolder = zip.folder(`${configName}_v${configVersion}`);
        const htmlFolder = mainFolder.folder('html');

        // First fetch the obsconfig.json from the HTML pack directory
        const obsConfigURL = `${GITHUB_RAW_URL}/${htmlPackKey}/obsConfig.json`;
        try {
            const obsConfigResponse = await fetch(obsConfigURL);
            if (obsConfigResponse.ok) {
                const obsConfigBlob = await obsConfigResponse.blob();
                mainFolder.file('obsConfig.json', obsConfigBlob);
                statusElement.innerText = 'Added obsConfig.json';
            } else {
                throw new Error('Failed to fetch obsConfig.json');
            }
        } catch (error) {
            alert("Warning: Could not fetch obsConfig.json: " + error);
            statusElement.innerText = "Warning: Missing obsConfig.json";
        }

        // Fetch all HTML files recursively from raw directory
        statusElement.innerText = `Fetching contents of ${htmlPackKey}/html/...`;
        await fetchDirectoryContents(`${htmlPackKey}/html`, htmlFolder);

        // Handle game config file - place in root folder
        const gameConfigURL = `${GITHUB_RAW_URL}/${gameConfigKey}`;
        const gameConfigResponse = await fetch(gameConfigURL);
        if (!gameConfigResponse.ok) {
            throw new Error(`Failed to fetch file: ${gameConfigKey}`);
        }
        const gameConfigBlob = await gameConfigResponse.blob();
        mainFolder.file(gameConfigKey.split('/').pop(), gameConfigBlob);

        // Add config.ini to root folder
        const configIni = `name=${configName}\nauthor=${configAuthor}\nversion=${configVersion}\npathToReplace=${pathToReplace}`;
        mainFolder.file('config.ini', configIni);

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
});