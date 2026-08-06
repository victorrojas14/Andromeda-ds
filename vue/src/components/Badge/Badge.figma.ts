import figma, { html } from '@figma/code-connect/html'

/*
 * Code Connect — Badge (Vue)
 *
 * Mapea los componentes publicados de la página "Badges" del archivo
 * Figma "Ui Kit Web":
 *   - Badge (312:2496): Tamaño Badge h1..h6, Texto Badge, Mostrar counter
 *   - Badge/Counter (312:2515): Number
 */

figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=312-2496', {
  props: {
    label: figma.string('Texto Badge'),
    size: figma.enum('Tamaño', {
      'Badge h1': 'h1',
      'Badge h2': 'h2',
      'Badge h3': 'h3',
      'Badge h4': 'h4',
      'Badge h5': 'h5',
      'Badge h6': 'h6',
    }),
  },
  example: (props) => html`
<Badge size="${props.size}" :count="1">${props.label}</Badge>`,
  imports: ["import { Badge } from '@andromeda/vue'"],
})

figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=312-2515', {
  props: {
    count: figma.string('Number'),
  },
  example: (props) => html`
<BadgeCounter :count="${props.count}" />`,
  imports: ["import { BadgeCounter } from '@andromeda/vue'"],
})
