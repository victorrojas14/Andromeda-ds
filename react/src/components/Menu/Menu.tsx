import { useState, type HTMLAttributes } from 'react'
import { ButtonMisProductos } from '../Button'
import { Icon } from '../Icon'
import './Menu.css'

export interface MenuItem {
  /** Texto del item (Figma: "Texto") */
  label: string
  /** Muestra el chevron down/up (Figma: "Mostrar Icono") */
  showIcon?: boolean
}

export interface MenuProps
  extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  /** Items del menú (strings u objetos con showIcon) */
  items: Array<string | MenuItem>
  /** Índice activo (controlado) */
  active?: number
  defaultActive?: number
  onChange?: (index: number, item: MenuItem) => void
  /** Nombre del usuario (mobile, Figma: "Nombre Usuario") */
  userName?: string
  /** Iniciales del avatar (mobile, Figma: "Iniciales") */
  userInitials?: string
  /** Texto de último acceso (mobile) */
  lastAccess?: string
  /** Muestra la barra de usuario en mobile (Top Menu Mobile) */
  showUser?: boolean
  /** Muestra el botón Mis productos del DS en mobile */
  showProductsButton?: boolean
  onProductsClick?: () => void
  onUserClick?: () => void
}

const toItems = (items: Array<string | MenuItem>): MenuItem[] =>
  items.map((i) => (typeof i === 'string' ? { label: i } : i))

export function Menu({
  items,
  active,
  defaultActive = 0,
  onChange,
  userName = 'Nombre Usuario',
  userInitials = 'NU',
  lastAccess = '',
  showUser = true,
  showProductsButton = true,
  onProductsClick,
  onUserClick,
  className = '',
  ...rest
}: MenuProps) {
  const [inner, setInner] = useState(defaultActive)
  const current = active !== undefined ? active : inner
  const menuItems = toItems(items)

  const select = (index: number) => {
    if (active === undefined) setInner(index)
    onChange?.(index, menuItems[index])
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

      {/* Menú mobile (Top Menu Mobile + Mis productos + Menu Mobile) */}
      <div className="and-menu-mobile">
        {showUser && (
          <div className="and-menu-mobile__user">
            <div className="and-menu-mobile__user-info">
              <span className="and-menu-mobile__initials" aria-hidden="true">
                {userInitials}
              </span>
              <div className="and-menu-mobile__user-texts">
                <span className="and-menu-mobile__user-name">{userName}</span>
                {lastAccess && (
                  <span className="and-menu-mobile__user-access">{lastAccess}</span>
                )}
              </div>
            </div>
            <button
              type="button"
              className="and-menu-mobile__user-chevron"
              aria-label="Perfil"
              onClick={onUserClick}
            >
              <Icon name="chevron-down" size={24} />
            </button>
          </div>
        )}
        {showProductsButton && (
          <div className="and-menu-mobile__products">
            <ButtonMisProductos onClick={onProductsClick} />
          </div>
        )}
        <div className="and-menu-mobile__list">
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
              onClick={() => select(i)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
