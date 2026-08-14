import figma from '@figma/code-connect'
import { MenuEstatus } from './MenuEstatus'

/**
 * MenuEstatus — Code Connect
 * Figma: Ui Kit Web — página Menu, set "ItemMenu_Estatus" (3379:2647)
 * con Titulo seccion, Cambiar Icono Izq y Estado (Default / Estatus
 * todos / Completo / Activa / Deshabilitada).
 */

figma.connect(
  MenuEstatus,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=3379-2647',
  {
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
    example: (props) => (
      <MenuEstatus
        items={[
          { title: props.title, estado: props.estado },
          { title: 'Titulo seccion' },
          { title: 'Titulo seccion' },
        ]}
      />
    ),
  },
)
