import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Menu from './Menu.vue'

const meta: Meta<typeof Menu> = {
  title: 'Navigation/Menu',
  component: Menu,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    items: {
      control: 'object',
      description: 'Items (strings o { label, icon, showLeftIcon, showIcon })',
    },
    open: { control: 'boolean', description: 'v-model:open — menú mobile Abierto/Cerrado' },
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
  },
}

export const ConIconos: Story = {
  name: 'Con iconos (Mostrar Icono)',
  args: {
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
  render: (args) => ({
    components: { Menu },
    setup() {
      const activo = ref(3)
      return { args, activo }
    },
    template: `<Menu v-bind="args" v-model="activo" />`,
  }),
  args: {
    items: [
      { label: 'Inicio', icon: 'home-outline' },
      { label: 'Monitor de flujos', icon: 'monitoring' },
      { label: 'Emisiones de ventanilla', icon: 'file-document-outline' },
      { label: 'Emisiones bursátiles', icon: 'chart' },
      { label: 'Reportes', icon: 'file-document-multiple-outline', showIcon: true },
      { label: 'Utilerías', icon: 'tools' },
    ],
  },
}

export const Controlado: Story = {
  render: (args) => ({
    components: { Menu },
    setup() {
      const activo = ref(0)
      return { args, activo }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <Menu v-bind="args" v-model="activo" />
        <p style="font-family: var(--font-family-sans); font-size: 14px; padding: 0 20px;">
          Item activo: <strong>{{ activo }}</strong>
        </p>
      </div>
    `,
  }),
  args: { ...Playground.args },
}
