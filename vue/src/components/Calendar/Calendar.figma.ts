import figma, { html } from '@figma/code-connect/html'

/*
 * Code Connect — Calendar (Vue)
 *
 * Mapea el componente publicado "Calendario--Form" (128:2669) y el set
 * "NumeroCalendario" (9516:6331) de la página Forms. Los estados de la
 * celda (Default/Disabled/Selected/Weekend/Current day/timelapse) los
 * resuelve dinámicamente el Calendar según la fecha.
 */

// Calendario--Form (panel del calendario)
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=128-2669', {
  props: {},
  example: () => html`
<Calendar variant="primary" model-value="2023-07-24" />`,
  imports: ["import { Calendar } from '@andromeda/vue'"],
})

// NumeroCalendario (celda de día)
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=9516-6331', {
  props: {},
  example: () => html`
<Calendar variant="primary" />`,
  imports: ["import { Calendar } from '@andromeda/vue'"],
})
