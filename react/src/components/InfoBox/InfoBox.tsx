import type { HTMLAttributes, ReactNode } from 'react'
import { Button } from '../Button'
import { Icon, type AndIconName } from '../Icon'
import './InfoBox.css'

/** Tipos del Info Box (Figma: variante "Type") */
export type InfoBoxType =
  | 'legal'
  | 'negocio'
  | 'interaccion'
  | 'nota'
  | 'diseno'
  | 'desarrollo'

export interface InfoBoxProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Tipo del infobox (Figma: Type; define el color de la barra y el icono) */
  type?: InfoBoxType
  /** Título (Figma: "Título") */
  title?: ReactNode
  /** Descripción (Figma: "Descripción") */
  description?: ReactNode
  /** Icono de 24 del registro del DS (default según el tipo) */
  icon?: AndIconName
  /** Oculta el icono */
  showIcon?: boolean
  /** Texto del CTA/Link (Button ghost-secondary SM del DS) */
  ctaLabel?: string
  /** Oculta el CTA */
  showCta?: boolean
  onCta?: () => void
}

/** Icono default por tipo (los del set de Figma) */
const TYPE_ICON: Record<InfoBoxType, AndIconName> = {
  legal: 'strategy',
  negocio: 'bank-outline',
  interaccion: 'tap',
  nota: 'outline-push-pin',
  diseno: 'utilities',
  desarrollo: 'unfold',
}

/**
 * InfoBox — mensaje contextual del DS Andromeda (Figma: página
 * Infobox, set "Info Box" 14524:69295). Card blanca con barra
 * izquierda de 10px e icono del color de la variante; comunica
 * niveles de importancia sin interrumpir el flujo: Legal o de riesgo
 * (morado), Regla de negocio (primary-light), Interacción &
 * funcionalidad (info), Nota general (gray-400), Acuerdo de diseño
 * (warning) y Definición de desarrollo (naranja). Responsivo: ocupa
 * el 100% del contenedor.
 */
export function InfoBox({
  type = 'legal',
  title = 'Título',
  description = 'Descripción del infobox',
  icon,
  showIcon = true,
  ctaLabel = 'CTA/Link',
  showCta = true,
  onCta,
  className = '',
  ...rest
}: InfoBoxProps) {
  return (
    <div
      className={[
        'and-infobox',
        type !== 'legal' && `and-infobox--${type}`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      <div className="and-infobox__content">
        <div className="and-infobox__text">
          <div className="and-infobox__header">
            <span className="and-infobox__title">{title}</span>
            {showIcon && (
              <span className="and-infobox__icon" aria-hidden="true">
                <Icon name={icon ?? TYPE_ICON[type]} size={24} />
              </span>
            )}
          </div>
          <span className="and-infobox__description">{description}</span>
        </div>
        {showCta && (
          <Button
            variant="secondary"
            appearance="ghost"
            size="sm"
            onClick={onCta}
          >
            {ctaLabel}
          </Button>
        )}
      </div>
    </div>
  )
}
