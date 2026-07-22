<script setup lang="ts">
import { computed } from 'vue'
import './Icon.css'
import { icons } from './icons'
import type { AndIconName } from './icons'

/*
 * Icon — iconografía del DS Andromeda (fundamento "Icons" de Figma).
 * Renderiza el SVG del registro `icons` con fills normalizados a
 * currentColor: el color se controla con la propiedad CSS `color`.
 */

interface IconProps {
  /** Nombre del icono tal como aparece en Figma (ej. "account-outline"). */
  name: AndIconName
  /** Tamaño en px. La librería define 12, 16, 20, 24, 32, 48 y 72. */
  size?: number
  /** Texto accesible. Sin title el icono es decorativo (aria-hidden). */
  title?: string
}

const props = withDefaults(defineProps<IconProps>(), {
  size: 24,
  title: undefined,
})

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

const def = computed(() => icons[props.name])
const html = computed(
  () => (props.title ? `<title>${escapeXml(props.title)}</title>` : '') + def.value.body,
)
</script>

<template>
  <svg
    v-if="def"
    class="and-icon"
    :width="size"
    :height="size"
    :viewBox="def.viewBox"
    fill="currentColor"
    :role="title ? 'img' : undefined"
    :aria-hidden="title ? undefined : 'true'"
    v-html="html"
  />
</template>
