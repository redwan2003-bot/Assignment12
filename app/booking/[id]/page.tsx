'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { SERVICES, Service } from '@/lib/data';
import Link from 'next/link';
import PaymentModal from '@/components/PaymentModal';

// Use same workaround for params in client component if needed, but usually props are passed differently.
// Using 'any' for speed on params prop.
export default function BookingPage({ params }: any) {
    const { id } = params; // In client components, params might not be async in all versions but keeping it simple
    // In Next 13+ params is prop. In Next 15 it might be a promise.
    // Actually in client components we should use useParams hook if we want to be safe, but let's try reading prop first.
    // If it fails, I'll switch to useParams.

    const [service, setService] = useState<Service | null>(null);
    const [duration, setDuration] = useState(1);
    const [location, setLocation] = useState({
        division: '',
        district: '',
        city: '',
        address: ''
    });
    const [loading, setLoading] = useState(true);

    const { user, loading: authLoading } = useAuth();
    const router = useRouter();

    // Handle params being a Promise in newest Next.js
    const [resolvedId, setResolvedId] = useState<string>('');

    const [showPayment, setShowPayment] = useState(false);

    useEffect(() => {
        // Resolve params if promise
        Promise.resolve(params).then(p => setResolvedId(p.id));
    }, [params]);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push(`/login?callbackUrl=/booking/${resolvedId}`);
        }
    }, [user, authLoading, router, resolvedId]);

    useEffect(() => {
        if (resolvedId) {
            const s = SERVICES.find(s => s.id === resolvedId);
            if (s) {
                setService(s);
            } else {
                // Handle not found
            }
            setLoading(false);
        }
    }, [resolvedId]);

    const totalCost = service ? service.ratePerDay * duration : 0;

    const handleBookingInit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !service) return;
        setShowPayment(true);
    };

    const handlePaymentSuccess = () => {
        if (!user || !service) return;

        const newBooking = {
            id: Date.now().toString(),
            serviceId: service.id,
            serviceName: service.title,
            date: new Date().toISOString(),
            duration,
            location,
            totalCost,
            status: 'Confirmed'
        };

        // Save to local storage
        const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        localStorage.setItem('bookings', JSON.stringify([...existingBookings, newBooking]));

        // Simulate Email Invoice
        console.log(`[Invoice Sent] To: ${user.email}, Amount: ${totalCost}`);
        alert('Booking Confirmed! Email invoice sent.');

        router.push('/my-bookings');
    };

    if (authLoading || loading || !service) {
        return <div className="container" style={{ paddingTop: '4rem', textAlign: 'center' }}>Loading...</div>;
    }

    if (!user) return null; // Will redirect

    return (
        <div className="container" style={{ padding: '4rem 20px' }}>

            {showPayment && (
                <PaymentModal
                    amount={totalCost}
                    onClose={() => setShowPayment(false)}
                    onSuccess={handlePaymentSuccess}
                />
            )}

            <h1 className="heading-lg" style={{ textAlign: 'center', marginBottom: '3rem' }}>Book {service.title}</h1>

            <div className="booking-layout">
                <div className="card form-card">
                    <form onSubmit={handleBookingInit}>
                        <div className="form-section">
                            <h3>1. Select Duration</h3>
                            <div className="form-group">
                                <label>Number of Days</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="30"
                                    value={duration}
                                    onChange={(e) => setDuration(parseInt(e.target.value) || 1)}
                                    className="form-control"
                                />
                            </div>
                        </div>

                        <div className="form-section">
                            <h3>2. Location Details</h3>
                            <div className="grid-2">
                                <div className="form-group">
                                    <label>Division</label>
                                    <select
                                        className="form-control"
                                        value={location.division}
                                        onChange={(e) => setLocation({ ...location, division: e.target.value })}
                                        required
                                    >
                                        <option value="">Select Division</option>
                                        <option value="Dhaka">Dhaka</option>
                                        <option value="Chittagong">Chittagong</option>
                                        <option value="Sylhet">Sylhet</option>
                                        <option value="Khulna">Khulna</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>District</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={location.district}
                                        onChange={(e) => setLocation({ ...location, district: e.target.value })}
                                        required
                                        placeholder="e.g. Dhaka"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Full Address</label>
                                <textarea
                                    className="form-control"
                                    rows={3}
                                    value={location.address}
                                    onChange={(e) => setLocation({ ...location, address: e.target.value })}
                                    required
                                    placeholder="Street, House No, Flat No..."
                                ></textarea>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                            Proceed to Payment
                        </button>
                    </form>
                </div>

                <div className="summary-sidebar">
                    <div className="card summary-card">
                        <h3>Booking Summary</h3>
                        <div className="summary-row">
                            <span>Service Rate</span>
                            <span>৳{service.ratePerDay} / day</span>
                        </div>
                        <div className="summary-row">
                            <span>Duration</span>
                            <span>{duration} Days</span>
                        </div>
                        <hr style={{ margin: '1rem 0', borderColor: '#eee' }} />
                        <div className="summary-row total">
                            <span>Total Cost</span>
                            <span>৳{totalCost}</span>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .booking-layout {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
        }
        @media (max-width: 768px) {
          .booking-layout {
            grid-template-columns: 1fr;
          }
        }
        .form-section {
          margin-bottom: 2rem;
        }
        .form-section h3 {
          margin-bottom: 1rem;
          color: var(--primary);
        }
        .form-group {
          margin-bottom: 1rem;
        }
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }
        .form-control {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid #ddd;
          border-radius: var(--radius-sm);
          font-family: inherit;
        }
        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.8rem;
          color: var(--gray);
        }
        .summary-row.total {
          color: var(--dark);
          font-weight: 800;
          font-size: 1.25rem;
        }
      `}</style>
        </div>
    );
}
