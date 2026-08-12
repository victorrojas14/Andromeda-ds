import figma, { html } from '@figma/code-connect/html'

/*
 * Code Connect — Dropdown (Vue)
 *
 * Mapea los component sets publicados de la página "Dropdown"
 * (9477:15495): Form option (1484:1595, trigger), Dropdown--full--new
 * (13748:7858, panel completo), Input busqueda (13661:15601),
 * Item Opcion New (12647:1838) y No results (13464:6570).
 */

// Form option (trigger del dropdown)
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=1484-1595', {
  props: {},
  example: () => html`
<Dropdown
  label="Seleccionar"
  :options="['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4', 'Opción 5']"
/>`,
  imports: ["import { Dropdown } from '@andromeda/vue'"],
})

// Dropdown--full--new (panel completo con buscador e items)
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=13748-7858', {
  props: {
    checkShape: figma.enum('Variant', {
      'Square left': 'square',
      'square right': 'square',
      'circle left': 'circle',
      'circle right': 'circle',
    }),
    checkPosition: figma.enum('Variant', {
      'Square left': 'left',
      'square right': 'right',
      'circle left': 'left',
      'circle right': 'right',
    }),
  },
  example: (props) => html`
<Dropdown
  label="Seleccionar"
  check-shape="${props.checkShape}"
  check-position="${props.checkPosition}"
  :options="['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4', 'Opción 5']"
/>`,
  imports: ["import { Dropdown } from '@andromeda/vue'"],
})

// Input busqueda (buscador interno del panel)
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=13661-15601', {
  props: {},
  example: () => html`
<Dropdown
  searchable
  search-placeholder="Buscar"
  :options="['Opción 1', 'Opción 2', 'Opción 3']"
/>`,
  imports: ["import { Dropdown } from '@andromeda/vue'"],
})

// Item Opcion New (item de la lista)
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=12647-1838', {
  props: {
    texto: figma.string('Texto'),
  },
  example: (props) => html`
<Dropdown :options="['${props.texto}']" />`,
  imports: ["import { Dropdown } from '@andromeda/vue'"],
})

// No results (estado sin resultados del buscador)
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=13464-6570', {
  props: {},
  example: () => html`
<Dropdown
  searchable
  no-results-text="No se encontraron resultados"
  :options="['Opción 1', 'Opción 2', 'Opción 3']"
/>`,
  imports: ["import { Dropdown } from '@andromeda/vue'"],
})
