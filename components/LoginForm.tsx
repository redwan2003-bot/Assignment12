'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    // Mock login success
    login({ name: email.split('@')[0], email });
    router.push(callbackUrl);
  };

  return (
    <div className="auth-container">
      <div className="card auth-card">
        <h2 className="heading-lg" style={{ textAlign: 'center', marginBottom: '2rem' }}>Welcome Back</h2>
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="name@example.com"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="••••••"
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Login
          </button>
        </form>
        <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          Don't have an account? <Link href="/register" className="text-highlight">Register</Link>
        </p>
        <div className="divider">OR</div>
        <button className="btn btn-outline" style={{ width: '100%' }} type="button" onClick={() => {
          login({ name: 'Google User', email: 'google@example.com' });
          router.push(callbackUrl);
        }}>
          Sign in with Google
        </button>
      </div>

      <style jsx>{`
        .auth-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 80vh;
          padding: 2rem;
        }
        .auth-card {
          width: 100%;
          max-width: 450px;
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }
        .form-control {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: var(--radius-sm);
          font-size: 1rem;
          transition: border-color 0.2s;
        }
        .form-control:focus {
          outline: none;
          border-color: var(--primary);
        }
        .error-msg {
          background-color: rgba(255, 118, 117, 0.1); // using danger color light
          color: var(--danger);
          padding: 0.75rem;
          border-radius: var(--radius-sm);
          margin-bottom: 1.5rem;
          text-align: center;
        }
        .text-highlight {
          color: var(--primary);
          font-weight: 600;
        }
        .divider {
          text-align: center;
          margin: 1.5rem 0;
          color: var(--gray);
          position: relative;
        }
        .divider::before, .divider::after {
          content: '';
          position: absolute;
          top: 50%;
          width: 40%;
          height: 1px;
          background-color: #eee;
          z-index: 1;
        }
        .divider::before { left: 0; }
        .divider::after { right: 0; }
      `}</style>
    </div>
  );
}
