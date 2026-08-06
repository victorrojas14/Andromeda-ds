import figma, { html } from '@figma/code-connect/html'

/*
 * Code Connect — Breadcrumbs (Vue)
 *
 * Mapea el component set publicado "Breadcrumbs" (321:1142) de la
 * página Breadcrumbs del archivo Figma "Ui Kit Web". El set define el
 * ITEM de la miga; en código se apilan dentro de <Breadcrumbs>.
 * La variante Size (Desktop/Mobile) no se mapea: el componente es
 * responsive y adopta el diseño mobile según el viewport (< 768px).
 */

figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=321-1142', {
  props: {
    label: figma.string('Texto Categoria'),
    active: figma.enum('Estado', { Active: 'true', Default: 'false' }),
    icon: figma.boolean('Mostrar Icono'),
  },
  example: (props) => html`
<BreadcrumbItem :active="${props.active}" :icon="${props.icon}" href="/categoria">
  ${props.label}
</BreadcrumbItem>`,
  imports: ["import { BreadcrumbItem } from '@andromeda/vue'"],
})
