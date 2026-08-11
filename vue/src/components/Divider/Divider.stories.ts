import type { Meta, StoryObj } from '@storybook/vue3'
import { Divider } from './index'

/*
 * Layout / Divider
 * Figma: página "Dividers" (node 9342:12689), componentes "Divider" y
 * "Divider 10px" … "Divider 90px".
 */

const SPACINGS = [10, 20, 30, 40, 50, 70, 90]

const demoTextStyle =
  'margin:0;font-family:var(--font-family-sans);font-size:var(--font-size-parrafo);color:var(--color-text-primary);'
const labelStyle =
  'font-family:var(--font-family-sans);font-size:var(--font-size-sm);color:var(--color-text-secondary);'

const meta: Meta = {
  title: 'Layout/Divider',
  component: Divider,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Separador del DS Andromeda (Figma: "Divider"): línea de 1px en `gray-300` renderizada como `<hr>`, con espaciado vertical opcional de la escala Spacing (10–90px a cada lado).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    spacing: {
      control: 'select',
      options: [0, ...SPACINGS],
      description: 'Espaciado vertical a cada lado (escala Spacing; 0 = solo la línea).',
      table: { defaultValue: { summary: '0' } },
    },
  },
  args: {
    spacing: 0,
  },
}

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: (args) => ({
    components: { Divider },
    setup: () => ({ args, demoTextStyle }),
    template: `
      <div>
        <p :style="demoTextStyle">Contenido superior</p>
        <Divider :spacing="args.spacing" />
        <p :style="demoTextStyle">Contenido inferior</p>
      </div>
    `,
  }),
}

export const Espaciados: Story = {
  render: () => ({
    components: { Divider },
    setup: () => ({ SPACINGS, labelStyle }),
    template: `
      <div style="display:flex;flex-direction:column;gap:30px;">
        <div>
          <span :style="labelStyle">Divider (solo línea)</span>
          <Divider />
        </div>
        <div v-for="spacing in SPACINGS" :key="spacing">
          <span :style="labelStyle">Divider {{ spacing }}px</span>
          <div style="background:var(--color-background);">
            <Divider :spacing="spacing" />
          </div>
        </div>
      </div>
    `,
  }),
}
