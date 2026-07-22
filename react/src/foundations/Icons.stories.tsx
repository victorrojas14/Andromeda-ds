import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { Icon } from '../components/Icon'
import { iconNames } from '../components/Icon'

/*
 * Fundamentos / Icons
 * Réplica del fundamento "Icons" del archivo Figma "Ui Kit Web"
 * (node 9248:3833): librería de 170 iconos en tamaños 12–72,
 * normalizados a currentColor.
 */

const label: React.CSSProperties = {
  fontFamily: 'var(--font-family-sans)',
  fontSize: 'var(--font-size-xs)',
  color: 'var(--color-text-secondary)',
  overflowWrap: 'anywhere',
  textAlign: 'center',
}

const meta = {
  title: 'Fundamentos/Icons',
  component: Icon,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Iconografía del DS Andromeda (170 iconos generados desde Figma). Se usa con `<Icon name="..." size={24} />`; el color se hereda de `color` vía currentColor. Tamaños de la librería: 12, 16, 20, 24, 32, 48 y 72.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: iconNames,
      description: 'Nombre del icono tal como aparece en Figma.',
    },
    size: {
      control: { type: 'number', min: 12, max: 72, step: 4 },
      description: 'Tamaño en px (la librería define 12–72).',
      table: { defaultValue: { summary: '24' } },
    },
    title: {
      control: 'text',
      description: 'Texto accesible; sin title el icono es decorativo.',
    },
  },
  args: {
    name: 'account-outline',
    size: 24,
  },
} satisfies Meta<typeof Icon>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Galeria: Story = {
  name: 'Galería',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        gap: 24,
        color: 'var(--color-text-primary)',
      }}
    >
      {iconNames.map((name) => (
        <div
          key={name}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
        >
          <Icon name={name} size={24} />
          <span style={label}>{name}</span>
        </div>
      ))}
    </div>
  ),
}

export const Tamanos: Story = {
  name: 'Tamaños',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 32, color: 'var(--color-text-primary)' }}>
      {[12, 16, 20, 24, 32, 48, 72].map((size) => (
        <div
          key={size}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
        >
          <Icon name="account-outline" size={size} />
          <span style={label}>{size}</span>
        </div>
      ))}
    </div>
  ),
}

export const Colores: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      <span style={{ color: 'var(--color-primary)' }}>
        <Icon name="alert-outline" size={32} />
      </span>
      <span style={{ color: 'var(--color-tertiary)' }}>
        <Icon name="alert-outline" size={32} />
      </span>
      <span style={{ color: 'var(--color-feedback-success)' }}>
        <Icon name="alert-outline" size={32} />
      </span>
      <span style={{ color: 'var(--color-text-secondary)' }}>
        <Icon name="alert-outline" size={32} />
      </span>
    </div>
  ),
}
