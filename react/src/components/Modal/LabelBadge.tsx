import type { HTMLAttributes } from 'react'
import './Modal.css'

export type LabelBadgeEstado = 'success' | 'warning' | 'info' | 'danger'

export interface LabelBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Estado del badge (Figma: Label Success/Warning/Info/Danger) */
  estado?: LabelBadgeEstado
  /** Texto del badge (Figma: "Texto Badge") */
  text?: string
}

export function LabelBadge({
  estado = 'success',
  text = 'EJEMPLO',
  className = '',
  ...rest
}: LabelBadgeProps) {
  return (
    <span
      className={[
        'and-label-badge',
        estado !== 'success' && `and-label-badge--${estado}`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {text}
    </span>
  )
}
