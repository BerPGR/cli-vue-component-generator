#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { program } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import templates from './ui-templates.js'

const createComponent = (name, lang, setup, userPath, content) => {
  const targetDir = path.join(process.cwd(), userPath);

  if (fs.existsSync(path.join(targetDir, `${name}.vue`))) {
    console.log(
      chalk.red("❌ Component already exists at: " + chalk.white.bold(userPath))
    );
    return;
  }

  if (!fs.existsSync(targetDir)) {
    console.log(
      chalk.yellow("📂 Folder src/components not found. Creating...")
    );
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const langAttr = lang === "ts" ? ' lang="ts"' : "";
  const setupAttr = setup ? " setup" : "";
  let scriptContents = [
    'export default {',
    `  name: '${name}'`,
    '};'
  ].join('\n');
  if (setup) {
    scriptContents = [
      'defineOptions({',
      `  name: '${name}'`,
      '});'
    ].join('\n');
  }

  const fullFileContent = [
    content,
    '',
    `<script${setupAttr}${langAttr}>`,
    scriptContents,
    '</script>'
  ].join('\n') + '\n';

  try {
    const filePath = path.join(targetDir, `${name}.vue`);
    fs.writeFileSync(filePath, fullFileContent);
    console.log(
      `✅ Component ${name}.vue created successfully in: ${userPath}`
    );
  } catch (error) {
    console.error(
      chalk.red("❌ Error creating component: " + chalk.grey(error))
    );
  }
};

const detectUIFramework = () => {
  const pkgPath = path.join(process.cwd(), "package.json");
  const shadcnConfig = path.join(process.cwd(), "components.json");

  if (!fs.existsSync(pkgPath)) return "default";

  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
  const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };

  if (fs.existsSync(shadcnConfig) || allDeps["radix-vue"]) return "shadcn";
  if (allDeps["@nuxt/ui"]) return "nuxtui";
  if (allDeps["primevue"]) return "primevue";
  if (allDeps["element-plus"]) return "elementplus";
  if (allDeps["quasar"]) return "quasar";
  if (allDeps["naive-ui"]) return "naiveui";
  if (allDeps["vuetify"]) return "vuetify";
  if (allDeps["daisyui"] || allDeps["tailwindcss"]) return "tailwind";
  return "default";
};

program
  .version("2.0.11")
  .argument("[name]", "Component name")
  .option("--js, --javascript", "Use javascript in the component")
  .option("--ts, --typescript", "Use typescript in the component")
  .option("-s, --setup", "Use script setup")
  .option("-p, --path <path>", "Path to create the component")
  .action(async (name, options) => {

    const pkgDir = path.join(process.cwd(), 'package.json')
    if (!fs.existsSync(pkgDir)) {
      console.error(
        chalk.red("\n❌ Error: " + chalk.grey("There is no package.json in your current path."))
      );
      process.exit(1)
    }

    const pkg = JSON.parse(fs.readFileSync(pkgDir, 'utf-8'))
    const deps = { ...pkg.dependencies, ...pkg.devDependencies }
    if (!deps.hasOwnProperty('vue')) {
      console.error(
        chalk.red("\n❌ Error: " + chalk.grey("This is not a VueJS project."))
      );
      process.exit(1)
    }

    const questions = [];

    if (options.javascript && options.typescript) {
      console.error(
        chalk.red("\n❌ Error: " + chalk.grey("Choose only one stack (--js ou --ts)."))
      );
      process.exit(1);
    }

    const selectedLang = options.typescript
      ? "ts"
      : options.javascript
        ? "js"
        : undefined;

    if (!name) {
      questions.push({
        type: "input",
        name: "name",
        message: "Component name:",
        validate: (value) => (value ? true : "The name cannot be empty."),
      });
    }

    if (!selectedLang) {
      questions.push({
        type: "list",
        name: "lang",
        message: "Select language:",
        choices: [
          { name: "JavaScript", value: "js" },
          { name: "TypeScript", value: "ts" },
        ],
        default: "js",
      });
    }

    if (!options.path) {
      questions.push({
        type: "input",
        name: "path",
        message: "Path to create the component:",
        default: "src/components",
      });
    }

    if (options.setup === undefined && !process.argv.includes("-s")) {
      questions.push({
        type: "confirm",
        name: "setup",
        message: "Use script setup?",
        default: true,
      });
    }

    const framework = detectUIFramework();
    const templateOptions = templates[framework] || templates.default

    console.log(
      chalk.cyan(
        `Detected: ${
          framework === "default" ? "No framework detected" : framework
        }`
      )
    );

    if (framework !== 'default') {
      questions.push({
        type: 'list',
        name: 'componentType',
        message: 'Which component would you like to create?',
        choices: Object.keys(templateOptions)
      })
    }

    const promptAnswers = await inquirer.prompt(questions);
    const finalName = name || promptAnswers.name;
    const finalLang = selectedLang || promptAnswers.lang;
    const finalSetup =
      options.setup !== undefined ? options.setup : promptAnswers.setup;
    const finalPath = options.path || promptAnswers.path;
    const template = templateOptions(promptAnswers.componentType);

    createComponent(
      finalName,
      finalLang,
      finalSetup,
      finalPath,
      template
    );
  });

program.parse(process.argv);
