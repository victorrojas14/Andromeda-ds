import * as React from 'react'
import './Button.css'

export type ButtonVariant = 'primary' | 'secondary'
export type ButtonAppearance = 'solid' | 'outline' | 'ghost'
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Jerarquía visual del botón. */
  variant?: ButtonVariant
  /** Estilo de superficie: relleno, borde o transparente. */
  appearance?: ButtonAppearance
  /** Tamaño del botón. */
  size?: ButtonSize
  /** Muestra un spinner y bloquea el botón. */
  loading?: boolean
  /** Icono a la izquierda del label. */
  leftIcon?: React.ReactNode
  /** Icono a la derecha del label. */
  rightIcon?: React.ReactNode
  /** Contenido del botón (label). */
  children?: React.ReactNode
}

/**
 * Button — componente unificado del DS Andromeda.
 *
 * Reemplaza los ~20 component sets fragmentados de Figma
 * (`btn/primary-SM`, `btn/ghost-primary-MD`, etc.) por una única
 * API con properties `variant`, `appearance` y `size`.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = 'primary',
      appearance = 'solid',
      size = 'md',
      loading = false,
      disabled,
      leftIcon,
      rightIcon,
      children,
      className,
      type = 'button',
      ...rest
    },
    ref,
  ) {
    const classes = [
      'and-btn',
      `and-btn--${appearance}-${variant}`,
      `and-btn--size-${size}`,
      loading && 'and-btn--loading',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    const isDisabled = disabled || loading

    return (
      <button
        ref={ref}
        type={type}
        className={classes}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        {...rest}
      >
        {loading ? (
          <span className="and-btn__spinner" aria-hidden="true" />
        ) : (
          leftIcon && (
            <span className="and-btn__icon and-btn__icon--left" aria-hidden="true">
              {leftIcon}
            </span>
          )
        )}
        {children && <span className="and-btn__label">{children}</span>}
        {rightIcon && !loading && (
          <span className="and-btn__icon and-btn__icon--right" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    )
  },
)

Button.displayName = 'Button'
