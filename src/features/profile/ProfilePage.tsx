import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { ArrowLeft, SlidersHorizontal } from 'lucide-react'
import { FGlow, FLabel, FButton } from '../../components/ui'
import { FollowChip } from '../../components/FollowChip'
import { STORIES, AUTHORS, ME } from '../../data/mock'
import type { Author } from '../../data/mock'
import { supabase } from '../../lib/supabase'

type Props = { user?: Author; isMe?: boolean }

export default function ProfilePage({ user, isMe = true }: Props) {
  const navigate = useNavigate()
  const u = user ?? ME
  const myStories = STORIES.slice(0, 3)
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (isMe) supabase.auth.getSession().then(({ data }) => setEmail(data.session?.user.email ?? ''))
  }, [isMe])

  function fmt(n: number) { return n >= 1000 ? (n / 1000).toFixed(n >= 10000 ? 0 : 1) + 'k' : String(n) }
  function share() {
    const url = `fanme.app/${u.handle.replace('@', '')}`
    navigator.clipboard?.writeText(url)
    alert(`Perfil copiado ✦ ${url}`)
  }

  return (
    <div className="relative w-full h-full overflow-y-auto bg-bg">
      <FGlow />
      <div className="px-5 pt-5 pb-24 relative z-1">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2.5">
            {!isMe && (
              <button onClick={() => navigate(-1)}
                className="w-9 h-9 rounded-full bg-surface border border-(--border) text-text flex items-center justify-center cursor-pointer">
                <ArrowLeft size={16} />
              </button>
            )}
            <FLabel>{isMe ? 'Perfil' : 'Autor'}</FLabel>
          </div>
          <div className="flex gap-1">
            <button onClick={share}
              className="bg-transparent border-none text-(--text-muted) cursor-pointer px-2 py-2 font-mono text-[11px] tracking-[0.15em] uppercase">
              ↗ compartilhar
            </button>
            {isMe && (
              <button className="bg-transparent border-none text-(--text-muted) cursor-pointer p-2">
                <SlidersHorizontal size={16} color="var(--text-muted)" />
              </button>
            )}
          </div>
        </div>

        {/* Avatar + info */}
        <div className="flex flex-col items-center text-center mb-5">
          <div className="w-[88px] h-[88px] rounded-full flex items-center justify-center text-white font-serif font-bold text-[36px]"
            style={{ background: `linear-gradient(135deg, ${u.color}, #f07090)`, boxShadow: `0 16px 40px -12px ${u.color}` }}>
            {u.name[0]}
          </div>
          <div className="flex items-center gap-1.5 font-serif text-[22px] font-bold text-text mt-3.5">
            {isMe && email ? email.split('@')[0] : u.name}
            {u.verified && <span className="text-accent text-base">✦</span>}
          </div>
          <div className="font-mono text-[11px] text-accent mt-0.5 tracking-[0.3px]">{u.handle}</div>
          <div className="font-sans text-[13px] text-(--text-muted) mt-3 leading-[1.6] font-light max-w-[280px]">
            {u.bio || (isMe ? 'Adicione uma bio ao seu perfil.' : '')}
          </div>
          {!isMe && <FollowChip />}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {[
            { n: fmt(u.followers), l: 'seguidores' },
            { n: fmt(u.following), l: 'seguindo' },
            { n: String(u.stories), l: 'histórias' },
          ].map(s => (
            <div key={s.l} className="px-2 py-3.5 rounded-xl bg-surface border border-(--border) text-center">
              <div className="font-serif font-bold text-[22px] text-text">{s.n}</div>
              <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-(--text-muted) mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>

        {/* Fanme Plus banner */}
        {isMe && (
          <div className="relative px-5 py-5 rounded-2xl border mb-6 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(232,49,90,0.13), rgba(240,112,144,0.07))', borderColor: 'rgba(232,49,90,0.25)' }}>
            <div className="flex justify-between items-start gap-4">
              <div>
                <div className="font-mono text-[9.5px] tracking-[0.25em] text-accent-soft uppercase">★ Fanme Plus</div>
                <div className="font-serif font-bold text-[18px] text-text mt-1.5">Sessões ilimitadas, sem espera.</div>
                <div className="font-sans text-xs text-(--text-muted) mt-1.5 leading-[1.6]">R$ 12,90/mês · 7 dias grátis</div>
              </div>
              <FButton kind="primary" size="sm" fullWidth={false}>Assinar</FButton>
            </div>
          </div>
        )}

        {/* Histórias */}
        <FLabel className="mb-3">{isMe ? 'Suas histórias publicadas' : 'Histórias publicadas'}</FLabel>
        <div className="flex flex-col gap-2">
          {myStories.map(s => (
            <div key={s.id} className="flex gap-3 p-2.5 rounded-xl bg-surface border border-(--border)">
              <div className="w-14 h-14 rounded-lg shrink-0 flex items-center justify-center font-serif font-bold text-[22px]"
                style={{ background: s.cover, color: 'rgba(255,255,255,0.8)' }}>
                {s.coverEmoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-serif font-bold text-sm text-text">{s.title}</div>
                <div className="font-sans text-[11px] text-(--text-muted) mt-0.5">{s.turns} trocas · {s.lastSeen || 'novo'}</div>
              </div>
            </div>
          ))}
        </div>

        {isMe && (
          <button
            onClick={() => supabase.auth.signOut()}
            className="w-full mt-6 py-3 rounded-xl bg-transparent border border-(--border) text-(--text-muted) font-sans text-[13px] cursor-pointer"
          >
            sair da conta
          </button>
        )}
      </div>
    </div>
  )
}