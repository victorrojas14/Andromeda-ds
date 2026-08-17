<script setup lang="ts">
import { computed } from 'vue'
import Button from '../Button/Button.vue'
import Icon from '../Icon/Icon.vue'
import type { AndIconName } from '../Icon/icons'
import './InfoBox.css'

/*
 * InfoBox — mensaje contextual del DS Andromeda (Figma: página
 * Infobox, set "Info Box" 14524:69295 con Título, Descripción y Type).
 * Card blanca con barra izquierda de 10px e icono del color de la
 * variante; comunica niveles de importancia sin interrumpir el flujo:
 * Legal o de riesgo (morado), Regla de negocio (primary-light),
 * Interacción & funcionalidad (info), Nota general (gray-400),
 * Acuerdo de diseño (warning) y Definición de desarrollo (naranja).
 * Responsivo: ocupa el 100% del contenedor.
 */

/** Tipos del Info Box (Figma: variante "Type"). */
export type InfoBoxType =
  | 'legal'
  | 'negocio'
  | 'interaccion'
  | 'nota'
  | 'diseno'
  | 'desarrollo'

interface InfoBoxProps {
  /** Tipo del infobox (Figma: Type; define el color de la barra y el icono). */
  type?: InfoBoxType
  /** Título (Figma: "Título"). */
  title?: string
  /** Descripción (Figma: "Descripción"). */
  description?: string
  /** Icono de 24 del registro del DS (default según el tipo). */
  icon?: AndIconName
  /** Oculta el icono. */
  showIcon?: boolean
  /** Texto del CTA/Link (Button ghost-secondary SM del DS). */
  ctaLabel?: string
  /** Oculta el CTA. */
  showCta?: boolean
}

const props = withDefaults(defineProps<InfoBoxProps>(), {
  type: 'legal',
  title: 'Título',
  description: 'Descripción del infobox',
  icon: undefined,
  showIcon: true,
  ctaLabel: 'CTA/Link',
  showCta: true,
})

const emit = defineEmits<{
  cta: []
}>()

/** Icono default por tipo (los del set de Figma). */
const TYPE_ICON: Record<InfoBoxType, AndIconName> = {
  legal: 'strategy',
  negocio: 'bank-outline',
  interaccion: 'tap',
  nota: 'outline-push-pin',
  diseno: 'utilities',
  desarrollo: 'unfold',
}

const iconName = computed(() => props.icon ?? TYPE_ICON[props.type])
</script>

<template>
  <div :class="['and-infobox', type !== 'legal' && `and-infobox--${type}`]">
    <div class="and-infobox__content">
      <div class="and-infobox__text">
        <div class="and-infobox__header">
          <span class="and-infobox__title">
            <slot name="title">{{ title }}</slot>
          </span>
          <span v-if="showIcon" class="and-infobox__icon" aria-hidden="true">
            <Icon :name="iconName" :size="24" />
          </span>
        </div>
        <span class="and-infobox__description">
          <slot>{{ description }}</slot>
        </span>
      </div>
      <Button
        v-if="showCta"
        variant="secondary"
        appearance="ghost"
        size="sm"
        @click="emit('cta')"
      >
        {{ ctaLabel }}
      </Button>
    </div>
  </div>
</template>
