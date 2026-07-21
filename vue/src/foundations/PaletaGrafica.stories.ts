import type { Meta, StoryObj } from '@storybook/vue3'
import { ColorCard } from '../components/ColorCard'
import { chartPalette, chartColor } from './colors'

/*
 * Fundamentos / Paleta gráfica de pastel
 * Réplica de la página "Paleta gráfica de pastel" del archivo Figma
 * "Ui Kit Web" (node 10445:399): paleta ordenada para gráficas de
 * pastel (pie/donut) y reglas de uso.
 */

const meta: Meta = {
  title: 'Fundamentos/Colors/Paleta gráfica de pastel',
  component: ColorCard,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj

const textStyle =
  'font-family:var(--font-family-sans);font-size:var(--font-size-md);line-height:var(--line-height-normal);color:var(--color-text-primary);max-width:900px;'

const CHART_CARDS = [
  { name: 'Chart-1 (Primary--Dark)', usage: 'Se utiliza como primer color en la gráfica.' },
  { name: 'Chart-2 (Primary)', usage: 'Se utiliza como el segundo color del elemento en la gráfica.' },
  { name: 'Chart-3 (Tertiary)', usage: 'Se utiliza como el tercer color del elemento en la gráfica.' },
  { name: 'Chart-4', usage: 'Se utiliza como el cuarto color del elemento en la gráfica.' },
  { name: 'Chart-5 (Gray-300)', usage: 'Se utiliza como el quinto color del elemento en la gráfica.' },
  { name: 'Chart-6 (Secondary)', usage: 'Se utiliza del 6to al n cantidad de elementos en la gráfica.' },
].map((card, i) => ({ ...card, value: chartPalette[i] }))

export const Paleta: Story = {
  render: () => ({
    components: { ColorCard },
    setup: () => ({ cards: CHART_CARDS, textStyle }),
    template: `
      <div>
        <p :style="textStyle + 'margin:0 0 32px;'">
          Paleta ordenada para gráficas de pastel: cada posición de la serie usa el color
          de su índice. A partir del 6º elemento, la serie se agrupa en «Otros» con el
          último color de la paleta.
        </p>
        <div style="display:flex;flex-wrap:wrap;gap:32px;align-items:flex-start;">
          <ColorCard
            v-for="card in cards"
            :key="card.name"
            :name="card.name"
            :value="card.value"
            :description="card.usage"
          />
        </div>
      </div>
    `,
  }),
}

export const RecomendacionesDeUso: Story = {
  name: 'Recomendaciones de uso',
  render: () => ({
    setup: () => ({ textStyle }),
    template: `
      <div :style="textStyle">
        <h3 style="font-weight:var(--font-weight-semibold);margin:0 0 16px;">
          ¿Cuántas categorías conviene mostrar?
        </h3>
        <ul style="margin:0 0 24px;padding-left:20px;display:grid;gap:8px;">
          <li>
            <strong style="color:var(--color-feedback-success);">Ideal:</strong>
            hasta 4 categorías por gráfica.
          </li>
          <li>
            <strong style="color:var(--color-feedback-warning-strong);">Aceptable:</strong>
            5 categorías.
          </li>
          <li>
            <strong style="color:var(--color-feedback-danger);">No recomendado:</strong>
            6 o más categorías — agrupá el excedente en «Otros» con el último color.
          </li>
        </ul>
        <h3 style="font-weight:var(--font-weight-semibold);margin:0 0 16px;">
          Por qué limitar la cantidad de categorías
        </h3>
        <ul style="margin:0;padding-left:20px;display:grid;gap:8px;">
          <li>Espacio limitado: en móviles o dashboards compactos, muchas categorías colapsan el diseño.</li>
          <li>Colores: más categorías requieren más colores, lo que puede generar confusión o problemas de accesibilidad.</li>
          <li>Etiquetas: pueden superponerse o volverse ilegibles.</li>
        </ul>
      </div>
    `,
  }),
}

export const EjemploDona: Story = {
  name: 'Ejemplo — dona',
  render: () => ({
    setup: () => {
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
      const donutStyle = [
        'width:220px',
        'height:220px',
        'border-radius:50%',
        `background:conic-gradient(${stops.join(', ')})`,
        'mask:radial-gradient(circle, transparent 36%, black 37%)',
        '-webkit-mask:radial-gradient(circle, transparent 36%, black 37%)',
      ].join(';')
      const legend = data.map((d, i) => ({ ...d, color: chartColor(i) }))
      return { donutStyle, legend, textStyle }
    },
    template: `
      <div style="display:flex;gap:48px;align-items:center;flex-wrap:wrap;">
        <div
          role="img"
          aria-label="Gráfica de pastel de ejemplo con 6 elementos"
          :style="donutStyle"
        />
        <ul :style="textStyle + 'list-style:none;margin:0;padding:0;display:grid;gap:8px;'">
          <li
            v-for="item in legend"
            :key="item.label"
            style="display:flex;align-items:center;gap:12px;"
          >
            <span
              :style="'width:16px;height:16px;border-radius:50%;flex-shrink:0;background:' + item.color"
            />
            {{ item.label }} — {{ item.value }}%
          </li>
        </ul>
      </div>
    `,
  }),
}
