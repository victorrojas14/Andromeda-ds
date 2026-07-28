import figma, { html } from '@figma/code-connect/html'

/*
 * Code Connect — Accordion (Vue)
 *
 * Mapea los component sets publicados de la página "Accordion" del
 * archivo Figma "Ui Kit Web":
 *   - Acordeon (9259:1528): Estado Cerrado/Abierto × Size Desktop/Mobile
 *   - Item Accordion 2 (9259:1495): Size Desktop/Mobile
 * Los sets "Acordeon NO USAR" (191:4506) e "Item Accordion NO USAR"
 * (3598:240) están deprecados en el DS y no se mapean a propósito.
 */

// La variante Size (Desktop/Mobile) de ambos sets no se mapea: los
// componentes son responsive y adoptan el diseño mobile según el
// viewport (< 768px).

figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=9259-1528', {
  props: {
    title: figma.string('Texto Titulo'),
    open: figma.enum('Estado', { Abierto: 'true', Cerrado: 'false' }),
  },
  example: (props) => html`
<Accordion title="${props.title}" :default-open="${props.open}">
  <template #icon><Icon name="account-outline" :size="24" /></template>
  Contenido del acordeón
</Accordion>`,
  imports: ["import { Accordion, Icon } from '@andromeda/vue'"],
})

figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=9259-1495', {
  props: {
    title: figma.string('Ttitulo'),
  },
  example: (props) => html`
<AccordionItem title="${props.title}">
  <template #icon><Icon name="account-outline" :size="24" /></template>
</AccordionItem>`,
  imports: ["import { AccordionItem, Icon } from '@andromeda/vue'"],
})
