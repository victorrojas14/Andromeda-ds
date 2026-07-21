import figma from '@figma/code-connect'
import { Button } from './Button'

/*
 * Code Connect — Button (React)
 *
 * Mapea los component sets del archivo Figma "Ui Kit Web"
 * (fileKey oTZzdsgGkCjbL2f3oybxD0) a este Button consolidado.
 * Los nodeIds se extrajeron de los componentes publicados en la
 * librería (página "🟢 Buttons").
 *
 * El parser de Code Connect exige literales dentro de cada
 * figma.connect(), por eso las URLs y props se repiten inline.
 *
 * Quirks del DS actual que se respetan a propósito:
 *   - Los ghosts usan la property "Texto ghost" (y ghost-secondary-MD
 *     usa "Texto Link").
 *   - btn/ghost-primary-SM tiene el typo "Camciar Icono Der".
 *   - Los ghosts no tienen estado Pressed.
 *   - btn/secondary-MD no tiene properties: se mapea con un ejemplo fijo.
 *   - No se mapean btn/Rounded-* ni btn/Mis-Productos: tienen otra
 *     anatomía y tendrán su propio componente.
 *
 * Cuando termine el refactor del DS (un único component set Button con
 * properties variant/appearance/size), borrá todas estas llamadas y
 * dejá UNA sola apuntando al Button consolidado.
 */

/* ============================================================
 * Solid primary — btn/primary-{XSM|SM|MD|LG}
 * ============================================================ */
figma.connect(
  Button,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=13775-11069',
  {
    props: {
      children: figma.string('Texto'),
      disabled: figma.enum('Estado', { Default: false, Hover: false, Pressed: false, Disabled: true }),
      leftIcon: figma.boolean('Mostrar Icono Izq', {
        true: figma.instance('Cambiar Icono Izq'),
        false: undefined,
      }),
      rightIcon: figma.boolean('Mostrar Icono Der', {
        true: figma.instance('Cambiar Icono Der'),
        false: undefined,
      }),
    },
    example: ({ children, disabled, leftIcon, rightIcon }) => (
      <Button variant="primary" appearance="solid" size="xs" disabled={disabled} leftIcon={leftIcon} rightIcon={rightIcon}>
        {children}
      </Button>
    ),
  },
)

figma.connect(
  Button,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=76-315',
  {
    props: {
      children: figma.string('Texto'),
      disabled: figma.enum('Estado', { Default: false, Hover: false, Pressed: false, Disabled: true }),
      leftIcon: figma.boolean('Mostrar Icono Izq', {
        true: figma.instance('Cambiar Icono Izq'),
        false: undefined,
      }),
      rightIcon: figma.boolean('Mostrar Icono Der', {
        true: figma.instance('Cambiar Icono Der'),
        false: undefined,
      }),
    },
    example: ({ children, disabled, leftIcon, rightIcon }) => (
      <Button variant="primary" appearance="solid" size="sm" disabled={disabled} leftIcon={leftIcon} rightIcon={rightIcon}>
        {children}
      </Button>
    ),
  },
)

figma.connect(
  Button,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=61-3795',
  {
    props: {
      children: figma.string('Texto'),
      disabled: figma.enum('Estado', { Default: false, Hover: false, Pressed: false, Disabled: true }),
      leftIcon: figma.boolean('Mostrar Icono Izq', {
        true: figma.instance('Cambiar Icono Izq'),
        false: undefined,
      }),
      rightIcon: figma.boolean('Mostrar Icono Der', {
        true: figma.instance('Cambiar Icono Der'),
        false: undefined,
      }),
    },
    example: ({ children, disabled, leftIcon, rightIcon }) => (
      <Button variant="primary" appearance="solid" size="md" disabled={disabled} leftIcon={leftIcon} rightIcon={rightIcon}>
        {children}
      </Button>
    ),
  },
)

