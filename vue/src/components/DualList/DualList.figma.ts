import figma, { html } from '@figma/code-connect/html'

/*
 * Code Connect — DualList (Vue)
 *
 * Mapea los sets publicados "Duallist" (14258:76392), "Dual-list-atom"
 * (14254:67419) y "Botones" (14255:73941) de la página Duallist.
 */

// Duallist (organismo) — set publicado 14258:76392
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=14258-76392', {
  props: {},
  example: () => html`
<DualList
  :items="['Arrendadora', 'Inversiones', 'Banca privada', 'Captación', 'Fraudes', 'Clientes', 'Contratación']"
  left-title="Selecciona permisos para el usuario"
  right-title="Permisos habilitados para el usuario"
/>`,
  imports: ["import { DualList } from '@andromeda/vue'"],
})

// Dual-list-atom (panel) — set publicado 14254:67419
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=14254-67419', {
  props: {
    leftTitle: figma.string('Title-Text-Content'),
    emptyLeftText: figma.string('Content text'),
  },
  example: (props) => html`
<DualList
  :items="['Arrendadora', 'Inversiones', 'Banca privada']"
  left-title="${props.leftTitle}"
  empty-left-text="${props.emptyLeftText}"
/>`,
  imports: ["import { DualList } from '@andromeda/vue'"],
})

// Botones (Agregar / Quitar) — set publicado 14255:73941
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=14255-73941', {
  props: {},
  example: () => html`
<DualList
  :items="['Arrendadora', 'Inversiones']"
  add-label="Agregar"
  remove-label="Quitar"
/>`,
  imports: ["import { DualList } from '@andromeda/vue'"],
})
