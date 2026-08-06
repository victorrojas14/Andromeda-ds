import type { Meta, StoryObj } from '@storybook/react'
import { PillNew } from './PillNew'

/*
 * Data Display / PillNew
 * Figma: página "Pill new" (node 13990:53495), componente "Pill new"
 * (13992:3512). Etiqueta para marcar elementos nuevos; en la página
 * de Figma se muestra anclada a la esquina superior derecha de tabs.
 */

const meta = {
  title: 'Data Display/PillNew',
  component: PillNew,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Etiqueta "Nuevo" del DS Andromeda (Figma: "Pill new"): pill de 15px con fondo bg-now, borde gray-100, punto y texto en Info. Se usa para marcar elementos nuevos, por ejemplo anclada a la esquina de un tab.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text', description: 'Texto del pill (en Figma es fijo "Nuevo").' },
  },
  args: {
    children: 'Nuevo',
  },
} satisfies Meta<typeof PillNew>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const AncladoATab: Story = {
  name: 'Anclado a un tab',
  render: () => (
    <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>
      <div style={{ position: 'relative', display: 'inline-block', paddingTop: 3 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '10px 20px',
            fontFamily: 'var(--font-family-sans)',
            fontSize: 'var(--font-size-parrafo)',
            fontWeight: 'var(--font-weight-medium)' as never,
            color: 'var(--color-secondary)',
            borderBottom: '2px solid var(--color-gray-300)',
          }}
        >
          Inversiones
        </div>
        <span style={{ position: 'absolute', top: 0, right: -14 }}>
          <PillNew />
        </span>
      </div>
      <div style={{ position: 'relative', display: 'inline-block', paddingTop: 3 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '10px 20px',
            fontFamily: 'var(--font-family-sans)',
            fontSize: 'var(--font-size-parrafo)',
            fontWeight: 'var(--font-weight-medium)' as never,
            color: 'var(--color-primary)',
            borderBottom: '2px solid var(--color-primary)',
          }}
        >
          CFDIs
        </div>
        <span style={{ position: 'absolute', top: 0, right: -14 }}>
          <PillNew />
        </span>
      </div>
    </div>
  ),
}
