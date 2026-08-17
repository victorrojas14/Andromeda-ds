import type { CSSProperties, HTMLAttributes } from 'react'
import './Skeleton.css'

export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
  /** Ancho del bloque (número en px o cualquier valor CSS; default 100%) */
  width?: number | string
  /** Alto del bloque (número en px o cualquier valor CSS; Figma: 40) */
  height?: number | string
  /** Radio del bloque (Figma: 4) */
  radius?: number | string
  /** Placeholder circular (avatares) */
  circle?: boolean
  /** Shimmer entre las dos fases de Figma (Group 1 ↔ Group 2) */
  animated?: boolean
}

/**
 * Skeleton — placeholder de carga del DS Andromeda (Figma: página
 * Skeleton, set "Skeleton" 12739:2231). Bloque con degradado blanco →
 * gray-300 (radio 4) cuyo shimmer desliza el degradado entre las dos
 * variantes del set; mantiene la jerarquía visual y evita saltos de
 * layout mientras aparece el contenido real.
 */
export function Skeleton({
  width = '100%',
  height = 40,
  radius,
  circle = false,
  animated = true,
  className = '',
  style,
  ...rest
}: SkeletonProps) {
  const inline: CSSProperties = {
    width,
    height,
    ...(radius !== undefined && { borderRadius: radius }),
    ...style,
  }

  return (
    <span
      className={[
        'and-skeleton',
        circle && 'and-skeleton--circle',
        !animated && 'and-skeleton--static',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={inline}
      aria-hidden="true"
      {...rest}
    />
  )
}
