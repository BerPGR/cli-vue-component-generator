#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { program } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";

const createComponent = (name, lang, setup, userPath, content) => {
    console.log(userPath, typeof userPath)
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

  const fullFileContent = `${content}

<script${setupAttr}${langAttr}></script>
`;
  try {
    const filePath = path.join(targetDir, `${name}.vue`);
    fs.writeFileSync(filePath, fullFileContent);
    console.log(
      `✅ Component ${name}.vue created successfully in: ${userPath}`
    );
  } catch (error) {
    console.error(
      chalk.red("❌ Error creating component:" + chalk.white.bold(error))
    );
  }
};

const detectUIFramework = () => {
  const pkgPath = path.join(process.cwd(), "package.json");
  if (!fs.existsSync(pkgPath)) {
    return "default";
  }

  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
  const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };

  if (allDeps["@nuxt/ui"]) return "nuxtui";
  if (allDeps["primevue"]) return "primevue";
  if (allDeps["vuetify"]) return "vuetify";
  if (allDeps['daisyui'] || allDeps['tailwindcss']) return 'tailwind'
  return 'default'
};

const getTemplate = (ui, name) => {
  const templates = {
    nuxtui: `<template>
  <UContainer>
    <UCard>
      <template #header>
        <h1 class="text-xl font-bold">Component ${name}</h1>
      </template>
      <p>NuxtUI Content</p>
      <UButton label="Clique aqui" />
    </UCard>
  </UContainer>
</template>`,

    primevue: `<template>
  <div class="card">
    <Panel header="${name}">
      <p>PrimeVue Content</p>
      <Button label="Submit" icon="pi pi-check" />
    </Panel>
  </div>
</template>`,

    tailwind: `<template>
  <div class="p-4 bg-white shadow rounded-lg">
    <h1 class="text-2xl font-semibold text-gray-800">Component ${name}</h1>
    <button class="btn btn-primary mt-4">Styled Button</button>
  </div>
</template>`,

    default: `<template>
  <div>
    <h1>Component ${name}</h1>
  </div>
</template>`,
  };

  return templates[ui] || templates.default;
};

program
  .version("1.1.2")
  .argument("[name]", "Component name")
  .option("--js, --javascript", "Use javascript in the component")
  .option("--ts, --typescript", "Use typescript in the component")
  .option("-s, --setup", "Use script setup")
  .option("-p, --path <path>", "Path to create the component")
  .action(async (name, options) => {
    const questions = [];

    if (options.javascript && options.typescript) {
      console.error(
        chalk.gray("\n❌ Error: Choose only one stack (--js ou --ts).")
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

    const promptAnswers = await inquirer.prompt(questions);

    const finalName = name || promptAnswers.name;
    const finalLang = selectedLang || promptAnswers.lang;
    const finalSetup =
      options.setup !== undefined ? options.setup : promptAnswers.setup;
    const finalPath = options.path || promptAnswers.path;

    const framework = detectUIFramework();
    console.log(chalk.cyan(`Detected: ${framework === 'default' ? 'No framework detected' : framework}`))
    const templateContent = getTemplate(framework, finalName)

    createComponent(
      finalName,
      finalLang,
      finalSetup,
      finalPath,
      templateContent
    );
  });

program.parse(process.argv);
