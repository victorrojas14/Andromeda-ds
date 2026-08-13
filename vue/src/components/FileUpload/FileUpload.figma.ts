import figma, { html } from '@figma/code-connect/html'

/*
 * Code Connect — FileUpload (Vue)
 *
 * Mapea el set publicado "Carga de documento" (8189:4095), la fila
 * "Cargando-Archivo" (8189:4237) y el icono "Icono-CargaDocumento"
 * (8189:4212) de la página Forms. Default/Hover/Completado/Cargando/
 * Errores son estados dinámicos; Carga-Masiva = maxFiles > 1.
 */

// Carga de documento — set publicado 8189:4095
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=8189-4095', {
  props: {
    maxFiles: figma.enum('Estado', {
      'Carga-Masiva': '5',
    }),
  },
  example: (props) => html`
<FileUpload
  title="Carga de documento"
  subtitle="Subtítulo carga de documento puede no tenerlo."
  :accept="['jpg', 'jpeg', 'png', 'pdf']"
  :max-size-mb="5"
  :max-files="${props.maxFiles}"
/>`,
  imports: ["import { FileUpload } from '@andromeda/vue'"],
})

// Cargando-Archivo (fila de archivo) — set publicado 8189:4237
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=8189-4237', {
  props: {},
  example: () => html`
<FileUpload :max-files="3" :accept="['pdf', 'xls', 'xlsx']" />`,
  imports: ["import { FileUpload } from '@andromeda/vue'"],
})

// Icono-CargaDocumento (icono por tipo, resuelto por la extensión del archivo)
figma.connect('https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=8189-4212', {
  props: {
    accept: figma.enum('Tipo', {
      PDF: "['pdf']",
      JPG: "['jpg']",
      Word: "['docx']",
      Excel: "['xlsx']",
      CSV: "['csv']",
      TXT: "['txt']",
      Tipo7: "['jpg']",
    }),
  },
  example: (props) => html`
<FileUpload :accept="${props.accept}" />`,
  imports: ["import { FileUpload } from '@andromeda/vue'"],
})
