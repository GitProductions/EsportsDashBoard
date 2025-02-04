import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

// Create config generator instance
const configGenerator = new ConfigGenerator();

// Define configurations
const configurations = {


    "Overwatch": {

        starterPack: [
            {
                name: "BGG Overwatch Starter Pack",
                author: "EsportsDash",
                version: "1.3",
                image: "Game Configs/Overwatch/Overwatch.webp",
                description: "Starter Pack includes Game Config, HTML Files & OBS Scene Collection",
                folderPath: "Starter Packs",
                fileName: "BGG_Overwatch_EsportsDash_Starter_v1.3.bggstarter"
            },
            {
                name: "BGG Overwatch Starter Pack",
                author: "EsportsDash",
                version: "1.5",
                image: "Game Configs/Overwatch/Overwatch.webp",
                description: "Starter Pack includes Game Config, HTML Files & OBS Scene Collection",
                folderPath: "Starter Packs",
                fileName: "Overwatch_Starter_v1.5.bggstarter"
            },
        ],


        htmlPack: [

            {
                name: "Broadcast GG Overwatch HTML Pack",
                author: "Broadcast GG",
                version: "1.4",
                image: "Game Configs/Overwatch/Overwatch.webp",
                description: "Description of HTML pack 1",
                folderPath: "HTML Packs/Overwatch-BGG",
                fileName: "Overwatch-BGG-HTML-PACK.zip"
            }
        ],


        gameConfigs: [
            {
                id: "esportsdash.overwatch",
                name: "Overwatch Game Config",
                author: "EsportsDash",
                version: "1.2",
                image: "Game Configs/Overwatch/Overwatch.webp",
                description: "Game configuration file.",
                folderPath: "Game Configs/Overwatch",
                fileName: "Overwatch-EsportsDash-1.2.bgg"
            },
            {
                id: "esportsdash.overwatch",
                name: "Overwatch Game Config",
                author: "EsportsDash",
                version: "1.3",
                image: "Game Configs/Overwatch/Overwatch.webp",
                description: "Game configuration file.",
                folderPath: "Game Configs/Overwatch",
                fileName: "esportsdash.overwatch_v1.3.bgg"
            }
        ]
    },



    "Valorant": {

        starterPack:
            [
                {
                    name: "Valorant Starter Pack",
                    author: "EsportsDash",
                    version: "1.1",  // comes with version 1.2 for game config.. & works fine
                    image: "Game Configs/Valorant/Valorant.webp",
                    description: "Starter Pack includes Game Config, HTML Files & OBS Scene Collection",
                    folderPath: "Starter Packs",
                    fileName: "Valorant_Starter_v1.1.bggstarter"
                },
                {
                    name: "Valorant Starter Pack",
                    author: "EsportsDash",
                    version: "1.2",
                    image: "Game Configs/Valorant/Valorant.webp",
                    description: "Starter Pack includes Game Config, HTML Files & OBS Scene Collection",
                    folderPath: "Starter Packs",
                    fileName: "Valorant_Starter_v1.2.bggstarter"
                }
            ],


        htmlPack:
            [
                {
                    name: "Broadcast GG Valorant HTML Pack",
                    author: "Broadcast GG",
                    version: "1.2",
                    image: "Game Configs/Valorant/Valorant.webp",
                    description: "Description of HTML pack 2",
                    folderPath: "HTML Packs/Valorant",
                    fileName: "Valorant-BGG-HTML-PACK.zip"
                }
            ],


        gameConfigs: [
            {
                id: "esportsdash.valorant",
                name: "Valorant Game Config",
                author: "EsportsDash",
                version: "1.2",
                image: "Game Configs/Valorant/Valorant.webp",
                description: "Game configuration file.",
                folderPath: "Game Configs/Valorant",
                fileName: "Valorant-EsportsDash-1.2.bgg"
            },
            {
                id: "esportsdash.valorant",
                name: "Valorant Game Config",
                author: "EsportsDash",
                version: "1.3",
                image: "Game Configs/Valorant/Valorant.webp",
                description: "Game configuration file.",
                folderPath: "Game Configs/Valorant",
                fileName: "esportsdash.valorant.bgg"
            }
        ]
    },



    "Marvel Rivals": {

        starterPack: [
            {
                name: "BGG Marvel Rivals Starter Pack",
                author: "EsportsDash",
                version: "1.1",
                image: "Game Configs/Marvel Rivals/Marvel Rivals.webp",
                description: "Starter Pack includes Game Config, HTML Files & OBS Scene Collection",
                folderPath: "Starter Packs",
                fileName: "MarvelRivals_Starter_v1.1.bggstarter"
            },
            {
                name: "BGG Marvel Rivals Starter Pack",
                author: "EsportsDash",
                version: "1.2",
                image: "Game Configs/Marvel Rivals/Marvel Rivals.webp",
                description: "Starter Pack includes Game Config, HTML Files & OBS Scene Collection",
                folderPath: "Starter Packs",
                fileName: "MarvelRivals_Starter_v1.2.bggstarter"
            }
        ],


        htmlPack: [
            {
                name: "Broadcast GG Marvel Rivals HTML Pack",
                author: "Broadcast GG",
                version: "1.2",
                image: "Game Configs/Marvel Rivals/Marvel Rivals.webp",
                description: "Description of HTML pack 3",
                folderPath: "HTML Packs/Marvel-BGG",
                fileName: "MarvelRivals-BGG-HTML-PACK.zip"
            }
        ],


        gameConfigs: [
            {
                id: "esportsdash.marvelrivals",
                name: "Marvel Rivals Game Config",
                author: "EsportsDash",
                version: "1.1",
                image: "Game Configs/Marvel Rivals/Marvel Rivals.webp",
                description: "Game configuration file.",
                folderPath: "Game Configs/Marvel Rivals",
                fileName: "esportsdash.marvelrivals_v1.1.bgg"
            }
        ]
    }
};

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
const outputPath = path.join(__dirname, '..', 'globalConfig.json');
configGenerator.saveToFile(outputPath);