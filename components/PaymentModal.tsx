'use client';

import { useState } from 'react';

interface PaymentModalProps {
    amount: number;
    onClose: () => void;
    onSuccess: () => void;
}

export default function PaymentModal({ amount, onClose, onSuccess }: PaymentModalProps) {
    const [loading, setLoading] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');

    const handlePay = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API delay
        setTimeout(() => {
            setLoading(false);
            onSuccess();
        }, 2000);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>Secure Payment</h3>
                    <button onClick={onClose} className="close-btn">&times;</button>
                </div>

                <div className="amount-display">
                    <small>Total Amount</small>
                    <h2>৳{amount}</h2>
                </div>

                <form onSubmit={handlePay}>
                    <div className="form-group">
                        <label>Card Number</label>
                        <input
                            type="text"
                            placeholder="0000 0000 0000 0000"
                            value={cardNumber}
                            onChange={e => setCardNumber(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="grid-2">
                        <div className="form-group">
                            <label>Expiry Date</label>
                            <input
                                type="text"
                                placeholder="MM/YY"
                                value={expiry}
                                onChange={e => setExpiry(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>CVC</label>
                            <input
                                type="text"
                                placeholder="123"
                                value={cvc}
                                onChange={e => setCvc(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                        {loading ? 'Processing...' : `Pay ৳${amount}`}
                    </button>
                </form>

                <p className="secure-badge">🔒 Encrypted by MockStripe</p>
            </div>

            <style jsx>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          backdrop-filter: blur(5px);
        }
        .modal-content {
          background: white;
          padding: 2rem;
          border-radius: var(--radius-lg);
          width: 90%;
          max-width: 400px;
          box-shadow: var(--shadow-lg);
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        .close-btn {
          font-size: 1.5rem;
          cursor: pointer;
        }
        .amount-display {
          text-align: center;
          background: var(--light);
          padding: 1rem;
          border-radius: var(--radius-md);
          margin-bottom: 2rem;
        }
        .amount-display h2 {
          color: var(--primary);
        }
        .secure-badge {
          text-align: center;
          margin-top: 1rem;
          font-size: 0.8rem;
          color: var(--gray);
        }
        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .form-group {
          margin-bottom: 1rem;
        }
        .form-control {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: var(--radius-sm);
        }
      `}</style>
        </div>
    );
}
