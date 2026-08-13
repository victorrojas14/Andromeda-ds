import figma, { html } from '@figma/code-connect/html'

/*
 * Code Connect — InputGroup (Vue)
 *
 * Mapea el set publicado "Input group" (13305:3395) de la página
 * Forms. Estados Close/Open (desktop) son dinámicos; Mobile-default/
 * Mobile-selected corresponden al mismo componente en <768px
 * (responsive), con las categorías como chips horizontales de scroll
 * invisible.
 */

figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=13305-3395', {
  props: {
    selectedCategory: figma.enum('State', {
      'Mobile-selected': 'Categoria 1',
    }),
  },
  example: (props) => html`
<InputGroup
  category-label="Categorías"
  placeholder="Buscar"
  :categories="['Categoria 1', 'Categoria 2', 'Categoria 3']"
  category="${props.selectedCategory}"
/>`,
  imports: ["import { InputGroup } from '@andromeda/vue'"],
})
