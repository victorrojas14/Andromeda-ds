<script setup lang="ts">
import { computed } from 'vue'
import Icon from '../Icon/Icon.vue'
import './PermisoNativo.css'

/*
 * PermisoNativo — prompt de permisos nativos del navegador del DS
 * Andromeda (Figma: página "Permisos nativos web", set 13580:38176
 * con Type=Notificaciones|Ubicación|Microfono). Componente de apoyo
 * para representar en los flujos la interacción real del usuario con
 * el navegador: card de 318px estilo Chrome (Roboto y chips nativos
 * #d3e3fd). Se muestra/oculta con `open` (por ejemplo, desde un
 * botón) y con `fixed` se ancla arriba a la izquierda como el prompt
 * real.
 */

/** Tipos de permiso del set de Figma (Type). */
export type PermisoNativoType = 'notificaciones' | 'ubicacion' | 'microfono'

interface PermisoNativoProps {
  /** Tipo de permiso (Figma: Type=Notificaciones|Ubicación|Microfono). */
  type?: PermisoNativoType
  /** Sitio que solicita el permiso. */
  site?: string
  /** Texto de la solicitud (default según el tipo, como en Figma). */
  requestText?: string
  /** Visibilidad del prompt. */
  open?: boolean
  /** Anclado arriba a la izquierda como el prompt real del navegador. */
  fixed?: boolean
}

const props = withDefaults(defineProps<PermisoNativoProps>(), {
  type: 'notificaciones',
  site: 'www.invex.com',
  requestText: undefined,
  open: true,
  fixed: false,
})

const emit = defineEmits<{
  close: []
  allow: []
  allowThisTime: []
  block: []
}>()

/** Textos default de la solicitud por tipo (Figma). */
const REQUEST_TEXT: Record<PermisoNativoType, string> = {
  notificaciones: 'Mostrar notificaciones',
  ubicacion: 'Conocer tu ubicación',
  microfono: 'Usar micrófonos disponibles',
}

const texto = computed(() => props.requestText ?? REQUEST_TEXT[props.type])
</script>

