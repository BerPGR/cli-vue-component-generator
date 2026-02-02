const templates = {
  shadcn: {
    card: `<template>
  <Card>
    <CardHeader>
      <CardTitle>{{name}}</CardTitle>
    </CardHeader>
    <CardContent>
      Conteúdo do Card
    </CardContent>
  </Card>
</template>`,
    button: `<template>
  <Button variant="outline">{{name}}</Button>
</template>`,
    footer: `<template>
  <CardFooter class="flex justify-between px-6 py-4">
    <p class="text-sm text-muted-foreground">{{name}} Footer</p>
  </CardFooter>
</template>`
  },

  nuxtui: {
    ucontainer: `<template>
  <UContainer>
    <div class="py-4">UContainer {{name}}</div>
  </UContainer>
</template>`,
    ucard: `<template>
  <UCard>
    <template #header>
      <h3 class="text-base font-semibold leading-6 text-gray-900">{{name}}</h3>
    </template>
    Card Content
  </UCard>
</template>`,
    ubutton: `<template>
<UButton color="primary" variant="solid">{{name}}</UButton>
</template>`
  },

  primevue: {
    panel: `<template>
<Panel header="{{name}}">
<p class="m-0">PrimeVue Panel Content</p>
</Panel>
</template>`,
    button: `<template>
<Button label="{{name}}" icon="pi pi-check" />
</template>`
  },

  vuetify: {
    'v-card': `<template>
<v-card title="{{name}}" subtitle="Generated with CLI" text="Conteúdo do Vuetify"></v-card>
</template>`,
    'v-btn': `<template>
<v-btn color="primary" elevation="2">{{name}}</v-btn>
</template>`
  },

  tailwind: {
    utility: `<template>
<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
<div class="text-xl font-medium text-black">{{name}}</div>
</div>
</template>`,
    daisyui: `<template>
<div class="card w-96 bg-base-100 shadow-xl">
<div class="card-body">
<h2 class="card-title">{{name}}</h2>
<div class="card-actions justify-end">
<button class="btn btn-primary">Action</button>
</div>
</div>
</div>
</template>`
  },

  elementplus: {
    'el-card': `<template>
<el-card class="box-card">
<template #header>
<div class="card-header"><span>{{name}}</span></div>
</template>
Element Plus
</el-card>
</template>`,
    'el-button': `<template>
<el-button type="primary">{{name}}</el-button>
</template>`
  },

  quasar: {
    'q-card': `<template>
<q-card class="my-card">
<q-card-section>
<div class="text-h6">{{name}}</div>
</q-card-section>
</q-card>
</template>`,
    'q-btn': `<template>
<q-btn color="primary" label="{{name}}" />
</template>`
  },

  naiveui: {
    'n-card': `<template>
<n-card title="{{name}}" :bordered="true">
Naive UI Content
</n-card>
</template>`,
    'n-button': `<template>
<n-button type="primary">{{name}}</n-button>
</template>`
  },

  default: {
    component: `<template>
<div>
<h1>{{name}}</h1>
</div>
</template>`
  }
};

export default templates
