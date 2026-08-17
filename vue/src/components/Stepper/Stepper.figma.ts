import figma, { html } from '@figma/code-connect/html'

/*
 * Code Connect — Stepper (Vue)
 *
 * Mapea los nodos publicados de la página Steppers: "Items Progress
 * Tracker 2" (546:7178, horizontal), "Items Progress Tracker 1"
 * (546:7071, vertical), "Stepper Web + 5" (7849:1987), "Stepper
 * Mobile" (1114:4660) y "Stepper Mobile 2.0" (7849:1988).
 */

// Items Progress Tracker 2 (horizontal) — set publicado 546:7178
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=546-7178', {
  props: {
    label: figma.string('Texto'),
    showLabels: figma.boolean('Mostrar Texto'),
  },
  example: (props) => html`
<Stepper
  orientation="horizontal"
  :steps="['${props.label}', 'TEXTO', 'TEXTO']"
  :active="0"
  :show-labels="${props.showLabels}"
/>`,
  imports: ["import { Stepper } from '@andromeda/vue'"],
})

// Items Progress Tracker 1 (vertical) — set publicado 546:7071
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=546-7071', {
  props: {
    label: figma.string('Texto'),
    showLabels: figma.boolean('Mostrar Texto'),
  },
  example: (props) => html`
<Stepper
  orientation="vertical"
  :steps="['${props.label}', 'TEXTO', 'TEXTO']"
  :active="0"
  :show-labels="${props.showLabels}"
/>`,
  imports: ["import { Stepper } from '@andromeda/vue'"],
})

// Stepper Web + 5 — componente publicado 7849:1987
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=7849-1987', {
  props: {
    titulo: figma.string('Titulo'),
  },
  example: (props) => html`
<Stepper
  :steps="['${props.titulo}', 'Título sección', 'Título sección', 'Título sección', 'Título sección', 'Título sección']"
  :active="0"
/>`,
  imports: ["import { Stepper } from '@andromeda/vue'"],
})

// Stepper Mobile (≤5 pasos) — set publicado 1114:4660
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=1114-4660', {
  props: {
    titulo: figma.string('Texto'),
  },
  example: (props) => html`
<Stepper
  :steps="['${props.titulo}', 'Título sección', 'Título sección', 'Título sección']"
  :active="0"
/>`,
  imports: ["import { Stepper } from '@andromeda/vue'"],
})

// Stepper Mobile 2.0 (>5 pasos, aro) — componente publicado 7849:1988
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=7849-1988', {
  props: {
    titulo: figma.string('Titulo'),
  },
  example: (props) => html`
<Stepper
  :steps="['${props.titulo}', 'Título sección', 'Título sección', 'Título sección', 'Título sección', 'Título sección']"
  :active="0"
/>`,
  imports: ["import { Stepper } from '@andromeda/vue'"],
})
