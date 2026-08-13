import figma, { html } from '@figma/code-connect/html'

/*
 * Code Connect — Modal + LabelBadge (Vue)
 *
 * Mapea los sets publicados "Modal" (191:2221) y "Label Badge"
 * (191:2664) de la página Pop Up / Modals.
 */

// Modal — set publicado 191:2221
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=191-2221', {
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
  example: (props) => html`
<Modal
  size="${props.size}"
  title="${props.title}"
  :show-badge="${props.showBadge}"
  :show-icon="${props.showIcon}"
  icon-variant="${props.iconVariant}"
  :show-left-button="${props.showLeftButton}"
  :show-right-button="${props.showRightButton}"
  badge-estado="warning"
  badge-text="EJEMPLO"
>
  Contenido del modal.
</Modal>`,
  imports: ["import { Modal } from '@andromeda/vue'"],
})

// Label Badge — set publicado 191:2664
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=191-2664', {
  props: {
    text: figma.string('Texto Badge'),
    estado: figma.enum('Estado', {
      'Label Success': 'success',
      'Label Warning': 'warning',
      'Label Info': 'info',
      'Laber Danger': 'danger',
    }),
  },
  example: (props) => html`
<LabelBadge estado="${props.estado}" text="${props.text}" />`,
  imports: ["import { LabelBadge } from '@andromeda/vue'"],
})
