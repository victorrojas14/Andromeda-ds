<script setup lang="ts">
import './Status.css'

/*
 * Status — DS Andromeda (Figma: sets "Item_Estatus_v1" 729:6550 e
 * "Item_Estatus_v2" 11856:307, página Status 11856:341). Punto de 8px
 * + texto de 12px Medium en el color del estado; la variante v2 es
 * una pill con fondo tenue (radio 50, px 10 / py 4). Estados: verde
 * (Éxito/Activo), gris (Inactivo), azul (En progreso), amarillo
 * (Pendiente), rojo (Error), morado (Revisión), naranja (Advertencia
 * leve) y magenta (Personalizado/Especial).
 */

export type StatusEstado =
  | 'verde'
  | 'gris'
  | 'azul'
  | 'amarillo'
  | 'rojo'
  | 'morado'
  | 'naranja'
  | 'magenta'

interface StatusProps {
  /** Estado/color (Figma: Estado de Item_Estatus_v1 / Property 1 de v2). */
  estado?: StatusEstado
  /** Texto del estatus (Figma: "Texto"). */
  text?: string
  /** v1: punto + texto; v2 (pill): con fondo tenue y radio 50. */
  variant?: 'v1' | 'v2'
}

withDefaults(defineProps<StatusProps>(), {
  estado: 'verde',
  text: 'Texto',
  variant: 'v1',
})
</script>

<template>
  <span
    :class="[
      'and-status',
      estado !== 'verde' && `and-status--${estado}`,
      variant === 'v2' && 'and-status--pill',
    ]"
  >
    <span class="and-status__dot" aria-hidden="true" />
    {{ text }}
  </span>
</template>
