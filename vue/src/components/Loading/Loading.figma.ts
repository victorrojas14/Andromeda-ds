import figma, { html } from '@figma/code-connect/html'

/*
 * Code Connect — Loading (Vue)
 *
 * Mapea el set publicado "Loading" (1151:23851) de la página Loading.
 * Property 1 (1..4) son los frames de la animación — el componente
 * los reproduce rotando el patrón en pasos de 45°.
 */

figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=1151-23851', {
  props: {
    color: figma.enum('Color', {
      Red: 'red',
      White: 'white',
    }),
  },
  example: (props) => html`
<Loading color="${props.color}" :size="100" />`,
  imports: ["import { Loading } from '@andromeda/vue'"],
})
