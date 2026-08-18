<script setup lang="ts">
import { computed, ref } from 'vue'
import ButtonMisProductos from '../Button/ButtonMisProductos.vue'
import Icon from '../Icon/Icon.vue'
import type { AndIconName } from '../Icon/icons'
import './Menu.css'

/*
 * Menu — DS Andromeda (Figma: página Menu — set "Item Menu" 751:132,
 * barra "Menu Desktop" 751:182 de 70px con sombra md-2, y dos
 * variantes mobile: "Menu Movil y Lateral" 2943:768 (lateral,
 * Abierto 250px / Cerrado 84px) y "Menu Mobile" 2944:2982 (usuario:
 * Perfil Movil 2943:476 con Menu usuario + botón Mis productos del DS
 * + lista; se colapsa al elegir un item). Un solo componente
 * responsivo: en <768px la barra desktop se oculta y se muestra la
 * variante mobile elegida. v-model con el índice activo; v-model:open
 * con el Estado Abierto/Cerrado.
 */

export interface MenuItem {
  /** Texto del item (Figma: "Texto"). */
  label: string
  /** Icono izquierdo en mobile (Figma: "Cambiar Icono"; default account-outline). */
  icon?: AndIconName
  /** Muestra el icono izquierdo en mobile (Figma: "Mostrar Icono Izq"). */
  showLeftIcon?: boolean
  /**
   * Muestra el chevron: down/up en la barra desktop (Figma: "Mostrar
   * Icono") y chevron-down a la derecha en mobile ("Mostrar Icono Der",
   * indica submenú).
   */
  showIcon?: boolean
}

/** Items del "Menu usuario" del Perfil Movil (Figma 806:171890). */
const DEFAULT_USER_MENU: MenuItem[] = [
  { label: 'Mi perfil', icon: 'account-outline' },
  { label: 'Preguntas frecuentes', icon: 'question-line' },
  { label: 'Configuración', icon: 'settings-outline' },
  { label: 'Notificaciones', icon: 'bell-outline' },
  { label: 'Cerrar sesión', icon: 'Salir' },
]

interface MenuProps {
  /** Items del menú (strings u objetos con icono/chevron). */
  items: Array<string | MenuItem>
  /**
   * Variante del menú mobile: "lateral" (Menu Movil y Lateral,
   * colapsable a solo iconos) o "usuario" (Menu Mobile con Perfil
   * Movil y botón Mis productos; se colapsa al hacer clic en un item).
   */
  variant?: 'lateral' | 'usuario'
  /** Nombre del usuario (variante usuario, Figma: "Nombre Usuario"). */
  userName?: string
  /** Iniciales del avatar (variante usuario, Figma: "Iniciales"). */
  userInitials?: string
  /** Texto de último acceso (variante usuario). */
  lastAccess?: string
  /** Items del menú de usuario (variante usuario; default los del Perfil Movil). */
  userMenuItems?: Array<string | MenuItem>
  /** Items de la lista Mis productos (variante usuario). */
  productsItems?: Array<string | MenuItem>
  /** Muestra el botón Mis productos del DS (variante usuario). */
  showProductsButton?: boolean
}

const props = withDefaults(defineProps<MenuProps>(), {
  variant: 'lateral',
  userName: 'Nombre Usuario',
  userInitials: 'NU',
  lastAccess: '',
  userMenuItems: undefined,
  productsItems: () => [],
  showProductsButton: true,
})

const model = defineModel<number>({ default: 0 })

/** Menú mobile expandido (Figma: Estado Abierto/Cerrado). */
const open = defineModel<boolean>('open', { default: true })

const userMenuOpen = ref(false)
const productsOpen = ref(false)

const emit = defineEmits<{
  change: [index: number, item: MenuItem]
  userMenuSelect: [index: number, item: MenuItem]
  productsSelect: [index: number, item: MenuItem]
}>()

const toItems = (items: Array<string | MenuItem>): MenuItem[] =>
  items.map((i) => (typeof i === 'string' ? { label: i } : i))

const menuItems = computed<MenuItem[]>(() => toItems(props.items))
const userItems = computed<MenuItem[]>(() =>
  toItems(props.userMenuItems ?? DEFAULT_USER_MENU),
)
const productItems = computed<MenuItem[]>(() => toItems(props.productsItems))

/** Colapsa todo el menú mobile (variante usuario) tras elegir un item. */
const collapse = () => {
  userMenuOpen.value = false
  productsOpen.value = false
  open.value = false
}

const select = (index: number) => {
  model.value = index
  emit('change', index, menuItems.value[index])
  if (props.variant === 'usuario') collapse()
}

/** Cerrado → abre el menú; abierto → alterna el menú de usuario. */
const toggleUser = () => {
  if (!open.value) {
    open.value = true
    return
  }
  userMenuOpen.value = !userMenuOpen.value
}

const selectUserMenu = (index: number) => {
  emit('userMenuSelect', index, userItems.value[index])
  collapse()
}

