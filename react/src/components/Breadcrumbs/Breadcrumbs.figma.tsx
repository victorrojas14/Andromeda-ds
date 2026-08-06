import figma from '@figma/code-connect'
import { BreadcrumbItem } from './Breadcrumbs'

/*
 * Code Connect — Breadcrumbs (React)
 *
 * Mapea el component set publicado "Breadcrumbs" (321:1142) de la
 * página Breadcrumbs del archivo Figma "Ui Kit Web". El set define el
 * ITEM de la miga; en código se apilan dentro de <Breadcrumbs>.
 * La variante Size (Desktop/Mobile) no se mapea: el componente es
 * responsive y adopta el diseño mobile según el viewport (< 768px).
 */

figma.connect(
  BreadcrumbItem,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=321-1142',
  {
    props: {
      children: figma.string('Texto Categoria'),
      active: figma.enum('Estado', { Active: true, Default: false }),
      icon: figma.boolean('Mostrar Icono'),
    },
    example: ({ children, active, icon }) => (
      <BreadcrumbItem active={active} icon={icon} href="/categoria">
        {children}
      </BreadcrumbItem>
    ),
  },
)
