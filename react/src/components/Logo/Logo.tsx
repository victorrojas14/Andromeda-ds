import * as React from 'react'
import './Logo.css'
import { logos } from './logos'
import type { AndLogoVariant } from './logos'

export interface LogoProps extends Omit<React.SVGAttributes<SVGSVGElement>, 'height'> {
  /** Marca a mostrar. */
  variant?: AndLogoVariant
  /** Alto en px; el ancho se calcula con la proporción natural. */
  height?: number
  /**
   * Envolvente de la marca: fondo Rojo INVEX, logo en blanco y área de
   * seguridad proporcional (según la página "Marcas Invex" de Figma).
   */
  envolvente?: boolean
  /** Texto accesible del logo. */
  title?: string
}

/**
 * Logo — marcas INVEX del DS Andromeda (fundamento "Marcas Invex" de
 * Figma): Invex, Invex Banco, Invex Fiduciario e Invex Renacer.
 * El color se controla vía currentColor (por defecto Rojo INVEX).
 */
export function Logo({
  variant = 'invex',
  height = 40,
  envolvente = false,
  title = 'INVEX',
  className,
  ...rest
}: LogoProps) {
  const def = logos[variant]
  if (!def) return null

  const [, , vw, vh] = def.viewBox.split(' ').map(Number)
  const width = Math.round((height * vw) / vh)

  const svg = (
    <svg
      className={['and-logo', className].filter(Boolean).join(' ')}
      width={width}
      height={height}
      viewBox={def.viewBox}
      fill="currentColor"
      role="img"
      aria-label={title}
      dangerouslySetInnerHTML={{ __html: def.body }}
      {...rest}
    />
  )

  if (!envolvente) return svg

  // Área de seguridad de Figma: logo 332x101 con padding 40 / ~30
  // (≈ 0.4 y 0.3 del alto del logo).
  return (
    <span
      className="and-logo-envolvente"
      style={{ padding: `${Math.round(height * 0.3)}px ${Math.round(height * 0.4)}px` }}
    >
      {svg}
    </span>
  )
}
