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

## Fuente Poppins

Poppins es la fuente por defecto del DS (`--font-family-sans`). Los Storybooks ya la cargan desde Google Fonts vía `.storybook/preview-head.html`. Las apps consumidoras deben incluir en su `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
```

Nota: Google Fonts no ofrece el peso 275 (ExtraLight de los estilos Display en Figma); el navegador resuelve al peso disponible más cercano (300).

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
- **Rounded** — escala de radios de la página "Rounded" de Figma: SM 4px, MD 10px, LG 20px y XL 50px (tokens `--radius-*`, más `--radius-none` y `--radius-pill`), documentada en Storybook bajo **Fundamentos/Rounded**. Es un fundamento de tokens puros: la página de Figma son rectángulos de documentación sin componentes publicados, por lo que no hay nodo mapeable con Code Connect.
- **Spacing** — tokens de espaciado de la página "Spacing" de Figma, con variables **Desktop y Mobile**: `--space-N` (el nombre indica el valor desktop: 0/8/10/16/20/24/30/40/50/70/90) y `--space-N-mobile` (10→8, 20→16, 24→16, 30→24, 40→32; el resto igual). El gutter y margen del Grid ahora referencian esta escala. Documentado en Storybook bajo **Fundamentos/Spacing** con la tabla Desktop/Mobile y Playground interactivo. Fundamento de tokens puros, sin nodo mapeable con Code Connect. Se mantienen aliases legacy `--space-1..5` para los componentes existentes.
- **Shading** — catálogo de sombras de la página "Shading" de Figma (tokens `--shadow-*`): Sombra 1 centrada (`sm`/`md`/`lg`/`xl`/`per`), Sombra 2 abajo-derecha (`*-2`), Sombra 3 abajo-izquierda (`*-3`) y Sombra Autolayout (`autolayout-sm/md/lg/xl`), con los valores exactos de los effect styles. Documentado en Storybook bajo **Fundamentos/Shading** con Playground interactivo. Fundamento de tokens puros: la página no tiene componentes publicados, por lo que no hay nodo mapeable con Code Connect.
- **Typography** — escala tipográfica de las páginas "Tipografía Web" y "Tipografía App" de Figma: Poppins con line-height 150%, estilos Display 1–4 (72/64/56/48), Heading h1–h6 (40/32/28/24/20/16), Body (Parrafo 16, SM 14, XS 12) y Small 1–2 (10/8), en pesos regular/medium/semibold (en Display, `regular` renderiza ExtraLight 275 y `medium` renderiza 400, fiel a Figma). Se consume con `<Text variant="h2" weight="semibold">` (prop `as` en React / `tag` en Vue para el elemento HTML). El Code Connect queda preparado (comentado en `Text.figma.*`) porque la tipografía está definida como text styles y Variables, no como componentes publicados.
- **Logo** — marcas INVEX (Invex, Invex Banco, Invex Fiduciario, Invex Renacer) desde la página "Marcas Invex" de Figma. Se consume con `<Logo variant="invex" height={40} />` / `<Logo variant="invex" :height="40" />`; el color se hereda vía currentColor (Rojo INVEX por defecto) y la prop `envolvente` aplica el área de seguridad sobre fondo primario con el logo en blanco. Los component sets publicados `Logotipos-Todos` y `Logo-InvexTodos` (con mapeo de variante) y los componentes `logo/*` están conectados con Code Connect (`Logo.figma.*`).

## Accordion

Acordeón del DS (Figma: component sets **Acordeon** e **Item Accordion 2** de la página Accordion), en React y Vue bajo **Surfaces/Accordion** en Storybook:

- **`Accordion`** — header blanco (borde inferior `gray-300`, radios `sm` superiores, título Poppins Medium `secondary-dark`) con icono opcional, acción opcional (ej. Button ghost) y chevron; panel de contenido sobre `background` con radios `sm` inferiores. **Responsive**: usa el diseño Desktop de Figma (padding `space-20`, título 16px, panel `space-30`) y en viewport mobile (< 768px) adopta automáticamente el diseño Mobile (padding `space-8·16`, título 14px, panel `space-16`) — no hay prop de tamaño. Uso controlado (`open`/`onToggle` en React, `v-model:open` en Vue) o no controlado (`defaultOpen`). Accesible: header con `role="button"`, `aria-expanded`, `aria-controls` y teclado (Enter/Espacio).
- **`AccordionItem`** — fila tipo card (fondo blanco, radio `md`, sombra `autolayout-sm`, padding `space-10`, alto mínimo 52px, título Poppins Medium `body`), con icono izquierdo opcional y chevron derecho por defecto. Responsive con el mismo breakpoint.
- **Code Connect**: ambos component sets mapeados con sus properties reales (`Texto Titulo`/`Ttitulo`, `Estado`, iconos y botón). La variante `Size` de Figma no se mapea: ambas resuelven al mismo componente responsive. Los sets "NO USAR" (deprecados en Figma) no se mapean a propósito.

