import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import MenuEstatus from './MenuEstatus.vue'

const meta: Meta<typeof MenuEstatus> = {
  title: 'Navigation/MenuEstatus',
  component: MenuEstatus,
  parameters: { layout: 'centered' },
  argTypes: {
    items: {
      control: 'object',
      description: 'Items ({ title, status, icon, estado })',
    },
  },
  decorators: [
    () => ({ template: '<div style="width: 300px"><story /></div>' }),
  ],
}

export default meta
type Story = StoryObj<typeof MenuEstatus>

export const Playground: Story = {
  render: (args) => ({
    components: { MenuEstatus },
    setup() {
      const activo = ref(2)
      return { args, activo }
    },
    template: `<MenuEstatus v-bind="args" v-model="activo" />`,
  }),
  args: {
    items: [
      { title: 'Titulo seccion', estado: 'completo' },
      { title: 'Titulo seccion', estado: 'estatus-todos' },
      { title: 'Titulo seccion', estado: 'activa' },
      { title: 'Titulo seccion' },
      { title: 'Titulo seccion', estado: 'deshabilitada' },
    ],
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
  render: (args) => ({
    components: { MenuEstatus },
    setup() {
      const activo = ref(1)
      return { args, activo }
    },
    template: `<MenuEstatus v-bind="args" v-model="activo" />`,
  }),
  args: {
    items: [
      { title: 'Datos personales', estado: 'completo' },
      { title: 'Domicilio' },
      { title: 'Datos laborales' },
      { title: 'Documentación', estado: 'deshabilitada' },
    ],
  },
}
