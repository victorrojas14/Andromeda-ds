import * as React from 'react'
import './ButtonVariants.css'
import { Icon } from '../Icon'

export type ButtonTradeVariant = 'buy' | 'sell'

export interface ButtonTradeProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Operación (Figma: btn-buy / btn-sell). */
  variant?: ButtonTradeVariant
  /** Estado seleccionado (Figma: "Selected - hover", misma sombra que el hover). */
  selected?: boolean
  /** Texto del botón; por defecto "Compra"/"Venta" según el variant. */
  children?: React.ReactNode
}

/**
 * ButtonTrade — botones de compra/venta del DS Andromeda (Figma:
 * btn-buy y btn-sell): fondo success (#28A745) o danger-dark
 * (#BD0026) con icono arrow_buy/arrow_sell y texto Medium 16 blanco.
 * En hover o `selected` proyecta la sombra del mismo color.
 */
export function ButtonTrade({
  variant = 'buy',
  selected = false,
  children,
  className,
  type = 'button',
  ...rest
}: ButtonTradeProps) {
  const classes = [
    'and-btn-trade',
    `and-btn-trade--${variant}`,
    selected && 'and-btn-trade--selected',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={classes} aria-pressed={selected || undefined} {...rest}>
      <span className="and-btn-trade__icon" aria-hidden="true">
        <Icon name={variant === 'buy' ? 'arrow_buy' : 'arrow_sell'} size={24} />
      </span>
      <span className="and-btn-trade__label">
        {children ?? (variant === 'buy' ? 'Compra' : 'Venta')}
      </span>
    </button>
  )
}
