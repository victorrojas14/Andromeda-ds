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

## Fundamentos

Los fundamentos del DS provienen de las páginas "Colores Base" y "Paleta gráfica de pastel" del archivo Figma "Ui Kit Web":

- **`tokens/tokens.css`** — colores de marca (Primary/Secondary/Tertiary con variantes Light/Dark), neutros, semánticos (Success/Warning/Danger/Info × Light/Base/Dark), dark mode, paleta para gráficas de pastel, tipografía Poppins, espaciado, radios y sombras. Incluye la capa semántica (`--color-action-*`, `--color-text-*`, etc.) que consumen los componentes.
- **`src/foundations/colors.ts`** (en cada paquete) — espejo tipado de los tokens para consumirlos desde JS/TS: `colors`, `chartPalette` y `chartColor(index)` para series de gráficas (del 6º elemento en adelante se agrupa en «Otros»).
- **`ColorCard`** — componente de documentación de color (réplica del "DS/Color Card" de Figma), usado por las páginas de Storybook bajo **Fundamentos**.
- **Grid** — retícula del fundamento "Grid" de Figma: 12 columnas, gutter de 20px y contenedor de 1140px centrado (tokens `--grid-*`). Se consume con los componentes `Grid` y `GridCol` (`<GridCol span={8}>` / `<GridCol :span="8">`) y está documentada en Storybook bajo **Fundamentos/Grid**. El Code Connect del Grid queda preparado (comentado en `Grid.figma.*`) porque el nodo de Figma es un frame de documentación y Figma solo permite conectar componentes publicados en la librería.
- **Icons** — librería de 170 iconos generada desde la página "Icons" de Figma (`Icon/icons.ts`, no editar a mano). Se consume con `<Icon name="account-outline" size={24} />` / `<Icon name="account-outline" :size="24" />`; el color se hereda vía currentColor y los tamaños de la librería son 12–72. Los 1014 componentes de icono publicados están mapeados con Code Connect (`Icon.figma.*`, generados por script).
- **Logo** — marcas INVEX (Invex, Invex Banco, Invex Fiduciario, Invex Renacer) desde la página "Marcas Invex" de Figma. Se consume con `<Logo variant="invex" height={40} />` / `<Logo variant="invex" :height="40" />`; el color se hereda vía currentColor (Rojo INVEX por defecto) y la prop `envolvente` aplica el área de seguridad sobre fondo primario con el logo en blanco. Los component sets publicados `Logotipos-Todos` y `Logo-InvexTodos` (con mapeo de variante) y los componentes `logo/*` están conectados con Code Connect (`Logo.figma.*`).

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

Cada paquete incluye sus mapeos de Code Connect (`Button.figma.tsx` / `Button.figma.ts`) y su configuración en `figma.config.json`. Los 19 component sets de botones publicados en la librería (`btn/primary-*`, `btn/secondary-*`, `btn/ghost-*`) están mapeados al Button consolidado con sus node-ids reales. `btn/Rounded-*` y `btn/Mis-Productos` quedan fuera a propósito (otra anatomía). El "DS/Color Card" de las páginas de fundamentos no está publicado en la librería, por lo que no es mapeable todavía.

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
