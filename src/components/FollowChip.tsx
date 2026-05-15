import { useState } from 'react'

export function FollowChip({ initial = false }: { initial?: boolean }) {
  const [following, setFollowing] = useState(initial)
  return (
    <button
      onClick={e => { e.stopPropagation(); setFollowing(f => !f) }}
      className="shrink-0 px-4 py-[7px] rounded-full border-none font-sans text-xs font-semibold cursor-pointer transition-all"
      style={{
        background: following ? 'transparent' : '#E8315A',
        color: following ? '#f0ece2' : '#fff',
        boxShadow: following ? 'inset 0 0 0 1px var(--border)' : '0 4px 12px -4px #E8315A',
        letterSpacing: 0.2,
      }}
    >
      {following ? '✓ seguindo' : '+ Seguir'}
    </button>
  )
}