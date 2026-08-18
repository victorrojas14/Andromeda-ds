import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Menu } from '../Menu'
import { Header } from './Header'

const meta: Meta<typeof Header> = {
  title: 'Navigation/Header',
  component: Header,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['invex', 'renacer', 'fiduciario'],
      description: 'Figma: Header=Invex|Header-Renacer|Header-Fiduciario',
    },
    userName: { control: 'text', description: 'Figma: "Nombre usuario"' },
    initials: { control: 'text', description: 'Figma: "Iniciales"' },
    lastAccess: { control: 'text' },
    adminLabel: { control: 'text' },
    showHelp: { control: 'boolean', description: 'Figma: "Mostrar Ic Ayuda"' },
    showClock: { control: 'boolean', description: 'Figma: "Mostrar Ic Reloj"' },
    showNotifications: {
      control: 'boolean',
      description: 'Figma: "Mostrar Ic Notificaciones"',
    },
    showSettings: {
      control: 'boolean',
      description: 'Figma: "Mostrar Ic Configuracion"',
    },
    showUserDate: {
      control: 'boolean',
      description: 'Figma: "Mostrar Ususario Fecha"',
    },
    showAdmin: { control: 'boolean', description: 'Figma: "Mostrar Admin"' },
    showInitials: { control: 'boolean', description: 'Figma: "Mostrar Iniciales"' },
    showProductsButton: {
      control: 'boolean',
      description: 'Figma: "Mostrar Boton Acceso"',
    },
    showMenuIcon: { control: 'boolean', description: 'Figma: "Mostrar Ic Menu"' },
    menuOpen: {
      control: 'boolean',
      description: 'Header Mobile: Estado Abierto/Cerrado (hamburguesa ↔ X + drawer)',
    },
    defaultMenuOpen: { control: 'boolean' },
    menuItems: {
      control: 'object',
      description: 'Items del drawer mobile (vacío = lo maneja el consumidor)',
    },
    onMenuItemSelect: { action: 'menuItemSelect' },
    userMenuOpen: { control: 'boolean', description: 'Menu usuario desplegado' },
    defaultUserMenuOpen: { control: 'boolean' },
    productsItems: {
      control: 'object',
      description: 'Items del dropdown de Mis productos (Boton-MisProductos Abierto)',
    },
    productsOpen: { control: 'boolean', description: 'Mis productos desplegado' },
    defaultProductsOpen: { control: 'boolean' },
    onProductsSelect: { action: 'productsSelect' },
    onMenuClick: { action: 'menuClick' },
    onProductsClick: { action: 'productsClick' },
    onNotificationsClick: { action: 'notificationsClick' },
    onUserMenuSelect: { action: 'userMenuSelect' },
  },
}

export default meta
type Story = StoryObj<typeof Header>

export const Playground: Story = {
  args: { variant: 'invex' },
}

export const Marcas: Story = {
  name: 'Las 3 marcas (Header)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Header variant="invex" />
      <Header variant="renacer" />
      <Header variant="fiduciario" />
    </div>
  ),
}

export const SinAdmin: Story = {
  name: 'Sin ADMIN (Mostrar Admin=false)',
  args: { showAdmin: false },
}

export const SinMisProductos: Story = {
  name: 'Sin Mis productos',
  args: { showProductsButton: false },
}

export const SoloUsuarioYMenu: Story = {
  name: 'Solo usuario + menú',
  args: {
    showHelp: false,
    showClock: false,
    showNotifications: false,
    showSettings: false,
    showProductsButton: false,
  },
}

export const SoloIniciales: Story = {
  name: 'Solo iniciales y menú',
  args: {
    showHelp: false,
    showClock: false,
    showNotifications: false,
    showSettings: false,
    showUserDate: false,
    showProductsButton: false,
  },
}

export const SoloMenu: Story = {
  name: 'Solo icono de menú',
  args: {
    showHelp: false,
    showClock: false,
    showNotifications: false,
    showSettings: false,
    showUserDate: false,
    showInitials: false,
    showProductsButton: false,
  },
}

export const MenuUsuarioAbierto: Story = {
  name: 'Menu usuario desplegado',
  args: { defaultUserMenuOpen: true },
}

export const MisProductosAbierto: Story = {
  name: 'Mis productos desplegado',
  args: { defaultProductsOpen: true },
}

export const MenuHamburguesaAbierto: Story = {
  name: 'Hamburguesa desplegada (mobile)',
  parameters: {
    docs: {
      description: {
        story:
          'Ver en un viewport <768px: la hamburguesa despliega el Menu del DS (variante usuario) bajo el header.',
      },
    },
  },
  args: { defaultMenuOpen: true },
}

/** El drawer se puede reemplazar por un Menu propio con menuItems=[] */
const DemoMenuPropio = () => {
  const [abierto, setAbierto] = useState(false)

  return (
    <div>
      <Header
        menuItems={[]}
        menuOpen={abierto}
        onMenuClick={() => setAbierto((v) => !v)}
      />
      {abierto && (
        <Menu
          items={['Inicio', 'Cuentas', 'Transferencias', 'Inversiones', 'Tarjetas']}
          defaultActive={0}
        />
      )}
    </div>
  )
}

export const ConMenuPropio: Story = {
  name: 'Con un Menu propio (menuItems=[])',
  render: () => <DemoMenuPropio />,
}
