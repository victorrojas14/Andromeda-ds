import * as React from 'react'
import './Footer.css'
import { Icon } from '../Icon'
import { Logo } from '../Logo'
import facebookSvg from './assets/facebook.svg'
import xSvg from './assets/x.svg'
import instagramSvg from './assets/instagram.svg'
import buroSvg from './assets/buro.svg'
import condusefSvg from './assets/condusef.svg'
import ipabSvg from './assets/ipab.svg'

export interface FooterLink {
  /** Texto del subitem. */
  label: string
  /** URL del subitem; sin href se renderiza como texto. */
  href?: string
}

export interface FooterColumn {
  /** Título del item (columna) del menú. */
  title: string
  /** Subitems de la columna. */
  links: FooterLink[]
}

export interface FooterSocialLinks {
  facebook?: string
  x?: string
  instagram?: string
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Columnas del menú (1 a 4 según el diseño). Cada una con título y
   * subitems editables (texto y URL); se pueden agregar más.
   */
  columns: FooterColumn[]
  /** Muestra la columna "Síguenos" (iconos de redes + logos). */
  social?: boolean
  /** Título de la columna de redes. */
  socialTitle?: string
  /** URLs de las redes sociales. */
  socialLinks?: FooterSocialLinks
  /** Texto de derechos reservados de la barra inferior. */
  copyright?: string
}

/**
 * Footer — pie de página del DS Andromeda (Figma: "Footer Desktop" y
 * "Footer Mobile"). Fondo secondary con columnas de links, columna
 * "Síguenos" opcional (redes + Buró/CONDUSEF/IPAB) y barra inferior
 * con el logo INVEX y el copyright. Responsive: en <1024px las
 * columnas se apilan y colapsan con chevron (diseño Footer Mobile).
 */
export function Footer({
  columns,
  social = true,
  socialTitle = 'Síguenos',
  socialLinks = {},
  copyright = '2026 INVEX® Todos los derechos reservados',
  className,
  ...rest
}: FooterProps) {
  const [open, setOpen] = React.useState<Record<number, boolean>>({})
  const toggle = (i: number) => setOpen((prev) => ({ ...prev, [i]: !prev[i] }))

  const classes = ['and-footer', className].filter(Boolean).join(' ')
  const socialIndex = columns.length

  const columnHeader = (title: string, i: number) => (
    <button
      type="button"
      className="and-footer__column-header"
      aria-expanded={Boolean(open[i])}
      onClick={() => toggle(i)}
    >
      <span className="and-footer__column-title">{title}</span>
      <span className="and-footer__chevron" aria-hidden="true">
        <Icon name={open[i] ? 'chevron-up' : 'chevron-down'} size={24} />
      </span>
    </button>
  )

  return (
    <footer className={classes} {...rest}>
      <div className="and-footer__columns">
        {columns.map((column, i) => (
          <div
            key={i}
            className={['and-footer__column', open[i] && 'and-footer__column--open']
              .filter(Boolean)
              .join(' ')}
          >
            {columnHeader(column.title, i)}
            <ul className="and-footer__list">
              {column.links.map((link, j) => (
                <li key={j}>
                  {link.href ? <a href={link.href}>{link.label}</a> : link.label}
                </li>
              ))}
            </ul>
          </div>
        ))}
        {social && (
          <div
            className={['and-footer__column', open[socialIndex] && 'and-footer__column--open']
              .filter(Boolean)
              .join(' ')}
          >
            {columnHeader(socialTitle, socialIndex)}
            <div className="and-footer__social">
              <div className="and-footer__icons">
                <a href={socialLinks.facebook ?? '#'} aria-label="Facebook">
                  <img src={facebookSvg} alt="" />
                </a>
                <a href={socialLinks.x ?? '#'} aria-label="X">
                  <img src={xSvg} alt="" />
                </a>
                <a href={socialLinks.instagram ?? '#'} aria-label="Instagram">
                  <img src={instagramSvg} alt="" />
                </a>
              </div>
              <div className="and-footer__logos">
                <img src={buroSvg} alt="Buró de Entidades Financieras" />
                <img src={condusefSvg} alt="CONDUSEF" />
                <img src={ipabSvg} alt="IPAB" />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="and-footer__bottom">
        <Logo variant="invex" height={30} />
        <span className="and-footer__copyright">{copyright}</span>
      </div>
    </footer>
  )
}
