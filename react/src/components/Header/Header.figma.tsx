import figma from '@figma/code-connect'
import { Header } from './Header'

/**
 * Header — Code Connect
 * Figma: Ui Kit Web — página Header: sets "Header Desktop-Tablet"
 * (7392:4079) y "Header Mobile" (751:2118) más el componente "Menu
 * usuario" (806:171890). El componente es responsivo: el Header Mobile
 * de Figma es el layout <768px del mismo componente.
 */

// Header Desktop-Tablet — set publicado 7392:4079
figma.connect(
  Header,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=7392-4079',
  {
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
    example: (props) => (
      <Header
        variant={props.variant}
        userName={props.userName}
        initials={props.initials}
        showHelp={props.showHelp}
        showClock={props.showClock}
        showNotifications={props.showNotifications}
        showSettings={props.showSettings}
        showUserDate={props.showUserDate}
        showAdmin={props.showAdmin}
        showInitials={props.showInitials}
        showProductsButton={props.showProductsButton}
        showMenuIcon={props.showMenuIcon}
      />
    ),
  },
)

// Header Mobile — set publicado 751:2118 (layout <768px del componente)
figma.connect(
  Header,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=751-2118',
  {
    props: {
      showNotifications: figma.boolean('Mostrar Icono Notificaciones'),
      showMenuIcon: figma.boolean('Mostrar Icono Menu'),
    },
    example: (props) => (
      <Header
        showNotifications={props.showNotifications}
        showMenuIcon={props.showMenuIcon}
      />
    ),
  },
)

// Menu usuario (dropdown de las iniciales) — componente publicado 806:171890
figma.connect(
  Header,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=806-171890',
  {
    props: {},
    example: () => <Header defaultUserMenuOpen />,
  },
)
