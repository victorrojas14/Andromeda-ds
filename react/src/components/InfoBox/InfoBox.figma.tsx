import figma from '@figma/code-connect'
import { InfoBox } from './InfoBox'

/**
 * InfoBox — Code Connect
 * Figma: Ui Kit Web — página Infobox, set publicado "Info Box"
 * (14524:69295) con Título, Descripción y Type (6 variantes).
 */

figma.connect(
  InfoBox,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=14524-69295',
  {
    props: {
      title: figma.string('Título'),
      description: figma.string('Descripción'),
      type: figma.enum('Type', {
        'Legal o de riesgo': 'legal',
        'Regla de negocio': 'negocio',
        'Interaccion & funcionalidad': 'interaccion',
        'Nota general': 'nota',
        'Acuerdo de diseño': 'diseno',
        'Definición de desarrollo': 'desarrollo',
      }),
    },
    example: (props) => (
      <InfoBox type={props.type} title={props.title} description={props.description} />
    ),
  },
)
