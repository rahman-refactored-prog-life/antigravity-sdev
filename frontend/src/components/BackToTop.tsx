
import React, { useEffect, useState } from 'react';
import './BackToTop.css';

export const BackToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Set the top cordinate to 0
    // make scrolling smooth
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    if (!isVisible) {
        return null;
    }

    return (
        <div className="back-to-top">
            <button onClick={scrollToTop} aria-label="Back to top">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4L4 12L5.4 13.4L11 7.8V20H13V7.8L18.6 13.4L20 12L12 4Z" fill="currentColor" />
                </svg>
            </button>
        </div>
    );
};
