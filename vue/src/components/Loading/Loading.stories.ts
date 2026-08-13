import type { Meta, StoryObj } from '@storybook/vue3'
import Loading from './Loading.vue'

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
  render: (args) => ({
    components: { Loading },
    setup() {
      return { args }
    },
    template: `
      <div style="display: flex; align-items: center; justify-content: center; padding: 60px; background: var(--color-secondary); border-radius: 10px;">
        <Loading v-bind="args" />
      </div>
    `,
  }),
  args: { color: 'white', size: 100 },
}

export const Tamanos: Story = {
  name: 'Tamaños',
  render: () => ({
    components: { Loading },
    template: `
      <div style="display: flex; gap: 40px; align-items: center;">
        <Loading :size="24" />
        <Loading :size="48" />
        <Loading :size="100" />
        <Loading :size="150" />
      </div>
    `,
  }),
}
