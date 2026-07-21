# Andromeda Design System

Sistema de diseño de INVEX. Este repositorio contiene los componentes del DS en **React** y **Vue 3**, con **Storybook** para documentación interactiva y **Figma Code Connect** para mantener sincronizado el código con la librería de Figma.

Primer componente disponible: **Button**.

## Estructura del repositorio

```
├── tokens/
│   └── tokens.css          # Design tokens compartidos (primitivos + semánticos)
├── react/                  # @andromeda/react
│   ├── .storybook/
│   └── src/components/Button/
└── vue/                    # @andromeda/vue
    ├── .storybook/
    └── src/components/Button/
```

Ambos paquetes consumen el mismo archivo de tokens (`tokens/tokens.css`), que define la paleta de marca, espaciado, radios y tipografía como CSS custom properties. Cuando el refactor del DS termine, este archivo se generará automáticamente vía Style Dictionary a partir de las Variables de Figma.

## Requisitos

- Node.js 18+
- npm

## Instalación

Cada paquete se instala por separado:

```bash
cd react && npm install
cd vue && npm install
```

## Storybook

| Paquete | Comando | Puerto |
| ------- | ------- | ------ |
| React | `cd react && npm run storybook` | http://localhost:6006 |
| Vue | `cd vue && npm run storybook` | http://localhost:6007 |

## Button

Button unifica los ~20 component sets fragmentados de Figma (`btn/primary-SM`, `btn/ghost-primary-MD`, etc.) en una única API:

| Prop | Tipo | Default | Descripción |
| ---- | ---- | ------- | ----------- |
| `variant` | `'primary' \| 'secondary'` | `'primary'` | Jerarquía visual del botón. |
| `appearance` | `'solid' \| 'outline' \| 'ghost'` | `'solid'` | Estilo de superficie: relleno, borde o transparente. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Tamaño del botón. |
| `loading` | `boolean` | `false` | Muestra un spinner y bloquea el botón. |
| `disabled` | `boolean` | `false` | Deshabilita el botón. |
| `leftIcon` | nodo/slot | — | Icono a la izquierda del label. |
| `rightIcon` | nodo/slot | — | Icono a la derecha del label. |

### React

```tsx
import { Button } from '@andromeda/react'

<Button variant="primary" appearance="solid" size="md">
  Guardar
</Button>
```

### Vue

```vue
<script setup lang="ts">
import { Button } from '@andromeda/vue'
</script>

<template>
  <Button variant="primary" appearance="solid" size="md">Guardar</Button>
</template>
```

## Figma Code Connect

Cada paquete incluye sus mapeos de Code Connect (`Button.figma.tsx` / `Button.figma.ts`) y su configuración en `figma.config.json`.

```bash
# Validar los mapeos sin publicar
npm run figma:connect:dry

# Publicar a Figma (requiere FIGMA_ACCESS_TOKEN)
npm run figma:connect
```

## Scripts útiles

En cada paquete:

| Script | Descripción |
| ------ | ----------- |
| `npm run storybook` | Levanta Storybook en modo desarrollo. |
| `npm run build-storybook` | Genera el build estático de Storybook. |
| `npm run typecheck` | Chequeo de tipos (`tsc` en React, `vue-tsc` en Vue). |
| `npm run figma:connect:dry` | Valida los mapeos de Code Connect. |
| `npm run figma:connect` | Publica los mapeos de Code Connect a Figma. |

## Notas

- `vue/vite.config.ts` es necesario para que Storybook procese los SFC: `@storybook/vue3-vite` 8.x no aplica `@vitejs/plugin-vue` por sí solo y lo toma de la config de Vite del proyecto.
