import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'

/*
 * Fundamentos / Spacing
 * Réplica del fundamento "Spacing" del archivo Figma "Ui Kit Web"
 * (node 9461:3893): tokens de espaciado con variables Desktop y Mobile.
 *
 * Es un fundamento de tokens puros (--space-*): la página de Figma es
 * una tabla de documentación, sin componentes publicados en la
 * librería, por lo que no hay nodo mapeable con Code Connect.
 */

const SPACES = [
  { token: 'Space-0', desktop: 0, mobile: 0 },
  { token: 'Space-8', desktop: 8, mobile: 8 },
  { token: 'Space-10', desktop: 10, mobile: 8 },
  { token: 'Space-16', desktop: 16, mobile: 16 },
  { token: 'Space-20', desktop: 20, mobile: 16 },
  { token: 'Space-24', desktop: 24, mobile: 16 },
  { token: 'Space-30', desktop: 30, mobile: 24 },
  { token: 'Space-40', desktop: 40, mobile: 32 },
  { token: 'Space-50', desktop: 50, mobile: 50 },
  { token: 'Space-70', desktop: 70, mobile: 70 },
  { token: 'Space-90', desktop: 90, mobile: 90 },
]

const SPACE_OPTIONS = SPACES.filter((s) => s.desktop > 0).map((s) =>
  s.token.replace('Space-', ''),
)

const text: React.CSSProperties = {
  fontFamily: 'var(--font-family-sans)',
  fontSize: 'var(--font-size-md)',
  color: 'var(--color-text-primary)',
}

const tokenLabel: React.CSSProperties = {
  fontFamily: 'var(--font-family-mono)',
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-secondary)',
}

function Swatch({ size }: { size: number }) {
  if (size === 0) return <span style={tokenLabel}>—</span>
  return <span style={{ width: size, height: size, background: 'var(--color-secondary)', display: 'inline-block' }} />
}

interface SpacingArgs {
  space: string
  mode: 'desktop' | 'mobile'
}

const meta: Meta<SpacingArgs> = {
  title: 'Fundamentos/Spacing',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Tokens de espaciado del DS Andromeda con variables Desktop y Mobile (`--space-N` / `--space-N-mobile`; el nombre indica el valor desktop en px). Se consume como token: `gap: var(--space-20)`.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    space: {
      control: 'select',
      options: SPACE_OPTIONS,
      description: 'Token de espaciado (`--space-N`).',
      table: { defaultValue: { summary: '20' } },
    },
    mode: {
      control: 'inline-radio',
      options: ['desktop', 'mobile'],
      description: 'Variable Desktop o Mobile del token.',
      table: { defaultValue: { summary: 'desktop' } },
    },
  },
  args: {
    space: '20',
    mode: 'desktop',
  },
}

export default meta
type Story = StoryObj<SpacingArgs>

export const Playground: Story = {
  render: (args) => {
    const cssVar = `--space-${args.space}${args.mode === 'mobile' ? '-mobile' : ''}`
    const block: React.CSSProperties = {
      width: 120,
      height: 60,
      background: 'var(--color-gray-300)',
      borderRadius: 'var(--radius-sm)',
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', gap: `var(${cssVar})` }}>
          <div style={block} />
          <div style={block} />
        </div>
        <span style={tokenLabel}>gap: var({cssVar})</span>
      </div>
    )
  },
}

export const Tokens: Story = {
  name: 'Tokens Desktop y Mobile',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '160px 1fr 1fr',
        rowGap: 30,
        columnGap: 60,
        alignItems: 'start',
        padding: 50,
        background: 'var(--color-background)',
        borderRadius: 'var(--radius-sm)',
      }}
    >
      <span style={{ ...text, fontWeight: 'var(--font-weight-medium)' as never }}>
        Nombre de token
      </span>
      <span style={{ ...text, fontWeight: 'var(--font-weight-medium)' as never }}>Desktop</span>
      <span style={{ ...text, fontWeight: 'var(--font-weight-medium)' as never }}>Mobile</span>
      {SPACES.map(({ token, desktop, mobile }) => (
        <React.Fragment key={token}>
          <span style={text}>{token}</span>
          <span style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
            <span style={{ ...text, width: 32 }}>{desktop}</span>
            <Swatch size={desktop} />
          </span>
          <span style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
            <span style={{ ...text, width: 32 }}>{mobile}</span>
            <Swatch size={mobile} />
          </span>
        </React.Fragment>
      ))}
    </div>
  ),
}
