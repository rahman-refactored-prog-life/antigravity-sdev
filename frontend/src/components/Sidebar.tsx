import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import learningService from '../services/learningService';
import './Sidebar.css';

interface SidebarSection {
  id: string;
  moduleId: number;
  title: string;
  icon: string;
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

const MODULE_ICONS: Record<string, string> = {
  'JAVA': '☕',
  'DATA_STRUCTURES': '🗂️',
  'ALGORITHMS': '⚡',
  'SYSTEM_DESIGN': '🏗️',
  'DATABASES': '🗄️',
  'DEFAULT': '📚'
};

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed = false, onToggle }) => {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [sections, setSections] = useState<SidebarSection[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Modules and Topics
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        // 1. Fetch Modules
        const modules = await learningService.getAllModules();

        // 2. Fetch Topics for each module
        const sectionsData = await Promise.all(
          modules.map(async (module) => {
            let topics: SidebarItem[] = [];
            try {
              // Fetch all topics (page 0, large size)
              const topicsResponse = await learningService.getTopicsByModule(
                module.id, 0, 100, 'orderIndex', 'ASC'
              );

              topics = topicsResponse.content.map(topic => ({
                id: topic.id.toString(),
                title: topic.title,
                completed: false, // TODO: Implement progress tracking
                locked: false     // TODO: Implement locking logic
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
              progress: 0 // TODO: Calculate real progress
            };
          })
        );

        // Sort sections by orderIndex if available, otherwise just use fetch order
        // Assuming modules come sorted from backend or we could sort here
        setSections(sectionsData);

        // Auto-expand the first section if it has items
        if (sectionsData.length > 0 && sectionsData[0].items.length > 0) {
          setExpandedSections([sectionsData[0].id]);
        }
      } catch (error) {
        console.error('Failed to load sidebar content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleModuleClick = (section: SidebarSection) => {
    // If it's the Java module (or any specific landing page), navigate there
    // Otherwise just toggle
    if (section.id === 'java') {
      navigate('/modules/java');
    } else {
      toggleSection(section.id);
    }
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        {!isCollapsed && <h2 className="sidebar-title">Learning Path</h2>}
        <button className="sidebar-toggle" onClick={onToggle} aria-label="Toggle sidebar">
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      {/* Sidebar Content */}
      <nav className="sidebar-nav">
        {loading && !isCollapsed && <div style={{ padding: '20px', color: '#888' }}>Loading path...</div>}

        {!loading && sections.map((section) => (
          <div key={section.id} className="sidebar-section">
            {/* Section Header */}
            <div className={`section-header ${expandedSections.includes(section.id) ? 'expanded' : ''}`}>
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  color: 'inherit'
                }}
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
                <span
                  className="section-arrow"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSection(section.id);
                  }}
                  style={{ cursor: 'pointer', padding: '0 8px' }}
                >
                  {expandedSections.includes(section.id) ? '▼' : '▶'}
                </span>
              )}
            </div>

            {/* Progress Bar */}
            {!isCollapsed && (
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${section.progress}%` }}
                ></div>
              </div>
            )}

            {/* Section Items */}
            {!isCollapsed && expandedSections.includes(section.id) && (
              <ul className="section-items">
                {section.items.map((item) => (
                  <li key={item.id} className="section-item">
                    <button
                      onClick={() => navigate(`/topics/${item.id}`)}
                      className={`item-link ${item.completed ? 'completed' : ''} ${item.locked ? 'locked' : ''
                        }`}
                      disabled={item.locked}
                      style={{
                        background: 'none',
                        border: 'none',
                        width: '100%',
                        textAlign: 'left',
                        cursor: item.locked ? 'not-allowed' : 'pointer',
                        color: 'inherit',
                        padding: '8px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <span className="item-status">
                        {item.completed ? '✓' : item.locked ? '🔒' : '○'}
                      </span>
                      <span className="item-title">{item.title}</span>
                    </button>
                  </li>
                ))}
                {section.items.length === 0 && (
                  <li className="section-item" style={{ padding: '8px 12px', color: '#666', fontStyle: 'italic' }}>
                    Coming soon
                  </li>
                )}
              </ul>
            )}
          </div>
        ))}
      </nav>

      {/* Overall Progress */}
      {!isCollapsed && (
        <div className="sidebar-footer">
          <div className="overall-progress">
            <div className="progress-label">Overall Progress</div>
            <div className="progress-stats">1 / 100 topics</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '1%' }}></div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
