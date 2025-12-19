import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  StatCard,
  ModuleCard,
  EnhancedButton,
  QuestionCard
} from '../components';
import './DashboardPage.css';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const recentQuestions = [
    {
      id: 'q1',
      title: 'Two Sum',
      difficulty: 'Easy' as const,
      companies: ['Google', 'Amazon'],
      isCompleted: true,
      isBookmarked: false
    },
    {
      id: 'q2',
      title: 'Add Two Numbers',
      difficulty: 'Medium' as const,
      companies: ['Microsoft'],
      isCompleted: false,
      isBookmarked: true
    }
  ];

  return (
    <div className="dashboard-page fade-in">
      {/* Welcome Section */}
      <div className="dashboard-welcome slide-in-up">
        <h1>Welcome back, {user?.username}! 👋</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-lg)' }}>
          Continue your learning journey
        </p>
      </div>

      {/* Stats Cards with Enhanced Components */}
      <div className="dashboard-stats-grid">
        <div className="stagger-1">
          <StatCard
            title="Your Progress"
            value="15 / 100"
            change="+5 this week"
            trend="up"
            color="var(--color-success)"
          />
        </div>

        <div className="stagger-2">
          <StatCard
            title="Current Streak"
            value="5 days 🔥"
            change="Personal best"
            trend="up"
            color="var(--color-warning)"
          />
        </div>

        <div className="stagger-3">
          <StatCard
            title="Questions Solved"
            value="42 / 10,000"
            change="+12 this week"
            trend="up"
            color="var(--color-primary)"
          />
        </div>
      </div>

      {/* Recent Topics with Enhanced ModuleCard */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2>Continue Learning</h2>
          <EnhancedButton variant="primary" onClick={() => navigate('/modules/java')}>
            View All Available Learnings →
          </EnhancedButton>
        </div>
        <div className="modules-grid">
          <ModuleCard
            title="Java Programming"
            description="Master Java from fundamentals to advanced concepts"
            icon="☕"
            difficulty="Beginner"
            progress={5}
            onClick={() => navigate('/modules/java')}
          />
          <ModuleCard
            title="Arrays & Strings"
            description="Master fundamental data structures"
            icon="📚"
            difficulty="Easy"
            progress={75}
            topicCount={20}
            onClick={() => navigate('/modules/arrays-strings')}
          />
          <ModuleCard
            title="Linked Lists"
            description="Learn pointer manipulation"
            icon="🔗"
            difficulty="Medium"
            progress={40}
            topicCount={20}
            onClick={() => navigate('/modules/linked-lists')}
          />
          <ModuleCard
            title="Binary Trees"
            description="Explore tree data structures"
            icon="🌳"
            difficulty="Medium"
            progress={20}
            topicCount={20}
            onClick={() => navigate('/modules/binary-trees')}
          />
        </div>
      </div>

      {/* Recent Questions */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2>Recent Questions</h2>
        </div>
        <div className="questions-grid">
          {recentQuestions.map(question => (
            <QuestionCard
              key={question.id}
              {...question}
              onView={() => console.log('View', question.id)}
              onBookmark={() => console.log('Bookmark', question.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
