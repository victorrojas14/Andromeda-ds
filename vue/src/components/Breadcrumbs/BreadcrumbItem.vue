<script setup lang="ts">
import { computed } from 'vue'
import './Breadcrumbs.css'
import { Icon } from '../Icon'

/*
 * BreadcrumbItem — item de la miga (Figma: component set "Breadcrumbs"):
 * separador chevron-right opcional + texto Regular. Los items
 * navegables van en Active (primario subrayado, con link); el último
 * (página actual) va en Default: color `body`, sin link.
 */

interface BreadcrumbItemProps {
  /**
   * Item navegable (Figma: Estado Active): primario con subrayado.
   * El último item (la página actual) va sin `active` y sin `href`:
   * texto en `body`, sin link y con `aria-current="page"`.
   */
  active?: boolean
  /** Muestra el separador chevron-right (Figma: "Mostrar Icono"). */
  icon?: boolean
  /** Destino del link; sin href se renderiza como texto. */
  href?: string
}

const props = withDefaults(defineProps<BreadcrumbItemProps>(), {
  active: false,
  icon: true,
  href: undefined,
})

const isLink = computed(() => Boolean(props.href))
const classes = computed(() => ['and-breadcrumb', props.active && 'and-breadcrumb--active'])
</script>

<template>
  <component
    :is="isLink ? 'a' : 'span'"
    :class="classes"
    :href="isLink ? href : undefined"
    :aria-current="!isLink && !active ? 'page' : undefined"
  >
    <span v-if="icon" class="and-breadcrumb__icon" aria-hidden="true">
      <Icon name="chevron-right" :size="24" />
    </span>
    <span class="and-breadcrumb__label"><slot /></span>
  </component>
</template>
