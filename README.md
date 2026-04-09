# Code Crafters Creators

![Next.js](https://img.shields.io/badge/Next.js-13-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

Official codebase for codecrafterscreators.com.

Code Crafters Creators is a web development and digital marketing company platform built with Next.js, Prisma, and Tailwind CSS.

This repository includes the public marketing site and authenticated role-based workspaces for admin, client, and employee operations.

## What this project includes

- Marketing website for services, portfolio, and pricing
- Authentication with NextAuth (email + optional social login)
- Role-based app areas:
  - Admin panel
  - Client panel
  - Employee panel
- PostgreSQL + Prisma ORM
- UI built with shadcn/ui + Tailwind CSS

## Tech stack

- Next.js 13 (App Router)
- TypeScript
- Prisma
- NextAuth
- Tailwind CSS
- Radix UI
- Contentlayer (blog/docs content)

## Getting started

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
cp .env.example .env.local
```

3. Run development server:

```bash
npm run dev
```

4. Generate Prisma client (if needed):

```bash
npx prisma generate
```

## Database

The schema in prisma/schema.prisma includes models for:

- Users with roles (ADMIN, CLIENT, EMPLOYEE)
- Client and employee profiles
- Projects, tasks, and assignments
- Invoices and messages

Run migrations after schema changes:

```bash
npx prisma migrate dev --name <change-name>
```

## License

Licensed under the MIT License.
