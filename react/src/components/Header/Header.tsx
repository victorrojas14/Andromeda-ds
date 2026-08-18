import { useState, type HTMLAttributes } from 'react'
import { ButtonMisProductos } from '../Button'
import { Icon, type AndIconName } from '../Icon'
import { Logo } from '../Logo'
// El menú de usuario reutiliza los items del componente Menu
// (mismo átomo "Item menu mobile" de Figma).
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
   * Estado del menú lateral (Figma Header Mobile: Estado
   * Abierto/Cerrado). Abierto cambia la hamburguesa por la X.
   */
  menuOpen?: boolean
  /** Items del Menu usuario (default los 5 del componente de Figma) */
  userMenuItems?: Array<string | HeaderUserMenuItem>
  /** Menú de usuario desplegado (controlado) */
  userMenuOpen?: boolean
  defaultUserMenuOpen?: boolean
  onUserMenuOpenChange?: (open: boolean) => void
  onUserMenuSelect?: (index: number, item: HeaderUserMenuItem) => void
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
  menuOpen = false,
  userMenuItems,
  userMenuOpen,
  defaultUserMenuOpen = false,
  onUserMenuOpenChange,
  onUserMenuSelect,
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
  const isUserMenuOpen = userMenuOpen !== undefined ? userMenuOpen : innerOpen
  const items = toItems(userMenuItems ?? DEFAULT_USER_MENU)
  const logo = LOGO[variant]

  const setUserMenuOpen = (next: boolean) => {
    if (userMenuOpen === undefined) setInnerOpen(next)
    onUserMenuOpenChange?.(next)
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
          <div className="and-header__products">
            <ButtonMisProductos onClick={onProductsClick} />
          </div>
        )}

        {showMenuIcon && (
          <button
            type="button"
            className="and-header__menu"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            onClick={onMenuClick}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={24} />
          </button>
        )}
      </div>
    </header>
  )
}
