import {
  useEffect,
  useRef,
  useState,
  type DragEvent as ReactDragEvent,
  type HTMLAttributes,
} from 'react'
import { Button } from '../Button'
import { Icon } from '../Icon'
import docSheet from './assets/doc-sheet.svg'
import './FileUpload.css'

export type FileUploadStatus = 'loading' | 'completed'

export interface FileUploadFile {
  id: string
  file: File
  name: string
  size: number
  status: FileUploadStatus
  /** 0-100 durante la carga */
  progress: number
}

export interface FileUploadProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'title'> {
  /** Título de la card (Figma: "Carga de documento") */
  title?: string
  /** Subtítulo opcional (Figma: "puede no tenerlo") */
  subtitle?: string
  /** Extensiones permitidas (Figma: "JPG, JPEG, PNG y PDF") */
  accept?: string[]
  /** Peso máximo por archivo en MB (Figma: "Peso máximo: 5mb") */
  maxSizeMb?: number
  /** Cantidad máxima de archivos (1 = Completado; >1 = Carga-Masiva) */
  maxFiles?: number
  /** Texto de ayuda del dropzone; por defecto se genera de accept/maxSizeMb */
  hint?: string
  chooseLabel?: string
  acceptLabel?: string
  cancelLabel?: string
  /** Renderiza la card como modal centrado con backdrop */
  modal?: boolean
  /** Visibilidad en modo modal */
  open?: boolean
  onClose?: () => void
  onChange?: (files: File[]) => void
  onAccept?: (files: File[]) => void
  onCancel?: () => void
}

const EXT_LABELS: Record<string, { label: string; tone: 'danger' | 'success' | 'info' }> = {
  pdf: { label: 'PDF', tone: 'danger' },
  jpg: { label: 'JPG', tone: 'danger' },
  jpeg: { label: 'JPG', tone: 'danger' },
  png: { label: 'JPG', tone: 'danger' },
  doc: { label: 'DOC', tone: 'info' },
  docx: { label: 'DOC', tone: 'info' },
  txt: { label: 'TXT', tone: 'info' },
  xls: { label: 'XLS', tone: 'success' },
  xlsx: { label: 'XLS', tone: 'success' },
  csv: { label: 'CSV', tone: 'success' },
}

const extOf = (name: string) => name.split('.').pop()?.toLowerCase() ?? ''

