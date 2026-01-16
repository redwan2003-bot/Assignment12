'use client';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="not-found-container">
      <h1 className="error-code">404</h1>
      <h2 className="heading-lg">Page Not Found</h2>
      <p>The page you are looking for does not exist or has been moved.</p>
      <Link href="/" className="btn btn-primary" style={{ marginTop: '2rem' }}>
        Return Home
      </Link>

      <style jsx>{`
        .not-found-container {
          min-height: 70vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .error-code {
          font-size: 8rem;
          font-weight: 800;
          color: var(--primary);
          line-height: 1;
          opacity: 0.2;
        }
      `}</style>
    </div>
  );
}
