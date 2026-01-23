# Vue Component Generator

## Installation

- Run `npm install -g vue-gen-component`

- In your main VueJS project folder, run `v-create <name> [options]`

```
OPTIONS:
Usage: create-vue-component [options] [name]

Arguments:
  name               Nome do componente

Options:
  -V, --version      output the version number
  -l, --lang <type>  Component language (js or ts)
  -s, --setup        Use script setup
  -p, --path         Path to create the component (src/components)
  -h, --help         display help for command
```

## Usage

```bash
v-create MyComponent

? Component name: MyComponent
? Path to create the component: src/components
? Select language: ts
? Use script setup? Yes
✅ Component MyComponent.vue created successfully in: src/components/
```
