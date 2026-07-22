import type { Meta, StoryObj } from '@storybook/vue3'
import { Logo, logoVariants } from '../components/Logo'

/*
 * Fundamentos / Logo
 * Réplica del fundamento "Marcas Invex" del archivo Figma "Ui Kit Web"
 * (node 9190:752): marcas Invex, Invex Banco, Invex Fiduciario e
 * Invex Renacer, envolvente y usos incorrectos.
 */

const labelStyle =
  'font-family:var(--font-family-sans);font-size:var(--font-size-sm);color:var(--color-text-secondary);'
const textStyle =
  'font-family:var(--font-family-sans);font-size:var(--font-size-md);line-height:var(--line-height-normal);color:var(--color-text-primary);max-width:900px;'

const USOS_INCORRECTOS = [
  'No deformar el logotipo.',
  'No rotarlo.',
  'No variar las proporciones de ningún elemento.',
  'No aplicar sombras.',
  'No variar el interletrado.',
  'No aplicar outlines.',
  'No cambiar la posición de ningún elemento.',
  'No cambiar los colores.',
  'No aplicarlo sobre fondos, texturas o imágenes que afecten su buen rendimiento.',
  'No variar el peso de la tipografía del eslogan.',
  'No utilizar el logotipo para enmascarar fotografías.',
]

const meta: Meta = {
  title: 'Fundamentos/Logo',
  component: Logo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Marcas INVEX del DS Andromeda. Se usa con `<Logo variant="invex" :height="40" />`; el color se hereda vía currentColor (Rojo INVEX por defecto) y `envolvente` aplica el área de seguridad sobre fondo primario.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: logoVariants,
      description: 'Marca a mostrar.',
    },
    height: {
      control: { type: 'number', min: 16, max: 160, step: 4 },
      description: 'Alto en px; el ancho se calcula con la proporción natural.',
      table: { defaultValue: { summary: '40' } },
    },
    envolvente: {
      control: 'boolean',
      description: 'Fondo Rojo INVEX, logo blanco y área de seguridad.',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    variant: 'invex',
    height: 40,
    envolvente: false,
  },
}

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: (args) => ({
    components: { Logo },
    setup: () => ({ args }),
    template: `<Logo v-bind="args" />`,
  }),
}

export const Variantes: Story = {
  render: () => ({
    components: { Logo },
    setup: () => ({ logoVariants, labelStyle }),
    template: `
      <div style="display:flex;flex-direction:column;gap:40px;">
        <div
          v-for="variant in logoVariants"
          :key="variant"
          style="display:flex;flex-direction:column;gap:12px;"
        >
          <span :style="labelStyle">{{ variant }}</span>
          <Logo :variant="variant" :height="48" />
        </div>
      </div>
    `,
  }),
}

export const Envolvente: Story = {
  render: () => ({
    components: { Logo },
    setup: () => ({ labelStyle }),
    template: `
      <div style="display:flex;align-items:flex-start;gap:64px;flex-wrap:wrap;">
        <div style="display:flex;flex-direction:column;gap:12px;">
          <span :style="labelStyle">Sin envolvente</span>
          <Logo variant="invex" :height="48" />
        </div>
        <div style="display:flex;flex-direction:column;gap:12px;">
          <span :style="labelStyle">Con envolvente</span>
          <Logo variant="invex" :height="48" envolvente />
        </div>
      </div>
    `,
  }),
}

export const UsosIncorrectos: Story = {
  name: 'Usos incorrectos',
  render: () => ({
    setup: () => ({ usos: USOS_INCORRECTOS, textStyle }),
    template: `
      <div :style="textStyle">
        <p style="margin:0 0 16px;">El logotipo no debe alterarse bajo ninguna circunstancia:</p>
        <ul style="margin:0;padding-left:20px;display:grid;gap:8px;">
          <li v-for="uso in usos" :key="uso">{{ uso }}</li>
        </ul>
      </div>
    `,
  }),
}
