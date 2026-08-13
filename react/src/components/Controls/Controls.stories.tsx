import type { Meta, StoryObj } from '@storybook/react'
import { useState, type CSSProperties } from 'react'
import { Checkbox } from './Checkbox'
import { RadioButton } from './RadioButton'
import { Switch } from './Switch'

const meta: Meta<typeof Switch> = {
  title: 'Forms/Controls',
  component: Switch,
  parameters: { layout: 'padded' },
}

export default meta

const column: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
  alignItems: 'flex-start',
}

export const SwitchStory: StoryObj = {
  name: 'Switch',
  render: () => (
    <div style={column}>
      <Switch label="Switch" defaultChecked />
      <Switch label="Switch" />
      <Switch label="Switch" defaultChecked disabled />
      <Switch label="Switch" disabled />
      <Switch defaultChecked />
    </div>
  ),
}

export const CheckboxStory: StoryObj = {
  name: 'Checkbox',
  render: () => (
    <div style={column}>
      <Checkbox label="CheckBox" defaultChecked />
      <Checkbox label="CheckBox" />
      <Checkbox label="CheckBox" defaultChecked disabled />
      <Checkbox label="CheckBox" disabled />
      <Checkbox defaultChecked />
    </div>
  ),
}

export const RadioButtonStory: StoryObj = {
  name: 'RadioButton',
  render: () => (
    <div style={column}>
      <RadioButton label="RadioButton" defaultChecked />
      <RadioButton label="RadioButton" />
      <RadioButton label="RadioButton" defaultChecked disabled />
      <RadioButton label="RadioButton" disabled />
    </div>
  ),
}

export const GrupoDeRadios: StoryObj = {
  name: 'Grupo de radios',
  render: () => {
    const opciones = ['Nulo', 'Regular', 'Amplio']
    const [seleccion, setSeleccion] = useState('Nulo')
    return (
      <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
        {opciones.map((op) => (
          <RadioButton
            key={op}
            name="conocimiento"
            label={op}
            value={op}
            checked={seleccion === op}
            onChange={() => setSeleccion(op)}
          />
        ))}
      </div>
    )
  },
}

export const Controlados: StoryObj = {
  render: () => {
    const [on, setOn] = useState(true)
    const [check, setCheck] = useState(true)
    return (
      <div style={column}>
        <Switch label={`Notificaciones ${on ? 'activas' : 'inactivas'}`} checked={on} onChange={setOn} />
        <Checkbox label={`Acepto términos (${check ? 'sí' : 'no'})`} checked={check} onChange={setCheck} />
      </div>
    )
  },
}
