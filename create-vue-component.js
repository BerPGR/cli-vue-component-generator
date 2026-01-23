#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { program } from 'commander'
import inquirer from 'inquirer'
import chalk from 'chalk'

const createComponent = (name, lang, setup, userPath) => {
    const targetDir = path.join(process.cwd(), userPath)

    if (fs.existsSync(path.join(targetDir, `${name}.vue`))) {
        console.log(chalk.red('❌ Component already exists at: ' + chalk.white.bold(userPath)));
        return;
    }

    if (!fs.existsSync(targetDir)) {
        console.log(chalk.yellow('📂 Folder src/components not found. Creating...'));
        fs.mkdirSync(targetDir, { recursive: true });
    }

    const langAttr = lang === 'ts' ? ' lang="ts"' : ''
    const setupAttr = setup ? ' setup' : ''

    const content = `<template>
    <div>
        <h1>Component ${name}</h1>
    </div>
</template>

<script${setupAttr}${langAttr}></script>
`
    try {
        const filePath = path.join(targetDir, `${name}.vue`)
        fs.writeFileSync(filePath, content)
        console.log(`✅ Component ${name}.vue created successfully in: ${userPath}`);
    } catch (error) {
        console.error(chalk.red('❌ Error creating component:' + chalk.white.bold(error)));
    }
}

program
    .version('1.0.0')
    .argument('[name]', 'Component name')
    .option('-l, --lang <type>', 'Component language (js or ts)')
    .option('-s, --setup', 'Use script setup')
    .option('-p, --path <path>', 'Path to create the component')
    .action(async (name, options) => {
        let answers = {
            name: name,
            lang: options.lang,
            setup: options.setup,
            userPath: options.path
        }

        const questions = []

        if (!name) {
            questions.push({
                type: 'input',
                name: 'name',
                message: 'Component name:',
                validate: (value) => value ? true : 'The name cannot be empty.'
            })
        }

        if (!options.path) {
            questions.push({
                type: 'input',
                name: 'userPath',
                message: 'Path to create the component:',
                default: 'src/components'
            })
        }

        if (!options.lang) {
            questions.push({
                type: 'list',
                name: 'lang',
                message: 'Select language:',
                choices: ['js', 'ts'],
            })
        }

        if (options.setup === undefined && !process.argv.includes('-s')) {
            questions.push({
                type: 'confirm',
                name: 'setup',
                message: 'Use script setup?',
                default: true
            })
        }

        if (questions.length > 0) {
            const promptAnswers = await inquirer.prompt(questions);
            answers = { ...answers, ...promptAnswers };
        }

        createComponent(answers.name, answers.lang, answers.setup, answers.userPath)
    })

program.parse(process.argv)