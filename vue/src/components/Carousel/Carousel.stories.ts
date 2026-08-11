import type { Meta, StoryObj } from '@storybook/vue3'
import { Carousel } from './index'

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

const meta: Meta = {
  title: 'Data Display/Carousel',
  component: Carousel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Carrusel de imágenes del DS Andromeda (Figma: "Carousel"). Un solo componente: alto fijo de 400px y ancho fluido que se adapta al contenedor (el comportamiento responsive de la página "Carousel 2"). Flechas en primario con vuelta en los extremos y dots inferiores (activo/hover en primario). Soporta v-model:index.',
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
    defaultIndex: 0,
  },
}

export default meta
type Story = StoryObj

export const Playground: Story = {
  render: (args) => ({
    components: { Carousel },
    setup: () => ({ args, IMAGENES }),
    template: `
      <div style="max-width:800px;">
        <Carousel :key="args.defaultIndex" :images="IMAGENES" :default-index="args.defaultIndex" />
      </div>
    `,
  }),
}

export const Responsive: Story = {
  name: 'Responsive (anchos fluidos)',
  render: () => ({
    components: { Carousel },
    setup: () => ({ IMAGENES, widths: [288, 670, 800] }),
    template: `
      <div style="display:flex;flex-direction:column;gap:40px;">
        <div v-for="w in widths" :key="w" :style="{ width: w + 'px' }">
          <Carousel :images="IMAGENES" />
        </div>
      </div>
    `,
  }),
}
