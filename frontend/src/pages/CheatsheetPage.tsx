import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import learningService, { type Topic } from '../services/learningService';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import { Pagination } from '../components/Pagination';
import './TopicDetailPage.css'; // Reuse styles for now

export const CheatsheetPage: React.FC = () => {
    const navigate = useNavigate();
    const [topics, setTopics] = useState<Topic[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 12;

    useEffect(() => {
        loadTopics();
    }, [currentPage]);

    const loadTopics = async () => {
        try {
            setLoading(true);
            // Fetch all topics from Java Module for now (ID 1), or iterate modules if needed. 
            // V1: Java Module
            const response = await learningService.getTopicsByModule(1, currentPage - 1, pageSize);
            setTopics(response.content);
            setTotalPages(response.totalPages);
            setLoading(false);
        } catch (error) {
            console.error('Failed to load cheatsheets:', error);
            setLoading(false);
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="page-container" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h1>📚 Cheatsheets Hub</h1>
                <p style={{ color: 'var(--text-secondary)' }}>
                    Quick reference guides for every topic. Zero fluff, just facts.
                </p>
            </div>

            <div className="topics-grid">
                {topics.map(topic => (
                    <Card key={topic.id} className="topic-card" onClick={() => navigate(`/topics/${topic.id}`)}>
                        <div className="topic-card-header">
                            <h3>{topic.title}</h3>
                            <span className="difficulty-badge" style={{ fontSize: '0.8rem' }}>Cheatsheet</span>
                        </div>
                        <p className="topic-description">{topic.description}</p>
                        <div className="topic-footer" style={{ marginTop: '1rem' }}>
                            <Button variant="secondary" size="sm" style={{ width: '100%' }}>View Cheatsheet →</Button>
                        </div>
                    </Card>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="pagination-container" style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        pageSize={pageSize}
                        totalItems={totalPages * pageSize}
                        onPageChange={setCurrentPage}
                        showPageSize={false}
                    />
                </div>
            )}
        </div>
    );
};
