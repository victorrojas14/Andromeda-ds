import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { DateTimePicker } from './DateTimePicker'

const meta: Meta<typeof DateTimePicker> = {
  title: 'Forms/DateTimePicker',
  component: DateTimePicker,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary'],
      description: 'Variante de los calendarios internos (flechas / dropdowns Mes-Año)',
    },
    startLabel: { control: 'text' },
    endLabel: { control: 'text' },
    placeholder: { control: 'text' },
    start: { control: 'text', description: "Fecha de inicio ('YYYY-MM-DD', controlada)" },
    end: { control: 'text', description: "Fecha de fin ('YYYY-MM-DD', controlada)" },
    defaultStart: { control: 'text' },
    defaultEnd: { control: 'text' },
    showBusinessDays: {
      control: 'boolean',
      description: 'Figma: "Mostrar días seleccionados?"',
    },
    showApplyButton: { control: 'boolean', description: 'Figma: "Mostrar botón aplicar"' },
    applyLabel: { control: 'text' },
    clearLabel: { control: 'text' },
    disablePast: { control: 'boolean' },
    onChange: { action: 'change' },
    onApply: { action: 'apply' },
    onClear: { action: 'clear' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 660 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof DateTimePicker>

export const Empty: Story = {
  args: {},
}

export const Secondary: Story = {
  args: { variant: 'secondary', defaultStart: '2026-07-18', defaultEnd: '2026-08-15' },
}

export const HalfCompleted: Story = {
  name: 'Half completed',
  args: { defaultStart: '2026-07-18' },
}

export const Completed: Story = {
  args: { defaultStart: '2026-07-18', defaultEnd: '2026-08-15' },
}

export const SinContador: Story = {
  name: 'Sin contador de días',
  args: { ...Completed.args, showBusinessDays: false },
}

export const SinBotonAplicar: Story = {
  name: 'Sin botón aplicar',
  args: { ...Completed.args, showApplyButton: false },
}

export const Controlado: Story = {
  render: (args) => {
    const [range, setRange] = useState<{ start: Date | null; end: Date | null }>({
      start: null,
      end: null,
    })
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <DateTimePicker
          {...args}
          onChange={(start, end) => setRange({ start, end })}
        />
        <p style={{ fontFamily: 'var(--font-family-sans)', fontSize: 14 }}>
          Rango: <strong>
            {range.start?.toLocaleDateString('es-MX') ?? '—'} a{' '}
            {range.end?.toLocaleDateString('es-MX') ?? '—'}
          </strong>
        </p>
      </div>
    )
  },
  args: {},
}
