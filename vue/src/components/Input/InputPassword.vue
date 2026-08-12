<script setup lang="ts">
import { ref } from 'vue'
import './Input.css'
import Input from './Input.vue'
import { Icon } from '../Icon'

/*
 * InputPassword — variante de contraseña del Input: icono eye-outline
 * que alterna entre ocultar (type password) y mostrar (type text) el
 * contenido del campo. Soporta v-model y las mismas props del Input.
 */

interface InputPasswordProps {
  /** Etiqueta flotante (Figma: "Texto Label"). */
  label: string
  /** Texto de asistencia inferior (Figma: "Texto Asistencia"). */
  assist?: string
  /** Tamaño (Figma: Form-SM/MD/LG). */
  size?: 'sm' | 'md' | 'lg'
  /** Estado de error. */
  error?: boolean | string
  disabled?: boolean
  readonly?: boolean
}

const props = withDefaults(defineProps<InputPasswordProps>(), {
  assist: undefined,
  size: 'md',
  error: false,
  disabled: false,
  readonly: false,
})

const model = defineModel<string>({ default: '' })
const visible = ref(false)
</script>

<template>
  <Input
    v-model="model"
    :label="props.label"
    :assist="props.assist"
    :size="props.size"
    :error="props.error"
    :disabled="props.disabled"
    :readonly="props.readonly"
    :type="visible ? 'text' : 'password'"
  >
    <template #icon>
      <button
        type="button"
        class="and-input__icon"
        :aria-label="visible ? 'Ocultar contraseña' : 'Mostrar contraseña'"
        :aria-pressed="visible"
        @click="visible = !visible"
      >
        <Icon :name="visible ? 'eye-off-outline' : 'eye-outline'" :size="24" />
      </button>
    </template>
  </Input>
</template>
