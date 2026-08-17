<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import Blanket from '../Blanket/Blanket.vue'
import Button from '../Button/Button.vue'
import Icon from '../Icon/Icon.vue'
import './Token.css'

/*
 * Token — Pop up Token del DS Andromeda (Figma: página Token, set
 * "Token" 8490:6138 con inputs "Inputs-Token" 8490:6181). Modal
 * montado sobre el Blanket con los Buttons del DS. La prop `tipo`
 * define los dígitos: virtual = 6, físico = 8. Validaciones: solo
 * dígitos, avance/retroceso automático de foco, pegado distribuido y
 * Continuar deshabilitado hasta completar el código; `error` pinta el
 * estado Error de Figma. Responsivo: en <768px toma el layout Mobile
 * (350px, botones en columna con Continuar arriba).
 */

/** Tipo de token: virtual = 6 dígitos, físico = 8 dígitos. */
export type TokenTipo = 'virtual' | 'fisico'

interface TokenProps {
  /** Visibilidad del modal. */
  open?: boolean
  /** Tipo del token: "virtual" (6 dígitos) o "fisico" (8 dígitos). */
  tipo?: TokenTipo
  /** Título del modal. */
  title?: string
  /** Link "¿Dónde encuentro este número?". */
  helpLabel?: string
  showHelp?: boolean
  /** Link "¿Necesitas ayuda con tu token?". */
  tokenHelpLabel?: string
  showTokenHelp?: boolean
  /** Texto inferior (Figma: "Contenido"). */
  text?: string
  /** Muestra el texto inferior (Figma: "Añadir texto"). */
  showText?: boolean
  /** Estado Error de los inputs (true o el mensaje a mostrar). */
  error?: boolean | string
  cancelLabel?: string
  continueLabel?: string
  /** Monta el modal sobre el Blanket del DS (false = card inline). */
  blanket?: boolean
}

const props = withDefaults(defineProps<TokenProps>(), {
  open: true,
  tipo: 'virtual',
  title: 'Ingresa el código de tu INVEX Key para continuar',
  helpLabel: '¿Dónde encuentro este número?',
  showHelp: true,
  tokenHelpLabel: '¿Necesitas ayuda con tu token?',
  showTokenHelp: true,
  text: 'Al continuar, deberás volver a iniciar sesión con tu nuevo nombre de usuario.',
  showText: true,
  error: false,
  cancelLabel: 'Cancelar',
  continueLabel: 'Continuar',
  blanket: true,
})

const emit = defineEmits<{
  close: []
  cancel: []
  continue: [code: string]
  change: [code: string]
  help: []
  tokenHelp: []
}>()

const count = computed(() => (props.tipo === 'fisico' ? 8 : 6))
const digits = ref<string[]>(Array(count.value).fill(''))
const inputsRef = ref<HTMLInputElement[]>([])

watch(count, (n) => {
  digits.value = Array(n).fill('')
})

const code = computed(() => digits.value.join(''))
const complete = computed(
  () => digits.value.length === count.value && digits.value.every((d) => d !== ''),
)
const errorMessage = computed(() =>
  typeof props.error === 'string' ? props.error : 'Error',
)

const update = (next: string[]) => {
  digits.value = next
  emit('change', next.join(''))
}

const setDigit = (index: number, e: Event) => {
  const raw = (e.target as HTMLInputElement).value
  const digit = raw.replace(/\D/g, '').slice(-1)
  const next = [...digits.value]
  next[index] = digit
  update(next)
  // fuerza el valor del input (Vue no re-renderiza si el estado no cambió)
  ;(e.target as HTMLInputElement).value = digit
  if (digit && index < count.value - 1) inputsRef.value[index + 1]?.focus()
}

const onKeyDown = (index: number, e: KeyboardEvent) => {
  if (e.key === 'Backspace' && !digits.value[index] && index > 0) {
    e.preventDefault()
    const next = [...digits.value]
    next[index - 1] = ''
    update(next)
    inputsRef.value[index - 1]?.focus()
  } else if (e.key === 'ArrowLeft' && index > 0) {
    e.preventDefault()
    inputsRef.value[index - 1]?.focus()
  } else if (e.key === 'ArrowRight' && index < count.value - 1) {
    e.preventDefault()
    inputsRef.value[index + 1]?.focus()
  }
}

const onPaste = (index: number, e: ClipboardEvent) => {
  e.preventDefault()
  const pasted = (e.clipboardData?.getData('text') ?? '').replace(/\D/g, '')
  if (!pasted) return
  const next = [...digits.value]
  for (let i = 0; i < pasted.length && index + i < count.value; i++) {
    next[index + i] = pasted[i]
  }
  update(next)
  inputsRef.value[Math.min(index + pasted.length, count.value - 1)]?.focus()
}

const setInputRef = (el: unknown, index: number) => {
  if (el) inputsRef.value[index] = el as HTMLInputElement
}
</script>

<template>
  <component :is="blanket ? Blanket : 'div'" v-if="open" @close="emit('close')">
    <div
      :class="['and-token', error && 'and-token--error']"
      role="dialog"
      :aria-modal="blanket || undefined"
      :aria-label="title"
    >
      <div class="and-token__header">
        <button
          type="button"
          class="and-token__close"
          aria-label="Cerrar"
          @click="emit('close')"
        >
          <Icon name="close" :size="24" />
        </button>
      </div>
      <div class="and-token__title">{{ title }}</div>
      <div class="and-token__body">
        <div class="and-token__inputs">
          <input
            v-for="(digit, i) in digits"
            :key="i"
            :ref="(el) => setInputRef(el, i)"
            class="and-token__input"
            type="text"
            inputmode="numeric"
            autocomplete="one-time-code"
            placeholder="0"
            maxlength="1"
            :value="digit"
            :aria-label="`Dígito ${i + 1} de ${count}`"
            :aria-invalid="!!error || undefined"
            @input="setDigit(i, $event)"
            @keydown="onKeyDown(i, $event)"
            @paste="onPaste(i, $event)"
          />
        </div>
        <div v-if="error" class="and-token__error">{{ errorMessage }}</div>
        <div v-if="showHelp || showTokenHelp" class="and-token__links">
          <button
            v-if="showHelp"
            type="button"
            class="and-token__link"
            @click="emit('help')"
          >
            {{ helpLabel }}
          </button>
          <button
            v-if="showTokenHelp"
            type="button"
            class="and-token__link"
            @click="emit('tokenHelp')"
          >
            {{ tokenHelpLabel }}
          </button>
        </div>
      </div>
      <div v-if="showText" class="and-token__text">{{ text }}</div>
      <div class="and-token__footer">
        <Button appearance="ghost" variant="primary" size="md" @click="emit('cancel')">
          {{ cancelLabel }}
        </Button>
        <Button
          appearance="solid"
          variant="primary"
          size="md"
          :disabled="!complete"
          @click="emit('continue', code)"
        >
          {{ continueLabel }}
        </Button>
      </div>
    </div>
  </component>
</template>
