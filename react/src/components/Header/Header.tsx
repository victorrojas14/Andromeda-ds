import { useState, type HTMLAttributes } from 'react'
import { ButtonMisProductos } from '../Button'
import { Icon, type AndIconName } from '../Icon'
import { Logo } from '../Logo'
// La hamburguesa despliega el Menu del DS (variante usuario) y el menú
// de usuario reutiliza sus items (mismo átomo "Item menu mobile").
import { Menu, type MenuItem } from '../Menu'
import '../Menu/Menu.css'
import './Header.css'

/** Marca del header (Figma: variante "Header") */
export type HeaderVariant = 'invex' | 'renacer' | 'fiduciario'

export interface HeaderUserMenuItem {
  /** Texto del item */
  label: string
  /** Icono de 24 del registro del DS */
  icon?: AndIconName
}

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  /** Marca del header (Figma: Header=Invex|Header-Renacer|Header-Fiduciario) */
  variant?: HeaderVariant
  /** Nombre del usuario (Figma: "Nombre usuario") */
  userName?: string
  /** Iniciales del avatar (Figma: "Iniciales") */
  initials?: string
  /** Texto de último acceso */
  lastAccess?: string
  /** Etiqueta del badge de administrador */
  adminLabel?: string
  /** Muestra el icono de ayuda (Figma: "Mostrar Ic Ayuda") */
  showHelp?: boolean
  /** Muestra el icono de reloj (Figma: "Mostrar Ic Reloj") */
  showClock?: boolean
  /** Muestra el icono de notificaciones (Figma: "Mostrar Ic Notificaciones") */
  showNotifications?: boolean
  /** Muestra el icono de configuración (Figma: "Mostrar Ic Configuracion") */
  showSettings?: boolean
  /** Muestra el bloque usuario + último acceso (Figma: "Mostrar Ususario Fecha") */
  showUserDate?: boolean
  /** Muestra el badge ADMIN (Figma: "Mostrar Admin") */
  showAdmin?: boolean
  /** Muestra las iniciales y su chevron (Figma: "Mostrar Iniciales") */
  showInitials?: boolean
  /** Muestra el botón Mis productos (Figma: "Mostrar Boton Acceso") */
  showProductsButton?: boolean
  /** Muestra el icono de menú (Figma: "Mostrar Ic Menu") */
  showMenuIcon?: boolean
  /**
   * Drawer del menú desplegado (Figma Header Mobile: Estado
   * Abierto/Cerrado). Abierto cambia la hamburguesa por la X y, en
   * mobile, despliega el Menu del DS bajo el header (controlado).
   */
  menuOpen?: boolean
  defaultMenuOpen?: boolean
  onMenuOpenChange?: (open: boolean) => void
  /**
   * Items extra del menú lateral en el drawer mobile (vacío por
   * default: el drawer muestra la barra de usuario y Mis productos)
   */
  menuItems?: Array<string | MenuItem>
  /** Índice activo del menú lateral */
  defaultActiveMenuItem?: number
  onMenuItemSelect?: (index: number, item: MenuItem) => void
  /**
   * Despliega el Menu del DS al abrir la hamburguesa en mobile
   * (false = lo maneja el consumidor con `onMenuClick`)
   */
  showDrawer?: boolean
  /** Items del Menu usuario (default los 5 del componente de Figma) */
  userMenuItems?: Array<string | HeaderUserMenuItem>
  /** Menú de usuario desplegado (controlado) */
  userMenuOpen?: boolean
  defaultUserMenuOpen?: boolean
  onUserMenuOpenChange?: (open: boolean) => void
  onUserMenuSelect?: (index: number, item: HeaderUserMenuItem) => void
  /**
   * Items del dropdown de Mis productos (Figma: Boton-MisProductos
   * Estado=Abierto; default los 7 del set). Vacío = sin dropdown.
   */
  productsItems?: Array<string | HeaderUserMenuItem>
  /** Dropdown de Mis productos desplegado (controlado) */
  productsOpen?: boolean
  defaultProductsOpen?: boolean
  onProductsOpenChange?: (open: boolean) => void
  onProductsSelect?: (index: number, item: HeaderUserMenuItem) => void
  onHelpClick?: () => void
  onClockClick?: () => void
  onNotificationsClick?: () => void
  onSettingsClick?: () => void
  onProductsClick?: () => void
  onMenuClick?: () => void
  onLogoClick?: () => void
}

