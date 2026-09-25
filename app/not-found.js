import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-center px-4">
      <h1 className="text-6xl font-bold text-error mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-base-content/70 mb-6">The page you are looking for does not exist.</p>
      <Link href="/" className="btn btn-primary">
        Go Back Home
      </Link>
    </div>
  );
}
