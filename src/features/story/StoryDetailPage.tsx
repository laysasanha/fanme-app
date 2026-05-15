import { useState } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router'
import { ArrowLeft, Bookmark, MoreHorizontal, Play } from 'lucide-react'
import { FLabel, FChip, FButton, FAvatar } from '../../components/ui'
import { AuthorBadge } from '../../components/AuthorBadge'
import { FollowChip } from '../../components/FollowChip'
import { STORIES, AUTHORS, TONES } from '../../data/mock'

export default function StoryDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const isResume = searchParams.get('resume') === 'true'

  const story = STORIES.find(s => s.id === id)
  const [tone, setTone] = useState(story?.tone ?? 'tension')
  const toneObj = TONES.find(x => x.id === tone)

  if (!story) return (
    <div className="flex items-center justify-center h-full bg-bg text-(--text-muted) font-sans text-sm">
      História não encontrada.
    </div>
  )

  const author = AUTHORS[story.authorId]

  return (
    <div className="relative w-full h-full overflow-y-auto overflow-x-hidden bg-bg">

      {/* Cover hero */}
      <div className="relative h-[320px]" style={{ background: story.cover }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 30%, #08080c 100%)' }} />

        {/* Nav buttons */}
        <div className="absolute top-4 left-3 right-3 flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="w-[38px] h-[38px] rounded-full flex items-center justify-center border-none cursor-pointer"
            style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)' }}
          >
            <ArrowLeft color="#fff" size={18} />
          </button>
          <div className="flex gap-2">
            {[Bookmark, MoreHorizontal].map((Icon, i) => (
              <button key={i} className="w-[38px] h-[38px] rounded-full flex items-center justify-center border-none cursor-pointer"
                style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)' }}>
                <Icon color="#fff" size={18} />
              </button>
            ))}
          </div>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-6 left-5 right-5 text-white">
          <div className="font-mono text-[10px] tracking-[0.25em] uppercase opacity-75">{story.fandomLabel} · {story.rating}</div>
          <h1 className="font-serif font-black text-[36px] leading-none m-0 mt-2">{story.title}</h1>
          <div className="font-sans text-xs mt-2 opacity-85 font-light italic">
            {isResume ? `retomando · ${story.lastSeen}` : 'roleplay infinito'}
          </div>
        </div>
      </div>

      {/* Author strip */}
      {author && (
        <div
          className="mx-5 -mt-[18px] px-3.5 py-3 flex items-center justify-between gap-2.5 bg-surface border border-(--border) rounded-[14px] relative z-[2] cursor-pointer"
        >
          <AuthorBadge author={author} size={36} />
          <FollowChip />
        </div>
      )}

      <div className="px-5 pt-6 pb-32 relative z-1">

        {/* Premise */}
        <p className="font-sans text-sm leading-[1.7] text-text opacity-85 font-light m-0 mb-5">
          {story.premise}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {story.tags.map(tag => (
            <span key={tag} className="px-2.5 py-1 rounded-full font-mono text-[10px] tracking-[0.5px] text-accent-soft"
              style={{ background: 'rgba(232,49,90,0.12)' }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Cast */}
        <FLabel className="mb-3">Elenco</FLabel>
        <div className="flex gap-2.5 overflow-x-auto pb-1 mb-6" style={{ scrollbarWidth: 'none' }}>
          {story.cast.map(c => (
            <div key={c.id} className="shrink-0 p-3.5 rounded-[14px] bg-surface border border-(--border) w-[130px] text-center">
              <FAvatar char={c} size={48} glow />
              <div className="font-serif font-bold text-[13px] text-text mt-2.5">{c.name}</div>
              {c.voz && <div className="font-sans text-[10px] text-(--text-muted) mt-0.5 italic">"{c.voz}"</div>}
            </div>
          ))}
        </div>

        {/* Tom narrativo */}
        <FLabel className="mb-3">Tom narrativo · preview ao vivo</FLabel>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {TONES.map(x => (
            <FChip key={x.id} selected={tone === x.id} onClick={() => setTone(x.id)}>{x.label}</FChip>
          ))}
        </div>
        <div className="px-4 py-3.5 rounded-[14px] bg-surface border border-(--border) relative">
          <div className="absolute top-0 left-4 right-4 h-[1.5px]" style={{ background: 'linear-gradient(90deg, #E8315A, transparent)' }} />
          <div className="font-mono text-[9.5px] tracking-[0.2em] text-accent uppercase mb-2">{toneObj?.sub}</div>
          <div className="font-serif italic text-sm leading-[1.7] text-text opacity-85 whitespace-pre-wrap">
            "{toneObj?.sample}"
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="absolute bottom-0 left-0 right-0 px-5 pb-6 pt-3.5 z-[5]"
        style={{ background: 'linear-gradient(180deg, transparent, #08080c 30%)' }}>
        <FButton
          kind="primary"
          onClick={() => navigate(`/app/chat/${story.id}`)}
          icon={<Play size={11} color="#fff" fill="#fff" />}
        >
          {isResume ? 'Continuar a história' : 'Entrar na história'}
        </FButton>
      </div>
    </div>
  )
}