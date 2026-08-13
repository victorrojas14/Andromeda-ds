import figma from '@figma/code-connect'
import { Paginator } from './Paginator'

/**
 * Paginator — Code Connect
 * Figma: Ui Kit Web — página Pagination, sets "Paginador" (3574:815),
 * "NumerosPaginador-1" (175:4701) y "NumerosPaginador-2" (175:4758).
 * Size=Desktop|Mobile es el mismo componente responsivo (<768px:
 * botones de 28px y texto abajo).
 */

// Paginador — set publicado 3574:815
figma.connect(
  Paginator,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=3574-815',
  {
    props: {},
    example: () => <Paginator pageCount={50} defaultPage={1} />,
  },
)

// NumerosPaginador-1 (botón de página desktop 40x40) — set publicado 175:4701
figma.connect(
  Paginator,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=175-4701',
  {
    props: {},
    example: () => <Paginator pageCount={3} showText={false} />,
  },
)

// NumerosPaginador-2 (botón de página mobile 28x28) — set publicado 175:4758
figma.connect(
  Paginator,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=175-4758',
  {
    props: {},
    example: () => <Paginator pageCount={3} showText={false} />,
  },
)
