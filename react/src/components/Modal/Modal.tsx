import type { HTMLAttributes, ReactNode } from 'react'
import { Blanket } from '../Blanket'
import { Button } from '../Button'
import { Icon, type AndIconName } from '../Icon'
import { LabelBadge, type LabelBadgeEstado } from './LabelBadge'
import './Modal.css'

export type ModalSize = 'sm' | 'md' | 'lg'

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  /** Visibilidad del modal */
  open?: boolean
  onClose?: () => void
  /** Tamaño (Figma: Tamano=Modal-SM 350 | Modal-MD 576 | Modal-LG 992) */
  size?: ModalSize
  /** Título (Figma: "Texto Titulo") */
  title?: string
  /** Oculta el título */
  showTitle?: boolean
  /** Cuerpo del modal (texto o nodos) */
  children?: ReactNode
  /** Oculta el cuerpo */
  showText?: boolean
  /** Muestra el Label Badge (Figma: "Mostrar Aviso") */
  showBadge?: boolean
  /** Estado del badge (los 4 de Figma) */
  badgeEstado?: LabelBadgeEstado
  badgeText?: string
  /** Muestra el icono superior (Figma: "Mostrar Icono Top") */
  showIcon?: boolean
  /** Icono de la librería (Figma: "Cambiar Icono Top") */
  icon?: AndIconName
  /** Default: icono de 72px; circle: aro de 100px (Icon=CIrcle illustration) */
  iconVariant?: 'default' | 'circle'
  /** Botón izquierdo ghost (Figma: "Mostrar Boton Izq") */
  showLeftButton?: boolean
  leftButtonLabel?: string
  onLeftButton?: () => void
  /** Botón derecho primary (Figma: "Mostrar Boton Der") */
  showRightButton?: boolean
  rightButtonLabel?: string
  onRightButton?: () => void
  /** Monta el modal sobre el Blanket (false = card inline) */
  blanket?: boolean
}

export function Modal({
  open = true,
  onClose,
  size = 'md',
  title = 'Título Modal',
  showTitle = true,
  children,
  showText = true,
  showBadge = true,
  badgeEstado = 'warning',
  badgeText = 'EJEMPLO',
  showIcon = true,
  icon = 'baseline-check-circle',
  iconVariant = 'default',
  showLeftButton = true,
  leftButtonLabel = 'Botón',
  onLeftButton,
  showRightButton = true,
  rightButtonLabel = 'Botón',
  onRightButton,
  blanket = true,
  className = '',
  ...rest
}: ModalProps) {
  if (!open) return null

  const card = (
    <div
      className={['and-modal', size !== 'md' && `and-modal--${size}`, className]
        .filter(Boolean)
        .join(' ')}
      role="dialog"
      aria-modal={blanket || undefined}
      aria-label={title}
      {...rest}
    >
      <div className="and-modal__header">
        {showBadge ? (
          <LabelBadge estado={badgeEstado} text={badgeText} />
        ) : (
          <span className="and-modal__header-spacer" />
        )}
        <button
          type="button"
          className="and-modal__close"
          aria-label="Cerrar"
          onClick={onClose}
        >
          <Icon name="close" size={24} />
        </button>
      </div>
      {showIcon && (
        <div className="and-modal__icon">
          {iconVariant === 'circle' ? (
            <span className="and-modal__circle">
              <Icon name={icon} size={64} />
            </span>
          ) : (
            <Icon name={icon} size={72} />
          )}
        </div>
      )}
      {showTitle && title && <h4 className="and-modal__title">{title}</h4>}
      {showText && children && <div className="and-modal__body">{children}</div>}
      {(showLeftButton || showRightButton) && (
        <div className="and-modal__footer">
          {showLeftButton && (
            <Button
              variant="primary"
              appearance="ghost"
              size="md"
              onClick={onLeftButton}
            >
              {leftButtonLabel}
            </Button>
          )}
          {showRightButton && (
            <Button
              variant="primary"
              appearance="solid"
              size="md"
              onClick={onRightButton}
            >
              {rightButtonLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  )

  if (blanket) {
    return <Blanket onClose={onClose}>{card}</Blanket>
  }

  return card
}
