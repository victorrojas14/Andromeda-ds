import figma, { html } from '@figma/code-connect/html'

/*
 * Code Connect — MenuEstatus (Vue)
 *
 * Mapea el set publicado "ItemMenu_Estatus" (3379:2647) de la página
 * Menu con Titulo seccion, Cambiar Icono Izq y Estado (Default /
 * Estatus todos / Completo / Activa / Deshabilitada).
 */

figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=3379-2647', {
  props: {
    title: figma.string('Titulo seccion'),
    estado: figma.enum('Estado', {
      Default: 'default',
      'Estatus todos': 'estatus-todos',
      Completo: 'completo',
      Activa: 'activa',
      Deshabilitada: 'deshabilitada',
    }),
  },
  example: (props) => html`
<MenuEstatus
  :items="[
    { title: '${props.title}', estado: '${props.estado}' },
    { title: 'Titulo seccion' },
    { title: 'Titulo seccion' },
  ]"
/>`,
  imports: ["import { MenuEstatus } from '@andromeda/vue'"],
})
