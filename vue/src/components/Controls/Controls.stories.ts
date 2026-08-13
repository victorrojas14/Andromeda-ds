import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Checkbox from './Checkbox.vue'
import RadioButton from './RadioButton.vue'
import Switch from './Switch.vue'

const meta: Meta<typeof Switch> = {
  title: 'Forms/Controls',
  component: Switch,
  parameters: { layout: 'padded' },
}

export default meta

const column = 'display: flex; flex-direction: column; gap: 20px; align-items: flex-start;'

export const SwitchStory: StoryObj = {
  name: 'Switch',
  render: () => ({
    components: { Switch },
    template: `
      <div style="${column}">
        <Switch label="Switch" :model-value="true" />
        <Switch label="Switch" />
        <Switch label="Switch" :model-value="true" disabled />
        <Switch label="Switch" disabled />
        <Switch :model-value="true" />
      </div>
    `,
  }),
}

export const CheckboxStory: StoryObj = {
  name: 'Checkbox',
  render: () => ({
    components: { Checkbox },
    template: `
      <div style="${column}">
        <Checkbox label="CheckBox" :model-value="true" />
        <Checkbox label="CheckBox" />
        <Checkbox label="CheckBox" :model-value="true" disabled />
        <Checkbox label="CheckBox" disabled />
        <Checkbox :model-value="true" />
      </div>
    `,
  }),
}

export const RadioButtonStory: StoryObj = {
  name: 'RadioButton',
  render: () => ({
    components: { RadioButton },
    template: `
      <div style="${column}">
        <RadioButton label="RadioButton" :model-value="true" />
        <RadioButton label="RadioButton" />
        <RadioButton label="RadioButton" :model-value="true" disabled />
        <RadioButton label="RadioButton" disabled />
      </div>
    `,
  }),
}

export const GrupoDeRadios: StoryObj = {
  name: 'Grupo de radios',
  render: () => ({
    components: { RadioButton },
    setup() {
      const seleccion = ref('Nulo')
      return { seleccion, opciones: ['Nulo', 'Regular', 'Amplio'] }
    },
    template: `
      <div style="display: flex; gap: 40px; flex-wrap: wrap;">
        <RadioButton
          v-for="op in opciones"
          :key="op"
          v-model="seleccion"
          name="conocimiento"
          :label="op"
          :value="op"
        />
      </div>
    `,
  }),
}

export const Controlados: StoryObj = {
  render: () => ({
    components: { Switch, Checkbox },
    setup() {
      const on = ref(true)
      const check = ref(true)
      return { on, check }
    },
    template: `
      <div style="${column}">
        <Switch v-model="on" :label="on ? 'Notificaciones activas' : 'Notificaciones inactivas'" />
        <Checkbox v-model="check" :label="check ? 'Acepto términos (sí)' : 'Acepto términos (no)'" />
      </div>
    `,
  }),
}
