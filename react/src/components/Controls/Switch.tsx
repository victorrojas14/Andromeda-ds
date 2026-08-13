import { useState, type HTMLAttributes } from 'react'
import './Controls.css'

export interface SwitchProps
  extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  /** Texto a la derecha (Figma: "Texto"; omitirlo = "Mostrar Texto" off) */
  label?: string
  /** Estado del switch (controlado; Figma: Estatus on/off) */
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  /** Figma: Estados On/Off Disabled (atom al 50%) */
  disabled?: boolean
}

export function Switch({
  label,
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  className = '',
  ...rest
}: SwitchProps) {
  const [inner, setInner] = useState(defaultChecked)
  const isOn = checked !== undefined ? checked : inner

  const toggle = () => {
    if (disabled) return
    if (checked === undefined) setInner(!isOn)
    onChange?.(!isOn)
  }

  return (
    <label
      className={[
        'and-control',
        'and-switch',
        isOn && 'and-switch--on',
        disabled && 'and-control--disabled and-switch--disabled',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      <button
        type="button"
        role="switch"
        aria-checked={isOn}
        disabled={disabled}
        className="and-switch__track"
        onClick={toggle}
      >
        <span className="and-switch__knob" />
      </button>
      {label && <span className="and-control__label">{label}</span>}
    </label>
  )
}
