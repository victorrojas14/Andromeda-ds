import * as React from 'react'
import './Alert.css'
import { Icon } from '../Icon'
import type { AndIconName } from '../Icon'

export type AlertVariant = 'success' | 'warning' | 'danger' | 'info'

const VARIANT_ICON: Record<AlertVariant, AndIconName> = {
  success: 'check-circle-outline',
  warning: 'alert',
  danger: 'close-outline',
  // En Figma el icono de Info es alert-outline rotado 180° (vía CSS).
  info: 'alert-outline',
}

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Estado semántico de la alerta (Figma: Estado). */
  variant?: AlertVariant
  /** Mensaje destacado en SemiBold (Figma: "Mensaje Alerta" / "Mostrar Mensaje Izq"). */
  message?: React.ReactNode
  /**
   * Icono izquierdo (Figma: "Mostrar Icono Izq"). Por defecto el icono
   * del variant; pasá `null` para ocultarlo.
   */
  icon?: React.ReactNode
  /** Acción a la derecha, ej. un Button outline (Figma: "Mostrar Boton Der"). */
  action?: React.ReactNode
  /** Muestra el botón de cerrar (Figma: "Mostrar Icon Der"). */
  closable?: boolean
  /** Callback al cerrar. */
  onClose?: () => void
  /** Texto de la alerta (Figma: "Texto Contenido"). */
  children?: React.ReactNode
}

/**
 * Alert — alerta en línea del DS Andromeda (Figma: component set
 * "Alerta"): fondo semántico light, textos e iconos en el tono dark,
 * mensaje destacado con divisor, acción opcional y botón de cerrar.
 */
export function Alert({
  variant = 'success',
  message,
  icon,
  action,
  closable = true,
  onClose,
  children,
  className,
  ...rest
}: AlertProps) {
  const [visible, setVisible] = React.useState(true)
  if (!visible) return null

  const resolvedIcon =
    icon === undefined ? <Icon name={VARIANT_ICON[variant]} size={24} /> : icon

  const close = () => {
    setVisible(false)
    onClose?.()
  }

  const classes = ['and-alert', `and-alert--${variant}`, className].filter(Boolean).join(' ')

  return (
    <div className={classes} role="alert" {...rest}>
      <div className="and-alert__lead">
        {resolvedIcon && (
          <span className="and-alert__icon" aria-hidden="true">
            {resolvedIcon}
          </span>
        )}
        {message && (
          <span className="and-alert__message">
            {message}
            <span className="and-alert__message-divider" aria-hidden="true" />
          </span>
        )}
        <span className="and-alert__content">{children}</span>
      </div>
      {(action || closable) && (
        <div className="and-alert__trail">
          {action}
          {closable && (
            <button type="button" className="and-alert__close" aria-label="Cerrar" onClick={close}>
              <Icon name="close" size={24} />
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export type AlertBlockVariant = 'success' | 'warning' | 'info'

const BLOCK_TITLE: Record<AlertBlockVariant, string> = {
  success: '¡Bien hecho!',
  warning: '¡Alerta!',
  info: '¡Info!',
}

export interface AlertBlockProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Estado semántico (Figma: Estado — sin Danger). */
  variant?: AlertBlockVariant
  /** Título en SemiBold h5; por defecto el del variant. */
  title?: React.ReactNode
  /** Cuerpo de la alerta. */
  children?: React.ReactNode
  /** Texto final; se separa del cuerpo con un divisor de 0.5px. */
  footer?: React.ReactNode
}

/**
 * AlertBlock — alerta en bloque del DS Andromeda (Figma: component set
 * "Alertas con accion"): título h5 SemiBold, cuerpo y texto final
 * separados por un divisor, sobre fondo semántico light.
 */
export function AlertBlock({
  variant = 'success',
  title,
  children,
  footer,
  className,
  ...rest
}: AlertBlockProps) {
  const classes = ['and-alert-block', `and-alert-block--${variant}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} role="alert" {...rest}>
      <p className="and-alert-block__title">{title ?? BLOCK_TITLE[variant]}</p>
      <div className="and-alert-block__body">
        <p>{children}</p>
        {footer && (
          <>
            <span className="and-alert-block__divider" aria-hidden="true" />
            <p>{footer}</p>
          </>
        )}
      </div>
    </div>
  )
}
