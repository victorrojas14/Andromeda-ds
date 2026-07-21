import * as React from 'react'
import './Grid.css'

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Cantidad de columnas de la retícula. */
  columns?: number
  /** Sin ancho máximo: ocupa todo el contenedor padre. */
  fluid?: boolean
  children?: React.ReactNode
}

/**
 * Grid — retícula del DS Andromeda (fundamento "Grid" de Figma):
 * 12 columnas, gutter de 20px y contenedor de 1140px centrado.
 * Las celdas se colocan con GridCol.
 */
export const Grid = React.forwardRef<HTMLDivElement, GridProps>(function Grid(
  { columns = 12, fluid = false, className, style, children, ...rest },
  ref,
) {
  const classes = ['and-grid', fluid && 'and-grid--fluid', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      ref={ref}
      className={classes}
      style={{ ...style, ['--and-grid-columns' as string]: columns }}
      {...rest}
    >
      {children}
    </div>
  )
})

Grid.displayName = 'Grid'

export interface GridColProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Cantidad de columnas que ocupa la celda. */
  span?: number
  children?: React.ReactNode
}

/** Celda de la retícula: ocupa `span` columnas del Grid padre. */
export const GridCol = React.forwardRef<HTMLDivElement, GridColProps>(function GridCol(
  { span = 1, className, style, children, ...rest },
  ref,
) {
  const classes = ['and-grid__col', className].filter(Boolean).join(' ')

  return (
    <div
      ref={ref}
      className={classes}
      style={{ ...style, ['--and-col-span' as string]: span }}
      {...rest}
    >
      {children}
    </div>
  )
})

GridCol.displayName = 'GridCol'
