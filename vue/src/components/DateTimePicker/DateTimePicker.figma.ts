import figma, { html } from '@figma/code-connect/html'

/*
 * Code Connect — DateTimePicker (Vue)
 *
 * Mapea el set publicado "TimeLapse Calendar" (13717:51508) de la
 * página Date Picker. Estados Empty/Half-completed/Completed dinámicos
 * (selección del rango en el propio componente).
 */

figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=13717-51508', {
  props: {
    showBusinessDays: figma.boolean('Mostrar días seleccionados?'),
    showApplyButton: figma.boolean('Mostrar botón aplicar'),
  },
  example: (props) => html`
<DateTimePicker
  start-label="Seleccionar fecha de inicio"
  end-label="Seleccionar fecha de fin"
  :show-business-days="${props.showBusinessDays}"
  :show-apply-button="${props.showApplyButton}"
/>`,
  imports: ["import { DateTimePicker } from '@andromeda/vue'"],
})
