<script setup lang="ts">
import { computed } from 'vue'
import './Stepper.css'

/*
 * Stepper — barra de pasos del DS Andromeda (Figma: página Steppers).
 * Con ≤5 pasos (máximo del diseño numerado) usa los items web "Items
 * Progress Tracker 1/2" en vertical u horizontal; con más de 5 cambia
 * al "Stepper Web + 5" (dots + "Paso # de #" + título). En <768px se
 * ve el diseño mobile: "Stepper Mobile" (círculos de 30px con el
 * título del paso activo) para ≤5 y el aro "Stepper Mobile 2.0" para
 * >5. El color azul (tertiary) o vino (primary) se elige con `color`.
 */

export interface StepperStep {
  /** Texto del paso (Figma: "Texto" / "Titulo"). */
  label: string
}

interface StepperProps {
  /** Pasos del stepper (con más de 5 cambia al diseño "+ 5" de Figma). */
  steps: Array<string | StepperStep>
  /** Índice del paso activo (base 0); los anteriores quedan Completed. */
  active?: number
  /** Orientación en web con ≤5 pasos (Figma: Tracker 2 / Tracker 1). */
  orientation?: 'horizontal' | 'vertical'
  /** Color del stepper: azul (tertiary) o vino (primary). */
  color?: 'azul' | 'vino'
  /** Muestra los textos de los pasos (Figma: "Mostrar Texto"). */
  showLabels?: boolean
}

const props = withDefaults(defineProps<StepperProps>(), {
  active: 0,
  orientation: 'horizontal',
  color: 'azul',
  showLabels: true,
})

const items = computed<StepperStep[]>(() =>
  props.steps.map((s) => (typeof s === 'string' ? { label: s } : s)),
)
const total = computed(() => items.value.length)
const current = computed(() =>
  Math.min(Math.max(props.active, 0), Math.max(total.value - 1, 0)),
)
const activeLabel = computed(() => items.value[current.value]?.label ?? '')
const overFive = computed(() => total.value > 5)

const stateOf = (index: number) =>
  index < current.value ? 'completed' : index === current.value ? 'active' : 'default'

/* Aro del Stepper Mobile 2.0: 90px con grosor 6.3 y puntas redondas. */
const RING_R = (90 - 6.3) / 2
const RING_C = 2 * Math.PI * RING_R
const ringDash = computed(
  () => `${(RING_C * (current.value + 1)) / total.value} ${RING_C}`,
)

/* Check blanco de los pasos Completed (Figma: componente "Check"). */
const CHECK_PATH =
  'M9.09203 19L0 9.99376L2.27301 7.7422L9.09203 14.4969L23.727 0L26 2.25156L9.09203 19Z'
</script>

<template>
  <div :class="['and-stepper', color === 'vino' && 'and-stepper--vino']">
    <!-- Web ≤5: Items Progress Tracker 1 (vertical) / 2 (horizontal) -->
    <div
      v-if="!overFive"
      :class="['and-stepper__web', `and-stepper__web--${orientation}`]"
    >
      <template v-for="(step, i) in items" :key="i">
        <div
          v-if="orientation === 'vertical' && i > 0"
          :class="['and-stepper__vconn', i <= current && 'and-stepper__vconn--done']"
        />
        <div
          :class="[
            'and-stepper__item',
            stateOf(i) !== 'default' && `and-stepper__item--${stateOf(i)}`,
          ]"
          :aria-current="stateOf(i) === 'active' ? 'step' : undefined"
        >
          <span class="and-stepper__circle">
            <svg
              v-if="stateOf(i) === 'completed'"
              width="26"
              height="19"
              viewBox="0 0 26 19"
              fill="none"
              aria-hidden="true"
            >
              <path :d="CHECK_PATH" fill="currentColor" />
            </svg>
            <template v-else>{{ i + 1 }}</template>
          </span>
          <span v-if="showLabels" class="and-stepper__label">{{ step.label }}</span>
        </div>
      </template>
    </div>

    <!-- Web >5: Stepper Web + 5 (dots + Paso # de # + título) -->
    <div v-else class="and-stepper__v2">
      <div class="and-stepper__v2-row">
        <div v-for="(_, i) in items" :key="i" class="and-stepper__v2-item">
          <span
            :class="[
              'and-stepper__dot',
              i < current && 'and-stepper__dot--complete',
              i === current && 'and-stepper__dot--active',
            ]"
          />
          <span
            v-if="i < total - 1"
            :class="['and-stepper__v2-line', i < current && 'and-stepper__v2-line--done']"
          />
        </div>
      </div>
      <div class="and-stepper__v2-textos">
        <span class="and-stepper__v2-paso">Paso {{ current + 1 }} de {{ total }}</span>
        <span v-if="showLabels" class="and-stepper__v2-titulo">{{ activeLabel }}</span>
      </div>
    </div>

    <!-- Mobile ≤5: Stepper Mobile (círculos de 30px + título activo) -->
    <div v-if="!overFive" class="and-stepper__mobile">
      <div class="and-stepper__mobile-row">
        <template v-for="(_, i) in items" :key="i">
          <span
            v-if="i > 0"
            :class="[
              'and-stepper__mobile-conn',
              i <= current && 'and-stepper__mobile-conn--done',
            ]"
          />
          <span
            :class="[
              'and-stepper__mobile-num',
              stateOf(i) !== 'default' && `and-stepper__mobile-num--${stateOf(i)}`,
            ]"
            :aria-current="stateOf(i) === 'active' ? 'step' : undefined"
          >
            <svg
              v-if="stateOf(i) === 'completed'"
              width="17"
              height="12.4"
              viewBox="0 0 26 19"
              fill="none"
              aria-hidden="true"
            >
              <path :d="CHECK_PATH" fill="currentColor" />
            </svg>
            <template v-else>{{ i + 1 }}</template>
          </span>
        </template>
      </div>
      <span v-if="showLabels" class="and-stepper__mobile-label">{{ activeLabel }}</span>
    </div>

    <!-- Mobile >5: Stepper Mobile 2.0 (aro de 90px + # de # + título) -->
    <div v-else class="and-stepper__ring-wrap">
      <div class="and-stepper__ring">
        <svg viewBox="0 0 90 90" aria-hidden="true">
          <circle
            class="and-stepper__ring-track"
            cx="45"
            cy="45"
            :r="RING_R"
            fill="none"
            stroke-width="6.3"
          />
          <circle
            class="and-stepper__ring-progress"
            cx="45"
            cy="45"
            :r="RING_R"
            fill="none"
            stroke-width="6.3"
            stroke-linecap="round"
            :stroke-dasharray="ringDash"
            transform="rotate(-90 45 45)"
          />
        </svg>
        <span class="and-stepper__ring-text">{{ current + 1 }} de {{ total }}</span>
      </div>
      <span v-if="showLabels" class="and-stepper__ring-title">{{ activeLabel }}</span>
    </div>
  </div>
</template>
