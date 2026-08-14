import { useState, type HTMLAttributes, type ReactNode } from 'react'
import { Icon, type AndIconName } from '../Icon'
import './Tabs.css'

export interface TabItem {
  /** Texto del tab (Figma: "Texto" / "Text content") */
  label: string
  /** Icono izquierdo de la librería (Figma: "Cambiar Icono Izq"; omitir = "Mostrar Icono Izq" off) */
  iconLeft?: AndIconName
  /** Icono derecho de la librería (Figma: "Cambiar Icono Der") */
  iconRight?: AndIconName
  /** Estado Disabled (solo variante primary) */
  disabled?: boolean
}

export interface TabsProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Tabs (strings u objetos con iconos/disabled) */
  items: Array<string | TabItem>
  /** Índice activo (controlado) */
  active?: number
  defaultActive?: number
  onChange?: (index: number, item: TabItem) => void
  /** primary: Tabs-1 con subrayado · secondary: Tab secundario (segmented) */
  variant?: 'primary' | 'secondary'
  /** Color del subrayado activo del primary (Figma: Active primary/Active secundary) */
  activeStyle?: 'primary' | 'secondary'
}

const toItems = (items: Array<string | TabItem>): TabItem[] =>
  items.map((i) => (typeof i === 'string' ? { label: i } : i))

export function Tabs({
  items,
  active,
  defaultActive = 0,
  onChange,
  variant = 'primary',
  activeStyle = 'primary',
  className = '',
  ...rest
}: TabsProps) {
  const [inner, setInner] = useState(defaultActive)
  const current = active !== undefined ? active : inner
  const tabs = toItems(items)

  const select = (index: number) => {
    if (tabs[index].disabled) return
    if (active === undefined) setInner(index)
    onChange?.(index, tabs[index])
  }

  if (variant === 'secondary') {
    return (
      <div
        className={['and-tabs--segmented', className].filter(Boolean).join(' ')}
        role="tablist"
        {...rest}
      >
        {tabs.map((tab, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === current}
            className={[
              'and-tabs__segment',
              i === current && 'and-tabs__segment--active',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => select(i)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    )
  }

  const renderIcon = (name?: AndIconName): ReactNode =>
    name ? <Icon name={name} size={24} /> : null

  return (
    <div
      className={[
        'and-tabs',
        activeStyle === 'secondary' && 'and-tabs--secondary-style',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      role="tablist"
      {...rest}
    >
      {tabs.map((tab, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={i === current}
          disabled={tab.disabled}
          className={[
            'and-tabs__tab',
            i === current && !tab.disabled && 'and-tabs__tab--active',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={() => select(i)}
        >
          <span className="and-tabs__tab-inner">
            {renderIcon(tab.iconLeft)}
            {tab.label}
            {renderIcon(tab.iconRight)}
          </span>
          <span className="and-tabs__bar" aria-hidden="true" />
        </button>
      ))}
    </div>
  )
}
