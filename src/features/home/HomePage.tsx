import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Search, Play } from 'lucide-react'
import { FGlow, FLabel, FChip } from '../../components/ui'
import { AuthorBadge } from '../../components/AuthorBadge'
import { STORIES, AUTHORS, FANDOMS, RESUMING } from '../../data/mock'

export default function HomePage() {
  const navigate = useNavigate()
  const [activeFandom, setActiveFandom] = useState('all')

  const continueStories = RESUMING.map(id => STORIES.find(s => s.id === id)).filter(Boolean) as typeof STORIES
  const last = continueStories[0]
  const filtered = activeFandom === 'all' ? STORIES : STORIES.filter(s => s.fandom === activeFandom)

  return (
    <div className="relative w-full h-full overflow-y-auto overflow-x-hidden bg-bg">
      <FGlow />

      {/* Top bar */}
      <div
        className="sticky top-0 px-[18px] pt-2 pb-3 z-10 border-b border-(--border)"
        style={{ background: 'var(--overlay)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
      >
        <div className="flex items-center justify-between mb-3.5">
          <div>
            <div className="font-mono text-[9.5px] tracking-[0.3em] uppercase text-accent">Fanme</div>
            <div className="font-serif font-bold text-[22px] text-text mt-0.5">Boa noite ✦</div>
          </div>
          <div
            onClick={() => navigate('/app/perfil')}
            className="w-[38px] h-[38px] rounded-full flex items-center justify-center text-white font-sans font-bold text-sm cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #E8315A, #f07090)' }}
          >
            V
          </div>
        </div>
        <div
          onClick={() => navigate('/app/explorar')}
          className="flex items-center gap-2.5 px-3.5 py-2.5 bg-surface border border-(--border) rounded-xl text-(--text-muted) font-sans text-[13px] cursor-pointer"
        >
          <Search size={15} color="var(--text-muted)" />
          <span>Buscar histórias, fandoms, personagens…</span>
        </div>
      </div>

      <div className="px-[18px] relative z-1">

        {/* Continuar onde parou */}
        {last && (
          <div className="mt-[18px]">
            <div className="flex justify-between items-baseline mb-2.5">
              <FLabel>Continuar onde parou</FLabel>
              <span className="font-sans text-[11px] text-(--text-faint)">{continueStories.length} ativas</span>
            </div>

            <div
              onClick={() => navigate(`/app/historia/${last.id}?resume=true`)}
              className="relative rounded-[18px] overflow-hidden h-[168px] cursor-pointer border border-(--border)"
              style={{ background: last.cover, boxShadow: '0 12px 32px -16px rgba(0,0,0,0.6)' }}
            >
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.7) 100%)' }} />
              <div className="absolute top-3.5 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[9px] text-white uppercase tracking-[0.15em]"
                style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-accent-soft" style={{ boxShadow: '0 0 8px var(--color-accent-soft)' }} />
                roleplay ativo · {last.lastSeen}
              </div>
              <div className="absolute bottom-4 left-4 right-[76px] text-white">
                <div className="font-serif font-bold text-[22px] leading-[1.1]">{last.title}</div>
                <div className="font-sans text-xs opacity-75 mt-1 font-light italic truncate">"{last.last}"</div>
                <div className="font-mono text-[10px] opacity-70 mt-2 tracking-[0.15em]">{last.turns} TROCAS · {last.fandomLabel.toUpperCase()}</div>
              </div>
              <button
                className="absolute bottom-4 right-4 w-11 h-11 rounded-full flex items-center justify-center border-none cursor-pointer"
                style={{ background: '#E8315A', boxShadow: '0 6px 18px -4px #E8315A' }}
              >
                <Play size={14} color="#fff" fill="#fff" />
              </button>
            </div>

            {continueStories.length > 1 && (
              <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
                {continueStories.slice(1).map(s => (
                  <div
                    key={s.id}
                    onClick={() => navigate(`/app/historia/${s.id}?resume=true`)}
                    className="shrink-0 w-[168px] p-3 rounded-[14px] bg-surface border border-(--border) cursor-pointer"
                  >
                    <div className="h-20 rounded-[10px] mb-2.5 relative" style={{ background: s.cover }}>
                      <div className="absolute bottom-1.5 right-1.5 w-[26px] h-[26px] rounded-full flex items-center justify-center" style={{ background: '#E8315A' }}>
                        <Play size={9} color="#fff" fill="#fff" />
                      </div>
                    </div>
                    <div className="font-serif font-bold text-sm text-text leading-[1.2]">{s.title}</div>
                    <div className="font-sans text-[10.5px] text-(--text-muted) mt-0.5">{s.fandomLabel}</div>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="w-[5px] h-[5px] rounded-full bg-accent" />
                      <span className="font-mono text-[9px] text-(--text-faint) tracking-[0.1em]">{s.lastSeen}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Fandoms */}
        <div className="mt-7">
          <FLabel>Fandoms</FLabel>
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            <FChip selected={activeFandom === 'all'} onClick={() => setActiveFandom('all')}>Tudo</FChip>
            {FANDOMS.map(f => (
              <FChip key={f.id} selected={activeFandom === f.id} onClick={() => setActiveFandom(f.id)}>
                <span className="mr-1">{f.emoji}</span>{f.name}
              </FChip>
            ))}
          </div>
        </div>

        {/* Stories grid */}
        <div className="mt-6 mb-24">
          <FLabel>{activeFandom === 'all' ? 'Histórias quentes hoje' : FANDOMS.find(f => f.id === activeFandom)?.name}</FLabel>
          <div className="grid grid-cols-2 gap-2.5 mt-3.5">
            {filtered.map(s => (
              <div
                key={s.id}
                onClick={() => navigate(`/app/historia/${s.id}`)}
                className="bg-surface border border-(--border) rounded-[14px] overflow-hidden cursor-pointer"
              >
                <div className="h-[130px] relative" style={{ background: s.cover }}>
                  <div className="absolute top-2 left-2 px-2 py-[3px] rounded-full font-mono text-[8.5px] tracking-[0.15em] text-white uppercase"
                    style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }}>
                    {s.rating}
                  </div>
                  <div className="absolute bottom-2 left-2.5 font-serif font-bold text-[36px] leading-none" style={{ color: 'rgba(255,255,255,0.85)' }}>
                    {s.coverEmoji}
                  </div>
                </div>
                <div className="px-3 pt-2.5 pb-3">
                  <div className="font-serif font-bold text-sm text-text leading-[1.2]">{s.title}</div>
                  <div className="font-sans text-[10.5px] text-(--text-muted) mt-0.5">{s.fandomLabel}</div>
                  <div className="mt-2 pt-2 border-t border-(--border)">
                    <AuthorBadge author={AUTHORS[s.authorId]} size={18} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}