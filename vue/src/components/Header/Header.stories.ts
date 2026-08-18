import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Menu from '../Menu/Menu.vue'
import Header from './Header.vue'

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
      description: 'Header Mobile: Estado Abierto/Cerrado (hamburguesa ↔ X)',
    },
    userMenuOpen: { control: 'boolean', description: 'Menu usuario desplegado' },
  },
}

export default meta
type Story = StoryObj<typeof Header>

export const Playground: Story = {
  args: { variant: 'invex' },
}

export const Marcas: Story = {
  name: 'Las 3 marcas (Header)',
  render: () => ({
    components: { Header },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <Header variant="invex" />
        <Header variant="renacer" />
        <Header variant="fiduciario" />
      </div>
    `,
  }),
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
  args: { userMenuOpen: true },
}

export const ConMenuDelDS: Story = {
  name: 'Integrado con el Menu del DS',
  render: () => ({
    components: { Header, Menu },
    setup() {
      const abierto = ref(false)
      return { abierto }
    },
    template: `
      <div>
        <Header :menu-open="abierto" @menu-click="abierto = !abierto" />
        <Menu
          v-if="abierto"
          :items="['Inicio', 'Cuentas', 'Transferencias', 'Inversiones', 'Tarjetas']"
        />
      </div>
    `,
  }),
}
