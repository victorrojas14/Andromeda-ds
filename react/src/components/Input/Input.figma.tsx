import figma from '@figma/code-connect'
import { Input } from './Input'

/*
 * Code Connect — Input (React)
 *
 * Mapea los component sets publicados de la página "Forms":
 * Form-SM (579:992), Form-MD (576:6870) y Form-LG (578:7307).
 * Estados: Error/"No llenado" -> error; Disabled -> disabled;
 * "Llenado-Bloqueado" -> readOnly; Default/Normal/Active son estados
 * dinámicos del propio input (label flotante y foco).
 * Nota: en Form-SM la property de swap del icono se llama "sear".
 */

figma.connect(
  Input,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=579-992',
  {
    props: {
      label: figma.string('Texto Label'),
      assist: figma.boolean('Mostrar Asistencia', {
        true: figma.string('Texto Asistencia'),
        false: undefined,
      }),
      icon: figma.boolean('Mostrar Icono', {
        true: figma.instance('sear'),
        false: undefined,
      }),
      error: figma.enum('Estado', {
        Error: true,
        'No llenado': true,
        Default: false,
        Normal: false,
        Active: false,
        Disabled: false,
        'Llenado-Bloqueado': false,
      }),
      disabled: figma.enum('Estado', {
        Disabled: true,
        Default: false,
        Normal: false,
        Active: false,
        Error: false,
        'Llenado-Bloqueado': false,
        'No llenado': false,
      }),
      readOnly: figma.enum('Estado', {
        'Llenado-Bloqueado': true,
        Default: false,
        Normal: false,
        Active: false,
        Error: false,
        Disabled: false,
        'No llenado': false,
      }),
    },
    example: ({ label, assist, icon, error, disabled, readOnly }) => (
      <Input
        size="sm"
        label={label}
        assist={assist}
        icon={icon}
        error={error}
        disabled={disabled}
        readOnly={readOnly}
      />
    ),
  },
)

figma.connect(
  Input,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=576-6870',
  {
    props: {
      label: figma.string('Texto Label'),
      assist: figma.boolean('Mostrar Asistencia', {
        true: figma.string('Texto Asistencia'),
        false: undefined,
      }),
      icon: figma.boolean('Mostrar Icono', {
        true: figma.instance('Cambiar Icono'),
        false: undefined,
      }),
      error: figma.enum('Estado', {
        Error: true,
        'No llenado': true,
        Default: false,
        Normal: false,
        Active: false,
        Disabled: false,
        'Llenado-Bloqueado': false,
      }),
      disabled: figma.enum('Estado', {
        Disabled: true,
        Default: false,
        Normal: false,
        Active: false,
        Error: false,
        'Llenado-Bloqueado': false,
        'No llenado': false,
      }),
      readOnly: figma.enum('Estado', {
        'Llenado-Bloqueado': true,
        Default: false,
        Normal: false,
        Active: false,
        Error: false,
        Disabled: false,
        'No llenado': false,
      }),
    },
    example: ({ label, assist, icon, error, disabled, readOnly }) => (
      <Input
        size="md"
        label={label}
        assist={assist}
        icon={icon}
        error={error}
        disabled={disabled}
        readOnly={readOnly}
      />
    ),
  },
)

figma.connect(
  Input,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=578-7307',
  {
    props: {
      label: figma.string('Texto Label'),
      assist: figma.boolean('Mostrar Asistencia', {
        true: figma.string('Texto Asistencia'),
        false: undefined,
      }),
      icon: figma.boolean('Mostrar Icono', {
        true: figma.instance('Cambiar Icono'),
        false: undefined,
      }),
      error: figma.enum('Estado', {
        Error: true,
        'No llenado': true,
        Default: false,
        Normal: false,
        Active: false,
        Disabled: false,
        'Llenado-Bloqueado': false,
      }),
      disabled: figma.enum('Estado', {
        Disabled: true,
        Default: false,
        Normal: false,
        Active: false,
        Error: false,
        'Llenado-Bloqueado': false,
        'No llenado': false,
      }),
      readOnly: figma.enum('Estado', {
        'Llenado-Bloqueado': true,
        Default: false,
        Normal: false,
        Active: false,
        Error: false,
        Disabled: false,
        'No llenado': false,
      }),
    },
    example: ({ label, assist, icon, error, disabled, readOnly }) => (
      <Input
        size="lg"
        label={label}
        assist={assist}
        icon={icon}
        error={error}
        disabled={disabled}
        readOnly={readOnly}
      />
    ),
  },
)
