import { useMemo, useState, type HTMLAttributes, type ReactNode } from 'react'
import { Checkbox } from '../Controls'
import { Icon } from '../Icon'
import './Table.css'

export type TableAlign = 'left' | 'center' | 'right'
export type TableSortDirection = 'asc' | 'desc'

export interface TableColumn<Row = Record<string, unknown>> {
  /** Clave del dato en la fila */
  key: string
  /** Título del header (Figma: "Texto Titulo"; vacío = "Mostrar Texto" off) */
  title?: string
  /** Alineación (Figma: Estados Izq/Centrado/Der del Item Columna) */
  align?: TableAlign
  /** Header ordenable asc/desc (Figma: icono unfold) */
  sortable?: boolean
  width?: number | string
  /** Render de la celda: integra cualquier componente de la librería */
  render?: (row: Row, rowIndex: number) => ReactNode
}

export interface TableProps<Row = Record<string, unknown>>
  extends Omit<HTMLAttributes<HTMLTableElement>, 'children'> {
  columns: TableColumn<Row>[]
  data: Row[]
  /** Filas alternas con fondo background (estado Select de Figma) */
  zebra?: boolean
  /** Columna de selección con el Checkbox de la librería */
  selectable?: boolean
  /** Índices seleccionados (controlado) */
  selected?: number[]
  onSelectionChange?: (selected: number[]) => void
  /** Orden activo (no controlado internamente si se pasa) */
  onSortChange?: (key: string | null, direction: TableSortDirection | null) => void
}

export function Table<Row extends Record<string, unknown>>({
  columns,
  data,
  zebra = true,
  selectable = false,
  selected,
  onSelectionChange,
  onSortChange,
  className = '',
  ...rest
}: TableProps<Row>) {
  const [sort, setSort] = useState<{
    key: string
    direction: TableSortDirection
  } | null>(null)
  const [innerSelected, setInnerSelected] = useState<number[]>([])
  const currentSelected = selected !== undefined ? selected : innerSelected

  // Click en el título: asc -> desc -> sin orden
  const toggleSort = (key: string) => {
    let next: { key: string; direction: TableSortDirection } | null
    if (sort?.key !== key) next = { key, direction: 'asc' }
    else if (sort.direction === 'asc') next = { key, direction: 'desc' }
    else next = null
    setSort(next)
    onSortChange?.(next?.key ?? null, next?.direction ?? null)
  }

  const sortedIndexes = useMemo(() => {
    const indexes = data.map((_, i) => i)
    if (!sort) return indexes
    const { key, direction } = sort
    return indexes.sort((a, b) => {
      const va = data[a][key]
      const vb = data[b][key]
      let cmp: number
      if (typeof va === 'number' && typeof vb === 'number') cmp = va - vb
      else cmp = String(va ?? '').localeCompare(String(vb ?? ''), 'es', { numeric: true })
      return direction === 'asc' ? cmp : -cmp
    })
  }, [data, sort])

  const commitSelection = (next: number[]) => {
    if (selected === undefined) setInnerSelected(next)
    onSelectionChange?.(next)
  }

  const allSelected = data.length > 0 && currentSelected.length === data.length

  const alignThClass = (align?: TableAlign) =>
    align === 'left'
      ? ' and-table__th--left'
      : align === 'right'
        ? ' and-table__th--right'
        : ''

  const alignTdClass = (align?: TableAlign) =>
    align === 'center'
      ? ' and-table__td--center'
      : align === 'right'
        ? ' and-table__td--right'
        : ''

  return (
    <div className="and-table-wrap">
      <table
        className={['and-table', zebra && 'and-table--zebra', className]
          .filter(Boolean)
          .join(' ')}
        {...rest}
      >
        <thead>
          <tr>
            {selectable && (
              <th className="and-table__th and-table__check-cell">
                <Checkbox
                  checked={allSelected}
                  onChange={(checked) =>
                    commitSelection(checked ? data.map((_, i) => i) : [])
                  }
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                className={`and-table__th${alignThClass(col.align)}`}
                style={col.width !== undefined ? { width: col.width } : undefined}
                aria-sort={
                  sort?.key === col.key
                    ? sort.direction === 'asc'
                      ? 'ascending'
                      : 'descending'
                    : undefined
                }
              >
                <span className="and-table__th-inner">
                  {col.title}
                  {col.sortable && (
                    <button
                      type="button"
                      className="and-table__sort"
                      aria-label={`Ordenar por ${col.title ?? col.key}`}
                      onClick={() => toggleSort(col.key)}
                    >
                      <Icon
                        name={
                          sort?.key === col.key
                            ? sort.direction === 'asc'
                              ? 'chevron-up'
                              : 'chevron-down'
                            : 'unfold'
                        }
                        size={24}
                      />
                    </button>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedIndexes.map((rowIndex) => {
            const row = data[rowIndex]
            const isSelected = currentSelected.includes(rowIndex)
            return (
              <tr
                key={rowIndex}
                className={isSelected && !zebra ? 'and-table__tr--select' : undefined}
              >
                {selectable && (
                  <td className="and-table__td and-table__check-cell">
                    <Checkbox
                      checked={isSelected}
                      onChange={(checked) =>
                        commitSelection(
                          checked
                            ? [...currentSelected, rowIndex]
                            : currentSelected.filter((i) => i !== rowIndex),
                        )
                      }
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`and-table__td${alignTdClass(col.align)}`}
                  >
                    {col.render
                      ? col.render(row, rowIndex)
                      : (row[col.key] as ReactNode)}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
