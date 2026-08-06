import figma from '@figma/code-connect'
import { Alert, AlertBlock } from './Alert'
import { Button } from '../Button'

/*
 * Code Connect — Alert (React)
 *
 * Mapea los component sets publicados de la página "Alerts" del
 * archivo Figma "Ui Kit Web":
 *   - Alerta (157:1859): Estado Success/Warning/Danger/Info
 *   - Alertas con accion (157:3460): Estado Success/Warning/Info
 */

figma.connect(
  Alert,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=157-1859',
  {
    props: {
      variant: figma.enum('Estado', {
        Success: 'success',
        Warning: 'warning',
        Danger: 'danger',
        Info: 'info',
      }),
      message: figma.string('Mensaje Alerta'),
      children: figma.string('Texto Contenido'),
      closable: figma.boolean('Mostrar Icon Der'),
      action: figma.boolean('Mostrar Boton Der', {
        true: (
          <Button variant="secondary" appearance="outline" size="sm">
            Verificar
          </Button>
        ),
        false: undefined,
      }),
    },
    example: ({ variant, message, children, closable, action }) => (
      <Alert variant={variant} message={message} action={action} closable={closable}>
        {children}
      </Alert>
    ),
  },
)

figma.connect(
  AlertBlock,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=157-3460',
  {
    props: {
      variant: figma.enum('Estado', {
        Success: 'success',
        Warning: 'warning',
        Info: 'info',
      }),
    },
    example: ({ variant }) => (
      <AlertBlock
        variant={variant}
        footer="Siempre que lo necesite, asegúrese de usar utilidades de margen para mantener las cosas ordenadas."
      >
        Aww sí, leíste con éxito este importante mensaje de alerta.
      </AlertBlock>
    ),
  },
)
