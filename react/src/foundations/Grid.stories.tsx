import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { Grid, GridCol } from '../components/Grid'

/*
 * Fundamentos / Grid
 * Réplica del fundamento "Grid" del archivo Figma "Ui Kit Web"
 * (node 3389:95): retícula de 12 columnas, gutter de 20px y
 * contenedor de 1140px centrado en desktop.
 */

const demoCol: React.CSSProperties = {
  height: 60,
  background: 'var(--color-secondary-light)',
}

const intro: React.CSSProperties = {
  fontFamily: 'var(--font-family-sans)',
  fontSize: 'var(--font-size-md)',
  lineHeight: 'var(--line-height-normal)',
  color: 'var(--color-text-primary)',
  maxWidth: 900,
  margin: '0 0 32px',
}

const meta = {
  title: 'Fundamentos/Grid',
  component: Grid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Retícula del DS Andromeda (fundamento "Grid" de Figma): 12 columnas, gutter de 20px y contenedor de 1140px centrado. Las celdas se colocan con `GridCol` y su prop `span`.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: { type: 'number', min: 1, max: 12, step: 1 },
      description: 'Cantidad de columnas de la retícula.',
      table: { defaultValue: { summary: '12' } },
    },
    fluid: {
      control: 'boolean',
      description: 'Sin ancho máximo: ocupa todo el contenedor padre.',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    columns: 12,
    fluid: false,
  },
} satisfies Meta<typeof Grid>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: args.columns ?? 12 }, (_, i) => (
        <GridCol key={i} span={1} style={demoCol} />
      ))}
    </Grid>
  ),
}

export const Reticula: Story = {
  name: 'Retícula',
  render: () => (
    <div>
      <p style={intro}>
        Retícula de 12 columnas con gutter de 20px y contenedor de 1140px centrado
        (márgenes de 70px en desktop 1280). Las filas muestran divisiones de 1, 2, 3, 4,
        6 y 12 columnas.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {[1, 2, 3, 4, 6, 12].map((cols) => (
          <Grid key={cols}>
            {Array.from({ length: cols }, (_, i) => (
              <GridCol key={i} span={12 / cols} style={demoCol} />
            ))}
          </Grid>
        ))}
      </div>
    </div>
  ),
}

export const SpansMixtos: Story = {
  name: 'Spans mixtos',
  render: () => (
    <div>
      <p style={intro}>
        Las celdas pueden ocupar cualquier cantidad de columnas con la prop{' '}
        <code>span</code>.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Grid>
          <GridCol span={8} style={demoCol} />
          <GridCol span={4} style={demoCol} />
        </Grid>
        <Grid>
          <GridCol span={3} style={demoCol} />
          <GridCol span={6} style={demoCol} />
          <GridCol span={3} style={demoCol} />
        </Grid>
        <Grid>
          <GridCol span={2} style={demoCol} />
          <GridCol span={10} style={demoCol} />
        </Grid>
      </div>
    </div>
  ),
}
