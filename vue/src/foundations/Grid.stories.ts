import type { Meta, StoryObj } from '@storybook/vue3'
import { Grid, GridCol } from '../components/Grid'

/*
 * Fundamentos / Grid
 * Réplica del fundamento "Grid" del archivo Figma "Ui Kit Web"
 * (node 3389:95): retícula de 12 columnas, gutter de 20px y
 * contenedor de 1140px centrado en desktop.
 */

const demoColStyle = 'height:60px;background:var(--color-secondary-light);'
const introStyle =
  'font-family:var(--font-family-sans);font-size:var(--font-size-md);line-height:var(--line-height-normal);color:var(--color-text-primary);max-width:900px;margin:0 0 32px;'

const meta: Meta = {
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
}

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: (args) => ({
    components: { Grid, GridCol },
    setup: () => ({ args, demoColStyle }),
    template: `
      <Grid v-bind="args">
        <GridCol v-for="i in (args.columns || 12)" :key="i" :span="1" :style="demoColStyle" />
      </Grid>
    `,
  }),
}

export const Reticula: Story = {
  name: 'Retícula',
  render: () => ({
    components: { Grid, GridCol },
    setup: () => ({ rows: [1, 2, 3, 4, 6, 12], demoColStyle, introStyle }),
    template: `
      <div>
        <p :style="introStyle">
          Retícula de 12 columnas con gutter de 20px y contenedor de 1140px centrado
          (márgenes de 70px en desktop 1280). Las filas muestran divisiones de 1, 2, 3, 4,
          6 y 12 columnas.
        </p>
        <div style="display:flex;flex-direction:column;gap:20px;">
          <Grid v-for="cols in rows" :key="cols">
            <GridCol
              v-for="i in cols"
              :key="i"
              :span="12 / cols"
              :style="demoColStyle"
            />
          </Grid>
        </div>
      </div>
    `,
  }),
}

export const SpansMixtos: Story = {
  name: 'Spans mixtos',
  render: () => ({
    components: { Grid, GridCol },
    setup: () => ({ demoColStyle, introStyle }),
    template: `
      <div>
        <p :style="introStyle">
          Las celdas pueden ocupar cualquier cantidad de columnas con la prop
          <code>span</code>.
        </p>
        <div style="display:flex;flex-direction:column;gap:20px;">
          <Grid>
            <GridCol :span="8" :style="demoColStyle" />
            <GridCol :span="4" :style="demoColStyle" />
          </Grid>
          <Grid>
            <GridCol :span="3" :style="demoColStyle" />
            <GridCol :span="6" :style="demoColStyle" />
            <GridCol :span="3" :style="demoColStyle" />
          </Grid>
          <Grid>
            <GridCol :span="2" :style="demoColStyle" />
            <GridCol :span="10" :style="demoColStyle" />
          </Grid>
        </div>
      </div>
    `,
  }),
}
