import { useState, type InputHTMLAttributes } from 'react'
import './Controls.css'

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  /** Texto a la derecha (Figma: "Texto"; omitirlo = "Mostrar Texto" off) */
  label?: string
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  /** Figma: Estados On-Disabled / Off-Disabled */
  disabled?: boolean
}

/** Palomita del estado On (mismo trazo que el check del Multiselect) */
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M2.5 7.5L5.5 10.5L11.5 3.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export function Checkbox({
  label,
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  className = '',
  ...rest
}: CheckboxProps) {
  const [inner, setInner] = useState(defaultChecked)
  const isOn = checked !== undefined ? checked : inner

  return (
    <label
      className={[
        'and-control',
        'and-checkbox',
        isOn && 'and-checkbox--checked',
        disabled && 'and-control--disabled and-checkbox--disabled',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <input
        type="checkbox"
        className="and-control__input"
        checked={isOn}
        disabled={disabled}
        onChange={(e) => {
          if (checked === undefined) setInner(e.target.checked)
          onChange?.(e.target.checked)
        }}
        {...rest}
      />
      <span className="and-control__box" aria-hidden="true">
        <span className="and-checkbox__mark">{isOn && <CheckIcon />}</span>
      </span>
      {label && <span className="and-control__label">{label}</span>}
    </label>
  )
}
