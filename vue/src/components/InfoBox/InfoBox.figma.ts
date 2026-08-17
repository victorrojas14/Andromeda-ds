import figma, { html } from '@figma/code-connect/html'

/*
 * Code Connect — InfoBox (Vue)
 *
 * Mapea el set publicado "Info Box" (14524:69295) de la página
 * Infobox con Título, Descripción y Type (6 variantes).
 */

figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=14524-69295', {
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
  example: (props) => html`
<InfoBox
  type="${props.type}"
  title="${props.title}"
  description="${props.description}"
/>`,
  imports: ["import { InfoBox } from '@andromeda/vue'"],
})
