#!/usr/bin/env node

import { execSync } from 'child_process';
import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const packageVersion = require('./package.json').version;
const packageDescription = require('./package.json').description;
const packageAuthor = require('./package.json').author;


const args = process.argv.slice(2);

if (args.length === 0) {
    console.log(gradient(['cyan', 'white'])(figlet.textSync('ESPORTS DASH !', { 
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 100,
        whitespaceBreak: true,

    })));
    
    console.log(chalk.bold.blue(`Description: ${packageDescription}`));
    console.log(chalk.bold.blue(`Version: ${packageVersion}`));
    console.log(chalk.bold('-----------------------------'));
    console.log(chalk.bold.blue('Usage:'));
    console.log(chalk.green('  builder <command>'));
    console.log(chalk.bold('-----------------------------'));
    console.log(chalk.bold.blue('Examples:'));
    console.log(chalk.green('  builder gpbuilder'));
    console.log(chalk.green('  builder spbuilder'));
    console.log(chalk.green('  builder configbuilder'));
    console.log(chalk.bold('-----------------------------'));

    process.exit(1);
}

const command = args[0];
const commandArgs = args.slice(1).join(' ');

try {
    execSync(`npm exec ${command} ${commandArgs}`, { stdio: 'inherit' });
} catch (error) {
    console.error(chalk.red(`Failed to execute command: ${command}`));
    process.exit(1);
}