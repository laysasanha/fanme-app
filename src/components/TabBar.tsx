import { Home, Compass, Plus, Bookmark, User } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router'

const TABS = [
  { to: '/app/home',      Icon: Home,     label: 'Início'     },
  { to: '/app/explorar',  Icon: Compass,  label: 'Explorar'   },
  { to: '__create',       Icon: Plus,     label: 'Criar', special: true },
  { to: '/app/biblioteca',Icon: Bookmark, label: 'Biblioteca' },
  { to: '/app/perfil',    Icon: User,     label: 'Perfil'     },
]

export function TabBar() {
  const navigate = useNavigate()

  return (
    <div
      className="absolute left-0 right-0 bottom-0 flex justify-around items-center px-[14px] pb-3 pt-2 z-10 border-t border-(--border)"
      style={{ background: 'var(--overlay)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
    >
      {TABS.map(({ to, Icon, label, special }) => {
        if (special) {
          return (
            <button
              key={label}
              onClick={() => navigate('/app/criar')}
              className="w-11 h-11 rounded-full flex items-center justify-center border-none cursor-pointer -translate-y-1.5"
              style={{ background: '#E8315A', boxShadow: '0 8px 20px -6px #E8315A' }}
            >
              <Icon color="#fff" size={20} />
            </button>
          )
        }
        return (
          <NavLink key={to} to={to} className="flex flex-col items-center gap-[3px] px-2 py-1 bg-transparent border-none cursor-pointer">
            {({ isActive }) => (
              <>
                <Icon color={isActive ? '#E8315A' : 'var(--text-muted)'} size={20} strokeWidth={isActive ? 2 : 1.5} />
                <span
                  className="font-sans font-medium"
                  style={{ fontSize: 9.5, letterSpacing: 0.3, color: isActive ? '#E8315A' : 'var(--text-muted)' }}
                >
                  {label}
                </span>
              </>
            )}
          </NavLink>
        )
      })}
    </div>
  )
}