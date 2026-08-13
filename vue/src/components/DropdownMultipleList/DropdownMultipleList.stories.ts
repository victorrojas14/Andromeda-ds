import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import DropdownMultipleList from './DropdownMultipleList.vue'

const CUENTAS = [
  { name: 'Nombre del cliente', account: '****0788', balance: '$ 1,000.00' },
  { name: 'Nombre del cliente', account: '****0921', balance: '$ 2,500.00' },
  { name: 'Cuenta de nómina', account: '****1145', balance: '$ 15,320.50' },
  { name: 'Cuenta de ahorro', account: '****3301', balance: '$ 48,900.00' },
  { name: 'Inversión INVEX', account: '****7642', balance: '$ 120,000.00' },
  { name: 'Cuenta empresarial', account: '****9013', balance: '$ 305,750.25' },
]

const meta: Meta<typeof DropdownMultipleList> = {
  title: 'Forms/DropdownMultipleList',
  component: DropdownMultipleList,
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: 'text', description: 'Label flotante y placeholder del trigger' },
    options: { control: 'object', description: 'Cuentas ({ name, account, balance, value? })' },
    searchable: { control: 'boolean', description: 'Muestra el buscador que filtra items' },
    searchPlaceholder: { control: 'text' },
    showBalance: { control: 'boolean', description: 'Figma: "Mostrar Saldo"' },
    balanceHeading: { control: 'text', description: 'Encabezado de la columna derecha' },
    noResultsText: { control: 'text' },
  },
  decorators: [
    () => ({ template: '<div style="max-width: 360px; min-height: 480px;"><story /></div>' }),
  ],
}

export default meta
type Story = StoryObj<typeof DropdownMultipleList>

export const Playground: Story = {
  args: {
    label: 'Selecciona la cuenta de retiro',
    options: CUENTAS,
    searchable: true,
    searchPlaceholder: 'Buscar',
    showBalance: true,
    balanceHeading: 'Saldo',
    noResultsText: 'No se encontraron resultados',
  },
}

export const Seleccion: Story = {
  args: { ...Playground.args, modelValue: '****0788' },
}

export const SinSaldo: Story = {
  name: 'Sin saldo',
  args: { ...Playground.args, showBalance: false },
}

export const SinBuscador: Story = {
  name: 'Sin buscador',
  args: { ...Playground.args, searchable: false },
}

export const Controlado: Story = {
  render: (args) => ({
    components: { DropdownMultipleList },
    setup() {
      const cuenta = ref('')
      return { args, cuenta }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <DropdownMultipleList v-bind="args" v-model="cuenta" />
        <p style="font-family: var(--font-family-sans); font-size: 14px;">
          Cuenta seleccionada: <strong>{{ cuenta || '(ninguna)' }}</strong>
        </p>
      </div>
    `,
  }),
  args: { ...Playground.args },
}
