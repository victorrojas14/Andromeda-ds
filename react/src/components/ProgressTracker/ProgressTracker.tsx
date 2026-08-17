import {
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type PointerEvent,
} from 'react'
import './ProgressTracker.css'

export interface ProgressTrackerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Valor actual del progreso (controlado) */
  value?: number
  /** Valor inicial (no controlado) */
  defaultValue?: number
  /** Valor máximo (100 por defecto) */
  max?: number
  /** Se dispara al arrastrar el Puntero o usar las flechas del teclado */
  onChange?: (value: number) => void
  /** Permite arrastrar el Puntero con el mouse (true por defecto) */
  draggable?: boolean
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
  /** Deriva el texto del tooltip del valor actual (se actualiza al arrastrar) */
  formatTooltip?: (value: number, max: number) => string
  /** Deriva el valor izquierdo del valor actual (se actualiza al arrastrar) */
  formatLeft?: (value: number, max: number) => string
  /** Deriva el valor derecho del valor actual (se actualiza al arrastrar) */
  formatRight?: (value: number, max: number) => string
}

/**
 * ProgressTracker — barra de progreso del DS Andromeda (Figma: página
 * Progress Tracker — átomo Puntero, molécula BasicProgress y organismo
 * "Límite de crédito"). Full width: la pista, el puntero y el tooltip
 * se posicionan por porcentaje y se ajustan a cualquier resolución.
 * El Puntero se puede arrastrar con el mouse (o mover con las flechas
 * del teclado) y la información derivada con formatTooltip/formatLeft/
 * formatRight se actualiza en vivo según la posición. Todas las
 * partes (tooltip, texto superior y saldos) son ocultables.
 */
export function ProgressTracker({
  value,
  defaultValue = 25,
  max = 100,
  onChange,
  draggable = true,
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
  formatTooltip,
  formatLeft,
  formatRight,
  className = '',
  ...rest
}: ProgressTrackerProps) {
  const [inner, setInner] = useState(defaultValue)
  const [dragging, setDragging] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const current = value !== undefined ? value : inner
  const safeMax = max || 1
  const percent = Math.min(100, Math.max(0, (current / safeMax) * 100))

  const setValue = (next: number) => {
    const clamped = Math.min(safeMax, Math.max(0, next))
    if (value === undefined) setInner(clamped)
    onChange?.(clamped)
  }

  const valueFromPointer = (e: PointerEvent<HTMLDivElement>) => {
    const rect = trackRef.current?.getBoundingClientRect()
    if (!rect || rect.width === 0) return
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width))
    setValue(Math.round(ratio * safeMax))
  }

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (!draggable) return
    setDragging(true)
    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {
      /* eventos sintéticos sin pointerId válido */
    }
    valueFromPointer(e)
  }

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging) valueFromPointer(e)
  }

  const stopDrag = () => setDragging(false)

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!draggable) return
    const step = Math.max(1, Math.round(safeMax / 100))
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault()
      setValue(current + step)
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault()
      setValue(current - step)
    }
  }

  const tooltipText = formatTooltip ? formatTooltip(current, safeMax) : tooltip
  const leftText = formatLeft ? formatLeft(current, safeMax) : leftValue
  const rightText = formatRight ? formatRight(current, safeMax) : rightValue

  return (
    <div
      className={['and-progress', className].filter(Boolean).join(' ')}
      {...rest}
    >
      <div className="and-progress__top">
        {showTooltip && (
          <div className="and-progress__tooltip-wrap" aria-hidden="true">
            <div
              className="and-progress__tooltip"
              style={{ left: `${percent}%` }}
            >
              {tooltipText}
            </div>
          </div>
        )}
        {showLimitText && (
          <div className="and-progress__limit">{limitText}</div>
        )}
        <div
          ref={trackRef}
          className={[
            'and-progress__track-wrap',
            draggable && 'and-progress__track-wrap--drag',
            dragging && 'and-progress__track-wrap--dragging',
          ]
            .filter(Boolean)
            .join(' ')}
          role={draggable ? 'slider' : 'progressbar'}
          tabIndex={draggable ? 0 : undefined}
          aria-valuenow={current}
          aria-valuemin={0}
          aria-valuemax={max}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={stopDrag}
          onPointerCancel={stopDrag}
          onKeyDown={onKeyDown}
        >
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
              <span className="and-progress__saldo-valor">{leftText}</span>
            </div>
          )}
          {showRight && (
            <div className="and-progress__saldo and-progress__saldo--der">
              <span>{rightLabel}</span>
              <span className="and-progress__saldo-valor">{rightText}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
