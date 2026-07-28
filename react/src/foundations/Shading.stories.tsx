import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'

/*
 * Fundamentos / Shading
 * Réplica del fundamento "Shading" del archivo Figma "Ui Kit Web"
 * (node 9236:1513): catálogo de sombras del DS.
 *
 * Es un fundamento de tokens puros (--shadow-*): la página de Figma
 * son rectángulos de documentación con effect styles, sin componentes
 * publicados en la librería, por lo que no hay nodo mapeable con
 * Code Connect.
 */

const SHADOW_TOKENS = [
  'sm', 'md', 'lg', 'xl', 'per',
  'sm-2', 'md-2', 'lg-2', 'xl-2',
  'sm-3', 'md-3', 'lg-3', 'xl-3',
  'autolayout-sm', 'autolayout-md', 'autolayout-lg', 'autolayout-xl',
  'card',
] as const

const section: React.CSSProperties = {
  display: 'flex',
  gap: 64,
  flexWrap: 'wrap',
  padding: 50,
  background: 'var(--color-background)',
  borderRadius: 'var(--radius-sm)',
}

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

function ShadowGrid({ items }: { items: Array<{ name: string; token: string }> }) {
  return (
    <div style={section}>
      {items.map(({ name, token }) => (
        <div key={token} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <span style={label}>{name}</span>
          <div
            style={{
              width: 150,
              height: 150,
              background: 'var(--color-white)',
              boxShadow: `var(${token})`,
            }}
          />
          <span style={tokenLabel}>{token}</span>
        </div>
      ))}
    </div>
  )
}

interface ShadingArgs {
  shadow: (typeof SHADOW_TOKENS)[number]
  size: number
}

const meta: Meta<ShadingArgs> = {
  title: 'Fundamentos/Shading',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Catálogo de sombras del DS Andromeda (tokens `--shadow-*`): Sombra 1 centrada (sm/md/lg/xl/per), Sombra 2 abajo-derecha (*-2), Sombra 3 abajo-izquierda (*-3) y Sombra Autolayout (autolayout-*). Se consume como token: `box-shadow: var(--shadow-md)`.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    shadow: {
      control: 'select',
      options: SHADOW_TOKENS as unknown as string[],
      description: 'Token de sombra aplicado (`--shadow-*`).',
      table: { defaultValue: { summary: 'md' } },
    },
    size: {
      control: { type: 'number', min: 50, max: 300, step: 10 },
      description: 'Tamaño del cuadrado de muestra en px.',
      table: { defaultValue: { summary: '150' } },
    },
  },
  args: {
    shadow: 'md',
    size: 150,
  },
}

export default meta
type Story = StoryObj<ShadingArgs>

export const Playground: Story = {
  render: (args) => (
    <div style={{ ...section, flexDirection: 'column', gap: 24 }}>
      <div
        style={{
          width: args.size,
          height: args.size,
          background: 'var(--color-white)',
          boxShadow: `var(--shadow-${args.shadow})`,
        }}
      />
      <span style={tokenLabel}>box-shadow: var(--shadow-{args.shadow})</span>
    </div>
  ),
}

export const Sombra1: Story = {
  name: 'Sombra 1 — centrada',
  render: () => (
    <ShadowGrid
      items={[
        { name: 'Sombra - SM', token: '--shadow-sm' },
        { name: 'Sombra - MD', token: '--shadow-md' },
        { name: 'Sombra - LG', token: '--shadow-lg' },
        { name: 'Sombra - XL', token: '--shadow-xl' },
        { name: 'Sombra - Per', token: '--shadow-per' },
      ]}
    />
  ),
}

export const Sombra2: Story = {
  name: 'Sombra 2 — abajo-derecha',
  render: () => (
    <ShadowGrid
      items={[
        { name: 'Sombra - SM2', token: '--shadow-sm-2' },
        { name: 'Sombra - MD2', token: '--shadow-md-2' },
        { name: 'Sombra - LG2', token: '--shadow-lg-2' },
        { name: 'Sombra - XL2', token: '--shadow-xl-2' },
      ]}
    />
  ),
}

export const Sombra3: Story = {
  name: 'Sombra 3 — abajo-izquierda',
  render: () => (
    <ShadowGrid
      items={[
        { name: 'Sombra - SM3', token: '--shadow-sm-3' },
        { name: 'Sombra - MD3', token: '--shadow-md-3' },
        { name: 'Sombra - LG3', token: '--shadow-lg-3' },
        { name: 'Sombra - XL3', token: '--shadow-xl-3' },
      ]}
    />
  ),
}

export const SombraAutolayout: Story = {
  name: 'Sombra Autolayout',
  render: () => (
    <ShadowGrid
      items={[
        { name: 'Sombra Autolayout - SM', token: '--shadow-autolayout-sm' },
        { name: 'Sombra Autolayout - MD', token: '--shadow-autolayout-md' },
        { name: 'Sombra Autolayout - LG', token: '--shadow-autolayout-lg' },
        { name: 'Sombra Autolayout - XL', token: '--shadow-autolayout-xl' },
      ]}
    />
  ),
}
