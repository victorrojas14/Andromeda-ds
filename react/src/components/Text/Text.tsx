import * as React from 'react'
import './Text.css'

export type TextVariant =
  | 'display-1'
  | 'display-2'
  | 'display-3'
  | 'display-4'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'parrafo'
  | 'parrafo-sm'
  | 'parrafo-xs'
  | 'small-1'
  | 'small-2'

export type TextWeight = 'regular' | 'medium' | 'semibold'

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  /** Estilo de la escala tipográfica (Figma: Typography/Web). */
  variant?: TextVariant
  /**
   * Peso. En los estilos Display, "regular" renderiza ExtraLight (275)
   * y "medium" renderiza Regular (400), fiel a Figma.
   */
  weight?: TextWeight
  /** Elemento HTML a renderizar; por defecto según la variante. */
  as?: React.ElementType
  children?: React.ReactNode
}

const DEFAULT_TAG: Record<TextVariant, React.ElementType> = {
  'display-1': 'h1',
  'display-2': 'h1',
  'display-3': 'h1',
  'display-4': 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  parrafo: 'p',
  'parrafo-sm': 'p',
  'parrafo-xs': 'p',
  'small-1': 'small',
  'small-2': 'small',
}

/**
 * Text — escala tipográfica del DS Andromeda (fundamento "Tipografía"
 * de Figma): Poppins con estilos Display 1–4, Heading h1–h6, Body
 * (Parrafo, Parrafo-SM, Parrafo-XS) y Small 1–2, en pesos regular,
 * medium y semibold.
 */
export function Text({
  variant = 'parrafo',
  weight = 'regular',
  as,
  className,
  children,
  ...rest
}: TextProps) {
  const Tag = as ?? DEFAULT_TAG[variant]
  const classes = ['and-text', `and-text--${variant}`, `and-text--${weight}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  )
}
