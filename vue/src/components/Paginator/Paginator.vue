<script setup lang="ts">
import { computed } from 'vue'
import Icon from '../Icon/Icon.vue'
import './Paginator.css'

/*
 * Paginator — DS Andromeda (Figma: sets "Paginador" 3574:815,
 * "NumerosPaginador-1" 175:4701 y "NumerosPaginador-2" 175:4758,
 * página Pagination 9402:4876). Texto "Mostrando N de M páginas"
 * (ocultable) + controles: primera/anterior (iconos), Ant., números
 * (el activo con fondo primary), Sig. y siguiente/última. Responsivo:
 * en <768px botones de 28px y texto abajo centrado (Size=Mobile).
 * v-model con la página actual (1-based).
 */

interface PaginatorProps {
  /** Total de páginas. */
  pageCount: number
  /** Muestra el texto "Mostrando N de M páginas" (Figma: "Mostrar Texto Izq"). */
  showText?: boolean
  /** Texto de la izquierda; recibe página actual y total. */
  text?: (page: number, pageCount: number) => string
  /** Cantidad máxima de números visibles. */
  maxButtons?: number
  prevLabel?: string
  nextLabel?: string
}

const props = withDefaults(defineProps<PaginatorProps>(), {
  showText: true,
  text: (p: number, total: number) => `Mostrando ${p} de ${total} páginas`,
  maxButtons: 3,
  prevLabel: 'Ant.',
  nextLabel: 'Sig.',
})

const model = defineModel<number>({ default: 1 })

const emit = defineEmits<{
  change: [page: number]
}>()

const go = (target: number) => {
  const next = Math.min(Math.max(target, 1), props.pageCount)
  if (next === model.value) return
  model.value = next
  emit('change', next)
}

const pages = computed(() => {
  const start = Math.min(
    Math.max(model.value - Math.floor(props.maxButtons / 2), 1),
    Math.max(props.pageCount - props.maxButtons + 1, 1),
  )
  return Array.from(
    { length: Math.min(props.maxButtons, props.pageCount) },
    (_, i) => start + i,
  )
})

const atFirst = computed(() => model.value <= 1)
const atLast = computed(() => model.value >= props.pageCount)
</script>

<template>
  <nav class="and-paginator" aria-label="Paginación">
    <span v-if="showText" class="and-paginator__text">
      {{ text(model, pageCount) }}
    </span>
    <div class="and-paginator__controls">
      <button
        type="button"
        class="and-paginator__nav"
        aria-label="Primera página"
        :disabled="atFirst"
        @click="go(1)"
      >
        <Icon name="arrow-collapse-left" :size="24" />
      </button>
      <button
        type="button"
        class="and-paginator__nav"
        aria-label="Página anterior"
        :disabled="atFirst"
        @click="go(model - 1)"
      >
        <Icon name="chevron-left" :size="24" />
      </button>
      <button
        type="button"
        class="and-paginator__page and-paginator__page--label"
        :disabled="atFirst"
        @click="go(model - 1)"
      >
        {{ prevLabel }}
      </button>
      <button
        v-for="p in pages"
        :key="p"
        type="button"
        :class="['and-paginator__page', p === model && 'and-paginator__page--active']"
        :aria-current="p === model ? 'page' : undefined"
        @click="go(p)"
      >
        {{ p }}
      </button>
      <button
        type="button"
        class="and-paginator__page and-paginator__page--label"
        :disabled="atLast"
        @click="go(model + 1)"
      >
        {{ nextLabel }}
      </button>
      <button
        type="button"
        class="and-paginator__nav"
        aria-label="Página siguiente"
        :disabled="atLast"
        @click="go(model + 1)"
      >
        <Icon name="chevron-right" :size="24" />
      </button>
      <button
        type="button"
        class="and-paginator__nav"
        aria-label="Última página"
        :disabled="atLast"
        @click="go(pageCount)"
      >
        <Icon name="arrow-collapse-right" :size="24" />
      </button>
    </div>
  </nav>
</template>
