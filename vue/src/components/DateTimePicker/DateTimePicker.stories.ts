import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import DateTimePicker from './DateTimePicker.vue'

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
    showBusinessDays: {
      control: 'boolean',
      description: 'Figma: "Mostrar días seleccionados?"',
    },
    showApplyButton: { control: 'boolean', description: 'Figma: "Mostrar botón aplicar"' },
    applyLabel: { control: 'text' },
    clearLabel: { control: 'text' },
    disablePast: { control: 'boolean' },
    defaultOpen: { control: 'boolean', description: 'Renderiza la card abierta desde el inicio' },
  },
  decorators: [
    () => ({ template: '<div style="max-width: 660px; min-height: 620px;"><story /></div>' }),
  ],
}

export default meta
type Story = StoryObj<typeof DateTimePicker>

export const Cerrado: Story = {
  name: 'Cerrado (trigger)',
  args: {},
}

export const Empty: Story = {
  args: { defaultOpen: true },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    start: '2026-07-18',
    end: '2026-08-15',
    defaultOpen: true,
  },
}

export const HalfCompleted: Story = {
  name: 'Half completed',
  args: { start: '2026-07-18', defaultOpen: true },
}

export const Completed: Story = {
  args: { start: '2026-07-18', end: '2026-08-15', defaultOpen: true },
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
  render: (args) => ({
    components: { DateTimePicker },
    setup() {
      const start = ref('')
      const end = ref('')
      return { args, start, end }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <DateTimePicker v-bind="args" v-model:start="start" v-model:end="end" />
        <p style="font-family: var(--font-family-sans); font-size: 14px;">
          Rango: <strong>{{ start || '—' }} a {{ end || '—' }}</strong>
        </p>
      </div>
    `,
  }),
  args: {},
}
