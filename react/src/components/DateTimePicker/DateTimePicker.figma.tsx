import figma from '@figma/code-connect'
import { DateTimePicker } from './DateTimePicker'

/**
 * DateTimePicker — Code Connect
 * Figma: Ui Kit Web — página Date Picker, set "TimeLapse Calendar"
 * (13717:51508). Los estados Empty/Half-completed/Completed son
 * dinámicos (selección del rango en el propio componente).
 */

figma.connect(
  DateTimePicker,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=13717-51508',
  {
    props: {
      showBusinessDays: figma.boolean('Mostrar días seleccionados?'),
      showApplyButton: figma.boolean('Mostrar botón aplicar'),
    },
    example: (props) => (
      <DateTimePicker
        startLabel="Seleccionar fecha de inicio"
        endLabel="Seleccionar fecha de fin"
        showBusinessDays={props.showBusinessDays}
        showApplyButton={props.showApplyButton}
      />
    ),
  },
)
