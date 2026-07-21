import figma, { html } from '@figma/code-connect/html'

/*
 * Code Connect — Button (Vue)
 *
 * Vue no tiene un integrador nativo de Code Connect; se usa el
 * integrador `html` que soporta Vue, Angular y Web Components.
 * El `example` es un template string con markup Vue real.
 *
 * Mapea los component sets del archivo Figma "Ui Kit Web"
 * (fileKey oTZzdsgGkCjbL2f3oybxD0) a este Button consolidado.
 * Los nodeIds se extrajeron de los componentes publicados en la
 * librería (página "🟢 Buttons"). El parser exige literales, por eso
 * las URLs se repiten inline.
 *
 * Quirks del DS actual que se respetan a propósito:
 *   - Los ghosts usan la property "Texto ghost" (y ghost-secondary-MD
 *     usa "Texto Link").
 *   - Los ghosts no tienen estado Pressed.
 *   - btn/secondary-MD no tiene properties: se mapea con un ejemplo fijo.
 *   - No se mapean btn/Rounded-* ni btn/Mis-Productos: tienen otra
 *     anatomía y tendrán su propio componente.
 *
 * Cuando el DS se consolide en UN solo Button en Figma, dejá una sola
 * llamada a figma.connect().
 */

/* ============================================================
 * Solid primary — btn/primary-{XSM|SM|MD|LG}
 * ============================================================ */
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=13775-11069', {
  props: {
    label: figma.string('Texto'),
    disabled: figma.enum('Estado', { Default: false, Hover: false, Pressed: false, Disabled: true }),
  },
  example: (props) => html`
<Button variant="primary" appearance="solid" size="xs" :disabled="${props.disabled}">
  ${props.label}
</Button>`,
  imports: ["import { Button } from '@andromeda/vue'"],
})

figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=76-315', {
  props: {
    label: figma.string('Texto'),
    disabled: figma.enum('Estado', { Default: false, Hover: false, Pressed: false, Disabled: true }),
  },
  example: (props) => html`
<Button variant="primary" appearance="solid" size="sm" :disabled="${props.disabled}">
  ${props.label}
</Button>`,
  imports: ["import { Button } from '@andromeda/vue'"],
})

figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=61-3795', {
  props: {
    label: figma.string('Texto'),
    disabled: figma.enum('Estado', { Default: false, Hover: false, Pressed: false, Disabled: true }),
  },
  example: (props) => html`
<Button variant="primary" appearance="solid" size="md" :disabled="${props.disabled}">
  ${props.label}
</Button>`,
  imports: ["import { Button } from '@andromeda/vue'"],
})

figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=76-225', {
  props: {
    label: figma.string('Texto'),
    disabled: figma.enum('Estado', { Default: false, Hover: false, Pressed: false, Disabled: true }),
  },
  example: (props) => html`
<Button variant="primary" appearance="solid" size="lg" :disabled="${props.disabled}">
  ${props.label}
</Button>`,
  imports: ["import { Button } from '@andromeda/vue'"],
})

/* ============================================================
 * Outline primary — btn/primary-Outline-{SM|MD|LG}
 * ============================================================ */
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=76-491', {
  props: {
    label: figma.string('Texto'),
    disabled: figma.enum('Estado', { Default: false, Hover: false, Pressed: false, Disabled: true }),
  },
  example: (props) => html`
<Button variant="primary" appearance="outline" size="sm" :disabled="${props.disabled}">
  ${props.label}
</Button>`,
  imports: ["import { Button } from '@andromeda/vue'"],
})

figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=76-429', {
  props: {
    label: figma.string('Texto'),
    disabled: figma.enum('Estado', { Default: false, Hover: false, Pressed: false, Disabled: true }),
  },
  example: (props) => html`
<Button variant="primary" appearance="outline" size="md" :disabled="${props.disabled}">
  ${props.label}
</Button>`,
  imports: ["import { Button } from '@andromeda/vue'"],
})

figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=76-523', {
  props: {
    label: figma.string('Texto'),
    disabled: figma.enum('Estado', { Default: false, Hover: false, Pressed: false, Disabled: true }),
  },
  example: (props) => html`
<Button variant="primary" appearance="outline" size="lg" :disabled="${props.disabled}">
  ${props.label}
</Button>`,
  imports: ["import { Button } from '@andromeda/vue'"],
})

/* ============================================================
 * Solid secondary — btn/secondary-{SM|MD|LG}
 * ============================================================ */
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=76-1481', {
  props: {
    label: figma.string('Texto'),
    disabled: figma.enum('Estado', { Default: false, Hover: false, Pressed: false, Disabled: true }),
  },
  example: (props) => html`
<Button variant="secondary" appearance="solid" size="sm" :disabled="${props.disabled}">
  ${props.label}
</Button>`,
  imports: ["import { Button } from '@andromeda/vue'"],
})

