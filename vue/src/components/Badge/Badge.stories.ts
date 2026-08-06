import type { Meta, StoryObj } from '@storybook/vue3'
import { Badge, BadgeCounter } from './index'
import { Text } from '../Text'

/*
 * Data Display / Badge
 * Figma: página "Badges" (node 9278:1210), component set "Badge"
 * (Tamaño Badge h1..h6) y componente "Badge/Counter".
 */

const SIZES = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

const meta: Meta = {
  title: 'Data Display/Badge',
  component: Badge,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Badge del DS Andromeda (Figma: "Badge"). Fondo Info con texto blanco Poppins Medium escalado por tamaño (h1–h6) y contador opcional (`count`) que escala con el badge. `BadgeCounter` también se exporta standalone (Figma: "Badge/Counter").',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: SIZES,
      description: 'Escala del badge, pensada para acompañar headings (Figma: Tamaño).',
      table: { defaultValue: { summary: 'h1' } },
    },
    default: { control: 'text', description: 'Texto del badge (slot default).' },
    count: {
      control: 'number',
      description: 'Contador opcional (Figma: "Mostrar counter" + Number).',
    },
  },
  args: {
    size: 'h1',
    default: 'Texto',
    count: 1,
  },
}

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: (args) => ({
    components: { Badge },
    setup: () => ({ args }),
    template: `<Badge :size="args.size" :count="args.count">{{ args.default }}</Badge>`,
  }),
}

export const Tamanos: Story = {
  name: 'Tamaños',
  render: () => ({
    components: { Badge },
    setup: () => ({ SIZES }),
    template: `
      <div style="display:flex;flex-direction:column;align-items:center;gap:25px;">
        <Badge v-for="s in SIZES" :key="s" :size="s" :count="1">Texto</Badge>
      </div>
    `,
  }),
}

export const SinCounter: Story = {
  name: 'Sin counter',
  render: () => ({
    components: { Badge },
    setup: () => ({ SIZES }),
    template: `
      <div style="display:flex;flex-direction:column;align-items:center;gap:25px;">
        <Badge v-for="s in SIZES" :key="s" :size="s">Texto</Badge>
      </div>
    `,
  }),
}

export const Counter: Story = {
  name: 'Badge/Counter',
  render: () => ({
    components: { BadgeCounter },
    template: `
      <div style="display:flex;align-items:center;gap:16px;">
        <BadgeCounter :count="1" />
        <BadgeCounter :count="8" />
        <BadgeCounter :count="99" />
      </div>
    `,
  }),
}

export const ConHeadings: Story = {
  name: 'Con headings',
  render: () => ({
    components: { Badge, Text },
    setup: () => ({ SIZES }),
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;">
        <div v-for="s in SIZES" :key="s" style="display:flex;align-items:center;gap:16px;">
          <Text :variant="s" weight="medium" tag="div">Heading {{ s }}</Text>
          <Badge :size="s" :count="1">Nuevo</Badge>
        </div>
      </div>
    `,
  }),
}
