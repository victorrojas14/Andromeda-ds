import figma, { html } from '@figma/code-connect/html'

/*
 * Code Connect — ProgressTracker (Vue)
 *
 * Mapea el organismo publicado "Límite de crédito" (1135:5344), la
 * molécula "BasicProgress" (1114:5032) y el átomo "Puntero" (1383:838)
 * de la página Progress Tracker.
 */

// Límite de crédito — componente publicado 1135:5344
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=1135-5344', {
  props: {
    limitText: figma.string('Limite credito'),
    leftValue: figma.string('Saldo'),
    rightValue: figma.string('Disponible'),
    tooltip: figma.string('Tooltip'),
    showLimitText: figma.boolean('Mostrar texto top'),
    showLeft: figma.boolean('Mostrar texto Izq'),
    showRight: figma.boolean('Mostrar texto der'),
    showTooltip: figma.boolean('Mostrar tooltip'),
  },
  example: (props) => html`
<ProgressTracker
  :value="25"
  tooltip="${props.tooltip}"
  :show-tooltip="${props.showTooltip}"
  limit-text="${props.limitText}"
  :show-limit-text="${props.showLimitText}"
  left-value="${props.leftValue}"
  :show-left="${props.showLeft}"
  right-value="${props.rightValue}"
  :show-right="${props.showRight}"
/>`,
  imports: ["import { ProgressTracker } from '@andromeda/vue'"],
})

// BasicProgress — componente publicado 1114:5032
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=1114-5032', {
  props: {},
  example: () => html`
<ProgressTracker
  :value="25"
  :show-tooltip="false"
  :show-limit-text="false"
  :show-left="false"
  :show-right="false"
/>`,
  imports: ["import { ProgressTracker } from '@andromeda/vue'"],
})

// Puntero — set publicado 1383:838
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=1383-838', {
  props: {
    active: figma.enum('Estado', { Default: false, Active: true }),
  },
  example: (props) => html`
<ProgressTracker
  :value="25"
  :active="${props.active}"
  :show-tooltip="false"
  :show-limit-text="false"
  :show-left="false"
  :show-right="false"
/>`,
  imports: ["import { ProgressTracker } from '@andromeda/vue'"],
})
