import type { Meta, StoryObj } from '@storybook/react'
import { Loading } from './Loading'

const meta: Meta<typeof Loading> = {
  title: 'Feedback/Loading',
  component: Loading,
  parameters: { layout: 'padded' },
  argTypes: {
    color: {
      control: 'inline-radio',
      options: ['red', 'white'],
      description: 'Variante de color (Figma: Color=Red|White)',
    },
    size: { control: 'number', description: 'Tamaño en px (Figma: 100)' },
    label: { control: 'text', description: 'Etiqueta accesible' },
  },
}

export default meta
type Story = StoryObj<typeof Loading>

export const Red: Story = {
  args: { color: 'red', size: 100 },
}

export const White: Story = {
  name: 'White (fondo oscuro)',
  render: (args) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 60,
        background: 'var(--color-secondary)',
        borderRadius: 10,
      }}
    >
      <Loading {...args} />
    </div>
  ),
  args: { color: 'white', size: 100 },
}

export const Tamanos: Story = {
  name: 'Tamaños',
  render: () => (
    <div style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
      <Loading size={24} />
      <Loading size={48} />
      <Loading size={100} />
      <Loading size={150} />
    </div>
  ),
}
