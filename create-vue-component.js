#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { program } = require('commander')
const inquirer = require('inquirer')

const createComponent = (name, lang, setup) => {
    const targetDir = path.join(process.cwd(), 'src', 'components')

    if (!fs.existsSync(targetDir)) {
        console.log('📂 Folder src/components not found. Creating...');
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
        console.log(`✅ Component ${name}.vue created successfully in: src/components/`);
    } catch (error) {
        console.error('❌ Error creating component:', error);
    }
}

program
    .version('1.0.0')
    .argument('[name]', 'Component name')
    .option('-l, --lang <type>', 'Component language (js or ts)')
    .option('-s, --setup', 'Use script setup')
    .action(async (name, options) => {
        let answers = {
            name: name,
            lang: options.lang,
            setup: options.setup
        }

        const questions = []

        if (!name) {
            questions.push({
                type: 'input',
                'name': 'name',
                message: 'Component name:',
                validate: (value) => value ? true : 'The name cannot be empty.'
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

        createComponent(answers.name, answers.lang, answers.setup)
    })

program.parse(process.argv)