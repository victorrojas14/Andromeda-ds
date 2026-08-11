import figma from '@figma/code-connect'
import { Divider } from './Divider'

/*
 * Code Connect — Divider (React)
 *
 * Mapea los componentes publicados de la página "Dividers" del archivo
 * Figma "Ui Kit Web". Cada espaciado es un componente independiente
 * (no un component set), así que hay una llamada por cada uno.
 * "Divider 30px" (1151:23944) existe en la página pero no está
 * publicado en la librería; el componente igual soporta spacing={30}.
 */

figma.connect(
  Divider,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=1151-23935',
  { example: () => <Divider /> },
)

figma.connect(
  Divider,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=1151-23946',
  { example: () => <Divider spacing={10} /> },
)

figma.connect(
  Divider,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=1151-23947',
  { example: () => <Divider spacing={20} /> },
)

figma.connect(
  Divider,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=1151-23965',
  { example: () => <Divider spacing={40} /> },
)

figma.connect(
  Divider,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=1151-23966',
  { example: () => <Divider spacing={50} /> },
)

figma.connect(
  Divider,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=1151-23967',
  { example: () => <Divider spacing={70} /> },
)

figma.connect(
  Divider,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=1151-23968',
  { example: () => <Divider spacing={90} /> },
)
