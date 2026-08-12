import figma from '@figma/code-connect'
import { Multiselect } from './Multiselect'

/**
 * Multiselect — Code Connect
 * Figma: Ui Kit Web — página Forms, set "Multiselect dropdown"
 * (13299:2287) y chip "Pill" (13357:3885).
 */

// Multiselect dropdown — set publicado 13299:2287
// Estados Enable/Expanded/One/Multiple/Partial/All son dinámicos
// (selección y apertura del propio componente); Disable -> disabled.
figma.connect(
  Multiselect,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=13299-2287',
  {
    props: {
      disabled: figma.enum('State', { Disable: true }),
    },
    example: (props) => (
      <Multiselect
        label="Selecciona"
        disabled={props.disabled}
        options={['Texto opcion 1', 'Texto opcion 2', 'Texto opcion 3', 'Texto opcion 4', 'Texto opcion 5']}
      />
    ),
  },
)

// Pill (chip de seleccionado en el trigger) — componente publicado 13357:3885
figma.connect(
  Multiselect,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=13357-3885',
  {
    props: {
      texto: figma.string('Text content'),
    },
    example: (props) => (
      <Multiselect
        label="Selecciona"
        options={[props.texto]}
        defaultValue={[props.texto]}
      />
    ),
  },
)
