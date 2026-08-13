import figma from '@figma/code-connect'
import { Table } from './Table'

/**
 * Table — Code Connect
 * Figma: Ui Kit Web — página Tables, sets "Título Columna"
 * (14121:1560), "Item Columna" (138:1658) y "Table items"
 * (13661:10043). Los tamaños Desktop/Movil son el mismo componente
 * responsivo (<768px) y el estado Select es la fila alterna o
 * seleccionada.
 */

const EJEMPLO = [
  { columna: 'Columna 1' },
  { columna: 'Columna 2' },
]

// Título Columna (header ordenable) — set publicado 14121:1560
figma.connect(
  Table,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=14121-1560',
  {
    props: {
      title: figma.boolean('Mostrar Texto', {
        true: figma.string('Texto Titulo'),
        false: undefined,
      }),
      sortable: figma.boolean('Mostrar Icono'),
    },
    example: (props) => (
      <Table
        columns={[{ key: 'columna', title: props.title, sortable: props.sortable }]}
        data={EJEMPLO}
      />
    ),
  },
)

// Item Columna (celda con alineación) — set publicado 138:1658
figma.connect(
  Table,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=138-1658',
  {
    props: {
      align: figma.enum('Estado', {
        'Default-Izq': 'left',
        'Select-Izq': 'left',
        'Default-Centrado': 'center',
        'Select-Centrado': 'center',
        'Default-Der': 'right',
        'Select-Der': 'right',
      }),
    },
    example: (props) => (
      <Table
        columns={[{ key: 'columna', title: 'Título Columna', align: props.align }]}
        data={EJEMPLO}
      />
    ),
  },
)

// Table items (celdas con componentes de la librería) — set publicado 13661:10043
figma.connect(
  Table,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=13661-10043',
  {
    props: {},
    example: () => (
      <Table
        selectable
        columns={[{ key: 'columna', title: 'Título Columna', sortable: true }]}
        data={EJEMPLO}
      />
    ),
  },
)
