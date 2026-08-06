<script setup lang="ts">
import './PillNew.css'

/*
 * PillNew — etiqueta "Nuevo" del DS Andromeda (Figma: "Pill new"):
 * pill de 15px con fondo bg-now, borde gray-100, punto y texto en
 * Info. Se usa para marcar elementos nuevos, por ejemplo anclada a
 * la esquina de un tab. El slot default reemplaza el texto (en Figma
 * es fijo "Nuevo").
 */
</script>

<template>
  <span class="and-pill-new">
    <span class="and-pill-new__dot-box" aria-hidden="true">
      <span class="and-pill-new__dot" />
    </span>
    <span class="and-pill-new__label"><slot>Nuevo</slot></span>
  </span>
</template>
