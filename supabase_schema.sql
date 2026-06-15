-- Enable UUID extension if not already enabled
create extension if not exists "uuid-ossp";

-- 1. PRODUCTS TABLE
create table if not exists public.products (
    id uuid default gen_random_uuid() primary key,
    slug text unique not null,
    name text not null,
    type text not null,
    skin_type text not null,
    time_usage text not null,
    price text not null,
    description text not null,
    info text,
    usage text,
    ingredients text,
    images text[] default '{}'::text[],
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.products enable row level security;

-- Policies for products: Anyone can view, only authenticated admin users can modify
create policy "Allow public read-only access to products"
on public.products for select
using (true);

create policy "Allow auth admin full access to products"
on public.products for all
using (auth.role() = 'authenticated');


-- 2. ORDERS / LEADS TABLE
create table if not exists public.orders (
    id uuid default gen_random_uuid() primary key,
    client_name text not null,
    client_phone text not null,
    note text,
    items jsonb not null default '[]'::jsonb,
    status text default 'pending'::text check (status in ('pending', 'contacted', 'completed', 'cancelled')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.orders enable row level security;

-- Policies for orders: Anyone can submit a lead, only authenticated admins can view/manage
create policy "Allow public insert-only access to orders"
on public.orders for insert
with check (true);

create policy "Allow auth admin full access to orders"
on public.orders for all
using (auth.role() = 'authenticated');


-- 3. INQUIRIES / CONTACTS TABLE
create table if not exists public.inquiries (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    email text not null,
    message text not null,
    status text default 'pending'::text check (status in ('pending', 'resolved')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.inquiries enable row level security;

-- Policies for inquiries: Anyone can send an inquiry, only authenticated admins can view/manage
create policy "Allow public insert-only access to inquiries"
on public.inquiries for insert
with check (true);

create policy "Allow auth admin full access to inquiries"
on public.inquiries for all
using (auth.role() = 'authenticated');


-- 4. JOURNAL / BLOG TABLE
create table if not exists public.journal (
    id uuid default gen_random_uuid() primary key,
    slug text unique not null,
    category text not null,
    title text not null,
    excerpt text not null,
    content text not null,
    image text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.journal enable row level security;

-- Policies for journal: Anyone can read articles, only authenticated admins can manage them
create policy "Allow public read-only access to journal"
on public.journal for select
using (true);

create policy "Allow auth admin full access to journal"
on public.journal for all
using (auth.role() = 'authenticated');
