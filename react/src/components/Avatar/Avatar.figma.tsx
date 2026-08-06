import figma from '@figma/code-connect'
import { Avatar } from './Avatar'

/*
 * Code Connect — Avatar (React)
 *
 * Mapea el component set publicado "Avatar" (9274:15849) de la página
 * Avatar del archivo Figma "Ui Kit Web". El Estado de Figma se deriva
 * de las props en código: Foto -> src, Iniciales -> initials, Default
 * -> sin ambas (placeholder).
 */

figma.connect(
  Avatar,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=9274-15849',
  {
    props: {
      size: figma.enum('Size', { '40': 40, '60': 60, '100': 100, '200': 200 }),
      color: figma.enum('Color', { Rojo: 'rojo', Blanco: 'blanco' }),
      initials: figma.enum('Estado', {
        Iniciales: 'CM',
        Default: undefined,
        Foto: undefined,
      }),
      src: figma.enum('Estado', {
        Foto: '/ruta/a/la/foto.jpg',
        Default: undefined,
        Iniciales: undefined,
      }),
    },
    example: ({ size, color, initials, src }) => (
      <Avatar size={size} color={color} initials={initials} src={src} alt="Nombre Apellido" />
    ),
  },
)
