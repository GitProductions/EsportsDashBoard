#!/usr/bin/env node

//  ----------------------------------------
//  Purpose: This script is used to generate an overlay pack for the EsportsDashapplication.
//  Usage: Run the script and follow the prompts to select an overlay folder
//  The script will then generate a esportsDash.overlay file based on the selected folder. 
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


async function addFolderToZip(zip, folderPath, zipPath = '') {
    const entries = await fs.readdir(folderPath, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(folderPath, entry.name);
        const entryZipPath = path.join(zipPath, entry.name);
        if (entry.isDirectory()) {
            const folderZip = zip.folder(entry.name);
            await addFolderToZip(folderZip, fullPath);
        } else {
            const fileData = await fs.readFile(fullPath);
            zip.file(entryZipPath, fileData);
        }
    }
}

class OverlayPackBuilder {
    constructor() {
        this.globalConfig = null;
    }
    async loadGlobalConfig() {
        try {
            const config = await fs.readFile(path.join(__root, 'globalConfig.json'), 'utf8');
            this.globalConfig = JSON.parse(config);
        }
        catch (error) {
            throw new Error(`Failed to load global config: ${error.message}`);
        }
    }
    async promptUserChoices() {
        const overlayFolders = Object.keys(this.globalConfig["Overlay Packs"]);
        const { selectedOverlay } = await inquirer.prompt([{
            type: 'list',
            name: 'selectedOverlay',
            message: 'Select an Overlay Pack to build:',
            choices: overlayFolders
        }]);
        return this.globalConfig["Overlay Packs"][selectedOverlay];
    }



    async buildOverlayPack(overlayPack) {
        const overlayFolderPath = path.join(__root, overlayPack.folderPath);
        console.log(`Building overlay pack from folder: ${overlayFolderPath}`);
        const zip = new JSZip();
        await addFolderToZip(zip, overlayFolderPath);
        const overlayPackData = await zip.generateAsync({ type: 'nodebuffer' });
        const outputFilePath = path.join(__root, 'builder', 'output', 'overlays', `${overlayPack.id}.esportsDash.overlay`);
        await fs.writeFile(outputFilePath, overlayPackData);
        console.log(`Overlay pack created at: ${outputFilePath}`);
    }

    
    async run() {
        try {
            await this.loadGlobalConfig();
            const selectedOverlayPack = await this.promptUserChoices();
            await this.buildOverlayPack(selectedOverlayPack);
        }
        catch (error) {
            console.error(`Error: ${error.message}`);
        }
    }
}

// Run the Overlay Pack Builder
const builder = new OverlayPackBuilder();
builder.run();