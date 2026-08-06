<script setup lang="ts">
import { computed } from 'vue'
import './Avatar.css'
import { Icon } from '../Icon'

/*
 * Avatar — avatar circular del DS Andromeda (Figma: component set
 * "Avatar"). El estado se deriva de las props: con `src` muestra la
 * foto, con `initials` las iniciales, y sin ambas el placeholder de
 * "agregar foto" (icono camera-plus-outline; en 200 además el texto
 * "Agregar foto de perfil").
 */

type AvatarSize = 40 | 60 | 100 | 200
type AvatarColor = 'rojo' | 'blanco'

interface AvatarProps {
  /** Tamaño en px (Figma: Size 40/60/100/200). */
  size?: AvatarSize
  /** Esquema de color (Figma: Color Rojo/Blanco). */
  color?: AvatarColor
  /** URL de la foto (Figma: Estado Foto). */
  src?: string
  /** Iniciales a mostrar (Figma: Estado Iniciales), ej. "CM". */
  initials?: string
  /** Texto accesible del avatar (nombre de la persona). */
  alt?: string
}

const props = withDefaults(defineProps<AvatarProps>(), {
  size: 200,
  color: 'rojo',
  src: undefined,
  initials: undefined,
  alt: undefined,
})

const classes = computed(() => [
  'and-avatar',
  `and-avatar--${props.size}`,
  `and-avatar--${props.color}`,
])

const ariaLabel = computed(() => props.alt ?? props.initials ?? 'Avatar')
const iconSize = computed(() => (props.size === 40 ? 20 : 24))
</script>

<template>
  <div :class="classes" role="img" :aria-label="ariaLabel">
    <img v-if="src" class="and-avatar__photo" :src="src" alt="" />
    <span v-else-if="initials" class="and-avatar__initials">{{ initials }}</span>
    <template v-else>
      <span class="and-avatar__placeholder-icon" aria-hidden="true">
        <Icon name="camera-plus-outline" :size="iconSize" />
      </span>
      <span class="and-avatar__label">Agregar foto&#10;de perfil</span>
    </template>
  </div>
</template>
