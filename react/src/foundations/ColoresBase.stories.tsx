import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { ColorCard } from '../components/ColorCard'
import { colors } from './colors'

/*
 * Fundamentos / Colores Base
 * Réplica de la página "Colores Base" del archivo Figma "Ui Kit Web"
 * (node 9075:37705).
 */

const grid: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 32,
  alignItems: 'flex-start',
}

const intro: React.CSSProperties = {
  fontFamily: 'var(--font-family-sans)',
  fontSize: 'var(--font-size-md)',
  lineHeight: 'var(--line-height-normal)',
  color: 'var(--color-text-primary)',
  maxWidth: 900,
  margin: '0 0 32px',
}

const meta: Meta = {
  title: 'Fundamentos/Colors/Colores Base',
  component: ColorCard,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj

export const Primarios: Story = {
  render: () => (
    <div>
      <p style={intro}>
        Los colores primarios son aquellos cuyo uso es predominante al interior de la
        aplicación. Su uso permite plasmar la identidad gráfica del producto y otorgar
        relevancia a elementos que tengan un mayor nivel de jerarquía. En el caso de
        INVEX Banco el color primario es el Rojo INVEX.
      </p>
      <div style={grid}>
        <ColorCard
          name="Primary--Light"
          value={colors.primary.light}
          description="Se utiliza para indicar cuando un botón está deshabilitado."
        />
        <ColorCard
          name="Primary"
          value={colors.primary.base}
          description="Se utiliza para el header, botones e iconos como acento de color y acción principal."
        />
        <ColorCard
          name="Primary--Dark"
          value={colors.primary.dark}
          description="Se utiliza para indicar cuando un botón está presionado."
        />
      </div>
    </div>
  ),
}

export const Secundarios: Story = {
  render: () => (
    <div>
      <p style={intro}>
        Los colores secundarios son aquellos cuyo uso es complementario al interior de la
        aplicación. Su uso permite brindar un apoyo visual en acciones que tienen una
        prioridad secundaria y sirven en la interacción para definir estados de
        componentes.
      </p>
      <div style={grid}>
        <ColorCard
          name="Secondary--Light"
          value={colors.secondary.light}
          description="Se utiliza en textos de jerarquía secundaria."
        />
        <ColorCard
          name="Secondary"
          value={colors.secondary.base}
          description="Se utiliza en textos de jerarquía secundaria."
        />
        <ColorCard
          name="Secondary--Dark"
          value={colors.secondary.dark}
          description="Se utiliza en textos de jerarquía secundaria."
        />
      </div>
    </div>
  ),
}

export const Terciarios: Story = {
  render: () => (
    <div style={grid}>
      <ColorCard
        name="Tertiary--Light"
        value={colors.tertiary.light}
        description="Se utiliza en botones secundarios (con contorno) para indicar que el botón está presionado."
      />
      <ColorCard
        name="Tertiary"
        value={colors.tertiary.base}
        description="Se utiliza en botones secundarios con contorno, botones de texto, botones con icono y steppers."
      />
      <ColorCard
        name="Tertiary--Dark"
        value={colors.tertiary.dark}
        description="Se utiliza en botones secundarios con contorno, botones de texto, botones con icono y steppers."
      />
    </div>
  ),
}

export const Neutros: Story = {
  render: () => (
    <div style={grid}>
      <ColorCard
        name="White"
        value={colors.neutral.white}
        description="Se utiliza como color de fondo para el modo light en cards, botones, logotipo con fondo oscuro, para texto en botones y para iconos."
      />
      <ColorCard
        name="Background"
        value={colors.neutral.background}
        description="Se utiliza como color de fondo para todos los portales."
      />
      <ColorCard
        name="Gray-100"
        value={colors.neutral.gray100}
        description="Se utiliza para colores de fondo en tablas."
      />
      <ColorCard
        name="Gray-200"
        value={colors.neutral.gray200}
        description="Se utiliza para colores de fondo en componentes."
      />
      <ColorCard
        name="Gray-300"
        value={colors.neutral.gray300}
        description="Se utiliza para contornos y textos en formularios."
      />
      <ColorCard
        name="Gray-400"
        value={colors.neutral.gray400}
        description="Se utiliza para contornos y textos en formularios."
      />
      <ColorCard
        name="Gray-500"
        value={colors.neutral.gray500}
        description="Se utiliza en textos de formularios."
      />
      <ColorCard
        name="Body"
        value={colors.neutral.body}
        description="Se utiliza como color principal en textos."
      />
    </div>
  ),
}

export const SemanticosLight: Story = {
  name: 'Semánticos — Light',
  render: () => (
    <div style={grid}>
      <ColorCard
        name="Success--Light"
        value={colors.success.light}
        description="Se utiliza como fondo para alertas y notificaciones de éxito."
      />
      <ColorCard
        name="Warning--Light"
        value={colors.warning.light}
        description="Se utiliza como fondo para alertas y notificaciones de advertencia."
      />
      <ColorCard
        name="Danger--Light"
        value={colors.danger.light}
        description="Se utiliza como fondo para alertas y notificaciones de riesgo."
      />
      <ColorCard
        name="Info--Light"
        value={colors.info.light}
        description="Se utiliza como fondo para alertas y notificaciones de información."
      />
    </div>
  ),
}

export const SemanticosBase: Story = {
  name: 'Semánticos — Base',
  render: () => (
    <div style={grid}>
      <ColorCard
        name="Success"
        value={colors.success.base}
        description="Se utiliza para notificar casos de éxito en montos positivos, etiquetas e iconos."
      />
      <ColorCard
        name="Warning"
        value={colors.warning.base}
        description="Se utiliza para notificar casos de advertencia en montos, etiquetas e iconos."
      />
      <ColorCard
        name="Danger"
        value={colors.danger.base}
        description="Se utiliza para notificar casos de riesgo en montos negativos, etiquetas e iconos."
      />
      <ColorCard
        name="Info"
        value={colors.info.base}
        description="Se utiliza para notificar casos de información en montos, etiquetas e iconos."
      />
    </div>
  ),
}

export const SemanticosDark: Story = {
  name: 'Semánticos — Dark',
  render: () => (
    <div style={grid}>
      <ColorCard
        name="Success--Dark"
        value={colors.success.dark}
        description="Se utiliza como color de texto en alertas y textos que indiquen un estatus de éxito."
      />
      <ColorCard
        name="Warning--Dark"
        value={colors.warning.dark}
        description="Se utiliza como color de texto en alertas y textos que indiquen un estatus de advertencia."
      />
      <ColorCard
        name="Danger--Dark"
        value={colors.danger.dark}
        description="Se utiliza como color de texto en alertas y textos que indiquen un estatus de riesgo."
      />
      <ColorCard
        name="Info--Dark"
        value={colors.info.dark}
        description="Se utiliza como color de texto en alertas y textos que indiquen un estatus informativo."
      />
    </div>
  ),
}

export const DarkMode: Story = {
  render: () => (
    <div style={grid}>
      <ColorCard name="Dark--Blue01" value={colors.darkMode.darkBlue01} />
      <ColorCard name="Dark--Blue02" value={colors.darkMode.darkBlue02} />
      <ColorCard name="Black--Blue" value={colors.darkMode.blackBlue} />
    </div>
  ),
}
