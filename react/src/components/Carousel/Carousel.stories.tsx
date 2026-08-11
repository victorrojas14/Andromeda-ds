import type { Meta, StoryObj } from '@storybook/react'
import { Carousel } from './Carousel'

/*
 * Data Display / Carousel
 * Figma: páginas "Carousel 1" (node 9342:12321, component set) y
 * "Carousel 2" (node 9342:12377, comportamiento responsive con anchos
 * fluidos 288/670/800).
 */

// Slides de muestra embebidos (data URI) para no depender de la red.
function slide(color: string, label: string): { src: string; alt: string } {
  return {
    src:
      'data:image/svg+xml;utf8,' +
      encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400"><rect width="800" height="400" fill="${color}"/><text x="400" y="215" text-anchor="middle" font-family="Poppins, sans-serif" font-size="48" fill="white">${label}</text></svg>`,
      ),
    alt: label,
  }
}

const IMAGENES = [
  slide('%23122530', 'Imagen 1'),
  slide('%230f89d3', 'Imagen 2'),
  slide('%23565a5c', 'Imagen 3'),
]

const meta = {
  title: 'Data Display/Carousel',
  component: Carousel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Carrusel de imágenes del DS Andromeda (Figma: "Carousel"). Un solo componente: alto fijo de 400px y ancho fluido que se adapta al contenedor (el comportamiento responsive de la página "Carousel 2"). Flechas en primario con vuelta en los extremos y dots inferiores (activo/hover en primario).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    defaultIndex: {
      control: { type: 'number', min: 0, max: 2, step: 1 },
      description: 'Slide inicial (Figma: Number Image 1/2/3).',
      table: { defaultValue: { summary: '0' } },
    },
  },
  args: {
    images: IMAGENES,
    defaultIndex: 0,
  },
} satisfies Meta<typeof Carousel>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <div style={{ maxWidth: 800 }}>
      <Carousel {...args} key={args.defaultIndex} />
    </div>
  ),
}

export const Responsive: Story = {
  name: 'Responsive (anchos fluidos)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      {[288, 670, 800].map((width) => (
        <div key={width} style={{ width }}>
          <Carousel images={IMAGENES} />
        </div>
      ))}
    </div>
  ),
}
