import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { DropdownMultipleList } from './DropdownMultipleList'

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
    value: { control: 'text', description: 'Valor seleccionado (controlado)' },
    defaultValue: { control: 'text', description: 'Valor inicial (no controlado)' },
    searchable: { control: 'boolean', description: 'Muestra el buscador que filtra items' },
    searchPlaceholder: { control: 'text' },
    showBalance: { control: 'boolean', description: 'Figma: "Mostrar Saldo"' },
    balanceHeading: { control: 'text', description: 'Encabezado de la columna derecha' },
    noResultsText: { control: 'text' },
    onChange: { action: 'change' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360, minHeight: 480 }}>
        <Story />
      </div>
    ),
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
  args: { ...Playground.args, defaultValue: '****0788' },
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
  render: (args) => {
    const [cuenta, setCuenta] = useState('')
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <DropdownMultipleList {...args} value={cuenta} onChange={setCuenta} />
        <p style={{ fontFamily: 'var(--font-family-sans)', fontSize: 14 }}>
          Cuenta seleccionada: <strong>{cuenta || '(ninguna)'}</strong>
        </p>
      </div>
    )
  },
  args: { ...Playground.args },
}
