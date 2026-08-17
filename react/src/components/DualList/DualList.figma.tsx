import figma from '@figma/code-connect'
import { DualList } from './DualList'

/**
 * DualList — Code Connect
 * Figma: Ui Kit Web — página Duallist, sets publicados "Duallist"
 * (14258:76392, State), "Dual-list-atom" (14254:67419) y "Botones"
 * (14255:73941).
 */

// Duallist (organismo) — set publicado 14258:76392
figma.connect(
  DualList,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=14258-76392',
  {
    props: {},
    example: () => (
      <DualList
        items={[
          'Arrendadora',
          'Inversiones',
          'Banca privada',
          'Captación',
          'Fraudes',
          'Clientes',
          'Contratación',
        ]}
        leftTitle="Selecciona permisos para el usuario"
        rightTitle="Permisos habilitados para el usuario"
      />
    ),
  },
)

// Dual-list-atom (panel) — set publicado 14254:67419
figma.connect(
  DualList,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=14254-67419',
  {
    props: {
      leftTitle: figma.string('Title-Text-Content'),
      emptyLeftText: figma.string('Content text'),
    },
    example: (props) => (
      <DualList
        items={['Arrendadora', 'Inversiones', 'Banca privada']}
        leftTitle={props.leftTitle}
        emptyLeftText={props.emptyLeftText}
      />
    ),
  },
)

// Botones (Agregar / Quitar) — set publicado 14255:73941
figma.connect(
  DualList,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=14255-73941',
  {
    props: {},
    example: () => (
      <DualList
        items={['Arrendadora', 'Inversiones']}
        addLabel="Agregar"
        removeLabel="Quitar"
      />
    ),
  },
)
