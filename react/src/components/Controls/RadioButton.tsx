import { useState, type InputHTMLAttributes } from 'react'
import './Controls.css'

export interface RadioButtonProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  /** Texto a la derecha (Figma: "Texto"; omitirlo = "Mostrar Texto" off) */
  label?: string
  checked?: boolean
  defaultChecked?: boolean
  /** Nombre del grupo de radios nativo */
  name?: string
  value?: string
  onChange?: (checked: boolean) => void
  /** Figma: Estados On-Disabled / Off-Disabled */
  disabled?: boolean
}

export function RadioButton({
  label,
  checked,
  defaultChecked = false,
  name,
  value,
  onChange,
  disabled = false,
  className = '',
  ...rest
}: RadioButtonProps) {
  const [inner, setInner] = useState(defaultChecked)
  const isOn = checked !== undefined ? checked : inner

  return (
    <label
      className={[
        'and-control',
        'and-radio',
        isOn && 'and-radio--checked',
        disabled && 'and-control--disabled and-radio--disabled',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <input
        type="radio"
        className="and-control__input"
        checked={isOn}
        name={name}
        value={value}
        disabled={disabled}
        onChange={(e) => {
          if (checked === undefined) setInner(e.target.checked)
          onChange?.(e.target.checked)
        }}
        {...rest}
      />
      <span className="and-control__box" aria-hidden="true">
        <span className="and-radio__mark">
          {isOn && <span className="and-radio__dot" />}
        </span>
      </span>
      {label && <span className="and-control__label">{label}</span>}
    </label>
  )
}
