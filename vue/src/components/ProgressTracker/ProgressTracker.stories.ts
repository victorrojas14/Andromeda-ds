import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import ProgressTracker from './ProgressTracker.vue'

const money = (n: number) =>
  '$' +
  n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

const meta: Meta<typeof ProgressTracker> = {
  title: 'Data Display/ProgressTracker',
  component: ProgressTracker,
  parameters: { layout: 'centered' },
  argTypes: {
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
  },
  // Contenedor de 500px para visualizarlo
  decorators: [
    () => ({ template: '<div style="width: 500px"><story /></div>' }),
  ],
}

export default meta
type Story = StoryObj<typeof ProgressTracker>

export const Playground: Story = {
  name: 'Límite de crédito (arrastrable)',
  render: (args) => ({
    components: { ProgressTracker },
    setup() {
      const monto = ref(50000)
      return { args, monto, money }
    },
    template: `
      <ProgressTracker
        v-bind="args"
        v-model="monto"
        :max="200000"
        :format-tooltip="(v) => money(v)"
        :format-left="(v) => money(v)"
        :format-right="(v, m) => money(m - v)"
        :limit-text="'Límite de crédito: ' + money(200000)"
      />
    `,
  }),
  args: {},
}

export const LineaPuntero: Story = {
  name: 'Línea/Puntero',
  args: {
    modelValue: 25,
    showTooltip: false,
    showLimitText: false,
    showLeft: false,
    showRight: false,
  },
}

export const LineaSaldos: Story = {
  name: 'Línea/Puntero + Saldos',
  args: { modelValue: 25, showTooltip: false, showLimitText: false },
}

export const LineaLimite: Story = {
  name: 'Línea/Puntero + Límite de crédito',
  args: {
    modelValue: 25,
    showTooltip: false,
    showLeft: false,
    showRight: false,
  },
}

export const LineaSaldosLimite: Story = {
  name: 'Línea/Puntero + Saldos + Límite de crédito',
  args: { modelValue: 25, showTooltip: false },
}

export const PunteroActive: Story = {
  name: 'Puntero Active',
  args: {
    modelValue: 25,
    active: true,
    showTooltip: false,
    showLimitText: false,
    showLeft: false,
    showRight: false,
  },
}

export const SoloLectura: Story = {
  name: 'Solo lectura (draggable=false)',
  args: { modelValue: 25, draggable: false },
}
