'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SERVICES } from '@/lib/data';

interface Booking {
    id: string;
    serviceName: string;
    date: string;
    duration: number;
    totalCost: number;
    status: string;
    location: any;
}

export default function AdminDashboard() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [revenue, setRevenue] = useState(0);

    useEffect(() => {
        // Load from local storage
        const stored = localStorage.getItem('bookings');
        if (stored) {
            const parsed: Booking[] = JSON.parse(stored);
            setBookings(parsed.reverse());

            const total = parsed
                .filter(b => b.status === 'Confirmed' || b.status === 'Completed')
                .reduce((sum, b) => sum + b.totalCost, 0);
            setRevenue(total);
        }
    }, []);

    return (
        <div className="admin-container">
            <div className="sidebar">
                <h2 className="sidebar-brand">Care Admin</h2>
                <ul className="nav-list">
                    <li className="nav-item active">Dashboard</li>
                    <li className="nav-item">Users (Mock)</li>
                    <li className="nav-item">Settings</li>
                    <li className="nav-item">
                        <Link href="/">Back to Site</Link>
                    </li>
                </ul>
            </div>

            <div className="main-content">
                <header className="header">
                    <h1>Admin Dashboard</h1>
                    <div className="user-profile">Admin User</div>
                </header>

                <div className="stats-grid">
                    <div className="stat-card">
                        <h3>Total Revenue</h3>
                        <p className="stat-value">৳{revenue}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Total Bookings</h3>
                        <p className="stat-value">{bookings.length}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Active Services</h3>
                        <p className="stat-value">{SERVICES.length}</p>
                    </div>
                </div>

                <div className="card table-card">
                    <h3>Recent Bookings</h3>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Service</th>
                                    <th>Date</th>
                                    <th>Duration</th>
                                    <th>Cost</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map(booking => (
                                    <tr key={booking.id}>
                                        <td>{booking.serviceName}</td>
                                        <td>{new Date(booking.date).toLocaleDateString()}</td>
                                        <td>{booking.duration} days</td>
                                        <td>৳{booking.totalCost}</td>
                                        <td>
                                            <span className={`status-badge ${booking.status.toLowerCase()}`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {bookings.length === 0 && (
                                    <tr>
                                        <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>No bookings yet</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .admin-container {
           display: flex;
           min-height: 100vh;
           background-color: #f7f9fc;
           position: fixed; /* Overlay main layout */
           top: 0;
           left: 0;
           right: 0;
           bottom: 0;
           z-index: 5000;
           overflow: auto;
        }
        .sidebar {
           width: 250px;
           background-color: var(--dark);
           color: white;
           padding: 2rem;
        }
        .sidebar-brand {
           margin-bottom: 3rem;
           color: var(--secondary);
        }
        .nav-list {
           list-style: none;
           padding: 0;
        }
        .nav-item {
           padding: 1rem 0;
           border-bottom: 1px solid rgba(255,255,255,0.1);
           cursor: pointer;
           opacity: 0.7;
           transition: opacity 0.2s;
        }
        .nav-item:hover, .nav-item.active {
           opacity: 1;
           font-weight: 500;
        }
        .nav-item a {
            color: inherit;
        }
        
        .main-content {
           flex: 1;
           padding: 2rem;
           overflow-y: auto;
        }
        .header {
           display: flex;
           justify-content: space-between;
           align-items: center;
           margin-bottom: 3rem;
        }
        
        .stats-grid {
           display: grid;
           grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
           gap: 2rem;
           margin-bottom: 3rem;
        }
        .stat-card {
           background: white;
           padding: 1.5rem;
           border-radius: var(--radius-md);
           box-shadow: var(--shadow-sm);
        }
        .stat-value {
           font-size: 2rem;
           font-weight: 800;
           color: var(--primary);
           margin-top: 0.5rem;
        }

        .table-card {
           background: white;
           padding: 2rem;
           border-radius: var(--radius-md);
           box-shadow: var(--shadow-sm);
        }
        .table {
           width: 100%;
           border-collapse: collapse;
           margin-top: 1rem;
        }
        .table th {
           text-align: left;
           padding: 1rem;
           border-bottom: 2px solid #eee;
           color: var(--gray);
        }
        .table td {
           padding: 1rem;
           border-bottom: 1px solid #eee;
        }
        
        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
        }
        .status-badge.pending { background: #ffeaa7; color: #d63031; }
        .status-badge.confirmed { background: #55efc4; color: #00b894; }
        .status-badge.cancelled { background: #ff7675; color: white; }
      `}</style>
        </div>
    );
}
