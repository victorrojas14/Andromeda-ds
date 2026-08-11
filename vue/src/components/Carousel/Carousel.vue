<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import './Carousel.css'
import { Icon } from '../Icon'

/*
 * Carousel — carrusel de imágenes del DS Andromeda (Figma: component
 * set "Carousel"): slide de 400px de alto y ancho fluido, flechas en
 * primario y dots inferiores (Figma: "Ellipse 4"; activo/hover en
 * primario, resto en secondary). Las flechas dan la vuelta al llegar
 * a los extremos. Soporta v-model:index o defaultIndex.
 */

interface CarouselImage {
  /** URL de la imagen del slide. */
  src: string
  /** Texto alternativo del slide. */
  alt?: string
}

interface CarouselProps {
  /** Imágenes del carousel (Figma: variantes Number=Image 1/2/3). */
  images: CarouselImage[]
  /** Índice activo (controlado vía v-model:index). */
  index?: number
  /** Índice inicial (no controlado). */
  defaultIndex?: number
}

const props = withDefaults(defineProps<CarouselProps>(), {
  index: undefined,
  defaultIndex: 0,
})

const emit = defineEmits<{ (e: 'update:index', value: number): void }>()

const internalIndex = ref(props.defaultIndex)
watch(
  () => props.index,
  (value) => {
    if (value !== undefined) internalIndex.value = value
  },
)

const current = computed(() =>
  props.index !== undefined ? props.index : internalIndex.value,
)

function goTo(next: number) {
  const wrapped = (next + props.images.length) % props.images.length
  if (props.index === undefined) internalIndex.value = wrapped
  emit('update:index', wrapped)
}
</script>

<template>
  <div class="and-carousel" role="region" aria-roledescription="carousel">
    <div
      class="and-carousel__track"
      :style="{ transform: `translateX(-${current * 100}%)` }"
    >
      <img
        v-for="(image, i) in images"
        :key="i"
        class="and-carousel__slide"
        :src="image.src"
        :alt="image.alt ?? ''"
        :aria-hidden="i !== current || undefined"
      />
    </div>
    <button
      type="button"
      class="and-carousel__arrow and-carousel__arrow--prev"
      aria-label="Imagen anterior"
      @click="goTo(current - 1)"
    >
      <Icon name="arrow-left" :size="24" />
    </button>
    <button
      type="button"
      class="and-carousel__arrow and-carousel__arrow--next"
      aria-label="Imagen siguiente"
      @click="goTo(current + 1)"
    >
      <Icon name="arrow-right" :size="24" />
    </button>
    <div class="and-carousel__dots">
      <button
        v-for="(_, i) in images"
        :key="i"
        type="button"
        :class="['and-carousel__dot', i === current && 'and-carousel__dot--active']"
        :aria-label="`Ir a la imagen ${i + 1}`"
        :aria-current="i === current || undefined"
        @click="goTo(i)"
      />
    </div>
  </div>
</template>
