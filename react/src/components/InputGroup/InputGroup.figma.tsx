import figma from '@figma/code-connect'
import { InputGroup } from './InputGroup'

/**
 * InputGroup — Code Connect
 * Figma: Ui Kit Web — página Forms, set "Input group" (13305:3395).
 * Estados Close/Open (desktop) son dinámicos (abrir el dropdown de
 * categorías); Mobile-default/Mobile-selected corresponden al mismo
 * componente en <768px (responsive), con las categorías como chips
 * horizontales de scroll invisible.
 */

figma.connect(
  InputGroup,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=13305-3395',
  {
    props: {
      selectedCategory: figma.enum('State', {
        'Mobile-selected': 'Categoria 1',
      }),
    },
    example: (props) => (
      <InputGroup
        categoryLabel="Categorías"
        placeholder="Buscar"
        categories={['Categoria 1', 'Categoria 2', 'Categoria 3']}
        defaultCategory={props.selectedCategory}
      />
    ),
  },
)
