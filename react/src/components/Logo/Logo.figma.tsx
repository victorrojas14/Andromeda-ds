import figma from '@figma/code-connect'
import { Logo } from './Logo'

/*
 * Code Connect — Logo (React)
 *
 * Mapea los componentes de marca publicados en la librería del archivo
 * Figma "Ui Kit Web" (página "🟢 Logos") a este componente Logo:
 *   - Logotipos-Todos  (component set, property "Seleccionar")
 *   - Logo-InvexTodos  (component set, property "Selecionar Logo" —
 *     typo real en Figma, se respeta)
 *   - logo/InvexRenacer y logo/InvexFiduciario (componentes sueltos)
 */

figma.connect(
  Logo,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=7375-5545',
  {
    props: {
      variant: figma.enum('Seleccionar', {
        Invex: 'invex',
        InvexBanco: 'invex-banco',
        InvexFiduciario: 'invex-fiduciario',
        InvexRenacer: 'invex-renacer',
      }),
    },
    example: ({ variant }) => <Logo variant={variant} />,
  },
)

figma.connect(
  Logo,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=7387-6375',
  {
    props: {
      variant: figma.enum('Selecionar Logo', {
        Invex: 'invex',
        'Invex-Banco': 'invex-banco',
        Fiduciario: 'invex-fiduciario',
        Renacer: 'invex-renacer',
      }),
    },
    example: ({ variant }) => <Logo variant={variant} />,
  },
)

figma.connect(
  Logo,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=1007-1524',
  {
    example: () => <Logo variant="invex-renacer" />,
  },
)

figma.connect(
  Logo,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=806-5988',
  {
    example: () => <Logo variant="invex-fiduciario" />,
  },
)
