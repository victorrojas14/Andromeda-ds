import type { Meta, StoryObj } from '@storybook/vue3'

/*
 * Fundamentos / Spacing
 * Réplica del fundamento "Spacing" del archivo Figma "Ui Kit Web"
 * (node 9461:3893): tokens de espaciado con variables Desktop y Mobile.
 *
 * Es un fundamento de tokens puros (--space-*): la página de Figma es
 * una tabla de documentación, sin componentes publicados en la
 * librería, por lo que no hay nodo mapeable con Code Connect.
 */

const SPACES = [
  { token: 'Space-0', desktop: 0, mobile: 0 },
  { token: 'Space-8', desktop: 8, mobile: 8 },
  { token: 'Space-10', desktop: 10, mobile: 8 },
  { token: 'Space-16', desktop: 16, mobile: 16 },
  { token: 'Space-20', desktop: 20, mobile: 16 },
  { token: 'Space-24', desktop: 24, mobile: 16 },
  { token: 'Space-30', desktop: 30, mobile: 24 },
  { token: 'Space-40', desktop: 40, mobile: 32 },
  { token: 'Space-50', desktop: 50, mobile: 50 },
  { token: 'Space-70', desktop: 70, mobile: 70 },
  { token: 'Space-90', desktop: 90, mobile: 90 },
]

const SPACE_OPTIONS = SPACES.filter((s) => s.desktop > 0).map((s) =>
  s.token.replace('Space-', ''),
)

const textStyle =
  'font-family:var(--font-family-sans);font-size:var(--font-size-md);color:var(--color-text-primary);'
const headStyle = textStyle + 'font-weight:var(--font-weight-medium);'
const tokenLabelStyle =
  'font-family:var(--font-family-mono);font-size:var(--font-size-sm);color:var(--color-text-secondary);'

const meta: Meta = {
  title: 'Fundamentos/Spacing',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Tokens de espaciado del DS Andromeda con variables Desktop y Mobile (`--space-N` / `--space-N-mobile`; el nombre indica el valor desktop en px). Se consume como token: `gap: var(--space-20)`.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    space: {
      control: 'select',
      options: SPACE_OPTIONS,
      description: 'Token de espaciado (`--space-N`).',
      table: { defaultValue: { summary: '20' } },
    },
    mode: {
      control: 'inline-radio',
      options: ['desktop', 'mobile'],
      description: 'Variable Desktop o Mobile del token.',
      table: { defaultValue: { summary: 'desktop' } },
    },
  },
  args: {
    space: '20',
    mode: 'desktop',
  },
}

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: (args) => ({
    setup: () => {
      const a = args as { space: string; mode: string }
      const cssVar = () => `--space-${a.space}${a.mode === 'mobile' ? '-mobile' : ''}`
      return { args, cssVar, tokenLabelStyle }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;">
        <div :style="'display:flex;gap:var(' + cssVar() + ');'">
          <div style="width:120px;height:60px;background:var(--color-gray-300);border-radius:var(--radius-sm);" />
          <div style="width:120px;height:60px;background:var(--color-gray-300);border-radius:var(--radius-sm);" />
        </div>
        <span :style="tokenLabelStyle">gap: var({{ cssVar() }})</span>
      </div>
    `,
  }),
}

export const Tokens: Story = {
  name: 'Tokens Desktop y Mobile',
  render: () => ({
    setup: () => ({ spaces: SPACES, textStyle, headStyle, tokenLabelStyle }),
    template: `
      <div style="display:grid;grid-template-columns:160px 1fr 1fr;row-gap:30px;column-gap:60px;align-items:start;padding:50px;background:var(--color-background);border-radius:var(--radius-sm);">
        <span :style="headStyle">Nombre de token</span>
        <span :style="headStyle">Desktop</span>
        <span :style="headStyle">Mobile</span>
        <template v-for="s in spaces" :key="s.token">
          <span :style="textStyle">{{ s.token }}</span>
          <span style="display:flex;gap:24px;align-items:flex-start;">
            <span :style="textStyle + 'width:32px;'">{{ s.desktop }}</span>
            <span v-if="s.desktop > 0" :style="'display:inline-block;background:var(--color-secondary);width:' + s.desktop + 'px;height:' + s.desktop + 'px;'" />
            <span v-else :style="tokenLabelStyle">—</span>
          </span>
          <span style="display:flex;gap:24px;align-items:flex-start;">
            <span :style="textStyle + 'width:32px;'">{{ s.mobile }}</span>
            <span v-if="s.mobile > 0" :style="'display:inline-block;background:var(--color-secondary);width:' + s.mobile + 'px;height:' + s.mobile + 'px;'" />
            <span v-else :style="tokenLabelStyle">—</span>
          </span>
        </template>
      </div>
    `,
  }),
}
