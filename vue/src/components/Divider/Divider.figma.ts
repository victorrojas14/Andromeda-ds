import figma, { html } from '@figma/code-connect/html'

/*
 * Code Connect — Divider (Vue)
 *
 * Mapea los componentes publicados de la página "Dividers" del archivo
 * Figma "Ui Kit Web". Cada espaciado es un componente independiente
 * (no un component set), así que hay una llamada por cada uno.
 * "Divider 30px" (1151:23944) existe en la página pero no está
 * publicado en la librería; el componente igual soporta :spacing="30".
 */

figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=1151-23935', {
  example: () => html`
<Divider />`,
  imports: ["import { Divider } from '@andromeda/vue'"],
})

figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=1151-23946', {
  example: () => html`
<Divider :spacing="10" />`,
  imports: ["import { Divider } from '@andromeda/vue'"],
})

figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=1151-23947', {
  example: () => html`
<Divider :spacing="20" />`,
  imports: ["import { Divider } from '@andromeda/vue'"],
})

figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=1151-23965', {
  example: () => html`
<Divider :spacing="40" />`,
  imports: ["import { Divider } from '@andromeda/vue'"],
})

figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=1151-23966', {
  example: () => html`
<Divider :spacing="50" />`,
  imports: ["import { Divider } from '@andromeda/vue'"],
})

figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=1151-23967', {
  example: () => html`
<Divider :spacing="70" />`,
  imports: ["import { Divider } from '@andromeda/vue'"],
})

figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=1151-23968', {
  example: () => html`
<Divider :spacing="90" />`,
  imports: ["import { Divider } from '@andromeda/vue'"],
})
