#!/usr/bin/env node

// const { execSync } = require('child_process');
import { execSync } from 'child_process';

const args = process.argv.slice(2);
if (args.length === 0) {
    console.error('No command specified.');
    process.exit(1);
}

const command = args[0];
const commandArgs = args.slice(1).join(' ');

try {
    execSync(`npm exec ${command} ${commandArgs}`, { stdio: 'inherit' });
} catch (error) {
    console.error(`Failed to execute command: ${command}`);
    process.exit(1);
}