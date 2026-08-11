<script setup lang="ts">
import { computed } from 'vue'
import './ButtonVariants.css'
import { Icon } from '../Icon'

/*
 * ButtonTrade — botones de compra/venta del DS Andromeda (Figma:
 * btn-buy y btn-sell): fondo success (#28A745) o danger-dark
 * (#BD0026) con icono arrow_buy/arrow_sell y texto Medium 16 blanco.
 * En hover o `selected` proyecta la sombra del mismo color.
 */

interface ButtonTradeProps {
  /** Operación (Figma: btn-buy / btn-sell). */
  variant?: 'buy' | 'sell'
  /** Estado seleccionado (Figma: "Selected - hover"). */
  selected?: boolean
}

const props = withDefaults(defineProps<ButtonTradeProps>(), {
  variant: 'buy',
  selected: false,
})

const classes = computed(() => [
  'and-btn-trade',
  `and-btn-trade--${props.variant}`,
  props.selected && 'and-btn-trade--selected',
])
</script>

<template>
  <button type="button" :class="classes" :aria-pressed="selected || undefined">
    <span class="and-btn-trade__icon" aria-hidden="true">
      <Icon :name="variant === 'buy' ? 'arrow_buy' : 'arrow_sell'" :size="24" />
    </span>
    <span class="and-btn-trade__label">
      <slot>{{ variant === 'buy' ? 'Compra' : 'Venta' }}</slot>
    </span>
  </button>
</template>
