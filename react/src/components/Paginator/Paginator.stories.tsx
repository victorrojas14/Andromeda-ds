import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Paginator } from './Paginator'

const meta: Meta<typeof Paginator> = {
  title: 'Navigation/Paginator',
  component: Paginator,
  parameters: { layout: 'padded' },
  argTypes: {
    pageCount: { control: 'number', description: 'Total de páginas' },
    page: { control: 'number', description: 'Página actual (controlada)' },
    defaultPage: { control: 'number' },
    showText: { control: 'boolean', description: 'Figma: "Mostrar Texto Izq"' },
    maxButtons: { control: 'number', description: 'Números visibles' },
    prevLabel: { control: 'text' },
    nextLabel: { control: 'text' },
    onChange: { action: 'change' },
  },
}

export default meta
type Story = StoryObj<typeof Paginator>

export const Playground: Story = {
  args: { pageCount: 50, defaultPage: 1 },
}

export const SinTexto: Story = {
  name: 'Sin texto',
  args: { pageCount: 10, defaultPage: 2, showText: false },
}

export const Controlado: Story = {
  render: (args) => {
    const [page, setPage] = useState(1)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Paginator {...args} page={page} onChange={setPage} />
        <p style={{ fontFamily: 'var(--font-family-sans)', fontSize: 14 }}>
          Página actual: <strong>{page}</strong>
        </p>
      </div>
    )
  },
  args: { pageCount: 50 },
}
