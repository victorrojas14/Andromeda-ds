import type { Meta, StoryObj } from '@storybook/react'
import { ProgressTracker } from './ProgressTracker'

const money = (n: number) =>
  '$' +
  n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

const meta: Meta<typeof ProgressTracker> = {
  title: 'Data Display/ProgressTracker',
  component: ProgressTracker,
  parameters: { layout: 'centered' },
  argTypes: {
    value: { control: 'number', description: 'Valor (controlado)' },
    defaultValue: { control: 'number' },
    max: { control: 'number' },
    draggable: { control: 'boolean', description: 'Arrastrar el Puntero con el mouse' },
    active: { control: 'boolean', description: 'Puntero Estado Active (halo)' },
    tooltip: { control: 'text', description: 'Figma: "Tooltip"' },
    showTooltip: { control: 'boolean', description: 'Figma: "Mostrar tooltip"' },
    limitText: { control: 'text', description: 'Figma: "Limite credito"' },
    showLimitText: { control: 'boolean', description: 'Figma: "Mostrar texto top"' },
    leftLabel: { control: 'text' },
    leftValue: { control: 'text', description: 'Figma: "Saldo"' },
    showLeft: { control: 'boolean', description: 'Figma: "Mostrar texto Izq"' },
    rightLabel: { control: 'text' },
    rightValue: { control: 'text', description: 'Figma: "Disponible"' },
    showRight: { control: 'boolean', description: 'Figma: "Mostrar texto der"' },
    onChange: { action: 'change' },
  },
  // Contenedor de 500px para visualizarlo
  decorators: [
    (Story) => (
      <div style={{ width: 500 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ProgressTracker>

export const Playground: Story = {
  name: 'Límite de crédito (arrastrable)',
  args: {
    defaultValue: 50000,
    max: 200000,
    formatTooltip: (v) => money(v),
    formatLeft: (v) => money(v),
    formatRight: (v, m) => money(m - v),
    limitText: `Límite de crédito: ${money(200000)}`,
  },
}

export const LineaPuntero: Story = {
  name: 'Línea/Puntero',
  args: {
    defaultValue: 25,
    showTooltip: false,
    showLimitText: false,
    showLeft: false,
    showRight: false,
  },
}

export const LineaSaldos: Story = {
  name: 'Línea/Puntero + Saldos',
  args: { defaultValue: 25, showTooltip: false, showLimitText: false },
}

export const LineaLimite: Story = {
  name: 'Línea/Puntero + Límite de crédito',
  args: {
    defaultValue: 25,
    showTooltip: false,
    showLeft: false,
    showRight: false,
  },
}

export const LineaSaldosLimite: Story = {
  name: 'Línea/Puntero + Saldos + Límite de crédito',
  args: { defaultValue: 25, showTooltip: false },
}

export const PunteroActive: Story = {
  name: 'Puntero Active',
  args: {
    defaultValue: 25,
    active: true,
    showTooltip: false,
    showLimitText: false,
    showLeft: false,
    showRight: false,
  },
}

export const SoloLectura: Story = {
  name: 'Solo lectura (draggable=false)',
  args: { defaultValue: 25, draggable: false },
}
