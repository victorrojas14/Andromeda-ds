import figma, { html } from '@figma/code-connect/html'

/*
 * Code Connect — Header (Vue)
 *
 * Mapea los sets publicados "Header Desktop-Tablet" (7392:4079) y
 * "Header Mobile" (751:2118) más el componente "Menu usuario"
 * (806:171890) de la página Header. El componente es responsivo: el
 * Header Mobile de Figma es el layout <768px del mismo componente.
 */

// Header Desktop-Tablet — set publicado 7392:4079
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=7392-4079', {
  props: {
    variant: figma.enum('Header', {
      Invex: 'invex',
      'Header-Renacer': 'renacer',
      'Header-Fiduciario': 'fiduciario',
    }),
    userName: figma.string('Nombre usuario'),
    initials: figma.string('Iniciales'),
    showHelp: figma.boolean('Mostrar Ic Ayuda'),
    showClock: figma.boolean('Mostrar Ic Reloj'),
    showNotifications: figma.boolean('Mostrar Ic Notificaciones'),
    showSettings: figma.boolean('Mostrar Ic Configuracion'),
    showUserDate: figma.boolean('Mostrar Ususario Fecha'),
    showAdmin: figma.boolean('Mostrar Admin'),
    showInitials: figma.boolean('Mostrar Iniciales'),
    showProductsButton: figma.boolean('Mostrar Boton Acceso'),
    showMenuIcon: figma.boolean('Mostrar Ic Menu'),
  },
  example: (props) => html`
<Header
  variant="${props.variant}"
  user-name="${props.userName}"
  initials="${props.initials}"
  :show-help="${props.showHelp}"
  :show-clock="${props.showClock}"
  :show-notifications="${props.showNotifications}"
  :show-settings="${props.showSettings}"
  :show-user-date="${props.showUserDate}"
  :show-admin="${props.showAdmin}"
  :show-initials="${props.showInitials}"
  :show-products-button="${props.showProductsButton}"
  :show-menu-icon="${props.showMenuIcon}"
/>`,
  imports: ["import { Header } from '@andromeda/vue'"],
})

// Header Mobile — set publicado 751:2118 (layout <768px del componente)
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=751-2118', {
  props: {
    showNotifications: figma.boolean('Mostrar Icono Notificaciones'),
    showMenuIcon: figma.boolean('Mostrar Icono Menu'),
  },
  example: (props) => html`
<Header
  :show-notifications="${props.showNotifications}"
  :show-menu-icon="${props.showMenuIcon}"
/>`,
  imports: ["import { Header } from '@andromeda/vue'"],
})

// Menu usuario (dropdown de las iniciales) — componente publicado 806:171890
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=806-171890', {
  props: {},
  example: () => html`
<Header :user-menu-open="true" />`,
  imports: ["import { Header } from '@andromeda/vue'"],
})
