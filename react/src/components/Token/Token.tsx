import {
  useEffect,
  useRef,
  useState,
  type ClipboardEvent,
  type HTMLAttributes,
  type KeyboardEvent,
} from 'react'
import { Blanket } from '../Blanket'
import { Button } from '../Button'
import { Icon } from '../Icon'
import './Token.css'

/** Tipo de token: virtual = 6 dígitos, físico = 8 dígitos */
export type TokenTipo = 'virtual' | 'fisico'

export interface TokenProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Visibilidad del modal */
  open?: boolean
  onClose?: () => void
  /** Tipo del token: "virtual" (6 dígitos) o "fisico" (8 dígitos) */
  tipo?: TokenTipo
  /** Título del modal */
  title?: string
  /** Link "¿Dónde encuentro este número?" */
  helpLabel?: string
  showHelp?: boolean
  onHelp?: () => void
  /** Link "¿Necesitas ayuda con tu token?" */
  tokenHelpLabel?: string
  showTokenHelp?: boolean
  onTokenHelp?: () => void
  /** Texto inferior (Figma: "Contenido") */
  text?: string
  /** Muestra el texto inferior (Figma: "Añadir texto") */
  showText?: boolean
  /** Estado Error de los inputs (true o el mensaje a mostrar) */
  error?: boolean | string
  cancelLabel?: string
  onCancel?: () => void
  continueLabel?: string
  /** Se habilita al completar el código y entrega el token capturado */
  onContinue?: (code: string) => void
  /** Se dispara con cada cambio del código */
  onChange?: (code: string) => void
  /** Monta el modal sobre el Blanket del DS (false = card inline) */
  blanket?: boolean
}

/**
 * Token — Pop up Token del DS Andromeda (Figma: página Token, set
 * "Token" con inputs "Inputs-Token"). Modal montado sobre el Blanket
 * con los Buttons del DS. La prop `tipo` define los dígitos: virtual
 * = 6, físico = 8. Validaciones: solo dígitos, avance/retroceso
 * automático de foco, pegado distribuido y Continuar deshabilitado
 * hasta completar el código; `error` pinta el estado Error de Figma.
 * Responsivo: en <768px toma el layout Mobile (350px, botones en
 * columna con Continuar arriba).
 */
export function Token({
  open = true,
  onClose,
  tipo = 'virtual',
  title = 'Ingresa el código de tu INVEX Key para continuar',
  helpLabel = '¿Dónde encuentro este número?',
  showHelp = true,
  onHelp,
  tokenHelpLabel = '¿Necesitas ayuda con tu token?',
  showTokenHelp = true,
  onTokenHelp,
  text = 'Al continuar, deberás volver a iniciar sesión con tu nuevo nombre de usuario.',
  showText = true,
  error = false,
  cancelLabel = 'Cancelar',
  onCancel,
  continueLabel = 'Continuar',
  onContinue,
  onChange,
  blanket = true,
  className = '',
  ...rest
}: TokenProps) {
  const count = tipo === 'fisico' ? 8 : 6
  const [digits, setDigits] = useState<string[]>(() => Array(count).fill(''))
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])

  useEffect(() => {
    setDigits(Array(count).fill(''))
  }, [count])

  if (!open) return null

  const code = digits.join('')
  const complete = digits.length === count && digits.every((d) => d !== '')
  const errorMessage = typeof error === 'string' ? error : 'Error'

  const update = (next: string[]) => {
    setDigits(next)
    onChange?.(next.join(''))
  }

  const setDigit = (index: number, raw: string) => {
    const digit = raw.replace(/\D/g, '').slice(-1)
    const next = [...digits]
    next[index] = digit
    update(next)
    if (digit && index < count - 1) inputsRef.current[index + 1]?.focus()
  }

  const onKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      e.preventDefault()
      const next = [...digits]
      next[index - 1] = ''
      update(next)
      inputsRef.current[index - 1]?.focus()
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault()
      inputsRef.current[index - 1]?.focus()
    } else if (e.key === 'ArrowRight' && index < count - 1) {
      e.preventDefault()
      inputsRef.current[index + 1]?.focus()
    }
  }

  const onPaste = (index: number, e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '')
    if (!pasted) return
    const next = [...digits]
    for (let i = 0; i < pasted.length && index + i < count; i++) {
      next[index + i] = pasted[i]
    }
    update(next)
    inputsRef.current[Math.min(index + pasted.length, count - 1)]?.focus()
  }

  const card = (
    <div
      className={['and-token', error && 'and-token--error', className]
        .filter(Boolean)
        .join(' ')}
      role="dialog"
      aria-modal={blanket || undefined}
      aria-label={title}
      {...rest}
    >
      <div className="and-token__header">
        <button
          type="button"
          className="and-token__close"
          aria-label="Cerrar"
          onClick={onClose}
        >
          <Icon name="close" size={24} />
        </button>
      </div>
      <div className="and-token__title">{title}</div>
      <div className="and-token__body">
        <div className="and-token__inputs">
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                inputsRef.current[i] = el
              }}
              className="and-token__input"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="0"
              maxLength={1}
              value={digit}
              aria-label={`Dígito ${i + 1} de ${count}`}
              aria-invalid={!!error || undefined}
              onChange={(e) => setDigit(i, e.target.value)}
              onKeyDown={(e) => onKeyDown(i, e)}
              onPaste={(e) => onPaste(i, e)}
            />
          ))}
        </div>
        {error && <div className="and-token__error">{errorMessage}</div>}
        {(showHelp || showTokenHelp) && (
          <div className="and-token__links">
            {showHelp && (
              <button type="button" className="and-token__link" onClick={onHelp}>
                {helpLabel}
              </button>
            )}
            {showTokenHelp && (
              <button
                type="button"
                className="and-token__link"
                onClick={onTokenHelp}
              >
                {tokenHelpLabel}
              </button>
            )}
          </div>
        )}
      </div>
      {showText && <div className="and-token__text">{text}</div>}
      <div className="and-token__footer">
        <Button appearance="ghost" variant="primary" size="md" onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button
          appearance="solid"
          variant="primary"
          size="md"
          disabled={!complete}
          onClick={() => onContinue?.(code)}
        >
          {continueLabel}
        </Button>
      </div>
    </div>
  )

  if (!blanket) return card
  return <Blanket onClose={onClose}>{card}</Blanket>
}
