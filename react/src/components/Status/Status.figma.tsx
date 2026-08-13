import figma from '@figma/code-connect'
import { Status } from './Status'

/**
 * Status — Code Connect
 * Figma: Ui Kit Web — página Status, sets "Item_Estatus_v1"
 * (729:6550) e "Item_Estatus_v2" (11856:307). Estado9/Variant9 son el
 * slot "Personalizado/Especial" y mapean a su color base.
 */

// Item_Estatus_v1 (punto + texto) — set publicado 729:6550
figma.connect(
  Status,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=729-6550',
  {
    props: {
      text: figma.string('Texto'),
      estado: figma.enum('Estado', {
        Verde: 'verde',
        Gris: 'gris',
        Azul: 'azul',
        Amarillo: 'amarillo',
        Rojo: 'rojo',
        Morado: 'morado',
        Naranja: 'naranja',
        Magenta: 'magenta',
        Estado9: 'naranja',
      }),
    },
    example: (props) => (
      <Status variant="v1" estado={props.estado} text={props.text} />
    ),
  },
)

// Item_Estatus_v2 (pill con fondo tenue) — set publicado 11856:307
figma.connect(
  Status,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=11856-307',
  {
    props: {
      estado: figma.enum('Property 1', {
        Verde: 'verde',
        Gris: 'gris',
        Azul: 'azul',
        Amarillo: 'amarillo',
        Rojo: 'rojo',
        Morado: 'morado',
        Naranja: 'naranja',
        Magenta: 'magenta',
        Variant9: 'amarillo',
      }),
    },
    example: (props) => (
      <Status variant="v2" estado={props.estado} text="Texto" />
    ),
  },
)
