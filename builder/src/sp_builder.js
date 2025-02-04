#!/usr/bin/env node

//  ----------------------------------------
//  Purpose: This script is used to generate a starter pack for the EsportsDashBoard application.
//  Usage: Run the script and follow the prompts to select a game, HTML pack, and game config.
//  The script will then generate a starter pack based on the selected options.
//  ----------------------------------------

import inquirer from 'inquirer';
import { promises as fs } from 'fs';
import path from 'path';
import JSZip from 'jszip';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const __root = path.join(__dirname, '..', '..')


class StarterPackBuilder {
    constructor() {
        this.globalConfig = null;
    }

    async loadGlobalConfig() {
        try {
            const config = await fs.readFile(path.join(__root, 'globalConfig.json'), 'utf8');
            this.globalConfig = JSON.parse(config);
        } catch (error) {
            throw new Error(`Failed to load global config: ${error.message}`);
        }
    }

    async promptUserChoices() {
        const games = Object.keys(this.globalConfig["HTML Packs"]);
        
        const { selectedGame } = await inquirer.prompt([{
            type: 'list',
            name: 'selectedGame',
            message: 'Select a game:',
            choices: games
        }]);

        const htmlPacks = this.globalConfig["HTML Packs"][selectedGame];
        const { htmlPack } = await inquirer.prompt([{
            type: 'list',
            name: 'htmlPack',
            message: 'Select HTML Pack:',
            choices: htmlPacks.map(pack => ({
                name: `${pack.name} (Author: ${pack.author}, Version: ${pack.version})`,
                value: pack
            }))
        }]);

        const gameConfigs = this.globalConfig["Game Configs"][selectedGame];
        const { gameConfig } = await inquirer.prompt([{
            type: 'list',
            name: 'gameConfig',
            message: 'Select Game Config:',
            choices: gameConfigs.map(config => ({
                name: `${config.name} (Author: ${config.author}, Version: ${config.version})`,
                value: config
            }))
        }]);

        const configDetails = await inquirer.prompt([
            {
                type: 'input',
                name: 'configName',
                message: 'Enter config name:',
                default: htmlPack.name
            },
            {
                type: 'input',
                name: 'configAuthor',
                message: 'Enter config author:',
                default: 'EsportsDash'
            },
            {
                type: 'input',
                name: 'configVersion',
                message: 'Enter config version:',
                default: '1.0.0'
            },
            {
                type: 'input',
                name: 'pathToReplace',
                message: 'Enter path to replace:',
                default: 'C:/Users/GitPC/Documents/GitHub/EsportsDashBoard/HTML Packs/Overwatch-BGG/raw/'
            }
        ]);

        return {
            htmlPack,
            gameConfig,
            ...configDetails
        };
    }

    async addDirectoryToZip(dirPath, zipFolder) {
        const files = await fs.readdir(dirPath, { withFileTypes: true });
        
        for (const file of files) {
            const fullPath = path.join(dirPath, file.name);
            
            if (file.isDirectory()) {
                const newZipFolder = zipFolder.folder(file.name);
                await this.addDirectoryToZip(fullPath, newZipFolder);
            } else {
                const content = await fs.readFile(fullPath);
                zipFolder.file(file.name, content);
            }
        }
    }

    async generateStarterPack(choices) {
        const zip = new JSZip();

        const mainFolder = zip.folder(`${choices.configName}_v${choices.configVersion}`, )
        const htmlFolder = mainFolder.folder('html');

        try {
            const obsConfigPath = path.join(__root, choices.htmlPack.folderPath, 'obsConfig.json');
            const obsConfig = await fs.readFile(obsConfigPath);
            mainFolder.file('obsConfig.json', obsConfig);

            const htmlPath = path.join(__root, choices.htmlPack.folderPath, 'html');
            await this.addDirectoryToZip(htmlPath, htmlFolder);

            const gameConfigPath = path.join(__root, choices.gameConfig.folderPath, choices.gameConfig.fileName);
            const gameConfig = await fs.readFile(gameConfigPath);
            mainFolder.file(choices.gameConfig.fileName, gameConfig);

            const configIni = `name=${choices.configName}\nauthor=${choices.configAuthor}\nversion=${choices.configVersion}\npathToReplace=${choices.pathToReplace}`;
            mainFolder.file('config.ini', configIni);

            const content = await zip.generateAsync({ type: 'nodebuffer' });
            const outputPath = `output/${choices.configName}_v${choices.configVersion}.bggstarter`;
            await fs.writeFile(outputPath, content);
            
            console.log(`Successfully created starter pack: ${outputPath}`);
        } catch (error) {
            throw new Error(`Failed to generate starter pack: ${error.message}`);
        }
    }
}

const main = async () => {
    try {
        const builder = new StarterPackBuilder();
        await builder.loadGlobalConfig();
        const choices = await builder.promptUserChoices();
        await builder.generateStarterPack(choices);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
};

main();