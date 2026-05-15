import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { FGlow, FButton } from '../../components/ui'

type Aba = 'login' | 'cadastro'

type Props = { onBack: () => void }

export default function AuthPage({ onBack }: Props) {
  const [aba, setAba] = useState<Aba>('cadastro')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)
  const [mensagem, setMensagem] = useState<string | null>(null)

  function trocarAba(nova: Aba) {
    setAba(nova); setErro(null); setMensagem(null)
  }

  async function handleEmailAuth(e: { preventDefault: () => void }) {
    e.preventDefault()
    setErro(null); setMensagem(null); setCarregando(true)

    if (aba === 'cadastro') {
      const { error } = await supabase.auth.signUp({ email, password: senha })
      if (error) setErro(traduzirErro(error.message))
      else setMensagem('Verifique seu e-mail para confirmar o cadastro.')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password: senha })
      if (error) setErro(traduzirErro(error.message))
    }
    setCarregando(false)
  }

  async function handleGoogle() {
    setErro(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    })
    if (error) setErro(traduzirErro(error.message))
  }

  const inputCls = 'w-full px-4 py-[13px] bg-surface border border-(--border) rounded-xl text-text font-sans text-sm transition-colors'

  return (
    <div className="relative w-full h-full flex flex-col bg-bg overflow-hidden">
      <FGlow />

      {/* Header */}
      <div className="pt-[18px] px-5 relative z-1">
        <button
          onClick={onBack}
          className="bg-transparent border-none text-(--text-muted) font-sans text-[13px] cursor-pointer p-0 flex items-center gap-1.5"
        >
          ← voltar
        </button>
      </div>

      {/* Form */}
      <div className="flex-1 flex flex-col justify-center px-6 relative z-1">
        <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent mb-2.5">
          ✦ Fanme
        </div>

        <h1 className="font-serif font-black text-[32px] text-text m-0 mb-7 leading-[1.1]">
          {aba === 'login' ? 'Bem-vinda de volta' : 'Crie sua conta'}
        </h1>

        {/* Abas */}
        <div className="grid grid-cols-2 bg-surface rounded-xl p-1 gap-1 mb-5 border border-(--border)">
          {(['cadastro', 'login'] as Aba[]).map(a => (
            <button
              key={a}
              onClick={() => trocarAba(a)}
              className={[
                'py-2.5 rounded-[9px] border-none font-sans text-[13px] cursor-pointer transition-all',
                aba === a ? 'bg-bg text-text font-semibold' : 'bg-transparent text-(--text-muted) font-normal',
              ].join(' ')}
            >
              {a === 'cadastro' ? 'criar conta' : 'entrar'}
            </button>
          ))}
        </div>

        <form onSubmit={handleEmailAuth} className="flex flex-col gap-2.5">
          <input
            type="email"
            placeholder="e-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="email"
            className={inputCls}
          />
          <input
            type="password"
            placeholder="senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            required
            autoComplete={aba === 'cadastro' ? 'new-password' : 'current-password'}
            minLength={6}
            className={inputCls}
          />

          {erro    && <p className="text-red-400 font-sans text-[12.5px] m-0">{erro}</p>}
          {mensagem && <p className="text-green-400 font-sans text-[12.5px] m-0">{mensagem}</p>}

          <FButton kind="primary" disabled={carregando} className="mt-1">
            {carregando ? 'aguarde...' : aba === 'login' ? 'entrar' : 'criar conta'}
          </FButton>
        </form>

        {/* Divisor */}
        <div className="flex items-center gap-3 my-5 text-(--text-faint) font-mono text-[10px] tracking-[0.2em]">
          <div className="flex-1 h-px bg-(--border)" />
          ou
          <div className="flex-1 h-px bg-(--border)" />
        </div>

        {/* Google */}
        <button
          onClick={handleGoogle}
          className="w-full py-[13px] bg-surface border border-(--border) rounded-xl text-text font-sans text-sm cursor-pointer flex items-center justify-center gap-2.5 transition-colors hover:border-(--border-strong)"
        >
          <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          continuar com Google
        </button>
      </div>
    </div>
  )
}

function traduzirErro(msg: string): string {
  if (msg.includes('Invalid login credentials')) return 'E-mail ou senha incorretos.'
  if (msg.includes('Email not confirmed'))       return 'Confirme seu e-mail antes de entrar.'
  if (msg.includes('User already registered'))   return 'Este e-mail já está cadastrado.'
  if (msg.includes('Password should be'))        return 'A senha precisa ter pelo menos 6 caracteres.'
  return 'Algo deu errado. Tente novamente.'
}