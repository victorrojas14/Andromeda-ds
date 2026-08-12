import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Multiselect } from './Multiselect'

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
    value: { control: 'object', description: 'Valores seleccionados (controlado)' },
    defaultValue: { control: 'object', description: 'Valores iniciales (no controlado)' },
    searchable: { control: 'boolean', description: 'Muestra el buscador que filtra items' },
    searchPlaceholder: { control: 'text', description: 'Placeholder del buscador' },
    selectAll: { control: 'boolean', description: 'Muestra la fila "Seleccionar todo"' },
    selectAllLabel: { control: 'text', description: 'Texto de la fila "Seleccionar todo"' },
    disabled: { control: 'boolean' },
    noResultsText: { control: 'text', description: 'Texto del estado sin resultados' },
    onChange: { action: 'change' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 320, minHeight: 520 }}>
        <Story />
      </div>
    ),
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
  args: { ...Playground.args, defaultValue: ['Opción 2'] },
}

export const SeleccionMultiple: Story = {
  name: 'Selección múltiple',
  args: { ...Playground.args, defaultValue: ['Opción 1', 'Opción 2', 'Opción 3'] },
}

export const TodoSeleccionado: Story = {
  name: 'Todo seleccionado',
  args: { ...Playground.args, defaultValue: [...OPCIONES] },
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
  render: (args) => {
    const [values, setValues] = useState<string[]>(['Opción 1'])
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Multiselect {...args} value={values} onChange={setValues} />
        <p style={{ fontFamily: 'var(--font-family-sans)', fontSize: 14 }}>
          Seleccionados: <strong>{values.join(', ') || '(ninguno)'}</strong>
        </p>
      </div>
    )
  },
  args: { ...Playground.args },
}
