'use client';

import Link from 'next/link';
import { Service } from '@/lib/data';

interface ServiceDetailsClientProps {
    service: Service;
}

export default function ServiceDetailsClient({ service }: ServiceDetailsClientProps) {
    return (
        <div className="service-details-page">
            <div className="service-hero" style={{ backgroundImage: `url(${service.image})` }}>
                <div className="overlay"></div>
                <div className="container hero-content">
                    <h1 className="heading-xl" style={{ color: 'white' }}>{service.title}</h1>
                </div>
            </div>

            <div className="container content-wrapper">
                <div className="main-content">
                    <section className="section">
                        <h2 className="heading-lg">Description</h2>
                        <p className="description-text">{service.fullDescription}</p>
                    </section>

                    <section className="section">
                        <h2 className="heading-lg">Features</h2>
                        <ul className="features-list">
                            {service.features.map((feature, index) => (
                                <li key={index} className="feature-item">
                                    <span className="check-icon">✓</span> {feature}
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                <div className="sidebar">
                    <div className="card booking-card">
                        <h3>Booking Summary</h3>
                        <div className="price-tag">
                            <span className="amount">৳{service.ratePerDay}</span>
                            <span className="period">/ day</span>
                        </div>
                        <p className="note">Includes service charge and basic insurance.</p>
                        <Link href={`/booking/${service.id}`} className="btn btn-primary" style={{ width: '100%' }}>
                            Book Now
                        </Link>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .service-hero {
          height: 400px;
          background-size: cover;
          background-position: center;
          position: relative;
          display: flex;
          align-items: center;
          margin-top: -80px;
          padding-top: 80px;
        }
        .overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.6);
        }
        .hero-content {
          position: relative;
          z-index: 1;
        }
        .content-wrapper {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 3rem;
          padding: 4rem 20px;
        }
        @media (max-width: 768px) {
          .content-wrapper {
            grid-template-columns: 1fr;
          }
        }
        .section {
          margin-bottom: 3rem;
        }
        .description-text {
          font-size: 1.1rem;
          color: var(--gray);
          line-height: 1.8;
        }
        .features-list {
          list-style: none;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }
        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 500;
        }
        .check-icon {
          color: var(--success);
          font-weight: bold;
        }
        .sidebar {
          position: sticky;
          top: 100px;
          height: fit-content;
        }
        .booking-card {
           text-align: center;
        }
        .price-tag {
          margin: 1.5rem 0;
          color: var(--primary);
        }
        .amount {
          font-size: 2.5rem;
          font-weight: 800;
        }
        .period {
          font-size: 1rem;
          color: var(--gray);
        }
        .note {
          font-size: 0.9rem;
          color: var(--gray);
          margin-bottom: 2rem;
        }
      `}</style>
        </div>
    );
}
