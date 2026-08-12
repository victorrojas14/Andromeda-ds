import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Multiselect from './Multiselect.vue'

const OPCIONES = [
  'Opción 1',
  'Opción 2',
  'Opción 3',
  'Opción 4',
  'Opción 5',
  'Opción 6',
  'Opción 7',
  'Opción 8',
]

const meta: Meta<typeof Multiselect> = {
  title: 'Forms/Multiselect',
  component: Multiselect,
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: 'text', description: 'Etiqueta flotante del trigger' },
    options: { control: 'object', description: 'Opciones (strings o { label, value })' },
    searchable: { control: 'boolean', description: 'Muestra el buscador que filtra items' },
    searchPlaceholder: { control: 'text', description: 'Placeholder del buscador' },
    selectAll: { control: 'boolean', description: 'Muestra la fila "Seleccionar todo"' },
    selectAllLabel: { control: 'text', description: 'Texto de la fila "Seleccionar todo"' },
    disabled: { control: 'boolean' },
    noResultsText: { control: 'text', description: 'Texto del estado sin resultados' },
  },
  decorators: [
    () => ({
      template: '<div style="max-width: 320px; min-height: 520px;"><story /></div>',
    }),
  ],
}

export default meta
type Story = StoryObj<typeof Multiselect>

export const Playground: Story = {
  args: {
    label: 'Selecciona',
    options: OPCIONES,
    searchable: true,
    searchPlaceholder: 'Buscar',
    selectAll: true,
    selectAllLabel: 'Seleccionar todo',
    disabled: false,
    noResultsText: 'No se encontraron resultados',
  },
}

export const UnaSeleccion: Story = {
  name: 'Una selección',
  args: { ...Playground.args, modelValue: ['Opción 2'] },
}

export const SeleccionMultiple: Story = {
  name: 'Selección múltiple',
  args: { ...Playground.args, modelValue: ['Opción 1', 'Opción 2', 'Opción 3'] },
}

export const TodoSeleccionado: Story = {
  name: 'Todo seleccionado',
  args: { ...Playground.args, modelValue: [...OPCIONES] },
}

export const SinBuscador: Story = {
  name: 'Sin buscador',
  args: { ...Playground.args, searchable: false },
}

export const SinSeleccionarTodo: Story = {
  name: 'Sin "Seleccionar todo"',
  args: { ...Playground.args, selectAll: false },
}

export const Deshabilitado: Story = {
  args: { ...Playground.args, disabled: true },
}

export const Controlado: Story = {
  render: (args) => ({
    components: { Multiselect },
    setup() {
      const values = ref<string[]>(['Opción 1'])
      return { args, values }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <Multiselect v-bind="args" v-model="values" />
        <p style="font-family: var(--font-family-sans); font-size: 14px;">
          Seleccionados: <strong>{{ values.join(', ') || '(ninguno)' }}</strong>
        </p>
      </div>
    `,
  }),
  args: { ...Playground.args },
}
