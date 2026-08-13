<script setup lang="ts">
import { computed } from 'vue'
import './Controls.css'

/*
 * Checkbox — DS Andromeda (Figma: set "CheckBox" 576:6686). Caja de
 * 20px (radius sm) en área de 32px + texto opcional de 16px. Estados
 * On/Off/On-Disabled/Off-Disabled/On-Multiple (mismo visual que On).
 * v-model booleano sobre un input nativo oculto.
 */

interface CheckboxProps {
  /** Texto a la derecha (Figma: "Texto"; omitirlo = "Mostrar Texto" off). */
  label?: string
  /** Figma: Estados On-Disabled / Off-Disabled. */
  disabled?: boolean
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  label: undefined,
  disabled: false,
})

const model = defineModel<boolean>({ default: false })

const emit = defineEmits<{
  change: [checked: boolean]
}>()

const classes = computed(() => [
  'and-control',
  'and-checkbox',
  model.value && 'and-checkbox--checked',
  props.disabled && 'and-control--disabled and-checkbox--disabled',
])

const onInput = (e: Event) => {
  model.value = (e.target as HTMLInputElement).checked
  emit('change', model.value)
}
</script>

<template>
  <label :class="classes">
    <input
      type="checkbox"
      class="and-control__input"
      :checked="model"
      :disabled="disabled"
      @change="onInput"
    />
    <span class="and-control__box" aria-hidden="true">
      <span class="and-checkbox__mark">
        <svg v-if="model" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M2.5 7.5L5.5 10.5L11.5 3.5"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </span>
    <span v-if="label" class="and-control__label">{{ label }}</span>
  </label>
</template>
