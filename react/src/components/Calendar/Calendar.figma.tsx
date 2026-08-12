import figma from '@figma/code-connect'
import { Calendar } from './Calendar'

/**
 * Calendar — Code Connect
 * Figma: Ui Kit Web — página Forms, componente "Calendario--Form"
 * (128:2669) y set "NumeroCalendario" (9516:6331).
 */

// Calendario--Form (panel del calendario) — componente publicado 128:2669
figma.connect(
  Calendar,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=128-2669',
  {
    props: {},
    example: () => <Calendar variant="primary" defaultValue="2023-07-24" />,
  },
)

// NumeroCalendario (celda de día) — set publicado 9516:6331
// Los estados Default/Disabled/Selected/Weekend/Current day/timelapse
// los resuelve dinámicamente el Calendar según la fecha.
figma.connect(
  Calendar,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=9516-6331',
  {
    props: {},
    example: () => <Calendar variant="primary" />,
  },
)
