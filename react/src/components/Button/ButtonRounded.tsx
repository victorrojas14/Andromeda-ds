import * as React from 'react'
import './ButtonVariants.css'
import { Icon } from '../Icon'

export interface ButtonRoundedProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icono superior (Figma: "Mostrar/Cambiar Icono Top"); null lo oculta. */
  topIcon?: React.ReactNode
  /** Icono a la izquierda del texto (Figma: "Mostrar/Cambiar Icono Izq"). */
  leftIcon?: React.ReactNode
  /** Icono a la derecha del texto (Figma: "Mostrar/Cambiar Icono Der"). */
  rightIcon?: React.ReactNode
  /** Texto del botón (Figma: "Texto"/"Mostrar Texto"); sin él queda la variante de solo icono. */
  children?: React.ReactNode
}

/**
 * ButtonRounded — botón redondeado grande del DS Andromeda (Figma:
 * btn/Rounded-LG): borde 2px gray-300 con radio 40, icono superior y
 * fila icono/texto/icono. En hover el borde pasa a tertiary con sombra
 * autolayout-md y el texto a secondary-dark. Sin texto ni iconos
 * laterales queda la variante cuadrada de solo icono (72×72).
 */
export function ButtonRounded({
  topIcon = <Icon name="android" size={24} />,
  leftIcon,
  rightIcon,
  children,
  className,
  type = 'button',
  ...rest
}: ButtonRoundedProps) {
  const classes = ['and-btn-rounded', className].filter(Boolean).join(' ')
  const hasRow = Boolean(leftIcon || children || rightIcon)

  return (
    <button type={type} className={classes} {...rest}>
      {topIcon && (
        <span className="and-btn-rounded__icon" aria-hidden={children ? 'true' : undefined}>
          {topIcon}
        </span>
      )}
      {hasRow && (
        <span className="and-btn-rounded__row">
          {leftIcon && (
            <span className="and-btn-rounded__icon" aria-hidden="true">
              {leftIcon}
            </span>
          )}
          {children && <span className="and-btn-rounded__label">{children}</span>}
          {rightIcon && (
            <span className="and-btn-rounded__icon" aria-hidden="true">
              {rightIcon}
            </span>
          )}
        </span>
      )}
    </button>
  )
}

export interface ButtonRoundedCardProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'title'> {
  /** Título (Figma: "Texto Titulo"/"Mostrar Titulo"). */
  title?: React.ReactNode
  /** Contenido (Figma: "Texto Contenido"/"Mostrar Contenido"). */
  children?: React.ReactNode
}

/**
 * ButtonRoundedCard — botón tipo card del DS Andromeda (Figma:
 * btn/Rounded-MD): borde 2px gray-300 con radio lg, título h5 en body
 * y contenido 14 en secondary-light. En hover el borde pasa a tertiary
 * con sombra autolayout-md.
 */
export function ButtonRoundedCard({
  title,
  children,
  className,
  type = 'button',
  ...rest
}: ButtonRoundedCardProps) {
  const classes = ['and-btn-rounded-card', className].filter(Boolean).join(' ')

  return (
    <button type={type} className={classes} {...rest}>
      {title && <span className="and-btn-rounded-card__title">{title}</span>}
      {children && <span className="and-btn-rounded-card__content">{children}</span>}
    </button>
  )
}
