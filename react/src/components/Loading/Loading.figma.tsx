import figma from '@figma/code-connect'
import { Loading } from './Loading'

/**
 * Loading — Code Connect
 * Figma: Ui Kit Web — página Loading, set "Loading" (1151:23851).
 * Property 1 (1..4) son los frames de la animación — el componente
 * los reproduce rotando el patrón en pasos de 45°.
 */

figma.connect(
  Loading,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=1151-23851',
  {
    props: {
      color: figma.enum('Color', {
        Red: 'red',
        White: 'white',
      }),
    },
    example: (props) => <Loading color={props.color} size={100} />,
  },
)
