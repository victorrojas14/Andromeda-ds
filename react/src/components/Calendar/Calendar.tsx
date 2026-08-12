import { useEffect, useRef, useState, type HTMLAttributes } from 'react'
import { Icon } from '../Icon'
import './Calendar.css'

export type CalendarValue = Date | string

export interface CalendarProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Variante de header (Figma: Primary flechas / Secondary dropdowns) */
  variant?: 'primary' | 'secondary'
  /** Fecha seleccionada (Date o 'YYYY-MM-DD') */
  value?: CalendarValue | null
  defaultValue?: CalendarValue | null
  onChange?: (date: Date, iso: string) => void
  /** Mes visible controlado (0-11), junto con year */
  month?: number
  /** Año visible controlado */
  year?: number
  onViewChange?: (year: number, month: number) => void
  /** Deshabilita (gris) los días anteriores a hoy, como en la documentación */
  disablePast?: boolean
  /** Rango: extremos marcados Selected y días intermedios timelapse */
  rangeStart?: CalendarValue | null
  rangeEnd?: CalendarValue | null
  /** Años disponibles en el dropdown de la variante secondary */
  years?: number[]
}

export const CALENDAR_MONTHS = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
]

const MONTHS_SHORT = [
  'ENE',
  'FEB',
  'MAR',
  'ABR',
  'MAY',
  'JUN',
  'JUL',
  'AGO',
  'SEP',
  'OCT',
  'NOV',
  'DIC',
]

const WEEKDAYS = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']

export const toDate = (value?: CalendarValue | null): Date | null => {
  if (!value) return null
  if (value instanceof Date) return value
  const [y, m, d] = value.split('-').map(Number)
  if (!y || !m || !d) return null
  return new Date(y, m - 1, d)
}

export const toIso = (date: Date): string =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

const sameDay = (a: Date | null, b: Date | null) =>
  !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

const stripTime = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate())

