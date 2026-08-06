import figma, { html } from '@figma/code-connect/html'

/*
 * Code Connect — Avatar (Vue)
 *
 * Mapea el component set publicado "Avatar" (9274:15849) de la página
 * Avatar del archivo Figma "Ui Kit Web". El Estado de Figma se deriva
 * de las props en código: Foto -> src, Iniciales -> initials, Default
 * -> sin ambas (placeholder).
 */

figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=9274-15849', {
  props: {
    size: figma.enum('Size', { '40': '40', '60': '60', '100': '100', '200': '200' }),
    color: figma.enum('Color', { Rojo: 'rojo', Blanco: 'blanco' }),
    initials: figma.enum('Estado', { Iniciales: 'CM' }),
    src: figma.enum('Estado', { Foto: '/ruta/a/la/foto.jpg' }),
  },
  example: (props) => html`
<Avatar :size="${props.size}" color="${props.color}" initials="${props.initials}" src="${props.src}" alt="Nombre Apellido" />`,
  imports: ["import { Avatar } from '@andromeda/vue'"],
})
