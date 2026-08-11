import figma, { html } from '@figma/code-connect/html'

/*
 * Code Connect — Variantes de botón (Vue)
 *
 * Mapea los component sets publicados de la página "Buttons variants"
 * (9336:23778): btn/Rounded-LG, btn/Rounded-MD, btn/Mis-Productos,
 * btn-buy y btn-sell. El Estado Hover de Figma se implementa con
 * :hover en CSS, por eso no se mapea como prop.
 */

figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=82-2870', {
  props: {
    label: figma.string('Texto'),
  },
  example: (props) => html`
<ButtonRounded>
  <template #leftIcon><Icon name="account-outline" :size="24" /></template>
  ${props.label}
  <template #rightIcon><Icon name="account-outline" :size="24" /></template>
</ButtonRounded>`,
  imports: ["import { ButtonRounded, Icon } from '@andromeda/vue'"],
})

figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=82-3021', {
  props: {
    title: figma.string('Texto Titulo'),
    contenido: figma.string('Texto Contenido'),
  },
  example: (props) => html`
<ButtonRoundedCard title="${props.title}">${props.contenido}</ButtonRoundedCard>`,
  imports: ["import { ButtonRoundedCard } from '@andromeda/vue'"],
})

figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=5637-1553', {
  props: {
    disabled: figma.enum('Estado', {
      Disabled: 'true',
      Default: 'false',
      Hover: 'false',
      Pressed: 'false',
    }),
  },
  example: (props) => html`
<ButtonMisProductos :disabled="${props.disabled}" />`,
  imports: ["import { ButtonMisProductos } from '@andromeda/vue'"],
})

figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=8471-1337', {
  props: {
    selected: figma.enum('Buy', {
      'Selected - hover': 'true',
      Default: 'false',
    }),
  },
  example: (props) => html`
<ButtonTrade variant="buy" :selected="${props.selected}" />`,
  imports: ["import { ButtonTrade } from '@andromeda/vue'"],
})

figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=8471-1346', {
  props: {
    selected: figma.enum('Property 1', {
      'Selected -hover': 'true',
      Default: 'false',
    }),
  },
  example: (props) => html`
<ButtonTrade variant="sell" :selected="${props.selected}" />`,
  imports: ["import { ButtonTrade } from '@andromeda/vue'"],
})
