import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Calendar } from './Calendar'

const meta: Meta<typeof Calendar> = {
  title: 'Forms/Calendar',
  component: Calendar,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary'],
      description: 'Primary: flechas y vistas de año/mes. Secondary: dropdowns Mes/Año',
    },
    value: { control: 'text', description: "Fecha seleccionada ('YYYY-MM-DD')" },
    defaultValue: { control: 'text', description: 'Fecha inicial (no controlado)' },
    disablePast: { control: 'boolean', description: 'Deshabilita días anteriores a hoy' },
    rangeStart: { control: 'text', description: 'Inicio de rango (timelapse)' },
    rangeEnd: { control: 'text', description: 'Fin de rango (timelapse)' },
    onChange: { action: 'change' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 306 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Calendar>

export const Primary: Story = {
  args: { variant: 'primary' },
}

export const Secondary: Story = {
  args: { variant: 'secondary' },
}

export const ConSeleccion: Story = {
  name: 'Con selección',
  args: { variant: 'primary', defaultValue: '2023-07-24' },
}

export const PasadoDeshabilitado: Story = {
  name: 'Pasado deshabilitado',
  args: { variant: 'primary', disablePast: true },
}

export const Rango: Story = {
  name: 'Rango (timelapse)',
  args: { variant: 'primary', rangeStart: '2026-07-18', rangeEnd: '2026-07-31' },
}

export const Controlado: Story = {
  render: (args) => {
    const [value, setValue] = useState('2023-07-24')
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Calendar {...args} value={value} onChange={(_, iso) => setValue(iso)} />
        <p style={{ fontFamily: 'var(--font-family-sans)', fontSize: 14 }}>
          Fecha: <strong>{value}</strong>
        </p>
      </div>
    )
  },
  args: { variant: 'primary' },
}
