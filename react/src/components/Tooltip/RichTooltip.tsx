import { useState, type HTMLAttributes, type ReactNode } from 'react'
import { Button } from '../Button'
import type { TooltipPosition, TooltipTheme } from './Tooltip'
import './Tooltip.css'

export interface RichTooltipProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, 'content' | 'title'> {
  /** Título del globo (Figma: "Rich tooltip") */
  title?: string
  /** Texto del globo */
  content: ReactNode
  /** Lado donde aparece el tooltip respecto al elemento envuelto */
  position?: TooltipPosition
  /** Tema (Figma: Tipo=Light/Dark) */
  theme?: TooltipTheme
  /** Muestra la fila de botones (Figma: "Show Buttons") */
  showButtons?: boolean
  /** Muestra el botón derecho (Figma: "Show Button Right") */
  showButtonRight?: boolean
  leftButtonLabel?: string
  rightButtonLabel?: string
  onLeftButton?: () => void
  onRightButton?: () => void
  /** Visibilidad controlada; sin definir se muestra con hover/focus */
  open?: boolean
  /** Elemento objetivo (cualquier componente de la librería) */
  children: ReactNode
}

export function RichTooltip({
  title = 'Rich tooltip',
  content,
  position = 'top',
  theme = 'light',
  showButtons = true,
  showButtonRight = true,
  leftButtonLabel = 'Button',
  rightButtonLabel = 'Button',
  onLeftButton,
  onRightButton,
  open,
  children,
  className = '',
  ...rest
}: RichTooltipProps) {
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
            'and-tooltip--rich',
            `and-tooltip--${position}`,
            theme === 'dark' && 'and-tooltip--dark',
          ]
            .filter(Boolean)
            .join(' ')}
          role="tooltip"
        >
          <span className="and-tooltip__bubble">
            {title && <p className="and-tooltip__title">{title}</p>}
            <p className="and-tooltip__text">{content}</p>
            {showButtons && (
              <span className="and-tooltip__buttons">
                <Button
                  variant="secondary"
                  appearance="ghost"
                  size="sm"
                  onClick={onLeftButton}
                >
                  {leftButtonLabel}
                </Button>
                {showButtonRight && (
                  <Button
                    variant="secondary"
                    appearance="ghost"
                    size="sm"
                    onClick={onRightButton}
                  >
                    {rightButtonLabel}
                  </Button>
                )}
              </span>
            )}
          </span>
          <span className="and-tooltip__arrow" aria-hidden="true" />
        </span>
      )}
    </span>
  )
}
