import figma from '@figma/code-connect'
import { Carousel } from './Carousel'

/*
 * Code Connect — Carousel (React)
 *
 * Mapea los component sets publicados de la página "Carousel" del
 * archivo Figma "Ui Kit Web":
 *   - Carousel (505:1000): Number Image 1/2/3 -> defaultIndex
 *   - Ellipse 4 (175:4739): los dots del carousel; son parte interna
 *     del componente, así que el snippet muestra el Carousel completo.
 */

figma.connect(
  Carousel,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=505-1000',
  {
    props: {
      defaultIndex: figma.enum('Number', {
        'Image 1': 0,
        'Image 2': 1,
        'Image 3': 2,
      }),
    },
    example: ({ defaultIndex }) => (
      <Carousel
        defaultIndex={defaultIndex}
        images={[
          { src: '/imagen-1.jpg', alt: 'Imagen 1' },
          { src: '/imagen-2.jpg', alt: 'Imagen 2' },
          { src: '/imagen-3.jpg', alt: 'Imagen 3' },
        ]}
      />
    ),
  },
)

// Los dots (Ellipse 4) se renderizan internamente por el Carousel.
figma.connect(
  Carousel,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=175-4739',
  {
    example: () => (
      <Carousel
        images={[
          { src: '/imagen-1.jpg', alt: 'Imagen 1' },
          { src: '/imagen-2.jpg', alt: 'Imagen 2' },
          { src: '/imagen-3.jpg', alt: 'Imagen 3' },
        ]}
      />
    ),
  },
)
