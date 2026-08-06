import type { Meta, StoryObj } from '@storybook/react'
import { Alert, AlertBlock } from './Alert'
import { Button } from '../Button'

/*
 * Feedback / Alert
 * Figma: página "Alerts" (nodes 9274:5251 y 9274:14594), component
 * sets "Alerta" y "Alertas con accion".
 */

const meta = {
  title: 'Feedback/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Alerta del DS Andromeda (Figma: "Alerta"). Fondo semántico light con textos e iconos en el tono dark, mensaje destacado con divisor, acción opcional y botón de cerrar. `AlertBlock` es la variante en bloque con título ("Alertas con accion").',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['success', 'warning', 'danger', 'info'],
      description: 'Estado semántico (Figma: Estado).',
    },
    message: { control: 'text', description: 'Mensaje destacado (Figma: "Mensaje Alerta").' },
    children: { control: 'text', description: 'Texto de la alerta (Figma: "Texto Contenido").' },
    closable: { control: 'boolean', description: 'Botón de cerrar (Figma: "Mostrar Icon Der").' },
  },
  args: {
    variant: 'success',
    message: 'MENSAJE ALERTA',
    children: 'Texto Contenido.',
    closable: true,
  },
} satisfies Meta<typeof Alert>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <div style={{ maxWidth: 684 }}>
      <Alert {...args} key={JSON.stringify(args)} />
    </div>
  ),
}

export const Estados: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 684 }}>
      <Alert variant="success" message="MENSAJE ALERTA">
        Texto Contenido.
      </Alert>
      <Alert variant="warning" message="MENSAJE ALERTA">
        Texto Contenido.
      </Alert>
      <Alert variant="danger" message="MENSAJE ALERTA">
        Texto Contenido.
      </Alert>
      <Alert variant="info" message="MENSAJE ALERTA">
        Texto Contenido.
      </Alert>
    </div>
  ),
}

export const ConAccion: Story = {
  name: 'Con acción',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 684 }}>
      {(['success', 'warning', 'info'] as const).map((variant) => (
        <Alert
          key={variant}
          variant={variant}
          message="MENSAJE ALERTA"
          action={
            <Button
              variant="secondary"
              appearance="outline"
              size="sm"
              style={{ borderRadius: 'var(--radius-xl)', background: 'var(--color-white)' }}
            >
              Verificar
            </Button>
          }
        >
          Texto Contenido.
        </Alert>
      ))}
    </div>
  ),
}

export const SinExtras: Story = {
  name: 'Solo contenido',
  render: () => (
    <div style={{ maxWidth: 684 }}>
      <Alert variant="info" icon={null} closable={false}>
        Texto Contenido.
      </Alert>
    </div>
  ),
}

export const Bloque: Story = {
  name: 'AlertBlock (con título)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 976 }}>
      {(['success', 'warning', 'info'] as const).map((variant) => (
        <AlertBlock
          key={variant}
          variant={variant}
          footer="Siempre que lo necesite, asegúrese de usar utilidades de margen para mantener las cosas ordenadas y ordenadas."
        >
          Aww sí, leíste con éxito este importante mensaje de alerta. Este texto de ejemplo se
          extenderá un poco más para que pueda ver cómo funciona el espaciado dentro de una alerta
          con este tipo de contenido.
        </AlertBlock>
      ))}
    </div>
  ),
}
