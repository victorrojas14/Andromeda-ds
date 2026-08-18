<script setup lang="ts">
import { computed } from 'vue'
import ButtonMisProductos from '../Button/ButtonMisProductos.vue'
import Icon from '../Icon/Icon.vue'
import type { AndIconName } from '../Icon/icons'
import Logo from '../Logo/Logo.vue'
// El menú de usuario reutiliza los items del componente Menu
// (mismo átomo "Item menu mobile" de Figma).
import '../Menu/Menu.css'
import './Header.css'

/*
 * Header — barra superior del DS Andromeda (Figma: página Header —
 * sets "Header Desktop-Tablet" 7392:4079 y "Header Mobile" 751:2118 y
 * componente "Menu usuario" 806:171890). Un solo componente
 * responsivo: en ≥768px es la barra de 80px con logo, iconos de 48px,
 * usuario con iniciales, el ButtonMisProductos del DS e icono de menú;
 * en <768px toma el diseño mobile (60px con logo reducido, campana con
 * badge y hamburguesa). El menú de usuario reutiliza los items del
 * componente Menu.
 */

/** Marca del header (Figma: variante "Header"). */
export type HeaderVariant = 'invex' | 'renacer' | 'fiduciario'

export interface HeaderUserMenuItem {
  /** Texto del item. */
  label: string
  /** Icono de 24 del registro del DS. */
  icon?: AndIconName
}

interface HeaderProps {
  /** Marca del header (Figma: Header=Invex|Header-Renacer|Header-Fiduciario). */
  variant?: HeaderVariant
  /** Nombre del usuario (Figma: "Nombre usuario"). */
  userName?: string
  /** Iniciales del avatar (Figma: "Iniciales"). */
  initials?: string
  /** Texto de último acceso. */
  lastAccess?: string
  /** Etiqueta del badge de administrador. */
  adminLabel?: string
  /** Muestra el icono de ayuda (Figma: "Mostrar Ic Ayuda"). */
  showHelp?: boolean
  /** Muestra el icono de reloj (Figma: "Mostrar Ic Reloj"). */
  showClock?: boolean
  /** Muestra el icono de notificaciones (Figma: "Mostrar Ic Notificaciones"). */
  showNotifications?: boolean
  /** Muestra el icono de configuración (Figma: "Mostrar Ic Configuracion"). */
  showSettings?: boolean
  /** Muestra el bloque usuario + último acceso (Figma: "Mostrar Ususario Fecha"). */
  showUserDate?: boolean
  /** Muestra el badge ADMIN (Figma: "Mostrar Admin"). */
  showAdmin?: boolean
  /** Muestra las iniciales y su chevron (Figma: "Mostrar Iniciales"). */
  showInitials?: boolean
  /** Muestra el botón Mis productos (Figma: "Mostrar Boton Acceso"). */
  showProductsButton?: boolean
  /** Muestra el icono de menú (Figma: "Mostrar Ic Menu"). */
  showMenuIcon?: boolean
  /**
   * Estado del menú lateral (Figma Header Mobile: Estado
   * Abierto/Cerrado). Abierto cambia la hamburguesa por la X.
   */
  menuOpen?: boolean
  /** Items del Menu usuario (default los 5 del componente de Figma). */
  userMenuItems?: Array<string | HeaderUserMenuItem>
}

const props = withDefaults(defineProps<HeaderProps>(), {
  variant: 'invex',
  userName: 'Cristina Martínez',
  initials: 'CM',
  lastAccess: 'Último acceso: 10/02/2025 10:25 a.m.',
  adminLabel: 'ADMIN',
  showHelp: true,
  showClock: true,
  showNotifications: true,
  showSettings: true,
  showUserDate: true,
  showAdmin: true,
  showInitials: true,
  showProductsButton: true,
  showMenuIcon: true,
  menuOpen: false,
  userMenuItems: undefined,
})

/** Menú de usuario desplegado (Menu usuario). */
const userMenuOpen = defineModel<boolean>('userMenuOpen', { default: false })

const emit = defineEmits<{
  userMenuSelect: [index: number, item: HeaderUserMenuItem]
  helpClick: []
  clockClick: []
  notificationsClick: []
  settingsClick: []
  productsClick: []
  menuClick: []
  logoClick: []
}>()

