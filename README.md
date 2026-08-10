# ⚡ TechMathGuide

**Plateforme éducative moderne** qui explique clairement le lien entre :

- Les **mathématiques** et la technologie / programmation
- L’**anglais technique** (vocabulaire, documentation, interviews)
- L’**apprentissage pratique** de la tech

Thème sombre inspiré de l’**Arc Reactor d’Iron Man** (cyan électrique `#00D4FF`).

---

## Stack technique

| Techno | Usage |
|--------|-------|
| **Next.js 15** (App Router) + TypeScript | Framework |
| **Tailwind CSS v4** + **DaisyUI 5** | UI & thème custom |
| **MDX** (next-mdx-remote) | Leçons riches |
| **KaTeX** + remark-math / rehype-katex | Formules mathématiques |
| **Monaco Editor** | Éditeur de code interactif |
| **Pyodide** (CDN) | Exécution Python dans le navigateur |
| **Supabase** | Auth + Postgres + Storage |
| **Vercel** | Déploiement recommandé |

---

## Fonctionnalités

- Authentification obligatoire (email/password + magic link) via Supabase
- Routes protégées par middleware
- Dashboard utilisateur
- Navigation par domaines (Cyber, IA/ML, Data Science, Robotique, Web, Mobile, DevOps)
- Leçons MDX avec maths, vocabulaire anglais mis en évidence, code et exercices interactifs
- Éditeur Monaco + exécution Python (Pyodide)
- Design sombre + effets glow Arc Reactor
- SEO de base

---

## Démarrage rapide (local)

### 1. Cloner / dézipper le projet

```bash
cd techmathguide
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer Supabase

1. Crée un projet sur [supabase.com](https://supabase.com)
2. Va dans **Project Settings → API**
3. Copie l’**URL** et la clé **anon public**
4. Crée un fichier `.env.local` :

```bash
cp .env.example .env.local
```

Remplis :

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
```

### 4. Configurer l’authentification Supabase

Dans le dashboard Supabase :

1. **Authentication → Providers** : active **Email**
2. (Recommandé) Désactive « Confirm email » pour les tests locaux, ou configure un SMTP
3. **Authentication → URL Configuration** :
   - Site URL : `http://localhost:3000`
   - Redirect URLs : `http://localhost:3000/auth/callback`

### 5. (Optionnel) Tables de progression

Tu peux créer une table simple pour la progression :

```sql
create table public.user_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  domain text not null,
  lesson_slug text not null,
  completed boolean default false,
  completed_at timestamptz,
  unique(user_id, domain, lesson_slug)
);

alter table public.user_progress enable row level security;

create policy "Users can view own progress"
  on public.user_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert own progress"
  on public.user_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own progress"
  on public.user_progress for update
  using (auth.uid() = user_id);
```

### 6. Lancer le serveur de développement

```bash
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

---

## Structure du projet

```
techmathguide/
├── src/
│   ├── app/                    # App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx            # Accueil public
│   │   ├── login/
│   │   ├── dashboard/
│   │   ├── lessons/
│   │   │   ├── page.tsx
│   │   │   └── [domain]/[slug]/
│   │   └── auth/callback/
│   ├── components/             # UI réutilisable
│   ├── content/                # Leçons MDX par domaine
│   │   ├── cybersecurity/
│   │   ├── ai-ml/
│   │   ├── data-science/
│   │   ├── robotics/
│   │   ├── web-dev/
│   │   ├── mobile/
│   │   └── devops/
│   ├── lib/
│   │   ├── supabase/           # Clients + middleware
│   │   ├── domains.ts
│   │   └── lessons.ts
│   └── middleware.ts
├── .env.example
├── package.json
└── README.md
```

---

## Déploiement sur Vercel

1. Pousse le repo sur GitHub / GitLab / Bitbucket
2. Va sur [vercel.com](https://vercel.com) → **New Project** → importe le repo
3. Dans **Environment Variables**, ajoute :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Dans Supabase → Authentication → URL Configuration :
   - Site URL : `https://ton-projet.vercel.app`
   - Redirect URLs : `https://ton-projet.vercel.app/auth/callback`
5. Deploy !

Vercel détecte automatiquement Next.js.

---

## Ajouter une nouvelle leçon

1. Crée un fichier MDX dans `src/content/<domaine>/<slug>.mdx`
2. Ajoute les frontmatter (`title`, `description`, `level`, `duration`)
3. Ajoute l’entrée correspondante dans `src/lib/domains.ts`
4. Utilise les composants MDX : `<Math>`, `<Vocab>`, `<Callout>`, `<CodeEditor>`

Exemple :

```mdx
---
title: Ma nouvelle leçon
description: ...
level: débutant
duration: 15 min
---

# Titre

Formule : $$ E = mc^2 $$

Mot anglais : <Vocab>API Gateway</Vocab>

<CodeEditor initialCode={`print("Hello")`} language="python" />
```

---

## Scripts disponibles

```bash
npm run dev      # Développement
npm run build    # Build de production
npm run start    # Lancer le build
npm run lint     # ESLint
```

---

## Licence

Projet éducatif — libre d’utilisation et de modification pour apprendre.
