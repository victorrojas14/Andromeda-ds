<script setup lang="ts">
import { computed } from 'vue'
import ButtonMisProductos from '../Button/ButtonMisProductos.vue'
import Icon from '../Icon/Icon.vue'
import './Menu.css'

/*
 * Menu — DS Andromeda (Figma: página Menu — set "Item Menu" 751:132
 * con Texto/Mostrar Icono/Estado Default-Active, barra "Menu Desktop"
 * 751:182 de 70px con sombra md-2, y para mobile "Top Menu Mobile"
 * 751:579 + botón Mis productos del DS + "Menu Mobile" 2944:2982 con
 * items de 60px). Un solo componente responsivo: en <768px la barra
 * desktop se oculta y se muestra el diseño mobile (9435:21661).
 * v-model con el índice activo; v-model:open con el estado
 * Abierto/Cerrado del menú mobile (colapsa al hacer clic en el
 * chevron, el nombre de usuario o el botón Mis productos).
 */

export interface MenuItem {
  /** Texto del item (Figma: "Texto"). */
  label: string
  /** Muestra el chevron down/up (Figma: "Mostrar Icono"). */
  showIcon?: boolean
}

interface MenuProps {
  /** Items del menú (strings u objetos con showIcon). */
  items: Array<string | MenuItem>
  /** Nombre del usuario (mobile, Figma: "Nombre Usuario"). */
  userName?: string
  /** Iniciales del avatar (mobile, Figma: "Iniciales"). */
  userInitials?: string
  /** Texto de último acceso (mobile). */
  lastAccess?: string
  /** Muestra la barra de usuario en mobile (Top Menu Mobile). */
  showUser?: boolean
  /** Muestra el botón Mis productos del DS en mobile. */
  showProductsButton?: boolean
}

const props = withDefaults(defineProps<MenuProps>(), {
  userName: 'Nombre Usuario',
  userInitials: 'NU',
  lastAccess: '',
  showUser: true,
  showProductsButton: true,
})

const model = defineModel<number>({ default: 0 })

/** Menú mobile expandido (Figma: Estado Abierto/Cerrado). */
const open = defineModel<boolean>('open', { default: true })

const emit = defineEmits<{
  change: [index: number, item: MenuItem]
  productsClick: []
  userClick: []
}>()

const menuItems = computed<MenuItem[]>(() =>
  props.items.map((i) => (typeof i === 'string' ? { label: i } : i)),
)

const select = (index: number) => {
  model.value = index
  emit('change', index, menuItems.value[index])
}

const toggleOpen = () => {
  open.value = !open.value
  emit('userClick')
}

const onProducts = () => {
  open.value = false
  emit('productsClick')
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

    <!-- Menú mobile (Top Menu Mobile + Mis productos + Menu Mobile) -->
    <div class="and-menu-mobile">
      <div v-if="showUser" class="and-menu-mobile__user">
        <button type="button" class="and-menu-mobile__user-info" @click="toggleOpen">
          <span class="and-menu-mobile__initials" aria-hidden="true">{{ userInitials }}</span>
          <div class="and-menu-mobile__user-texts">
            <span class="and-menu-mobile__user-name">{{ userName }}</span>
            <span v-if="lastAccess" class="and-menu-mobile__user-access">{{ lastAccess }}</span>
          </div>
        </button>
        <button
          type="button"
          class="and-menu-mobile__user-chevron"
          :aria-label="open ? 'Colapsar menú' : 'Expandir menú'"
          :aria-expanded="open"
          @click="toggleOpen"
        >
          <Icon :name="open ? 'chevron-up' : 'chevron-down'" :size="24" />
        </button>
      </div>
      <template v-if="open">
        <div v-if="showProductsButton" class="and-menu-mobile__products">
          <ButtonMisProductos @click="onProducts" />
        </div>
        <div class="and-menu-mobile__list">
          <button
            v-for="(item, i) in menuItems"
            :key="i"
            type="button"
            :class="['and-menu-mobile__item', i === model && 'and-menu-mobile__item--active']"
            :aria-current="i === model ? 'page' : undefined"
            @click="select(i)"
          >
            {{ item.label }}
          </button>
        </div>
      </template>
    </div>
  </nav>
</template>
