/*
 * Code Connect — Card (React)
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
 * import figma from '@figma/code-connect'
 * import { CardPhoto, CardAction, CardContact } from './Card'
 * import { Button } from '../Button'
 *
 * figma.connect(CardPhoto, 'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=XXX-XXX', {
 *   props: {
 *     title: figma.string('Titulo'),
 *     children: figma.string('Descripcion'),
 *     horizontal: figma.enum('Orientacion', { Horizontal: true, Vertical: false }),
 *   },
 *   example: ({ title, children, horizontal }) => (
 *     <CardPhoto image="/ruta/imagen.jpg" title={title} horizontal={horizontal}
 *       action={<Button variant="primary" appearance="ghost" size="md">Leer más</Button>}>
 *       {children}
 *     </CardPhoto>
 *   ),
 * })
 *
 * figma.connect(CardAction, '...node-id=XXX-XXX', {
 *   example: () => (
 *     <CardAction date="24 jul 2022" title="Earnings Conference Call 2022 Q3"
 *       action={<Button variant="primary" size="md">Descargar</Button>} />
 *   ),
 * })
 *
 * figma.connect(CardContact, '...node-id=XXX-XXX', {
 *   example: () => (
 *     <CardContact title="Tarjetas de Crédito" email="atencion@invex.com">
 *       <strong>Ciudad de México:</strong> T +52 (55) 4000 4000
 *     </CardContact>
 *   ),
 * })
 */

export {}
