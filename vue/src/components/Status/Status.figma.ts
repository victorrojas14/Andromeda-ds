import figma, { html } from '@figma/code-connect/html'

/*
 * Code Connect — Status (Vue)
 *
 * Mapea los sets publicados "Item_Estatus_v1" (729:6550) e
 * "Item_Estatus_v2" (11856:307) de la página Status. Estado9/Variant9
 * son el slot "Personalizado/Especial" y mapean a su color base.
 */

// Item_Estatus_v1 (punto + texto)
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=729-6550', {
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
  example: (props) => html`
<Status variant="v1" estado="${props.estado}" text="${props.text}" />`,
  imports: ["import { Status } from '@andromeda/vue'"],
})

// Item_Estatus_v2 (pill con fondo tenue)
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=11856-307', {
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
  example: (props) => html`
<Status variant="v2" estado="${props.estado}" text="Texto" />`,
  imports: ["import { Status } from '@andromeda/vue'"],
})
