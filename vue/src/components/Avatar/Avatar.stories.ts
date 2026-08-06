import type { Meta, StoryObj } from '@storybook/vue3'
import { Avatar } from './index'

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

const SIZES = [200, 100, 60, 40]

const meta: Meta = {
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
}

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: (args) => ({
    components: { Avatar },
    setup: () => ({ args }),
    template: `<Avatar v-bind="args" />`,
  }),
}

export const Iniciales: Story = {
  render: () => ({
    components: { Avatar },
    setup: () => ({ SIZES }),
    template: `
      <div style="display:flex;flex-direction:column;gap:40px;">
        <div style="display:flex;align-items:center;gap:40px;">
          <Avatar v-for="s in SIZES" :key="s" :size="s" color="rojo" initials="CM" alt="Carlos Martínez" />
        </div>
        <div style="display:flex;align-items:center;gap:40px;padding:24px;background:var(--color-background);border-radius:var(--radius-sm);">
          <Avatar v-for="s in SIZES" :key="s" :size="s" color="blanco" initials="CM" alt="Carlos Martínez" />
        </div>
      </div>
    `,
  }),
}

export const Placeholder: Story = {
  name: 'Default (agregar foto)',
  render: () => ({
    components: { Avatar },
    setup: () => ({ SIZES }),
    template: `
      <div style="display:flex;flex-direction:column;gap:40px;">
        <div style="display:flex;align-items:center;gap:40px;">
          <Avatar v-for="s in SIZES" :key="s" :size="s" color="rojo" alt="Agregar foto de perfil" />
        </div>
        <div style="display:flex;align-items:center;gap:40px;padding:24px;background:var(--color-background);border-radius:var(--radius-sm);">
          <Avatar v-for="s in SIZES" :key="s" :size="s" color="blanco" alt="Agregar foto de perfil" />
        </div>
      </div>
    `,
  }),
}

export const Foto: Story = {
  render: () => ({
    components: { Avatar },
    setup: () => ({ SIZES, FOTO }),
    template: `
      <div style="display:flex;align-items:center;gap:40px;">
        <Avatar v-for="s in SIZES" :key="s" :size="s" :src="FOTO" alt="Carlos Martínez" />
      </div>
    `,
  }),
}
