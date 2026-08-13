import figma from '@figma/code-connect'
import { Checkbox } from './Checkbox'
import { RadioButton } from './RadioButton'
import { Switch } from './Switch'

/**
 * Controls — Code Connect
 * Figma: Ui Kit Web — página Forms, sets "Switch atom" (1151:3067),
 * "Switch" (576:6645), "CheckBox" (576:6686) y "RadioButton" (576:6657).
 */

// Switch atom (toggle sin texto) — set publicado 1151:3067
figma.connect(
  Switch,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=1151-3067',
  {
    props: {
      checked: figma.enum('Estatus', { on: true, off: false }),
    },
    example: (props) => <Switch defaultChecked={props.checked} />,
  },
)

// Switch (toggle + texto) — set publicado 576:6645
figma.connect(
  Switch,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=576-6645',
  {
    props: {
      label: figma.boolean('Mostrar Texto', {
        true: figma.string('Texto'),
        false: undefined,
      }),
      checked: figma.enum('Estado', {
        On: true,
        'On Disabled': true,
        Off: false,
        'Off Disabled': false,
      }),
      disabled: figma.enum('Estado', {
        'On Disabled': true,
        'Off Disabled': true,
      }),
    },
    example: (props) => (
      <Switch
        label={props.label}
        defaultChecked={props.checked}
        disabled={props.disabled}
      />
    ),
  },
)

// CheckBox — set publicado 576:6686 (On-Multiple = mismo visual que On,
// usado en listas de selección múltiple)
figma.connect(
  Checkbox,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=576-6686',
  {
    props: {
      label: figma.boolean('Mostrar Texto', {
        true: figma.string('Texto'),
        false: undefined,
      }),
      checked: figma.enum('Estado', {
        On: true,
        'On-Disabled': true,
        'On-Multiple': true,
        Off: false,
        'Off-Disabled': false,
      }),
      disabled: figma.enum('Estado', {
        'On-Disabled': true,
        'Off-Disabled': true,
      }),
    },
    example: (props) => (
      <Checkbox
        label={props.label}
        defaultChecked={props.checked}
        disabled={props.disabled}
      />
    ),
  },
)

// RadioButton — set publicado 576:6657
figma.connect(
  RadioButton,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=576-6657',
  {
    props: {
      label: figma.boolean('Mostrar Texto', {
        true: figma.string('Texto'),
        false: undefined,
      }),
      checked: figma.enum('Estado', {
        On: true,
        'On-Disabled': true,
        Off: false,
        'Off-Disabled': false,
      }),
      disabled: figma.enum('Estado', {
        'On-Disabled': true,
        'Off-Disabled': true,
      }),
    },
    example: (props) => (
      <RadioButton
        label={props.label}
        defaultChecked={props.checked}
        disabled={props.disabled}
      />
    ),
  },
)
