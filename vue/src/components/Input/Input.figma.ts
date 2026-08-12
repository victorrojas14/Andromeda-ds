import figma, { html } from '@figma/code-connect/html'

/*
 * Code Connect — Input (Vue)
 *
 * Mapea los component sets publicados de la página "Forms":
 * Form-SM (579:992), Form-MD (576:6870) y Form-LG (578:7307).
 * Estados: Error/"No llenado" -> error; Disabled -> disabled;
 * "Llenado-Bloqueado" -> readonly; Default/Normal/Active son estados
 * dinámicos del propio input (label flotante y foco).
 */

figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=579-992', {
  props: {
    label: figma.string('Texto Label'),
    assist: figma.string('Texto Asistencia'),
    error: figma.enum('Estado', { Error: 'true', 'No llenado': 'true' }),
    disabled: figma.enum('Estado', { Disabled: 'true' }),
    readonly: figma.enum('Estado', { 'Llenado-Bloqueado': 'true' }),
  },
  example: (props) => html`
<Input
  size="sm"
  label="${props.label}"
  assist="${props.assist}"
  :error="${props.error}"
  :disabled="${props.disabled}"
  :readonly="${props.readonly}"
/>`,
  imports: ["import { Input } from '@andromeda/vue'"],
})

figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=576-6870', {
  props: {
    label: figma.string('Texto Label'),
    assist: figma.string('Texto Asistencia'),
    error: figma.enum('Estado', { Error: 'true', 'No llenado': 'true' }),
    disabled: figma.enum('Estado', { Disabled: 'true' }),
    readonly: figma.enum('Estado', { 'Llenado-Bloqueado': 'true' }),
  },
  example: (props) => html`
<Input
  size="md"
  label="${props.label}"
  assist="${props.assist}"
  :error="${props.error}"
  :disabled="${props.disabled}"
  :readonly="${props.readonly}"
/>`,
  imports: ["import { Input } from '@andromeda/vue'"],
})

figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=578-7307', {
  props: {
    label: figma.string('Texto Label'),
    assist: figma.string('Texto Asistencia'),
    error: figma.enum('Estado', { Error: 'true', 'No llenado': 'true' }),
    disabled: figma.enum('Estado', { Disabled: 'true' }),
    readonly: figma.enum('Estado', { 'Llenado-Bloqueado': 'true' }),
  },
  example: (props) => html`
<Input
  size="lg"
  label="${props.label}"
  assist="${props.assist}"
  :error="${props.error}"
  :disabled="${props.disabled}"
  :readonly="${props.readonly}"
/>`,
  imports: ["import { Input } from '@andromeda/vue'"],
})
