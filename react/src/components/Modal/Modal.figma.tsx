import figma from '@figma/code-connect'
import { LabelBadge } from './LabelBadge'
import { Modal } from './Modal'

/**
 * Modal + LabelBadge — Code Connect
 * Figma: Ui Kit Web — página Pop Up / Modals, sets "Modal" (191:2221)
 * y "Label Badge" (191:2664).
 */

// Modal — set publicado 191:2221
figma.connect(
  Modal,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=191-2221',
  {
    props: {
      title: figma.string('Texto Titulo'),
      showBadge: figma.boolean('Mostrar Aviso'),
      showIcon: figma.boolean('Mostrar Icono Top'),
      showLeftButton: figma.boolean('Mostrar Boton Izq'),
      showRightButton: figma.boolean('Mostrar Boton Der'),
      size: figma.enum('Tamano', {
        'Modal-SM': 'sm',
        'Modal-MD': 'md',
        'Modal-LG': 'lg',
      }),
      iconVariant: figma.enum('Icon', {
        Default: 'default',
        'CIrcle illustration': 'circle',
      }),
    },
    example: (props) => (
      <Modal
        size={props.size}
        title={props.title}
        showBadge={props.showBadge}
        showIcon={props.showIcon}
        iconVariant={props.iconVariant}
        showLeftButton={props.showLeftButton}
        showRightButton={props.showRightButton}
        badgeEstado="warning"
        badgeText="EJEMPLO"
        onClose={() => {}}
      >
        Contenido del modal.
      </Modal>
    ),
  },
)

// Label Badge — set publicado 191:2664
figma.connect(
  LabelBadge,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=191-2664',
  {
    props: {
      text: figma.string('Texto Badge'),
      estado: figma.enum('Estado', {
        'Label Success': 'success',
        'Label Warning': 'warning',
        'Label Info': 'info',
        'Laber Danger': 'danger',
      }),
    },
    example: (props) => <LabelBadge estado={props.estado} text={props.text} />,
  },
)
