import figma, { html } from '@figma/code-connect/html'

/*
 * Code Connect — Multiselect (Vue)
 *
 * Mapea el set publicado "Multiselect dropdown" (13299:2287) de la
 * página Forms y el chip "Pill" (13357:3885). Los estados
 * Enable/Expanded/One/Multiple/Partial/All son dinámicos (selección
 * y apertura del propio componente); Disable -> disabled.
 */

// Multiselect dropdown — set publicado 13299:2287
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=13299-2287', {
  props: {
    disabled: figma.enum('State', { Disable: 'true' }),
  },
  example: (props) => html`
<Multiselect
  label="Selecciona"
  :disabled="${props.disabled}"
  :options="['Texto opcion 1', 'Texto opcion 2', 'Texto opcion 3', 'Texto opcion 4', 'Texto opcion 5']"
/>`,
  imports: ["import { Multiselect } from '@andromeda/vue'"],
})

// Pill (chip de seleccionado en el trigger) — componente publicado 13357:3885
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=13357-3885', {
  props: {
    texto: figma.string('Text content'),
  },
  example: (props) => html`
<Multiselect
  label="Selecciona"
  :options="['${props.texto}']"
  :model-value="['${props.texto}']"
/>`,
  imports: ["import { Multiselect } from '@andromeda/vue'"],
})