const selectProduct = (index: number) => {
  emit('productsSelect', index, productItems.value[index])
  collapse()
}
</script>

<template>
  <nav>
    <!-- Barra desktop (Menu Desktop) -->
    <div class="and-menu">
      <div class="and-menu__items">
        <button
          v-for="(item, i) in menuItems"
          :key="i"
          type="button"
          :class="['and-menu__item', i === model && 'and-menu__item--active']"
          :aria-current="i === model ? 'page' : undefined"
          @click="select(i)"
        >
          <span class="and-menu__item-inner">
            {{ item.label }}
            <Icon
              v-if="item.showIcon"
              :name="i === model ? 'chevron-up' : 'chevron-down'"
              :size="24"
            />
          </span>
        </button>
      </div>
    </div>

    <!-- Menú mobile / lateral (Menu Movil y Lateral) -->
    <div
      v-if="variant === 'lateral'"
      :class="['and-menu-mobile', !open && 'and-menu-mobile--cerrado']"
    >
      <button
        type="button"
        class="and-menu-mobile__toggle"
        :aria-label="open ? 'Colapsar menú' : 'Expandir menú'"
        :aria-expanded="open"
        @click="open = !open"
      >
        <Icon :name="open ? 'chevron-left' : 'chevron-right'" :size="24" />
      </button>
      <button
        v-for="(item, i) in menuItems"
        :key="i"
        type="button"
        :class="['and-menu-mobile__item', i === model && 'and-menu-mobile__item--active']"
        :aria-current="i === model ? 'page' : undefined"
        :aria-label="!open ? item.label : undefined"
        :title="!open ? item.label : undefined"
        @click="select(i)"
      >
        <Icon v-if="item.showLeftIcon ?? true" :name="item.icon ?? 'account-outline'" :size="24" />
        <span v-if="open" class="and-menu-mobile__item-label">{{ item.label }}</span>
        <Icon v-if="open && item.showIcon" name="chevron-down" :size="24" />
      </button>
    </div>

    <!-- Menú mobile variante usuario (Menu Mobile con Perfil Movil) -->
    <div v-else class="and-menu-user">
      <div class="and-menu-user__bar">
        <button type="button" class="and-menu-user__info" @click="toggleUser">
          <span class="and-menu-user__initials" aria-hidden="true">{{ userInitials }}</span>
          <span class="and-menu-user__texts">
            <span class="and-menu-user__name">{{ userName }}</span>
            <span v-if="lastAccess" class="and-menu-user__access">{{ lastAccess }}</span>
          </span>
        </button>
        <button
          type="button"
          class="and-menu-user__chevron"
          :aria-label="
            !open
              ? 'Expandir menú'
              : userMenuOpen
                ? 'Cerrar menú de usuario'
                : 'Abrir menú de usuario'
          "
          :aria-expanded="open && userMenuOpen"
          @click="toggleUser"
        >
          <Icon :name="open && userMenuOpen ? 'chevron-up' : 'chevron-down'" :size="24" />
        </button>
      </div>
      <template v-if="open">
        <div v-if="userMenuOpen" class="and-menu-user__usermenu">
          <button
            v-for="(item, i) in userItems"
            :key="i"
            type="button"
            class="and-menu-mobile__item"
            @click="selectUserMenu(i)"
          >
            <Icon v-if="item.showLeftIcon ?? true" :name="item.icon ?? 'account-outline'" :size="24" />
            <span class="and-menu-mobile__item-label">{{ item.label }}</span>
            <Icon v-if="item.showIcon" name="chevron-down" :size="24" />
          </button>
        </div>
        <div
          v-if="showProductsButton"
          :class="['and-menu-user__products', productsOpen && 'and-menu-user__products--open']"
        >
          <ButtonMisProductos
            :aria-expanded="productsOpen"
            @click="productsOpen = !productsOpen"
          />
        </div>
        <div v-if="productsOpen && productItems.length > 0" class="and-menu-user__products-list">
          <button
            v-for="(item, i) in productItems"
            :key="i"
            type="button"
            class="and-menu-mobile__item"
            @click="selectProduct(i)"
          >
            <Icon v-if="item.icon" :name="item.icon" :size="24" />
            <span class="and-menu-mobile__item-label">{{ item.label }}</span>
            <Icon v-if="item.showIcon" name="chevron-down" :size="24" />
          </button>
        </div>
        <div v-if="menuItems.length > 0" class="and-menu-user__list">
          <button
            v-for="(item, i) in menuItems"
            :key="i"
            type="button"
            :class="['and-menu-mobile__item', i === model && 'and-menu-mobile__item--active']"
            :aria-current="i === model ? 'page' : undefined"
            @click="select(i)"
          >
            <Icon v-if="item.icon" :name="item.icon" :size="24" />
            <span class="and-menu-mobile__item-label">{{ item.label }}</span>
            <Icon v-if="item.showIcon" name="chevron-down" :size="24" />
          </button>
        </div>
      </template>
    </div>
  </nav>
</template>
