import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
} from 'react'
import { Icon } from '../Icon'
import './Multiselect.css'

export interface MultiselectOption {
  label: string
  value: string
}

export interface MultiselectProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Etiqueta flotante del trigger (Figma: "Selecciona") */
  label?: string
  /** Opciones: strings u objetos { label, value } */
  options?: Array<string | MultiselectOption>
  /** Valores seleccionados (controlado) */
  value?: string[]
  /** Valores iniciales (no controlado) */
  defaultValue?: string[]
  onChange?: (values: string[]) => void
  /** Muestra el buscador que filtra entre los items (Figma: Input busqueda) */
  searchable?: boolean
  searchPlaceholder?: string
  /** Muestra la fila "Seleccionar todo" */
  selectAll?: boolean
  selectAllLabel?: string
  disabled?: boolean
  /** Texto del estado sin resultados (Figma: No results) */
  noResultsText?: string
}

const COMBINING_MARKS = /[̀-ͯ]/g

/** Búsqueda insensible a mayúsculas y acentos */
const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(COMBINING_MARKS, '')

const toOptions = (
  options: Array<string | MultiselectOption>,
): MultiselectOption[] =>
  options.map((o) => (typeof o === 'string' ? { label: o, value: o } : o))

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M2.5 7.5L5.5 10.5L11.5 3.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export function Multiselect({
  label = 'Selecciona',
  options = [],
  value,
  defaultValue,
  onChange,
  searchable = true,
  searchPlaceholder = 'Buscar',
  selectAll = true,
  selectAllLabel = 'Seleccionar todo',
  disabled = false,
  noResultsText = 'No se encontraron resultados',
  className = '',
  ...rest
}: MultiselectProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [innerValue, setInnerValue] = useState<string[]>(defaultValue ?? [])
  const rootRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  const current = value !== undefined ? value : innerValue
  const items = useMemo(() => toOptions(options), [options])
  const selected = items.filter((o) => current.includes(o.value))
  const filtered = query
    ? items.filter((o) => normalize(o.label).includes(normalize(query)))
    : items
  const allSelected = items.length > 0 && selected.length === items.length

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
    if (open) searchRef.current?.focus()
    else setQuery('')
  }, [open])

  const commit = (values: string[]) => {
    if (value === undefined) setInnerValue(values)
    onChange?.(values)
  }

  const toggle = (option: MultiselectOption) => {
    commit(
      current.includes(option.value)
        ? current.filter((v) => v !== option.value)
        : [...current, option.value],
    )
  }

  const toggleAll = () => {
    commit(allSelected ? [] : items.map((o) => o.value))
  }

  const hasSelection = selected.length > 0

  const classes = [
    'and-multiselect',
    open && 'and-multiselect--open',
    (open || hasSelection) && 'and-multiselect--float',
    disabled && 'and-multiselect--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const renderCheck = (checked: boolean) => (
    <span
      className={[
        'and-multiselect__check',
        checked && 'and-multiselect__check--checked',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-hidden="true"
    >
      {checked && <CheckIcon />}
    </span>
  )

  return (
    <div ref={rootRef} className={classes} {...rest}>
      <div
        className="and-multiselect__trigger"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : 0}
        onClick={() => !disabled && setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (disabled) return
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setOpen((v) => !v)
          }
        }}
      >
        <span className="and-multiselect__label">{label}</span>
        {hasSelection ? (
          <span className="and-multiselect__chips">
            {selected.map((option) => (
              <span key={option.value} className="and-multiselect__chip">
                {option.label}
                <button
                  type="button"
                  className="and-multiselect__chip-remove"
                  aria-label={`Quitar ${option.label}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    toggle(option)
                  }}
                >
                  <Icon name="close" size={16} />
                </button>
              </span>
            ))}
          </span>
        ) : (
          <span className="and-multiselect__placeholder" />
        )}
        {hasSelection && !disabled && (
          <button
            type="button"
            className="and-multiselect__clear"
            aria-label="Quitar todas las selecciones"
            onClick={(e) => {
              e.stopPropagation()
              commit([])
            }}
          >
            <Icon name="close" size={20} />
          </button>
        )}
        <span className="and-multiselect__chevron">
          <Icon name={open ? 'chevron-up' : 'chevron-down'} size={24} />
        </span>
      </div>
      <div className="and-multiselect__line" />
      {open && (
        <div className="and-multiselect__panel">
          {searchable && (
            <div className="and-multiselect__search">
              <input
                ref={searchRef}
                className="and-multiselect__search-input"
                type="text"
                placeholder={searchPlaceholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Icon name="search" size={24} />
            </div>
          )}
          {selectAll && !query && items.length > 0 && (
            <button
              type="button"
              className="and-multiselect__option"
              aria-pressed={allSelected}
              onClick={toggleAll}
            >
              {renderCheck(allSelected)}
              <span className="and-multiselect__option-label">
                {selectAllLabel}
              </span>
            </button>
          )}
          {filtered.length === 0 ? (
            <div className="and-multiselect__empty">
              <Icon name="baseline-search-off" size={24} />
              <span className="and-multiselect__empty-text">
                {noResultsText}
              </span>
            </div>
          ) : (
            <ul
              className="and-multiselect__list"
              role="listbox"
              aria-multiselectable="true"
              aria-label={label}
            >
              {filtered.map((option) => {
                const isSelected = current.includes(option.value)
                return (
                  <li key={option.value}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      className="and-multiselect__option"
                      onClick={() => toggle(option)}
                    >
                      {renderCheck(isSelected)}
                      <span className="and-multiselect__option-label">
                        {option.label}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
