<script setup lang="ts">
import { computed, ref, useId, useSlots } from 'vue'
import './Input.css'

/*
 * Input — campo de formulario del DS Andromeda (Figma: Form-SM/MD/LG).
 * Label flotante (en reposo centrada; con foco o valor sube a 12px),
 * borde gray-300 con radios superiores, línea inferior de 2px que
 * cambia por estado (tertiary con foco, danger en error, gray-300 en
 * disabled/readonly) y texto de asistencia opcional. Icono derecho via
 * slot #icon (cualquier icono del DS). Soporta v-model.
 */

interface InputProps {
  /** Etiqueta flotante (Figma: "Texto Label"). */
  label: string
  /** Texto de asistencia inferior (Figma: "Texto Asistencia"). */
  assist?: string
  /** Tamaño (Figma: Form-SM/MD/LG). */
  size?: 'sm' | 'md' | 'lg'
  /**
   * Estado de error (Figma: Estado Error / No llenado). Un string se
   * muestra como texto de asistencia en danger.
   */
  error?: boolean | string
  /** Tipo del input nativo. */
  type?: string
  /** Placeholder nativo (visible solo con la label flotada). */
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
}

const props = withDefaults(defineProps<InputProps>(), {
  assist: undefined,
  size: 'md',
  error: false,
  type: 'text',
  placeholder: undefined,
  disabled: false,
  readonly: false,
})

const model = defineModel<string>({ default: '' })

const slots = useSlots()
const inputId = useId()
const focused = ref(false)

const floated = computed(() => focused.value || String(model.value ?? '').length > 0)

const classes = computed(() => [
  'and-input',
  `and-input--${props.size}`,
  floated.value && 'and-input--float',
  props.error && 'and-input--error',
  props.disabled && 'and-input--disabled',
  props.readonly && !props.disabled && 'and-input--locked',
])

const assistText = computed(() =>
  typeof props.error === 'string' && props.error ? props.error : props.assist,
)
</script>

<template>
  <div :class="classes">
    <div class="and-input__form">
      <div class="and-input__box">
        <label class="and-input__label" :for="inputId">{{ label }}</label>
        <input
          :id="inputId"
          v-model="model"
          class="and-input__control"
          :type="type"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readonly"
          :aria-invalid="error ? true : undefined"
          @focus="focused = true"
          @blur="focused = false"
        />
        <span v-if="slots.icon" class="and-input__icon"><slot name="icon" /></span>
      </div>
      <div class="and-input__line" />
    </div>
    <p v-if="assistText" class="and-input__assist">{{ assistText }}</p>
  </div>
</template>
