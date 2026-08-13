import figma, { html } from '@figma/code-connect/html'

/*
 * Code Connect — Controls (Vue)
 *
 * Mapea los sets publicados de la página Forms: "Switch atom"
 * (1151:3067), "Switch" (576:6645), "CheckBox" (576:6686) y
 * "RadioButton" (576:6657). On-Multiple del CheckBox tiene el mismo
 * visual que On (listas de selección múltiple).
 */

// Switch atom (toggle sin texto)
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=1151-3067', {
  props: {
    checked: figma.enum('Estatus', { on: 'true', off: 'false' }),
  },
  example: (props) => html`
<Switch :model-value="${props.checked}" />`,
  imports: ["import { Switch } from '@andromeda/vue'"],
})

// Switch (toggle + texto)
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=576-6645', {
  props: {
    label: figma.boolean('Mostrar Texto', {
      true: figma.string('Texto'),
      false: undefined,
    }),
    checked: figma.enum('Estado', {
      On: 'true',
      'On Disabled': 'true',
      Off: 'false',
      'Off Disabled': 'false',
    }),
    disabled: figma.enum('Estado', {
      'On Disabled': 'true',
      'Off Disabled': 'true',
    }),
  },
  example: (props) => html`
<Switch
  label="${props.label}"
  :model-value="${props.checked}"
  :disabled="${props.disabled}"
/>`,
  imports: ["import { Switch } from '@andromeda/vue'"],
})

// CheckBox
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=576-6686', {
  props: {
    label: figma.boolean('Mostrar Texto', {
      true: figma.string('Texto'),
      false: undefined,
    }),
    checked: figma.enum('Estado', {
      On: 'true',
      'On-Disabled': 'true',
      'On-Multiple': 'true',
      Off: 'false',
      'Off-Disabled': 'false',
    }),
    disabled: figma.enum('Estado', {
      'On-Disabled': 'true',
      'Off-Disabled': 'true',
    }),
  },
  example: (props) => html`
<Checkbox
  label="${props.label}"
  :model-value="${props.checked}"
  :disabled="${props.disabled}"
/>`,
  imports: ["import { Checkbox } from '@andromeda/vue'"],
})

// RadioButton
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=576-6657', {
  props: {
    label: figma.boolean('Mostrar Texto', {
      true: figma.string('Texto'),
      false: undefined,
    }),
    checked: figma.enum('Estado', {
      On: 'true',
      'On-Disabled': 'true',
      Off: 'false',
      'Off-Disabled': 'false',
    }),
    disabled: figma.enum('Estado', {
      'On-Disabled': 'true',
      'Off-Disabled': 'true',
    }),
  },
  example: (props) => html`
<RadioButton
  label="${props.label}"
  :model-value="${props.checked}"
  :disabled="${props.disabled}"
/>`,
  imports: ["import { RadioButton } from '@andromeda/vue'"],
})
