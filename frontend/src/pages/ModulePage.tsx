import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import learningService, { type LearningModule, type Topic } from '../services/learningService';
import progressService, { type UserProgress, type TopicProgress } from '../services/progressService';
import { Card } from '../components/Card';
import { Pagination } from '../components/Pagination';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';
import './ModulePage.css';

export const ModulePage: React.FC = () => {
    const { moduleType } = useParams<{ moduleType: string }>();
    const navigate = useNavigate();
    const [module, setModule] = useState<LearningModule | null>(null);
    const [topics, setTopics] = useState<Topic[]>([]);
    const [moduleProgress, setModuleProgress] = useState<UserProgress | null>(null);
    const [topicsProgress, setTopicsProgress] = useState<Map<number, TopicProgress>>(new Map());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 20;

    useEffect(() => {
        if (moduleType) {
            loadModuleAndTopics();
        }
    }, [moduleType, currentPage]);

    const loadModuleAndTopics = async () => {
        try {
            setLoading(true);
            setError(null);

            // Load all modules to find the current one by Type or ID
            const modules = await learningService.getAllModules();
            const normalize = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
            const targetSlug = normalize(moduleType || '');

            const currentModule = modules.find(m => {
                const typeMatch = normalize(m.type) === targetSlug;
                const nameMatch = normalize(m.name) === targetSlug;
                // Also check if moduleType matches ID
                const idMatch = m.id.toString() === moduleType;
                return typeMatch || nameMatch || idMatch;
            });

            if (!currentModule) {
                // MOCK DATA FALLBACK for Demonstration
                // This allows us to show the UI for "Arrays & Strings" even if backend isn't seeded yet.
                const mockModules: Record<string, LearningModule> = {
                    'arraysstrings': {
                        id: 999,
                        name: 'Arrays & Strings',
                        description: 'Master fundamental data structures with our paginated practice set.',
                        type: 'DSA',
                        orderIndex: 2,
                        topicCount: 45
                    },
                    'linkedlists': {
                        id: 998,
                        name: 'Linked Lists',
                        description: 'Deep dive into pointer manipulation and node-based structures.',
                        type: 'DSA',
                        orderIndex: 3,
                        topicCount: 30
                    }
                };

                if (mockModules[targetSlug]) {
                    const mockMod = mockModules[targetSlug];
                    setModule(mockMod);

                    // Generate mock topics for pagination demo
                    const mockTopics: Topic[] = Array.from({ length: pageSize }, (_, i) => ({
                        id: 1000 + i + (currentPage * 100),
                        title: `${mockMod.name} - Topic ${((currentPage - 1) * pageSize) + i + 1}`,
                        description: `Learn about advanced concepts in ${mockMod.name}. This is a paginated demo item.`,
                        difficulty: i % 3 === 0 ? 'ADVANCED' : i % 2 === 0 ? 'INTERMEDIATE' : 'BEGINNER',
                        estimatedMinutes: 15 + i,
                        orderIndex: i,
                        moduleId: mockMod.id,
                        questionCount: 5,
                        codeExampleCount: 3
                    }));

                    setTopics(mockTopics);
                    setTotalPages(Math.ceil((mockMod.topicCount || 20) / pageSize));
                    setLoading(false);
                    return;
                }

                setError('Module not found');
                setLoading(false);
                return;
            }

            setModule(currentModule);
            await loadTopicsForModule(currentModule.id);

        } catch (err: any) {
            setError(err.message || 'Failed to load module');
            setLoading(false);
        }
    };

    const loadTopicsForModule = async (moduleId: number) => {
        // Load topics
        const topicsResponse = await learningService.getTopicsByModule(
            moduleId,
            currentPage - 1,
            pageSize
        );

        setTopics(topicsResponse.content);
        setTotalPages(topicsResponse.totalPages);

        // Load progress
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const progress = await progressService.getModuleProgress(moduleId);
                setModuleProgress(progress);

                const topicProgressList = await progressService.getModuleTopicsProgress(moduleId);
                const progressMap = new Map<number, TopicProgress>();
                topicProgressList.forEach(tp => progressMap.set(tp.topicId, tp));
                setTopicsProgress(progressMap);
            } catch (err) {
                console.log('Progress not available:', err);
            }
        }
        setLoading(false);
    };

    const handleTopicClick = (topicId: number) => {
        navigate(`/topics/${topicId}`);
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'BEGINNER': return 'var(--color-success)';
            case 'INTERMEDIATE': return 'var(--color-warning)';
            case 'ADVANCED': return 'var(--color-error)';
            default: return 'var(--color-neutral-500)';
        }
    };

    if (loading) return <Loading text={`Loading ${moduleType} module...`} />;
    if (error) return <ErrorMessage message={error} />;
    if (!module) return <ErrorMessage message="Module not found" />;

    return (
        <div className="java-module-page">
            {/* Module Header */}
            <div className="module-header">
                <h1>{module.name}</h1>
                <p className="module-description">{module.description}</p>
                <div className="module-stats">
                    <span className="stat">
                        <strong>{module.topicCount || 0}</strong> Topics
                    </span>
                    {moduleProgress && (
                        <>
                            <span className="stat">
                                <strong>{moduleProgress.completedTopics}</strong> / {moduleProgress.totalTopics} Completed
                            </span>
                            <span className="stat">
                                <strong>{Math.round(moduleProgress.completionPercentage)}%</strong> Progress
                            </span>
                        </>
                    )}
                </div>
                {moduleProgress && (
                    <div className="progress-bar-container">
                        <div
                            className="progress-bar-fill"
                            style={{ width: `${moduleProgress.completionPercentage}%` }}
                        />
                    </div>
                )}
            </div>

            {/* Topics List */}
            <div className="topics-section">
                <h2>Topics</h2>
                <div className="topics-grid">
                    {topics.map((topic) => {
                        const progress = topicsProgress.get(topic.id);
                        return (
                            <Card
                                key={topic.id}
                                className={`topic-card ${progress?.isCompleted ? 'completed' : ''}`}
                                onClick={() => handleTopicClick(topic.id)}
                            >
                                <div className="topic-card-header">
                                    <h3>
                                        {progress?.isCompleted && <span className="check-icon">✓ </span>}
                                        {topic.title}
                                    </h3>
                                    <span
                                        className="difficulty-badge"
                                        style={{ backgroundColor: getDifficultyColor(topic.difficulty) }}
                                    >
                                        {topic.difficulty}
                                    </span>
                                </div>
                                <p className="topic-description">{topic.description}</p>
                                <div className="topic-meta">
                                    <span>⏱️ {topic.estimatedMinutes} min</span>
                                    {topic.questionCount !== undefined && (
                                        <span>📝 {topic.questionCount} questions</span>
                                    )}
                                    {progress && (
                                        <span className="progress-indicator">
                                            {Math.round(progress.completionPercentage)}% complete
                                        </span>
                                    )}
                                </div>
                                {progress && progress.completionPercentage > 0 && (
                                    <div className="topic-progress-bar">
                                        <div
                                            className="topic-progress-fill"
                                            style={{ width: `${progress.completionPercentage}%` }}
                                        />
                                    </div>
                                )}
                            </Card>
                        );
                    })}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="pagination-container" style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            pageSize={pageSize}
                            totalItems={totalPages * pageSize}
                            onPageChange={setCurrentPage}
                            showPageSize={false}
                            showInfo={true}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