figma.connect(
  Button,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=76-225',
  {
    props: {
      children: figma.string('Texto'),
      disabled: figma.enum('Estado', { Default: false, Hover: false, Pressed: false, Disabled: true }),
      leftIcon: figma.boolean('Mostrar Icono Izq', {
        true: figma.instance('Cambiar Icono Izq'),
        false: undefined,
      }),
      rightIcon: figma.boolean('Mostrar Icono Der', {
        true: figma.instance('Cambiar Icono Der'),
        false: undefined,
      }),
    },
    example: ({ children, disabled, leftIcon, rightIcon }) => (
      <Button variant="primary" appearance="solid" size="lg" disabled={disabled} leftIcon={leftIcon} rightIcon={rightIcon}>
        {children}
      </Button>
    ),
  },
)

/* ============================================================
 * Outline primary — btn/primary-Outline-{SM|MD|LG}
 * ============================================================ */
figma.connect(
  Button,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=76-491',
  {
    props: {
      children: figma.string('Texto'),
      disabled: figma.enum('Estado', { Default: false, Hover: false, Pressed: false, Disabled: true }),
      leftIcon: figma.boolean('Mostrar Icono Izq', {
        true: figma.instance('Cambiar Icono Izq'),
        false: undefined,
      }),
      rightIcon: figma.boolean('Mostrar Icono Der', {
        true: figma.instance('Cambiar Icono Der'),
        false: undefined,
      }),
    },
    example: ({ children, disabled, leftIcon, rightIcon }) => (
      <Button variant="primary" appearance="outline" size="sm" disabled={disabled} leftIcon={leftIcon} rightIcon={rightIcon}>
        {children}
      </Button>
    ),
  },
)

figma.connect(
  Button,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=76-429',
  {
    props: {
      children: figma.string('Texto'),
      disabled: figma.enum('Estado', { Default: false, Hover: false, Pressed: false, Disabled: true }),
      leftIcon: figma.boolean('Mostrar Icono Izq', {
        true: figma.instance('Cambiar Icono Izq'),
        false: undefined,
      }),
      rightIcon: figma.boolean('Mostrar Icono Der', {
        true: figma.instance('Cambiar Icono Der'),
        false: undefined,
      }),
    },
    example: ({ children, disabled, leftIcon, rightIcon }) => (
      <Button variant="primary" appearance="outline" size="md" disabled={disabled} leftIcon={leftIcon} rightIcon={rightIcon}>
        {children}
      </Button>
    ),
  },
)

figma.connect(
  Button,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=76-523',
  {
    props: {
      children: figma.string('Texto'),
      disabled: figma.enum('Estado', { Default: false, Hover: false, Pressed: false, Disabled: true }),
      leftIcon: figma.boolean('Mostrar Icono Izq', {
        true: figma.instance('Cambiar Icono Izq'),
        false: undefined,
      }),
      rightIcon: figma.boolean('Mostrar Icono Der', {
        true: figma.instance('Cambiar Icono Der'),
        false: undefined,
      }),
    },
    example: ({ children, disabled, leftIcon, rightIcon }) => (
      <Button variant="primary" appearance="outline" size="lg" disabled={disabled} leftIcon={leftIcon} rightIcon={rightIcon}>
        {children}
      </Button>
    ),
  },
)

/* ============================================================
 * Solid secondary — btn/secondary-{SM|MD|LG}
 * ============================================================ */
figma.connect(
  Button,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=76-1481',
  {
    props: {
      children: figma.string('Texto'),
      disabled: figma.enum('Estado', { Default: false, Hover: false, Pressed: false, Disabled: true }),
      leftIcon: figma.boolean('Mostrar Icono Izq', {
        true: figma.instance('Cambiar Icono Izq'),
        false: undefined,
      }),
      rightIcon: figma.boolean('Mostrar Icono Der', {
        true: figma.instance('Cambiar Icono Der'),
        false: undefined,
      }),
    },
    example: ({ children, disabled, leftIcon, rightIcon }) => (
      <Button variant="secondary" appearance="solid" size="sm" disabled={disabled} leftIcon={leftIcon} rightIcon={rightIcon}>
        {children}
      </Button>
    ),
  },
)

// btn/secondary-MD no expone properties en Figma.
figma.connect(
  Button,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=76-1489',
  {
    example: () => (
      <Button variant="secondary" appearance="solid" size="md">
        Texto Boton
      </Button>
    ),
  },
)

