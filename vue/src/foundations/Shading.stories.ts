import type { Meta, StoryObj } from '@storybook/vue3'

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
]

const sectionStyle =
  'display:flex;gap:64px;flex-wrap:wrap;padding:50px;background:var(--color-background);border-radius:var(--radius-sm);'
const labelStyle =
  'font-family:var(--font-family-sans);font-size:var(--font-size-md);color:var(--color-text-primary);'
const tokenLabelStyle =
  'font-family:var(--font-family-mono);font-size:var(--font-size-sm);color:var(--color-text-secondary);'

function shadowStory(items: Array<{ name: string; token: string }>): Story {
  return {
    render: () => ({
      setup: () => ({ items, sectionStyle, labelStyle, tokenLabelStyle }),
      template: `
        <div :style="sectionStyle">
          <div
            v-for="item in items"
            :key="item.token"
            style="display:flex;flex-direction:column;gap:24px;"
          >
            <span :style="labelStyle">{{ item.name }}</span>
            <div
              :style="'width:150px;height:150px;background:var(--color-white);box-shadow:var(' + item.token + ');'"
            />
            <span :style="tokenLabelStyle">{{ item.token }}</span>
          </div>
        </div>
      `,
    }),
  }
}

const meta: Meta = {
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
      options: SHADOW_TOKENS,
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
type Story = StoryObj

export const Playground: Story = {
  render: (args) => ({
    setup: () => ({ args, sectionStyle, tokenLabelStyle }),
    template: `
      <div :style="sectionStyle + 'flex-direction:column;gap:24px;'">
        <div
          :style="'width:' + args.size + 'px;height:' + args.size + 'px;background:var(--color-white);box-shadow:var(--shadow-' + args.shadow + ');'"
        />
        <span :style="tokenLabelStyle">box-shadow: var(--shadow-{{ args.shadow }})</span>
      </div>
    `,
  }),
}

export const Sombra1: Story = {
  ...shadowStory([
    { name: 'Sombra - SM', token: '--shadow-sm' },
    { name: 'Sombra - MD', token: '--shadow-md' },
    { name: 'Sombra - LG', token: '--shadow-lg' },
    { name: 'Sombra - XL', token: '--shadow-xl' },
    { name: 'Sombra - Per', token: '--shadow-per' },
  ]),
  name: 'Sombra 1 — centrada',
}

export const Sombra2: Story = {
  ...shadowStory([
    { name: 'Sombra - SM2', token: '--shadow-sm-2' },
    { name: 'Sombra - MD2', token: '--shadow-md-2' },
    { name: 'Sombra - LG2', token: '--shadow-lg-2' },
    { name: 'Sombra - XL2', token: '--shadow-xl-2' },
  ]),
  name: 'Sombra 2 — abajo-derecha',
}

export const Sombra3: Story = {
  ...shadowStory([
    { name: 'Sombra - SM3', token: '--shadow-sm-3' },
    { name: 'Sombra - MD3', token: '--shadow-md-3' },
    { name: 'Sombra - LG3', token: '--shadow-lg-3' },
    { name: 'Sombra - XL3', token: '--shadow-xl-3' },
  ]),
  name: 'Sombra 3 — abajo-izquierda',
}

export const SombraAutolayout: Story = {
  ...shadowStory([
    { name: 'Sombra Autolayout - SM', token: '--shadow-autolayout-sm' },
    { name: 'Sombra Autolayout - MD', token: '--shadow-autolayout-md' },
    { name: 'Sombra Autolayout - LG', token: '--shadow-autolayout-lg' },
    { name: 'Sombra Autolayout - XL', token: '--shadow-autolayout-xl' },
  ]),
  name: 'Sombra Autolayout',
}
