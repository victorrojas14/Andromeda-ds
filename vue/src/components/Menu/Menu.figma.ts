import figma, { html } from '@figma/code-connect/html'

/*
 * Code Connect — Menu (Vue)
 *
 * Mapea los sets publicados "Item Menu" (751:132), "Item menu mobile"
 * (2943:1384), "Menu Movil y Lateral" (2943:768), "Menu Mobile"
 * (2944:2982), "Perfil Movil" (2943:476) y "Top Menu Mobile"
 * (751:579) de la página Menu. La barra "Menu Desktop" no está
 * publicada; el componente es responsivo y muestra la variante mobile
 * elegida (lateral o usuario) en <768px.
 */

// Item Menu (barra desktop) — set publicado 751:132
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

// Item menu mobile — set publicado 2943:1384
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=2943-1384', {
  props: {
    label: figma.string('Texto'),
    showLeftIcon: figma.boolean('Mostrar Icono Izq'),
    showIcon: figma.boolean('Mostrar Icono Der'),
  },
  example: (props) => html`
<Menu
  :items="[
    {
      label: '${props.label}',
      icon: 'account-outline',
      showLeftIcon: ${props.showLeftIcon},
      showIcon: ${props.showIcon},
    },
    'Item menu 2',
    'Item menu 3',
  ]"
/>`,
  imports: ["import { Menu } from '@andromeda/vue'"],
})

// Menu Movil y Lateral — set publicado 2943:768
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=2943-768', {
  props: {
    open: figma.enum('Estado', { Abierto: true, Cerrado: false }),
  },
  example: (props) => html`
<Menu
  :items="['Item menu 1', 'Item menu 2', 'Item menu 3', 'Item menu 4', 'Item menu 5']"
  :open="${props.open}"
/>`,
  imports: ["import { Menu } from '@andromeda/vue'"],
})

// Menu Mobile (variante usuario) — set publicado 2944:2982
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=2944-2982', {
  props: {},
  example: () => html`
<Menu
  variant="usuario"
  :items="['Item menu 1', 'Item menu 2', 'Item menu 3', 'Item menu 4', 'Item menu 5']"
  user-name="Nombre Usuario"
  user-initials="NU"
  last-access="Último acceso: 08/05/2023 10:25 a.m."
  :products-items="['Mis productos 1', 'Mis productos 2', 'Mis productos 3']"
/>`,
  imports: ["import { Menu } from '@andromeda/vue'"],
})

// Perfil Movil (barra de usuario + Menu usuario) — set publicado 2943:476
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=2943-476', {
  props: {},
  example: () => html`
<Menu
  variant="usuario"
  :items="['Item menu 1', 'Item menu 2']"
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
  variant="usuario"
  :items="['Item menu 1', 'Item menu 2']"
  user-name="${props.userName}"
  user-initials="${props.userInitials}"
/>`,
  imports: ["import { Menu } from '@andromeda/vue'"],
})
