import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Menu } from './Menu'

const meta: Meta<typeof Menu> = {
  title: 'Navigation/Menu',
  component: Menu,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    items: { control: 'object', description: 'Items (strings o { label, showIcon })' },
    active: { control: 'number', description: 'Índice activo (controlado)' },
    defaultActive: { control: 'number' },
    userName: { control: 'text', description: 'Mobile (Figma: "Nombre Usuario")' },
    userInitials: { control: 'text', description: 'Mobile (Figma: "Iniciales")' },
    lastAccess: { control: 'text', description: 'Mobile: texto de último acceso' },
    showUser: { control: 'boolean', description: 'Barra de usuario en mobile' },
    showProductsButton: { control: 'boolean', description: 'Botón Mis productos en mobile' },
    onChange: { action: 'change' },
    onProductsClick: { action: 'productsClick' },
    onUserClick: { action: 'userClick' },
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
    userName: 'Nombre Usuario',
    userInitials: 'NU',
    lastAccess: 'Último acceso: 08/05/2023 10:25 a.m.',
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
