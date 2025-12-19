import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Coffee,
  Layers,
  Server,
  Database,
  BookOpen,
  ChevronRight,
  ChevronDown,
  ChevronsLeft,
  CheckCircle,
  Lock,
  Book,
} from 'lucide-react';
import learningService from '../services/learningService';
import './Sidebar.css';

interface SidebarSection {
  id: string;
  moduleId: number;
  title: string;
  icon: React.ReactNode;
  items: SidebarItem[];
  progress: number;
}

interface SidebarItem {
  id: string;
  title: string;
  completed: boolean;
  locked?: boolean;
}

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

interface TocItem {
  slug: string;
  text: string;
}

// Utility to strip emojis/symbols (Round 10)
const removeEmojis = (text: string): string => {
  return text
    .replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '')
    .trim();
};

const MODULE_ICONS: Record<string, React.ReactNode> = {
  'JAVA': <Coffee size={18} />,
  'DATA_STRUCTURES': <Layers size={18} />,
  'ALGORITHMS': <Server size={18} />,
  'SYSTEM_DESIGN': <Server size={18} />,
  'DATABASES': <Database size={18} />,
  'DEFAULT': <BookOpen size={18} />
};

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed = false, onToggle }) => {
  const navigate = useNavigate();
  const { topicId } = useParams<{ topicId: string }>();

  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());
  const [sections, setSections] = useState<SidebarSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTopicToc, setActiveTopicToc] = useState<TocItem[]>([]);

  // Fetch Modules and Topics
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const modules = await learningService.getAllModules();

        const sectionsData = await Promise.all(
          modules.map(async (module) => {
            let topics: SidebarItem[] = [];
            try {
              const topicsResponse = await learningService.getTopicsByModule(
                module.id, 0, 100, 'orderIndex', 'ASC'
              );
              topics = topicsResponse.content.map(topic => ({
                id: topic.id.toString(),
                title: topic.title,
                completed: false,
                locked: false
              }));
            } catch (err) {
              console.error(`Failed to fetch topics for module ${module.id}`, err);
            }

            return {
              id: module.type.toLowerCase(),
              moduleId: module.id,
              title: module.name,
              icon: MODULE_ICONS[module.type] || MODULE_ICONS['DEFAULT'],
              items: topics,
              progress: 0
            };
          })
        );

        setSections(sectionsData);
      } catch (error) {
        console.error('Failed to load sidebar content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  // Fetch TOC for active topic
  useEffect(() => {
    if (!topicId) {
      setActiveTopicToc([]);
      return;
    }

    const fetchTopicContent = async () => {
      try {
        const topicData = await learningService.getTopicById(parseInt(topicId));
        if (topicData?.content) {
          const lines = topicData.content.split('\n');
          const headers: TocItem[] = [];
          lines.forEach(line => {
            if (line.startsWith('## ')) {
              // Round 10: Clean Emojis
              const rawText = line.replace('## ', '').trim();
              const text = removeEmojis(rawText);
              const slug = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
              headers.push({ slug, text });
            }
          });
          setActiveTopicToc(headers);
        }
      } catch (e) {
        console.error("Failed to fetch topic TOC", e);
      }
    };

    fetchTopicContent();
  }, [topicId, sections]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(topicId)) {
        next.delete(topicId);
      } else {
        next.add(topicId);
      }
      return next;
    });
  };

  const handleModuleClick = (section: SidebarSection) => {
    if (section.id === 'java') {
      navigate('/modules/java');
    } else {
      toggleSection(section.id);
    }
  };

  const handleTocClick = (e: React.MouseEvent, slug: string) => {
    e.stopPropagation();
    navigate(`/topics/${topicId}?section=${activeTopicToc.findIndex(t => t.slug === slug) + 1}`);
  };

  const isTopicActive = (tid: string) => topicId === tid;

  return (
    <aside className={`sidebar ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="sidebar-header">
        {!isCollapsed && <h2 className="sidebar-title">Learning Path</h2>}
        <button className="sidebar-toggle" onClick={onToggle} aria-label="Toggle sidebar">
          <ChevronsLeft size={20} />
        </button>
      </div>

      <nav className="sidebar-nav">
        {loading && !isCollapsed && <div className="sidebar-loading">Loading path...</div>}

        {!loading && sections.map((section) => (
          <div key={section.id} className="sidebar-section">
            <div className={`section-header ${expandedSections.includes(section.id) ? 'expanded' : ''}`}>
              <button
                className="section-button"
                onClick={() => handleModuleClick(section)}
              >
                <span className="section-icon">{section.icon}</span>
                {!isCollapsed && (
                  <>
                    <span className="section-title">{section.title}</span>
                    <span className="section-progress">{section.progress}%</span>
                  </>
                )}
              </button>
              {!isCollapsed && section.items.length > 0 && (
                <button
                  className="section-arrow-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSection(section.id);
                  }}
                >
                  {expandedSections.includes(section.id) ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>
              )}
            </div>

            {!isCollapsed && (
              <div className="progress-bar-container">
                <div
                  className="progress-fill"
                  style={{ width: `${section.progress}%` }}
                ></div>
              </div>
            )}

            {!isCollapsed && expandedSections.includes(section.id) && (
              <ul className="section-items">
                {section.items.map((item) => {
                  const isActive = isTopicActive(item.id);
                  const isTopicExpanded = expandedTopics.has(item.id);

                  return (
                    <li key={item.id} className={`section-item-wrapper ${isActive ? 'active-topic' : ''}`}>
                      <div className="topic-header-row" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        {/* Toggle Button for Topic (Merged Click Logic) */}
                        <button
                          className={`topic-toggle-btn ${isTopicExpanded ? 'expanded' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isActive) {
                              toggleTopic(item.id); // Round 11: Toggle Open/Close if active
                            } else {
                              toggleTopic(item.id); // Open
                              navigate(`/topics/${item.id}`);
                            }
                          }}
                          style={{ padding: '0 4px', background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', opacity: 0.7, marginRight: 4 }}
                        >
                          {isActive && activeTopicToc.length > 0 ? (
                            isTopicExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />
                          ) : (
                            <span style={{ display: 'inline-block', width: 12 }}></span>
                          )}
                        </button>

                        <button
                          onClick={() => {
                            if (isActive) {
                              toggleTopic(item.id); // Round 11: Toggle Open/Close if active
                            } else {
                              toggleTopic(item.id); // Open
                              navigate(`/topics/${item.id}`);
                            }
                          }}
                          className={`item-link ${item.completed ? 'completed' : ''} ${item.locked ? 'locked' : ''} ${isActive ? 'active' : ''}`}
                          disabled={item.locked}
                          style={{ flex: 1 }}
                        >
                          <div className="item-icon-wrapper">
                            {item.completed ?
                              <CheckCircle size={14} className="icon-completed" /> :
                              item.locked ? <Lock size={14} className="icon-locked" /> :
                                <Book size={14} className={`icon-default ${isActive ? 'active-circle' : ''}`} />
                            }
                          </div>
                          <span className="item-title">{item.title}</span>
                        </button>
                      </div>

                      {/* Render TOC if Expanded */}
                      {isActive && isTopicExpanded && activeTopicToc.length > 0 && (
                        <ul className="topic-toc">
                          {activeTopicToc.map((h) => (
                            <li key={h.slug} className="toc-item">
                              <button
                                onClick={(e) => handleTocClick(e, h.slug)}
                                className="toc-link"
                              >
                                <span className="toc-text">{h.text}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  )
                })}
                {section.items.length === 0 && (
                  <li className="section-item empty-state">
                    Coming soon
                  </li>
                )}
              </ul>
            )}
          </div>
        ))}
      </nav>

      {!isCollapsed && (
        <div className="sidebar-footer">
          <div className="overall-progress">
            <div className="progress-label">Overall Progress</div>
            <div className="progress-stats">1 / 100 topics</div>
            <div className="progress-bar-container">
              <div className="progress-fill" style={{ width: '1%' }}></div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
