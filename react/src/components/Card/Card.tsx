import * as React from 'react'
import './Card.css'

export interface CardPhotoProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** URL de la imagen de la card. */
  image: string
  /** Texto alternativo de la imagen. */
  imageAlt?: string
  /** Título (Poppins SemiBold h5). */
  title: React.ReactNode
  /**
   * Layout horizontal (Figma: Card Photo 600×210, imagen a la
   * izquierda). Responsive: bajo 768px vuelve al diseño vertical.
   */
  horizontal?: boolean
  /** Acción inferior, ej. un Button ghost ("Leer más"). */
  action?: React.ReactNode
  /** Descripción (Poppins Regular, color secondary). */
  children?: React.ReactNode
}

/**
 * CardPhoto — card con imagen del DS Andromeda (Figma: "Card Photo").
 * Una sola card con variante vertical (default) u horizontal; la
 * horizontal se apila en vertical en viewport mobile (< 768px).
 */
export function CardPhoto({
  image,
  imageAlt = '',
  title,
  horizontal = false,
  action,
  children,
  className,
  ...rest
}: CardPhotoProps) {
  const classes = ['and-card-photo', horizontal && 'and-card-photo--horizontal', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} {...rest}>
      <img className="and-card-photo__image" src={image} alt={imageAlt} />
      <div className="and-card-photo__body">
        <p className="and-card-photo__title">{title}</p>
        {children && <p className="and-card-photo__text">{children}</p>}
        {action && <div className="and-card-photo__action">{action}</div>}
      </div>
    </div>
  )
}

export interface CardActionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Fecha superior con borde inferior (Figma: "24 jul 2022"). */
  date?: React.ReactNode
  /** Título (Poppins Medium h4). */
  title: React.ReactNode
  /** Acción inferior a lo ancho, ej. un Button primary ("Descargar"). */
  action?: React.ReactNode
}

/**
 * CardAction — card de acción del DS Andromeda (Figma: "Card Action"):
 * fecha con separador, título h4 y acción a lo ancho, con sombra LG2.
 */
export function CardAction({ date, title, action, className, ...rest }: CardActionProps) {
  const classes = ['and-card-action', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      {date && <div className="and-card-action__date">{date}</div>}
      <p className="and-card-action__title">{title}</p>
      {action && <div className="and-card-action__action">{action}</div>}
    </div>
  )
}

export interface CardContactProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Título (Poppins SemiBold h4). */
  title: React.ReactNode
  /** Correo de contacto; se renderiza como link mailto en primario. */
  email?: string
  /** Contenido adicional (teléfonos, etc.); usar strong para etiquetas. */
  children?: React.ReactNode
}

/**
 * CardContact — card de contacto del DS Andromeda (Figma: "Card
 * Action" de contacto): título h4, correo en primario y contenido
 * centrado, con sombra MD2.
 */
export function CardContact({ title, email, children, className, ...rest }: CardContactProps) {
  const classes = ['and-card-contact', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      <p className="and-card-contact__title">{title}</p>
      {email && (
        <a className="and-card-contact__email" href={`mailto:${email}`}>
          {email}
        </a>
      )}
      {children && <div className="and-card-contact__body">{children}</div>}
    </div>
  )
}