/** Items del "Menu usuario" de Figma (806:171890) */
const DEFAULT_USER_MENU: HeaderUserMenuItem[] = [
  { label: 'Mi perfil', icon: 'account-outline' },
  { label: 'Preguntas frecuentes', icon: 'question-line' },
  { label: 'Configuración', icon: 'settings-outline' },
  { label: 'Notificaciones', icon: 'bell-outline' },
  { label: 'Cerrar sesión', icon: 'Salir' },
]

/** Items del "Boton-MisProductos" Estado=Abierto de Figma (5637:7861) */
const DEFAULT_PRODUCTS: HeaderUserMenuItem[] = [
  { label: 'Mis productos 1' },
  { label: 'Mis productos 2' },
  { label: 'Mis productos 3' },
  { label: 'Mis productos 4' },
  { label: 'Mis productos 5' },
  { label: 'Mis productos 6' },
  { label: 'Mis productos 7' },
]

/** Logo del DS y su alto (desktop) por marca */
const LOGO: Record<HeaderVariant, { variant: 'invex' | 'invex-renacer' | 'invex-fiduciario'; height: number }> = {
  invex: { variant: 'invex', height: 44 },
  renacer: { variant: 'invex-renacer', height: 34 },
  fiduciario: { variant: 'invex-fiduciario', height: 34 },
}

const toItems = (items: Array<string | HeaderUserMenuItem>): HeaderUserMenuItem[] =>
  items.map((i) => (typeof i === 'string' ? { label: i } : i))

/**
 * Header — barra superior del DS Andromeda (Figma: página Header —
 * sets "Header Desktop-Tablet" y "Header Mobile" y componente "Menu
 * usuario"). **Un solo componente responsivo**: en ≥768px es la barra
 * de 80px con logo, iconos de 48px, usuario con iniciales, el
 * ButtonMisProductos del DS e icono de menú; en <768px toma el diseño
 * mobile (60px con logo reducido, campana con badge y hamburguesa).
 * El menú de usuario reutiliza los items del componente Menu.
 */
