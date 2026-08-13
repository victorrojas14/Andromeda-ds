import figma, { html } from '@figma/code-connect/html'

/*
 * Code Connect — Tooltip + RichTooltip (Vue)
 *
 * Mapea los sets publicados "Tooltips" (731:121) y "Rich Tooltip"
 * (12679:284) de la página Tooltips. La Direction/Tipo de Figma
 * nombra el lado de la flecha (que apunta al target), por lo que se
 * mapea al lado opuesto: la prop `position` es dónde aparece el
 * tooltip.
 */

// Tooltips — set publicado 731:121
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=731-121', {
  props: {
    theme: figma.enum('Theme', {
      Light: 'light',
      Dark: 'dark',
    }),
    position: figma.enum('Direction', {
      Top: 'bottom',
      Bottom: 'top',
      Left: 'right',
      Right: 'left',
    }),
  },
  example: (props) => html`
<Tooltip content="Ejemplo" theme="${props.theme}" position="${props.position}">
  <Button variant="primary" appearance="solid" size="md">Objetivo</Button>
</Tooltip>`,
  imports: ["import { Tooltip, Button } from '@andromeda/vue'"],
})

// Rich Tooltip — set publicado 12679:284
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=12679-284', {
  props: {
    showButtons: figma.boolean('Show Buttons'),
    showButtonRight: figma.boolean('Show Button Right'),
    theme: figma.enum('Tipo', {
      'Light Top': 'light',
      'Light Bottom': 'light',
      'Light Left': 'light',
      'Light Right': 'light',
      'Dark Top': 'dark',
      'Dark Bottom': 'dark',
      'Dark Left': 'dark',
      'Dark Right': 'dark',
    }),
    position: figma.enum('Tipo', {
      'Light Top': 'bottom',
      'Dark Top': 'bottom',
      'Light Bottom': 'top',
      'Dark Bottom': 'top',
      'Light Left': 'right',
      'Dark Left': 'right',
      'Light Right': 'left',
      'Dark Right': 'left',
    }),
  },
  example: (props) => html`
<RichTooltip
  title="Rich tooltip"
  content="La referencia númerica ayuda a identificar tu pago."
  theme="${props.theme}"
  position="${props.position}"
  :show-buttons="${props.showButtons}"
  :show-button-right="${props.showButtonRight}"
>
  <Button variant="primary" appearance="solid" size="md">Objetivo</Button>
</RichTooltip>`,
  imports: ["import { RichTooltip, Button } from '@andromeda/vue'"],
})
