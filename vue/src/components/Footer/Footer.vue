<script setup lang="ts">
import { reactive } from 'vue'
import './Footer.css'
import { Icon } from '../Icon'
import { Logo } from '../Logo'
import facebookSvg from './assets/facebook.svg'
import xSvg from './assets/x.svg'
import instagramSvg from './assets/instagram.svg'
import buroSvg from './assets/buro.svg'
import condusefSvg from './assets/condusef.svg'
import ipabSvg from './assets/ipab.svg'

/*
 * Footer — pie de página del DS Andromeda (Figma: "Footer Desktop" y
 * "Footer Mobile"). Fondo secondary con columnas de links, columna
 * "Síguenos" opcional (redes + Buró/CONDUSEF/IPAB) y barra inferior
 * con el logo INVEX y el copyright. Responsive: en <1024px las
 * columnas se apilan y colapsan con chevron (diseño Footer Mobile).
 */

interface FooterLink {
  /** Texto del subitem. */
  label: string
  /** URL del subitem; sin href se renderiza como texto. */
  href?: string
}

interface FooterColumn {
  /** Título del item (columna) del menú. */
  title: string
  /** Subitems de la columna. */
  links: FooterLink[]
}

interface FooterSocialLinks {
  facebook?: string
  x?: string
  instagram?: string
}

interface FooterProps {
  /**
   * Columnas del menú (1 a 4 según el diseño). Cada una con título y
   * subitems editables (texto y URL); se pueden agregar más.
   */
  columns: FooterColumn[]
  /** Muestra la columna "Síguenos" (iconos de redes + logos). */
  social?: boolean
  /** Título de la columna de redes. */
  socialTitle?: string
  /** URLs de las redes sociales. */
  socialLinks?: FooterSocialLinks
  /** Texto de derechos reservados de la barra inferior. */
  copyright?: string
}

const props = withDefaults(defineProps<FooterProps>(), {
  social: true,
  socialTitle: 'Síguenos',
  socialLinks: () => ({}),
  copyright: '2026 INVEX® Todos los derechos reservados',
})

const open = reactive<Record<number, boolean>>({})

function toggle(i: number) {
  open[i] = !open[i]
}
</script>

<template>
  <footer class="and-footer">
    <div class="and-footer__columns">
      <div
        v-for="(column, i) in props.columns"
        :key="i"
        :class="['and-footer__column', open[i] && 'and-footer__column--open']"
      >
        <button
          type="button"
          class="and-footer__column-header"
          :aria-expanded="Boolean(open[i])"
          @click="toggle(i)"
        >
          <span class="and-footer__column-title">{{ column.title }}</span>
          <span class="and-footer__chevron" aria-hidden="true">
            <Icon :name="open[i] ? 'chevron-up' : 'chevron-down'" :size="24" />
          </span>
        </button>
        <ul class="and-footer__list">
          <li v-for="(link, j) in column.links" :key="j">
            <a v-if="link.href" :href="link.href">{{ link.label }}</a>
            <template v-else>{{ link.label }}</template>
          </li>
        </ul>
      </div>
      <div
        v-if="props.social"
        :class="['and-footer__column', open[props.columns.length] && 'and-footer__column--open']"
      >
        <button
          type="button"
          class="and-footer__column-header"
          :aria-expanded="Boolean(open[props.columns.length])"
          @click="toggle(props.columns.length)"
        >
          <span class="and-footer__column-title">{{ props.socialTitle }}</span>
          <span class="and-footer__chevron" aria-hidden="true">
            <Icon :name="open[props.columns.length] ? 'chevron-up' : 'chevron-down'" :size="24" />
          </span>
        </button>
        <div class="and-footer__social">
          <div class="and-footer__icons">
            <a :href="props.socialLinks.facebook ?? '#'" aria-label="Facebook">
              <img :src="facebookSvg" alt="" />
            </a>
            <a :href="props.socialLinks.x ?? '#'" aria-label="X">
              <img :src="xSvg" alt="" />
            </a>
            <a :href="props.socialLinks.instagram ?? '#'" aria-label="Instagram">
              <img :src="instagramSvg" alt="" />
            </a>
          </div>
          <div class="and-footer__logos">
            <img :src="buroSvg" alt="Buró de Entidades Financieras" />
            <img :src="condusefSvg" alt="CONDUSEF" />
            <img :src="ipabSvg" alt="IPAB" />
          </div>
        </div>
      </div>
    </div>
    <div class="and-footer__bottom">
      <Logo variant="invex" :height="30" />
      <span class="and-footer__copyright">{{ props.copyright }}</span>
    </div>
  </footer>
</template>
