import type { Meta, StoryObj } from '@storybook/vue3'
import { Icon, iconNames } from '../components/Icon'

/*
 * Fundamentos / Icons
 * Réplica del fundamento "Icons" del archivo Figma "Ui Kit Web"
 * (node 9248:3833): librería de 170 iconos en tamaños 12–72,
 * normalizados a currentColor.
 */

const labelStyle =
  'font-family:var(--font-family-sans);font-size:var(--font-size-xs);color:var(--color-text-secondary);overflow-wrap:anywhere;text-align:center;'

const meta: Meta = {
  title: 'Fundamentos/Icons',
  component: Icon,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Iconografía del DS Andromeda (170 iconos generados desde Figma). Se usa con `<Icon name="..." :size="24" />`; el color se hereda de `color` vía currentColor. Tamaños de la librería: 12, 16, 20, 24, 32, 48 y 72.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: iconNames,
      description: 'Nombre del icono tal como aparece en Figma.',
    },
    size: {
      control: { type: 'number', min: 12, max: 72, step: 4 },
      description: 'Tamaño en px (la librería define 12–72).',
      table: { defaultValue: { summary: '24' } },
    },
    title: {
      control: 'text',
      description: 'Texto accesible; sin title el icono es decorativo.',
    },
  },
  args: {
    name: 'account-outline',
    size: 24,
  },
}

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: (args) => ({
    components: { Icon },
    setup: () => ({ args }),
    template: `<Icon v-bind="args" />`,
  }),
}

export const Galeria: Story = {
  name: 'Galería',
  render: () => ({
    components: { Icon },
    setup: () => ({ iconNames, labelStyle }),
    template: `
      <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(120px, 1fr));gap:24px;color:var(--color-text-primary);">
        <div
          v-for="name in iconNames"
          :key="name"
          style="display:flex;flex-direction:column;align-items:center;gap:8px;"
        >
          <Icon :name="name" :size="24" />
          <span :style="labelStyle">{{ name }}</span>
        </div>
      </div>
    `,
  }),
}

export const Tamanos: Story = {
  name: 'Tamaños',
  render: () => ({
    components: { Icon },
    setup: () => ({ sizes: [12, 16, 20, 24, 32, 48, 72], labelStyle }),
    template: `
      <div style="display:flex;align-items:flex-end;gap:32px;color:var(--color-text-primary);">
        <div
          v-for="size in sizes"
          :key="size"
          style="display:flex;flex-direction:column;align-items:center;gap:8px;"
        >
          <Icon name="account-outline" :size="size" />
          <span :style="labelStyle">{{ size }}</span>
        </div>
      </div>
    `,
  }),
}

export const Colores: Story = {
  render: () => ({
    components: { Icon },
    template: `
      <div style="display:flex;gap:24px;">
        <span style="color:var(--color-primary);"><Icon name="alert-outline" :size="32" /></span>
        <span style="color:var(--color-tertiary);"><Icon name="alert-outline" :size="32" /></span>
        <span style="color:var(--color-feedback-success);"><Icon name="alert-outline" :size="32" /></span>
        <span style="color:var(--color-text-secondary);"><Icon name="alert-outline" :size="32" /></span>
      </div>
    `,
  }),
}
