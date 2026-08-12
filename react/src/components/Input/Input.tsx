import * as React from 'react'
import './Input.css'
import { Icon } from '../Icon'

export type InputSize = 'sm' | 'md' | 'lg'

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Etiqueta flotante (Figma: "Texto Label"). */
  label: string
  /** Texto de asistencia inferior (Figma: "Texto Asistencia"). */
  assist?: React.ReactNode
  /** Tamaño (Figma: Form-SM/MD/LG). */
  size?: InputSize
  /**
   * Estado de error (Figma: Estado Error / No llenado). Un string se
   * muestra como texto de asistencia en danger.
   */
  error?: boolean | string
  /** Icono derecho; cualquier icono del DS (Figma: "Mostrar/Cambiar Icono"). */
  icon?: React.ReactNode
}

/**
 * Input — campo de formulario del DS Andromeda (Figma: Form-SM/MD/LG).
 * Label flotante (en reposo centrada; con foco o valor sube a 12px),
 * borde gray-300 con radios superiores, línea inferior de 2px que
 * cambia por estado (tertiary con foco, danger en error, gray-300 en
 * disabled/readonly) y texto de asistencia opcional.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    assist,
    size = 'md',
    error = false,
    icon,
    className,
    disabled,
    readOnly,
    value,
    defaultValue,
    onChange,
    onFocus,
    onBlur,
    id,
    ...rest
  },
  ref,
) {
  const reactId = React.useId()
  const inputId = id ?? reactId
  const [focused, setFocused] = React.useState(false)
  const [innerValue, setInnerValue] = React.useState(defaultValue ?? '')
  const currentValue = value !== undefined ? value : innerValue
  const floated = focused || String(currentValue ?? '').length > 0

  const classes = [
    'and-input',
    `and-input--${size}`,
    floated && 'and-input--float',
    error && 'and-input--error',
    disabled && 'and-input--disabled',
    readOnly && !disabled && 'and-input--locked',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const assistText = typeof error === 'string' && error ? error : assist

  return (
    <div className={classes}>
      <div className="and-input__form">
        <div className="and-input__box">
          <label className="and-input__label" htmlFor={inputId}>
            {label}
          </label>
          <input
            {...rest}
            ref={ref}
            id={inputId}
            className="and-input__control"
            disabled={disabled}
            readOnly={readOnly}
            value={value}
            defaultValue={value === undefined ? defaultValue : undefined}
            aria-invalid={error ? true : undefined}
            onChange={(event) => {
              if (value === undefined) setInnerValue(event.target.value)
              onChange?.(event)
            }}
            onFocus={(event) => {
              setFocused(true)
              onFocus?.(event)
            }}
            onBlur={(event) => {
              setFocused(false)
              onBlur?.(event)
            }}
          />
          {icon && <span className="and-input__icon">{icon}</span>}
        </div>
        <div className="and-input__line" />
      </div>
      {assistText && <p className="and-input__assist">{assistText}</p>}
    </div>
  )
})

export interface InputPasswordProps extends Omit<InputProps, 'icon' | 'type'> {}

/**
 * InputPassword — variante de contraseña del Input: icono eye-outline
 * que alterna entre ocultar (type password) y mostrar (type text) el
 * contenido del campo.
 */
export const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  function InputPassword(props, ref) {
    const [visible, setVisible] = React.useState(false)

    return (
      <Input
        {...props}
        ref={ref}
        type={visible ? 'text' : 'password'}
        icon={
          <button
            type="button"
            className="and-input__icon"
            aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            aria-pressed={visible}
            onClick={() => setVisible((prev) => !prev)}
          >
            <Icon name={visible ? 'eye-off-outline' : 'eye-outline'} size={24} />
          </button>
        }
      />
    )
  },
)
