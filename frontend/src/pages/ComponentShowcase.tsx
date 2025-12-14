import React, { useState } from 'react';
import {
  ModuleCard,
  StatCard,
  QuickActionCard,
  ProgressCard,
  AchievementCard,
  PrimaryButton,
  SecondaryButton,
  GhostButton,
  SuccessButton,
  WarningButton,
  DangerButton,
  IconButton,
  ButtonGroup,
} from '../components';
import './ComponentShowcase.css';

/**
 * Component Showcase Page
 * Displays all enhanced UI components with examples
 * Only accessible in development mode
 */

const ComponentShowcase: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleLoadingDemo = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="showcase">
      <div className="showcase__header">
        <h1>Enhanced UI Components Showcase</h1>
        <p>World-class components with smooth animations and micro-interactions</p>
      </div>

      {/* Enhanced Cards */}
      <section className="showcase__section">
        <h2>Enhanced Cards</h2>
        
        <h3>ModuleCard</h3>
        <div className="showcase__grid">
          <ModuleCard
            title="Java Fundamentals"
            description="Master the basics of Java programming with comprehensive coverage"
            icon={<span>📚</span>}
            difficulty="Beginner"
            progress={65}
            topicCount={25}
            estimatedHours={12}
            onClick={() => alert('Module clicked!')}
          />
          <ModuleCard
            title="Data Structures"
            description="Learn essential data structures for technical interviews"
            icon={<span>🌳</span>}
            difficulty="Intermediate"
            progress={40}
            topicCount={30}
            estimatedHours={20}
          />
        </div>

        <h3>StatCard</h3>
        <div className="showcase__grid showcase__grid--4">
          <StatCard
            title="Modules Completed"
            value={12}
            icon={<span>📖</span>}
            change="+2 this week"
            trend="up"
            color="var(--color-success)"
          />
          <StatCard
            title="Learning Streak"
            value="7 days"
            icon={<span>🔥</span>}
            change="Keep it up!"
            trend="neutral"
            color="var(--color-primary)"
          />
          <StatCard
            title="Questions Solved"
            value={156}
            icon={<span>✅</span>}
            change="+23 this week"
            trend="up"
            color="var(--color-info)"
          />
          <StatCard
            title="Time Invested"
            value="42h"
            icon={<span>⏱️</span>}
            change="+5h this week"
            trend="up"
            color="var(--color-warning)"
          />
        </div>

        <h3>QuickActionCard</h3>
        <div className="showcase__grid showcase__grid--3">
          <QuickActionCard
            title="Practice Interview Questions"
            description="500+ FAANG questions"
            icon={<span>💼</span>}
            onClick={() => alert('Interview prep clicked!')}
            color="var(--color-primary)"
          />
          <QuickActionCard
            title="Code Playground"
            description="Multi-language editor"
            icon={<span>💻</span>}
            onClick={() => alert('Code playground clicked!')}
            color="var(--color-success)"
          />
          <QuickActionCard
            title="My Notes"
            description="Smart note organization"
            icon={<span>📝</span>}
            onClick={() => alert('Notes clicked!')}
            color="var(--color-warning)"
          />
        </div>

        <h3>ProgressCard</h3>
        <div className="showcase__grid">
          <ProgressCard
            title="Spring Boot Expert"
            description="Complete Spring Framework module"
            progress={65}
            target={100}
            dueDate="Next week"
            priority="high"
          />
          <ProgressCard
            title="React Developer"
            description="Master React hooks and context"
            progress={30}
            target={100}
            dueDate="This month"
            priority="medium"
          />
        </div>

        <h3>AchievementCard</h3>
        <div className="showcase__grid">
          <AchievementCard
            title="Java Master"
            description="Completed Java Fundamentals with 95% score"
            icon="🏆"
            date="2 days ago"
          />
          <AchievementCard
            title="Streak Champion"
            description="7-day learning streak achieved"
            icon="🔥"
            date="1 week ago"
          />
        </div>
      </section>

      {/* Enhanced Buttons */}
      <section className="showcase__section">
        <h2>Enhanced Buttons</h2>
        
        <h3>Button Variants</h3>
        <div className="showcase__button-row">
          <PrimaryButton onClick={() => alert('Primary clicked!')}>
            Primary Button
          </PrimaryButton>
          <SecondaryButton onClick={() => alert('Secondary clicked!')}>
            Secondary Button
          </SecondaryButton>
          <GhostButton onClick={() => alert('Ghost clicked!')}>
            Ghost Button
          </GhostButton>
          <SuccessButton onClick={() => alert('Success clicked!')}>
            Success Button
          </SuccessButton>
          <WarningButton onClick={() => alert('Warning clicked!')}>
            Warning Button
          </WarningButton>
          <DangerButton onClick={() => alert('Danger clicked!')}>
            Danger Button
          </DangerButton>
        </div>

        <h3>Button Sizes</h3>
        <div className="showcase__button-row">
          <PrimaryButton size="sm">Small</PrimaryButton>
          <PrimaryButton size="md">Medium</PrimaryButton>
          <PrimaryButton size="lg">Large</PrimaryButton>
        </div>

        <h3>Button States</h3>
        <div className="showcase__button-row">
          <PrimaryButton loading={loading} onClick={handleLoadingDemo}>
            {loading ? 'Loading...' : 'Click to Load'}
          </PrimaryButton>
          <PrimaryButton disabled>Disabled Button</PrimaryButton>
          <PrimaryButton icon={<span>🚀</span>} iconPosition="left">
            With Icon Left
          </PrimaryButton>
          <PrimaryButton icon={<span>→</span>} iconPosition="right">
            With Icon Right
          </PrimaryButton>
        </div>

        <h3>Icon Buttons</h3>
        <div className="showcase__button-row">
          <IconButton icon={<span>❤️</span>} tooltip="Like" />
          <IconButton icon={<span>⭐</span>} tooltip="Favorite" variant="primary" />
          <IconButton icon={<span>🔖</span>} tooltip="Bookmark" variant="secondary" />
          <IconButton icon={<span>🗑️</span>} tooltip="Delete" variant="danger" />
        </div>

        <h3>Button Group</h3>
        <ButtonGroup>
          <SecondaryButton>Left</SecondaryButton>
          <SecondaryButton>Middle</SecondaryButton>
          <SecondaryButton>Right</SecondaryButton>
        </ButtonGroup>
      </section>

      {/* Animations */}
      <section className="showcase__section">
        <h2>Animations</h2>
        <p style={{ marginBottom: 'var(--space-4)', color: 'var(--color-text-secondary)' }}>
          Click "Replay Animations" to see the staggered fade-in effect
        </p>
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <PrimaryButton 
            onClick={() => {
              const container = document.querySelector('.stagger-children');
              if (container) {
                container.classList.remove('stagger-children');
                setTimeout(() => container.classList.add('stagger-children'), 10);
              }
            }}
          >
            🔄 Replay Animations
          </PrimaryButton>
        </div>
        <div className="stagger-children">
          <div className="showcase__animation-demo">Staggered Animation 1</div>
          <div className="showcase__animation-demo">Staggered Animation 2</div>
          <div className="showcase__animation-demo">Staggered Animation 3</div>
          <div className="showcase__animation-demo">Staggered Animation 4</div>
        </div>
      </section>
    </div>
  );
};

export default ComponentShowcase;
