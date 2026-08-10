create table if not exists lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  domain text not null,
  slug text not null,
  completed boolean not null default false,
  quiz_score int,
  quiz_total int,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, domain, slug)
);

alter table lesson_progress enable row level security;

create policy "Users can view their own progress"
  on lesson_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert their own progress"
  on lesson_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own progress"
  on lesson_progress for update
  using (auth.uid() = user_id);

create index if not exists lesson_progress_user_idx on lesson_progress(user_id);