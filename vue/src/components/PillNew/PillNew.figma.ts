import figma, { html } from '@figma/code-connect/html'

/*
 * Code Connect — PillNew (Vue)
 *
 * Mapea el componente publicado "Pill new" (13992:3512) de la página
 * Badges del archivo Figma "Ui Kit Web". El componente no expone
 * properties en Figma (texto fijo "Nuevo").
 */

figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=13992-3512', {
  example: () => html`
<PillNew />`,
  imports: ["import { PillNew } from '@andromeda/vue'"],
})
