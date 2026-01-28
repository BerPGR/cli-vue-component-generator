# Vue Gen

A smart CLI to scaffold Vue.js components with automatic UI Framework detection.

[![npm version](https://img.shields.io/npm/v/vue-gen.svg)](https://www.npmjs.com/package/vue-gen)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Open Source](https://img.shields.io/badge/Open%20Source-%E2%9D%A4-brightgreen)](https://github.com/BerPGR/cli-vue-component-generator)

## Why use Vue Gen?

Creating components manually involves repetitive boilerplate. **Vue Gen** automates this by detecting your project's ecosystem and providing the right template immediately.

- **Zero Config:** Automatically detects if you are using Tailwind, PrimeVue, Vuetify, and more.
- **Modern Standards:** Full support for `<script setup>` and TypeScript.
- **Smart Pathing:** Automatically creates directories if they don't exist.
- **No Junk:** Clean, lightweight, and focused.

---

## Installation & Usage

You don't need to install it globally. Use **npx** to keep your system clean:

```bash
npx vue-gen
```

Alternatively, for global access:

```bash
npm install -g vue-gen
# then run
vue-gen [name]
```

## Supported UI Frameworks

The CLI scans your package.json to detect your UI library and provides tailored templates:

| Framework / UI Library | Components |
|-----------------------|--------------------|
| **Shadcn UI (radix-vue)** | Card, Button, Footer |
| **Nuxt UI (@nuxt/ui)** | UContainer, UCard, UButton |
| **PrimeVue** | Panel, Button |
| **Vuetify** | v-card, v-btn |
| **Tailwind / DaisyUI** | Utility classes / DaisyUI components |
| **Element Plus** | el-card, el-button |
| **Quasar** | q-card, q-btn |
| **Naive UI** | n-card, n-button |

## Command Options

```bash
Usage: vue-gen [options] [name]

Arguments:
  name                Component name (optional, prompt will trigger if empty)

Options:
  -V, --version       Output the version number
  --js, --javascript  Use JavaScript
  --ts, --typescript  Use TypeScript
  -s, --setup         Use <script setup> (default: true)
  -p, --path <path>   Custom path (default: src/components)
  -h, --help          Display help
```

### Example
Running `npx vue-gen MyCard --ts -s` in a Tailwind/DaisyUI project will generate:

```javascript
<template>
  <div class="p-4 bg-white shadow rounded-lg">
    <h1 class="text-2xl font-semibold text-gray-800">Component MyCard</h1>
    <button class="btn btn-primary mt-4">Styled Button</button>
  </div>
</template>

<script setup lang="ts"></script>
```

### Image
**Tailwind** | ![Tailwind Template](https://github.com/BerPGR/cli-vue-component-generator/blob/master/image.png)


## Requirements
- VueJS Project: The CLI checks for the vue dependency.
- package.json: Must be run from the root of your project.