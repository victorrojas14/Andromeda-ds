import { useState, type HTMLAttributes } from 'react'
import { ButtonMisProductos } from '../Button'
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

/** Items del "Menu usuario" del Perfil Movil (Figma 806:171890) */
const DEFAULT_USER_MENU: MenuItem[] = [
  { label: 'Mi perfil', icon: 'account-outline' },
  { label: 'Preguntas frecuentes', icon: 'question-line' },
  { label: 'Configuración', icon: 'settings-outline' },
  { label: 'Notificaciones', icon: 'bell-outline' },
  { label: 'Cerrar sesión', icon: 'Salir' },
]

export interface MenuProps
  extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  /** Items del menú (strings u objetos con icono/chevron) */
  items: Array<string | MenuItem>
  /**
   * Variante del menú mobile: "lateral" (Menu Movil y Lateral,
   * colapsable a solo iconos) o "usuario" (Menu Mobile con Perfil
   * Movil y botón Mis productos; se colapsa al hacer clic en un item)
   */
  variant?: 'lateral' | 'usuario'
  /** Índice activo (controlado) */
  active?: number
  defaultActive?: number
  onChange?: (index: number, item: MenuItem) => void
  /** Menú mobile expandido (controlado; Figma: Estado Abierto/Cerrado) */
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /** Nombre del usuario (variante usuario, Figma: "Nombre Usuario") */
  userName?: string
  /** Iniciales del avatar (variante usuario, Figma: "Iniciales") */
  userInitials?: string
  /** Texto de último acceso (variante usuario) */
  lastAccess?: string
  /** Items del menú de usuario (variante usuario; default los del Perfil Movil) */
  userMenuItems?: Array<string | MenuItem>
  /** Items de la lista Mis productos (variante usuario) */
  productsItems?: Array<string | MenuItem>
  /** Muestra el botón Mis productos del DS (variante usuario) */
  showProductsButton?: boolean
  onUserMenuSelect?: (index: number, item: MenuItem) => void
  onProductsSelect?: (index: number, item: MenuItem) => void
}

const toItems = (items: Array<string | MenuItem>): MenuItem[] =>
  items.map((i) => (typeof i === 'string' ? { label: i } : i))

export function Menu({
  items,
  variant = 'lateral',
  active,
  defaultActive = 0,
  onChange,
  open,
  defaultOpen = true,
  onOpenChange,
  userName = 'Nombre Usuario',
  userInitials = 'NU',
  lastAccess = '',
  userMenuItems,
  productsItems = [],
  showProductsButton = true,
  onUserMenuSelect,
  onProductsSelect,
  className = '',
  ...rest
}: MenuProps) {
  const [inner, setInner] = useState(defaultActive)
  const [innerOpen, setInnerOpen] = useState(defaultOpen)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const current = active !== undefined ? active : inner
  const isOpen = open !== undefined ? open : innerOpen
  const menuItems = toItems(items)
  const userItems = toItems(userMenuItems ?? DEFAULT_USER_MENU)
  const productItems = toItems(productsItems)

  const setOpen = (next: boolean) => {
    if (open === undefined) setInnerOpen(next)
    onOpenChange?.(next)
  }

  /** Colapsa todo el menú mobile (variante usuario) tras elegir un item */
  const collapse = () => {
    setUserMenuOpen(false)
    setProductsOpen(false)
    setOpen(false)
  }

  const select = (index: number) => {
    if (active === undefined) setInner(index)
    onChange?.(index, menuItems[index])
    if (variant === 'usuario') collapse()
  }

  /** Cerrado → abre el menú; abierto → alterna el menú de usuario */
  const toggleUser = () => {
    if (!isOpen) {
      setOpen(true)
      return
    }
    setUserMenuOpen((v) => !v)
  }

  const mobileItem = (
    item: MenuItem,
    key: number,
    opts: {
      active?: boolean
      collapsed?: boolean
      defaultIcon?: boolean
      onClick: () => void
    },
  ) => (
    <button
      key={key}
      type="button"
      className={[
        'and-menu-mobile__item',
        opts.active && 'and-menu-mobile__item--active',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-current={opts.active ? 'page' : undefined}
      aria-label={opts.collapsed ? item.label : undefined}
      title={opts.collapsed ? item.label : undefined}
      onClick={opts.onClick}
    >
      {(opts.defaultIcon ? (item.showLeftIcon ?? true) : !!item.icon) && (
        <Icon name={item.icon ?? 'account-outline'} size={24} />
      )}
      {!opts.collapsed && (
        <span className="and-menu-mobile__item-label">{item.label}</span>
      )}
      {!opts.collapsed && item.showIcon && <Icon name="chevron-down" size={24} />}
    </button>
  )

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

      {variant === 'lateral' ? (
        /* Menú mobile / lateral (Menu Movil y Lateral) */
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
          {menuItems.map((item, i) =>
            mobileItem(item, i, {
              active: i === current,
              collapsed: !isOpen,
              defaultIcon: true,
              onClick: () => select(i),
            }),
          )}
        </div>
      ) : (
        /* Menú mobile variante usuario (Menu Mobile con Perfil Movil) */
        <div className="and-menu-user">
          <div className="and-menu-user__bar">
            <button
              type="button"
              className="and-menu-user__info"
              onClick={toggleUser}
            >
              <span className="and-menu-user__initials" aria-hidden="true">
                {userInitials}
              </span>
              <span className="and-menu-user__texts">
                <span className="and-menu-user__name">{userName}</span>
                {lastAccess && (
                  <span className="and-menu-user__access">{lastAccess}</span>
                )}
              </span>
            </button>
            <button
              type="button"
              className="and-menu-user__chevron"
              aria-label={
                !isOpen
                  ? 'Expandir menú'
                  : userMenuOpen
                    ? 'Cerrar menú de usuario'
                    : 'Abrir menú de usuario'
              }
              aria-expanded={isOpen && userMenuOpen}
              onClick={toggleUser}
            >
              <Icon
                name={isOpen && userMenuOpen ? 'chevron-up' : 'chevron-down'}
                size={24}
              />
            </button>
          </div>
          {isOpen && (
            <>
              {userMenuOpen && (
                <div className="and-menu-user__usermenu">
                  {userItems.map((item, i) =>
                    mobileItem(item, i, {
                      defaultIcon: true,
                      onClick: () => {
                        onUserMenuSelect?.(i, item)
                        collapse()
                      },
                    }),
                  )}
                </div>
              )}
              {showProductsButton && (
                <div
                  className={[
                    'and-menu-user__products',
                    productsOpen && 'and-menu-user__products--open',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <ButtonMisProductos
                    aria-expanded={productsOpen}
                    onClick={() => setProductsOpen((v) => !v)}
                  />
                </div>
              )}
              {productsOpen && productItems.length > 0 && (
                <div className="and-menu-user__products-list">
                  {productItems.map((item, i) =>
                    mobileItem(item, i, {
                      onClick: () => {
                        onProductsSelect?.(i, item)
                        collapse()
                      },
                    }),
                  )}
                </div>
              )}
              {menuItems.length > 0 && (
                <div className="and-menu-user__list">
                  {menuItems.map((item, i) =>
                    mobileItem(item, i, {
                      active: i === current,
                      onClick: () => select(i),
                    }),
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </nav>
  )
}
