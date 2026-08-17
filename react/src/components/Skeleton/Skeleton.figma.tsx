import figma from '@figma/code-connect'
import { Skeleton } from './Skeleton'

/**
 * Skeleton — Code Connect
 * Figma: Ui Kit Web — página Skeleton, set "Skeleton" (12739:2231).
 * Las variantes Group 1 / Group 2 son las dos fases del shimmer, por
 * lo que ambas mapean al componente animado (animated=false congela
 * el Group 1).
 */

figma.connect(
  Skeleton,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=12739-2231',
  {
    props: {},
    example: () => <Skeleton width={360} height={40} />,
  },
)
