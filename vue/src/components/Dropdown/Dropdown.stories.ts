import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Dropdown from './Dropdown.vue'

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

const meta: Meta<typeof Dropdown> = {
  title: 'Componentes/Dropdown',
  component: Dropdown,
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: 'text', description: 'Etiqueta flotante del trigger' },
    options: { control: 'object', description: 'Opciones (strings o { label, value })' },
    searchable: { control: 'boolean', description: 'Muestra el buscador que filtra items' },
    searchPlaceholder: { control: 'text', description: 'Placeholder del buscador' },
    checkShape: {
      control: 'inline-radio',
      options: ['square', 'circle'],
      description: 'Forma del check (Variant de Figma: Square/Circle)',
    },
    checkPosition: {
      control: 'inline-radio',
      options: ['left', 'right'],
      description: 'Posición del check (Variant de Figma: left/right)',
    },
    disabled: { control: 'boolean' },
    noResultsText: { control: 'text', description: 'Texto del estado sin resultados' },
  },
  decorators: [
    () => ({
      template: '<div style="max-width: 320px; min-height: 480px;"><story /></div>',
    }),
  ],
}

export default meta
type Story = StoryObj<typeof Dropdown>

export const Playground: Story = {
  args: {
    label: 'Seleccionar',
    options: OPCIONES,
    searchable: true,
    searchPlaceholder: 'Buscar',
    checkShape: 'square',
    checkPosition: 'right',
    disabled: false,
    noResultsText: 'No se encontraron resultados',
  },
}

export const CheckCuadradoDerecha: Story = {
  name: 'Check cuadrado derecha',
  args: { ...Playground.args, modelValue: 'Opción 2' },
}

export const CheckCuadradoIzquierda: Story = {
  name: 'Check cuadrado izquierda',
  args: { ...Playground.args, checkPosition: 'left', modelValue: 'Opción 2' },
}

export const CheckCircularDerecha: Story = {
  name: 'Check circular derecha',
  args: { ...Playground.args, checkShape: 'circle', modelValue: 'Opción 3' },
}

export const CheckCircularIzquierda: Story = {
  name: 'Check circular izquierda',
  args: {
    ...Playground.args,
    checkShape: 'circle',
    checkPosition: 'left',
    modelValue: 'Opción 3',
  },
}

export const SinBuscador: Story = {
  name: 'Sin buscador',
  args: { ...Playground.args, searchable: false },
}

export const Deshabilitado: Story = {
  args: { ...Playground.args, disabled: true },
}

export const Controlado: Story = {
  render: (args) => ({
    components: { Dropdown },
    setup() {
      const value = ref('Opción 1')
      return { args, value }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <Dropdown v-bind="args" v-model="value" />
        <p style="font-family: var(--font-family-sans); font-size: 14px;">
          Valor seleccionado: <strong>{{ value }}</strong>
        </p>
      </div>
    `,
  }),
  args: { ...Playground.args },
}
