import { useState, type HTMLAttributes } from 'react'
import { Button } from '../Button'
import { Checkbox } from '../Controls'
import { Icon } from '../Icon'
import './DualList.css'

export interface DualListItem {
  /** Valor único del item */
  value: string
  /** Texto visible del item */
  label: string
}

export interface DualListProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Items disponibles (strings u objetos { value, label }) */
  items: Array<string | DualListItem>
  /** Valores transferidos a la lista derecha (controlado) */
  value?: string[]
  defaultValue?: string[]
  onChange?: (values: string[], items: DualListItem[]) => void
  /** Título del panel izquierdo (Figma: "Title-Text-Content") */
  leftTitle?: string
  /** Título del panel derecho */
  rightTitle?: string
  /** Texto del botón Agregar (Figma: Botones Action=Add) */
  addLabel?: string
  /** Texto del botón Quitar (Figma: Botones Action=Remove) */
  removeLabel?: string
  searchPlaceholder?: string
  selectAllLabel?: string
  /** Texto del panel izquierdo vacío (Figma: "Content text") */
  emptyLeftText?: string
  /** Texto del panel derecho vacío */
  emptyRightText?: string
  /** Muestra los buscadores */
  showSearch?: boolean
}

const toItems = (items: Array<string | DualListItem>): DualListItem[] =>
  items.map((i) => (typeof i === 'string' ? { value: i, label: i } : i))

/** Búsqueda sin acentos (mismo normalizado que el resto del DS) */
const norm = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

/**
 * DualList — lista dual de transferencia del DS Andromeda (Figma:
 * página Duallist — organismo "Duallist", paneles "Dual-list-atom" y
 * "Botones"). Dos paneles de 518px con buscador, "Seleccionar todo" y
 * items con Checkbox del DS; los botones Agregar/Quitar (Button del
 * DS con contador) transfieren los items marcados de una lista a la
 * otra. Full width: ocupa el 100% del contenedor y en <768px las
 * columnas se apilan.
 */
export function DualList({
  items,
  value,
  defaultValue = [],
  onChange,
  leftTitle = 'Selecciona permisos para el usuario',
  rightTitle = 'Permisos habilitados para el usuario',
  addLabel = 'Agregar',
  removeLabel = 'Quitar',
  searchPlaceholder = 'Buscar',
  selectAllLabel = 'Seleccionar todo',
  emptyLeftText = 'Todos los elementos han sido agregados.',
  emptyRightText = 'No hay elementos seleccionados aún',
  showSearch = true,
  className = '',
  ...rest
}: DualListProps) {
  const [inner, setInner] = useState<string[]>(defaultValue)
  const [leftChecked, setLeftChecked] = useState<string[]>([])
  const [rightChecked, setRightChecked] = useState<string[]>([])
  const [leftQuery, setLeftQuery] = useState('')
  const [rightQuery, setRightQuery] = useState('')

  const all = toItems(items)
  const transferred = value !== undefined ? value : inner
  const leftItems = all.filter((i) => !transferred.includes(i.value))
  const rightItems = all.filter((i) => transferred.includes(i.value))

  const setTransferred = (next: string[]) => {
    if (value === undefined) setInner(next)
    onChange?.(
      next,
      all.filter((i) => next.includes(i.value)),
    )
  }

  const add = () => {
    setTransferred([...transferred, ...leftChecked])
    setLeftChecked([])
  }

  const remove = () => {
    setTransferred(transferred.filter((v) => !rightChecked.includes(v)))
    setRightChecked([])
  }

  const panel = (side: 'left' | 'right') => {
    const list = side === 'left' ? leftItems : rightItems
    const query = side === 'left' ? leftQuery : rightQuery
    const setQuery = side === 'left' ? setLeftQuery : setRightQuery
    const checked = side === 'left' ? leftChecked : rightChecked
    const setChecked = side === 'left' ? setLeftChecked : setRightChecked
    const title = side === 'left' ? leftTitle : rightTitle
    const emptyText = side === 'left' ? emptyLeftText : emptyRightText
    const visible = query
      ? list.filter((i) => norm(i.label).includes(norm(query)))
      : list
    const allChecked =
      visible.length > 0 && visible.every((i) => checked.includes(i.value))

    const toggle = (v: string, on: boolean) =>
      setChecked(on ? [...checked, v] : checked.filter((c) => c !== v))

    const toggleAll = (on: boolean) => {
      const values = visible.map((i) => i.value)
      setChecked(
        on
          ? [...new Set([...checked, ...values])]
          : checked.filter((c) => !values.includes(c)),
      )
    }

    return (
      <div className="and-duallist__panel">
        <div className="and-duallist__head">
          <span className="and-duallist__title">{title}</span>
          <span className="and-duallist__count">
            {list.length} elemento{list.length === 1 ? '' : 's'}
          </span>
        </div>
        {list.length === 0 ? (
          <div className="and-duallist__empty">{emptyText}</div>
        ) : (
          <div className="and-duallist__body">
            {showSearch && (
              <label className="and-duallist__search">
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Icon name="search" size={24} />
              </label>
            )}
            <label className="and-duallist__select-all">
              <Checkbox
                checked={allChecked}
                onChange={toggleAll}
                aria-label={selectAllLabel}
              />
              {selectAllLabel}
            </label>
            <div className="and-duallist__list">
              {visible.map((item) => {
                const isOn = checked.includes(item.value)
                return (
                  <label
                    key={item.value}
                    className={[
                      'and-duallist__item',
                      isOn && 'and-duallist__item--checked',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    <Checkbox
                      checked={isOn}
                      onChange={(on) => toggle(item.value, on)}
                      aria-label={item.label}
                    />
                    {item.label}
                  </label>
                )
              })}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className={['and-duallist', className].filter(Boolean).join(' ')}
      {...rest}
    >
      <div className="and-duallist__col">
        {panel('left')}
        <Button
          variant="primary"
          appearance="solid"
          size="sm"
          disabled={leftChecked.length === 0}
          rightIcon={<Icon name="chevron-right" size={24} />}
          onClick={add}
        >
          {addLabel}
          {leftChecked.length > 0 && ` (${leftChecked.length})`}
        </Button>
      </div>
      <div className="and-duallist__col">
        {panel('right')}
        <Button
          variant="primary"
          appearance="solid"
          size="sm"
          disabled={rightChecked.length === 0}
          leftIcon={<Icon name="chevron-left" size={24} />}
          onClick={remove}
        >
          {removeLabel}
          {rightChecked.length > 0 && ` (${rightChecked.length})`}
        </Button>
      </div>
    </div>
  )
}
