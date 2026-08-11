import figma from '@figma/code-connect'
import { ButtonRounded, ButtonRoundedCard } from './ButtonRounded'
import { ButtonMisProductos } from './ButtonMisProductos'
import { ButtonTrade } from './ButtonTrade'

/*
 * Code Connect — Variantes de botón (React)
 *
 * Mapea los component sets publicados de la página "Buttons variants"
 * (9336:23778): btn/Rounded-LG, btn/Rounded-MD, btn/Mis-Productos,
 * btn-buy y btn-sell. El Estado Hover de Figma se implementa con
 * :hover en CSS, por eso no se mapea como prop.
 */

figma.connect(
  ButtonRounded,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=82-2870',
  {
    props: {
      children: figma.boolean('Mostrar Texto', {
        true: figma.string('Texto'),
        false: undefined,
      }),
      topIcon: figma.boolean('Mostrar Icono Top', {
        true: figma.instance('Cambiar Icono Top'),
        false: undefined,
      }),
      leftIcon: figma.boolean('Mostrar Icono Izq', {
        true: figma.instance('Cambiar Icono Izq'),
        false: undefined,
      }),
      rightIcon: figma.boolean('Mostrar Icono Der', {
        true: figma.instance('Cambiar Icono Der'),
        false: undefined,
      }),
    },
    example: ({ children, topIcon, leftIcon, rightIcon }) => (
      <ButtonRounded topIcon={topIcon} leftIcon={leftIcon} rightIcon={rightIcon}>
        {children}
      </ButtonRounded>
    ),
  },
)

figma.connect(
  ButtonRoundedCard,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=82-3021',
  {
    props: {
      title: figma.boolean('Mostrar Titulo', {
        true: figma.string('Texto Titulo'),
        false: undefined,
      }),
      children: figma.boolean('Mostrar Contenido', {
        true: figma.string('Texto Contenido'),
        false: undefined,
      }),
    },
    example: ({ title, children }) => (
      <ButtonRoundedCard title={title}>{children}</ButtonRoundedCard>
    ),
  },
)

figma.connect(
  ButtonMisProductos,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=5637-1553',
  {
    props: {
      disabled: figma.enum('Estado', {
        Disabled: true,
        Default: false,
        Hover: false,
        Pressed: false,
      }),
    },
    example: ({ disabled }) => <ButtonMisProductos disabled={disabled} />,
  },
)

figma.connect(
  ButtonTrade,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=8471-1337',
  {
    props: {
      selected: figma.enum('Buy', {
        'Selected - hover': true,
        Default: false,
      }),
    },
    example: ({ selected }) => <ButtonTrade variant="buy" selected={selected} />,
  },
)

figma.connect(
  ButtonTrade,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=8471-1346',
  {
    props: {
      selected: figma.enum('Property 1', {
        'Selected -hover': true,
        Default: false,
      }),
    },
    example: ({ selected }) => <ButtonTrade variant="sell" selected={selected} />,
  },
)
