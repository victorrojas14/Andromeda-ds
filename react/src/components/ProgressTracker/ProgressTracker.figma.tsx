import figma from '@figma/code-connect'
import { ProgressTracker } from './ProgressTracker'

/**
 * ProgressTracker — Code Connect
 * Figma: Ui Kit Web — página Progress Tracker, organismo "Límite de
 * crédito" (1135:5344), molécula "BasicProgress" (1114:5032) y átomo
 * "Puntero" (1383:838).
 */

// Límite de crédito — componente publicado 1135:5344
figma.connect(
  ProgressTracker,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=1135-5344',
  {
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
    example: (props) => (
      <ProgressTracker
        value={25}
        tooltip={props.tooltip}
        showTooltip={props.showTooltip}
        limitText={props.limitText}
        showLimitText={props.showLimitText}
        leftValue={props.leftValue}
        showLeft={props.showLeft}
        rightValue={props.rightValue}
        showRight={props.showRight}
      />
    ),
  },
)

// BasicProgress — componente publicado 1114:5032
figma.connect(
  ProgressTracker,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=1114-5032',
  {
    props: {},
    example: () => (
      <ProgressTracker
        value={25}
        showTooltip={false}
        showLimitText={false}
        showLeft={false}
        showRight={false}
      />
    ),
  },
)

// Puntero — set publicado 1383:838
figma.connect(
  ProgressTracker,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=1383-838',
  {
    props: {
      active: figma.enum('Estado', { Default: false, Active: true }),
    },
    example: (props) => (
      <ProgressTracker
        value={25}
        active={props.active}
        showTooltip={false}
        showLimitText={false}
        showLeft={false}
        showRight={false}
      />
    ),
  },
)
