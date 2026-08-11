import * as React from 'react'
import './Breadcrumbs.css'
import { Icon } from '../Icon'

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
}

/**
 * Breadcrumbs — contenedor de miga de pan del DS Andromeda. Apila
 * BreadcrumbItem con gap de 10px; el primer item oculta su separador
 * automáticamente. Responsive: en viewport mobile (< 768px) el texto
 * pasa de 16px a 12px, como el diseño Mobile de Figma.
 */
export function Breadcrumbs({ children, className, ...rest }: BreadcrumbsProps) {
  const classes = ['and-breadcrumbs', className].filter(Boolean).join(' ')
  return (
    <nav className={classes} aria-label="Breadcrumb" {...rest}>
      {children}
    </nav>
  )
}

export interface BreadcrumbItemProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  /**
   * Item navegable (Figma: Estado Active): primario con subrayado.
   * El último item de la miga (la página actual) va sin `active` y sin
   * `href`: texto en `body`, sin link y con `aria-current="page"`.
   */
  active?: boolean
  /** Muestra el separador chevron-right (Figma: "Mostrar Icono"). */
  icon?: boolean
  /** Destino del link; sin href se renderiza como texto. */
  href?: string
  /** Texto de la categoría (Figma: "Texto Categoria"). */
  children?: React.ReactNode
}

/**
 * BreadcrumbItem — item de la miga (Figma: component set "Breadcrumbs"):
 * separador chevron-right opcional + texto Regular. Los items
 * navegables van en Active (primario subrayado, con link); el último
 * (página actual) va en Default: color `body`, sin link.
 */
export function BreadcrumbItem({
  active = false,
  icon = true,
  href,
  children,
  className,
  ...rest
}: BreadcrumbItemProps) {
  const classes = ['and-breadcrumb', active && 'and-breadcrumb--active', className]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      {icon && (
        <span className="and-breadcrumb__icon" aria-hidden="true">
          <Icon name="chevron-right" size={24} />
        </span>
      )}
      <span className="and-breadcrumb__label">{children}</span>
    </>
  )

  if (href) {
    return (
      <a className={classes} href={href} {...rest}>
        {content}
      </a>
    )
  }

  return (
    <span className={classes} aria-current={!active ? 'page' : undefined}>
      {content}
    </span>
  )
}
