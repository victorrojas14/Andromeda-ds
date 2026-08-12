<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import Button from '../Button/Button.vue'
import Calendar from '../Calendar/Calendar.vue'
import {
  countBusinessDays,
  stripTime,
  toDate,
  toIso,
} from '../Calendar/calendar-utils'
import Icon from '../Icon/Icon.vue'
import './DateTimePicker.css'

/*
 * DateTimePicker — DS Andromeda (Figma: set "TimeLapse Calendar"
 * 13717:51508, página Date Picker). Los dos Form-MD del trigger abren
 * al click la card con dos Calendar (variant primary/secondary),
 * contador de días hábiles y botones Borrar fechas/Aplicar; se cierra
 * al completar el rango, con Aplicar, click fuera o Escape (secuencia
 * "Calendario sin abrir" → "Apertura de calendario" de la
 * documentación). v-model:start / v-model:end con 'YYYY-MM-DD'.
 * Responsivo (<768px columnas apiladas).
 */

interface DateTimePickerProps {
  /** Variante de los calendarios internos (Calendar: Primary flechas / Secondary dropdowns). */
  variant?: 'primary' | 'secondary'
  /** Label del campo inicial (Figma: "Seleccionar fecha de inicio"). */
  startLabel?: string
  /** Label del campo final (Figma: "Seleccionar fecha de fin"). */
  endLabel?: string
  placeholder?: string
  /** Muestra el contador (Figma: "Mostrar días seleccionados?"). */
  showBusinessDays?: boolean
  /** Muestra el botón Aplicar (Figma: "Mostrar botón aplicar"). */
  showApplyButton?: boolean
  applyLabel?: string
  clearLabel?: string
  /** Deshabilita días anteriores a hoy en ambos calendarios. */
  disablePast?: boolean
  /** Renderiza la card abierta desde el inicio. */
  defaultOpen?: boolean
}

const props = withDefaults(defineProps<DateTimePickerProps>(), {
  variant: 'primary',
  startLabel: 'Seleccionar fecha de inicio',
  endLabel: 'Seleccionar fecha de fin',
  placeholder: 'dd/mm/aaaa',
  showBusinessDays: true,
  showApplyButton: true,
  applyLabel: 'Aplicar',
  clearLabel: 'Borrar fechas',
  disablePast: false,
  defaultOpen: false,
})

const startModel = defineModel<string>('start', { default: '' })
const endModel = defineModel<string>('end', { default: '' })

const emit = defineEmits<{
  change: [start: Date | null, end: Date | null]
  apply: [start: Date, end: Date]
  clear: []
}>()

const open = ref(props.defaultOpen)
const rootRef = ref<HTMLElement | null>(null)

const startDate = computed(() => toDate(startModel.value || null))
const endDate = computed(() => toDate(endModel.value || null))

const base = startDate.value ?? stripTime(new Date())
const leftView = ref<[number, number]>([base.getFullYear(), base.getMonth()])
const rightBase = new Date(base.getFullYear(), base.getMonth() + 1, 1)
const rightView = ref<[number, number]>([rightBase.getFullYear(), rightBase.getMonth()])

const onPointerDown = (e: PointerEvent) => {
  if (!rootRef.value?.contains(e.target as Node)) open.value = false
}
const onKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') open.value = false
}

watch(open, (isOpen) => {
  if (isOpen) {
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
  } else {
    document.removeEventListener('pointerdown', onPointerDown)
    document.removeEventListener('keydown', onKeyDown)
  }
}, { immediate: true })

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onPointerDown)
  document.removeEventListener('keydown', onKeyDown)
})

const commit = (s: Date | null, e: Date | null) => {
  startModel.value = s ? toIso(s) : ''
  endModel.value = e ? toIso(e) : ''
  emit('change', s, e)
}

const pick = (date: Date) => {
  if (!startDate.value || date < startDate.value) {
    commit(date, endDate.value && date < endDate.value ? endDate.value : null)
  } else if (!endDate.value) {
    commit(startDate.value, date)
    open.value = false // rango completo: se cierra el calendario
  } else {
    commit(date, null)
  }
}

const complete = computed(() => !!startDate.value && !!endDate.value)
const businessDays = computed(() =>
  complete.value ? countBusinessDays(startDate.value as Date, endDate.value as Date) : 0,
)

const startActive = computed(() => open.value && !startDate.value && !endDate.value)
const endActive = computed(() => open.value && !!startDate.value && !endDate.value)

