import { useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate, Outlet } from 'react-router'
import { supabase } from './lib/supabase'
import { TabBar } from './components/TabBar'
import OnboardingPage from './features/auth/OnboardingPage'
import AuthPage from './features/auth/AuthPage'
import HomePage from './features/home/HomePage'
import StoryDetailPage from './features/story/StoryDetailPage'
import ProfilePage from './features/profile/ProfilePage'

// Shell com TabBar — envolve as abas principais
function AppShell() {
  return (
    <div className="relative w-full h-full">
      <Outlet />
      <TabBar />
    </div>
  )
}

// Placeholder para abas ainda não implementadas
function EmptyTab({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-bg gap-3">
      <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent">✦ em breve</div>
      <div className="font-serif font-bold text-xl text-text">{label}</div>
    </div>
  )
}

export default function App() {
  const navigate = useNavigate()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN'  && session) navigate('/app/home', { replace: true })
      if (event === 'SIGNED_OUT')             navigate('/',         { replace: true })
    })
    return () => subscription.unsubscribe()
  }, [navigate])

  return (
    <div className="w-screen h-dvh relative bg-bg text-text font-sans overflow-hidden">
      <Routes>
        {/* Pré-login */}
        <Route path="/"       element={<OnboardingPage onEntrar={() => navigate('/entrar')} onVisitante={() => navigate('/app/home')} />} />
        <Route path="/entrar" element={<AuthPage onBack={() => navigate('/')} />} />

        {/* App — shell com TabBar */}
        <Route path="/app" element={<AppShell />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home"       element={<HomePage />} />
          <Route path="explorar"   element={<EmptyTab label="Explorar" />} />
          <Route path="biblioteca" element={<EmptyTab label="Biblioteca" />} />
          <Route path="criar"      element={<EmptyTab label="Criar História" />} />
          <Route path="perfil"     element={<ProfilePage />} />
        </Route>

        {/* Telas full-screen sem TabBar */}
        <Route path="/app/historia/:id" element={<StoryDetailPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}