#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { configurations, overlays } from '../GlobalConfig.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const __root = path.join(__dirname, '..', '..')


class StarterPack {
    constructor({ name, author, version, image, description, folderPath, fileName }) {
        this.name = name;
        this.author = author;
        this.version = version;
        this.image = image;
        this.description = description;
        this.folderPath = folderPath;
        this.fileName = fileName;
    }
}

class HtmlPack {
    constructor({ name, author, version, image, description, folderPath, fileName }) {
        this.name = name;
        this.author = author;
        this.version = version;
        this.image = image;
        this.description = description;
        this.folderPath = folderPath;
        this.fileName = fileName;
    }
}

class GameConfig {
    constructor({ id, name, author, version, image, description, folderPath, fileName }) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.version = version;
        this.image = image;
        this.description = description;
        this.folderPath = folderPath;
        this.fileName = fileName;
    }
}


class OverlayPack {
    constructor({ id, name, author, version, image, description, folderPath, fileName }) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.version = version;
        this.image = image;
        this.description = description;
        this.folderPath = folderPath;
        this.fileName = fileName;
    }
}

class ConfigGenerator {
    constructor() {
        this.starterPacks = {};
        this.htmlPacks = {};
        this.gameConfigs = {};
        this.overlayPacks = {};
    }

    addStarterPack(game, pack) {
        if (!this.starterPacks[game]) {
            this.starterPacks[game] = [];
        }
        this.starterPacks[game].push(pack);
    }

    addHtmlPack(game, pack) {
        if (!this.htmlPacks[game]) {
            this.htmlPacks[game] = [];
        }
        this.htmlPacks[game].push(pack);
    }

    addGameConfig(game, config) {
        if (!this.gameConfigs[game]) {
            this.gameConfigs[game] = [];
        }
        this.gameConfigs[game].push(config);
    }


    addOverlayPack(game, config) {
        if (!this.overlayPacks[game]) {
            this.overlayPacks[game] = [];
        }
        this.overlayPacks[game].push(config);
    }

    // addOverlayPack(config) {
    //     if (!this.overlayPacks[config.id]) {
    //         this.overlayPacks[config.id] = [];
    //     }
    //     this.overlayPacks[config.id].push(config);
    // }

    generateJson() {
        return JSON.stringify({
            "Starter Packs": this.starterPacks,
            "HTML Packs": this.htmlPacks,
            "Game Configs": this.gameConfigs,
            "Overlay Packs": this.overlayPacks
        }, null, 2);
    }

    saveToFile(filePath) {
        const jsonContent = this.generateJson();
        fs.writeFileSync(filePath, jsonContent, 'utf8');
        console.log(`Config file created at: ${filePath}`);
    }
}






function generateConfigs(configurations, overlays) {
    const configGenerator = new ConfigGenerator();

    // loop over overlays and add to configGenerator
    // Convert overlays object to array of values
    const overlaysArray = Object.values(overlays);
    
    // loop over overlays and add to configGenerator
    overlaysArray.forEach(overlayPack => {
        configGenerator.overlayPacks[overlayPack.id] = new OverlayPack(overlayPack);
    });
    // console.log("The configurations are: ", configurations);

    Object.entries(configurations).forEach(([game, config]) => {

        config.starterPack.forEach(starterPack => {
            configGenerator.addStarterPack(game, new StarterPack(starterPack));
        });

        config.htmlPack.forEach(htmlPack => {
            configGenerator.addHtmlPack(game, new HtmlPack(htmlPack));
        });

        config.gameConfigs.forEach(gameConfig => {
            configGenerator.addGameConfig(game, new GameConfig(gameConfig));
        });


        // currently we are putting 'overlayPacks' in each game array.. instead we could do
        // if game == 'overlayPacks' then its just the stand alone overlay packs that would be seperate...
        // ??

        // config.overlayPack.forEach(overlayPack => {
        //     configGenerator.addOverlayPack(game, new OverlayPack(overlayPack));
        // });

        // config.overlayPack.forEach(overlayPack => {
        //     configGenerator.addOverlayPack(config, new OverlayPack(overlayPack));
        // });
    });



    // Save to JSON file
    const outputPath = path.join(__root, 'globalConfig.json');
    configGenerator.saveToFile(outputPath);
}

generateConfigs(configurations, overlays);