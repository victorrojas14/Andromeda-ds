import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Dropdown } from './Dropdown'

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
  title: 'Forms/Dropdown',
  component: Dropdown,
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: 'text', description: 'Etiqueta flotante del trigger' },
    options: { control: 'object', description: 'Opciones (strings o { label, value })' },
    value: { control: 'text', description: 'Valor seleccionado (controlado)' },
    defaultValue: { control: 'text', description: 'Valor inicial (no controlado)' },
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
    onChange: { action: 'change' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 320, minHeight: 480 }}>
        <Story />
      </div>
    ),
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
  args: { ...Playground.args, defaultValue: 'Opción 2' },
}

export const CheckCuadradoIzquierda: Story = {
  name: 'Check cuadrado izquierda',
  args: { ...Playground.args, checkPosition: 'left', defaultValue: 'Opción 2' },
}

export const CheckCircularDerecha: Story = {
  name: 'Check circular derecha',
  args: { ...Playground.args, checkShape: 'circle', defaultValue: 'Opción 3' },
}

export const CheckCircularIzquierda: Story = {
  name: 'Check circular izquierda',
  args: {
    ...Playground.args,
    checkShape: 'circle',
    checkPosition: 'left',
    defaultValue: 'Opción 3',
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
  render: (args) => {
    const [value, setValue] = useState('Opción 1')
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Dropdown {...args} value={value} onChange={setValue} />
        <p style={{ fontFamily: 'var(--font-family-sans)', fontSize: 14 }}>
          Valor seleccionado: <strong>{value}</strong>
        </p>
      </div>
    )
  },
  args: { ...Playground.args },
}
