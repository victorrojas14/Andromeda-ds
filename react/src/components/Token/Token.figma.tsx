import figma from '@figma/code-connect'
import { Token } from './Token'

/**
 * Token — Code Connect
 * Figma: Ui Kit Web — página Token, sets "Token" (8490:6138, Tipo
 * Desktop/Mobile + "Añadir texto"/"Contenido") e "Inputs-Token"
 * (8490:6181, estados Default/Normal/Active/Error). El componente es
 * responsivo (el Tipo Mobile de Figma es el layout <768px) y la prop
 * `tipo` define los dígitos: virtual = 6, físico = 8.
 */

// Token (modal) — set publicado 8490:6138
figma.connect(
  Token,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=8490-6138',
  {
    props: {
      showText: figma.boolean('Añadir texto'),
      text: figma.string('Contenido'),
      tipo: figma.enum('Tipo', { Desktop: 'fisico', Mobile: 'virtual' }),
    },
    example: (props) => (
      <Token tipo={props.tipo} showText={props.showText} text={props.text} />
    ),
  },
)

// Inputs-Token — set publicado 8490:6181
figma.connect(
  Token,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=8490-6181',
  {
    props: {
      error: figma.enum('Token', {
        Default: false,
        Normal: false,
        Active: false,
        Error: true,
      }),
    },
    example: (props) => <Token tipo="fisico" error={props.error} />,
  },
)
