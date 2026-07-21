import type { Meta, StoryObj } from '@storybook/vue3'
import { ColorCard } from '../components/ColorCard'
import { colors } from './colors'

/*
 * Fundamentos / Colores Base
 * Réplica de la página "Colores Base" del archivo Figma "Ui Kit Web"
 * (node 9075:37705).
 */

const meta: Meta = {
  title: 'Fundamentos/Colors/Colores Base',
  component: ColorCard,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj

const gridStyle =
  'display:flex;flex-wrap:wrap;gap:32px;align-items:flex-start;'
const introStyle =
  'font-family:var(--font-family-sans);font-size:var(--font-size-md);line-height:var(--line-height-normal);color:var(--color-text-primary);max-width:900px;margin:0 0 32px;'

function paletteStory(intro: string | null, cards: Array<{ name: string; value: string; description?: string }>): Story {
  return {
    render: () => ({
      components: { ColorCard },
      setup: () => ({ intro, cards, gridStyle, introStyle }),
      template: `
        <div>
          <p v-if="intro" :style="introStyle">{{ intro }}</p>
          <div :style="gridStyle">
            <ColorCard
              v-for="card in cards"
              :key="card.name"
              :name="card.name"
              :value="card.value"
              :description="card.description"
            />
          </div>
        </div>
      `,
    }),
  }
}

export const Primarios = paletteStory(
  'Los colores primarios son aquellos cuyo uso es predominante al interior de la aplicación. Su uso permite plasmar la identidad gráfica del producto y otorgar relevancia a elementos que tengan un mayor nivel de jerarquía. En el caso de INVEX Banco el color primario es el Rojo INVEX.',
  [
    {
      name: 'Primary--Light',
      value: colors.primary.light,
      description: 'Se utiliza para indicar cuando un botón está deshabilitado.',
    },
    {
      name: 'Primary',
      value: colors.primary.base,
      description:
        'Se utiliza para el header, botones e iconos como acento de color y acción principal.',
    },
    {
      name: 'Primary--Dark',
      value: colors.primary.dark,
      description: 'Se utiliza para indicar cuando un botón está presionado.',
    },
  ],
)

export const Secundarios = paletteStory(
  'Los colores secundarios son aquellos cuyo uso es complementario al interior de la aplicación. Su uso permite brindar un apoyo visual en acciones que tienen una prioridad secundaria y sirven en la interacción para definir estados de componentes.',
  [
    {
      name: 'Secondary--Light',
      value: colors.secondary.light,
      description: 'Se utiliza en textos de jerarquía secundaria.',
    },
    {
      name: 'Secondary',
      value: colors.secondary.base,
      description: 'Se utiliza en textos de jerarquía secundaria.',
    },
    {
      name: 'Secondary--Dark',
      value: colors.secondary.dark,
      description: 'Se utiliza en textos de jerarquía secundaria.',
    },
  ],
)

export const Terciarios = paletteStory(null, [
  {
    name: 'Tertiary--Light',
    value: colors.tertiary.light,
    description:
      'Se utiliza en botones secundarios (con contorno) para indicar que el botón está presionado.',
  },
  {
    name: 'Tertiary',
    value: colors.tertiary.base,
    description:
      'Se utiliza en botones secundarios con contorno, botones de texto, botones con icono y steppers.',
  },
  {
    name: 'Tertiary--Dark',
    value: colors.tertiary.dark,
    description:
      'Se utiliza en botones secundarios con contorno, botones de texto, botones con icono y steppers.',
  },
])

export const Neutros = paletteStory(null, [
  {
    name: 'White',
    value: colors.neutral.white,
    description:
      'Se utiliza como color de fondo para el modo light en cards, botones, logotipo con fondo oscuro, para texto en botones y para iconos.',
  },
  {
    name: 'Background',
    value: colors.neutral.background,
    description: 'Se utiliza como color de fondo para todos los portales.',
  },
  {
    name: 'Gray-100',
    value: colors.neutral.gray100,
    description: 'Se utiliza para colores de fondo en tablas.',
  },
  {
    name: 'Gray-200',
    value: colors.neutral.gray200,
    description: 'Se utiliza para colores de fondo en componentes.',
  },
  {
    name: 'Gray-300',
    value: colors.neutral.gray300,
    description: 'Se utiliza para contornos y textos en formularios.',
  },
  {
    name: 'Gray-400',
    value: colors.neutral.gray400,
    description: 'Se utiliza para contornos y textos en formularios.',
  },
  {
    name: 'Gray-500',
    value: colors.neutral.gray500,
    description: 'Se utiliza en textos de formularios.',
  },
  {
    name: 'Body',
    value: colors.neutral.body,
    description: 'Se utiliza como color principal en textos.',
  },
])

export const SemanticosLight: Story = {
  ...paletteStory(null, [
    {
      name: 'Success--Light',
      value: colors.success.light,
      description: 'Se utiliza como fondo para alertas y notificaciones de éxito.',
    },
    {
      name: 'Warning--Light',
      value: colors.warning.light,
      description: 'Se utiliza como fondo para alertas y notificaciones de advertencia.',
    },
    {
      name: 'Danger--Light',
      value: colors.danger.light,
      description: 'Se utiliza como fondo para alertas y notificaciones de riesgo.',
    },
    {
      name: 'Info--Light',
      value: colors.info.light,
      description: 'Se utiliza como fondo para alertas y notificaciones de información.',
    },
  ]),
  name: 'Semánticos — Light',
}

export const SemanticosBase: Story = {
  ...paletteStory(null, [
    {
      name: 'Success',
      value: colors.success.base,
      description:
        'Se utiliza para notificar casos de éxito en montos positivos, etiquetas e iconos.',
    },
    {
      name: 'Warning',
      value: colors.warning.base,
      description:
        'Se utiliza para notificar casos de advertencia en montos, etiquetas e iconos.',
    },
    {
      name: 'Danger',
      value: colors.danger.base,
      description:
        'Se utiliza para notificar casos de riesgo en montos negativos, etiquetas e iconos.',
    },
    {
      name: 'Info',
      value: colors.info.base,
      description:
        'Se utiliza para notificar casos de información en montos, etiquetas e iconos.',
    },
  ]),
  name: 'Semánticos — Base',
}

export const SemanticosDark: Story = {
  ...paletteStory(null, [
    {
      name: 'Success--Dark',
      value: colors.success.dark,
      description:
        'Se utiliza como color de texto en alertas y textos que indiquen un estatus de éxito.',
    },
    {
      name: 'Warning--Dark',
      value: colors.warning.dark,
      description:
        'Se utiliza como color de texto en alertas y textos que indiquen un estatus de advertencia.',
    },
    {
      name: 'Danger--Dark',
      value: colors.danger.dark,
      description:
        'Se utiliza como color de texto en alertas y textos que indiquen un estatus de riesgo.',
    },
    {
      name: 'Info--Dark',
      value: colors.info.dark,
      description:
        'Se utiliza como color de texto en alertas y textos que indiquen un estatus informativo.',
    },
  ]),
  name: 'Semánticos — Dark',
}

export const DarkMode = paletteStory(null, [
  { name: 'Dark--Blue01', value: colors.darkMode.darkBlue01 },
  { name: 'Dark--Blue02', value: colors.darkMode.darkBlue02 },
  { name: 'Black--Blue', value: colors.darkMode.blackBlue },
])
