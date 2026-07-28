import * as React from 'react'
import './Accordion.css'
import { Icon } from '../Icon'

export interface AccordionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Título del header (Figma: "Texto Titulo"). */
  title: React.ReactNode
  /** Estado abierto (controlado). */
  open?: boolean
  /** Estado inicial (no controlado). */
  defaultOpen?: boolean
  /** Callback al abrir/cerrar. */
  onToggle?: (open: boolean) => void
  /** Icono a la izquierda del título (Figma: "Mostrar Icono Izq"). */
  leftIcon?: React.ReactNode
  /** Acción extra en el header, ej. un Button ghost (Figma: "Mostrar Boton"). */
  headerAction?: React.ReactNode
  /** Contenido del panel (Figma: "Contenido Acordeon"). */
  children?: React.ReactNode
}

/**
 * Accordion — acordeón del DS Andromeda (Figma: component set "Acordeon").
 * Header blanco con título, icono opcional, acción opcional y chevron;
 * panel de contenido sobre fondo neutro. Soporta uso controlado (prop
 * `open`) o no controlado (`defaultOpen`). Responsive: en viewport
 * mobile (< 768px) adopta el diseño Mobile de Figma automáticamente.
 */
export function Accordion({
  title,
  open,
  defaultOpen = false,
  onToggle,
  leftIcon,
  headerAction,
  children,
  className,
  ...rest
}: AccordionProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const isControlled = open !== undefined
  const isOpen = isControlled ? open : internalOpen
  const panelId = React.useId()

  const toggle = () => {
    if (!isControlled) setInternalOpen(!isOpen)
    onToggle?.(!isOpen)
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggle()
    }
  }

  const classes = ['and-accordion', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      <div
        className="and-accordion__header"
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={toggle}
        onKeyDown={onKeyDown}
      >
        <div className="and-accordion__lead">
          {leftIcon && (
            <span className="and-accordion__lead-icon" aria-hidden="true">
              {leftIcon}
            </span>
          )}
          <span className="and-accordion__title">{title}</span>
          {headerAction && (
            // Evita que la acción del header dispare el toggle.
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions
            <span className="and-accordion__action" onClick={(e) => e.stopPropagation()}>
              {headerAction}
            </span>
          )}
        </div>
        <span className="and-accordion__chevron" aria-hidden="true">
          <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} size={24} />
        </span>
      </div>
      {isOpen && (
        <div id={panelId} className="and-accordion__panel" role="region">
          {children}
        </div>
      )}
    </div>
  )
}

export interface AccordionItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Título del item (Figma: "Ttitulo"). */
  title: React.ReactNode
  /** Icono a la izquierda (Figma: "Mostrar Icono Izq" / "Cambiar Icono Izq"). */
  leftIcon?: React.ReactNode
  /**
   * Icono a la derecha (Figma: "Mostrar Icono Der" / "Cambiar Icono Der").
   * Por defecto chevron-down; pasá `null` para ocultarlo.
   */
  rightIcon?: React.ReactNode
}

/**
 * AccordionItem — fila tipo card del DS Andromeda (Figma: component set
 * "Item Accordion 2"): fondo blanco, radio md y sombra autolayout-sm.
 * Responsive: en viewport mobile (< 768px) adopta el diseño Mobile.
 */
export function AccordionItem({
  title,
  leftIcon,
  rightIcon = <Icon name="chevron-down" size={24} />,
  className,
  ...rest
}: AccordionItemProps) {
  const classes = ['and-accordion-item', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      <div className="and-accordion-item__lead">
        {leftIcon && (
          <span className="and-accordion-item__lead-icon" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        <span className="and-accordion-item__title">{title}</span>
      </div>
      {rightIcon && (
        <span className="and-accordion-item__trail-icon" aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </div>
  )
}
