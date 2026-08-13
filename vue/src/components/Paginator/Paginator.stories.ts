import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Paginator from './Paginator.vue'

const meta: Meta<typeof Paginator> = {
  title: 'Navigation/Paginator',
  component: Paginator,
  parameters: { layout: 'padded' },
  argTypes: {
    pageCount: { control: 'number', description: 'Total de páginas' },
    showText: { control: 'boolean', description: 'Figma: "Mostrar Texto Izq"' },
    maxButtons: { control: 'number', description: 'Números visibles' },
    prevLabel: { control: 'text' },
    nextLabel: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Paginator>

export const Playground: Story = {
  args: { pageCount: 50 },
}

export const SinTexto: Story = {
  name: 'Sin texto',
  args: { pageCount: 10, modelValue: 2, showText: false },
}

export const Controlado: Story = {
  render: (args) => ({
    components: { Paginator },
    setup() {
      const pagina = ref(1)
      return { args, pagina }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <Paginator v-bind="args" v-model="pagina" />
        <p style="font-family: var(--font-family-sans); font-size: 14px;">
          Página actual: <strong>{{ pagina }}</strong>
        </p>
      </div>
    `,
  }),
  args: { pageCount: 50 },
}
