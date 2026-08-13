import figma, { html } from '@figma/code-connect/html'

/*
 * Code Connect — DropdownMultipleList (Vue)
 *
 * Mapea el set publicado "DropDown-lista-multiple" (9574:4161), el
 * item "Item Opcion Cuenta/Saldo" (552:1493) y el trigger "Form datos
 * cuenta selected" (579:1154) de la página Forms. Los estados
 * Default/Active/Seleccion son dinámicos (abrir y seleccionar).
 */

// DropDown-lista-multiple — set publicado 9574:4161
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=9574-4161', {
  props: {},
  example: () => html`
<DropdownMultipleList
  label="Selecciona la cuenta de retiro"
  :options="[
    { name: 'Nombre del cliente', account: '****0788', balance: '$ 1,000.00' },
    { name: 'Nombre del cliente', account: '****0921', balance: '$ 2,500.00' },
  ]"
/>`,
  imports: ["import { DropdownMultipleList } from '@andromeda/vue'"],
})

// Item Opcion Cuenta/Saldo — componente publicado 552:1493
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=552-1493', {
  props: {
    nombre: figma.string('Nombre'),
    cuenta: figma.string('Cuenta'),
    saldo: figma.string('Saldo'),
    showBalance: figma.boolean('Mostrar Saldo'),
  },
  example: (props) => html`
<DropdownMultipleList
  :show-balance="${props.showBalance}"
  :options="[{ name: '${props.nombre}', account: '${props.cuenta}', balance: '${props.saldo}' }]"
/>`,
  imports: ["import { DropdownMultipleList } from '@andromeda/vue'"],
})

// Form datos cuenta selected — componente publicado 579:1154
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=579-1154', {
  props: {
    nombre: figma.string('Nombre Cliente'),
    cuenta: figma.string('Numero Cuenta'),
    saldo: figma.string('Saldo'),
    showBalance: figma.boolean('Mostrar Saldo'),
  },
  example: (props) => html`
<DropdownMultipleList
  :show-balance="${props.showBalance}"
  :options="[{ name: '${props.nombre}', account: '${props.cuenta}', balance: '${props.saldo}' }]"
  model-value="${props.cuenta}"
/>`,
  imports: ["import { DropdownMultipleList } from '@andromeda/vue'"],
})
