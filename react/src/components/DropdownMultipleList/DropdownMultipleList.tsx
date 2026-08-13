import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
} from 'react'
import { Icon } from '../Icon'
import './DropdownMultipleList.css'

export interface DropdownMultipleListOption {
  /** Figma: "Nombre" / "Nombre Cliente" */
  name: string
  /** Figma: "Cuenta" / "Numero Cuenta" */
  account: string
  /** Figma: "Saldo" (texto formateado, p. ej. "$ 1,000.00") */
  balance?: string
  /** Identificador del item; por defecto se usa `account` */
  value?: string
}

export interface DropdownMultipleListProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Label flotante y placeholder (Figma: "Selecciona la cuenta de retiro") */
  label?: string
  options?: DropdownMultipleListOption[]
  /** Valor seleccionado (controlado) */
  value?: string
  /** Valor inicial (no controlado) */
  defaultValue?: string
  onChange?: (value: string, option: DropdownMultipleListOption) => void
  /** Muestra el buscador que filtra entre los items (Figma: Input busqueda) */
  searchable?: boolean
  searchPlaceholder?: string
  /** Muestra la columna Saldo (Figma: "Mostrar Saldo") */
  showBalance?: boolean
  /** Encabezado de la columna derecha (Figma: "Saldo") */
  balanceHeading?: string
  /** Texto del estado sin resultados */
  noResultsText?: string
}

const COMBINING_MARKS = /[̀-ͯ]/g

/** Búsqueda insensible a mayúsculas y acentos */
const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(COMBINING_MARKS, '')

const keyOf = (option: DropdownMultipleListOption) =>
  option.value ?? option.account

export function DropdownMultipleList({
  label = 'Selecciona la cuenta de retiro',
  options = [],
  value,
  defaultValue,
  onChange,
  searchable = true,
  searchPlaceholder = 'Buscar',
  showBalance = true,
  balanceHeading = 'Saldo',
  noResultsText = 'No se encontraron resultados',
  className = '',
  ...rest
}: DropdownMultipleListProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [innerValue, setInnerValue] = useState(defaultValue ?? '')
  const rootRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  const current = value !== undefined ? value : innerValue
  const selected = useMemo(
    () => options.find((o) => keyOf(o) === current) ?? null,
    [options, current],
  )
  const filtered = query
    ? options.filter(
        (o) =>
          normalize(o.name).includes(normalize(query)) ||
          normalize(o.account).includes(normalize(query)),
      )
    : options

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

  const select = (option: DropdownMultipleListOption) => {
    if (value === undefined) setInnerValue(keyOf(option))
    onChange?.(keyOf(option), option)
    setOpen(false)
  }

  const renderData = (
    name: string,
    account: string,
    balance: string | undefined,
    heading: string,
  ) => (
    <span className="and-dml__data">
      <span className="and-dml__data-row">
        <span className="and-dml__data-name">{name}</span>
        {showBalance && <span className="and-dml__data-balance">{heading}</span>}
      </span>
      <span className="and-dml__data-row">
        <span className="and-dml__data-account">{account}</span>
        {showBalance && (
          <span className="and-dml__data-balance">{balance ?? ''}</span>
        )}
      </span>
    </span>
  )

  const classes = [
    'and-dml',
    open && 'and-dml--open',
    selected && 'and-dml--selected',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div ref={rootRef} className={classes} {...rest}>
      {selected ? (
        <button
          type="button"
          className="and-dml__trigger and-dml__trigger--selected"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {renderData(
            selected.name,
            selected.account,
            selected.balance,
            balanceHeading,
          )}
          <span className="and-dml__chevron">
            <Icon name={open ? 'chevron-up' : 'chevron-down'} size={24} />
          </span>
        </button>
      ) : (
        <button
          type="button"
          className="and-dml__trigger"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="and-dml__label">{label}</span>
          <span className="and-dml__placeholder">{label}</span>
          <span className="and-dml__chevron">
            <Icon name={open ? 'chevron-up' : 'chevron-down'} size={24} />
          </span>
        </button>
      )}
      <div className="and-dml__line" />
      {open && (
        <div className="and-dml__panel">
          {searchable && (
            <div className="and-dml__search-wrap">
              <div className="and-dml__search">
                <input
                  ref={searchRef}
                  className="and-dml__search-input"
                  type="text"
                  placeholder={searchPlaceholder}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Icon name="search" size={24} />
              </div>
            </div>
          )}
          {filtered.length === 0 ? (
            <div className="and-dml__empty">
              <Icon name="baseline-search-off" size={24} />
              <span className="and-dml__empty-text">{noResultsText}</span>
            </div>
          ) : (
            <ul className="and-dml__list" role="listbox" aria-label={label}>
              {filtered.map((option) => (
                <li key={keyOf(option)}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={keyOf(option) === current}
                    className="and-dml__option"
                    onClick={() => select(option)}
                  >
                    {renderData(
                      option.name,
                      option.account,
                      option.balance,
                      balanceHeading,
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
