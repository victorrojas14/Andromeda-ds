import type { HTMLAttributes } from 'react'
import './ProgressTracker.css'

export interface ProgressTrackerProps extends HTMLAttributes<HTMLDivElement> {
  /** Valor actual del progreso */
  value?: number
  /** Valor máximo (100 por defecto) */
  max?: number
  /** Estado Active del Puntero (halo tertiary al 30%) */
  active?: boolean
  /** Texto del tooltip superior (Figma: "Tooltip") */
  tooltip?: string
  /** Muestra el tooltip (Figma: "Mostrar tooltip") */
  showTooltip?: boolean
  /** Texto superior (Figma: "Limite credito") */
  limitText?: string
  /** Muestra el texto superior (Figma: "Mostrar texto top") */
  showLimitText?: boolean
  /** Etiqueta del saldo izquierdo */
  leftLabel?: string
  /** Valor del saldo izquierdo (Figma: "Saldo") */
  leftValue?: string
  /** Muestra el bloque izquierdo (Figma: "Mostrar texto Izq") */
  showLeft?: boolean
  /** Etiqueta del saldo derecho */
  rightLabel?: string
  /** Valor del saldo derecho (Figma: "Disponible") */
  rightValue?: string
  /** Muestra el bloque derecho (Figma: "Mostrar texto der") */
  showRight?: boolean
}

/**
 * ProgressTracker — barra de progreso del DS Andromeda (Figma: página
 * Progress Tracker — átomo Puntero, molécula BasicProgress y organismo
 * "Límite de crédito"). Full width: la pista, el puntero y el tooltip
 * se posicionan por porcentaje y se ajustan a cualquier resolución.
 * Todas las partes (tooltip, texto superior y saldos) son ocultables.
 */
export function ProgressTracker({
  value = 25,
  max = 100,
  active = false,
  tooltip = '$50,000.00',
  showTooltip = true,
  limitText = 'Límite de crédito: $200,000.00',
  showLimitText = true,
  leftLabel = 'Saldo al día',
  leftValue = '$145,000.00',
  showLeft = true,
  rightLabel = 'Disponible',
  rightValue = '$55,000.00',
  showRight = true,
  className = '',
  ...rest
}: ProgressTrackerProps) {
  const percent = Math.min(100, Math.max(0, (value / (max || 1)) * 100))

  return (
    <div
      className={['and-progress', className].filter(Boolean).join(' ')}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      {...rest}
    >
      <div className="and-progress__top">
        {showTooltip && (
          <div className="and-progress__tooltip-wrap" aria-hidden="true">
            <div
              className="and-progress__tooltip"
              style={{ left: `${percent}%` }}
            >
              {tooltip}
            </div>
          </div>
        )}
        {showLimitText && (
          <div className="and-progress__limit">{limitText}</div>
        )}
        <div className="and-progress__track-wrap">
          <div className="and-progress__track" />
          <div
            className="and-progress__fill"
            style={{ width: `${percent}%` }}
          />
          <div
            className={[
              'and-progress__pointer',
              active && 'and-progress__pointer--active',
            ]
              .filter(Boolean)
              .join(' ')}
            style={{ left: `${percent}%` }}
          />
        </div>
      </div>
      {(showLeft || showRight) && (
        <div className="and-progress__saldos">
          {showLeft && (
            <div className="and-progress__saldo">
              <span>{leftLabel}</span>
              <span className="and-progress__saldo-valor">{leftValue}</span>
            </div>
          )}
          {showRight && (
            <div className="and-progress__saldo and-progress__saldo--der">
              <span>{rightLabel}</span>
              <span className="and-progress__saldo-valor">{rightValue}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
