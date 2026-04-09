# Code Crafters Creators

Official codebase for codecrafterscreators.com.

Code Crafters Creators is a web development and digital marketing company platform built with Next.js, Prisma, and Tailwind CSS.

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

1. Create environment file:

```bash
cp .env.example .env.local
```

1. Run development server:

```bash
npm run dev
```

1. Generate Prisma client (if needed):

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
