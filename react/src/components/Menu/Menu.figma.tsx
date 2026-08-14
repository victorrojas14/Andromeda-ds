import figma from '@figma/code-connect'
import { Menu } from './Menu'

/**
 * Menu — Code Connect
 * Figma: Ui Kit Web — página Menu, sets "Item Menu" (751:132) y
 * "Menu Mobile" (2944:2982) más el componente "Top Menu Mobile"
 * (751:579). La barra "Menu Desktop" no está publicada; el componente
 * es responsivo y muestra el diseño mobile en <768px.
 */

// Item Menu — set publicado 751:132
figma.connect(
  Menu,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=751-132',
  {
    props: {
      label: figma.string('Texto'),
      showIcon: figma.boolean('Mostrar Icono'),
    },
    example: (props) => (
      <Menu
        items={[
          { label: props.label, showIcon: props.showIcon },
          'Menú',
          'Menú',
        ]}
      />
    ),
  },
)

// Menu Mobile (Estado=Abierto) — set publicado 2944:2982
figma.connect(
  Menu,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=2944-2982',
  {
    props: {},
    example: () => (
      <Menu
        items={['Item menu 1', 'Item menu 2', 'Item menu 3', 'Item menu 4', 'Item menu 5']}
        userName="Nombre Usuario"
        userInitials="NU"
        lastAccess="Último acceso: 08/05/2023 10:25 a.m."
      />
    ),
  },
)

// Top Menu Mobile (barra de usuario) — componente publicado 751:579
figma.connect(
  Menu,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=751-579',
  {
    props: {
      userName: figma.string('Nombre Usuario'),
      userInitials: figma.string('Iniciales'),
    },
    example: (props) => (
      <Menu
        items={['Menú', 'Menú']}
        userName={props.userName}
        userInitials={props.userInitials}
        showProductsButton={false}
      />
    ),
  },
)
