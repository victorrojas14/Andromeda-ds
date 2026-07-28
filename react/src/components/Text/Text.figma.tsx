/*
 * Code Connect — Text (React)
 *
 * BLOQUEADO: la tipografía del archivo Figma "Ui Kit Web" está definida
 * como text styles y Variables (Typography/Web/*), no como componentes
 * publicados en la librería, y Code Connect solo permite conectar
 * componentes/component sets publicados (las páginas "Tipografía Web"
 * 9236:1830 y "Tipografía App" 9252:792 son frames de documentación
 * con nodos de texto sueltos).
 *
 * Cuando el equipo de diseño publique un componente/component set de
 * tipografía (p. ej. "Typography" con properties Variant y Weight),
 * descomentá este bloque y reemplazá el node-id por el del componente:
 *
 * import figma from '@figma/code-connect'
 * import { Text } from './Text'
 *
 * figma.connect(
 *   Text,
 *   'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=XXX-XXX',
 *   {
 *     props: {
 *       variant: figma.enum('Variant', {
 *         'Display 1': 'display-1',
 *         'Display 2': 'display-2',
 *         'Display 3': 'display-3',
 *         'Display 4': 'display-4',
 *         H1: 'h1', H2: 'h2', H3: 'h3', H4: 'h4', H5: 'h5', H6: 'h6',
 *         Parrafo: 'parrafo',
 *         'Parrafo-SM': 'parrafo-sm',
 *         'Parrafo-XS': 'parrafo-xs',
 *         'Small 1': 'small-1',
 *         'Small 2': 'small-2',
 *       }),
 *       weight: figma.enum('Weight', {
 *         Regular: 'regular',
 *         Medium: 'medium',
 *         'Semi-Bold': 'semibold',
 *       }),
 *       children: figma.string('Texto'),
 *     },
 *     example: ({ variant, weight, children }) => (
 *       <Text variant={variant} weight={weight}>{children}</Text>
 *     ),
 *   },
 * )
 */

export {}
