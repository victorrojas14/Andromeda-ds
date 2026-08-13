import figma, { html } from '@figma/code-connect/html'

/*
 * Code Connect — Paginator (Vue)
 *
 * Mapea los sets publicados "Paginador" (3574:815) y
 * "NumerosPaginador-1/2" (175:4701 / 175:4758) de la página
 * Pagination. Size=Desktop|Mobile es el mismo componente responsivo.
 */

// Paginador — set publicado 3574:815
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=3574-815', {
  props: {},
  example: () => html`
<Paginator :page-count="50" v-model="pagina" />`,
  imports: ["import { Paginator } from '@andromeda/vue'"],
})

// NumerosPaginador-1 (botón de página desktop 40x40)
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=175-4701', {
  props: {},
  example: () => html`
<Paginator :page-count="3" :show-text="false" />`,
  imports: ["import { Paginator } from '@andromeda/vue'"],
})

// NumerosPaginador-2 (botón de página mobile 28x28)
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=175-4758', {
  props: {},
  example: () => html`
<Paginator :page-count="3" :show-text="false" />`,
  imports: ["import { Paginator } from '@andromeda/vue'"],
})