const formatDate = (date: Date | null) =>
  date
    ? `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`
    : null

const toggleOpen = () => {
  open.value = !open.value
}

const onClear = () => {
  commit(null, null)
  emit('clear')
}

const onApply = () => {
  if (!complete.value) return
  emit('apply', startDate.value as Date, endDate.value as Date)
  open.value = false
}
</script>

<template>
  <div ref="rootRef" class="and-dtp">
    <div class="and-dtp__fields">
      <div
        class="and-dtp__trigger-col"
        role="button"
        tabindex="0"
        aria-haspopup="dialog"
        :aria-expanded="open"
        @click="toggleOpen"
        @keydown.enter.prevent="toggleOpen"
        @keydown.space.prevent="toggleOpen"
      >
        <div :class="['and-dtp__field', (startDate || startActive) && 'and-dtp__field--float']">
          <span class="and-dtp__label">{{ startLabel }}</span>
          <span class="and-dtp__value">
            {{ formatDate(startDate) ?? (startActive ? placeholder : '') }}
          </span>
          <span class="and-dtp__field-icon">
            <Icon name="calendar-month-outline" :size="24" />
          </span>
        </div>
        <div :class="['and-dtp__line', startActive && 'and-dtp__line--active']" />
      </div>
      <div
        class="and-dtp__trigger-col"
        role="button"
        tabindex="0"
        aria-haspopup="dialog"
        :aria-expanded="open"
        @click="toggleOpen"
        @keydown.enter.prevent="toggleOpen"
        @keydown.space.prevent="toggleOpen"
      >
        <div :class="['and-dtp__field', (endDate || endActive) && 'and-dtp__field--float']">
          <span class="and-dtp__label">{{ endLabel }}</span>
          <span class="and-dtp__value">
            {{ formatDate(endDate) ?? (endActive ? placeholder : '') }}
          </span>
          <span class="and-dtp__field-icon">
            <Icon name="calendar-month-outline" :size="24" />
          </span>
        </div>
        <div :class="['and-dtp__line', endActive && 'and-dtp__line--active']" />
      </div>
    </div>
    <div v-if="open" class="and-dtp__panel" role="dialog" :aria-label="startLabel">
      <div class="and-dtp__columns">
        <div class="and-dtp__column">
          <div :class="['and-dtp__field', (startDate || startActive) && 'and-dtp__field--float']">
            <span class="and-dtp__label">{{ startLabel }}</span>
            <span class="and-dtp__value">
              {{ formatDate(startDate) ?? (startActive ? placeholder : '') }}
            </span>
            <span class="and-dtp__field-icon">
              <Icon name="calendar-month-outline" :size="24" />
            </span>
          </div>
          <div :class="['and-dtp__line', startActive && 'and-dtp__line--active']" />
          <Calendar
            :variant="variant"
            model-value=""
            :year="leftView[0]"
            :month="leftView[1]"
            :range-start="startDate"
            :range-end="endDate"
            :disable-past="disablePast"
            @view-change="(y, m) => (leftView = [y, m])"
            @change="pick"
          />
        </div>
        <div class="and-dtp__column">
          <div :class="['and-dtp__field', (endDate || endActive) && 'and-dtp__field--float']">
            <span class="and-dtp__label">{{ endLabel }}</span>
            <span class="and-dtp__value">
              {{ formatDate(endDate) ?? (endActive ? placeholder : '') }}
            </span>
            <span class="and-dtp__field-icon">
              <Icon name="calendar-month-outline" :size="24" />
            </span>
          </div>
          <div :class="['and-dtp__line', endActive && 'and-dtp__line--active']" />
          <Calendar
            :variant="variant"
            model-value=""
            :year="rightView[0]"
            :month="rightView[1]"
            :range-start="startDate"
            :range-end="endDate"
            :disable-past="disablePast"
            @view-change="(y, m) => (rightView = [y, m])"
            @change="pick"
          />
        </div>
      </div>
      <div class="and-dtp__footer">
        <span class="and-dtp__count">
          {{ showBusinessDays && complete ? `${businessDays} días hábiles` : '' }}
        </span>
        <Button variant="primary" appearance="ghost" size="sm" @click="onClear">
          {{ clearLabel }}
        </Button>
        <Button
          v-if="showApplyButton"
          variant="primary"
          appearance="solid"
          size="sm"
          :disabled="!complete"
          @click="onApply"
        >
          {{ applyLabel }}
        </Button>
      </div>
    </div>
  </div>
</template>