export function Header({
  variant = 'invex',
  userName = 'Cristina Martínez',
  initials = 'CM',
  lastAccess = 'Último acceso: 10/02/2025 10:25 a.m.',
  adminLabel = 'ADMIN',
  showHelp = true,
  showClock = true,
  showNotifications = true,
  showSettings = true,
  showUserDate = true,
  showAdmin = true,
  showInitials = true,
  showProductsButton = true,
  showMenuIcon = true,
  menuOpen,
  defaultMenuOpen = false,
  onMenuOpenChange,
  menuItems = [],
  defaultActiveMenuItem = 0,
  onMenuItemSelect,
  showDrawer = true,
  userMenuItems,
  userMenuOpen,
  defaultUserMenuOpen = false,
  onUserMenuOpenChange,
  onUserMenuSelect,
  productsItems,
  productsOpen,
  defaultProductsOpen = false,
  onProductsOpenChange,
  onProductsSelect,
  onHelpClick,
  onClockClick,
  onNotificationsClick,
  onSettingsClick,
  onProductsClick,
  onMenuClick,
  onLogoClick,
  className = '',
  ...rest
}: HeaderProps) {
  const [innerOpen, setInnerOpen] = useState(defaultUserMenuOpen)
  const [innerProductsOpen, setInnerProductsOpen] = useState(defaultProductsOpen)
  const [innerMenuOpen, setInnerMenuOpen] = useState(defaultMenuOpen)
  const isUserMenuOpen = userMenuOpen !== undefined ? userMenuOpen : innerOpen
  const isProductsOpen =
    productsOpen !== undefined ? productsOpen : innerProductsOpen
  const isMenuOpen = menuOpen !== undefined ? menuOpen : innerMenuOpen
  const items = toItems(userMenuItems ?? DEFAULT_USER_MENU)
  const products = toItems(productsItems ?? DEFAULT_PRODUCTS)
  const logo = LOGO[variant]

  const setMenuOpen = (next: boolean) => {
    if (menuOpen === undefined) setInnerMenuOpen(next)
    onMenuOpenChange?.(next)
  }

  const setUserMenuOpen = (next: boolean) => {
    if (userMenuOpen === undefined) setInnerOpen(next)
    onUserMenuOpenChange?.(next)
    // Solo un dropdown abierto a la vez
    if (next && isProductsOpen) setProductsOpen(false)
  }

  const setProductsOpen = (next: boolean) => {
    if (productsOpen === undefined) setInnerProductsOpen(next)
    onProductsOpenChange?.(next)
    if (next && isUserMenuOpen) setUserMenuOpen(false)
  }

  const iconButton = (
    key: string,
    icon: AndIconName,
    label: string,
    onClick?: () => void,
  ) => (
    <button
      type="button"
      className={`and-header__icon-btn and-header__icon-btn--${key}`}
      aria-label={label}
      onClick={onClick}
    >
      <Icon name={icon} size={24} />
    </button>
  )

  return (
    <header
      className={[
        'and-header',
        variant !== 'invex' && `and-header--${variant}`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      <div className="and-header__logo" onClick={onLogoClick}>
        <Logo variant={logo.variant} height={logo.height} title="INVEX" />
      </div>

      <div className="and-header__right">
        <div className="and-header__icons">
          {showHelp && iconButton('help', 'question-line', 'Ayuda', onHelpClick)}
          {showClock && iconButton('clock', 'clock-outline', 'Historial', onClockClick)}
          {showNotifications && (
            <button
              type="button"
              className="and-header__icon-btn and-header__icon-btn--bell"
              aria-label="Notificaciones"
              onClick={onNotificationsClick}
            >
              <span className="and-header__only-desktop">
                <Icon name="bell-outline" size={24} />
              </span>
              <span className="and-header__only-mobile">
                <Icon name="bell-badge-outline" size={24} />
              </span>
            </button>
          )}
          {showSettings &&
            iconButton('settings', 'settings-outline', 'Configuración', onSettingsClick)}
        </div>

        {(showUserDate || showInitials) && (
          <div className="and-header__user">
            {showUserDate && (
              <div className="and-header__user-date">
                <div className="and-header__user-row">
                  <span className="and-header__user-name">{userName}</span>
                  {showAdmin && (
                    <span className="and-header__admin">{adminLabel}</span>
                  )}
                </div>
                {lastAccess && (
                  <span className="and-header__last-access">{lastAccess}</span>
                )}
              </div>
            )}
            {showInitials && (
              <button
                type="button"
                className="and-header__initials-btn"
                aria-expanded={isUserMenuOpen}
                aria-label="Menú de usuario"
                onClick={() => setUserMenuOpen(!isUserMenuOpen)}
              >
                <span className="and-header__initials">{initials}</span>
                <Icon
                  name={isUserMenuOpen ? 'chevron-up' : 'chevron-down'}
                  size={24}
                />
              </button>
            )}
            {isUserMenuOpen && (
              <div className="and-header__usermenu" role="menu">
                {items.map((item, i) => (
                  <button
                    key={i}
                    type="button"
                    className="and-menu-mobile__item"
                    role="menuitem"
                    onClick={() => {
                      onUserMenuSelect?.(i, item)
                      setUserMenuOpen(false)
                    }}
                  >
                    {item.icon && <Icon name={item.icon} size={24} />}
                    <span className="and-menu-mobile__item-label">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {showProductsButton && (
          <div
            className={[
              'and-header__products',
              isProductsOpen && 'and-header__products--open',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <ButtonMisProductos
              aria-expanded={isProductsOpen}
              onClick={() => {
                setProductsOpen(!isProductsOpen)
                onProductsClick?.()
              }}
            />
            {isProductsOpen && products.length > 0 && (
              <div className="and-header__productsmenu" role="menu">
                {products.map((item, i) => (
                  <button
                    key={i}
                    type="button"
                    className="and-menu-mobile__item"
                    role="menuitem"
                    onClick={() => {
                      onProductsSelect?.(i, item)
                      setProductsOpen(false)
                    }}
                  >
                    {item.icon && <Icon name={item.icon} size={24} />}
                    <span className="and-menu-mobile__item-label">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {showMenuIcon && (
          <button
            type="button"
            className="and-header__menu"
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMenuOpen}
            onClick={() => {
              setMenuOpen(!isMenuOpen)
              onMenuClick?.()
            }}
          >
            <Icon name={isMenuOpen ? 'close' : 'menu'} size={24} />
          </button>
        )}
      </div>

      {/* Drawer mobile: el Menu del DS (variante usuario) bajo el header */}
      {isMenuOpen && showDrawer && (
        <div className="and-header__drawer">
          <Menu
            variant="usuario"
            items={menuItems}
            defaultActive={defaultActiveMenuItem}
            onChange={onMenuItemSelect}
            open
            onOpenChange={(next) => {
              // El Menu se colapsa al elegir una opción: cierra el drawer
              if (!next) setMenuOpen(false)
            }}
            userName={userName}
            userInitials={initials}
            lastAccess={lastAccess}
            userMenuItems={items}
            productsItems={products}
            showProductsButton={showProductsButton}
            onUserMenuSelect={onUserMenuSelect}
            onProductsSelect={onProductsSelect}
          />
        </div>
      )}
    </header>
  )
}
