import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { Divider } from './Divider'

/*
 * Layout / Divider
 * Figma: página "Dividers" (node 9342:12689), componentes "Divider" y
 * "Divider 10px" … "Divider 90px".
 */

const SPACINGS = [10, 20, 30, 40, 50, 70, 90] as const

const demoText: React.CSSProperties = {
  margin: 0,
  fontFamily: 'var(--font-family-sans)',
  fontSize: 'var(--font-size-parrafo)',
  color: 'var(--color-text-primary)',
}

const label: React.CSSProperties = {
  fontFamily: 'var(--font-family-sans)',
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-secondary)',
}

const meta = {
  title: 'Layout/Divider',
  component: Divider,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Separador del DS Andromeda (Figma: "Divider"): línea de 1px en `gray-300` renderizada como `<hr>`, con espaciado vertical opcional de la escala Spacing (10–90px a cada lado).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    spacing: {
      control: 'select',
      options: [0, ...SPACINGS],
      description: 'Espaciado vertical a cada lado (escala Spacing; 0 = solo la línea).',
      table: { defaultValue: { summary: '0' } },
    },
  },
  args: {
    spacing: 0,
  },
} satisfies Meta<typeof Divider>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <div>
      <p style={demoText}>Contenido superior</p>
      <Divider {...args} />
      <p style={demoText}>Contenido inferior</p>
    </div>
  ),
}

export const Espaciados: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
      <div>
        <span style={label}>Divider (solo línea)</span>
        <Divider />
      </div>
      {SPACINGS.map((spacing) => (
        <div key={spacing}>
          <span style={label}>Divider {spacing}px</span>
          <div style={{ background: 'var(--color-background)' }}>
            <Divider spacing={spacing} />
          </div>
        </div>
      ))}
    </div>
  ),
}
