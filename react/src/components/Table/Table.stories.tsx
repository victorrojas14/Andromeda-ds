import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../Button'
import { Switch } from '../Controls'
import { Icon } from '../Icon'
import { Paginator } from '../Paginator'
import { Table, type TableColumn } from './Table'

const meta: Meta<typeof Table> = {
  title: 'Data Display/Table',
  component: Table,
  parameters: { layout: 'padded' },
  argTypes: {
    columns: { control: 'object' },
    data: { control: 'object' },
    zebra: { control: 'boolean', description: 'Filas alternas con fondo background (Select)' },
    selectable: { control: 'boolean', description: 'Columna de Checkbox de la librería' },
    onSelectionChange: { action: 'selectionChange' },
    onSortChange: { action: 'sortChange' },
  },
}

export default meta
type Story = StoryObj<typeof Table>

/* ---- Tabla básica ordenable ---- */
type Movimiento = Record<string, unknown> & {
  concepto: string
  fecha: string
  cuenta: string
  monto: number
}

const MOVIMIENTOS: Movimiento[] = [
  { concepto: 'Pago de nómina', fecha: '2026-08-01', cuenta: '****0788', monto: 15320.5 },
  { concepto: 'Transferencia SPEI', fecha: '2026-08-03', cuenta: '****0921', monto: 2500 },
  { concepto: 'Compra en línea', fecha: '2026-08-05', cuenta: '****1145', monto: 890.99 },
  { concepto: 'Depósito', fecha: '2026-08-07', cuenta: '****3301', monto: 48900 },
  { concepto: 'Retiro cajero', fecha: '2026-08-09', cuenta: '****7642', monto: 1200 },
]

export const Basica: Story = {
  name: 'Básica ordenable',
  args: {
    columns: [
      { key: 'concepto', title: 'Concepto', align: 'left', sortable: true },
      { key: 'fecha', title: 'Fecha', align: 'center', sortable: true },
      { key: 'cuenta', title: 'Cuenta', align: 'center' },
      {
        key: 'monto',
        title: 'Monto',
        align: 'right',
        sortable: true,
        render: (row) =>
          `$ ${(row.monto as number).toLocaleString('es-MX', { minimumFractionDigits: 2 })}`,
      },
    ] as TableColumn[],
    data: MOVIMIENTOS,
    zebra: true,
    selectable: false,
  },
}

/* ---- Tabla ejemplo (estricta, Figma 13811:7639) ---- */
const searchCell = (
  <span
    style={{
      boxSizing: 'border-box',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      width: '100%',
      maxWidth: 200,
      padding: '5.5px 10px',
      background: 'var(--color-white)',
      border: '1px solid var(--color-gray-300)',
      borderRadius: 5,
      color: 'var(--color-secondary-light)',
    }}
  >
    <input
      type="text"
      placeholder="Buscar"
      style={{
        flex: 1,
        minWidth: 0,
        border: 'none',
        outline: 'none',
        fontFamily: 'inherit',
        fontSize: 'var(--font-size-parrafo-sm)',
      }}
    />
    <Icon name="search" size={24} />
  </span>
)

const deleteIcons = (count: number) => (
  <span style={{ display: 'inline-flex', gap: 24, verticalAlign: 'middle' }}>
    {Array.from({ length: count }, (_, i) => (
      <Icon key={i} name="delete-outline" size={24} />
    ))}
  </span>
)

const EJEMPLO_DATA = Array.from({ length: 5 }, (_, i) => ({ id: i, columna: 'Columna' }))

export const TablaEjemplo: Story = {
  name: 'Tabla ejemplo (Figma)',
  render: () => (
    <Table
      selectable
      zebra
      columns={[
        { key: 'columna', title: 'Título Columna', align: 'center', sortable: true },
        {
          key: 'a1',
          title: 'Acciones',
          align: 'center',
          sortable: true,
          render: () => deleteIcons(1),
        },
        {
          key: 'a2',
          title: 'Acciones',
          align: 'center',
          sortable: true,
          render: () => deleteIcons(2),
        },
        {
          key: 'a3',
          title: 'Acciones',
          align: 'center',
          sortable: true,
          render: () => deleteIcons(3),
        },
        {
          key: 'swipe',
          title: '',
          align: 'center',
          sortable: true,
          width: 80,
          render: () => <Switch defaultChecked />,
        },
        {
          key: 'boton',
          title: 'Acciones',
          align: 'center',
          sortable: true,
          width: 139,
          render: () => (
            <Button variant="primary" appearance="solid" size="sm">
              Texto Boton
            </Button>
          ),
        },
        {
          key: 'busqueda',
          title: 'Acciones',
          align: 'center',
          sortable: true,
          render: () => searchCell,
        },
        {
          key: 'opciones',
          title: '',
          align: 'center',
          sortable: true,
          width: 80,
          render: () => (
            <span style={{ display: 'inline-flex', color: 'var(--color-primary)' }}>
              <Icon name="menu-vertical" size={24} />
            </span>
          ),
        },
      ]}
      data={EJEMPLO_DATA}
    />
  ),
}

/* ---- Tabla responsiva con Paginador ---- */
export const ConPaginador: Story = {
  name: 'Con Paginador',
  render: () => {
    const [page, setPage] = useState(1)
    const porPagina = 3
    const visibles = MOVIMIENTOS.slice((page - 1) * porPagina, page * porPagina)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
        <Table
          columns={[
            { key: 'concepto', title: 'Concepto', align: 'left', sortable: true },
            { key: 'fecha', title: 'Fecha', align: 'center', sortable: true },
            { key: 'cuenta', title: 'Cuenta', align: 'center' },
            {
              key: 'monto',
              title: 'Monto',
              align: 'right',
              sortable: true,
              render: (row) =>
                `$ ${(row.monto as number).toLocaleString('es-MX', { minimumFractionDigits: 2 })}`,
            },
          ]}
          data={visibles}
        />
        <Paginator
          pageCount={Math.ceil(MOVIMIENTOS.length / porPagina)}
          page={page}
          onChange={setPage}
        />
      </div>
    )
  },
}
