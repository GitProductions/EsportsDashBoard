const fs = require('fs');
const path = require('path');

class StarterPack {
  constructor({ name, author, version, game, image, description, fileKey, zipFile }) {
    this.name = name;
    this.author = author;
    this.version = version;
    this.game = game;
    this.image = image;
    this.description = description;
    this.fileKey = fileKey;
    this.zipFile = zipFile;
  }
}

class HtmlPack {
  constructor({ name, author, version, game, image, description, fileKey, zipFile }) {
    this.name = name;
    this.author = author;
    this.version = version;
    this.game = game;
    this.image = image;
    this.description = description;
    this.fileKey = fileKey;
    this.zipFile = zipFile;
  }
}

class GameConfig {
  constructor({ id, name, author, version, image, description, fileKey }) {
    this.id = id;
    this.name = name;
    this.author = author;
    this.version = version;
    this.image = image;
    this.description = description;
    this.fileKey = fileKey;
  }
}

class ConfigGenerator {
  constructor() {
    this.starterPacks = [];
    this.htmlPacks = [];
    this.gameConfigs = {};
  }

  addStarterPack(pack) {
    this.starterPacks.push(pack);
  }

  addHtmlPack(pack) {
    this.htmlPacks.push(pack);
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

// Starter Packs
const starterPacks = [

  {
    name: "BGG Overwatch Starter Pack",
    author: "EsportsDash",
    version: "1.3",
    game: "Overwatch",
    image: "Game Configs/Overwatch/Overwatch.webp",
    description: "Starter Pack includes Game Config, HTML Files & OBS Scene Collection",
    fileKey: "Starter Packs",
    zipFile: "BGG_Overwatch_EsportsDash_Starter_v1.3.bggstarter"
  },

  {
    name: "BGG Marvel Rivals Starter Pack",
    author: "EsportsDash",
    version: "1.1",
    game: "Marvel Rivals",
    image: "Game Configs/Marvel Rivals/Marvel Rivals.webp",
    description: "Starter Pack includes Game Config, HTML Files & OBS Scene Collection",
    fileKey: "Starter Packs",
    zipFile: "MarvelRivals_Starter_v1.1.bggstarter"
  },


  {
    name: "Valorant Starter Pack",
    author: "EsportsDash",
    version: "1.1",
    game: "Valorant",
    image: "Game Configs/Valorant/Valorant.webp",
    description: "Starter Pack includes Game Config, HTML Files & OBS Scene Collection",
    fileKey: "Starter Packs",
    zipFile: "Valorant_Starter_v1.1.bggstarter"
  }
];

// HTML Packs
const htmlPacks = [
  {
    name: "Broadcast GG Overwatch HTML Pack",
    author: "Broadcast GG",
    version: "1.3",
    game: "Overwatch",
    image: "Game Configs/Overwatch/Overwatch.webp",
    description: "Description of HTML pack 1",
    fileKey: "HTML Packs/Overwatch-BGG",
    zipFile: "Overwatch-BGG-HTML-PACK.zip"
  },


  {
    name: "Broadcast GG Valorant HTML Pack",
    author: "Broadcast GG",
    version: "1.1",
    game: "Valorant",
    image: "Game Configs/Valorant/Valorant.webp",
    description: "Description of HTML pack 2",
    fileKey: "HTML Packs/Valorant",
    zipFile: "Valorant-BGG-HTML-PACK.zip"
  },


  {
    name: "Broadcast GG Marvel Rivals HTML Pack",
    author: "Broadcast GG",
    version: "1.1",
    game: "Marvel Rivals",
    image: "Game Configs/Marvel Rivals/Marvel Rivals.webp",
    description: "Description of HTML pack 3",
    fileKey: "HTML Packs/Marvel-BGG",
    zipFile: "MarvelRivals-BGG-HTML-PACK.zip"
  }
];

// Game Configs
const gameConfigs = {
  "Overwatch": [
    {
      id: "esportsdash.overwatch",
      name: "Overwatch Game Config",
      author: "EsportsDash",
      version: "1.2",
      image: "Game Configs/Overwatch/Overwatch.webp",
      description: "NOT USING GAME CONFIG SECTION HERE YET.... on website. anyhow..",
      fileKey: "Game Configs/Overwatch/Overwatch-EsportsDash-1.2.bgg"
    },


    {
      id: "esportsdash.overwatch",
      name: "Overwatch Game Config",
      author: "EsportsDash",
      version: "1.3",
      image: "Game Configs/Overwatch/Overwatch.webp",
      description: "NOT USING GAME CONFIG SECTION HERE YET.... on website. anyhow..",
      fileKey: "Game Configs/Overwatch/esportsdash.overwatch_v1.3"
    }
  ],


  "Valorant": [
    {
      id: "esportsdash.valorant",
      name: "Valorant Game Config",
      author: "EsportsDash",
      version: "1.2",
      image: "Game Configs/Valorant/valorant.png",
      description: "Description of game config 2",
      fileKey: "Game Configs/Valorant/Valorant-EsportsDash-1.2.bgg"
    },


    {
      id: "esportsdash.valorant",
      name: "Valorant Game Config",
      author: "EsportsDash",
      version: "1.3",
      image: "Game Configs/Valorant/valorant.png",
      description: "Description of game config 2",
      fileKey: "Game Configs/Valorant/esportsdash.valorant_v1.3.bgg"
    }
  ],


  "Marvel Rivals": [
    {
      id: "esportsdash.marvelrivals",
      name: "Marvel Rivals Game Config",
      author: "EsportsDash",
      version: "1.0",
      image: "Game Configs/Marvel Rivals/Marvel Rivals.webp",
      description: "Description of game config 3",
      fileKey: "Game Configs/Marvel Rivals/Marvel Rivals-config.bgg"
    },

    
    {
      id: "esportsdash.marvelrivals",
      name: "Marvel Rivals Game Config",
      author: "EsportsDash",
      version: "1.1",
      image: "Game Configs/Marvel Rivals/Marvel Rivals.webp",
      description: "Description of game config 3",
      fileKey: "Game Configs/Marvel Rivals/esportsdash.marvelrivals_v1.1.bgg"
    }
  ]
};

// Add starter packs
starterPacks.forEach(pack => configGenerator.addStarterPack(new StarterPack(pack)));

// Add HTML packs
htmlPacks.forEach(pack => configGenerator.addHtmlPack(new HtmlPack(pack)));

// Add game configs
Object.entries(gameConfigs).forEach(([game, configs]) => {
  configs.forEach(config => configGenerator.addGameConfig(game, new GameConfig(config)));
});

// Save to JSON file
const outputPath = path.join(__dirname, 'globalConfig.json');
configGenerator.saveToFile(outputPath);