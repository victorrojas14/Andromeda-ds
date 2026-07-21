import figma from '@figma/code-connect'
import { Button } from './Button'

/*
 * Code Connect — Button (React)
 *
 * Este archivo mapea los component sets del archivo Figma "Ui Kit Web"
 * a este componente Button. Como el DS actual tiene los botones
 * fragmentados en muchos component sets, cada uno recibe su propia
 * llamada a figma.connect() con los props del Button consolidado
 * pre-seteados.
 *
 * IMPORTANTE:
 *   1. Los nodeIds abajo son del archivo actual (fileKey
 *      oTZzdsgGkCjbL2f3oybxD0). Verificalos antes de publicar.
 *   2. Solo tengo confirmado el nodeId del btn/ghost-primary-SM
 *      (513:5257). Los demás son placeholders — reemplazalos con
 *      los reales usando Dev Mode de Figma → click en el component set
 *      → "Copy link".
 *   3. Cuando termine el refactor del DS (un único component set
 *      Button con properties variant/appearance/size), borrá todas
 *      estas llamadas y dejá UNA sola apuntando al Button consolidado.
 */

const FIGMA_FILE = 'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web'

/* ---- btn/ghost-primary-SM (nodeId confirmado) ---------------------- */
figma.connect(Button, `${FIGMA_FILE}?node-id=513-5257`, {
  props: {
    children: figma.string('Texto ghost'),
    disabled: figma.enum('Estado', {
      Default: false,
      Hover: false,
      Disabled: true,
    }),
    leftIcon: figma.boolean('Mostrar Icono Izq', {
      true: figma.instance('Cambiar Icono Izq'),
      false: undefined,
    }),
    // Nota: en el DS el nombre tiene un typo ("Camciar" en vez de "Cambiar").
    // Lo mantenemos igual porque así se llama la property en Figma.
    rightIcon: figma.boolean('Mostrar Icono Der', {
      true: figma.instance('Camciar Icono Der'),
      false: undefined,
    }),
  },
  example: ({ children, disabled, leftIcon, rightIcon }) => (
    <Button
      variant="primary"
      appearance="ghost"
      size="sm"
      disabled={disabled}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
    >
      {children}
    </Button>
  ),
})

/* ---- Plantillas para el resto de los component sets ----------------
 * Descomentá y reemplazá el node-id de cada uno con el real:
 *
 * figma.connect(Button, `${FIGMA_FILE}?node-id=XXX-XXX`, {
 *   props: {
 *     children: figma.string('Texto'),
 *     disabled: figma.enum('Estado', { Default: false, Hover: false, Disabled: true, Pressed: false }),
 *     leftIcon: figma.boolean('Mostrar Icono Izq', {
 *       true: figma.instance('Cambiar Icono Izq'), false: undefined,
 *     }),
 *     rightIcon: figma.boolean('Mostrar Icono Der', {
 *       true: figma.instance('Cambiar Icono Der'), false: undefined,
 *     }),
 *   },
 *   example: ({ children, disabled, leftIcon, rightIcon }) => (
 *     <Button variant="primary" appearance="solid" size="md" disabled={disabled} leftIcon={leftIcon} rightIcon={rightIcon}>
 *       {children}
 *     </Button>
 *   ),
 * })
 *
 * Mapeo variant/appearance/size según el nombre del component set:
 *   btn/primary-{XSM|SM|MD|LG}          →  variant=primary   appearance=solid    size=xs|sm|md|lg
 *   btn/primary-Outline-{SM|MD|LG}      →  variant=primary   appearance=outline  size=sm|md|lg
 *   btn/secondary-{SM|LG}               →  variant=secondary appearance=solid    size=sm|lg
 *   btn/secondary-Outline-SM            →  variant=secondary appearance=outline  size=sm
 *   btn/ghost-primary-{SM|MD|LG}        →  variant=primary   appearance=ghost    size=sm|md|lg
 *   btn/ghost-secondary-{SM|MD}         →  variant=secondary appearance=ghost    size=sm|md
 *   btn/Rounded-{MD|LG}                 →  (revisar; probablemente solid rounded)
 * ------------------------------------------------------------------- */
