import figma, { html } from '@figma/code-connect/html'

/*
 * Code Connect — Menu (Vue)
 *
 * Mapea los sets publicados "Item Menu" (751:132) y "Menu Mobile"
 * (2944:2982) más el componente "Top Menu Mobile" (751:579) de la
 * página Menu. La barra "Menu Desktop" no está publicada; el
 * componente es responsivo y muestra el diseño mobile en <768px.
 */

// Item Menu — set publicado 751:132
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=751-132', {
  props: {
    label: figma.string('Texto'),
    showIcon: figma.boolean('Mostrar Icono'),
  },
  example: (props) => html`
<Menu
  :items="[
    { label: '${props.label}', showIcon: ${props.showIcon} },
    'Menú',
    'Menú',
  ]"
/>`,
  imports: ["import { Menu } from '@andromeda/vue'"],
})

// Menu Mobile (Estado=Abierto) — set publicado 2944:2982
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=2944-2982', {
  props: {},
  example: () => html`
<Menu
  :items="['Item menu 1', 'Item menu 2', 'Item menu 3', 'Item menu 4', 'Item menu 5']"
  user-name="Nombre Usuario"
  user-initials="NU"
  last-access="Último acceso: 08/05/2023 10:25 a.m."
/>`,
  imports: ["import { Menu } from '@andromeda/vue'"],
})

// Top Menu Mobile (barra de usuario) — componente publicado 751:579
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=751-579', {
  props: {
    userName: figma.string('Nombre Usuario'),
    userInitials: figma.string('Iniciales'),
  },
  example: (props) => html`
<Menu
  :items="['Menú', 'Menú']"
  user-name="${props.userName}"
  user-initials="${props.userInitials}"
  :show-products-button="false"
/>`,
  imports: ["import { Menu } from '@andromeda/vue'"],
})
