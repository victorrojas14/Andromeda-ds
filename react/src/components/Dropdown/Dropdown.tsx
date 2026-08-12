import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
} from 'react'
import { Icon } from '../Icon'
import './Dropdown.css'

export interface DropdownOption {
  label: string
  value: string
}

export interface DropdownProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Etiqueta flotante del trigger (Figma: "Seleccionar") */
  label?: string
  /** Opciones: strings u objetos { label, value } */
  options?: Array<string | DropdownOption>
  /** Valor seleccionado (controlado) */
  value?: string
  /** Valor inicial (no controlado) */
  defaultValue?: string
  onChange?: (value: string, option: DropdownOption) => void
  /** Muestra el buscador que filtra entre los items (Figma: Input busqueda) */
  searchable?: boolean
  searchPlaceholder?: string
  /** Forma del check del item (Figma Variant: Square/Circle) */
  checkShape?: 'square' | 'circle'
  /** Posición del check en el item (Figma Variant: left/right) */
  checkPosition?: 'left' | 'right'
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

const toOptions = (options: Array<string | DropdownOption>): DropdownOption[] =>
  options.map((o) => (typeof o === 'string' ? { label: o, value: o } : o))

export function Dropdown({
  label = 'Seleccionar',
  options = [],
  value,
  defaultValue,
  onChange,
  searchable = true,
  searchPlaceholder = 'Buscar',
  checkShape = 'square',
  checkPosition = 'right',
  disabled = false,
  noResultsText = 'No se encontraron resultados',
  className = '',
  ...rest
}: DropdownProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [innerValue, setInnerValue] = useState(defaultValue ?? '')
  const rootRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  const current = value !== undefined ? value : innerValue
  const items = useMemo(() => toOptions(options), [options])
  const selected = items.find((o) => o.value === current)
  const filtered = query
    ? items.filter((o) => normalize(o.label).includes(normalize(query)))
    : items

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

  const select = (option: DropdownOption) => {
    if (value === undefined) setInnerValue(option.value)
    onChange?.(option.value, option)
    setOpen(false)
  }

  const classes = [
    'and-dropdown',
    open && 'and-dropdown--open',
    (open || selected) && 'and-dropdown--float',
    disabled && 'and-dropdown--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div ref={rootRef} className={classes} {...rest}>
      <button
        type="button"
        className="and-dropdown__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="and-dropdown__label">{label}</span>
        <span className="and-dropdown__value">{selected?.label ?? ''}</span>
        <span className="and-dropdown__chevron">
          <Icon name={open ? 'chevron-up' : 'chevron-down'} size={24} />
        </span>
      </button>
      <div className="and-dropdown__line" />
      {open && (
        <div className="and-dropdown__panel">
          {searchable && (
            <div className="and-dropdown__search">
              <input
                ref={searchRef}
                className="and-dropdown__search-input"
                type="text"
                placeholder={searchPlaceholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Icon name="search" size={24} />
            </div>
          )}
          {filtered.length === 0 ? (
            <div className="and-dropdown__empty">
              <Icon name="baseline-search-off" size={24} />
              <span className="and-dropdown__empty-text">{noResultsText}</span>
            </div>
          ) : (
            <ul className="and-dropdown__list" role="listbox" aria-label={label}>
              {filtered.map((option) => {
                const isSelected = option.value === current
                return (
                  <li key={option.value}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      className={[
                        'and-dropdown__option',
                        checkPosition === 'left' && 'and-dropdown__option--check-left',
                        isSelected && 'and-dropdown__option--selected',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      onClick={() => select(option)}
                    >
                      <span className="and-dropdown__option-label">{option.label}</span>
                      <span
                        className={[
                          'and-dropdown__check',
                          checkShape === 'circle' && 'and-dropdown__check--circle',
                          isSelected && 'and-dropdown__check--checked',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                        aria-hidden="true"
                      >
                        {isSelected && checkShape === 'square' && (
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path
                              d="M2.5 7.5L5.5 10.5L11.5 3.5"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
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
