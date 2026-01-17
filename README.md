# Diagramatics

A modern, collaborative diagramming and documentation platform built with Next.js 15, Supabase, and Tailwind CSS.

## Features

- **Modern UI/UX**: Dark-themed, glassmorphism-inspired interface with responsive design.
- **Authentication**: secure user authentication via Supabase Auth (Email/Password & Google OAuth).
- **Dashboard**: Centralized hub for managing projects and accessing recent files.
- **Team Management**: Create and manage teams for collaboration.
- **Project Organization**: Organize work into projects with visual card previews.
- **Responsive Design**: Mobile-friendly bottom navigation and adaptive layouts.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend/Auth**: [Supabase](https://supabase.com/)

## Prerequisites

- Node.js 18+ installed
- A Supabase account and project

## Getting Started

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/diagramatics.git
    cd diagramatics
    ```

2. **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3. **Environment Setup:**

    Create a `.env.local` file in the root directory and add your Supabase credentials:

    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4. **Database Setup:**

    Run the following SQL in your Supabase SQL Editor to set up the necessary tables:

    ```sql
    -- Users Table
    create table if not exists users (
      id uuid references auth.users not null primary key,
      email text unique not null,
      name text,
      image text,
      created_at timestamp with time zone default timezone('utc'::text, now()) not null
    );

    -- Teams Table
    create table if not exists teams (
      id uuid default gen_random_uuid() primary key,
      team_name text not null,
      created_by uuid references auth.users not null,
      created_at timestamp with time zone default timezone('utc'::text, now()) not null
    );
    ```

5. **Run the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/`: Next.js App Router pages and layouts.
  - `(routes)/dashboard`: Authenticated dashboard routes.
  - `auth/`: Authentication pages (Login, Signup).
  - `_components/`: Shared UI components.
- `components/ui/`: Reusable shadcn/ui components.
- `lib/`: Utility functions, database helpers, and Supabase client configuration.
- `public/`: Static assets.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1. Push your code to a GitHub repository.
2. Link the repository to Vercel.
3. **Environment Configuration**:
   - In the Vercel Project Settings, verify that the Build Command is `next build`.
   - Go to **Settings > Environment Variables**.
   - Add the following variables (copy values from your supabase project or `.env.local`):
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Redeploy the project to apply changes.
