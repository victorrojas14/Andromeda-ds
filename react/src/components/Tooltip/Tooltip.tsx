import { useState, type HTMLAttributes, type ReactNode } from 'react'
import './Tooltip.css'

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'
export type TooltipTheme = 'light' | 'dark'

export interface TooltipProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, 'content'> {
  /** Texto del globo (Figma: "Ejemplo") */
  content: ReactNode
  /** Lado donde aparece el tooltip respecto al elemento envuelto */
  position?: TooltipPosition
  /** Tema (Figma: Theme=Light|Dark) */
  theme?: TooltipTheme
  /** Visibilidad controlada; sin definir se muestra con hover/focus */
  open?: boolean
  /** Elemento objetivo (cualquier componente de la librería) */
  children: ReactNode
}

export function Tooltip({
  content,
  position = 'top',
  theme = 'light',
  open,
  children,
  className = '',
  ...rest
}: TooltipProps) {
  const [hovered, setHovered] = useState(false)
  const visible = open !== undefined ? open : hovered

  return (
    <span
      className={['and-tooltip-wrap', className].filter(Boolean).join(' ')}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      {...rest}
    >
      {children}
      {visible && (
        <span
          className={[
            'and-tooltip',
            `and-tooltip--${position}`,
            theme === 'dark' && 'and-tooltip--dark',
          ]
            .filter(Boolean)
            .join(' ')}
          role="tooltip"
        >
          <span className="and-tooltip__bubble">{content}</span>
          <span className="and-tooltip__arrow" aria-hidden="true" />
        </span>
      )}
    </span>
  )
}
