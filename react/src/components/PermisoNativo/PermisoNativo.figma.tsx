import figma from '@figma/code-connect'
import { PermisoNativo } from './PermisoNativo'

/**
 * PermisoNativo — Code Connect
 * Figma: Ui Kit Web — página "Permisos nativos web", set publicado
 * "Component 1" (13580:38176) con Type=Notificaciones|Ubicación|
 * Microfono.
 */

figma.connect(
  PermisoNativo,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=13580-38176',
  {
    props: {
      type: figma.enum('Type', {
        Notificaciones: 'notificaciones',
        'Ubicación': 'ubicacion',
        Microfono: 'microfono',
      }),
    },
    example: (props) => <PermisoNativo type={props.type} site="www.invex.com" />,
  },
)
