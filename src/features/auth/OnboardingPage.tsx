import { FGlow, FButton } from '../../components/ui'

type Props = {
  onEntrar: () => void
  onVisitante: () => void
}

export default function OnboardingPage({ onEntrar, onVisitante }: Props) {
  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden bg-bg">
      <FGlow />

      {/* Hero */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-7 text-center z-1">
        <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-accent mb-[18px]">
          ✦ Roleplay interativo
        </div>

        <h1
          className="font-serif font-black leading-[0.95] m-0"
          style={{
            fontSize: 86,
            letterSpacing: -2,
            background: 'linear-gradient(135deg, #E8315A 0%, #f07090 50%, #ff9eb0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Fanme
        </h1>

        <div className="font-sans text-xs tracking-[0.22em] uppercase text-(--text-muted) mt-[14px]">
          Histórias interativas
        </div>

        <p className="mt-7 font-sans text-[15px] leading-[1.7] text-text opacity-[0.78] max-w-xs font-light">
          Você não lê a história —{' '}
          <em className="not-italic text-accent-soft">você está dentro dela</em>.
          Cada escolha muda tudo.
        </p>

        <div className="flex gap-2 flex-wrap justify-center mt-8 max-w-xs">
          {['IA Generativa', 'Escolhas reais', 'Em português'].map(x => (
            <div
              key={x}
              className="px-[14px] py-[7px] rounded-full bg-surface border border-(--border) font-sans text-[11.5px] text-(--text-muted)"
            >
              ✦ {x}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 pb-9 flex flex-col gap-3 relative z-1">
        <FButton kind="primary" onClick={onEntrar}>Entrar no Fanme</FButton>
        <FButton kind="secondary" onClick={onVisitante}>Continuar como visitante</FButton>
        <div className="text-center font-sans text-xs text-(--text-faint) mt-1">
          Já tem conta?{' '}
          <span onClick={onEntrar} className="text-text cursor-pointer">
            Entrar
          </span>
        </div>
      </div>
    </div>
  )
}