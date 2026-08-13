<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import Button from '../Button/Button.vue'
import Icon from '../Icon/Icon.vue'
import docSheet from './assets/doc-sheet.svg'
import './FileUpload.css'

/*
 * FileUpload — DS Andromeda (Figma: set "Carga de documento"
 * 8189:4095, documentación "Upload file" 9516:8476). Card blanca
 * (radius 10, padding 20, sombra autolayout-md) con dropzone de borde
 * punteado (tertiary al arrastrar), validación de extensión y peso
 * (estados Error-No-Compatible / Error-Por-Peso), filas
 * Cargando/Completado con icono por tipo de archivo (pastilla de
 * color según extensión) y botones del DS (ghost/solid primary MD,
 * outline SM). Usable inline en cualquier div o como modal
 * (prop `modal` + `open`). `maxFiles` > 1 = Carga-Masiva.
 */

export type FileUploadStatus = 'loading' | 'completed'

export interface FileUploadFile {
  id: string
  file: File
  name: string
  size: number
  status: FileUploadStatus
  progress: number
}

interface FileUploadProps {
  /** Título de la card (Figma: "Carga de documento"). */
  title?: string
  /** Subtítulo opcional (Figma: "puede no tenerlo"). */
  subtitle?: string
  /** Extensiones permitidas (Figma: "JPG, JPEG, PNG y PDF"). */
  accept?: string[]
  /** Peso máximo por archivo en MB (Figma: "Peso máximo: 5mb"). */
  maxSizeMb?: number
  /** Cantidad máxima de archivos (1 = Completado; >1 = Carga-Masiva). */
  maxFiles?: number
  /** Texto de ayuda del dropzone; por defecto se genera de accept/maxSizeMb. */
  hint?: string
  chooseLabel?: string
  acceptLabel?: string
  cancelLabel?: string
  /** Renderiza la card como modal centrado con backdrop. */
  modal?: boolean
  /** Visibilidad en modo modal. */
  open?: boolean
}

const props = withDefaults(defineProps<FileUploadProps>(), {
  title: 'Carga de documento',
  subtitle: 'Subtítulo carga de documento puede no tenerlo.',
  accept: () => ['jpg', 'jpeg', 'png', 'pdf'],
  maxSizeMb: 5,
  maxFiles: 1,
  hint: undefined,
  chooseLabel: 'Elegir archivo',
  acceptLabel: 'Aceptar',
  cancelLabel: 'Cancelar',
  modal: false,
  open: true,
})

const emit = defineEmits<{
  change: [files: File[]]
  accept: [files: File[]]
  cancel: []
  close: []
}>()

const files = ref<FileUploadFile[]>([])
const dragging = ref(false)
const error = ref<'size' | 'type' | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)
const timers: number[] = []
let uid = 0

onBeforeUnmount(() => timers.forEach((t) => window.clearInterval(t)))

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

const iconMeta = (name: string) =>
  EXT_LABELS[extOf(name)] ?? {
    label: extOf(name).slice(0, 4).toUpperCase() || 'FILE',
    tone: 'danger' as const,
  }

const formatKb = (bytes: number) => `${Math.max(1, Math.round(bytes / 1024))} KB`

const emitChange = () => {
  emit(
    'change',
    files.value.filter((f) => f.status === 'completed').map((f) => f.file),
  )
}

const addFiles = (list: FileList | File[]) => {
  error.value = null
  for (const file of Array.from(list)) {
    if (files.value.length >= props.maxFiles) break
    if (!props.accept.includes(extOf(file.name))) {
      error.value = 'type'
      return
    }
    if (file.size > props.maxSizeMb * 1024 * 1024) {
      error.value = 'size'
      return
    }
    const id = `fu-${++uid}`
    files.value = [
      ...files.value,
      { id, file, name: file.name, size: file.size, status: 'loading', progress: 0 },
    ]
    // Progreso simulado de la carga (Estado Cargando -> Completado)
    const timer = window.setInterval(() => {
      files.value = files.value.map((f) =>
        f.id === id
          ? f.progress >= 100
            ? { ...f, status: 'completed' as const, progress: 100 }
            : { ...f, progress: f.progress + 20 }
          : f,
      )
      if (files.value.find((f) => f.id === id)?.status === 'completed') {
        window.clearInterval(timer)
        emitChange()
      }
    }, 150)
    timers.push(timer)
  }
}

const removeFile = (id: string) => {
  files.value = files.value.filter((f) => f.id !== id)
  emitChange()
}

const clearAll = () => {
  files.value = []
  error.value = null
  emit('change', [])
}

const onDrop = (e: DragEvent) => {
  e.preventDefault()
  dragging.value = false
  if (e.dataTransfer?.files.length) addFiles(e.dataTransfer.files)
}

const complete = computed(
  () => files.value.length > 0 && files.value.every((f) => f.status === 'completed'),
)
const showDropzone = computed(() => files.value.length < props.maxFiles)
const defaultHint = computed(
  () =>
    `Peso máximo: ${props.maxSizeMb}mb. Tipo de archivo: ${props.accept
      .map((a) => a.toUpperCase())
      .join(', ')
      .replace(/, ([^,]*)$/, ' y $1')}`,
)

