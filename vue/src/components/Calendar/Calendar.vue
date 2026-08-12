<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import Icon from '../Icon/Icon.vue'
import {
  CALENDAR_MONTHS,
  CALENDAR_MONTHS_SHORT,
  CALENDAR_WEEKDAYS,
  sameDay,
  stripTime,
  toDate,
  toIso,
  type CalendarValue,
} from './calendar-utils'
import './Calendar.css'

/*
 * Calendar — DS Andromeda (Figma: "Calendario--Form" 128:2669 + set
 * "NumeroCalendario" 9516:6331; documentación Calendar 9516:6174).
 * Primary: flechas y vistas de año/mes al hacer click en el título.
 * Secondary: dropdowns de Mes y Año. Fluido/responsivo (celdas flex).
 * v-model con 'YYYY-MM-DD'.
 */

interface CalendarProps {
  /** Variante de header (Figma: Primary flechas / Secondary dropdowns). */
  variant?: 'primary' | 'secondary'
  /** Mes visible controlado (0-11), junto con year. */
  month?: number
  /** Año visible controlado. */
  year?: number
  /** Deshabilita (gris) los días anteriores a hoy. */
  disablePast?: boolean
  /** Rango: extremos Selected y días intermedios timelapse. */
  rangeStart?: CalendarValue | null
  rangeEnd?: CalendarValue | null
  /** Años del dropdown de la variante secondary. */
  years?: number[]
}

const props = withDefaults(defineProps<CalendarProps>(), {
  variant: 'primary',
  month: undefined,
  year: undefined,
  disablePast: false,
  rangeStart: null,
  rangeEnd: null,
  years: undefined,
})

const model = defineModel<string>({ default: '' })

const emit = defineEmits<{
  change: [date: Date, iso: string]
  viewChange: [year: number, month: number]
}>()

const today = stripTime(new Date())
const selected = computed(() => toDate(model.value || null))
const start = computed(() => toDate(props.rangeStart))
const end = computed(() => toDate(props.rangeEnd))

const initial = selected.value ?? start.value ?? today
const innerYear = ref(initial.getFullYear())
const innerMonth = ref(initial.getMonth())
const viewYear = computed(() => props.year ?? innerYear.value)
const viewMonth = computed(() => props.month ?? innerMonth.value)

const view = ref<'days' | 'months' | 'years'>('days')
const yearsPage = ref(viewYear.value - 15)
const openSelect = ref<'month' | 'year' | null>(null)
const rootRef = ref<HTMLElement | null>(null)

const onPointerDown = (e: PointerEvent) => {
  if (!rootRef.value?.contains(e.target as Node)) openSelect.value = null
}
watch(openSelect, (open) => {
  if (open) document.addEventListener('pointerdown', onPointerDown)
  else document.removeEventListener('pointerdown', onPointerDown)
})
onBeforeUnmount(() => document.removeEventListener('pointerdown', onPointerDown))

const setViewDate = (y: number, m: number) => {
  innerYear.value = y
  innerMonth.value = m
  emit('viewChange', y, m)
}

const onNav = (delta: number) => {
  if (view.value === 'years') yearsPage.value += delta * 16
  else if (view.value === 'months') setViewDate(viewYear.value + delta, viewMonth.value)
  else {
    const d = new Date(viewYear.value, viewMonth.value + delta, 1)
    setViewDate(d.getFullYear(), d.getMonth())
  }
}

const onTitleClick = () => {
  if (view.value === 'days') {
    yearsPage.value = viewYear.value - 15
    view.value = 'years'
  }
}

const selectDay = (day: number) => {
  const date = new Date(viewYear.value, viewMonth.value, day)
  model.value = toIso(date)
  emit('change', date, toIso(date))
}

const yearOptions = computed(
  () =>
    props.years ??
    Array.from({ length: 21 }, (_, i) => today.getFullYear() - 10 + i),
)

const weeks = computed(() => {
  const firstWeekday = new Date(viewYear.value, viewMonth.value, 1).getDay()
  const daysInMonth = new Date(viewYear.value, viewMonth.value + 1, 0).getDate()
  const rows: Array<Array<number | null>> = []
  let row: Array<number | null> = Array.from({ length: firstWeekday }, () => null)
  for (let d = 1; d <= daysInMonth; d++) {
    row.push(d)
    if (row.length === 7) {
      rows.push(row)
      row = []
    }
  }
  if (row.length) {
    while (row.length < 7) row.push(null)
    rows.push(row)
  }
  return rows
})

const isPastDay = (day: number) =>
  props.disablePast && new Date(viewYear.value, viewMonth.value, day) < today

const dayClasses = (day: number) => {
  const date = new Date(viewYear.value, viewMonth.value, day)
  const isSelected =
    sameDay(date, selected.value) || sameDay(date, start.value) || sameDay(date, end.value)
  const inRange = !!start.value && !!end.value && date > start.value && date < end.value
  const isWeekend = date.getDay() === 0 || date.getDay() === 6
  const isPast = isPastDay(day)
  return [
    'and-calendar__cell',
    isPast && 'and-calendar__cell--disabled',
    !isPast && isWeekend && !isSelected && !inRange && 'and-calendar__cell--weekend',
    !isPast && sameDay(date, today) && !isSelected && 'and-calendar__cell--current',
    inRange && !isSelected && 'and-calendar__cell--timelapse',
    isSelected && 'and-calendar__cell--selected',
  ]
}

