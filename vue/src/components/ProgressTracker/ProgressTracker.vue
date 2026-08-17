<script setup lang="ts">
import { computed, ref } from 'vue'
import './ProgressTracker.css'

/*
 * ProgressTracker — barra de progreso del DS Andromeda (Figma: página
 * Progress Tracker — átomo Puntero 1383:838, molécula BasicProgress
 * 1114:5032 y organismo "Límite de crédito" 1135:5344). Full width:
 * la pista, el puntero y el tooltip se posicionan por porcentaje y se
 * ajustan a cualquier resolución. El Puntero se puede arrastrar con el
 * mouse (o mover con las flechas del teclado) y la información
 * derivada con formatTooltip/formatLeft/formatRight se actualiza en
 * vivo según la posición. v-model con el valor; todas las partes
 * (tooltip, texto superior y saldos) son ocultables por props.
 */

interface ProgressTrackerProps {
  /** Valor máximo (100 por defecto). */
  max?: number
  /** Permite arrastrar el Puntero con el mouse (true por defecto). */
  draggable?: boolean
  /** Estado Active del Puntero (halo tertiary al 30%). */
  active?: boolean
  /** Texto del tooltip superior (Figma: "Tooltip"). */
  tooltip?: string
  /** Muestra el tooltip (Figma: "Mostrar tooltip"). */
  showTooltip?: boolean
  /** Texto superior (Figma: "Limite credito"). */
  limitText?: string
  /** Muestra el texto superior (Figma: "Mostrar texto top"). */
  showLimitText?: boolean
  /** Etiqueta del saldo izquierdo. */
  leftLabel?: string
  /** Valor del saldo izquierdo (Figma: "Saldo"). */
  leftValue?: string
  /** Muestra el bloque izquierdo (Figma: "Mostrar texto Izq"). */
  showLeft?: boolean
  /** Etiqueta del saldo derecho. */
  rightLabel?: string
  /** Valor del saldo derecho (Figma: "Disponible"). */
  rightValue?: string
  /** Muestra el bloque derecho (Figma: "Mostrar texto der"). */
  showRight?: boolean
  /** Deriva el texto del tooltip del valor actual (se actualiza al arrastrar). */
  formatTooltip?: (value: number, max: number) => string
  /** Deriva el valor izquierdo del valor actual (se actualiza al arrastrar). */
  formatLeft?: (value: number, max: number) => string
  /** Deriva el valor derecho del valor actual (se actualiza al arrastrar). */
  formatRight?: (value: number, max: number) => string
}

const props = withDefaults(defineProps<ProgressTrackerProps>(), {
  max: 100,
  draggable: true,
  active: false,
  tooltip: '$50,000.00',
  showTooltip: true,
  limitText: 'Límite de crédito: $200,000.00',
  showLimitText: true,
  leftLabel: 'Saldo al día',
  leftValue: '$145,000.00',
  showLeft: true,
  rightLabel: 'Disponible',
  rightValue: '$55,000.00',
  showRight: true,
  formatTooltip: undefined,
  formatLeft: undefined,
  formatRight: undefined,
})

/** Valor actual (Figma: posición del Puntero). */
const model = defineModel<number>({ default: 25 })

const emit = defineEmits<{
  change: [value: number]
}>()

const trackRef = ref<HTMLDivElement>()
const dragging = ref(false)

const safeMax = computed(() => props.max || 1)
const percent = computed(() =>
  Math.min(100, Math.max(0, (model.value / safeMax.value) * 100)),
)

const tooltipText = computed(() =>
  props.formatTooltip
    ? props.formatTooltip(model.value, safeMax.value)
    : props.tooltip,
)
const leftText = computed(() =>
  props.formatLeft ? props.formatLeft(model.value, safeMax.value) : props.leftValue,
)
const rightText = computed(() =>
  props.formatRight
    ? props.formatRight(model.value, safeMax.value)
    : props.rightValue,
)

const setValue = (next: number) => {
  const clamped = Math.min(safeMax.value, Math.max(0, next))
  model.value = clamped
  emit('change', clamped)
}

const valueFromPointer = (e: PointerEvent) => {
  const rect = trackRef.value?.getBoundingClientRect()
  if (!rect || rect.width === 0) return
  const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width))
  setValue(Math.round(ratio * safeMax.value))
}

const onPointerDown = (e: PointerEvent) => {
  if (!props.draggable) return
  dragging.value = true
  try {
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  } catch {
    /* eventos sintéticos sin pointerId válido */
  }
  valueFromPointer(e)
}

const onPointerMove = (e: PointerEvent) => {
  if (dragging.value) valueFromPointer(e)
}

const stopDrag = () => {
  dragging.value = false
}

const onKeyDown = (e: KeyboardEvent) => {
  if (!props.draggable) return
  const step = Math.max(1, Math.round(safeMax.value / 100))
  if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
    e.preventDefault()
    setValue(model.value + step)
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
    e.preventDefault()
    setValue(model.value - step)
  }
}
</script>

<template>
  <div class="and-progress">
    <div class="and-progress__top">
      <div v-if="showTooltip" class="and-progress__tooltip-wrap" aria-hidden="true">
        <div class="and-progress__tooltip" :style="{ left: `${percent}%` }">
          {{ tooltipText }}
        </div>
      </div>
      <div v-if="showLimitText" class="and-progress__limit">{{ limitText }}</div>
      <div
        ref="trackRef"
        :class="[
          'and-progress__track-wrap',
          draggable && 'and-progress__track-wrap--drag',
          dragging && 'and-progress__track-wrap--dragging',
        ]"
        :role="draggable ? 'slider' : 'progressbar'"
        :tabindex="draggable ? 0 : undefined"
        :aria-valuenow="model"
        :aria-valuemin="0"
        :aria-valuemax="max"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="stopDrag"
        @pointercancel="stopDrag"
        @keydown="onKeyDown"
      >
        <div class="and-progress__track" />
        <div class="and-progress__fill" :style="{ width: `${percent}%` }" />
        <div
          :class="['and-progress__pointer', active && 'and-progress__pointer--active']"
          :style="{ left: `${percent}%` }"
        />
      </div>
    </div>
    <div v-if="showLeft || showRight" class="and-progress__saldos">
      <div v-if="showLeft" class="and-progress__saldo">
        <span>{{ leftLabel }}</span>
        <span class="and-progress__saldo-valor">{{ leftText }}</span>
      </div>
      <div v-if="showRight" class="and-progress__saldo and-progress__saldo--der">
        <span>{{ rightLabel }}</span>
        <span class="and-progress__saldo-valor">{{ rightText }}</span>
      </div>
    </div>
  </div>
</template>
