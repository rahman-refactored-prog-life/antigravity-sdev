import { useParams, useNavigate, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Edit3, ArrowLeft, Clock, BarChart, FileQuestion, CheckCircle } from 'lucide-react';
import progressService from '../services/progressService';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';
import { CodeTabs } from '../components/CodeTabs';
import { BackToTop } from '../components/BackToTop';
import { NotesSidebar } from '../components/NotesSidebar';
import { Pagination } from '../components/Pagination';
import React, { useEffect, useState } from 'react';
import { useTopic } from '../hooks/useTopic';
import './TopicDetailPage.css';

// Utility to clean markdown characters & emojis from titles
const cleanMarkdown = (text: string): string => {
  if (!text) return '';
  return text.replace(/(\*\*|__)(.*?)\1/g, '$2') // Bold
    .replace(/(\*|_)(.*?)\1/g, '$2')    // Italic
    .replace(/`([^`]+)`/g, '$1')        // Inline code
    .replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '') // Emojis
    .trim();
};

export const TopicDetailPage: React.FC = () => {
  // VERSION MARKER
  console.log('🚀 TopicDetailPage v5.0 - Refactored with useTopic Hook');

  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { topic, progress, loading, error, processedContent, codeBlockGroups, setProgress } = useTopic(parseInt(topicId || '0'));

  const [markingComplete, setMarkingComplete] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [contentPage, setContentPage] = useState(1);
  const [contentSections, setContentSections] = useState<string[]>([]);

  // Effect to handle ?section=X query param for deep linking
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const sectionParam = searchParams.get('section');
    if (sectionParam) {
      const page = parseInt(sectionParam);
      if (!isNaN(page) && page > 0) {
        setContentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [location.search]);

  useEffect(() => {
    if (topicId) {
      setContentPage(1);
    }
  }, [topicId]);

  const handleMarkComplete = async () => {
    if (!topic || !topicId) return;
    try {
      setMarkingComplete(true);
      const updatedProgress = await progressService.completeTopic(parseInt(topicId));
      setProgress(updatedProgress);
    } catch (err: any) {
      console.error('Failed to mark complete:', err);
    } finally {
      setMarkingComplete(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  // Section Splitting
  useEffect(() => {
    if (processedContent) {
      const rawSections = processedContent.split(/(?=\n##\s)/);
      const cleanSections = rawSections.filter(s => s.trim().length > 0);
      setContentSections(cleanSections);
      setContentPage(1);
    }
  }, [processedContent]);

  const handleContentPageChange = (page: number) => {
    setContentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'BEGINNER': return 'var(--color-success)';
      case 'INTERMEDIATE': return 'var(--color-warning)';
      case 'ADVANCED': return 'var(--color-error)';
      default: return 'var(--color-neutral-500)';
    }
  };

  // --- Dynamic Title Logic ---
  const currentSectionContent = contentSections[contentPage - 1] || '';

  // Try to find the first H2 in the current section to use as the title
  const matchH2 = currentSectionContent.match(/^##\s+(.+)$/m);
  const rawTitle = matchH2 ? matchH2[1] : (contentPage === 1 ? topic?.title : `Section ${contentPage}`);
  const currentTitle = cleanMarkdown(rawTitle || '');

  if (loading) return <Loading text="Loading topic..." />;
  if (error || !topic) return <div className="topic-detail-page"><ErrorMessage message={error || "Topic not found"} /><Button onClick={handleBack}>Go Back</Button></div>;

  return (
    <div className="topic-detail-page">
      <div className="topic-layout-grid">

        {/* LEFT RAIL: Metadata & Context */}
        <aside className="topic-meta-sidebar">
          <div className="meta-sticky-container">
            <button onClick={handleBack} className="back-link">
              <ArrowLeft size={14} />
              Back to {topic.moduleName || 'Modules'}
            </button>

            <div className="topic-context-card">
              <h3 className="topic-context-eyebrow">Current Topic</h3>
              <h2 className="topic-context-title">{topic.title}</h2>
            </div>

            <div className="topic-meta-list">
              <div className="meta-item">
                <BarChart size={16} className="meta-icon" />
                <span className="meta-label">Difficulty</span>
                <span className="meta-value badge" style={{ color: getDifficultyColor(topic.difficulty) }}>
                  {topic.difficulty}
                </span>
              </div>
              <div className="meta-item">
                <Clock size={16} className="meta-icon" />
                <span className="meta-label">Time</span>
                <span className="meta-value">{topic.estimatedMinutes} min</span>
              </div>
              {topic.questionCount !== undefined && topic.questionCount > 0 && (
                <div className="meta-item">
                  <FileQuestion size={16} className="meta-icon" />
                  <span className="meta-label">Questions</span>
                  <span className="meta-value">{topic.questionCount}</span>
                </div>
              )}
            </div>

            {progress && (
              <div className="topic-progress-card">
                <span className="progress-status-label">Status</span>
                {progress.isCompleted ? (
                  <span className="status-badge completed"><CheckCircle size={14} /> Completed</span>
                ) : (
                  <span className="status-badge pending">In Progress</span>
                )}
              </div>
            )}

            {/* Table of Contents (Section Navigator) */}
            {contentSections.length > 1 && (
              <div className="page-toc-container">
                <h3 className="toc-eyebrow">On this page</h3>
                <ul className="toc-list">
                  {contentSections.map((section, index) => {
                    // Extract Title
                    const matchH2 = section.match(/^##\s+(.+)$/m);
                    const title = matchH2 ? cleanMarkdown(matchH2[1]) : (index === 0 ? 'Introduction' : `Section ${index + 1}`);

                    return (
                      <li key={index} className={`toc-item ${contentPage === index + 1 ? 'active' : ''}`}>
                        <button onClick={() => handleContentPageChange(index + 1)}>
                          {title}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </aside>

        {/* RIGHT COLUMN: Main Content */}
        <main className="topic-main-content">
          {/* Dynamic Header */}
          <header className="dynamic-section-header">
            <h1 className="section-hero-title">{currentTitle}</h1>
          </header>

          <div className="content-body fade-in-section" key={contentPage}>
            {topic.content ? (
              currentSectionContent.split(/(__CODE_TABS_\d+__)/).map((part, index) => {
                const match = part.match(/__CODE_TABS_(\d+)__/);
                if (match) {
                  const groupIndex = parseInt(match[1]);
                  const solutions = codeBlockGroups[groupIndex];
                  return solutions ? <CodeTabs key={`tabs-${index}`} solutions={solutions} title="Solution" /> : null;
                }
                return (
                  <ReactMarkdown
                    key={`md-${index}`}
                    components={{
                      h2: ({ children, ...props }: any) => {
                        // Hide H2 if it matches our dynamic title
                        const text = String(children);
                        if (cleanMarkdown(text) === currentTitle) return null;
                        return <h2 {...props}>{children}</h2>;
                      },
                      code({ className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !match ? (
                          <code className={className} {...props}>{children}</code>
                        ) : (
                          <SyntaxHighlighter style={vscDarkPlus as any} language={match[1]} PreTag="div">
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        );
                      },
                      h1: ({ children, ...props }: any) => {
                        const rawText = String(children);
                        const text = cleanMarkdown(rawText);
                        const slug = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                        return <h1 id={slug} {...props}>{children}</h1>;
                      },
                      h3: ({ children, ...props }: any) => {
                        const rawText = String(children);
                        const text = cleanMarkdown(rawText);
                        const slug = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                        return <h3 id={slug} {...props}>{children}</h3>;
                      },
                      h4: ({ children, ...props }: any) => {
                        const rawText = String(children);
                        const text = cleanMarkdown(rawText);
                        const slug = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                        return <h4 id={slug} {...props}>{children}</h4>;
                      },
                      h5: ({ children, ...props }: any) => {
                        const rawText = String(children);
                        const text = cleanMarkdown(rawText);
                        const slug = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                        return <h5 id={slug} {...props}>{children}</h5>;
                      },
                      h6: ({ children, ...props }: any) => {
                        const rawText = String(children);
                        const text = cleanMarkdown(rawText);
                        const slug = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                        return <h6 id={slug} {...props}>{children}</h6>;
                      }
                    }}
                  >
                    {part}
                  </ReactMarkdown>
                );
              })
            ) : (
              <p>Content coming soon...</p>
            )}
          </div>

          {/* Pagination */}
          {contentSections.length > 1 && (
            <div className="content-pagination-wrapper">
              <Pagination
                currentPage={contentPage}
                totalPages={contentSections.length}
                onPageChange={handleContentPageChange}
                pageSize={1}
                totalItems={contentSections.length}
                showPageSize={false}
                itemName="Sections"
              />
            </div>
          )}

          {/* Footer Actions */}
          <div className="topic-action-footer">
            <div className="practice-CTA">
              <h3>Put it to practice</h3>
              <p>Open the IDE to test your knowledge.</p>
            </div>
            {progress && !progress.isCompleted && (
              <Button variant="primary" onClick={handleMarkComplete} disabled={markingComplete}>
                {markingComplete ? 'Marking...' : 'Mark Complete'}
              </Button>
            )}
          </div>
        </main>
      </div>

      {/* Floating Notes */}
      <NotesSidebar topicId={topic.id} isOpen={isNotesOpen} onClose={() => setIsNotesOpen(false)} />
      <button className="floating-notes-btn" onClick={() => setIsNotesOpen(true)} aria-label="Open Notes">
        <Edit3 size={20} /> <span>Notes</span>
      </button>

      <BackToTop />
    </div>
  );
};
