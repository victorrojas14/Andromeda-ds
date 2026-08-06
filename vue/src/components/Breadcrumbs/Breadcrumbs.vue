<script setup lang="ts">
import './Breadcrumbs.css'

/*
 * Breadcrumbs — contenedor de miga de pan del DS Andromeda. Apila
 * BreadcrumbItem (slot default) con gap de 10px; el primer item oculta
 * su separador automáticamente. Responsive: en viewport mobile
 * (< 768px) el texto pasa de 16px a 12px, como el diseño Mobile de
 * Figma.
 */
</script>

<template>
  <nav class="and-breadcrumbs" aria-label="Breadcrumb">
    <slot />
  </nav>
</template>
