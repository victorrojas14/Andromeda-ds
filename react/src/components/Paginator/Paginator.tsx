import { useState, type HTMLAttributes } from 'react'
import { Icon } from '../Icon'
import './Paginator.css'

export interface PaginatorProps
  extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  /** Total de páginas */
  pageCount: number
  /** Página actual (controlada, 1-based) */
  page?: number
  /** Página inicial (no controlado) */
  defaultPage?: number
  onChange?: (page: number) => void
  /** Muestra el texto "Mostrando N de M páginas" (Figma: "Mostrar Texto Izq") */
  showText?: boolean
  /** Texto de la izquierda; recibe página actual y total */
  text?: (page: number, pageCount: number) => string
  /** Cantidad máxima de números visibles */
  maxButtons?: number
  prevLabel?: string
  nextLabel?: string
}

export function Paginator({
  pageCount,
  page,
  defaultPage = 1,
  onChange,
  showText = true,
  text = (p, total) => `Mostrando ${p} de ${total} páginas`,
  maxButtons = 3,
  prevLabel = 'Ant.',
  nextLabel = 'Sig.',
  className = '',
  ...rest
}: PaginatorProps) {
  const [inner, setInner] = useState(defaultPage)
  const current = page !== undefined ? page : inner

  const go = (target: number) => {
    const next = Math.min(Math.max(target, 1), pageCount)
    if (next === current) return
    if (page === undefined) setInner(next)
    onChange?.(next)
  }

  // Ventana de números centrada en la página actual
  const start = Math.min(
    Math.max(current - Math.floor(maxButtons / 2), 1),
    Math.max(pageCount - maxButtons + 1, 1),
  )
  const pages = Array.from(
    { length: Math.min(maxButtons, pageCount) },
    (_, i) => start + i,
  )

  const atFirst = current <= 1
  const atLast = current >= pageCount

  return (
    <nav
      className={['and-paginator', className].filter(Boolean).join(' ')}
      aria-label="Paginación"
      {...rest}
    >
      {showText && (
        <span className="and-paginator__text">{text(current, pageCount)}</span>
      )}
      <div className="and-paginator__controls">
        <button
          type="button"
          className="and-paginator__nav"
          aria-label="Primera página"
          disabled={atFirst}
          onClick={() => go(1)}
        >
          <Icon name="arrow-collapse-left" size={24} />
        </button>
        <button
          type="button"
          className="and-paginator__nav"
          aria-label="Página anterior"
          disabled={atFirst}
          onClick={() => go(current - 1)}
        >
          <Icon name="chevron-left" size={24} />
        </button>
        <button
          type="button"
          className="and-paginator__page and-paginator__page--label"
          disabled={atFirst}
          onClick={() => go(current - 1)}
        >
          {prevLabel}
        </button>
        {pages.map((p) => (
          <button
            key={p}
            type="button"
            className={[
              'and-paginator__page',
              p === current && 'and-paginator__page--active',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-current={p === current ? 'page' : undefined}
            onClick={() => go(p)}
          >
            {p}
          </button>
        ))}
        <button
          type="button"
          className="and-paginator__page and-paginator__page--label"
          disabled={atLast}
          onClick={() => go(current + 1)}
        >
          {nextLabel}
        </button>
        <button
          type="button"
          className="and-paginator__nav"
          aria-label="Página siguiente"
          disabled={atLast}
          onClick={() => go(current + 1)}
        >
          <Icon name="chevron-right" size={24} />
        </button>
        <button
          type="button"
          className="and-paginator__nav"
          aria-label="Última página"
          disabled={atLast}
          onClick={() => go(pageCount)}
        >
          <Icon name="arrow-collapse-right" size={24} />
        </button>
      </div>
    </nav>
  )
}
