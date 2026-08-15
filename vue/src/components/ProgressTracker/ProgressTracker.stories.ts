import type { Meta, StoryObj } from '@storybook/vue3'
import ProgressTracker from './ProgressTracker.vue'

const meta: Meta<typeof ProgressTracker> = {
  title: 'Data Display/ProgressTracker',
  component: ProgressTracker,
  parameters: { layout: 'padded' },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    max: { control: 'number' },
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
  },
}

export default meta
type Story = StoryObj<typeof ProgressTracker>

export const Playground: Story = {
  name: 'Límite de crédito (completo)',
  args: { value: 25 },
}

export const LineaPuntero: Story = {
  name: 'Línea/Puntero',
  args: {
    value: 25,
    showTooltip: false,
    showLimitText: false,
    showLeft: false,
    showRight: false,
  },
}

export const LineaSaldos: Story = {
  name: 'Línea/Puntero + Saldos',
  args: { value: 25, showTooltip: false, showLimitText: false },
}

export const LineaLimite: Story = {
  name: 'Línea/Puntero + Límite de crédito',
  args: { value: 25, showTooltip: false, showLeft: false, showRight: false },
}

export const LineaSaldosLimite: Story = {
  name: 'Línea/Puntero + Saldos + Límite de crédito',
  args: { value: 25, showTooltip: false },
}

export const PunteroActive: Story = {
  name: 'Puntero Active',
  args: {
    value: 25,
    active: true,
    showTooltip: false,
    showLimitText: false,
    showLeft: false,
    showRight: false,
  },
}
