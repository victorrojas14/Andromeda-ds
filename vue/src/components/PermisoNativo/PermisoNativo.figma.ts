import figma, { html } from '@figma/code-connect/html'

/*
 * Code Connect — PermisoNativo (Vue)
 *
 * Mapea el set publicado "Component 1" (13580:38176) de la página
 * "Permisos nativos web" con Type=Notificaciones|Ubicación|Microfono.
 */

figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=13580-38176', {
  props: {
    type: figma.enum('Type', {
      Notificaciones: 'notificaciones',
      'Ubicación': 'ubicacion',
      Microfono: 'microfono',
    }),
  },
  example: (props) => html`
<PermisoNativo type="${props.type}" site="www.invex.com" />`,
  imports: ["import { PermisoNativo } from '@andromeda/vue'"],
})
