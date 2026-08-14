<script setup lang="ts">
import { computed } from 'vue'
import Icon from '../Icon/Icon.vue'
import type { AndIconName } from '../Icon/icons'
import './Menu.css'

/*
 * Menu — DS Andromeda (Figma: página Menu — set "Item Menu" 751:132
 * con Texto/Mostrar Icono/Estado Default-Active, barra "Menu Desktop"
 * 751:182 de 70px con sombra md-2, y para mobile el set "Menu Movil y
 * Lateral" 2943:768 con Estado Abierto 250px / Cerrado 84px e items
 * "Item menu mobile" 2943:1384). Un solo componente responsivo: en
 * <768px la barra desktop se oculta y se muestra el menú lateral del
 * diseño mobile (9435:21661). v-model con el índice activo;
 * v-model:open con el Estado Abierto/Cerrado (el chevron superior
 * colapsa el menú a solo iconos).
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

interface MenuProps {
  /** Items del menú (strings u objetos con icono/chevron). */
  items: Array<string | MenuItem>
}

const props = defineProps<MenuProps>()

const model = defineModel<number>({ default: 0 })

/** Menú mobile expandido (Figma: Estado Abierto/Cerrado). */
const open = defineModel<boolean>('open', { default: true })

const emit = defineEmits<{
  change: [index: number, item: MenuItem]
}>()

const menuItems = computed<MenuItem[]>(() =>
  props.items.map((i) => (typeof i === 'string' ? { label: i } : i)),
)

const select = (index: number) => {
  model.value = index
  emit('change', index, menuItems.value[index])
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
    <div :class="['and-menu-mobile', !open && 'and-menu-mobile--cerrado']">
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
  </nav>
</template>
