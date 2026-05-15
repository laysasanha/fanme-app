-- Fanme — schema completo
-- Rodar no SQL Editor do Supabase

-- Extensão necessária
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -------------------------------------------------------
-- USUARIOS
-- id vem do auth.users — não gera uuid próprio
-- -------------------------------------------------------
CREATE TABLE public.usuarios (
  id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  handle text NOT NULL UNIQUE,
  nome text,
  email text NOT NULL UNIQUE,
  pronome text,
  bio text,
  foto_url text,
  plano text DEFAULT 'free' CHECK (plano = ANY (ARRAY['free', 'plus'])),
  uso_diario integer DEFAULT 0,
  ultimo_reset timestamp with time zone,
  criado_em timestamp with time zone DEFAULT now(),
  ultimo_acesso timestamp with time zone,
  CONSTRAINT usuarios_pkey PRIMARY KEY (id)
);

-- -------------------------------------------------------
-- HISTORIAS
-- fandom adicionado; tags e regras corrigidos para text[]
-- -------------------------------------------------------
CREATE TABLE public.historias (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  autor_id uuid NOT NULL,
  titulo text NOT NULL,
  premise text,
  fandom text NOT NULL,
  cover_url text,
  tom text CHECK (tom = ANY (ARRAY['atmos', 'dialog', 'tension', 'fluff', 'chat', 'action'])),
  rating text CHECK (rating = ANY (ARRAY['geral', 'teen', 'adult'])),
  tags text[],
  regras text[],
  opening text,
  publicada boolean DEFAULT false,
  criada_em timestamp with time zone DEFAULT now(),
  CONSTRAINT historias_pkey PRIMARY KEY (id),
  CONSTRAINT historias_autor_id_fkey FOREIGN KEY (autor_id) REFERENCES public.usuarios(id)
);

-- -------------------------------------------------------
-- PERSONAGENS
-- -------------------------------------------------------
CREATE TABLE public.personagens (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  historia_id uuid NOT NULL,
  preset_id text,
  nome text NOT NULL,
  short text,
  cor text,
  voz text,
  bio text,
  ordem smallint,
  CONSTRAINT personagens_pkey PRIMARY KEY (id),
  CONSTRAINT personagens_historia_id_fkey FOREIGN KEY (historia_id) REFERENCES public.historias(id)
);

-- -------------------------------------------------------
-- SESSOES_CHAT
-- -------------------------------------------------------
CREATE TABLE public.sessoes_chat (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  usuario_id uuid NOT NULL,
  historia_id uuid NOT NULL,
  historico jsonb DEFAULT '[]'::jsonb,
  contexto jsonb DEFAULT '[]'::jsonb,
  ultimo_turn_index integer DEFAULT 0,
  status text DEFAULT 'ativa' CHECK (status = ANY (ARRAY['ativa', 'pausada', 'finalizada'])),
  ultima_acao timestamp with time zone,
  criada_em timestamp with time zone DEFAULT now(),
  CONSTRAINT sessoes_chat_pkey PRIMARY KEY (id),
  CONSTRAINT sessoes_chat_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id),
  CONSTRAINT sessoes_chat_historia_id_fkey FOREIGN KEY (historia_id) REFERENCES public.historias(id)
);

-- -------------------------------------------------------
-- FAVORITOS
-- -------------------------------------------------------
CREATE TABLE public.favoritos (
  usuario_id uuid NOT NULL,
  historia_id uuid NOT NULL,
  criado_em timestamp with time zone DEFAULT now(),
  CONSTRAINT favoritos_pkey PRIMARY KEY (usuario_id, historia_id),
  CONSTRAINT favoritos_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id),
  CONSTRAINT favoritos_historia_id_fkey FOREIGN KEY (historia_id) REFERENCES public.historias(id)
);

-- -------------------------------------------------------
-- FOLLOWS
-- -------------------------------------------------------
CREATE TABLE public.follows (
  seguidor_id uuid NOT NULL,
  seguindo_id uuid NOT NULL,
  criado_em timestamp with time zone DEFAULT now(),
  CONSTRAINT follows_pkey PRIMARY KEY (seguidor_id, seguindo_id),
  CONSTRAINT follows_seguidor_id_fkey FOREIGN KEY (seguidor_id) REFERENCES public.usuarios(id),
  CONSTRAINT follows_seguindo_id_fkey FOREIGN KEY (seguindo_id) REFERENCES public.usuarios(id)
);

-- -------------------------------------------------------
-- RLS — Row Level Security
-- Sem isso qualquer pessoa lê/escreve qualquer dado
-- -------------------------------------------------------
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.historias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.personagens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessoes_chat ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favoritos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;

-- Usuarios: cada um lê/edita só o próprio perfil
CREATE POLICY "usuario pode ler proprio perfil" ON public.usuarios
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "usuario pode editar proprio perfil" ON public.usuarios
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "usuario pode criar proprio perfil" ON public.usuarios
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Historias: qualquer um lê as públicas; autor gerencia as suas
CREATE POLICY "historias publicas sao visiveis" ON public.historias
  FOR SELECT USING (publicada = true OR autor_id = auth.uid());

CREATE POLICY "autor pode criar historia" ON public.historias
  FOR INSERT WITH CHECK (autor_id = auth.uid());

CREATE POLICY "autor pode editar historia" ON public.historias
  FOR UPDATE USING (autor_id = auth.uid());

CREATE POLICY "autor pode deletar historia" ON public.historias
  FOR DELETE USING (autor_id = auth.uid());

-- Personagens: visíveis junto com a história
CREATE POLICY "personagens visiveis com a historia" ON public.personagens
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.historias h
      WHERE h.id = historia_id AND (h.publicada = true OR h.autor_id = auth.uid())
    )
  );

CREATE POLICY "autor pode gerenciar personagens" ON public.personagens
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.historias h
      WHERE h.id = historia_id AND h.autor_id = auth.uid()
    )
  );

-- Sessoes: cada usuária acessa só as suas
CREATE POLICY "usuario acessa proprias sessoes" ON public.sessoes_chat
  FOR ALL USING (usuario_id = auth.uid());

-- Favoritos: cada usuária gerencia os seus
CREATE POLICY "usuario gerencia proprios favoritos" ON public.favoritos
  FOR ALL USING (usuario_id = auth.uid());

-- Follows: qualquer um lê; cada um gerencia os seus
CREATE POLICY "follows sao publicos" ON public.follows
  FOR SELECT USING (true);

CREATE POLICY "usuario gerencia proprios follows" ON public.follows
  FOR ALL USING (seguidor_id = auth.uid());

-- -------------------------------------------------------
-- TRIGGER — cria perfil automaticamente ao cadastrar
-- -------------------------------------------------------
CREATE OR REPLACE FUNCTION public.criar_perfil_usuario()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.usuarios (id, email, handle)
  VALUES (
    NEW.id,
    NEW.email,
    LOWER(SPLIT_PART(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER ao_cadastrar_usuario
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.criar_perfil_usuario();