const title = computed(() =>
  view.value === 'years'
    ? `${yearsPage.value} - ${yearsPage.value + 15}`
    : view.value === 'months'
      ? String(viewYear.value)
      : `${CALENDAR_MONTHS[viewMonth.value].toUpperCase()} ${viewYear.value}`,
)

const monthRows = [0, 1, 2]
const yearRows = [0, 1, 2, 3]
</script>

<template>
  <div ref="rootRef" :class="['and-calendar', `and-calendar--${variant}`]">
    <div v-if="variant === 'primary'" class="and-calendar__header">
      <button type="button" class="and-calendar__nav" aria-label="Anterior" @click="onNav(-1)">
        <Icon name="arrow-left" :size="24" />
      </button>
      <button type="button" class="and-calendar__title" @click="onTitleClick">
        {{ title }}
      </button>
      <button type="button" class="and-calendar__nav" aria-label="Siguiente" @click="onNav(1)">
        <Icon name="arrow-right" :size="24" />
      </button>
    </div>
    <div v-else class="and-calendar__selects">
      <div class="and-calendar__select-wrap">
        <button
          type="button"
          class="and-calendar__select"
          aria-haspopup="listbox"
          :aria-expanded="openSelect === 'month'"
          @click="openSelect = openSelect === 'month' ? null : 'month'"
        >
          {{ CALENDAR_MONTHS[viewMonth] }}
          <Icon name="chevron-down" :size="24" />
        </button>
        <div v-if="openSelect === 'month'" class="and-calendar__select-panel">
          <ul class="and-calendar__select-list" role="listbox" aria-label="Mes">
            <li v-for="(name, i) in CALENDAR_MONTHS" :key="name">
              <button
                type="button"
                role="option"
                :aria-selected="i === viewMonth"
                :class="[
                  'and-calendar__select-option',
                  i === viewMonth && 'and-calendar__select-option--selected',
                ]"
                @click="setViewDate(viewYear, i); openSelect = null"
              >
                {{ name }}
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="and-calendar__select-wrap">
        <button
          type="button"
          class="and-calendar__select"
          aria-haspopup="listbox"
          :aria-expanded="openSelect === 'year'"
          @click="openSelect = openSelect === 'year' ? null : 'year'"
        >
          {{ viewYear }}
          <Icon name="chevron-down" :size="24" />
        </button>
        <div v-if="openSelect === 'year'" class="and-calendar__select-panel">
          <ul class="and-calendar__select-list" role="listbox" aria-label="Año">
            <li v-for="y in yearOptions" :key="y">
              <button
                type="button"
                role="option"
                :aria-selected="y === viewYear"
                :class="[
                  'and-calendar__select-option',
                  y === viewYear && 'and-calendar__select-option--selected',
                ]"
                @click="setViewDate(y, viewMonth); openSelect = null"
              >
                {{ y }}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <template v-if="view === 'days'">
      <div class="and-calendar__row">
        <span
          v-for="d in CALENDAR_WEEKDAYS"
          :key="d"
          class="and-calendar__cell and-calendar__cell--weekday"
        >
          {{ d }}
        </span>
      </div>
      <div v-for="(week, wi) in weeks" :key="wi" class="and-calendar__row">
        <template v-for="(day, di) in week">
          <span v-if="day === null" :key="`b${di}`" class="and-calendar__cell" aria-hidden="true" />
          <button
            v-else
            :key="`d${di}`"
            type="button"
            :class="dayClasses(day)"
            :disabled="isPastDay(day)"
            @click="selectDay(day)"
          >
            {{ day }}
          </button>
        </template>
      </div>
    </template>

    <template v-else-if="view === 'months'">
      <div v-for="row in monthRows" :key="row" class="and-calendar__row">
        <button
          v-for="(name, i) in CALENDAR_MONTHS_SHORT.slice(row * 4, row * 4 + 4)"
          :key="name"
          type="button"
          :class="[
            'and-calendar__cell',
            row * 4 + i === viewMonth && 'and-calendar__cell--selected',
          ]"
          @click="setViewDate(viewYear, row * 4 + i); view = 'days'"
        >
          {{ name }}
        </button>
      </div>
    </template>

    <template v-else>
      <div v-for="row in yearRows" :key="row" class="and-calendar__row">
        <button
          v-for="i in 4"
          :key="i"
          type="button"
          :class="[
            'and-calendar__cell',
            yearsPage + row * 4 + (i - 1) === viewYear && 'and-calendar__cell--selected',
          ]"
          @click="setViewDate(yearsPage + row * 4 + (i - 1), viewMonth); view = 'months'"
        >
          {{ yearsPage + row * 4 + (i - 1) }}
        </button>
      </div>
    </template>
  </div>
</template>
