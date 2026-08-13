import figma from '@figma/code-connect'
import { DropdownMultipleList } from './DropdownMultipleList'

/**
 * DropdownMultipleList — Code Connect
 * Figma: Ui Kit Web — página Forms, set "DropDown-lista-multiple"
 * (9574:4161), item "Item Opcion Cuenta/Saldo" (552:1493) y trigger
 * "Form datos cuenta selected" (579:1154).
 */

// DropDown-lista-multiple — set publicado 9574:4161
// Estados Default/Active/Seleccion son dinámicos (abrir y seleccionar).
figma.connect(
  DropdownMultipleList,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=9574-4161',
  {
    props: {},
    example: () => (
      <DropdownMultipleList
        label="Selecciona la cuenta de retiro"
        options={[
          { name: 'Nombre del cliente', account: '****0788', balance: '$ 1,000.00' },
          { name: 'Nombre del cliente', account: '****0921', balance: '$ 2,500.00' },
        ]}
      />
    ),
  },
)

// Item Opcion Cuenta/Saldo — componente publicado 552:1493
figma.connect(
  DropdownMultipleList,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=552-1493',
  {
    props: {
      nombre: figma.string('Nombre'),
      cuenta: figma.string('Cuenta'),
      saldo: figma.string('Saldo'),
      showBalance: figma.boolean('Mostrar Saldo'),
    },
    example: (props) => (
      <DropdownMultipleList
        showBalance={props.showBalance}
        options={[
          { name: props.nombre, account: props.cuenta, balance: props.saldo },
        ]}
      />
    ),
  },
)

// Form datos cuenta selected — componente publicado 579:1154
figma.connect(
  DropdownMultipleList,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=579-1154',
  {
    props: {
      nombre: figma.string('Nombre Cliente'),
      cuenta: figma.string('Numero Cuenta'),
      saldo: figma.string('Saldo'),
      showBalance: figma.boolean('Mostrar Saldo'),
    },
    example: (props) => (
      <DropdownMultipleList
        showBalance={props.showBalance}
        options={[
          { name: props.nombre, account: props.cuenta, balance: props.saldo },
        ]}
        defaultValue={props.cuenta}
      />
    ),
  },
)
