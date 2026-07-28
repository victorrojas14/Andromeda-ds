<script setup lang="ts">
import { computed, ref, useId, useSlots, watch } from 'vue'
import './Accordion.css'
import { Icon } from '../Icon'

/*
 * Accordion — acordeón del DS Andromeda (Figma: component set
 * "Acordeon"). Header blanco con título, icono opcional (slot #icon),
 * acción opcional (slot #action) y chevron; panel de contenido (slot
 * default) sobre fondo neutro. Soporta v-model:open o defaultOpen.
 */

interface AccordionProps {
  /** Título del header (Figma: "Texto Titulo"). */
  title: string
  /** Variante de tamaño (Figma: Size Desktop/Mobile). */
  size?: 'desktop' | 'mobile'
  /** Estado abierto (controlado vía v-model:open). */
  open?: boolean
  /** Estado inicial (no controlado). */
  defaultOpen?: boolean
}

const props = withDefaults(defineProps<AccordionProps>(), {
  size: 'desktop',
  open: undefined,
  defaultOpen: false,
})

const emit = defineEmits<{ (e: 'update:open', value: boolean): void }>()

const slots = useSlots()
const internalOpen = ref(props.defaultOpen)
watch(
  () => props.open,
  (value) => {
    if (value !== undefined) internalOpen.value = value
  },
)

const isOpen = computed(() => (props.open !== undefined ? props.open : internalOpen.value))
const panelId = useId()

function toggle() {
  const next = !isOpen.value
  if (props.open === undefined) internalOpen.value = next
  emit('update:open', next)
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    toggle()
  }
}

const classes = computed(() => [
  'and-accordion',
  props.size === 'mobile' && 'and-accordion--mobile',
])
</script>

<template>
  <div :class="classes">
    <div
      class="and-accordion__header"
      role="button"
      tabindex="0"
      :aria-expanded="isOpen"
      :aria-controls="panelId"
      @click="toggle"
      @keydown="onKeydown"
    >
      <div class="and-accordion__lead">
        <span v-if="slots.icon" class="and-accordion__lead-icon" aria-hidden="true">
          <slot name="icon" />
        </span>
        <span class="and-accordion__title">{{ title }}</span>
        <span v-if="slots.action" class="and-accordion__action" @click.stop>
          <slot name="action" />
        </span>
      </div>
      <span class="and-accordion__chevron" aria-hidden="true">
        <Icon :name="isOpen ? 'chevron-up' : 'chevron-down'" :size="24" />
      </span>
    </div>
    <div v-if="isOpen" :id="panelId" class="and-accordion__panel" role="region">
      <slot />
    </div>
  </div>
</template>
