import type { HTMLAttributes } from 'react'
import './Status.css'

export type StatusEstado =
  | 'verde'
  | 'gris'
  | 'azul'
  | 'amarillo'
  | 'rojo'
  | 'morado'
  | 'naranja'
  | 'magenta'

export interface StatusProps extends HTMLAttributes<HTMLSpanElement> {
  /** Estado/color (Figma: Estado de Item_Estatus_v1 / Property 1 de v2) */
  estado?: StatusEstado
  /** Texto del estatus (Figma: "Texto") */
  text?: string
  /** v1: punto + texto; v2 (pill): con fondo tenue y radio 50 */
  variant?: 'v1' | 'v2'
}

export function Status({
  estado = 'verde',
  text = 'Texto',
  variant = 'v1',
  className = '',
  ...rest
}: StatusProps) {
  return (
    <span
      className={[
        'and-status',
        estado !== 'verde' && `and-status--${estado}`,
        variant === 'v2' && 'and-status--pill',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      <span className="and-status__dot" aria-hidden="true" />
      {text}
    </span>
  )
}
