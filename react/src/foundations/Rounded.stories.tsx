import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'

/*
 * Fundamentos / Rounded
 * Réplica del fundamento "Rounded" del archivo Figma "Ui Kit Web"
 * (node 9236:1365): escala de radios del DS.
 *
 * Es un fundamento de tokens puros (--radius-*): la página de Figma
 * son rectángulos de documentación, sin componentes publicados en la
 * librería, por lo que no hay nodo mapeable con Code Connect.
 */

const RADII = [
  { name: 'Rounded - SM 4px', token: '--radius-sm' },
  { name: 'Rounded - MD 10px', token: '--radius-md' },
  { name: 'Rounded - LG 20px', token: '--radius-lg' },
  { name: 'Rounded - XL 50px', token: '--radius-xl' },
]

const label: React.CSSProperties = {
  fontFamily: 'var(--font-family-sans)',
  fontSize: 'var(--font-size-md)',
  color: 'var(--color-text-primary)',
}

const tokenLabel: React.CSSProperties = {
  fontFamily: 'var(--font-family-mono)',
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-secondary)',
}

const meta: Meta = {
  title: 'Fundamentos/Rounded',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Escala de radios del DS Andromeda (tokens `--radius-*`): SM 4px, MD 10px, LG 20px y XL 50px, más `--radius-none` y `--radius-pill`.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

export const Escala: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
      {RADII.map(({ name, token }) => (
        <div key={token} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <span style={label}>{name}</span>
          <div
            style={{
              width: 150,
              height: 150,
              background: 'var(--color-gray-300)',
              borderRadius: `var(${token})`,
            }}
          />
          <span style={tokenLabel}>{token}</span>
        </div>
      ))}
    </div>
  ),
}
