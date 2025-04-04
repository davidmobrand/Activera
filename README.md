# ACTivera

A web application for managing and tracking exercises.

## Environment Variables

The following environment variables need to be set:

- `NEXT_PUBLIC_STORAGE_URL`: URL for media storage (matches deployment URL)
- `NEXTAUTH_URL`: Authentication URL (matches deployment URL)
- `NEXTAUTH_SECRET`: Secret key for NextAuth
- `DATABASE_URL`: URL for the database connection
- `NEXT_PUBLIC_TINYMCE_API_KEY`: API key for TinyMCE editor

For local development, copy `.env.example` to `.env.local` and update the values.

## Development

```bash
npm install
npm run dev
```

## Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
  ├── lib/                    # Library code
  │   ├── types.ts           # TypeScript type definitions
  │   ├── validation.ts      # Zod validation schemas
  │   ├── errors.ts          # Error handling utilities
  │   ├── sanitization.ts    # Input sanitization utilities
  │   └── mockData/          # Mock database and data
  │       ├── index.ts       # Exports all mock data
  │       ├── users.ts       # User mock data and functions
  │       ├── exercises.ts   # Exercise mock data and functions
  │       ├── media.ts       # Media mock data and functions
  │       └── exerciseProgress.ts  # Progress mock data and functions
  └── app/                   # Next.js app directory
```

## Features

- User authentication and authorization
- Exercise management with categories
- Media attachments (images and audio)
- Progress tracking
- Admin dashboard
- Client exercise view

## Type Safety

The project uses:
- TypeScript for static typing
- Zod for runtime validation
- Custom error handling
- Input sanitization

## Data Models

### User
- Authentication and profile data
- Role-based access control (Admin/Client)

### Exercise
- Title and content
- Category (Oppenhet/Narvaro/Engagemang)
- Associated media files
- Order within category

### Media
- Images and audio files
- Associated with exercises
- File metadata

### Exercise Progress
- User completion status
- Notes and timestamps
- Progress tracking

## Security

- Input validation and sanitization
- XSS prevention
- CSRF protection
- Secure authentication
- Role-based authorization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT
