import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Button from '../Button/Button.vue'
import Switch from '../Controls/Switch.vue'
import Icon from '../Icon/Icon.vue'
import Paginator from '../Paginator/Paginator.vue'
import Table from './Table.vue'
import type { TableColumn } from './Table.vue'

const meta: Meta = {
  title: 'Data Display/Table',
  // El componente es genérico; Storybook no necesita el tipo exacto
  component: Table as never,
  parameters: { layout: 'padded' },
  argTypes: {
    columns: { control: 'object' },
    data: { control: 'object' },
    zebra: { control: 'boolean', description: 'Filas alternas con fondo background (Select)' },
    selectable: { control: 'boolean', description: 'Columna de Checkbox de la librería' },
  },
}

export default meta
type Story = StoryObj

const MOVIMIENTOS = [
  { concepto: 'Pago de nómina', fecha: '2026-08-01', cuenta: '****0788', monto: 15320.5 },
  { concepto: 'Transferencia SPEI', fecha: '2026-08-03', cuenta: '****0921', monto: 2500 },
  { concepto: 'Compra en línea', fecha: '2026-08-05', cuenta: '****1145', monto: 890.99 },
  { concepto: 'Depósito', fecha: '2026-08-07', cuenta: '****3301', monto: 48900 },
  { concepto: 'Retiro cajero', fecha: '2026-08-09', cuenta: '****7642', monto: 1200 },
]

const COLUMNAS: TableColumn[] = [
  { key: 'concepto', title: 'Concepto', align: 'left', sortable: true },
  { key: 'fecha', title: 'Fecha', align: 'center', sortable: true },
  { key: 'cuenta', title: 'Cuenta', align: 'center' },
  { key: 'monto', title: 'Monto', align: 'right', sortable: true },
]

export const Basica: Story = {
  name: 'Básica ordenable',
  args: {
    columns: COLUMNAS,
    data: MOVIMIENTOS,
    zebra: true,
    selectable: false,
  },
}

export const TablaEjemplo: Story = {
  name: 'Tabla ejemplo (Figma)',
  render: () => ({
    components: { Table, Button, Switch, Icon },
    setup() {
      const columns = [
        { key: 'columna', title: 'Título Columna', align: 'center', sortable: true },
        { key: 'a1', title: 'Acciones', align: 'center', sortable: true },
        { key: 'a2', title: 'Acciones', align: 'center', sortable: true },
        { key: 'a3', title: 'Acciones', align: 'center', sortable: true },
        { key: 'swipe', title: '', align: 'center', sortable: true, width: 80 },
        { key: 'boton', title: 'Acciones', align: 'center', sortable: true, width: 139 },
        { key: 'busqueda', title: 'Acciones', align: 'center', sortable: true },
        { key: 'opciones', title: '', align: 'center', sortable: true, width: 80 },
      ]
      const data = Array.from({ length: 5 }, (_, i) => ({ id: i, columna: 'Columna' }))
      return { columns, data }
    },
    template: `
      <Table selectable zebra :columns="columns" :data="data">
        <template #cell="{ row, column }">
          <template v-if="column.key === 'columna'">{{ row.columna }}</template>
          <span v-else-if="column.key === 'a1'" style="display: inline-flex; gap: 24px;">
            <Icon name="delete-outline" :size="24" />
          </span>
          <span v-else-if="column.key === 'a2'" style="display: inline-flex; gap: 24px;">
            <Icon name="delete-outline" :size="24" /><Icon name="delete-outline" :size="24" />
          </span>
          <span v-else-if="column.key === 'a3'" style="display: inline-flex; gap: 24px;">
            <Icon name="delete-outline" :size="24" /><Icon name="delete-outline" :size="24" /><Icon name="delete-outline" :size="24" />
          </span>
          <Switch v-else-if="column.key === 'swipe'" :model-value="true" />
          <Button v-else-if="column.key === 'boton'" variant="primary" appearance="solid" size="sm">
            Texto Boton
          </Button>
          <span
            v-else-if="column.key === 'busqueda'"
            style="box-sizing: border-box; display: inline-flex; align-items: center; gap: 10px; width: 100%; max-width: 200px; padding: 5.5px 10px; background: var(--color-white); border: 1px solid var(--color-gray-300); border-radius: 5px; color: var(--color-secondary-light);"
          >
            <input type="text" placeholder="Buscar" style="flex: 1; min-width: 0; border: none; outline: none; font-family: inherit; font-size: var(--font-size-parrafo-sm);" />
            <Icon name="search" :size="24" />
          </span>
          <span v-else-if="column.key === 'opciones'" style="display: inline-flex; color: var(--color-primary);">
            <Icon name="menu-dots-vertical" :size="24" />
          </span>
        </template>
      </Table>
    `,
  }),
}

export const ConPaginador: Story = {
  name: 'Con Paginador',
  render: () => ({
    components: { Table, Paginator },
    setup() {
      const pagina = ref(1)
      const porPagina = 3
      const todos = MOVIMIENTOS
      return { pagina, porPagina, todos, COLUMNAS }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 30px;">
        <Table
          :columns="COLUMNAS"
          :data="todos.slice((pagina - 1) * porPagina, pagina * porPagina)"
        />
        <Paginator :page-count="Math.ceil(todos.length / porPagina)" v-model="pagina" />
      </div>
    `,
  }),
}
