import * as React from 'react'
import './PillNew.css'

export interface PillNewProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Texto del pill; en Figma es fijo "Nuevo". */
  children?: React.ReactNode
}

/**
 * PillNew — etiqueta "Nuevo" del DS Andromeda (Figma: "Pill new"):
 * pill de 15px con fondo bg-now, borde gray-100, punto y texto en
 * Info. Se usa para marcar elementos nuevos, por ejemplo anclada a
 * la esquina de un tab.
 */
export function PillNew({ children = 'Nuevo', className, ...rest }: PillNewProps) {
  const classes = ['and-pill-new', className].filter(Boolean).join(' ')
  return (
    <span className={classes} {...rest}>
      <span className="and-pill-new__dot-box" aria-hidden="true">
        <span className="and-pill-new__dot" />
      </span>
      <span className="and-pill-new__label">{children}</span>
    </span>
  )
}
