/*
 * Code Connect — Card (Vue)
 *
 * BLOQUEADO: las cards de la página "Cards" del archivo Figma "Ui Kit
 * Web" ("Card Photo" 536:8556/536:8557 y "Card Action" 541:8593/
 * 541:8608) son frames de documentación, no componentes publicados en
 * la librería, y Code Connect solo permite conectar componentes o
 * component sets publicados.
 *
 * Cuando el equipo de diseño publique los componentes Card,
 * descomentá el bloque correspondiente y reemplazá el node-id:
 *
 * import figma, { html } from '@figma/code-connect/html'
 *
 * figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=XXX-XXX', {
 *   props: {
 *     title: figma.string('Titulo'),
 *     descripcion: figma.string('Descripcion'),
 *     horizontal: figma.enum('Orientacion', { Horizontal: 'true', Vertical: 'false' }),
 *   },
 *   example: (props) => html`
 * <CardPhoto image="/ruta/imagen.jpg" title="${props.title}" :horizontal="${props.horizontal}">
 *   ${props.descripcion}
 *   <template #action>
 *     <Button variant="primary" appearance="ghost" size="md">Leer más</Button>
 *   </template>
 * </CardPhoto>`,
 *   imports: ["import { CardPhoto, Button } from '@andromeda/vue'"],
 * })
 *
 * // CardAction y CardContact: análogo, con date/title/#action y
 * // title/email/slot default respectivamente.
 */

export {}
