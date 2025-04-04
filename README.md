# ACTivera

A web application for ACT (Acceptance and Commitment Therapy) exercises, providing a platform for both clients and administrators to manage and engage with therapeutic content.

## Features

- User Management (Admin/Client roles)
- Exercise Categories:
  - Öppenhet (Openness)
  - Närvaro (Presence)
  - Engagemang (Engagement)
- WYSIWYG Exercise Editor
- REST API for future mobile app integration

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Prisma (Database ORM)
- NextAuth.js (Authentication)
- React Quill (WYSIWYG Editor)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

3. Initialize the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/             # Next.js app router pages
├── components/      # Reusable React components
├── lib/            # Utility functions and configurations
├── types/          # TypeScript type definitions
└── styles/         # Global styles and Tailwind CSS config
```

## API Documentation

The REST API documentation will be available at `/api-docs` when running the development server.

## License

Private - All rights reserved
