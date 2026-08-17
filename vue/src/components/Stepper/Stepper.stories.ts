import type { Meta, StoryObj } from '@storybook/vue3'
import Stepper from './Stepper.vue'

const meta: Meta<typeof Stepper> = {
  title: 'Data Display/Stepper',
  component: Stepper,
  parameters: { layout: 'padded' },
  argTypes: {
    steps: { control: 'object', description: 'Pasos (máx. 5 para el diseño numerado; >5 cambia al diseño "+ 5")' },
    active: { control: 'number', description: 'Índice del paso activo (base 0)' },
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
      description: 'Orientación en web con ≤5 pasos',
    },
    color: {
      control: 'inline-radio',
      options: ['azul', 'vino'],
      description: 'Color: azul (tertiary) o vino (primary)',
    },
    showLabels: { control: 'boolean', description: 'Figma: "Mostrar Texto"' },
  },
}

export default meta
type Story = StoryObj<typeof Stepper>

const CUATRO_PASOS = [
  'Datos generales',
  'Identificación oficial',
  'Comprobante de domicilio',
  'Cédula de Situación Fiscal',
]

export const Horizontal: Story = {
  args: { steps: CUATRO_PASOS, active: 2, orientation: 'horizontal' },
}

export const Vertical: Story = {
  args: { steps: CUATRO_PASOS, active: 1, orientation: 'vertical' },
}

export const CincoPasos: Story = {
  name: 'Cinco pasos (máximo)',
  args: {
    steps: [...CUATRO_PASOS, 'Validar CURP y RFC'],
    active: 2,
  },
}

export const MasDeCinco: Story = {
  name: 'Más de 5 pasos (Stepper + 5)',
  args: {
    steps: [
      'Datos generales',
      'Identificación oficial',
      'Comprobante de domicilio',
      'Cédula de Situación Fiscal',
      'Validar CURP y RFC',
      'Datos laborales',
      'Beneficiarios',
      'Firma de contrato',
      'Depósito inicial',
      'Confirmación',
    ],
    active: 1,
  },
}

export const Vino: Story = {
  name: 'Color vino',
  args: { steps: CUATRO_PASOS, active: 2, color: 'vino' },
}

export const VinoMasDeCinco: Story = {
  name: 'Color vino (+5 pasos)',
  args: {
    steps: [
      'Paso 1',
      'Paso 2',
      'Paso 3',
      'Paso 4',
      'Paso 5',
      'Paso 6',
      'Paso 7',
    ],
    active: 3,
    color: 'vino',
  },
}
