import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from './Avatar'

/*
 * Data Display / Avatar
 * Figma: página "Avatar" (node 9274:15310), component set "Avatar"
 * (Estado Default/Iniciales/Foto × Size 40/60/100/200 × Color
 * Rojo/Blanco/Imagen).
 */

// Foto de muestra embebida (data URI) para no depender de la red.
const FOTO =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="%23eab595"/><stop offset="1" stop-color="%23c68091"/></linearGradient></defs><rect width="200" height="200" fill="url(%23g)"/><circle cx="100" cy="80" r="36" fill="%236f4a3d"/><ellipse cx="100" cy="170" rx="62" ry="42" fill="%230f89d3"/></svg>',
  )

const SIZES = [200, 100, 60, 40] as const

const meta = {
  title: 'Data Display/Avatar',
  component: Avatar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Avatar circular del DS Andromeda (Figma: "Avatar"). El estado se deriva de las props: `src` muestra la foto, `initials` las iniciales, y sin ambas el placeholder de agregar foto. Tamaños 40/60/100/200 y colores rojo/blanco.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'inline-radio',
      options: [40, 60, 100, 200],
      description: 'Tamaño en px (Figma: Size).',
      table: { defaultValue: { summary: '200' } },
    },
    color: {
      control: 'inline-radio',
      options: ['rojo', 'blanco'],
      description: 'Esquema de color (Figma: Color).',
      table: { defaultValue: { summary: 'rojo' } },
    },
    initials: { control: 'text', description: 'Iniciales (Figma: Estado Iniciales).' },
    src: { control: 'text', description: 'URL de la foto (Figma: Estado Foto).' },
    alt: { control: 'text', description: 'Texto accesible (nombre de la persona).' },
  },
  args: {
    size: 200,
    color: 'rojo',
    initials: 'CM',
    alt: 'Carlos Martínez',
  },
} satisfies Meta<typeof Avatar>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Iniciales: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
        {SIZES.map((size) => (
          <Avatar key={size} size={size} color="rojo" initials="CM" alt="Carlos Martínez" />
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 40,
          padding: 24,
          background: 'var(--color-background)',
          borderRadius: 'var(--radius-sm)',
        }}
      >
        {SIZES.map((size) => (
          <Avatar key={size} size={size} color="blanco" initials="CM" alt="Carlos Martínez" />
        ))}
      </div>
    </div>
  ),
}

export const Placeholder: Story = {
  name: 'Default (agregar foto)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
        {SIZES.map((size) => (
          <Avatar key={size} size={size} color="rojo" alt="Agregar foto de perfil" />
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 40,
          padding: 24,
          background: 'var(--color-background)',
          borderRadius: 'var(--radius-sm)',
        }}
      >
        {SIZES.map((size) => (
          <Avatar key={size} size={size} color="blanco" alt="Agregar foto de perfil" />
        ))}
      </div>
    </div>
  ),
}

export const Foto: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
      {SIZES.map((size) => (
        <Avatar key={size} size={size} src={FOTO} alt="Carlos Martínez" />
      ))}
    </div>
  ),
}
