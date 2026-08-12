import figma from '@figma/code-connect'
import { Dropdown } from './Dropdown'

/**
 * Dropdown — Code Connect
 * Figma: Ui Kit Web — página Dropdown (9477:15495)
 */

// Form option (trigger del dropdown) — set publicado 1484:1595
figma.connect(
  Dropdown,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=1484-1595',
  {
    props: {},
    example: () => (
      <Dropdown
        label="Seleccionar"
        options={['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4', 'Opción 5']}
      />
    ),
  },
)

// Dropdown--full--new (panel completo con buscador e items) — set publicado 13748:7858
figma.connect(
  Dropdown,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=13748-7858',
  {
    props: {
      checkShape: figma.enum('Variant', {
        'Square left': 'square',
        'square right': 'square',
        'circle left': 'circle',
        'circle right': 'circle',
      }),
      checkPosition: figma.enum('Variant', {
        'Square left': 'left',
        'square right': 'right',
        'circle left': 'left',
        'circle right': 'right',
      }),
    },
    example: (props) => (
      <Dropdown
        label="Seleccionar"
        checkShape={props.checkShape}
        checkPosition={props.checkPosition}
        options={['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4', 'Opción 5']}
      />
    ),
  },
)

// Input busqueda (buscador interno del panel) — set publicado 13661:15601
figma.connect(
  Dropdown,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=13661-15601',
  {
    props: {},
    example: () => (
      <Dropdown
        searchable
        searchPlaceholder="Buscar"
        options={['Opción 1', 'Opción 2', 'Opción 3']}
      />
    ),
  },
)

// Item Opcion New (item de la lista) — set publicado 12647:1838
figma.connect(
  Dropdown,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=12647-1838',
  {
    props: {
      texto: figma.string('Texto'),
    },
    example: (props) => <Dropdown options={[props.texto]} />,
  },
)

// No results (estado sin resultados del buscador) — componente publicado 13464:6570
figma.connect(
  Dropdown,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=13464-6570',
  {
    props: {},
    example: () => (
      <Dropdown
        searchable
        noResultsText="No se encontraron resultados"
        options={['Opción 1', 'Opción 2', 'Opción 3']}
      />
    ),
  },
)
