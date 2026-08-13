<script setup lang="ts">
import { computed } from 'vue'
import './Controls.css'

/*
 * RadioButton — DS Andromeda (Figma: set "RadioButton" 576:6657).
 * Círculo de 20px con punto tertiary de 12px en área de 32px + texto
 * opcional de 16px (secondary-dark). Estados On/Off/On-Disabled/
 * Off-Disabled. v-model con el `value` del radio seleccionado (uso en
 * grupo) — con `value` omitido funciona como booleano.
 */

interface RadioButtonProps {
  /** Texto a la derecha (Figma: "Texto"; omitirlo = "Mostrar Texto" off). */
  label?: string
  /** Valor del radio dentro del grupo (v-model = value seleccionado). */
  value?: string
  /** Nombre del grupo de radios nativo. */
  name?: string
  /** Figma: Estados On-Disabled / Off-Disabled. */
  disabled?: boolean
}

const props = withDefaults(defineProps<RadioButtonProps>(), {
  label: undefined,
  value: undefined,
  name: undefined,
  disabled: false,
})

const model = defineModel<string | boolean>({ default: false })

const emit = defineEmits<{
  change: [value: string | boolean]
}>()

const isOn = computed(() =>
  props.value !== undefined ? model.value === props.value : model.value === true,
)

const classes = computed(() => [
  'and-control',
  'and-radio',
  isOn.value && 'and-radio--checked',
  props.disabled && 'and-control--disabled and-radio--disabled',
])

const onInput = () => {
  model.value = props.value !== undefined ? props.value : true
  emit('change', model.value)
}
</script>

<template>
  <label :class="classes">
    <input
      type="radio"
      class="and-control__input"
      :checked="isOn"
      :name="name"
      :value="value"
      :disabled="disabled"
      @change="onInput"
    />
    <span class="and-control__box" aria-hidden="true">
      <span class="and-radio__mark">
        <span v-if="isOn" class="and-radio__dot" />
      </span>
    </span>
    <span v-if="label" class="and-control__label">{{ label }}</span>
  </label>
</template>
