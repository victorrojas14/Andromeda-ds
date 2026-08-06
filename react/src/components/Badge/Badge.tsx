import * as React from 'react'
import './Badge.css'

export type BadgeSize = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export interface BadgeCounterProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Número a mostrar (Figma: "Number"). */
  count?: React.ReactNode
}

/**
 * BadgeCounter — contador del DS Andromeda (Figma: "Badge/Counter"):
 * caja de 20x20 con fondo Secondary, número blanco SemiBold. Dentro de
 * un Badge escala automáticamente según el tamaño del Badge.
 */
export function BadgeCounter({ count = 1, className, ...rest }: BadgeCounterProps) {
  const classes = ['and-badge-counter', className].filter(Boolean).join(' ')
  return (
    <span className={classes} {...rest}>
      {count}
    </span>
  )
}

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Escala del badge, pensada para acompañar headings (Figma: Tamaño Badge h1..h6). */
  size?: BadgeSize
  /**
   * Contador a la derecha (Figma: "Mostrar counter" + Number).
   * Sin valor no se muestra.
   */
  count?: React.ReactNode
  /** Texto del badge (Figma: "Texto Badge"). */
  children?: React.ReactNode
}

/**
 * Badge — badge del DS Andromeda (Figma: component set "Badge"):
 * fondo Info, texto blanco Poppins Medium escalado por tamaño (h1–h6)
 * y contador opcional (Badge/Counter) que escala con el badge.
 */
export function Badge({ size = 'h1', count, children, className, ...rest }: BadgeProps) {
  const classes = ['and-badge', `and-badge--${size}`, className].filter(Boolean).join(' ')
  return (
    <span className={classes} {...rest}>
      {children}
      {count !== undefined && count !== null && <BadgeCounter count={count} />}
    </span>
  )
}
