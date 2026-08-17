import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../Button'
import { PermisoNativo, type PermisoNativoType } from './PermisoNativo'

const meta: Meta<typeof PermisoNativo> = {
  title: 'Overlays/PermisoNativo',
  component: PermisoNativo,
  parameters: { layout: 'centered' },
  argTypes: {
    type: {
      control: 'inline-radio',
      options: ['notificaciones', 'ubicacion', 'microfono'],
      description: 'Figma: Type=Notificaciones|Ubicación|Microfono',
    },
    site: { control: 'text' },
    requestText: { control: 'text', description: 'Texto de la solicitud (default según tipo)' },
    open: { control: 'boolean' },
    fixed: { control: 'boolean', description: 'Anclado arriba a la izquierda como el navegador' },
    onClose: { action: 'close' },
    onAllow: { action: 'allow' },
    onAllowThisTime: { action: 'allowThisTime' },
    onBlock: { action: 'block' },
  },
}

export default meta
type Story = StoryObj<typeof PermisoNativo>

export const Notificaciones: Story = {
  args: { type: 'notificaciones' },
}

export const Ubicacion: Story = {
  name: 'Ubicación',
  args: { type: 'ubicacion' },
}

export const Microfono: Story = {
  name: 'Micrófono',
  args: { type: 'microfono' },
}

/** Ejemplo: el prompt aparece al llamar el permiso desde un botón */
const DemoDesdeBoton = () => {
  const [abierto, setAbierto] = useState<PermisoNativoType | null>(null)
  const [resultado, setResultado] = useState('')

  const responder = (texto: string) => {
    setResultado(texto)
    setAbierto(null)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        alignItems: 'flex-start',
        fontFamily: 'var(--font-family-sans)',
      }}
    >
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Button
          variant="primary"
          appearance="solid"
          size="md"
          onClick={() => setAbierto('notificaciones')}
        >
          Pedir notificaciones
        </Button>
        <Button
          variant="primary"
          appearance="outline"
          size="md"
          onClick={() => setAbierto('ubicacion')}
        >
          Pedir ubicación
        </Button>
        <Button
          variant="primary"
          appearance="outline"
          size="md"
          onClick={() => setAbierto('microfono')}
        >
          Pedir micrófono
        </Button>
      </div>
      {resultado && (
        <p style={{ margin: 0, fontSize: 14, color: 'var(--color-body)' }}>
          Respuesta: <strong>{resultado}</strong>
        </p>
      )}
      {abierto && (
        <PermisoNativo
          type={abierto}
          fixed
          onClose={() => responder('cerrado')}
          onAllow={() => responder('permitido')}
          onAllowThisTime={() => responder('permitido esta vez')}
          onBlock={() => responder('bloqueado')}
        />
      )}
    </div>
  )
}

export const DesdeUnBoton: Story = {
  name: 'Desde un botón (como el navegador)',
  parameters: { layout: 'padded' },
  render: () => <DemoDesdeBoton />,
}
