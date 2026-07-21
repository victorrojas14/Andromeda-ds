import figma, { html } from '@figma/code-connect/html'

/*
 * Code Connect — Button (Vue)
 *
 * Vue no tiene un integrador nativo de Code Connect; se usa el
 * integrador `html` que soporta Vue, Angular y Web Components.
 * El `example` es un template string con markup Vue real.
 *
 * NOTAS:
 *   - Solo tengo confirmado el nodeId del btn/ghost-primary-SM
 *     (513:5257). Los demás son plantillas — descomentalos y
 *     reemplazá el node-id con los reales.
 *   - Cuando el DS se consolide en UN solo Button en Figma,
 *     dejá una sola llamada a figma.connect().
 */

const FIGMA_FILE = 'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web'

/* ---- btn/ghost-primary-SM (nodeId confirmado) ---------------------- */
figma.connect(`${FIGMA_FILE}?node-id=513-5257`, {
  props: {
    label: figma.string('Texto ghost'),
    disabled: figma.enum('Estado', {
      Default: false,
      Hover: false,
      Disabled: true,
    }),
    showLeftIcon: figma.boolean('Mostrar Icono Izq'),
    showRightIcon: figma.boolean('Mostrar Icono Der'),
  },
  example: (props) => html`
<Button
  variant="primary"
  appearance="ghost"
  size="sm"
  :disabled="${props.disabled}"
>
  ${props.label}
</Button>`,
  imports: [`import { Button } from '@andromeda/vue'`],
})

/* ---- Plantillas para el resto ---------------------------------------
 *
 * figma.connect(`${FIGMA_FILE}?node-id=XXX-XXX`, {
 *   props: {
 *     label: figma.string('Texto'),
 *     disabled: figma.enum('Estado', { Default: false, Hover: false, Disabled: true }),
 *   },
 *   example: (props) => html`
 * <Button variant="primary" appearance="solid" size="md" :disabled="${props.disabled}">
 *   ${props.label}
 * </Button>`,
 *   imports: [`import { Button } from '@andromeda/vue'`],
 * })
 *
 * Mapeo variant/appearance/size según el nombre del component set:
 *   btn/primary-{XSM|SM|MD|LG}          →  variant=primary   appearance=solid    size=xs|sm|md|lg
 *   btn/primary-Outline-{SM|MD|LG}      →  variant=primary   appearance=outline  size=sm|md|lg
 *   btn/secondary-{SM|LG}               →  variant=secondary appearance=solid    size=sm|lg
 *   btn/secondary-Outline-SM            →  variant=secondary appearance=outline  size=sm
 *   btn/ghost-primary-{SM|MD|LG}        →  variant=primary   appearance=ghost    size=sm|md|lg
 *   btn/ghost-secondary-{SM|MD}         →  variant=secondary appearance=ghost    size=sm|md
 * ------------------------------------------------------------------- */
