<script setup lang="ts">
import './ButtonVariants.css'
import { Icon } from '../Icon'

/*
 * ButtonMisProductos — botón pill del DS Andromeda (Figma:
 * btn/Mis-Productos): fondo secondary-dark con icono
 * view-cozy-rounded, texto Medium 16 blanco (slot default, por
 * defecto "Mis productos") y chevron-down. Hover en negro pleno;
 * Disabled en gray-200 con texto gray-300 (Estados del set; Pressed
 * comparte el estilo Default). Usar el atributo disabled nativo.
 */
</script>

<template>
  <button type="button" class="and-btn-productos">
    <span class="and-btn-productos__icon" aria-hidden="true">
      <Icon name="view-cozy-rounded" :size="24" />
    </span>
    <span class="and-btn-productos__label"><slot>Mis productos</slot></span>
    <span class="and-btn-productos__icon" aria-hidden="true">
      <Icon name="chevron-down" :size="24" />
    </span>
  </button>
</template>
