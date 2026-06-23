-- Supabase schema for Twofold
-- Run this in: Supabase Dashboard -> SQL Editor -> New query -> Paste -> Run

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Memories table
create table if not exists public.memories (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text default '',
  emoji text default '💝',
  date text default '',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Challenges table
create table if not exists public.challenges (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text default '',
  difficulty text default 'medium',
  completed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Storage bucket for photos (run this in Storage section if not already created)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('photos', 'photos', true);
-- Then add RLS policies for the bucket as needed.
