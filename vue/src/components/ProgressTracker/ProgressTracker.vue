<script setup lang="ts">
import { computed } from 'vue'
import './ProgressTracker.css'

/*
 * ProgressTracker — barra de progreso del DS Andromeda (Figma: página
 * Progress Tracker — átomo Puntero 1383:838, molécula BasicProgress
 * 1114:5032 y organismo "Límite de crédito" 1135:5344). Full width:
 * la pista, el puntero y el tooltip se posicionan por porcentaje y se
 * ajustan a cualquier resolución. Todas las partes (tooltip, texto
 * superior y saldos) son ocultables por props.
 */

interface ProgressTrackerProps {
  /** Valor actual del progreso. */
  value?: number
  /** Valor máximo (100 por defecto). */
  max?: number
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
}

const props = withDefaults(defineProps<ProgressTrackerProps>(), {
  value: 25,
  max: 100,
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
})

const percent = computed(() =>
  Math.min(100, Math.max(0, (props.value / (props.max || 1)) * 100)),
)
</script>

<template>
  <div
    class="and-progress"
    role="progressbar"
    :aria-valuenow="value"
    :aria-valuemin="0"
    :aria-valuemax="max"
  >
    <div class="and-progress__top">
      <div v-if="showTooltip" class="and-progress__tooltip-wrap" aria-hidden="true">
        <div class="and-progress__tooltip" :style="{ left: `${percent}%` }">
          {{ tooltip }}
        </div>
      </div>
      <div v-if="showLimitText" class="and-progress__limit">{{ limitText }}</div>
      <div class="and-progress__track-wrap">
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
        <span class="and-progress__saldo-valor">{{ leftValue }}</span>
      </div>
      <div v-if="showRight" class="and-progress__saldo and-progress__saldo--der">
        <span>{{ rightLabel }}</span>
        <span class="and-progress__saldo-valor">{{ rightValue }}</span>
      </div>
    </div>
  </div>
</template>
