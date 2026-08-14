import { useState, type HTMLAttributes } from 'react'
import { Icon, type AndIconName } from '../Icon'
import './Menu.css'

export interface MenuItem {
  /** Texto del item (Figma: "Texto") */
  label: string
  /** Icono izquierdo en mobile (Figma: "Cambiar Icono"; default account-outline) */
  icon?: AndIconName
  /** Muestra el icono izquierdo en mobile (Figma: "Mostrar Icono Izq") */
  showLeftIcon?: boolean
  /**
   * Muestra el chevron: down/up en la barra desktop (Figma: "Mostrar
   * Icono") y chevron-down a la derecha en mobile ("Mostrar Icono Der",
   * indica submenú)
   */
  showIcon?: boolean
}

export interface MenuProps
  extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  /** Items del menú (strings u objetos con icono/chevron) */
  items: Array<string | MenuItem>
  /** Índice activo (controlado) */
  active?: number
  defaultActive?: number
  onChange?: (index: number, item: MenuItem) => void
  /** Menú mobile expandido (controlado; Figma: Estado Abierto/Cerrado) */
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

const toItems = (items: Array<string | MenuItem>): MenuItem[] =>
  items.map((i) => (typeof i === 'string' ? { label: i } : i))

export function Menu({
  items,
  active,
  defaultActive = 0,
  onChange,
  open,
  defaultOpen = true,
  onOpenChange,
  className = '',
  ...rest
}: MenuProps) {
  const [inner, setInner] = useState(defaultActive)
  const [innerOpen, setInnerOpen] = useState(defaultOpen)
  const current = active !== undefined ? active : inner
  const isOpen = open !== undefined ? open : innerOpen
  const menuItems = toItems(items)

  const select = (index: number) => {
    if (active === undefined) setInner(index)
    onChange?.(index, menuItems[index])
  }

  const setOpen = (next: boolean) => {
    if (open === undefined) setInnerOpen(next)
    onOpenChange?.(next)
  }

  return (
    <nav className={className || undefined} {...rest}>
      {/* Barra desktop (Menu Desktop) */}
      <div className="and-menu">
        <div className="and-menu__items">
          {menuItems.map((item, i) => (
            <button
              key={i}
              type="button"
              className={[
                'and-menu__item',
                i === current && 'and-menu__item--active',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-current={i === current ? 'page' : undefined}
              onClick={() => select(i)}
            >
              <span className="and-menu__item-inner">
                {item.label}
                {item.showIcon && (
                  <Icon
                    name={i === current ? 'chevron-up' : 'chevron-down'}
                    size={24}
                  />
                )}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Menú mobile / lateral (Menu Movil y Lateral) */}
      <div
        className={[
          'and-menu-mobile',
          !isOpen && 'and-menu-mobile--cerrado',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <button
          type="button"
          className="and-menu-mobile__toggle"
          aria-label={isOpen ? 'Colapsar menú' : 'Expandir menú'}
          aria-expanded={isOpen}
          onClick={() => setOpen(!isOpen)}
        >
          <Icon name={isOpen ? 'chevron-left' : 'chevron-right'} size={24} />
        </button>
        {menuItems.map((item, i) => (
          <button
            key={i}
            type="button"
            className={[
              'and-menu-mobile__item',
              i === current && 'and-menu-mobile__item--active',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-current={i === current ? 'page' : undefined}
            aria-label={!isOpen ? item.label : undefined}
            title={!isOpen ? item.label : undefined}
            onClick={() => select(i)}
          >
            {(item.showLeftIcon ?? true) && (
              <Icon name={item.icon ?? 'account-outline'} size={24} />
            )}
            {isOpen && (
              <span className="and-menu-mobile__item-label">{item.label}</span>
            )}
            {isOpen && item.showIcon && <Icon name="chevron-down" size={24} />}
          </button>
        ))}
      </div>
    </nav>
  )
}
