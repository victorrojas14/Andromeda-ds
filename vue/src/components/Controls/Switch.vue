<script setup lang="ts">
import { computed } from 'vue'
import './Controls.css'

/*
 * Switch — DS Andromeda (Figma: sets "Switch atom" 1151:3067 y
 * "Switch" 576:6645). Atom de 40x24 (track tertiary/gray-300 con
 * sombra cards-1, knob blanco de 16px) + texto opcional de 16px.
 * Estados On/Off/On Disabled/Off Disabled (disabled = atom al 50%).
 * v-model booleano.
 */

interface SwitchProps {
  /** Texto a la derecha (Figma: "Texto"; omitirlo = "Mostrar Texto" off). */
  label?: string
  /** Figma: Estados On/Off Disabled (atom al 50%). */
  disabled?: boolean
}

const props = withDefaults(defineProps<SwitchProps>(), {
  label: undefined,
  disabled: false,
})

const model = defineModel<boolean>({ default: false })

const emit = defineEmits<{
  change: [checked: boolean]
}>()

const classes = computed(() => [
  'and-control',
  'and-switch',
  model.value && 'and-switch--on',
  props.disabled && 'and-control--disabled and-switch--disabled',
])

const toggle = () => {
  if (props.disabled) return
  model.value = !model.value
  emit('change', model.value)
}
</script>

<template>
  <label :class="classes">
    <button
      type="button"
      role="switch"
      :aria-checked="model"
      :disabled="disabled"
      class="and-switch__track"
      @click="toggle"
    >
      <span class="and-switch__knob" />
    </button>
    <span v-if="label" class="and-control__label">{{ label }}</span>
  </label>
</template>
