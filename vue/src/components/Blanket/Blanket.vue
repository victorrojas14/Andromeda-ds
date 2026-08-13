<script setup lang="ts">
import './Blanket.css'

/*
 * Blanket — DS Andromeda (Figma: página "Blanket con Modal"
 * 9644:42917, variable Color/Neutros/Blanket #000000B2). Overlay que
 * cubre la pantalla (o su contenedor con `fixed=false`) y centra su
 * contenido; lo usa el componente Modal. Emite `close` al hacer click
 * directo sobre el overlay.
 */

interface BlanketProps {
  /** Cubre el viewport (true) o solo su contenedor relativo (false). */
  fixed?: boolean
}

withDefaults(defineProps<BlanketProps>(), {
  fixed: true,
})

const emit = defineEmits<{
  close: []
}>()

const onClick = (e: MouseEvent) => {
  if (e.target === e.currentTarget) emit('close')
}
</script>

<template>
  <div :class="['and-blanket', !fixed && 'and-blanket--contained']" @click="onClick">
    <slot />
  </div>
</template>
