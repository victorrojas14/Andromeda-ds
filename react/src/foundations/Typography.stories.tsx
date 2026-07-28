import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { Text } from '../components/Text'
import type { TextVariant, TextWeight } from '../components/Text'

/*
 * Fundamentos / Typography
 * Réplica de los fundamentos "Tipografía Web" (node 9236:1830),
 * "Tipografía App" (node 9252:792) y "Foundations / Typography"
 * (node 1165:1076) del archivo Figma "Ui Kit Web".
 */

const WEIGHTS: TextWeight[] = ['regular', 'medium', 'semibold']

const label: React.CSSProperties = {
  fontFamily: 'var(--font-family-sans)',
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-secondary)',
}

const intro: React.CSSProperties = {
  fontFamily: 'var(--font-family-sans)',
  fontSize: 'var(--font-size-md)',
  lineHeight: 'var(--line-height-normal)',
  color: 'var(--color-text-primary)',
  maxWidth: 900,
  margin: '0 0 32px',
}

function ScaleRows({ rows }: { rows: Array<{ variant: TextVariant; size: string }> }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40, color: 'var(--color-text-primary)' }}>
      {rows.map(({ variant, size }) => (
        <div key={variant} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, alignItems: 'baseline' }}>
            {WEIGHTS.map((weight) => (
              <Text key={weight} variant={variant} weight={weight} as="div">
                {variant.startsWith('display')
                  ? `Display ${variant.slice(-1)}`
                  : variant.startsWith('h')
                    ? `Heading ${variant}`
                    : variant === 'parrafo'
                      ? 'Body - Parrafo'
                      : variant}
              </Text>
            ))}
          </div>
          <span style={label}>
            {variant} — {size} · regular / medium / semibold
          </span>
        </div>
      ))}
    </div>
  )
}

const meta = {
  title: 'Fundamentos/Typography',
  component: Text,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Escala tipográfica del DS Andromeda (Poppins, line-height 150%, letter-spacing 0). Se usa con `<Text variant="h2" weight="semibold">`. En los estilos Display, `regular` renderiza ExtraLight (275) y `medium` renderiza Regular (400), fiel a Figma.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'display-1', 'display-2', 'display-3', 'display-4',
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'parrafo', 'parrafo-sm', 'parrafo-xs', 'small-1', 'small-2',
      ],
      description: 'Estilo de la escala tipográfica.',
    },
    weight: {
      control: 'inline-radio',
      options: WEIGHTS,
      description: 'Peso (en Display: regular→275, medium→400).',
    },
    children: { control: 'text' },
  },
  args: {
    variant: 'h2',
    weight: 'regular',
    children: 'Lo hacemos para el cliente, lo hacemos en grande y lo hacemos en equipo',
  },
} satisfies Meta<typeof Text>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Poppins: Story = {
  render: () => (
    <div style={{ color: 'var(--color-text-primary)' }}>
      <p style={intro}>
        Poppins es una tipografía geométrica sans-serif creada por Indian Type Foundry en
        2014. Es una fuente que funciona mucho mejor en pantallas, por lo que es perfecta
        para diseño web. Estilos del DS: Regular (400), Medium (500) y Semi-Bold (600).
      </p>
      <div style={{ display: 'flex', gap: 48, alignItems: 'flex-end' }}>
        <div>
          <Text variant="display-1" weight="medium" as="div">Aa</Text>
          <Text variant="h4" weight="regular" as="div">Poppins</Text>
        </div>
        <div style={{ display: 'grid', gap: 8 }}>
          <Text variant="parrafo" weight="regular" as="div">Regular — font-weight: 400;</Text>
          <Text variant="parrafo" weight="medium" as="div">Medium — font-weight: 500;</Text>
          <Text variant="parrafo" weight="semibold" as="div">Semi-Bold — font-weight: 600;</Text>
        </div>
      </div>
    </div>
  ),
}

export const Display: Story = {
  render: () => (
    <ScaleRows
      rows={[
        { variant: 'display-1', size: '4.5 rem / 72px' },
        { variant: 'display-2', size: '4 rem / 64px' },
        { variant: 'display-3', size: '3.5 rem / 56px' },
        { variant: 'display-4', size: '3 rem / 48px' },
      ]}
    />
  ),
}

export const Heading: Story = {
  render: () => (
    <ScaleRows
      rows={[
        { variant: 'h1', size: '2.5 rem / 40px' },
        { variant: 'h2', size: '2 rem / 32px' },
        { variant: 'h3', size: '1.75 rem / 28px' },
        { variant: 'h4', size: '1.5 rem / 24px' },
        { variant: 'h5', size: '1.25 rem / 20px' },
        { variant: 'h6', size: '1 rem / 16px' },
      ]}
    />
  ),
}

export const Body: Story = {
  render: () => (
    <ScaleRows
      rows={[
        { variant: 'parrafo', size: '1 rem / 16px' },
        { variant: 'parrafo-sm', size: '0.875 rem / 14px' },
        { variant: 'parrafo-xs', size: '0.75 rem / 12px' },
        { variant: 'small-1', size: '0.625 rem / 10px' },
        { variant: 'small-2', size: '0.5 rem / 8px' },
      ]}
    />
  ),
}

export const EscalaApp: Story = {
  name: 'Escala App',
  render: () => (
    <div>
      <p style={intro}>
        La tipografía base para APP usa el subconjunto de la escala Web: Heading h2, h4,
        h5 y h6, Parrafo-SM, Parrafo-XS y Small 1–2.
      </p>
      <ScaleRows
        rows={[
          { variant: 'h2', size: '2 rem / 32px' },
          { variant: 'h4', size: '1.5 rem / 24px' },
          { variant: 'h5', size: '1.25 rem / 20px' },
          { variant: 'h6', size: '1 rem / 16px' },
          { variant: 'parrafo-sm', size: '0.875 rem / 14px' },
          { variant: 'parrafo-xs', size: '0.75 rem / 12px' },
          { variant: 'small-1', size: '0.625 rem / 10px' },
          { variant: 'small-2', size: '0.5 rem / 8px' },
        ]}
      />
    </div>
  ),
}
