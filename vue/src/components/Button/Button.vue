<script setup lang="ts">
import { computed, useSlots } from 'vue'

export type ButtonVariant = 'primary' | 'secondary'
export type ButtonAppearance = 'solid' | 'outline' | 'ghost'
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'

interface Props {
  /** Jerarquía visual del botón. */
  variant?: ButtonVariant
  /** Estilo de superficie: relleno, borde o transparente. */
  appearance?: ButtonAppearance
  /** Tamaño del botón. */
  size?: ButtonSize
  /** Desactiva el botón. */
  disabled?: boolean
  /** Muestra un spinner y bloquea el botón. */
  loading?: boolean
  /** Tipo del <button>. Default: 'button'. */
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  appearance: 'solid',
  size: 'md',
  disabled: false,
  loading: false,
  type: 'button',
})

defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const slots = useSlots()

const classes = computed(() => [
  'and-btn',
  `and-btn--${props.appearance}-${props.variant}`,
  `and-btn--size-${props.size}`,
  props.loading && 'and-btn--loading',
])

const isDisabled = computed(() => props.disabled || props.loading)
</script>

<template>
  <button
    :type="type"
    :class="classes"
    :disabled="isDisabled"
    :aria-busy="loading || undefined"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="and-btn__spinner" aria-hidden="true" />
    <span
      v-else-if="slots.leftIcon"
      class="and-btn__icon and-btn__icon--left"
      aria-hidden="true"
    >
      <slot name="leftIcon" />
    </span>

    <span v-if="slots.default" class="and-btn__label">
      <slot />
    </span>

    <span
      v-if="slots.rightIcon && !loading"
      class="and-btn__icon and-btn__icon--right"
      aria-hidden="true"
    >
      <slot name="rightIcon" />
    </span>
  </button>
</template>

<style src="./Button.css"></style>
