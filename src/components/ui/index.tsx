import { useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'

// ─── FGlow ───────────────────────────────────────────────
export function FGlow() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-0"
      style={{ background: 'var(--glow)' }}
    />
  )
}

// ─── FButton ─────────────────────────────────────────────
type FButtonKind = 'primary' | 'secondary' | 'ghost' | 'accent'

type FButtonProps = {
  kind?: FButtonKind
  children: ReactNode
  onClick?: () => void
  className?: string
  style?: CSSProperties
  icon?: ReactNode
  fullWidth?: boolean
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

export function FButton({
  kind = 'primary', children, onClick, className = '',
  style, icon, fullWidth = true, size = 'md', disabled,
}: FButtonProps) {
  const [hov, setHov] = useState(false)

  const sizes = { sm: 'h-[38px] text-[13px]', md: 'h-12 text-[15px]', lg: 'h-[54px] text-[15px]' }

  const kinds: Record<FButtonKind, string> = {
    primary:   'bg-accent text-white',
    secondary: 'bg-transparent text-text border border-(--border-strong)',
    ghost:     'bg-surface text-text',
    accent:    'bg-(--accent-tint) text-accent-soft border border-(--accent-tint)',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={[
        'flex items-center justify-center gap-2 rounded-full border-none font-sans font-medium',
        'cursor-pointer transition-all duration-150 px-[22px] tracking-[0.1px]',
        fullWidth ? 'w-full' : '',
        sizes[size],
        kinds[kind],
        disabled ? 'opacity-50 cursor-not-allowed' : '',
        hov && !disabled ? 'scale-[0.98]' : 'scale-100',
        className,
      ].join(' ')}
      style={{
        ...(kind === 'primary' ? { boxShadow: '0 8px 24px -8px #E8315A' } : {}),
        ...style,
      }}
    >
      {icon}{children}
    </button>
  )
}

// ─── FChip ───────────────────────────────────────────────
export function FChip({ children, selected = false, onClick, className = '', leftIcon = null }: {
  children: ReactNode; selected?: boolean; onClick?: () => void; className?: string; leftIcon?: ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={[
        'inline-flex items-center gap-1.5 px-[14px] py-[7px] rounded-full',
        'font-sans text-xs font-medium cursor-pointer whitespace-nowrap transition-all duration-200 border',
        selected
          ? 'bg-accent text-white border-accent'
          : 'bg-surface text-(--text-muted) border-(--border)',
        className,
      ].join(' ')}
    >
      {leftIcon}{children}
    </button>
  )
}

// ─── FAvatar ─────────────────────────────────────────────
export function FAvatar({ char, size = 32, glow = false }: {
  char: { name?: string; short?: string; color?: string }
  size?: number
  glow?: boolean
}) {
  return (
    <div
      className="rounded-full flex items-center justify-center font-sans font-bold text-white shrink-0 border border-(--border)"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.42,
        background: char.color
          ? `linear-gradient(135deg, ${char.color} 0%, ${char.color}88 100%)`
          : '#1a1a22',
        boxShadow: glow && char.color ? `0 0 18px -4px ${char.color}80` : 'none',
      }}
    >
      {char.short || (char.name || '?')[0]}
    </div>
  )
}

// ─── FCard ───────────────────────────────────────────────
export function FCard({ children, className = '', onClick, hoverable = false }: {
  children: ReactNode; className?: string; onClick?: () => void; hoverable?: boolean
}) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={[
        'bg-surface rounded-2xl transition-all duration-200 border border-(--border)',
        onClick ? 'cursor-pointer' : '',
        className,
      ].join(' ')}
      style={hoverable && hov ? { borderColor: 'rgba(232,49,90,0.4)' } : {}}
    >
      {children}
    </div>
  )
}

// ─── FLabel ──────────────────────────────────────────────
export function FLabel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`font-mono text-[10px] tracking-[0.25em] uppercase text-accent flex items-center gap-3 ${className}`}>
      {children}
    </div>
  )
}