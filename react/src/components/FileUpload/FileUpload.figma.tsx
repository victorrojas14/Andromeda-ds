import figma from '@figma/code-connect'
import { FileUpload, FileTypeIcon } from './FileUpload'

/**
 * FileUpload — Code Connect
 * Figma: Ui Kit Web — página Forms, set "Carga de documento"
 * (8189:4095), fila "Cargando-Archivo" (8189:4237) e icono
 * "Icono-CargaDocumento" (8189:4212).
 */

// Carga de documento — set publicado 8189:4095
// Default/Hover/Completado/Cargando/Errores son estados dinámicos del
// propio componente; Carga-Masiva se logra con maxFiles > 1.
figma.connect(
  FileUpload,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=8189-4095',
  {
    props: {
      maxFiles: figma.enum('Estado', {
        'Carga-Masiva': 5,
      }),
    },
    example: (props) => (
      <FileUpload
        title="Carga de documento"
        subtitle="Subtítulo carga de documento puede no tenerlo."
        accept={['jpg', 'jpeg', 'png', 'pdf']}
        maxSizeMb={5}
        maxFiles={props.maxFiles}
      />
    ),
  },
)

// Cargando-Archivo (fila de archivo) — set publicado 8189:4237
figma.connect(
  FileUpload,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=8189-4237',
  {
    props: {},
    example: () => (
      <FileUpload maxFiles={3} accept={['pdf', 'xls', 'xlsx']} />
    ),
  },
)

// Icono-CargaDocumento (icono por tipo de archivo) — set publicado 8189:4212
figma.connect(
  FileTypeIcon,
  'https://www.figma.com/design/oTZzdsgGkCjbL2f3oybxD0/Ui-Kit-Web?node-id=8189-4212',
  {
    props: {
      fileName: figma.enum('Tipo', {
        PDF: 'archivo.pdf',
        JPG: 'imagen.jpg',
        Word: 'documento.docx',
        Excel: 'hoja.xlsx',
        CSV: 'datos.csv',
        TXT: 'notas.txt',
        Tipo7: 'archivo.jpg',
      }),
    },
    example: (props) => <FileTypeIcon fileName={props.fileName} />,
  },
)