export function Calendar({
  variant = 'primary',
  value,
  defaultValue,
  onChange,
  month,
  year,
  onViewChange,
  disablePast = false,
  rangeStart,
  rangeEnd,
  years,
  className = '',
  ...rest
}: CalendarProps) {
  const today = stripTime(new Date())
  const [innerValue, setInnerValue] = useState<Date | null>(toDate(defaultValue))
  const selected = value !== undefined ? toDate(value) : innerValue
  const start = toDate(rangeStart)
  const end = toDate(rangeEnd)

  const initial = selected ?? start ?? today
  const [innerYear, setInnerYear] = useState(initial.getFullYear())
  const [innerMonth, setInnerMonth] = useState(initial.getMonth())
  const viewYear = year ?? innerYear
  const viewMonth = month ?? innerMonth

  const [view, setView] = useState<'days' | 'months' | 'years'>('days')
  const [yearsPage, setYearsPage] = useState(viewYear - 15)
  const [openSelect, setOpenSelect] = useState<'month' | 'year' | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!openSelect) return
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpenSelect(null)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [openSelect])

  const setViewDate = (y: number, m: number) => {
    setInnerYear(y)
    setInnerMonth(m)
    onViewChange?.(y, m)
  }

  const navigateMonth = (delta: number) => {
    const d = new Date(viewYear, viewMonth + delta, 1)
    setViewDate(d.getFullYear(), d.getMonth())
  }

  const selectDay = (day: number) => {
    const date = new Date(viewYear, viewMonth, day)
    if (value === undefined) setInnerValue(date)
    onChange?.(date, toIso(date))
  }

  const yearOptions =
    years ??
    Array.from({ length: 21 }, (_, i) => today.getFullYear() - 10 + i)

  const firstWeekday = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const weeks: Array<Array<number | null>> = []
  {
    let row: Array<number | null> = Array.from({ length: firstWeekday }, () => null)
    for (let d = 1; d <= daysInMonth; d++) {
      row.push(d)
      if (row.length === 7) {
        weeks.push(row)
        row = []
      }
    }
    if (row.length) {
      while (row.length < 7) row.push(null)
      weeks.push(row)
    }
  }

  const dayClasses = (day: number) => {
    const date = new Date(viewYear, viewMonth, day)
    const isSelected =
      sameDay(date, selected) || sameDay(date, start) || sameDay(date, end)
    const inRange =
      !!start && !!end && date > start && date < end
    const isWeekend = date.getDay() === 0 || date.getDay() === 6
    const isPast = disablePast && date < today
    return {
      isPast,
      className: [
        'and-calendar__cell',
        isPast && 'and-calendar__cell--disabled',
        !isPast && isWeekend && !isSelected && !inRange && 'and-calendar__cell--weekend',
        !isPast && sameDay(date, today) && !isSelected && 'and-calendar__cell--current',
        inRange && !isSelected && 'and-calendar__cell--timelapse',
        isSelected && 'and-calendar__cell--selected',
      ]
        .filter(Boolean)
        .join(' '),
    }
  }

  const title =
    view === 'years'
      ? `${yearsPage} - ${yearsPage + 15}`
      : view === 'months'
        ? String(viewYear)
        : `${CALENDAR_MONTHS[viewMonth].toUpperCase()} ${viewYear}`

  const onTitleClick = () => {
    if (view === 'days') {
      setYearsPage(viewYear - 15)
      setView('years')
    }
  }

  const onNav = (delta: number) => {
    if (view === 'years') setYearsPage((p) => p + delta * 16)
    else if (view === 'months') setViewDate(viewYear + delta, viewMonth)
    else navigateMonth(delta)
  }

  return (
    <div
      ref={rootRef}
      className={['and-calendar', `and-calendar--${variant}`, className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {variant === 'primary' ? (
        <div className="and-calendar__header">
          <button
            type="button"
            className="and-calendar__nav"
            aria-label="Anterior"
            onClick={() => onNav(-1)}
          >
            <Icon name="arrow-left" size={24} />
          </button>
          <button
            type="button"
            className="and-calendar__title"
            onClick={onTitleClick}
          >
            {title}
          </button>
          <button
            type="button"
            className="and-calendar__nav"
            aria-label="Siguiente"
            onClick={() => onNav(1)}
          >
            <Icon name="arrow-right" size={24} />
          </button>
        </div>
      ) : (
        <div className="and-calendar__selects">
          <div className="and-calendar__select-wrap">
            <button
              type="button"
              className="and-calendar__select"
              aria-haspopup="listbox"
              aria-expanded={openSelect === 'month'}
              onClick={() => setOpenSelect(openSelect === 'month' ? null : 'month')}
            >
              {CALENDAR_MONTHS[viewMonth]}
              <Icon name="chevron-down" size={24} />
            </button>
            {openSelect === 'month' && (
              <div className="and-calendar__select-panel">
                <ul className="and-calendar__select-list" role="listbox" aria-label="Mes">
                  {CALENDAR_MONTHS.map((name, i) => (
                    <li key={name}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={i === viewMonth}
                        className={[
                          'and-calendar__select-option',
                          i === viewMonth && 'and-calendar__select-option--selected',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                        onClick={() => {
                          setViewDate(viewYear, i)
                          setOpenSelect(null)
                        }}
                      >
                        {name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="and-calendar__select-wrap">
            <button
              type="button"
              className="and-calendar__select"
              aria-haspopup="listbox"
              aria-expanded={openSelect === 'year'}
              onClick={() => setOpenSelect(openSelect === 'year' ? null : 'year')}
            >
              {viewYear}
              <Icon name="chevron-down" size={24} />
            </button>
            {openSelect === 'year' && (
              <div className="and-calendar__select-panel">
                <ul className="and-calendar__select-list" role="listbox" aria-label="Año">
                  {yearOptions.map((y) => (
                    <li key={y}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={y === viewYear}
                        className={[
                          'and-calendar__select-option',
                          y === viewYear && 'and-calendar__select-option--selected',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                        onClick={() => {
                          setViewDate(y, viewMonth)
                          setOpenSelect(null)
                        }}
                      >
                        {y}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {view === 'days' && (
        <>
          <div className="and-calendar__row">
            {WEEKDAYS.map((d) => (
              <span key={d} className="and-calendar__cell and-calendar__cell--weekday">
                {d}
              </span>
            ))}
          </div>
          {weeks.map((week, wi) => (
            <div key={wi} className="and-calendar__row">
              {week.map((day, di) =>
                day === null ? (
                  <span key={di} className="and-calendar__cell" aria-hidden="true" />
                ) : (
                  (() => {
                    const { isPast, className: cellClass } = dayClasses(day)
                    return (
                      <button
                        key={di}
                        type="button"
                        className={cellClass}
                        disabled={isPast}
                        onClick={() => selectDay(day)}
                      >
                        {day}
                      </button>
                    )
                  })()
                ),
              )}
            </div>
          ))}
        </>
      )}

      {view === 'months' && (
        <>
          {[0, 1, 2].map((row) => (
            <div key={row} className="and-calendar__row">
              {MONTHS_SHORT.slice(row * 4, row * 4 + 4).map((name, i) => {
                const m = row * 4 + i
                return (
                  <button
                    key={name}
                    type="button"
                    className={[
                      'and-calendar__cell',
                      m === viewMonth && 'and-calendar__cell--selected',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => {
                      setViewDate(viewYear, m)
                      setView('days')
                    }}
                  >
                    {name}
                  </button>
                )
              })}
            </div>
          ))}
        </>
      )}

      {view === 'years' && (
        <>
          {[0, 1, 2, 3].map((row) => (
            <div key={row} className="and-calendar__row">
              {[0, 1, 2, 3].map((i) => {
                const y = yearsPage + row * 4 + i
                return (
                  <button
                    key={y}
                    type="button"
                    className={[
                      'and-calendar__cell',
                      y === viewYear && 'and-calendar__cell--selected',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => {
                      setViewDate(y, viewMonth)
                      setView('months')
                    }}
                  >
                    {y}
                  </button>
                )
              })}
            </div>
          ))}
        </>
      )}
    </div>
  )
}
