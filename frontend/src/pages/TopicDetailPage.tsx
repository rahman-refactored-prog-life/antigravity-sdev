import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import learningService, { type Topic } from '../services/learningService';
import progressService, { type TopicProgress } from '../services/progressService';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';
import { CodeTabs } from '../components/CodeTabs';
import { BackToTop } from '../components/BackToTop';
import { CodeEditor } from '../components/CodeEditor';
import { NotesSidebar } from '../components/NotesSidebar';
import './TopicDetailPage.css';

export const TopicDetailPage: React.FC = () => {
  // VERSION MARKER - If you see this in console, new code is loaded!
  console.log('🚀 TopicDetailPage v3.0 - Anchor Links Fix with Placeholder Strategy');

  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [progress, setProgress] = useState<TopicProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [markingComplete, setMarkingComplete] = useState(false);
  const [allTopics, setAllTopics] = useState<Topic[]>([]);
  const [currentTopicIndex, setCurrentTopicIndex] = useState<number>(-1);
  const [isNotesOpen, setIsNotesOpen] = useState(false);

  useEffect(() => {
    if (topicId) {
      loadTopic(parseInt(topicId));
    }
  }, [topicId]);

  const loadTopic = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      const topicData = await learningService.getTopicById(id);
      setTopic(topicData);

      // Load all topics for pagination
      if (topicData.moduleId) {
        const topicsResponse = await learningService.getTopicsByModule(topicData.moduleId, 0, 100);
        setAllTopics(topicsResponse.content);
        const index = topicsResponse.content.findIndex(t => t.id === id);
        setCurrentTopicIndex(index);
      }

      // Load progress if user is logged in
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await progressService.startTopic(id);
          const progressData = await progressService.getTopicProgress(id);
          setProgress(progressData);
        } catch (err) {
          console.log('Progress not available:', err);
        }
      }

      setLoading(false);
    } catch (err: any) {
      setError(err.message || 'Failed to load topic');
      setLoading(false);
    }
  };

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

  const handlePrevious = () => {
    if (currentTopicIndex > 0) {
      const prevTopic = allTopics[currentTopicIndex - 1];
      navigate(`/topics/${prevTopic.id}`);
    }
  };

  const handleNext = () => {
    if (currentTopicIndex < allTopics.length - 1) {
      const nextTopic = allTopics[currentTopicIndex + 1];
      navigate(`/topics/${nextTopic.id}`);
    }
  };

  // Parse content to find consecutive code blocks for multi-language solutions
  const { processedContent, codeBlockGroups } = useMemo(() => {
    if (!topic?.content) {
      return { processedContent: '', codeBlockGroups: [] };
    }

    const lines = topic.content.split('\n');
    const groups: { language: string; code: string; startLine: number; endLine: number }[][] = [];
    let currentGroup: { language: string; code: string; startLine: number; endLine: number }[] = [];
    let inCodeBlock = false;
    let currentLanguage = '';
    let currentCode: string[] = [];
    let codeBlockStart = -1;
    let lastCodeBlockEnd = -1;

    // First pass: Identify all code block groups
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.trim().startsWith('```')) {
        if (!inCodeBlock) {
          // Starting a code block
          inCodeBlock = true;
          codeBlockStart = i;
          currentLanguage = line.trim().substring(3).trim() || 'plaintext';
          currentCode = [];

          const languageExists = currentGroup.some(item => item.language === currentLanguage);

          if (lastCodeBlockEnd >= 0 && i - lastCodeBlockEnd <= 10 && !languageExists) {
            // Part of current group
          } else {
            // Start new group
            if (currentGroup.length > 0) {
              groups.push([...currentGroup]);
            }
            currentGroup = [];
          }
        } else {
          // Ending a code block
          inCodeBlock = false;
          currentGroup.push({
            language: currentLanguage,
            code: currentCode.join('\n'),
            startLine: codeBlockStart,
            endLine: i
          });
          lastCodeBlockEnd = i;
        }
      } else if (inCodeBlock) {
        currentCode.push(line);
      }
    }

    // Add last group
    if (currentGroup.length > 0) {
      groups.push(currentGroup);
    }

    // Filter for multi-language groups only
    const multiLangGroups = groups.filter(group => group.length > 1);

    // Second pass: Reconstruct content
    // We will build a new array of lines, replacing grouped code blocks with markers
    const newLines: string[] = [];
    let lineIdx = 0;

    // Convert groups to a verification map for O(1) lookup
    // Map startLine -> groupIndex
    const groupStarts = new Map<number, number>();
    multiLangGroups.forEach((group, idx) => {
      groupStarts.set(group[0].startLine, idx);
    });

    while (lineIdx < lines.length) {
      if (groupStarts.has(lineIdx)) {
        // We hit the start of a multi-lang group
        const groupIndex = groupStarts.get(lineIdx)!;
        const group = multiLangGroups[groupIndex];
        const lastLineOfGroup = group[group.length - 1].endLine;

        // Insert marker
        newLines.push(`\n\n__CODE_TABS_${groupIndex}__\n\n`);

        // Skip lines until end of group
        lineIdx = lastLineOfGroup + 1;
      } else {
        newLines.push(lines[lineIdx]);
        lineIdx++;
      }
    }

    return {
      processedContent: newLines.join('\n'),
      codeBlockGroups: multiLangGroups.map(g => g.map(({ language, code }) => ({ language, code })))
    };
  }, [topic?.content]);

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
    return <Loading text="Loading topic..." />;
  }

  if (error) {
    return (
      <div className="topic-detail-page">
        <ErrorMessage message={error} />
        <Button onClick={handleBack}>Go Back</Button>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="topic-detail-page">
        <ErrorMessage message="Topic not found" />
        <Button onClick={handleBack}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="topic-detail-page">
      {/* Breadcrumb Navigation */}
      <nav className="breadcrumb">
        <button onClick={handleBack} className="breadcrumb-link">
          ← {topic.moduleName || 'Back'}
        </button>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">{topic.title}</span>
      </nav>

      {/* Topic Header */}
      <div className="topic-header">
        <div className="topic-title-row">
          <h1>{topic.title}</h1>
          <span
            className="difficulty-badge"
            style={{ backgroundColor: getDifficultyColor(topic.difficulty) }}
          >
            {topic.difficulty}
          </span>
        </div>
        <p className="topic-description">{topic.description}</p>
        <div className="topic-meta">
          <span>⏱️ {topic.estimatedMinutes} minutes</span>
          {topic.questionCount !== undefined && topic.questionCount > 0 && (
            <span>📝 {topic.questionCount} practice questions</span>
          )}
          {topic.codeExampleCount !== undefined && topic.codeExampleCount > 0 && (
            <span>💻 {topic.codeExampleCount} code examples</span>
          )}
        </div>
      </div>

      {/* Topic Content */}
      <div className="topic-content">
        {topic.content ? (
          <>
            {processedContent.split(/(__CODE_TABS_\d+__)/).map((part, index) => {
              const match = part.match(/__CODE_TABS_(\d+)__/);
              if (match) {
                const groupIndex = parseInt(match[1]);
                const solutions = codeBlockGroups[groupIndex];
                return solutions ? (
                  <CodeTabs
                    key={`code-tabs-${index}`}
                    solutions={solutions}
                    title="Multi-Language Solution"
                  />
                ) : null;
              }

              return (
                <ReactMarkdown
                  key={`markdown-${index}`}
                  components={{
                    code({ className, children, ...props }: any) {
                      const match = /language-(\w+)/.exec(className || '');
                      const isInline = !match;
                      return !isInline && match ? (
                        <SyntaxHighlighter
                          style={vscDarkPlus as any}
                          language={match[1]}
                          PreTag="div"
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                    a({ href, children, ...props }: any) {
                      // Handle anchor links for table of contents
                      if (href?.startsWith('#')) {
                        return (
                          <a
                            href={href}
                            onClick={(e) => {
                              e.preventDefault();
                              const id = href.substring(1);
                              const element = document.getElementById(id);
                              if (element) {
                                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                              }
                            }}
                            {...props}
                          >
                            {children}
                          </a>
                        );
                      }
                      return <a href={href} {...props}>{children}</a>;
                    },
                    h2({ children, ...props }: any) {
                      let text = String(children);

                      // Clean up "Topic:" or "**Topic**" or "**Solution**" prefixes
                      text = text.replace(/^\*\*Topic\*\*:\s*/, '').replace(/^Topic:\s*/, '');
                      text = text.replace(/^\*\*Solution\*\*:\s*/, 'Solution: ');

                      // Match TOC link format exactly:
                      // "1. Concept Overview & Motivation" -> "1-concept-overview--motivation"
                      let id = text.toLowerCase();

                      // Step 1: Handle number prefix "1. " -> "1-"
                      id = id.replace(/^(\d+)\.\s+/, '$1-');

                      // Step 2: Convert & to placeholder to preserve it
                      id = id.replace(/\s*&\s*/g, '__AND__');

                      // Step 3: Remove parentheses and other special chars (but keep hyphens and placeholder)
                      id = id.replace(/[^\w\s-]/g, '');

                      // Step 4: Convert spaces to single hyphen
                      id = id.replace(/\s+/g, '-');

                      // Step 5: Convert placeholder back to double hyphen
                      id = id.replace(/__AND__/g, '--');

                      // Step 6: Clean up any trailing/leading hyphens
                      id = id.replace(/^-+|-+$/g, '');

                      console.log('H2 ID generated:', text, '->', id);
                      return <h2 id={id} {...props}>{text}</h2>;
                    },
                    h3({ children, ...props }: any) {
                      let text = String(children);

                      // Clean up "**" artifacts
                      text = text.replace(/\*\*/g, '');

                      // Match TOC link format exactly:
                      // "Plain-Language Definition" -> "plain-language-definition"
                      let id = text.toLowerCase();

                      // Step 1: Convert & to placeholder to preserve it
                      id = id.replace(/\s*&\s*/g, '__AND__');

                      // Step 2: Remove parentheses and other special chars (but keep hyphens and placeholder)
                      id = id.replace(/[^\w\s-]/g, '');

                      // Step 3: Convert spaces to single hyphen
                      id = id.replace(/\s+/g, '-');

                      // Step 4: Convert placeholder back to double hyphen
                      id = id.replace(/__AND__/g, '--');

                      // Step 5: Clean up any trailing/leading hyphens
                      id = id.replace(/^-+|-+$/g, '');

                      console.log('H3 ID generated:', text, '->', id);
                      return <h3 id={id} {...props}>{text}</h3>;
                    },
                    p: ({ children }: any) => {


                      // Check for "Companies: " pattern (checking raw text approximation)
                      // If children is an array, we need to inspect it. 
                      // Simple check: if the rendered text starts with "Companies:"


                      if (Array.isArray(children)) {
                        // Case: **Companies**: Amazon
                        // children[0] might be <strong key="..">Companies</strong>
                        try {
                          const firstChild = children[0];
                          if (firstChild?.props?.children?.includes('Companies') ||
                            (typeof children[0] === 'string' && children[0].includes('Companies'))) {

                            const fullText = children.map((c: any) =>
                              typeof c === 'string' ? c : c.props?.children
                            ).join('');

                            if (fullText.includes('Companies:')) {
                              const companiesPart = fullText.split('Companies:')[1];
                              if (companiesPart) {
                                const companies = companiesPart.split(',').map((c: string) => c.trim());
                                return (
                                  <div className="company-tags-row">
                                    <span className="company-label">Companies:</span>
                                    {companies.map((company: string, i: number) => (
                                      <span key={i} className="company-badge">{company}</span>
                                    ))}
                                  </div>
                                );
                              }
                            }
                          }
                        } catch (e) {
                          // Fallback to default
                        }
                      } else if (typeof children === 'string' && children.startsWith('Companies:')) {
                        const companies = children.substring(10).split(',').map((c: string) => c.trim());
                        return (
                          <div className="company-tags-row">
                            <span className="company-label">Companies:</span>
                            {companies.map((company: string, i: number) => (
                              <span key={i} className="company-badge">{company}</span>
                            ))}
                          </div>
                        );
                      }

                      return <p>{children}</p>;
                    },
                  }}
                >
                  {part}
                </ReactMarkdown>
              );
            })}
          </>
        ) : (
          <div className="no-content">
            <p>Content coming soon...</p>
            <p className="hint">
              This topic will follow the Content_Methodology_v3_Framework with 10 comprehensive layers.
            </p>
          </div>
        )}
      </div>

      {/* Progress Status */}
      {progress && (
        <div className="progress-status">
          {progress.isCompleted ? (
            <div className="completed-badge">
              ✓ Completed on {new Date(progress.completedAt!).toLocaleDateString()}
            </div>
          ) : (
            <div className="in-progress-badge">
              {Math.round(progress.completionPercentage)}% Complete
            </div>
          )}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="topic-navigation">
        <div className="nav-buttons">
          <Button
            onClick={handlePrevious}
            variant="secondary"
            disabled={currentTopicIndex <= 0}
          >
            ← Previous Topic
          </Button>
          <Button
            onClick={handleNext}
            variant="secondary"
            disabled={currentTopicIndex >= allTopics.length - 1}
          >
            Next Topic →
          </Button>
        </div>
        {currentTopicIndex >= 0 && (
          <div className="nav-info">
            Topic {currentTopicIndex + 1} of {allTopics.length}
          </div>
        )}
      </div>

      {/* Practice Workspace */}
      <div className="practice-workspace-section">
        <h2>💻 Practice Workspace</h2>
        <p>Experiment with the concepts you just learned. Write and run your code here.</p>
        <CodeEditor
          language="java"
          initialCode={(() => {
            const savedCode = localStorage.getItem(`topic_code_${topic.id}`);
            return savedCode || `public class Main {
    public static void main(String[] args) {
        // Try writing some code here!
        System.out.println("Hello, World!");
    }
}`;
          })()}
          onChange={(newCode) => {
            if (newCode) {
              localStorage.setItem(`topic_code_${topic.id}`, newCode);
            }
          }}
          onExecute={async (code) => {
            // Mock execution for now (Backend controller missing)
            console.log('Executing code:', code);
            return new Promise(resolve => setTimeout(() => resolve({ output: "Hello, World!\n(backend execution service pending)" }), 1000));
          }}
        />
      </div>

      {/* Action Buttons */}
      <div className="topic-actions">
        <Button onClick={handleBack} variant="secondary">
          ← Back to Topics
        </Button>
        {progress && !progress.isCompleted && (
          <Button
            variant="primary"
            onClick={handleMarkComplete}
            disabled={markingComplete}
          >
            {markingComplete ? 'Marking...' : 'Mark as Complete'}
          </Button>
        )}
      </div>
      <BackToTop />

      {/* Notes Sidebar */}
      {topic && (
        <NotesSidebar
          topicId={topic.id}
          isOpen={isNotesOpen}
          onClose={() => setIsNotesOpen(false)}
        />
      )}

      {/* Floating Notes Toggle (if sidebar is closed) */}
      {!isNotesOpen && (
        <button
          className="notes-toggle-btn"
          onClick={() => setIsNotesOpen(true)}
          aria-label="Open Notes"
        >
          📝 Notes
        </button>
      )}
    </div >
  );
};