/** Items del "Menu usuario" de Figma (806:171890). */
const DEFAULT_USER_MENU: HeaderUserMenuItem[] = [
  { label: 'Mi perfil', icon: 'account-outline' },
  { label: 'Preguntas frecuentes', icon: 'question-line' },
  { label: 'Configuración', icon: 'settings-outline' },
  { label: 'Notificaciones', icon: 'bell-outline' },
  { label: 'Cerrar sesión', icon: 'Salir' },
]

/** Logo del DS y su alto (desktop) por marca. */
const LOGO: Record<
  HeaderVariant,
  { variant: 'invex' | 'invex-renacer' | 'invex-fiduciario'; height: number }
> = {
  invex: { variant: 'invex', height: 44 },
  renacer: { variant: 'invex-renacer', height: 34 },
  fiduciario: { variant: 'invex-fiduciario', height: 34 },
}

const logo = computed(() => LOGO[props.variant])

const items = computed<HeaderUserMenuItem[]>(() =>
  (props.userMenuItems ?? DEFAULT_USER_MENU).map((i) =>
    typeof i === 'string' ? { label: i } : i,
  ),
)

const selectUserMenu = (index: number) => {
  emit('userMenuSelect', index, items.value[index])
  userMenuOpen.value = false
}
</script>

<template>
  <header :class="['and-header', variant !== 'invex' && `and-header--${variant}`]">
    <div class="and-header__logo" @click="emit('logoClick')">
      <Logo :variant="logo.variant" :height="logo.height" title="INVEX" />
    </div>

    <div class="and-header__right">
      <div class="and-header__icons">
        <button
          v-if="showHelp"
          type="button"
          class="and-header__icon-btn and-header__icon-btn--help"
          aria-label="Ayuda"
          @click="emit('helpClick')"
        >
          <Icon name="question-line" :size="24" />
        </button>
        <button
          v-if="showClock"
          type="button"
          class="and-header__icon-btn and-header__icon-btn--clock"
          aria-label="Historial"
          @click="emit('clockClick')"
        >
          <Icon name="clock-outline" :size="24" />
        </button>
        <button
          v-if="showNotifications"
          type="button"
          class="and-header__icon-btn and-header__icon-btn--bell"
          aria-label="Notificaciones"
          @click="emit('notificationsClick')"
        >
          <span class="and-header__only-desktop">
            <Icon name="bell-outline" :size="24" />
          </span>
          <span class="and-header__only-mobile">
            <Icon name="bell-badge-outline" :size="24" />
          </span>
        </button>
        <button
          v-if="showSettings"
          type="button"
          class="and-header__icon-btn and-header__icon-btn--settings"
          aria-label="Configuración"
          @click="emit('settingsClick')"
        >
          <Icon name="settings-outline" :size="24" />
        </button>
      </div>

      <div v-if="showUserDate || showInitials" class="and-header__user">
        <div v-if="showUserDate" class="and-header__user-date">
          <div class="and-header__user-row">
            <span class="and-header__user-name">{{ userName }}</span>
            <span v-if="showAdmin" class="and-header__admin">{{ adminLabel }}</span>
          </div>
          <span v-if="lastAccess" class="and-header__last-access">{{ lastAccess }}</span>
        </div>
        <button
          v-if="showInitials"
          type="button"
          class="and-header__initials-btn"
          :aria-expanded="userMenuOpen"
          aria-label="Menú de usuario"
          @click="userMenuOpen = !userMenuOpen"
        >
          <span class="and-header__initials">{{ initials }}</span>
          <Icon :name="userMenuOpen ? 'chevron-up' : 'chevron-down'" :size="24" />
        </button>
        <div v-if="userMenuOpen" class="and-header__usermenu" role="menu">
          <button
            v-for="(item, i) in items"
            :key="i"
            type="button"
            class="and-menu-mobile__item"
            role="menuitem"
            @click="selectUserMenu(i)"
          >
            <Icon v-if="item.icon" :name="item.icon" :size="24" />
            <span class="and-menu-mobile__item-label">{{ item.label }}</span>
          </button>
        </div>
      </div>

      <div v-if="showProductsButton" class="and-header__products">
        <ButtonMisProductos @click="emit('productsClick')" />
      </div>

      <button
        v-if="showMenuIcon"
        type="button"
        class="and-header__menu"
        :aria-label="menuOpen ? 'Cerrar menú' : 'Abrir menú'"
        :aria-expanded="menuOpen"
        @click="emit('menuClick')"
      >
        <Icon :name="menuOpen ? 'close' : 'menu'" :size="24" />
      </button>
    </div>
  </header>
</template>
