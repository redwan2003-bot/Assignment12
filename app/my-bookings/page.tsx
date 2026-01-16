'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function MyBookingsPage() {
    const [bookings, setBookings] = useState<any[]>([]);
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    useEffect(() => {
        const stored = localStorage.getItem('bookings');
        if (stored) {
            // Filter for logged in user if we were tracking user ID, but mock assumes local storage is personal for now
            // Or we can assume all local bookings are for this browser user.
            setBookings(JSON.parse(stored).reverse());
        }
    }, []);

    const handleCancel = (id: string) => {
        const confirm = window.confirm('Are you sure you want to cancel API this booking?');
        if (confirm) {
            const updated = bookings.map(b => b.id === id ? { ...b, status: 'Cancelled' } : b);
            setBookings(updated);
            localStorage.setItem('bookings', JSON.stringify(updated.reverse())); // Store in original order (newest last -> reverse for display) or just store as is.
            // Actually my reverse above was for display. Let's keep it simple.
            localStorage.setItem('bookings', JSON.stringify(updated));
        }
    };

    if (loading || !user) return null;

    return (
        <div className="container" style={{ padding: '4rem 20px' }}>
            <h1 className="heading-lg" style={{ marginBottom: '2rem' }}>My Bookings</h1>

            {bookings.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '4rem' }}>
                    <p>You haven't booked any services yet.</p>
                    <Link href="/#services" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                        Browse Services
                    </Link>
                </div>
            ) : (
                <div className="bookings-list">
                    {bookings.map((booking) => (
                        <div key={booking.id} className="card booking-item">
                            <div className="booking-header">
                                <div>
                                    <h3>{booking.serviceName}</h3>
                                    <small className="date">Booked on: {new Date(booking.date).toLocaleDateString()}</small>
                                </div>
                                <div className={`status-badge ${booking.status.toLowerCase()}`}>
                                    {booking.status}
                                </div>
                            </div>

                            <div className="booking-details">
                                <div className="detail-row">
                                    <span className="label">Duration:</span>
                                    <span>{booking.duration} Days</span>
                                </div>
                                <div className="detail-row">
                                    <span className="label">Location:</span>
                                    <span>{booking.location.address}, {booking.location.division}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="label">Total Cost:</span>
                                    <span className="cost">৳{booking.totalCost}</span>
                                </div>
                            </div>

                            {booking.status === 'Pending' && (
                                <div className="booking-actions">
                                    <button onClick={() => handleCancel(booking.id)} className="btn btn-outline btn-sm" style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}>
                                        Cancel Booking
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <style jsx>{`
        .bookings-list {
          display: grid;
          gap: 1.5rem;
        }
        .booking-item {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .booking-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 1px solid #eee;
          padding-bottom: 1rem;
        }
        .date {
          color: var(--gray);
        }
        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
        }
        .status-badge.pending { background: #ffeaa7; color: #d63031; }
        .status-badge.confirmed { background: #55efc4; color: #00b894; }
        .status-badge.completed { background: #74b9ff; color: #0984e3; }
        .status-badge.cancelled { background: #ff7675; color: white; }

        .booking-details {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }
        .detail-row {
          display: flex;
          flex-direction: column;
        }
        .label {
          font-size: 0.85rem;
          color: var(--gray);
          margin-bottom: 0.25rem;
        }
        .cost {
          font-weight: bold;
          color: var(--primary);
        }
        .booking-actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 1rem;
        }
      `}</style>
        </div>
    );
}