figma.connect(
  Button,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=76-1497',
  {
    props: {
      children: figma.string('Texto'),
      disabled: figma.enum('Estado', { Default: false, Hover: false, Pressed: false, Disabled: true }),
      leftIcon: figma.boolean('Mostrar Icono Izq', {
        true: figma.instance('Cambiar Icono Izq'),
        false: undefined,
      }),
      rightIcon: figma.boolean('Mostrar Icono Der', {
        true: figma.instance('Cambiar Icono Der'),
        false: undefined,
      }),
    },
    example: ({ children, disabled, leftIcon, rightIcon }) => (
      <Button variant="secondary" appearance="solid" size="lg" disabled={disabled} leftIcon={leftIcon} rightIcon={rightIcon}>
        {children}
      </Button>
    ),
  },
)

/* ============================================================
 * Outline secondary — btn/secondary-Outline-{SM|MD|XL}
 * (XL se mapea a size="lg", el mayor del Button consolidado)
 * ============================================================ */
figma.connect(
  Button,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=76-1505',
  {
    props: {
      children: figma.string('Texto'),
      disabled: figma.enum('Estado', { Default: false, Hover: false, Pressed: false, Disabled: true }),
      leftIcon: figma.boolean('Mostrar Icono Izq', {
        true: figma.instance('Cambiar Icono Izq'),
        false: undefined,
      }),
      rightIcon: figma.boolean('Mostrar Icono Der', {
        true: figma.instance('Cambiar Icono Der'),
        false: undefined,
      }),
    },
    example: ({ children, disabled, leftIcon, rightIcon }) => (
      <Button variant="secondary" appearance="outline" size="sm" disabled={disabled} leftIcon={leftIcon} rightIcon={rightIcon}>
        {children}
      </Button>
    ),
  },
)

figma.connect(
  Button,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=76-1513',
  {
    props: {
      children: figma.string('Texto'),
      disabled: figma.enum('Estado', { Default: false, Hover: false, Pressed: false, Disabled: true }),
      leftIcon: figma.boolean('Mostrar Icono Izq', {
        true: figma.instance('Cambiar Icono Izq'),
        false: undefined,
      }),
      rightIcon: figma.boolean('Mostrar Icono Der', {
        true: figma.instance('Cambiar Icono Der'),
        false: undefined,
      }),
    },
    example: ({ children, disabled, leftIcon, rightIcon }) => (
      <Button variant="secondary" appearance="outline" size="md" disabled={disabled} leftIcon={leftIcon} rightIcon={rightIcon}>
        {children}
      </Button>
    ),
  },
)

figma.connect(
  Button,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=76-1527',
  {
    props: {
      children: figma.string('Texto'),
      disabled: figma.enum('Estado', { Default: false, Hover: false, Pressed: false, Disabled: true }),
      leftIcon: figma.boolean('Mostrar Icono Izq', {
        true: figma.instance('Cambiar Icono Izq'),
        false: undefined,
      }),
      rightIcon: figma.boolean('Mostrar Icono Der', {
        true: figma.instance('Cambiar Icono Der'),
        false: undefined,
      }),
    },
    example: ({ children, disabled, leftIcon, rightIcon }) => (
      <Button variant="secondary" appearance="outline" size="lg" disabled={disabled} leftIcon={leftIcon} rightIcon={rightIcon}>
        {children}
      </Button>
    ),
  },
)

/* ============================================================
 * Ghost primary — btn/ghost-primary-{SM|MD|LG}
 * ============================================================ */
figma.connect(
  Button,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=513-5257',
  {
    props: {
      children: figma.string('Texto ghost'),
      disabled: figma.enum('Estado', { Default: false, Hover: false, Disabled: true }),
      leftIcon: figma.boolean('Mostrar Icono Izq', {
        true: figma.instance('Cambiar Icono Izq'),
        false: undefined,
      }),
      // Typo real de la property en Figma: "Camciar".
      rightIcon: figma.boolean('Mostrar Icono Der', {
        true: figma.instance('Camciar Icono Der'),
        false: undefined,
      }),
    },
    example: ({ children, disabled, leftIcon, rightIcon }) => (
      <Button variant="primary" appearance="ghost" size="sm" disabled={disabled} leftIcon={leftIcon} rightIcon={rightIcon}>
        {children}
      </Button>
    ),
  },
)

