import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Menu } from './Menu'

const meta: Meta<typeof Menu> = {
  title: 'Navigation/Menu',
  component: Menu,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    items: {
      control: 'object',
      description: 'Items (strings o { label, icon, showLeftIcon, showIcon })',
    },
    active: { control: 'number', description: 'Índice activo (controlado)' },
    defaultActive: { control: 'number' },
    open: { control: 'boolean', description: 'Menú mobile Abierto/Cerrado (controlado)' },
    defaultOpen: { control: 'boolean', description: 'Estado inicial Abierto/Cerrado del mobile' },
    onChange: { action: 'change' },
    onOpenChange: { action: 'openChange' },
  },
}

export default meta
type Story = StoryObj<typeof Menu>

export const Playground: Story = {
  args: {
    items: [
      'Inicio',
      'Cuentas',
      'Transferencias',
      'Inversiones',
      'Tarjetas',
      'Créditos',
      'Servicios',
      'Ayuda',
    ],
    defaultActive: 0,
    defaultOpen: true,
  },
}

export const ConIconos: Story = {
  name: 'Con iconos (Mostrar Icono)',
  args: {
    ...Playground.args,
    items: [
      { label: 'Menú', showIcon: true },
      { label: 'Menú', showIcon: true },
      { label: 'Menú' },
      { label: 'Menú' },
    ],
  },
}

export const MenuLateral: Story = {
  name: 'Menú lateral (ejemplo mobile)',
  args: {
    items: [
      { label: 'Inicio', icon: 'home-outline' },
      { label: 'Monitor de flujos', icon: 'monitoring' },
      { label: 'Emisiones de ventanilla', icon: 'file-document-outline' },
      { label: 'Emisiones bursátiles', icon: 'chart' },
      { label: 'Reportes', icon: 'file-document-multiple-outline', showIcon: true },
      { label: 'Utilerías', icon: 'tools' },
    ],
    defaultActive: 3,
    defaultOpen: true,
  },
}

export const Controlado: Story = {
  render: (args) => {
    const [activo, setActivo] = useState(0)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Menu {...args} active={activo} onChange={setActivo} />
        <p style={{ fontFamily: 'var(--font-family-sans)', fontSize: 14, padding: '0 20px' }}>
          Item activo: <strong>{activo}</strong>
        </p>
      </div>
    )
  },
  args: { ...Playground.args },
}
