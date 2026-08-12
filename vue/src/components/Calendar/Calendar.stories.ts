import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Calendar from './Calendar.vue'

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
    disablePast: { control: 'boolean', description: 'Deshabilita días anteriores a hoy' },
    rangeStart: { control: 'text', description: 'Inicio de rango (timelapse)' },
    rangeEnd: { control: 'text', description: 'Fin de rango (timelapse)' },
  },
  decorators: [
    () => ({ template: '<div style="max-width: 306px;"><story /></div>' }),
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
  args: { variant: 'primary', modelValue: '2023-07-24' },
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
  render: (args) => ({
    components: { Calendar },
    setup() {
      const value = ref('2023-07-24')
      return { args, value }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <Calendar v-bind="args" v-model="value" />
        <p style="font-family: var(--font-family-sans); font-size: 14px;">
          Fecha: <strong>{{ value }}</strong>
        </p>
      </div>
    `,
  }),
  args: { variant: 'primary' },
}
