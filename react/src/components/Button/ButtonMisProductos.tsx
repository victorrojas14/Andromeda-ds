import * as React from 'react'
import './ButtonVariants.css'
import { Icon } from '../Icon'

export interface ButtonMisProductosProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Texto del botón (en Figma es fijo "Mis productos"). */
  children?: React.ReactNode
}

/**
 * ButtonMisProductos — botón pill del DS Andromeda (Figma:
 * btn/Mis-Productos): fondo secondary-dark con icono
 * view-cozy-rounded, texto Medium 16 blanco y chevron-down. Hover en
 * negro pleno; Disabled en gray-200 con texto gray-300 (Estados del
 * set; Pressed comparte el estilo Default).
 */
export function ButtonMisProductos({
  children = 'Mis productos',
  className,
  type = 'button',
  ...rest
}: ButtonMisProductosProps) {
  const classes = ['and-btn-productos', className].filter(Boolean).join(' ')

  return (
    <button type={type} className={classes} {...rest}>
      <span className="and-btn-productos__icon" aria-hidden="true">
        <Icon name="view-cozy-rounded" size={24} />
      </span>
      <span className="and-btn-productos__label">{children}</span>
      <span className="and-btn-productos__icon" aria-hidden="true">
        <Icon name="chevron-down" size={24} />
      </span>
    </button>
  )
}
