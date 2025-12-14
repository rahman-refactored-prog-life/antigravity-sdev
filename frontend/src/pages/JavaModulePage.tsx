import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import learningService, { type LearningModule, type Topic } from '../services/learningService';
import progressService, { type UserProgress, type TopicProgress } from '../services/progressService';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';
import './JavaModulePage.css';

export const JavaModulePage: React.FC = () => {
  const navigate = useNavigate();
  const [module, setModule] = useState<LearningModule | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [moduleProgress, setModuleProgress] = useState<UserProgress | null>(null);
  const [topicsProgress, setTopicsProgress] = useState<Map<number, TopicProgress>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    loadModuleAndTopics();
  }, [currentPage]);

  const loadModuleAndTopics = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load all modules and find Java module
      const modules = await learningService.getAllModules();
      const javaModule = modules.find(m => m.type === 'JAVA');

      if (!javaModule) {
        setError('Java module not found');
        setLoading(false);
        return;
      }

      setModule(javaModule);

      // Load topics for Java module
      const topicsResponse = await learningService.getTopicsByModule(
        javaModule.id,
        currentPage,
        20
      );

      setTopics(topicsResponse.content);
      setTotalPages(topicsResponse.totalPages);

      // Load progress data if user is logged in
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const progress = await progressService.getModuleProgress(javaModule.id);
          setModuleProgress(progress);

          const topicProgressList = await progressService.getModuleTopicsProgress(javaModule.id);
          const progressMap = new Map<number, TopicProgress>();
          topicProgressList.forEach(tp => progressMap.set(tp.topicId, tp));
          setTopicsProgress(progressMap);
        } catch (err) {
          console.log('Progress not available:', err);
        }
      }

      setLoading(false);
    } catch (err: any) {
      setError(err.message || 'Failed to load Java module');
      setLoading(false);
    }
  };

  const handleTopicClick = (topicId: number) => {
    navigate(`/topics/${topicId}`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'BEGINNER':
        return 'var(--color-success)';
      case 'INTERMEDIATE':
        return 'var(--color-warning)';
      case 'ADVANCED':
        return 'var(--color-error)';
      default:
        return 'var(--color-neutral-500)';
    }
  };

  if (loading) {
    return <Loading text="Loading Java module..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!module) {
    return <ErrorMessage message="Module not found" />;
  }

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
          <div className="pagination">
            <Button
              onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
              disabled={currentPage === 0}
            >
              Previous
            </Button>
            <span className="page-info">
              Page {currentPage + 1} of {totalPages}
            </span>
            <Button
              onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage === totalPages - 1}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
