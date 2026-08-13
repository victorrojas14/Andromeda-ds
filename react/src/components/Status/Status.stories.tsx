import type { Meta, StoryObj } from '@storybook/react'
import { Status, type StatusEstado } from './Status'

const ESTADOS: StatusEstado[] = [
  'verde',
  'gris',
  'azul',
  'amarillo',
  'rojo',
  'morado',
  'naranja',
  'magenta',
]

const meta: Meta<typeof Status> = {
  title: 'Data Display/Status',
  component: Status,
  parameters: { layout: 'padded' },
  argTypes: {
    estado: {
      control: 'select',
      options: ESTADOS,
      description: 'Estado/color (Figma: Estado / Property 1)',
    },
    text: { control: 'text', description: 'Figma: "Texto"' },
    variant: {
      control: 'inline-radio',
      options: ['v1', 'v2'],
      description: 'v1: punto + texto · v2: pill con fondo tenue',
    },
  },
}

export default meta
type Story = StoryObj<typeof Status>

export const Playground: Story = {
  args: { estado: 'verde', text: 'Texto', variant: 'v1' },
}

export const EstatusV1: Story = {
  name: 'Estatus v1 (todos los estados)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      {ESTADOS.map((e) => (
        <Status key={e} variant="v1" estado={e} text="Texto" />
      ))}
    </div>
  ),
}

export const EstatusV2: Story = {
  name: 'Estatus v2 (todos los estados)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      {ESTADOS.map((e) => (
        <Status key={e} variant="v2" estado={e} text="Texto" />
      ))}
    </div>
  ),
}

export const CasosDeUso: Story = {
  name: 'Casos de uso',
  render: () => (
    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
      <Status variant="v2" estado="verde" text="Aprobado" />
      <Status variant="v2" estado="gris" text="Inactivo" />
      <Status variant="v2" estado="azul" text="En revisión" />
      <Status variant="v2" estado="amarillo" text="Pendiente" />
      <Status variant="v2" estado="rojo" text="Fallido" />
      <Status variant="v2" estado="naranja" text="Atención" />
    </div>
  ),
}
