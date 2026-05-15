import type { Author } from '../data/mock'

type Props = {
  author: Author | undefined
  size?: number
  onClick?: (author: Author) => void
}

export function AuthorBadge({ author, size = 22, onClick }: Props) {
  if (!author) return null
  return (
    <div
      onClick={e => { if (onClick) { e.stopPropagation(); onClick(author) } }}
      className="inline-flex items-center gap-1.5"
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div
        className="rounded-full flex items-center justify-center font-sans font-bold text-white shrink-0"
        style={{ width: size, height: size, fontSize: size * 0.45, background: author.color }}
      >
        {author.name[0]}
      </div>
      <span className="font-sans text-[11px] font-medium text-(--text-muted)">{author.handle}</span>
      {author.verified && <span className="text-accent text-[11px] leading-none">✦</span>}
    </div>
  )
}