// btn/secondary-MD no expone properties en Figma.
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=76-1489', {
  example: () => html`
<Button variant="secondary" appearance="solid" size="md">
  Texto Boton
</Button>`,
  imports: ["import { Button } from '@andromeda/vue'"],
})

figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=76-1497', {
  props: {
    label: figma.string('Texto'),
    disabled: figma.enum('Estado', { Default: false, Hover: false, Pressed: false, Disabled: true }),
  },
  example: (props) => html`
<Button variant="secondary" appearance="solid" size="lg" :disabled="${props.disabled}">
  ${props.label}
</Button>`,
  imports: ["import { Button } from '@andromeda/vue'"],
})

/* ============================================================
 * Outline secondary — btn/secondary-Outline-{SM|MD|XL}
 * (XL se mapea a size="lg", el mayor del Button consolidado)
 * ============================================================ */
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=76-1505', {
  props: {
    label: figma.string('Texto'),
    disabled: figma.enum('Estado', { Default: false, Hover: false, Pressed: false, Disabled: true }),
  },
  example: (props) => html`
<Button variant="secondary" appearance="outline" size="sm" :disabled="${props.disabled}">
  ${props.label}
</Button>`,
  imports: ["import { Button } from '@andromeda/vue'"],
})

figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=76-1513', {
  props: {
    label: figma.string('Texto'),
    disabled: figma.enum('Estado', { Default: false, Hover: false, Pressed: false, Disabled: true }),
  },
  example: (props) => html`
<Button variant="secondary" appearance="outline" size="md" :disabled="${props.disabled}">
  ${props.label}
</Button>`,
  imports: ["import { Button } from '@andromeda/vue'"],
})

figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=76-1527', {
  props: {
    label: figma.string('Texto'),
    disabled: figma.enum('Estado', { Default: false, Hover: false, Pressed: false, Disabled: true }),
  },
  example: (props) => html`
<Button variant="secondary" appearance="outline" size="lg" :disabled="${props.disabled}">
  ${props.label}
</Button>`,
  imports: ["import { Button } from '@andromeda/vue'"],
})

/* ============================================================
 * Ghost primary — btn/ghost-primary-{SM|MD|LG}
 * ============================================================ */
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=513-5257', {
  props: {
    label: figma.string('Texto ghost'),
    disabled: figma.enum('Estado', { Default: false, Hover: false, Disabled: true }),
  },
  example: (props) => html`
<Button variant="primary" appearance="ghost" size="sm" :disabled="${props.disabled}">
  ${props.label}
</Button>`,
  imports: ["import { Button } from '@andromeda/vue'"],
})

figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=210-3922', {
  props: {
    label: figma.string('Texto ghost'),
    disabled: figma.enum('Estado', { Default: false, Hover: false, Disabled: true }),
  },
  example: (props) => html`
<Button variant="primary" appearance="ghost" size="md" :disabled="${props.disabled}">
  ${props.label}
</Button>`,
  imports: ["import { Button } from '@andromeda/vue'"],
})

figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=513-5411', {
  props: {
    label: figma.string('Texto ghost'),
    disabled: figma.enum('Estado', { Default: false, Hover: false, Disabled: true }),
  },
  example: (props) => html`
<Button variant="primary" appearance="ghost" size="lg" :disabled="${props.disabled}">
  ${props.label}
</Button>`,
  imports: ["import { Button } from '@andromeda/vue'"],
})

/* ============================================================
 * Ghost secondary — btn/ghost-secondary-{SM|MD|LG}
 * ============================================================ */
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=513-5570', {
  props: {
    label: figma.string('Texto ghost'),
    disabled: figma.enum('Estado', { Default: false, Hover: false, Disabled: true }),
  },
  example: (props) => html`
<Button variant="secondary" appearance="ghost" size="sm" :disabled="${props.disabled}">
  ${props.label}
</Button>`,
  imports: ["import { Button } from '@andromeda/vue'"],
})

figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=210-4183', {
  props: {
    label: figma.string('Texto Link'),
    disabled: figma.enum('Estado', { Default: false, Hover: false, Disabled: true }),
  },
  example: (props) => html`
<Button variant="secondary" appearance="ghost" size="md" :disabled="${props.disabled}">
  ${props.label}
</Button>`,
  imports: ["import { Button } from '@andromeda/vue'"],
})

figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=513-5544', {
  props: {
    label: figma.string('Texto ghost'),
    disabled: figma.enum('Estado', { Default: false, Hover: false, Disabled: true }),
  },
  example: (props) => html`
<Button variant="secondary" appearance="ghost" size="lg" :disabled="${props.disabled}">
  ${props.label}
</Button>`,
  imports: ["import { Button } from '@andromeda/vue'"],
})
