import figma, { html } from '@figma/code-connect/html'

/*
 * Code Connect — Tabs (Vue)
 *
 * Mapea los sets publicados "Tabs-1" (175:4777, tab primary con
 * subrayado), "Tab secundario" (14033:4376, segmented) y "Tab-atom"
 * (14031:9608) de la página Tabs. Size=Desktop|Mobile es el mismo
 * componente responsivo (<768px).
 */

// Tabs-1 (tab primary)
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=175-4777', {
  props: {
    label: figma.string('Texto'),
    activeStyle: figma.enum('Estado', {
      'Active primary': 'primary',
      'Active secundary': 'secondary',
    }),
  },
  example: (props) => html`
<Tabs
  variant="primary"
  active-style="${props.activeStyle}"
  :items="[
    { label: '${props.label}', iconLeft: 'account-outline', iconRight: 'account-outline' },
    'Texto Tab',
  ]"
/>`,
  imports: ["import { Tabs } from '@andromeda/vue'"],
})

// Tab secundario (segmented)
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=14033-4376', {
  props: {
    items: figma.enum('Quantity', {
      '2': "['Text', 'Text']",
      '3': "['Text', 'Text', 'Text']",
      '4': "['Text', 'Text', 'Text', 'Text']",
      '5': "['Text', 'Text', 'Text', 'Text', 'Text']",
    }),
  },
  example: (props) => html`
<Tabs variant="secondary" :items="${props.items}" />`,
  imports: ["import { Tabs } from '@andromeda/vue'"],
})

// Tab-atom (segmento individual)
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=14031-9608', {
  props: {
    label: figma.string('TextContent'),
  },
  example: (props) => html`
<Tabs variant="secondary" :items="['${props.label}', 'Text']" />`,
  imports: ["import { Tabs } from '@andromeda/vue'"],
})
