import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Menu from './Menu.vue'

const meta: Meta<typeof Menu> = {
  title: 'Navigation/Menu',
  component: Menu,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    items: { control: 'object', description: 'Items (strings o { label, showIcon })' },
    userName: { control: 'text', description: 'Mobile (Figma: "Nombre Usuario")' },
    userInitials: { control: 'text', description: 'Mobile (Figma: "Iniciales")' },
    lastAccess: { control: 'text', description: 'Mobile: texto de último acceso' },
    showUser: { control: 'boolean', description: 'Barra de usuario en mobile' },
    showProductsButton: { control: 'boolean', description: 'Botón Mis productos en mobile' },
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
