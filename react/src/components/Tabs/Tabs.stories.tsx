import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Tabs } from './Tabs'

const meta: Meta<typeof Tabs> = {
  title: 'Navigation/Tabs',
  component: Tabs,
  parameters: { layout: 'padded' },
  argTypes: {
    items: { control: 'object', description: 'Tabs (strings o { label, iconLeft, iconRight, disabled })' },
    active: { control: 'number', description: 'Índice activo (controlado)' },
    defaultActive: { control: 'number' },
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary'],
      description: 'primary: Tabs-1 subrayado · secondary: segmented',
    },
    activeStyle: {
      control: 'inline-radio',
      options: ['primary', 'secondary'],
      description: 'Color del subrayado (Figma: Active primary/Active secundary)',
    },
    icon: { control: 'text', description: 'Icono de la librería para todos los tabs' },
    iconPosition: {
      control: 'inline-radio',
      options: ['left', 'right', 'both'],
      description: 'Lado del icono: izquierdo, derecho o ambos',
    },
    onChange: { action: 'change' },
  },
}

export default meta
type Story = StoryObj<typeof Tabs>

export const Primary: Story = {
  args: {
    variant: 'primary',
    items: ['Posición', 'Movimientos', 'Órdenes de inversión', 'Documentos'],
    defaultActive: 0,
  },
}

export const PrimaryConIconos: Story = {
  name: 'Primary con iconos',
  args: {
    variant: 'primary',
    items: [
      { label: 'Texto Tab', iconLeft: 'account-outline', iconRight: 'account-outline' },
      { label: 'Texto Tab', iconLeft: 'account-outline' },
      { label: 'Texto Tab' },
      { label: 'Texto Tab', disabled: true },
    ],
    defaultActive: 0,
  },
}

export const PosicionDeIcono: Story = {
  name: 'Posición de icono (left / right / both)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Tabs
        variant="primary"
        icon="account-outline"
        iconPosition="left"
        items={['Texto Tab', 'Texto Tab']}
      />
      <Tabs
        variant="primary"
        icon="account-outline"
        iconPosition="right"
        items={['Texto Tab', 'Texto Tab']}
      />
      <Tabs
        variant="primary"
        icon="account-outline"
        iconPosition="both"
        items={['Texto Tab', 'Texto Tab']}
      />
    </div>
  ),
}

export const ActiveSecundary: Story = {
  name: 'Active secundary (subrayado tertiary)',
  args: { ...Primary.args, activeStyle: 'secondary', defaultActive: 1 },
}

export const Secondary: Story = {
  name: 'Secondary (segmented)',
  args: {
    variant: 'secondary',
    items: ['Text', 'Text', 'Text'],
    defaultActive: 0,
  },
}

export const Controlado: Story = {
  render: (args) => {
    const [tab, setTab] = useState(0)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Tabs {...args} active={tab} onChange={setTab} />
        <p style={{ fontFamily: 'var(--font-family-sans)', fontSize: 14 }}>
          Tab activo: <strong>{tab}</strong>
        </p>
      </div>
    )
  },
  args: { ...Primary.args },
}
