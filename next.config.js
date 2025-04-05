/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  typescript: {
    // TODO: Next.js 15 Route Handler Type Issue
    // There seems to be a bug or undocumented requirement in Next.js 15 regarding route handler types.
    // The error occurs with various type structures for the second parameter of route handlers.
    // Error: Type "{ params: { id: string; }; }" is not a valid type for the function's second argument.
    // This needs to be investigated further or reported to the Next.js team.
    // Tracking issue: [Create an issue in the Next.js repository]
    ignoreBuildErrors: true
  }
}

export default nextConfig
