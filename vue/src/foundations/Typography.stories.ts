import type { Meta, StoryObj } from '@storybook/vue3'
import { Text } from '../components/Text'

/*
 * Fundamentos / Typography
 * Réplica de los fundamentos "Tipografía Web" (node 9236:1830),
 * "Tipografía App" (node 9252:792) y "Foundations / Typography"
 * (node 1165:1076) del archivo Figma "Ui Kit Web".
 */

const WEIGHTS = ['regular', 'medium', 'semibold']

const labelStyle =
  'font-family:var(--font-family-sans);font-size:var(--font-size-sm);color:var(--color-text-secondary);'
const introStyle =
  'font-family:var(--font-family-sans);font-size:var(--font-size-md);line-height:var(--line-height-normal);color:var(--color-text-primary);max-width:900px;margin:0 0 32px;'

function rowLabel(variant: string): string {
  if (variant.startsWith('display')) return 'Display ' + variant.slice(-1)
  if (/^h\d$/.test(variant)) return 'Heading ' + variant
  if (variant === 'parrafo') return 'Body - Parrafo'
  return variant
}

function scaleStory(introText: string | null, rows: Array<{ variant: string; size: string }>): Story {
  return {
    render: () => ({
      components: { Text },
      setup: () => ({ intro: introText, rows, WEIGHTS, labelStyle, introStyle, rowLabel }),
      template: `
        <div>
          <p v-if="intro" :style="introStyle">{{ intro }}</p>
          <div style="display:flex;flex-direction:column;gap:40px;color:var(--color-text-primary);">
            <div v-for="row in rows" :key="row.variant" style="display:flex;flex-direction:column;gap:8px;">
              <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:8px;align-items:baseline;">
                <Text
                  v-for="weight in WEIGHTS"
                  :key="weight"
                  :variant="row.variant"
                  :weight="weight"
                  tag="div"
                >{{ rowLabel(row.variant) }}</Text>
              </div>
              <span :style="labelStyle">{{ row.variant }} — {{ row.size }} · regular / medium / semibold</span>
            </div>
          </div>
        </div>
      `,
    }),
  }
}

const meta: Meta = {
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
    default: { control: 'text', description: 'Contenido (slot default)' },
  },
  args: {
    variant: 'h2',
    weight: 'regular',
    default: 'Lo hacemos para el cliente, lo hacemos en grande y lo hacemos en equipo',
  },
}

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: (args) => ({
    components: { Text },
    setup: () => ({ args }),
    template: `<Text :variant="args.variant" :weight="args.weight">{{ args.default }}</Text>`,
  }),
}

export const Poppins: Story = {
  render: () => ({
    components: { Text },
    setup: () => ({ introStyle }),
    template: `
      <div style="color:var(--color-text-primary);">
        <p :style="introStyle">
          Poppins es una tipografía geométrica sans-serif creada por Indian Type Foundry en
          2014. Es una fuente que funciona mucho mejor en pantallas, por lo que es perfecta
          para diseño web. Estilos del DS: Regular (400), Medium (500) y Semi-Bold (600).
        </p>
        <div style="display:flex;gap:48px;align-items:flex-end;">
          <div>
            <Text variant="display-1" weight="medium" tag="div">Aa</Text>
            <Text variant="h4" weight="regular" tag="div">Poppins</Text>
          </div>
          <div style="display:grid;gap:8px;">
            <Text variant="parrafo" weight="regular" tag="div">Regular — font-weight: 400;</Text>
            <Text variant="parrafo" weight="medium" tag="div">Medium — font-weight: 500;</Text>
            <Text variant="parrafo" weight="semibold" tag="div">Semi-Bold — font-weight: 600;</Text>
          </div>
        </div>
      </div>
    `,
  }),
}

export const Display = scaleStory(null, [
  { variant: 'display-1', size: '4.5 rem / 72px' },
  { variant: 'display-2', size: '4 rem / 64px' },
  { variant: 'display-3', size: '3.5 rem / 56px' },
  { variant: 'display-4', size: '3 rem / 48px' },
])

export const Heading = scaleStory(null, [
  { variant: 'h1', size: '2.5 rem / 40px' },
  { variant: 'h2', size: '2 rem / 32px' },
  { variant: 'h3', size: '1.75 rem / 28px' },
  { variant: 'h4', size: '1.5 rem / 24px' },
  { variant: 'h5', size: '1.25 rem / 20px' },
  { variant: 'h6', size: '1 rem / 16px' },
])

export const Body = scaleStory(null, [
  { variant: 'parrafo', size: '1 rem / 16px' },
  { variant: 'parrafo-sm', size: '0.875 rem / 14px' },
  { variant: 'parrafo-xs', size: '0.75 rem / 12px' },
  { variant: 'small-1', size: '0.625 rem / 10px' },
  { variant: 'small-2', size: '0.5 rem / 8px' },
])

export const EscalaApp: Story = {
  ...scaleStory(
    'La tipografía base para APP usa el subconjunto de la escala Web: Heading h2, h4, h5 y h6, Parrafo-SM, Parrafo-XS y Small 1–2.',
    [
      { variant: 'h2', size: '2 rem / 32px' },
      { variant: 'h4', size: '1.5 rem / 24px' },
      { variant: 'h5', size: '1.25 rem / 20px' },
      { variant: 'h6', size: '1 rem / 16px' },
      { variant: 'parrafo-sm', size: '0.875 rem / 14px' },
      { variant: 'parrafo-xs', size: '0.75 rem / 12px' },
      { variant: 'small-1', size: '0.625 rem / 10px' },
      { variant: 'small-2', size: '0.5 rem / 8px' },
    ],
  ),
  name: 'Escala App',
}
