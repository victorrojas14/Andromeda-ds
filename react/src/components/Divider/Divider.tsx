import * as React from 'react'
import './Divider.css'

export type DividerSpacing = 0 | 10 | 20 | 30 | 40 | 50 | 70 | 90

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  /**
   * Espaciado vertical a cada lado de la línea, de la escala Spacing
   * (Figma: "Divider 10px" … "Divider 90px"). 0 renderiza solo la
   * línea (Figma: "Divider").
   */
  spacing?: DividerSpacing
}

/**
 * Divider — separador del DS Andromeda (Figma: componentes "Divider" y
 * "Divider 10–90px"): línea de 1px en gray-300 con espaciado vertical
 * opcional de la escala Spacing. Se renderiza como <hr>.
 */
export function Divider({ spacing = 0, className, ...rest }: DividerProps) {
  const classes = ['and-divider', spacing !== 0 && `and-divider--${spacing}`, className]
    .filter(Boolean)
    .join(' ')

  return <hr className={classes} {...rest} />
}
