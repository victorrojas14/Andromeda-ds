import figma from '@figma/code-connect'
import { Badge, BadgeCounter } from './Badge'

/*
 * Code Connect — Badge (React)
 *
 * Mapea los componentes publicados de la página "Badges" del archivo
 * Figma "Ui Kit Web":
 *   - Badge (312:2496): Tamaño Badge h1..h6, Texto Badge, Mostrar counter
 *   - Badge/Counter (312:2515): Number
 */

figma.connect(
  Badge,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=312-2496',
  {
    props: {
      children: figma.string('Texto Badge'),
      size: figma.enum('Tamaño', {
        'Badge h1': 'h1',
        'Badge h2': 'h2',
        'Badge h3': 'h3',
        'Badge h4': 'h4',
        'Badge h5': 'h5',
        'Badge h6': 'h6',
      }),
      count: figma.boolean('Mostrar counter', {
        true: 1,
        false: undefined,
      }),
    },
    example: ({ children, size, count }) => (
      <Badge size={size} count={count}>
        {children}
      </Badge>
    ),
  },
)

figma.connect(
  BadgeCounter,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=312-2515',
  {
    props: {
      count: figma.string('Number'),
    },
    example: ({ count }) => <BadgeCounter count={count} />,
  },
)
