'use client';
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>Care.xyz</h3>
            <p>Making caregiving easy, secure, and accessible for everyone.</p>
          </div>
          <div className="footer-links">
            <h4>Services</h4>
            <ul>
              <li>Baby Sitting</li>
              <li>Elderly Care</li>
              <li>Special Care</li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Contact</h4>
            <p>support@care.xyz</p>
            <p>+880 1234 567890</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Care.xyz. All rights reserved.</p>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background-color: var(--white);
          padding: 4rem 0 2rem;
          margin-top: auto;
          border-top: 1px solid #eee;
        }
        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }
        .footer-brand h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: var(--primary);
        }
        .footer-links h4, .footer-contact h4 {
          margin-bottom: 1rem;
          color: var(--dark);
        }
        ul {
          list-style: none;
        }
        li {
          margin-bottom: 0.5rem;
          color: var(--gray);
        }
        p {
          color: var(--gray);
        }
        .footer-bottom {
          text-align: center;
          padding-top: 2rem;
          border-top: 1px solid #f0f0f0;
          color: var(--gray);
          font-size: 0.9rem;
        }
      `}</style>
    </footer>
  );
}