/** Icono-CargaDocumento: hoja + pastilla de color según la extensión */
export const FileTypeIcon = ({ fileName }: { fileName: string }) => {
  const ext = extOf(fileName)
  const meta = EXT_LABELS[ext] ?? {
    label: ext.slice(0, 4).toUpperCase() || 'FILE',
    tone: 'danger' as const,
  }
  return (
    <span className="and-fu__ficon" aria-hidden="true">
      <img className="and-fu__ficon-sheet" src={docSheet} alt="" />
      <span
        className={[
          'and-fu__ficon-label',
          meta.tone === 'success' && 'and-fu__ficon-label--success',
          meta.tone === 'info' && 'and-fu__ficon-label--info',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {meta.label}
      </span>
    </span>
  )
}

const formatKb = (bytes: number) => `${Math.max(1, Math.round(bytes / 1024))} KB`

let uid = 0

export function FileUpload({
  title = 'Carga de documento',
  subtitle = 'Subtítulo carga de documento puede no tenerlo.',
  accept = ['jpg', 'jpeg', 'png', 'pdf'],
  maxSizeMb = 5,
  maxFiles = 1,
  hint,
  chooseLabel = 'Elegir archivo',
  acceptLabel = 'Aceptar',
  cancelLabel = 'Cancelar',
  modal = false,
  open = true,
  onClose,
  onChange,
  onAccept,
  onCancel,
  className = '',
  ...rest
}: FileUploadProps) {
  const [files, setFiles] = useState<FileUploadFile[]>([])
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState<'size' | 'type' | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const timers = useRef<number[]>([])

  useEffect(
    () => () => {
      timers.current.forEach((t) => window.clearInterval(t))
    },
    [],
  )

  const emitChange = (next: FileUploadFile[]) => {
    onChange?.(next.filter((f) => f.status === 'completed').map((f) => f.file))
  }

  const addFiles = (list: FileList | File[]) => {
    setError(null)
    const incoming = Array.from(list)
    for (const file of incoming) {
      if (files.length >= maxFiles) break
      if (!accept.includes(extOf(file.name))) {
        setError('type')
        return
      }
      if (file.size > maxSizeMb * 1024 * 1024) {
        setError('size')
        return
      }
      const id = `fu-${++uid}`
      const entry: FileUploadFile = {
        id,
        file,
        name: file.name,
        size: file.size,
        status: 'loading',
        progress: 0,
      }
      setFiles((prev) => [...prev, entry].slice(0, maxFiles))
      // Progreso simulado de la carga (Estado Cargando -> Completado)
      const timer = window.setInterval(() => {
        setFiles((prev) => {
          const next = prev.map((f) =>
            f.id === id
              ? f.progress >= 100
                ? { ...f, status: 'completed' as const, progress: 100 }
                : { ...f, progress: f.progress + 20 }
              : f,
          )
          const done = next.find((f) => f.id === id)?.status === 'completed'
          if (done) {
            window.clearInterval(timer)
            emitChange(next)
          }
          return next
        })
      }, 150)
      timers.current.push(timer)
    }
  }

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const next = prev.filter((f) => f.id !== id)
      emitChange(next)
      return next
    })
  }

  const clearAll = () => {
    setFiles([])
    setError(null)
    onChange?.([])
  }

  const onDrop = (e: ReactDragEvent) => {
    e.preventDefault()
    setDragging(false)
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files)
  }

  const complete = files.length > 0 && files.every((f) => f.status === 'completed')
  const showDropzone = files.length < maxFiles
  const defaultHint = `Peso máximo: ${maxSizeMb}mb. Tipo de archivo: ${accept
    .map((a) => a.toUpperCase())
    .join(', ')
    .replace(/, ([^,]*)$/, ' y $1')}`

  if (modal && !open) return null

  const card = (
    <div
      className={['and-fu', className].filter(Boolean).join(' ')}
      role={modal ? 'dialog' : undefined}
      aria-modal={modal || undefined}
      aria-label={title}
      {...rest}
    >
      <div className="and-fu__header">
        <h4 className="and-fu__title">{title}</h4>
        <button
          type="button"
          className="and-fu__close"
          aria-label="Cerrar"
          onClick={() => {
            clearAll()
            onClose?.()
          }}
        >
          <Icon name="close" size={24} />
        </button>
      </div>
      {subtitle && <p className="and-fu__subtitle">{subtitle}</p>}
      <div className="and-fu__body">
        {showDropzone && (
          <div
            className={['and-fu__dropzone', dragging && 'and-fu__dropzone--drag']
              .filter(Boolean)
              .join(' ')}
            role="button"
            tabIndex={0}
            onClick={() => inputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                inputRef.current?.click()
              }
            }}
            onDragOver={(e) => {
              e.preventDefault()
              setDragging(true)
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
          >
            <Icon name="upload-file-outline" size={24} />
            <div>
              <p className="and-fu__dropzone-title">
                {dragging ? 'Suelta tu archivo aquí' : 'Elige un archivo o arrastralo aquí'}
              </p>
              <p className="and-fu__dropzone-hint">{hint ?? defaultHint}</p>
            </div>
            {!dragging && (
              <Button
                variant="primary"
                appearance="outline"
                size="sm"
                className="and-fu__choose"
                onClick={(e) => {
                  e.stopPropagation()
                  inputRef.current?.click()
                }}
              >
                {chooseLabel}
              </Button>
            )}
            <input
              ref={inputRef}
              type="file"
              hidden
              multiple={maxFiles > 1}
              accept={accept.map((a) => `.${a}`).join(',')}
              onChange={(e) => {
                if (e.target.files) addFiles(e.target.files)
                e.target.value = ''
              }}
            />
          </div>
        )}
        {error === 'size' && (
          <p className="and-fu__error" role="alert">
            El archivo excede el límite de tamaño permitido. Intenta comprimirlo o
            subir un archivo más ligero.
          </p>
        )}
        {error === 'type' && (
          <p className="and-fu__error" role="alert">
            El tipo de archivo no es compatible. Intenta subir un formato permitido.
          </p>
        )}
        {files.map((f) => (
          <div key={f.id} className="and-fu__row">
            <div className="and-fu__row-main">
              <div className="and-fu__row-info">
                <FileTypeIcon fileName={f.name} />
                <div className="and-fu__row-texts">
                  <p className="and-fu__row-name">{f.name}</p>
                  <div className="and-fu__row-meta">
                    <span className="and-fu__row-size">
                      {formatKb((f.size * Math.min(f.progress, 100)) / 100)} of{' '}
                      {formatKb(f.size)} •
                    </span>
                    {f.status === 'loading' ? (
                      <span className="and-fu__row-status and-fu__row-status--loading">
                        <Icon name="loading" size={16} />
                        Cargando...
                      </span>
                    ) : (
                      <span className="and-fu__row-status and-fu__row-status--done">
                        <Icon name="baseline-check-circle" size={24} />
                        Completado
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="and-fu__row-action"
                aria-label={f.status === 'loading' ? 'Cancelar carga' : 'Eliminar archivo'}
                onClick={() => removeFile(f.id)}
              >
                <Icon name={f.status === 'loading' ? 'close' : 'delete-outline'} size={24} />
              </button>
            </div>
            {f.status === 'loading' && (
              <div className="and-fu__progress">
                <div
                  className="and-fu__progress-fill"
                  style={{ width: `${Math.min(f.progress, 100)}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="and-fu__footer">
        <Button
          variant="primary"
          appearance="ghost"
          size="md"
          onClick={() => {
            clearAll()
            onCancel?.()
            if (modal) onClose?.()
          }}
        >
          {cancelLabel}
        </Button>
        <Button
          variant="primary"
          appearance="solid"
          size="md"
          disabled={!complete}
          onClick={() => {
            if (!complete) return
            onAccept?.(files.map((f) => f.file))
            if (modal) onClose?.()
          }}
        >
          {acceptLabel}
        </Button>
      </div>
    </div>
  )

  if (modal) {
    return (
      <div className="and-fu-backdrop" onClick={(e) => e.target === e.currentTarget && onClose?.()}>
        {card}
      </div>
    )
  }

  return card
}
