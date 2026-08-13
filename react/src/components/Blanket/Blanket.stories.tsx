import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../Button'
import { Blanket } from './Blanket'

const meta: Meta<typeof Blanket> = {
  title: 'Overlays/Blanket',
  component: Blanket,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    fixed: { control: 'boolean', description: 'Cubre el viewport o solo su contenedor' },
    onClose: { action: 'close' },
  },
}

export default meta
type Story = StoryObj<typeof Blanket>

export const SobreContenido: Story = {
  name: 'Sobre contenido',
  render: (args) => {
    const [open, setOpen] = useState(true)
    return (
      <div style={{ position: 'relative', minHeight: 360, padding: 24 }}>
        <h3 style={{ fontFamily: 'var(--font-family-sans)' }}>Contenido de la página</h3>
        <p style={{ fontFamily: 'var(--font-family-sans)', fontSize: 14 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <Button variant="primary" appearance="solid" size="md" onClick={() => setOpen(true)}>
          Mostrar blanket
        </Button>
        {open && (
          <Blanket {...args} fixed={false} onClose={() => setOpen(false)}>
            <p style={{ color: 'var(--color-white)', fontFamily: 'var(--font-family-sans)' }}>
              Click fuera de este texto para cerrar
            </p>
          </Blanket>
        )}
      </div>
    )
  },
}
