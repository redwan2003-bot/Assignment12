'use client';
import Link from 'next/link';
import { SERVICES, TESTIMONIALS } from '@/lib/data';

export default function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <h1 className="hero-title">Trusted Care for Your <span className="highlight">Loved Ones</span></h1>
          <p className="hero-subtitle">
            Reliable baby sitting, elderly care, and patient assistance at your doorstep.
            Because family matters most.
          </p>
          <div className="hero-cta">
            <Link href="#services" className="btn btn-primary">Find a Caretaker</Link>
            <Link href="/about" className="btn btn-outline" style={{ marginLeft: '1rem' }}>Learn More</Link>
          </div>
        </div>
        <div className="hero-overlay"></div>
      </section>

      {/* About Section */}
      <section className="section about-section">
        <div className="container">
          <div className="section-header">
            <h2 className="heading-lg">Why Choose Us?</h2>
            <p>Our mission is to make caregiving easy, secure, and accessible.</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="icon">🛡️</div>
              <h3>Secure & Trusted</h3>
              <p>Every caregiver is vetted and verified for safety.</p>
            </div>
            <div className="feature-card">
              <div className="icon">⚡</div>
              <h3>Fast Booking</h3>
              <p>Book a service in minutes with our simple platform.</p>
            </div>
            <div className="feature-card">
              <div className="icon">💖</div>
              <h3>Compassionate Care</h3>
              <p>We treat your family like our own.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section services-section">
        <div className="container">
          <div className="section-header">
            <h2 className="heading-lg">Our Services</h2>
            <p>Choose the right care for your needs.</p>
          </div>
          <div className="services-grid">
            {SERVICES.map(service => (
              <div key={service.id} className="card service-card">
                <div className="card-image" style={{ backgroundImage: `url(${service.image})` }}></div>
                <div className="card-body">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <Link href={`/services/${service.id}`} className="btn btn-primary btn-sm" style={{ marginTop: '1rem', width: '100%' }}>
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="heading-lg">What People Say</h2>
          </div>
          <div className="testimonials-grid">
            {TESTIMONIALS.map(t => (
              <div key={t.id} className="card testimonial-card">
                <p>"{t.text}"</p>
                <div className="user-info">
                  <img src={t.avatar} alt={t.name} className="avatar" />
                  <div>
                    <h4>{t.name}</h4>
                    <small>{t.role}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .section {
          padding: 5rem 0;
        }
        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .highlight {
          color: var(--primary);
        }

        /* Hero */
        .hero {
          position: relative;
          height: 90vh;
          display: flex;
          align-items: center;
          background: url('https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?auto=format&fit=crop&q=80&w=1600') center/cover no-repeat;
          color: white;
          margin-top: -80px; /* Offset navbar */
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.5);
          z-index: 1;
        }
        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 700px;
        }
        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          line-height: 1.1;
        }
        .hero-subtitle {
          font-size: 1.25rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        /* Features */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }
        .feature-card {
          text-align: center;
          padding: 2rem;
        }
        .icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        /* Services */
        .services-section {
          background-color: #f0f4f8;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        .service-card {
          padding: 0;
          overflow: hidden;
        }
        .card-image {
          height: 200px;
          background-size: cover;
          background-position: center;
        }
        .card-body {
          padding: 1.5rem;
        }

        /* Testimonials */
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        .testimonial-card {
           display: flex;
           flex-direction: column;
           justify-content: space-between;
        }
        .user-info {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 1.5rem;
        }
        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
}
