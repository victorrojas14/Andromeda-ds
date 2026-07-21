import './ColorCard.css'

export interface ColorCardProps {
  /** Nombre del token tal como aparece en Figma (ej. "Primary--Dark"). */
  name: string
  /** Valor del color: hex o `var(--token)`. */
  value: string
  /** Uso recomendado; se muestra debajo de la card. */
  description?: string
}

/**
 * ColorCard — card de documentación de color del DS Andromeda.
 * Réplica en código del componente "DS/Color Card" de Figma; se usa
 * en las páginas de Fundamentos de Storybook.
 */
export function ColorCard({ name, value, description }: ColorCardProps) {
  return (
    <div className="and-color-card">
      <div className="and-color-card__card">
        <div className="and-color-card__swatch" style={{ background: value }} />
        <div className="and-color-card__meta">
          <span className="and-color-card__name">{name}</span>
          <span className="and-color-card__value">{value}</span>
        </div>
      </div>
      {description && <p className="and-color-card__description">{description}</p>}
    </div>
  )
}
