import {
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { Icon } from '../Icon'
import './InputGroup.css'

export interface InputGroupProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Label del segmento de categorías (Figma: "Categorías") */
  categoryLabel?: string
  /** Categorías del dropdown (desktop) y chips (mobile) */
  categories?: string[]
  /** Categoría seleccionada (controlada) */
  category?: string
  defaultCategory?: string
  onCategoryChange?: (category: string) => void
  /** Placeholder del campo de texto (Figma: "Buscar") */
  placeholder?: string
  /** Texto de búsqueda (controlado) */
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  /** Click en el botón primary o Enter en el campo */
  onSearch?: (value: string, category: string) => void
  /** Muestra el buscador interno del dropdown de categorías */
  categorySearchable?: boolean
  categorySearchPlaceholder?: string
  noResultsText?: string
}

const COMBINING_MARKS = /[̀-ͯ]/g

/** Búsqueda insensible a mayúsculas y acentos */
const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(COMBINING_MARKS, '')

export function InputGroup({
  categoryLabel = 'Categorías',
  categories = [],
  category,
  defaultCategory = '',
  onCategoryChange,
  placeholder = 'Buscar',
  value,
  defaultValue = '',
  onChange,
  onSearch,
  categorySearchable = true,
  categorySearchPlaceholder = 'Buscar',
  noResultsText = 'No se encontraron resultados',
  className = '',
  ...rest
}: InputGroupProps) {
  const [open, setOpen] = useState(false)
  const [panelQuery, setPanelQuery] = useState('')
  const [innerCategory, setInnerCategory] = useState(defaultCategory)
  const [innerValue, setInnerValue] = useState(defaultValue)
  const rootRef = useRef<HTMLDivElement>(null)
  const chipsRef = useRef<HTMLDivElement>(null)
  const drag = useRef({ active: false, moved: false, startX: 0, startScroll: 0 })
  const [dragging, setDragging] = useState(false)

  const currentCategory = category !== undefined ? category : innerCategory
  const currentValue = value !== undefined ? value : innerValue

  const filteredCategories = panelQuery
    ? categories.filter((c) => normalize(c).includes(normalize(panelQuery)))
    : categories

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  useEffect(() => {
    if (!open) setPanelQuery('')
  }, [open])

  const selectCategory = (cat: string) => {
    if (category === undefined) setInnerCategory(cat)
    onCategoryChange?.(cat)
    setOpen(false)
  }

  const setText = (text: string) => {
    if (value === undefined) setInnerValue(text)
    onChange?.(text)
  }

  /* Scroll invisible arrastrable con el mouse (chips en mobile) */
  const onChipsPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = chipsRef.current
    if (!el || el.scrollWidth <= el.clientWidth) return
    drag.current = {
      active: true,
      moved: false,
      startX: e.clientX,
      startScroll: el.scrollLeft,
    }
    setDragging(true)
  }

  const onChipsPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return
    const dx = e.clientX - drag.current.startX
    if (Math.abs(dx) > 4) drag.current.moved = true
    chipsRef.current!.scrollLeft = drag.current.startScroll - dx
  }

  const endChipsDrag = () => {
    drag.current.active = false
    setDragging(false)
  }

  return (
    <div
      ref={rootRef}
      className={['and-ig', open && 'and-ig--open', className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      <div className="and-ig__bar">
        <div className="and-ig__category">
          <button
            type="button"
            className="and-ig__category-trigger"
            aria-haspopup="listbox"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="and-ig__category-label">
              {currentCategory || categoryLabel}
            </span>
            <span className="and-ig__chevron">
              <Icon name={open ? 'chevron-up' : 'chevron-down'} size={24} />
            </span>
          </button>
          <div className="and-ig__line" />
          {open && (
            <div className="and-ig__panel">
              {categorySearchable && (
                <div className="and-ig__panel-search">
                  <input
                    className="and-ig__panel-search-input"
                    type="text"
                    placeholder={categorySearchPlaceholder}
                    value={panelQuery}
                    onChange={(e) => setPanelQuery(e.target.value)}
                  />
                  <Icon name="search" size={24} />
                </div>
              )}
              {filteredCategories.length === 0 ? (
                <div className="and-ig__empty">
                  <Icon name="baseline-search-off" size={24} />
                  <span className="and-ig__empty-text">{noResultsText}</span>
                </div>
              ) : (
                <ul className="and-ig__list" role="listbox" aria-label={categoryLabel}>
                  {filteredCategories.map((cat) => (
                    <li key={cat}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={cat === currentCategory}
                        className={[
                          'and-ig__option',
                          cat === currentCategory && 'and-ig__option--selected',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                        onClick={() => selectCategory(cat)}
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
        <div className="and-ig__search">
          <div className="and-ig__search-box">
            <input
              className="and-ig__search-input"
              type="text"
              placeholder={placeholder}
              value={currentValue}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onSearch?.(currentValue, currentCategory)
              }}
            />
          </div>
          <div className="and-ig__line" />
        </div>
        <button
          type="button"
          className="and-ig__button"
          aria-label="Buscar"
          onClick={() => onSearch?.(currentValue, currentCategory)}
        >
          <Icon name="search" size={32} />
        </button>
      </div>
      {categories.length > 0 && (
        <div
          ref={chipsRef}
          className={['and-ig__chips', dragging && 'and-ig__chips--dragging']
            .filter(Boolean)
            .join(' ')}
          onPointerDown={onChipsPointerDown}
          onPointerMove={onChipsPointerMove}
          onPointerUp={endChipsDrag}
          onPointerLeave={endChipsDrag}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={[
                'and-ig__chip',
                cat === currentCategory && 'and-ig__chip--selected',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-pressed={cat === currentCategory}
              onClick={() => {
                if (drag.current.moved) return
                if (category === undefined) setInnerCategory(cat)
                onCategoryChange?.(cat)
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
