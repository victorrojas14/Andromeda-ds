import figma, { html } from '@figma/code-connect/html'

/*
 * Code Connect — Skeleton (Vue)
 *
 * Mapea el set publicado "Skeleton" (12739:2231) de la página
 * Skeleton. Las variantes Group 1 / Group 2 son las dos fases del
 * shimmer, por lo que ambas mapean al componente animado
 * (animated=false congela el Group 1).
 */

figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=12739-2231', {
  props: {},
  example: () => html`
<Skeleton :width="360" :height="40" />`,
  imports: ["import { Skeleton } from '@andromeda/vue'"],
})
