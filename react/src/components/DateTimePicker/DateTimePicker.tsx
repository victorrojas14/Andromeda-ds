import { useState, type HTMLAttributes } from 'react'
import { Button } from '../Button'
import { Calendar, toDate, type CalendarValue } from '../Calendar'
import { Icon } from '../Icon'
import './DateTimePicker.css'

export interface DateTimePickerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Label del campo inicial (Figma: "Seleccionar fecha de inicio") */
  startLabel?: string
  /** Label del campo final (Figma: "Seleccionar fecha de fin") */
  endLabel?: string
  placeholder?: string
  /** Fecha de inicio (controlada; Date o 'YYYY-MM-DD') */
  start?: CalendarValue | null
  /** Fecha de fin (controlada) */
  end?: CalendarValue | null
  defaultStart?: CalendarValue | null
  defaultEnd?: CalendarValue | null
  onChange?: (start: Date | null, end: Date | null) => void
  /** Muestra el contador (Figma: "Mostrar días seleccionados?") */
  showBusinessDays?: boolean
  /** Muestra el botón Aplicar (Figma: "Mostrar botón aplicar") */
  showApplyButton?: boolean
  applyLabel?: string
  clearLabel?: string
  onApply?: (start: Date, end: Date) => void
  onClear?: () => void
  /** Deshabilita días anteriores a hoy en ambos calendarios */
  disablePast?: boolean
}

const formatDate = (date: Date | null) =>
  date
    ? `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`
    : null

/** Días hábiles (lun-vie) del rango, extremos incluidos */
export const countBusinessDays = (start: Date, end: Date): number => {
  let count = 0
  const cursor = new Date(start.getFullYear(), start.getMonth(), start.getDate())
  while (cursor <= end) {
    const dow = cursor.getDay()
    if (dow !== 0 && dow !== 6) count++
    cursor.setDate(cursor.getDate() + 1)
  }
  return count
}

export function DateTimePicker({
  startLabel = 'Seleccionar fecha de inicio',
  endLabel = 'Seleccionar fecha de fin',
  placeholder = 'dd/mm/aaaa',
  start,
  end,
  defaultStart,
  defaultEnd,
  onChange,
  showBusinessDays = true,
  showApplyButton = true,
  applyLabel = 'Aplicar',
  clearLabel = 'Borrar fechas',
  onApply,
  onClear,
  disablePast = false,
  className = '',
  ...rest
}: DateTimePickerProps) {
  const [innerStart, setInnerStart] = useState<Date | null>(toDate(defaultStart))
  const [innerEnd, setInnerEnd] = useState<Date | null>(toDate(defaultEnd))
  const startDate = start !== undefined ? toDate(start) : innerStart
  const endDate = end !== undefined ? toDate(end) : innerEnd

  const base = startDate ?? new Date()
  const [leftView, setLeftView] = useState<[number, number]>([
    base.getFullYear(),
    base.getMonth(),
  ])
  const rightBase = new Date(base.getFullYear(), base.getMonth() + 1, 1)
  const [rightView, setRightView] = useState<[number, number]>([
    rightBase.getFullYear(),
    rightBase.getMonth(),
  ])

  const commit = (s: Date | null, e: Date | null) => {
    if (start === undefined) setInnerStart(s)
    if (end === undefined) setInnerEnd(e)
    onChange?.(s, e)
  }

  const pick = (date: Date) => {
    if (!startDate || date < startDate) commit(date, endDate && date < endDate ? endDate : null)
    else if (!endDate) commit(startDate, date)
    else commit(date, null)
  }

  const complete = !!startDate && !!endDate
  const businessDays = complete
    ? countBusinessDays(startDate as Date, endDate as Date)
    : 0

  const renderField = (label: string, date: Date | null, active: boolean) => {
    const floated = !!date || active
    return (
      <>
        <div className={['and-dtp__field', floated && 'and-dtp__field--float'].filter(Boolean).join(' ')}>
          <span className="and-dtp__label">{label}</span>
          <span className="and-dtp__value">
            {formatDate(date) ?? (floated ? placeholder : '')}
          </span>
          <span className="and-dtp__field-icon">
            <Icon name="calendar-month-outline" size={24} />
          </span>
        </div>
        <div className={['and-dtp__line', active && 'and-dtp__line--active'].filter(Boolean).join(' ')} />
      </>
    )
  }

  const startActive = !startDate && !endDate
  const endActive = !!startDate && !endDate

  return (
    <div className={['and-dtp', className].filter(Boolean).join(' ')} {...rest}>
      <div className="and-dtp__columns">
        <div className="and-dtp__column">
          {renderField(startLabel, startDate, startActive)}
          <Calendar
            variant="primary"
            value={null}
            year={leftView[0]}
            month={leftView[1]}
            onViewChange={(y, m) => setLeftView([y, m])}
            rangeStart={startDate}
            rangeEnd={endDate}
            disablePast={disablePast}
            onChange={(date) => pick(date)}
          />
        </div>
        <div className="and-dtp__column">
          {renderField(endLabel, endDate, endActive)}
          <Calendar
            variant="primary"
            value={null}
            year={rightView[0]}
            month={rightView[1]}
            onViewChange={(y, m) => setRightView([y, m])}
            rangeStart={startDate}
            rangeEnd={endDate}
            disablePast={disablePast}
            onChange={(date) => pick(date)}
          />
        </div>
      </div>
      <div className="and-dtp__footer">
        <span className="and-dtp__count">
          {showBusinessDays && complete ? `${businessDays} días hábiles` : ''}
        </span>
        <Button
          variant="primary"
          appearance="ghost"
          size="sm"
          onClick={() => {
            commit(null, null)
            onClear?.()
          }}
        >
          {clearLabel}
        </Button>
        {showApplyButton && (
          <Button
            variant="primary"
            appearance="solid"
            size="sm"
            disabled={!complete}
            onClick={() => complete && onApply?.(startDate as Date, endDate as Date)}
          >
            {applyLabel}
          </Button>
        )}
      </div>
    </div>
  )
}
