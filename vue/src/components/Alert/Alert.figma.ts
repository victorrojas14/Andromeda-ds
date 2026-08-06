import figma, { html } from '@figma/code-connect/html'

/*
 * Code Connect — Alert (Vue)
 *
 * Mapea los component sets publicados de la página "Alerts" del
 * archivo Figma "Ui Kit Web":
 *   - Alerta (157:1859): Estado Success/Warning/Danger/Info
 *   - Alertas con accion (157:3460): Estado Success/Warning/Info
 */

figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=157-1859', {
  props: {
    variant: figma.enum('Estado', {
      Success: 'success',
      Warning: 'warning',
      Danger: 'danger',
      Info: 'info',
    }),
    message: figma.string('Mensaje Alerta'),
    contenido: figma.string('Texto Contenido'),
    closable: figma.boolean('Mostrar Icon Der'),
  },
  example: (props) => html`
<Alert variant="${props.variant}" message="${props.message}" :closable="${props.closable}">
  ${props.contenido}
  <template #action>
    <Button variant="secondary" appearance="outline" size="sm">Verificar</Button>
  </template>
</Alert>`,
  imports: ["import { Alert, Button } from '@andromeda/vue'"],
})

figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=157-3460', {
  props: {
    variant: figma.enum('Estado', {
      Success: 'success',
      Warning: 'warning',
      Info: 'info',
    }),
  },
  example: (props) => html`
<AlertBlock variant="${props.variant}">
  Aww sí, leíste con éxito este importante mensaje de alerta.
  <template #footer>
    Siempre que lo necesite, asegúrese de usar utilidades de margen para mantener las cosas ordenadas.
  </template>
</AlertBlock>`,
  imports: ["import { AlertBlock } from '@andromeda/vue'"],
})