figma.connect(
  Button,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=210-3922',
  {
    props: {
      children: figma.string('Texto ghost'),
      disabled: figma.enum('Estado', { Default: false, Hover: false, Disabled: true }),
      leftIcon: figma.boolean('Mostrar Icono Izq', {
        true: figma.instance('Cambiar Icono Izq'),
        false: undefined,
      }),
      rightIcon: figma.boolean('Mostrar Icono Der', {
        true: figma.instance('Cambiar Icono Der'),
        false: undefined,
      }),
    },
    example: ({ children, disabled, leftIcon, rightIcon }) => (
      <Button variant="primary" appearance="ghost" size="md" disabled={disabled} leftIcon={leftIcon} rightIcon={rightIcon}>
        {children}
      </Button>
    ),
  },
)

figma.connect(
  Button,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=513-5411',
  {
    props: {
      children: figma.string('Texto ghost'),
      disabled: figma.enum('Estado', { Default: false, Hover: false, Disabled: true }),
      leftIcon: figma.boolean('Mostrar Icono Izq', {
        true: figma.instance('Cambiar Icono Izq'),
        false: undefined,
      }),
      rightIcon: figma.boolean('Mostrar Icono Der', {
        true: figma.instance('Cambiar Icono Der'),
        false: undefined,
      }),
    },
    example: ({ children, disabled, leftIcon, rightIcon }) => (
      <Button variant="primary" appearance="ghost" size="lg" disabled={disabled} leftIcon={leftIcon} rightIcon={rightIcon}>
        {children}
      </Button>
    ),
  },
)

/* ============================================================
 * Ghost secondary — btn/ghost-secondary-{SM|MD|LG}
 * ============================================================ */
figma.connect(
  Button,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=513-5570',
  {
    props: {
      children: figma.string('Texto ghost'),
      disabled: figma.enum('Estado', { Default: false, Hover: false, Disabled: true }),
      leftIcon: figma.boolean('Mostrar Icono Izq', {
        true: figma.instance('Cambiar Icono Izq'),
        false: undefined,
      }),
      rightIcon: figma.boolean('Mostrar Icono Der', {
        true: figma.instance('Cambiar Icono Der'),
        false: undefined,
      }),
    },
    example: ({ children, disabled, leftIcon, rightIcon }) => (
      <Button variant="secondary" appearance="ghost" size="sm" disabled={disabled} leftIcon={leftIcon} rightIcon={rightIcon}>
        {children}
      </Button>
    ),
  },
)

figma.connect(
  Button,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=210-4183',
  {
    props: {
      children: figma.string('Texto Link'),
      disabled: figma.enum('Estado', { Default: false, Hover: false, Disabled: true }),
      leftIcon: figma.boolean('Mostrar Icono Izq', {
        true: figma.instance('Cambiar Icono Izq'),
        false: undefined,
      }),
      rightIcon: figma.boolean('Mostrar Icono Der', {
        true: figma.instance('Cambiar Icono Der'),
        false: undefined,
      }),
    },
    example: ({ children, disabled, leftIcon, rightIcon }) => (
      <Button variant="secondary" appearance="ghost" size="md" disabled={disabled} leftIcon={leftIcon} rightIcon={rightIcon}>
        {children}
      </Button>
    ),
  },
)

figma.connect(
  Button,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=513-5544',
  {
    props: {
      children: figma.string('Texto ghost'),
      disabled: figma.enum('Estado', { Default: false, Hover: false, Disabled: true }),
      leftIcon: figma.boolean('Mostrar Icono Izq', {
        true: figma.instance('Cambiar Icono Izq'),
        false: undefined,
      }),
      rightIcon: figma.boolean('Mostrar Icono Der', {
        true: figma.instance('Cambiar Icono Der'),
        false: undefined,
      }),
    },
    example: ({ children, disabled, leftIcon, rightIcon }) => (
      <Button variant="secondary" appearance="ghost" size="lg" disabled={disabled} leftIcon={leftIcon} rightIcon={rightIcon}>
        {children}
      </Button>
    ),
  },
)
