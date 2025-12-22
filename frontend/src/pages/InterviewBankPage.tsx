import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import type { PracticeQuestion } from '../types';
import axios from 'axios';

import './InterviewBankPage.css';

const InterviewBankPage: React.FC = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const fetchQuestions = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const params: any = {
                type: 'INTERVIEW',
                page: page,
                size: 10,
                sort: 'title,asc'
            };

            if (searchTerm) params.q = searchTerm;
            if (selectedDifficulty) params.difficulty = selectedDifficulty;

            const response = await axios.get('http://localhost:9095/api/learning/questions/search', {
                headers: { Authorization: `Bearer ${token}` },
                params
            });

            setQuestions(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Failed to fetch interview questions:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, [page, selectedDifficulty]);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setPage(0);
            fetchQuestions();
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    return (
        <Layout>
            <div className="interview-bank-container">
                <div className="filter-row">
                    <div className="search-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search questions (e.g. 'Google', 'Arrays')..."
                            className="search-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select
                        className="difficulty-select"
                        value={selectedDifficulty}
                        onChange={(e) => {
                            setSelectedDifficulty(e.target.value);
                            setPage(0);
                        }}
                    >
                        <option value="">All Difficulties</option>
                        <option value="BEGINNER">Beginner</option>
                        <option value="INTERMEDIATE">Intermediate</option>
                        <option value="ADVANCED">Advanced</option>
                    </select>
                </div>

                {loading ? (
                    <div className="loading-state">Loading questions...</div>
                ) : (
                    <div className="questions-grid">
                        {questions.map((q) => (
                            <div
                                key={q.id}
                                onClick={() => navigate(`/topics/${q.topicId}`)}
                                className="question-card"
                            >
                                <div className="question-header">
                                    <div>
                                        <h3 className="question-title">{q.title}</h3>
                                        <p className="question-desc">{q.description.substring(0, 150)}...</p>
                                    </div>
                                    <span className={`difficulty-badge ${q.difficulty.toLowerCase()}`}>
                                        {q.difficulty}
                                    </span>
                                </div>
                            </div>
                        ))}

                        {questions.length === 0 && (
                            <div className="empty-state">
                                No questions found matching your criteria.
                            </div>
                        )}
                    </div>
                )}

                {/* Pagination */}
                <div className="pagination-controls">
                    <button
                        disabled={page === 0}
                        onClick={() => setPage(p => p - 1)}
                        className="pagination-btn"
                    >
                        Previous
                    </button>
                    <span className="page-info">Page {page + 1} of {totalPages || 1}</span>
                    <button
                        disabled={page >= totalPages - 1}
                        onClick={() => setPage(p => p + 1)}
                        className="pagination-btn"
                    >
                        Next
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default InterviewBankPage;
