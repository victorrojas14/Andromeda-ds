<script setup lang="ts">
import { computed } from 'vue'
import './Logo.css'
import { logos } from './logos'
import type { AndLogoVariant } from './logos'

/*
 * Logo — marcas INVEX del DS Andromeda (fundamento "Marcas Invex" de
 * Figma): Invex, Invex Banco, Invex Fiduciario e Invex Renacer.
 * El color se controla vía currentColor (por defecto Rojo INVEX).
 */

interface LogoProps {
  /** Marca a mostrar. */
  variant?: AndLogoVariant
  /** Alto en px; el ancho se calcula con la proporción natural. */
  height?: number
  /**
   * Envolvente de la marca: fondo Rojo INVEX, logo en blanco y área de
   * seguridad proporcional (según la página "Marcas Invex" de Figma).
   */
  envolvente?: boolean
  /** Texto accesible del logo. */
  title?: string
}

const props = withDefaults(defineProps<LogoProps>(), {
  variant: 'invex',
  height: 40,
  envolvente: false,
  title: 'INVEX',
})

const def = computed(() => logos[props.variant])
const width = computed(() => {
  const [, , vw, vh] = def.value.viewBox.split(' ').map(Number)
  return Math.round((props.height * vw) / vh)
})

// Área de seguridad de Figma: logo 332x101 con padding 40 / ~30
// (≈ 0.4 y 0.3 del alto del logo).
const envolventeStyle = computed(() => ({
  padding: `${Math.round(props.height * 0.3)}px ${Math.round(props.height * 0.4)}px`,
}))
</script>

<template>
  <span v-if="envolvente && def" class="and-logo-envolvente" :style="envolventeStyle">
    <svg
      class="and-logo"
      :width="width"
      :height="height"
      :viewBox="def.viewBox"
      fill="currentColor"
      role="img"
      :aria-label="title"
      v-html="def.body"
    />
  </span>
  <svg
    v-else-if="def"
    class="and-logo"
    :width="width"
    :height="height"
    :viewBox="def.viewBox"
    fill="currentColor"
    role="img"
    :aria-label="title"
    v-html="def.body"
  />
</template>
