'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        nid: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const { login } = useAuth();
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validatePassword = (pwd: string) => {
        return pwd.length >= 6 && /[A-Z]/.test(pwd) && /[a-z]/.test(pwd);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords don't match");
            return;
        }
        if (!validatePassword(formData.password)) {
            setError("Password must be 6+ chars with 1 uppercase and 1 lowercase letter.");
            return;
        }
        // Mock registration success
        login({ name: formData.name, email: formData.email });
        router.push('/');
    };

    return (
        <div className="auth-container">
            <div className="card auth-card">
                <h2 className="heading-lg" style={{ textAlign: 'center', marginBottom: '2rem' }}>Create Account</h2>
                {error && <div className="error-msg">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input name="name" type="text" onChange={handleChange} className="form-control" required />
                    </div>
                    <div className="form-group">
                        <label>NID Number</label>
                        <input name="nid" type="text" onChange={handleChange} className="form-control" required />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input name="email" type="email" onChange={handleChange} className="form-control" required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input name="password" type="password" onChange={handleChange} className="form-control" required placeholder="6+ chars, 1 Upper, 1 Lower" />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input name="confirmPassword" type="password" onChange={handleChange} className="form-control" required />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        Register
                    </button>
                </form>
                <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                    Already have an account? <Link href="/login" className="text-highlight">Login</Link>
                </p>
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
          max-width: 500px;
        }
        .form-group {
          margin-bottom: 1.2rem;
        }
        .form-group label {
          display: block;
          margin-bottom: 0.4rem;
          font-weight: 500;
          font-size: 0.9rem;
        }
        .form-control {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: var(--radius-sm);
          font-size: 1rem;
        }
        .form-control:focus {
           outline: none;
           border-color: var(--primary);
        }
        .error-msg {
           background-color: rgba(255, 118, 117, 0.1);
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
      `}</style>
        </div>
    );
}
