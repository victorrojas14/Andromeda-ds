import type { Meta, StoryObj } from '@storybook/vue3'

/*
 * Fundamentos / Rounded
 * Réplica del fundamento "Rounded" del archivo Figma "Ui Kit Web"
 * (node 9236:1365): escala de radios del DS.
 *
 * Es un fundamento de tokens puros (--radius-*): la página de Figma
 * son rectángulos de documentación, sin componentes publicados en la
 * librería, por lo que no hay nodo mapeable con Code Connect.
 */

const RADII = [
  { name: 'Rounded - SM 4px', token: '--radius-sm' },
  { name: 'Rounded - MD 10px', token: '--radius-md' },
  { name: 'Rounded - LG 20px', token: '--radius-lg' },
  { name: 'Rounded - XL 50px', token: '--radius-xl' },
]

const labelStyle =
  'font-family:var(--font-family-sans);font-size:var(--font-size-md);color:var(--color-text-primary);'
const tokenLabelStyle =
  'font-family:var(--font-family-mono);font-size:var(--font-size-sm);color:var(--color-text-secondary);'

const meta: Meta = {
  title: 'Fundamentos/Rounded',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Escala de radios del DS Andromeda (tokens `--radius-*`): SM 4px, MD 10px, LG 20px y XL 50px, más `--radius-none` y `--radius-pill`. Se consume como token: `border-radius: var(--radius-md)`.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', 'pill'],
      description: 'Token de radio aplicado (`--radius-*`).',
      table: { defaultValue: { summary: 'md' } },
    },
    size: {
      control: { type: 'number', min: 50, max: 300, step: 10 },
      description: 'Tamaño del cuadrado de muestra en px.',
      table: { defaultValue: { summary: '150' } },
    },
  },
  args: {
    radius: 'md',
    size: 150,
  },
}

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: (args) => ({
    setup: () => ({ args, tokenLabelStyle }),
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;">
        <div
          :style="'width:' + args.size + 'px;height:' + args.size + 'px;background:var(--color-gray-300);border-radius:var(--radius-' + args.radius + ');'"
        />
        <span :style="tokenLabelStyle">border-radius: var(--radius-{{ args.radius }})</span>
      </div>
    `,
  }),
}

export const Escala: Story = {
  render: () => ({
    setup: () => ({ radii: RADII, labelStyle, tokenLabelStyle }),
    template: `
      <div style="display:flex;gap:48px;flex-wrap:wrap;">
        <div
          v-for="r in radii"
          :key="r.token"
          style="display:flex;flex-direction:column;gap:16px;"
        >
          <span :style="labelStyle">{{ r.name }}</span>
          <div
            :style="'width:150px;height:150px;background:var(--color-gray-300);border-radius:var(' + r.token + ');'"
          />
          <span :style="tokenLabelStyle">{{ r.token }}</span>
        </div>
      </div>
    `,
  }),
}
