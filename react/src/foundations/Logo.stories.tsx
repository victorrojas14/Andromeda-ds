import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { Logo, logoVariants } from '../components/Logo'

/*
 * Fundamentos / Logo
 * Réplica del fundamento "Marcas Invex" del archivo Figma "Ui Kit Web"
 * (node 9190:752): marcas Invex, Invex Banco, Invex Fiduciario e
 * Invex Renacer, envolvente y usos incorrectos.
 */

const label: React.CSSProperties = {
  fontFamily: 'var(--font-family-sans)',
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-secondary)',
}

const textStyle: React.CSSProperties = {
  fontFamily: 'var(--font-family-sans)',
  fontSize: 'var(--font-size-md)',
  lineHeight: 'var(--line-height-normal)',
  color: 'var(--color-text-primary)',
  maxWidth: 900,
}

const USOS_INCORRECTOS = [
  'No deformar el logotipo.',
  'No rotarlo.',
  'No variar las proporciones de ningún elemento.',
  'No aplicar sombras.',
  'No variar el interletrado.',
  'No aplicar outlines.',
  'No cambiar la posición de ningún elemento.',
  'No cambiar los colores.',
  'No aplicarlo sobre fondos, texturas o imágenes que afecten su buen rendimiento.',
  'No variar el peso de la tipografía del eslogan.',
  'No utilizar el logotipo para enmascarar fotografías.',
]

const meta = {
  title: 'Fundamentos/Logo',
  component: Logo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Marcas INVEX del DS Andromeda. Se usa con `<Logo variant="invex" height={40} />`; el color se hereda vía currentColor (Rojo INVEX por defecto) y `envolvente` aplica el área de seguridad sobre fondo primario.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: logoVariants,
      description: 'Marca a mostrar.',
    },
    height: {
      control: { type: 'number', min: 16, max: 160, step: 4 },
      description: 'Alto en px; el ancho se calcula con la proporción natural.',
      table: { defaultValue: { summary: '40' } },
    },
    envolvente: {
      control: 'boolean',
      description: 'Fondo Rojo INVEX, logo blanco y área de seguridad.',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    variant: 'invex',
    height: 40,
    envolvente: false,
  },
} satisfies Meta<typeof Logo>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variantes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      {logoVariants.map((variant) => (
        <div key={variant} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span style={label}>{variant}</span>
          <Logo variant={variant} height={48} />
        </div>
      ))}
    </div>
  ),
}

export const Envolvente: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 64, flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <span style={label}>Sin envolvente</span>
        <Logo variant="invex" height={48} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <span style={label}>Con envolvente</span>
        <Logo variant="invex" height={48} envolvente />
      </div>
    </div>
  ),
}

export const UsosIncorrectos: Story = {
  name: 'Usos incorrectos',
  render: () => (
    <div style={textStyle}>
      <p style={{ margin: '0 0 16px' }}>
        El logotipo no debe alterarse bajo ninguna circunstancia:
      </p>
      <ul style={{ margin: 0, paddingLeft: 20, display: 'grid', gap: 8 }}>
        {USOS_INCORRECTOS.map((uso) => (
          <li key={uso}>{uso}</li>
        ))}
      </ul>
    </div>
  ),
}
