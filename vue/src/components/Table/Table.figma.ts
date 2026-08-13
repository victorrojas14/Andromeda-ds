import figma, { html } from '@figma/code-connect/html'

/*
 * Code Connect — Table (Vue)
 *
 * Mapea los sets publicados "Título Columna" (14121:1560),
 * "Item Columna" (138:1658) y "Table items" (13661:10043) de la
 * página Tables. Desktop/Movil es el mismo componente responsivo y el
 * estado Select es la fila alterna o seleccionada.
 */

// Título Columna (header ordenable) — set publicado 14121:1560
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=14121-1560', {
  props: {
    title: figma.boolean('Mostrar Texto', {
      true: figma.string('Texto Titulo'),
      false: undefined,
    }),
    sortable: figma.boolean('Mostrar Icono'),
  },
  example: (props) => html`
<Table
  :columns="[{ key: 'columna', title: '${props.title}', sortable: ${props.sortable} }]"
  :data="[{ columna: 'Columna 1' }, { columna: 'Columna 2' }]"
/>`,
  imports: ["import { Table } from '@andromeda/vue'"],
})

// Item Columna (celda con alineación) — set publicado 138:1658
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=138-1658', {
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
  example: (props) => html`
<Table
  :columns="[{ key: 'columna', title: 'Título Columna', align: '${props.align}' }]"
  :data="[{ columna: 'Columna 1' }, { columna: 'Columna 2' }]"
/>`,
  imports: ["import { Table } from '@andromeda/vue'"],
})

// Table items (celdas con componentes de la librería) — set publicado 13661:10043
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=13661-10043', {
  props: {},
  example: () => html`
<Table
  selectable
  :columns="[{ key: 'columna', title: 'Título Columna', sortable: true }]"
  :data="[{ columna: 'Columna 1' }, { columna: 'Columna 2' }]"
>
  <template #cell="{ row, column }">{{ row[column.key] }}</template>
</Table>`,
  imports: ["import { Table } from '@andromeda/vue'"],
})
