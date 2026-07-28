import figma from '@figma/code-connect'
import { Accordion, AccordionItem } from './Accordion'
import { Button } from '../Button'
import { Icon } from '../Icon'

/*
 * Code Connect — Accordion (React)
 *
 * Mapea los component sets publicados de la página "Accordion" del
 * archivo Figma "Ui Kit Web":
 *   - Acordeon (9259:1528): Estado Cerrado/Abierto × Size Desktop/Mobile
 *   - Item Accordion 2 (9259:1495): Size Desktop/Mobile
 * Los sets "Acordeon NO USAR" (191:4506) e "Item Accordion NO USAR"
 * (3598:240) están deprecados en el DS y no se mapean a propósito.
 */

figma.connect(
  Accordion,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=9259-1528',
  {
    props: {
      title: figma.string('Texto Titulo'),
      open: figma.enum('Estado', { Abierto: true, Cerrado: false }),
      // La variante Size (Desktop/Mobile) no se mapea: el componente es
      // responsive y adopta el diseño mobile según el viewport.
      // La property de swap del icono izquierdo se llama "Cambiar Icono
      // Der" en Figma (así está definida en el set; se respeta).
      leftIcon: figma.boolean('Mostrar Icono Izq', {
        true: figma.instance('Cambiar Icono Der'),
        false: undefined,
      }),
      headerAction: figma.boolean('Mostrar Boton', {
        true: (
          <Button variant="primary" appearance="ghost" size="sm">
            Default
          </Button>
        ),
        false: undefined,
      }),
    },
    example: ({ title, open, leftIcon, headerAction }) => (
      <Accordion title={title} defaultOpen={open} leftIcon={leftIcon} headerAction={headerAction}>
        Contenido del acordeón
      </Accordion>
    ),
  },
)

figma.connect(
  AccordionItem,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=9259-1495',
  {
    props: {
      title: figma.string('Ttitulo'),
      // La variante Size (Desktop/Mobile) no se mapea: el componente es
      // responsive y adopta el diseño mobile según el viewport.
      leftIcon: figma.boolean('Mostrar Icono Izq', {
        true: figma.instance('Cambiar Icono Izq'),
        false: undefined,
      }),
      rightIcon: figma.boolean('Mostrar Icono Der', {
        true: figma.instance('Cambiar Icono Der'),
        false: <Icon name="chevron-down" size={24} />,
      }),
    },
    example: ({ title, leftIcon, rightIcon }) => (
      <AccordionItem title={title} leftIcon={leftIcon} rightIcon={rightIcon} />
    ),
  },
)
