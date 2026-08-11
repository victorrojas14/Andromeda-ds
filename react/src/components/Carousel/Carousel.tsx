import * as React from 'react'
import './Carousel.css'
import { Icon } from '../Icon'

export interface CarouselImage {
  /** URL de la imagen del slide. */
  src: string
  /** Texto alternativo del slide. */
  alt?: string
}

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Imágenes del carousel (Figma: variantes Number=Image 1/2/3). */
  images: CarouselImage[]
  /** Índice activo (controlado). */
  index?: number
  /** Índice inicial (no controlado). */
  defaultIndex?: number
  /** Callback al cambiar de slide (flechas o dots). */
  onIndexChange?: (index: number) => void
}

/**
 * Carousel — carrusel de imágenes del DS Andromeda (Figma: component
 * set "Carousel"): slide de 400px de alto y ancho fluido, flechas en
 * primario y dots inferiores (Figma: "Ellipse 4"; activo/hover en
 * primario, resto en secondary). Las flechas dan la vuelta al llegar
 * a los extremos.
 */
export function Carousel({
  images,
  index,
  defaultIndex = 0,
  onIndexChange,
  className,
  ...rest
}: CarouselProps) {
  const [internalIndex, setInternalIndex] = React.useState(defaultIndex)
  const isControlled = index !== undefined
  const current = isControlled ? index : internalIndex

  const goTo = (next: number) => {
    const wrapped = (next + images.length) % images.length
    if (!isControlled) setInternalIndex(wrapped)
    onIndexChange?.(wrapped)
  }

  const classes = ['and-carousel', className].filter(Boolean).join(' ')

  return (
    <div className={classes} role="region" aria-roledescription="carousel" {...rest}>
      <div
        className="and-carousel__track"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((image, i) => (
          <img
            key={i}
            className="and-carousel__slide"
            src={image.src}
            alt={image.alt ?? ''}
            aria-hidden={i !== current || undefined}
          />
        ))}
      </div>
      <button
        type="button"
        className="and-carousel__arrow and-carousel__arrow--prev"
        aria-label="Imagen anterior"
        onClick={() => goTo(current - 1)}
      >
        <Icon name="arrow-left" size={24} />
      </button>
      <button
        type="button"
        className="and-carousel__arrow and-carousel__arrow--next"
        aria-label="Imagen siguiente"
        onClick={() => goTo(current + 1)}
      >
        <Icon name="arrow-right" size={24} />
      </button>
      <div className="and-carousel__dots">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            className={[
              'and-carousel__dot',
              i === current && 'and-carousel__dot--active',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-label={`Ir a la imagen ${i + 1}`}
            aria-current={i === current || undefined}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  )
}
