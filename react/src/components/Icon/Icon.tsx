import * as React from 'react'
import './Icon.css'
import { icons } from './icons'
import type { AndIconName } from './icons'

export interface IconProps extends Omit<React.SVGAttributes<SVGSVGElement>, 'name'> {
  /** Nombre del icono tal como aparece en Figma (ej. "account-outline"). */
  name: AndIconName
  /** Tamaño en px. La librería define 12, 16, 20, 24, 32, 48 y 72. */
  size?: number
  /** Texto accesible. Sin title el icono es decorativo (aria-hidden). */
  title?: string
}

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/**
 * Icon — iconografía del DS Andromeda (fundamento "Icons" de Figma).
 * Renderiza el SVG del registro `icons` con fills normalizados a
 * currentColor: el color se controla con la propiedad CSS `color`.
 */
export function Icon({ name, size = 24, title, className, ...rest }: IconProps) {
  const def = icons[name]
  if (!def) return null

  const classes = ['and-icon', className].filter(Boolean).join(' ')
  const html = (title ? `<title>${escapeXml(title)}</title>` : '') + def.body

  return (
    <svg
      className={classes}
      width={size}
      height={size}
      viewBox={def.viewBox}
      fill="currentColor"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      dangerouslySetInnerHTML={{ __html: html }}
      {...rest}
    />
  )
}
