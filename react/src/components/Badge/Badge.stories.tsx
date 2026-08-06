import type { Meta, StoryObj } from '@storybook/react'
import { Badge, BadgeCounter } from './Badge'
import { Text } from '../Text'

/*
 * Data Display / Badge
 * Figma: página "Badges" (node 9278:1210), component set "Badge"
 * (Tamaño Badge h1..h6) y componente "Badge/Counter".
 */

const SIZES = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const

const meta = {
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
      options: SIZES as unknown as string[],
      description: 'Escala del badge, pensada para acompañar headings (Figma: Tamaño).',
      table: { defaultValue: { summary: 'h1' } },
    },
    children: { control: 'text', description: 'Texto del badge (Figma: "Texto Badge").' },
    count: {
      control: 'number',
      description: 'Contador opcional (Figma: "Mostrar counter" + Number).',
    },
  },
  args: {
    size: 'h1',
    children: 'Texto',
    count: 1,
  },
} satisfies Meta<typeof Badge>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Tamanos: Story = {
  name: 'Tamaños',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 25 }}>
      {SIZES.map((size) => (
        <Badge key={size} size={size} count={1}>
          Texto
        </Badge>
      ))}
    </div>
  ),
}

export const SinCounter: Story = {
  name: 'Sin counter',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 25 }}>
      {SIZES.map((size) => (
        <Badge key={size} size={size}>
          Texto
        </Badge>
      ))}
    </div>
  ),
}

export const Counter: Story = {
  name: 'Badge/Counter',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <BadgeCounter count={1} />
      <BadgeCounter count={8} />
      <BadgeCounter count={99} />
    </div>
  ),
}

export const ConHeadings: Story = {
  name: 'Con headings',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {SIZES.map((size) => (
        <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Text variant={size} weight="medium" as="div">
            Heading {size}
          </Text>
          <Badge size={size} count={1}>
            Nuevo
          </Badge>
        </div>
      ))}
    </div>
  ),
}
