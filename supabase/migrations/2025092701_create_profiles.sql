create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  headline text not null,
  bio text not null,
  industry text not null,
  stage text not null,
  location text not null,
  avatar_url text,
  is_onboarded boolean not null default false,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create unique index if not exists profiles_id_idx on public.profiles (id);

create trigger handle_profiles_updated_at
  before update on public.profiles
  for each row
  execute procedure public.set_current_timestamp_updated_at();

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles
  for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles
  for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles
  for insert
  with check (auth.uid() = id);
