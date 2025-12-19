import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Toggle visibility
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    // Scroll to top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <>
            <style>
                {`
          .back-to-top-container {
            position: fixed;
            bottom: 32px;
            right: 32px; /* Aligned with floating notes */
            z-index: 2000;
            display: flex;
            flex-direction: column;
            gap: 12px;
            pointer-events: none; /* Let clicks pass when hidden */
          }
          
          .back-to-top-btn {
            pointer-events: auto;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 12px 20px;
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.5);
            border-radius: 9999px;
            color: #1e293b;
            font-weight: 600;
            font-size: 0.9rem;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            opacity: 0;
            transform: translateY(20px) scale(0.9);
            border: 1px solid rgba(255,255,255,0.6);
          }

          .back-to-top-btn.visible {
            opacity: 1;
            transform: translateY(0) scale(1);
          }

          .back-to-top-btn:hover {
            background: rgba(255, 255, 255, 0.95);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
            transform: translateY(-4px);
            color: #2563eb; /* Primary Blue */
          }
          
          .back-to-top-btn:active {
            transform: translateY(-1px);
          }
        `}
            </style>
            <div className="back-to-top-container">
                <button
                    className={`back-to-top-btn ${isVisible ? 'visible' : ''}`}
                    onClick={scrollToTop}
                    aria-label="Back to Top"
                >
                    <ArrowUp size={18} />
                    <span>Top</span>
                </button>
            </div>
        </>
    );
};
