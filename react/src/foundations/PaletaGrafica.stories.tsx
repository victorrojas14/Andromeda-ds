import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { ColorCard } from '../components/ColorCard'
import { chartPalette, chartColor } from './colors'

/*
 * Fundamentos / Paleta gráfica de pastel
 * Réplica de la página "Paleta gráfica de pastel" del archivo Figma
 * "Ui Kit Web" (node 10445:399): paleta ordenada para gráficas de
 * pastel (pie/donut) y reglas de uso.
 */

const grid: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 32,
  alignItems: 'flex-start',
}

const textStyle: React.CSSProperties = {
  fontFamily: 'var(--font-family-sans)',
  fontSize: 'var(--font-size-md)',
  lineHeight: 'var(--line-height-normal)',
  color: 'var(--color-text-primary)',
  maxWidth: 900,
}

const CHART_USAGE = [
  'Se utiliza como primer color en la gráfica.',
  'Se utiliza como el segundo color del elemento en la gráfica.',
  'Se utiliza como el tercer color del elemento en la gráfica.',
  'Se utiliza como el cuarto color del elemento en la gráfica.',
  'Se utiliza como el quinto color del elemento en la gráfica.',
  'Se utiliza del 6to al n cantidad de elementos en la gráfica.',
]

const CHART_NAMES = [
  'Chart-1 (Primary--Dark)',
  'Chart-2 (Primary)',
  'Chart-3 (Tertiary)',
  'Chart-4',
  'Chart-5 (Gray-300)',
  'Chart-6 (Secondary)',
]

const meta: Meta = {
  title: 'Fundamentos/Colors/Paleta gráfica de pastel',
  component: ColorCard,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj

export const Paleta: Story = {
  render: () => (
    <div>
      <p style={{ ...textStyle, margin: '0 0 32px' }}>
        Paleta ordenada para gráficas de pastel: cada posición de la serie usa el color
        de su índice. A partir del 6º elemento, la serie se agrupa en «Otros» con el
        último color de la paleta.
      </p>
      <div style={grid}>
        {chartPalette.map((hex, i) => (
          <ColorCard key={hex} name={CHART_NAMES[i]} value={hex} description={CHART_USAGE[i]} />
        ))}
      </div>
    </div>
  ),
}

export const RecomendacionesDeUso: Story = {
  name: 'Recomendaciones de uso',
  render: () => (
    <div style={textStyle}>
      <h3 style={{ fontWeight: 'var(--font-weight-semibold)' as never, margin: '0 0 16px' }}>
        ¿Cuántas categorías conviene mostrar?
      </h3>
      <ul style={{ margin: '0 0 24px', paddingLeft: 20, display: 'grid', gap: 8 }}>
        <li>
          <strong style={{ color: 'var(--color-feedback-success)' }}>Ideal:</strong>{' '}
          hasta 4 categorías por gráfica.
        </li>
        <li>
          <strong style={{ color: 'var(--color-feedback-warning-strong)' }}>Aceptable:</strong>{' '}
          5 categorías.
        </li>
        <li>
          <strong style={{ color: 'var(--color-feedback-danger)' }}>No recomendado:</strong>{' '}
          6 o más categorías — agrupá el excedente en «Otros» con el último color.
        </li>
      </ul>
      <h3 style={{ fontWeight: 'var(--font-weight-semibold)' as never, margin: '0 0 16px' }}>
        Por qué limitar la cantidad de categorías
      </h3>
      <ul style={{ margin: 0, paddingLeft: 20, display: 'grid', gap: 8 }}>
        <li>
          Espacio limitado: en móviles o dashboards compactos, muchas categorías colapsan
          el diseño.
        </li>
        <li>
          Colores: más categorías requieren más colores, lo que puede generar confusión o
          problemas de accesibilidad.
        </li>
        <li>Etiquetas: pueden superponerse o volverse ilegibles.</li>
      </ul>
    </div>
  ),
}

export const EjemploDona: Story = {
  name: 'Ejemplo — dona',
  render: () => {
    const data = [
      { label: 'Categoría 1', value: 40 },
      { label: 'Categoría 2', value: 25 },
      { label: 'Categoría 3', value: 15 },
      { label: 'Categoría 4', value: 10 },
      { label: 'Categoría 5', value: 6 },
      { label: 'Otros', value: 4 },
    ]
    let acc = 0
    const stops = data.map((d, i) => {
      const from = acc
      acc += d.value
      return `${chartColor(i)} ${from}% ${acc}%`
    })
    return (
      <div style={{ display: 'flex', gap: 48, alignItems: 'center', flexWrap: 'wrap' }}>
        <div
          role="img"
          aria-label="Gráfica de pastel de ejemplo con 6 elementos"
          style={{
            width: 220,
            height: 220,
            borderRadius: '50%',
            background: `conic-gradient(${stops.join(', ')})`,
            mask: 'radial-gradient(circle, transparent 36%, black 37%)',
            WebkitMask: 'radial-gradient(circle, transparent 36%, black 37%)',
          }}
        />
        <ul
          style={{
            ...textStyle,
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'grid',
            gap: 8,
          }}
        >
          {data.map((d, i) => (
            <li key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  background: chartColor(i),
                  flexShrink: 0,
                }}
              />
              {d.label} — {d.value}%
            </li>
          ))}
        </ul>
      </div>
    )
  },
}
