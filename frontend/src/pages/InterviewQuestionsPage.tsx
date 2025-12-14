import React from 'react';

export const InterviewQuestionsPage: React.FC = () => {
    return (
        <div className="page-container" style={{ padding: '2rem' }}>
            <h1>Interview Questions Bank</h1>
            <p style={{ color: 'var(--text-secondary)' }}>
                Master the top 100 questions from FAANG and Tier-1 companies.
            </p>
            {/* Placeholder for future implementation */}
            <div className="placeholder-content" style={{
                marginTop: '2rem',
                padding: '2rem',
                border: '1px dashed var(--border-primary)',
                borderRadius: '8px'
            }}>
                <p>Filter by Company, Difficulty, or Topic.</p>
            </div>
        </div>
    );
};