const onCloseClick = () => {
  clearAll()
  emit('close')
}

const onCancelClick = () => {
  clearAll()
  emit('cancel')
  if (props.modal) emit('close')
}

const onAcceptClick = () => {
  if (!complete.value) return
  emit('accept', files.value.map((f) => f.file))
  if (props.modal) emit('close')
}

const onBackdropClick = (e: MouseEvent) => {
  if (e.target === e.currentTarget) emit('close')
}
</script>

<template>
  <div
    v-if="!modal || open"
    :class="modal ? 'and-fu-backdrop' : 'and-fu-inline'"
    @click="modal && onBackdropClick($event)"
  >
    <div
      class="and-fu"
      :role="modal ? 'dialog' : undefined"
      :aria-modal="modal || undefined"
      :aria-label="title"
    >
      <div class="and-fu__header">
        <h4 class="and-fu__title">{{ title }}</h4>
        <button type="button" class="and-fu__close" aria-label="Cerrar" @click="onCloseClick">
          <Icon name="close" :size="24" />
        </button>
      </div>
      <p v-if="subtitle" class="and-fu__subtitle">{{ subtitle }}</p>
      <div class="and-fu__body">
        <div
          v-if="showDropzone"
          :class="['and-fu__dropzone', dragging && 'and-fu__dropzone--drag']"
          role="button"
          tabindex="0"
          @click="inputRef?.click()"
          @keydown.enter.prevent="inputRef?.click()"
          @keydown.space.prevent="inputRef?.click()"
          @dragover.prevent="dragging = true"
          @dragleave="dragging = false"
          @drop="onDrop"
        >
          <Icon name="upload-file-outline" :size="24" />
          <div>
            <p class="and-fu__dropzone-title">
              {{ dragging ? 'Suelta tu archivo aquí' : 'Elige un archivo o arrastralo aquí' }}
            </p>
            <p class="and-fu__dropzone-hint">{{ hint ?? defaultHint }}</p>
          </div>
          <Button
            v-if="!dragging"
            variant="primary"
            appearance="outline"
            size="sm"
            class="and-fu__choose"
            @click.stop="inputRef?.click()"
          >
            {{ chooseLabel }}
          </Button>
          <input
            ref="inputRef"
            type="file"
            hidden
            :multiple="maxFiles > 1"
            :accept="accept.map((a) => `.${a}`).join(',')"
            @change="(e) => {
              const t = e.target as HTMLInputElement
              if (t.files) addFiles(t.files)
              t.value = ''
            }"
          />
        </div>
        <p v-if="error === 'size'" class="and-fu__error" role="alert">
          El archivo excede el límite de tamaño permitido. Intenta comprimirlo o
          subir un archivo más ligero.
        </p>
        <p v-if="error === 'type'" class="and-fu__error" role="alert">
          El tipo de archivo no es compatible. Intenta subir un formato permitido.
        </p>
        <div v-for="f in files" :key="f.id" class="and-fu__row">
          <div class="and-fu__row-main">
            <div class="and-fu__row-info">
              <span class="and-fu__ficon" aria-hidden="true">
                <img class="and-fu__ficon-sheet" :src="docSheet" alt="" />
                <span
                  :class="[
                    'and-fu__ficon-label',
                    iconMeta(f.name).tone === 'success' && 'and-fu__ficon-label--success',
                    iconMeta(f.name).tone === 'info' && 'and-fu__ficon-label--info',
                  ]"
                >
                  {{ iconMeta(f.name).label }}
                </span>
              </span>
              <div class="and-fu__row-texts">
                <p class="and-fu__row-name">{{ f.name }}</p>
                <div class="and-fu__row-meta">
                  <span class="and-fu__row-size">
                    {{ formatKb((f.size * Math.min(f.progress, 100)) / 100) }} of
                    {{ formatKb(f.size) }} •
                  </span>
                  <span
                    v-if="f.status === 'loading'"
                    class="and-fu__row-status and-fu__row-status--loading"
                  >
                    <Icon name="loading" :size="16" />
                    Cargando...
                  </span>
                  <span v-else class="and-fu__row-status and-fu__row-status--done">
                    <Icon name="baseline-check-circle" :size="24" />
                    Completado
                  </span>
                </div>
              </div>
            </div>
            <button
              type="button"
              class="and-fu__row-action"
              :aria-label="f.status === 'loading' ? 'Cancelar carga' : 'Eliminar archivo'"
              @click="removeFile(f.id)"
            >
              <Icon :name="f.status === 'loading' ? 'close' : 'delete-outline'" :size="24" />
            </button>
          </div>
          <div v-if="f.status === 'loading'" class="and-fu__progress">
            <div class="and-fu__progress-fill" :style="{ width: `${Math.min(f.progress, 100)}%` }" />
          </div>
        </div>
      </div>
      <div class="and-fu__footer">
        <Button variant="primary" appearance="ghost" size="md" @click="onCancelClick">
          {{ cancelLabel }}
        </Button>
        <Button
          variant="primary"
          appearance="solid"
          size="md"
          :disabled="!complete"
          @click="onAcceptClick"
        >
          {{ acceptLabel }}
        </Button>
      </div>
    </div>
  </div>
</template>
