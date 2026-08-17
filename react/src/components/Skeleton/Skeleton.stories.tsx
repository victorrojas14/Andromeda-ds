import type { Meta, StoryObj } from '@storybook/react'
import { useEffect, useState } from 'react'
import { Button } from '../Button'
import { Skeleton } from './Skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  parameters: { layout: 'padded' },
  argTypes: {
    width: { control: 'text', description: 'Ancho (px o CSS)' },
    height: { control: 'text', description: 'Alto (px o CSS; Figma: 40)' },
    radius: { control: 'text', description: 'Radio (Figma: 4)' },
    circle: { control: 'boolean', description: 'Placeholder circular' },
    animated: {
      control: 'boolean',
      description: 'Shimmer (Group 1 ↔ Group 2 de Figma)',
    },
  },
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Playground: Story = {
  args: { width: 360, height: 40 },
}

export const Estatico: Story = {
  name: 'Estático (Group 1)',
  args: { width: 360, height: 40, animated: false },
}

export const Composicion: Story = {
  name: 'Composición (perfil)',
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', maxWidth: 360 }}>
      <Skeleton circle width={56} height={56} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        <Skeleton height={16} width="60%" />
        <Skeleton height={12} />
      </div>
    </div>
  ),
}

/** Ejemplo de uso: skeletons mientras carga y aparece el contenido */
const DemoCarga = () => {
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    if (!cargando) return
    const t = setTimeout(() => setCargando(false), 2500)
    return () => clearTimeout(t)
  }, [cargando])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        width: 360,
        fontFamily: 'var(--font-family-sans)',
      }}
    >
      {cargando ? (
        <>
          <Skeleton height={28} width="45%" />
          <Skeleton height={180} />
          <Skeleton height={14} />
          <Skeleton height={14} width="80%" />
          <Skeleton height={48} width={160} radius={4} />
        </>
      ) : (
        <>
          <h3 style={{ margin: 0, fontSize: 20, color: 'var(--color-body)' }}>
            Carteras
          </h3>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 180,
              background: 'var(--color-primary)',
              borderRadius: 10,
              color: 'var(--color-white)',
              fontSize: 24,
              fontWeight: 600,
            }}
          >
            CER 30
          </div>
          <p style={{ margin: 0, fontSize: 14, color: 'var(--color-body)' }}>
            Para inversionistas que inician su ciclo de vida laboral o que
            buscan los mayores rendimientos posibles.
          </p>
          <Button
            variant="primary"
            appearance="solid"
            size="md"
            onClick={() => setCargando(true)}
          >
            Volver a cargar
          </Button>
        </>
      )}
    </div>
  )
}

export const EjemploDeCarga: Story = {
  name: 'Ejemplo de carga (aparece el contenido)',
  render: () => <DemoCarga />,
}
