import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { MenuEstatus } from './MenuEstatus'

const meta: Meta<typeof MenuEstatus> = {
  title: 'Navigation/MenuEstatus',
  component: MenuEstatus,
  parameters: { layout: 'centered' },
  argTypes: {
    items: {
      control: 'object',
      description: 'Items ({ title, status, icon, estado })',
    },
    active: { control: 'number', description: 'Índice activo (controlado)' },
    defaultActive: { control: 'number' },
    onChange: { action: 'change' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 300 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof MenuEstatus>

export const Playground: Story = {
  args: {
    items: [
      { title: 'Titulo seccion', estado: 'completo' },
      { title: 'Titulo seccion', estado: 'estatus-todos' },
      { title: 'Titulo seccion', estado: 'activa' },
      { title: 'Titulo seccion' },
      { title: 'Titulo seccion', estado: 'deshabilitada' },
    ],
    defaultActive: 2,
  },
}

export const Estados: Story = {
  name: 'Estados (Figma)',
  args: {
    items: [
      { title: 'Titulo seccion', estado: 'default' },
      { title: 'Titulo seccion', estado: 'activa' },
      { title: 'Titulo seccion', estado: 'estatus-todos' },
      { title: 'Titulo seccion', estado: 'completo' },
      { title: 'Titulo seccion', estado: 'deshabilitada' },
    ],
  },
}

export const Interactivo: Story = {
  name: 'Interactivo (selección)',
  render: (args) => {
    const [activo, setActivo] = useState(1)
    return <MenuEstatus {...args} active={activo} onChange={setActivo} />
  },
  args: {
    items: [
      { title: 'Datos personales', estado: 'completo' },
      { title: 'Domicilio' },
      { title: 'Datos laborales' },
      { title: 'Documentación', estado: 'deshabilitada' },
    ],
  },
}