<template>
  <div
    v-if="open"
    :class="['and-permiso', fixed && 'and-permiso--fixed']"
    role="dialog"
    :aria-label="`${site} quiere ${texto}`"
  >
    <div class="and-permiso__header">
      <span class="and-permiso__site">
        <span class="and-permiso__site-nombre">{{ site }}</span>
        <span class="and-permiso__site-quiere">quiere</span>
      </span>
      <button
        type="button"
        class="and-permiso__close"
        aria-label="Cerrar"
        @click="emit('close')"
      >
        <Icon name="close" :size="20" />
      </button>
    </div>
    <div class="and-permiso__request">
      <Icon v-if="type === 'notificaciones'" name="bell-outline" :size="16" />
      <svg
        v-else-if="type === 'ubicacion'"
        width="14"
        height="16"
        viewBox="0 0 14 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2.05571 2.00469C3.37647 0.712556 5.15644 -0.00792682 7.00819 6.57954e-05C8.85995 0.00805842 10.6336 0.74388 11.943 2.04737C13.2525 3.35086 13.9918 5.1165 13.9999 6.95996C14.0081 8.80343 13.2845 10.5755 11.9867 11.8905L11.0287 12.833C10.3233 13.5223 9.40779 14.4089 8.28203 15.4927C7.94358 15.8182 7.49129 16.0002 7.02064 16C6.54999 15.9999 6.09782 15.8176 5.75957 15.4918L2.94438 12.7655C2.59063 12.4198 2.29441 12.1281 2.05571 11.8905C0.739417 10.5792 0 8.80134 0 6.94758C0 5.09381 0.739417 3.31591 2.05571 2.00469ZM11.1303 2.85727C10.592 2.31399 9.95099 1.8821 9.2443 1.58646C8.5376 1.29082 7.77914 1.13728 7.01259 1.13467C6.24604 1.13207 5.48654 1.28046 4.77784 1.57129C4.06913 1.86213 3.42522 2.28966 2.88319 2.82927C2.34115 3.36888 1.9117 4.00991 1.61956 4.71545C1.32742 5.42098 1.17836 6.17708 1.18098 6.9402C1.18359 7.70333 1.33782 8.4584 1.63479 9.16193C1.93176 9.86546 2.36559 10.5036 2.91132 11.0395L4.11045 12.2172C4.9382 13.0224 5.76827 13.8252 6.60066 14.6256C6.71346 14.7343 6.86426 14.795 7.0212 14.795C7.17815 14.795 7.32895 14.7343 7.44175 14.6256L10.1787 11.9764C10.5577 11.6071 10.8749 11.2948 11.1303 11.0395C12.2202 9.95444 12.8324 8.48283 12.8324 6.94838C12.8324 5.41393 12.2202 3.94232 11.1303 2.85727ZM7.02161 4.35852C7.39231 4.35863 7.75936 4.43142 8.10181 4.57275C8.44425 4.71407 8.75538 4.92116 9.01743 5.18219C9.27948 5.44322 9.48732 5.75307 9.62909 6.09406C9.77085 6.43506 9.84376 6.80051 9.84365 7.16955C9.84355 7.5386 9.77043 7.90401 9.62847 8.24492C9.48651 8.58583 9.27849 8.89557 9.01629 9.15645C8.75409 9.41733 8.44284 9.62424 8.10032 9.76537C7.75779 9.9065 7.3907 9.97908 7.01999 9.97897C6.27133 9.97876 5.55341 9.68248 5.02417 9.15531C4.49494 8.62814 4.19774 7.91326 4.19795 7.16795C4.19816 6.42263 4.49578 5.70792 5.02531 5.18105C5.55485 4.65418 6.27294 4.35831 7.02161 4.35852ZM7.0208 5.56273C6.59305 5.56273 6.18282 5.7319 5.88036 6.03301C5.5779 6.33412 5.40797 6.74251 5.40797 7.16835C5.40797 7.59418 5.5779 8.00258 5.88036 8.30369C6.18282 8.6048 6.59305 8.77396 7.0208 8.77396C7.44855 8.77396 7.85878 8.6048 8.16124 8.30369C8.46371 8.00258 8.63363 7.59418 8.63363 7.16835C8.63363 6.74251 8.46371 6.33412 8.16124 6.03301C7.85878 5.7319 7.44855 5.56273 7.0208 5.56273Z"
          fill="currentColor"
        />
      </svg>
      <svg
        v-else
        width="11"
        height="16"
        viewBox="0 0 11 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M0.682482 5.42878C1.05941 5.42878 1.36496 5.73944 1.36496 6.12265V7.34711C1.36496 9.65772 3.22729 11.5511 5.5 11.5511C7.77271 11.5511 9.63504 9.65772 9.63504 7.34711V6.12265C9.63504 5.73944 9.94059 5.42878 10.3175 5.42878C10.6944 5.42878 11 5.73944 11 6.12265V7.34711C11 10.1893 8.88972 12.5517 6.18248 12.8958V14.6123H7.90876C8.28568 14.6123 8.59124 14.9229 8.59124 15.3061C8.59124 15.6893 8.28568 16 7.90876 16H3.09124C2.71432 16 2.40876 15.6893 2.40876 15.3061C2.40876 14.9229 2.71432 14.6123 3.09124 14.6123H4.81752V12.8958C2.11028 12.5517 0 10.1893 0 7.34711V6.12265C0 5.73944 0.305558 5.42878 0.682482 5.42878Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5.50123 3.13141e-05C7.18802 0.000837347 8.51066 1.34606 8.51066 3.06119V7.30855C8.51066 9.01801 7.15564 10.408 5.49972 10.408C3.83902 10.408 2.48877 8.98248 2.48877 7.30855V3.06266C2.48698 2.66024 2.56358 2.26143 2.71413 1.88925C2.86489 1.51656 3.08683 1.17795 3.3671 0.893007C3.64737 0.608062 3.98042 0.382429 4.34699 0.229155C4.7131 0.0760772 5.10539 -0.0017926 5.50123 3.13141e-05ZM5.49668 1.22449C5.2595 1.22327 5.02444 1.26987 4.80509 1.36159C4.58573 1.45331 4.38643 1.58832 4.21872 1.75883C4.05101 1.92934 3.91821 2.13196 3.82799 2.35498C3.73778 2.57799 3.69194 2.81697 3.69314 3.05811L3.69315 3.06119L3.69315 7.30855C3.69315 8.32846 4.52584 9.18352 5.49972 9.18352C6.47837 9.18352 7.30628 8.35414 7.30628 7.30855V3.06119C7.30628 2.0218 6.52206 1.2245 5.49972 1.2245L5.49668 1.22449Z"
          fill="currentColor"
        />
      </svg>
      <span>{{ texto }}</span>
    </div>
    <div
      v-if="type === 'notificaciones'"
      class="and-permiso__actions and-permiso__actions--inline"
    >
      <button type="button" class="and-permiso__chip" @click="emit('allow')">
        Permitir
      </button>
      <button type="button" class="and-permiso__chip" @click="emit('block')">
        Bloquear
      </button>
    </div>
    <div v-else class="and-permiso__actions">
      <button type="button" class="and-permiso__chip" @click="emit('allow')">
        Permitir mientras se visita el sitio
      </button>
      <button type="button" class="and-permiso__chip" @click="emit('allowThisTime')">
        Permitir esta vez
      </button>
      <button type="button" class="and-permiso__chip" @click="emit('block')">
        No permitir nunca
      </button>
    </div>
  </div>
</template>