## Alert

Alertas del DS (Figma: sets **Alerta** y **Alertas con accion** de la página Alerts), bajo **Feedback/Alert** en Storybook. `Alert` (inline): fondo semántico `*-light`, textos/iconos en `*-dark`, radio `md`, sombra `--shadow-md-2`, mensaje destacado con divisor, acción opcional y botón de cerrar (auto-descarte + `onClose`/`@close`); variants success/warning/danger/info con iconos fieles (Info usa `alert-outline` rotado). `AlertBlock` (bloque): título h5 SemiBold por variant, cuerpo y footer con divisor de 0.5px (sin danger). Ambos sets mapeados con Code Connect.

## Avatar

Avatar circular (Figma: set **Avatar**), bajo **Data Display/Avatar**. El estado se deriva de las props: `src` (Foto), `initials` (Iniciales, tipografía 72/40/24/16 según tamaño) o placeholder de agregar foto (icono `camera-plus-outline`, texto solo en 200). Props `size` (40/60/100/200) y `color` (`rojo`/`blanco`), `role="img"` con `aria-label`. Code Connect con Size/Color/Estado mapeados.

## Badge

Badge (Figma: set **Badge** y componente **Badge/Counter** de la página Badges), bajo **Data Display/Badge**. Fondo Info, texto blanco Poppins Medium con `size` h1–h6 (alturas 51/40/36/31/23/20) y contador opcional `count` que escala con el badge; `BadgeCounter` standalone (20×20, fondo Secondary, SemiBold). Ambos mapeados con Code Connect.

## Breadcrumbs

Miga de pan (Figma: set **Breadcrumbs**), bajo **Navigation/Breadcrumbs**. `BreadcrumbItem`: separador `chevron-right` opcional + texto Regular — Default en `body`, Active en primario subrayado con `aria-current="page"`; `Breadcrumbs` (`nav`) los apila con gap 10px y oculta el separador del primero. Responsive: 16px → 12px bajo 768px (la variante Size de Figma no se mapea). Code Connect con Texto Categoria/Estado/Mostrar Icono.

## Card

Cards del DS (Figma: página **Cards**, frames "Card Photo" y "Card Action"), bajo **Surfaces/Card** en Storybook:

- **`CardPhoto`** — card con imagen, título h5 SemiBold, descripción en `secondary` y acción (ej. Button ghost "Leer más"). **Una sola card** con prop `horizontal`: en desktop pone la imagen a la izquierda (274px, gap 30) y **bajo 768px vuelve automáticamente al diseño vertical** (imagen 212px arriba) — no hay variante mobile separada. Fondo blanco, radio `md`, sombra `autolayout-sm`.
- **`CardAction`** — fecha con separador `gray-300`, título h4 Medium y acción a lo ancho (padding `space-30`, gap `space-20`, borde `background`, sombra `lg-2`).
- **`CardContact`** — contacto centrado: título h4 SemiBold, correo `mailto:` en primario (h5) y contenido libre con `<strong>` en Medium (sombra `md-2`).

Las cards de Figma son frames de documentación sin componentes publicados en la librería, por lo que el Code Connect queda preparado (comentado en `Card.figma.*`) para activarse cuando se publiquen.

## Carousel

Carrusel de imágenes (Figma: component set **Carousel** y dots **Ellipse 4** de la página Carousel), bajo **Data Display/Carousel**. Un solo componente sin variante responsive: alto fijo de 400px y **ancho fluido** que se adapta al contenedor (el comportamiento de la página "Carousel 2", con ejemplos a 288/670/800px). Flechas `arrow-left`/`arrow-right` en primario (izquierda al borde, derecha con inset de 24px, como el master) con vuelta en los extremos, y dots de 10px (activo/hover en primario, resto `secondary`) centrados a 16px del fondo. Uso controlado (`index`/`onIndexChange` en React, `v-model:index` en Vue) o no controlado (`defaultIndex`). Ambos sets mapeados con Code Connect (Number→`defaultIndex`; los dots muestran el snippet del Carousel completo).

## PillNew

Etiqueta "Nuevo" (Figma: componente **Pill new** de la página Badges), bajo **Data Display/PillNew**. Pill de 47×15 con fondo `--color-bg-now` (#F9F9FB, variable de Figma agregada a los tokens), borde 0.5px `gray-100`, punto y texto en Info 10px Medium. Sin props en Figma; el texto es reemplazable por children/slot. Conectado con Code Connect.

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
