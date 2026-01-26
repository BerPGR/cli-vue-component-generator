# Vue Component Generator

## Version 1.1.2

## Installation

- Run `npm install -g vue-gen-component`

- In your main VueJS project folder, run `v-create <name> [options]`

```
OPTIONS:
Usage: v-create [options] [name]

Arguments:
  name                Component name

Options:
  -V, --version       output the version number
  --js, --javascript  Use javascript in the component
  --ts, --typescript  Use typescript in the component
  -s, --setup         Use script setup
  -p, --path <path>   Path to create the component
  -h, --help          display help for command

```

## Usage

```bash
v-create MyComponent

? Component name: MyComponent
? Path to create the component: src/components
? Select language: ts
? Use script setup? Yes
Detected: daisyui
✅ Component MyComponent.vue created successfully in: src/components/
```
