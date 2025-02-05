#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { configurations } from '../GlobalConfig.js';

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

class ConfigGenerator {
    constructor() {
        this.starterPacks = {};
        this.htmlPacks = {};
        this.gameConfigs = {};
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

    generateJson() {
        return JSON.stringify({
            "Starter Packs": this.starterPacks,
            "HTML Packs": this.htmlPacks,
            "Game Configs": this.gameConfigs
        }, null, 2);
    }

    saveToFile(filePath) {
        const jsonContent = this.generateJson();
        fs.writeFileSync(filePath, jsonContent, 'utf8');
        console.log(`Config file created at: ${filePath}`);
    }
}






function generateConfigs(configurations) { 
    const configGenerator = new ConfigGenerator();

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
    });



        // Save to JSON file
        const outputPath = path.join(__root, 'globalConfig.json');
        configGenerator.saveToFile(outputPath);
}

generateConfigs(configurations);