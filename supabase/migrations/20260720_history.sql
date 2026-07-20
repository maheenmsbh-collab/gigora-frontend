create table if not exists public.saved_proposals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  job_title text not null,
  proposal text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.profile_analyses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  profile_url text not null,
  overall_score integer,
  analysis jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.chat_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  prompt text not null,
  response text not null,
  created_at timestamptz not null default now()
);

alter table public.saved_proposals enable row level security;
alter table public.profile_analyses enable row level security;
alter table public.chat_history enable row level security;

create policy "Users manage own proposals" on public.saved_proposals for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users manage own analyses" on public.profile_analyses for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users manage own chats" on public.chat_history for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
