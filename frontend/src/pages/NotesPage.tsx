import React, { useState, useEffect } from 'react';
import learningService, { type LearningModule, type Topic } from '../services/learningService';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import { Search } from '../components/Search';
import './NotesPage.css';

interface NoteEntry {
  topicId: number;
  topicTitle: string;
  moduleId: number;
  moduleName: string;
  content: string;
  lastModified: Date;
  wordCount: number;
}

export const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<NoteEntry[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<NoteEntry[]>([]);
  const [modules, setModules] = useState<LearningModule[]>([]);
  // Topics map for future use if needed
  // const [topics, setTopics] = useState<Map<number, Topic>>(new Map());
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'module' | 'length'>('date');

  useEffect(() => {
    loadNotesData();
  }, []);

  useEffect(() => {
    filterAndSortNotes();
  }, [notes, searchTerm, selectedModule, sortBy]);

  const loadNotesData = async () => {
    try {
      setLoading(true);
      
      // Load all modules
      const modulesList = await learningService.getAllModules();
      setModules(modulesList);
      
      // Load all topics for each module
      const topicsMap = new Map<number, Topic>();
      const allNotes: NoteEntry[] = [];
      
      for (const module of modulesList) {
        try {
          const topicsResponse = await learningService.getTopicsByModule(module.id, 0, 100);
          
          for (const topic of topicsResponse.content) {
            topicsMap.set(topic.id, topic);
            
            // Check if there's a note for this topic
            const noteContent = localStorage.getItem(`topic_note_${topic.id}`);
            if (noteContent && noteContent.trim()) {
              allNotes.push({
                topicId: topic.id,
                topicTitle: topic.title,
                moduleId: module.id,
                moduleName: module.name,
                content: noteContent,
                lastModified: new Date(localStorage.getItem(`topic_note_${topic.id}_timestamp`) || Date.now()),
                wordCount: noteContent.trim().split(/\s+/).length
              });
            }
          }
        } catch (error) {
          console.error(`Error loading topics for module ${module.name}:`, error);
        }
      }
      
      // setTopics(topicsMap); // Store for future use if needed
      setNotes(allNotes);
    } catch (error) {
      console.error('Error loading notes data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortNotes = () => {
    let filtered = [...notes];
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(note => 
        note.topicTitle.toLowerCase().includes(term) ||
        note.moduleName.toLowerCase().includes(term) ||
        note.content.toLowerCase().includes(term)
      );
    }
    
    // Filter by module
    if (selectedModule) {
      filtered = filtered.filter(note => note.moduleId === selectedModule);
    }
    
    // Sort notes
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return b.lastModified.getTime() - a.lastModified.getTime();
        case 'module':
          return a.moduleName.localeCompare(b.moduleName) || a.topicTitle.localeCompare(b.topicTitle);
        case 'length':
          return b.wordCount - a.wordCount;
        default:
          return 0;
      }
    });
    
    setFilteredNotes(filtered);
  };

  const handleDeleteNote = (topicId: number) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      localStorage.removeItem(`topic_note_${topicId}`);
      localStorage.removeItem(`topic_note_${topicId}_timestamp`);
      setNotes(prev => prev.filter(note => note.topicId !== topicId));
    }
  };

  const handleExportNotes = () => {
    const exportData = filteredNotes.map(note => ({
      module: note.moduleName,
      topic: note.topicTitle,
      content: note.content,
      lastModified: note.lastModified.toISOString(),
      wordCount: note.wordCount
    }));
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `learning-notes-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const truncateContent = (content: string, maxLength: number = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="notes-page">
      <div className="notes-header">
        <div className="header-content">
          <h1>📝 My Learning Notes</h1>
          <p>All your learning notes, insights, and key takeaways organized in one place.</p>
        </div>
        
        <div className="header-stats">
          <div className="stat-item">
            <span className="stat-number">{notes.length}</span>
            <span className="stat-label">Total Notes</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{notes.reduce((sum, note) => sum + note.wordCount, 0)}</span>
            <span className="stat-label">Total Words</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{new Set(notes.map(n => n.moduleId)).size}</span>
            <span className="stat-label">Modules</span>
          </div>
        </div>
      </div>

      <div className="notes-controls">
        <div className="search-filter-row">
          <Search
            placeholder="Search notes, topics, or modules..."
            onSearch={setSearchTerm}
          />
          
          <select 
            value={selectedModule || ''} 
            onChange={(e) => setSelectedModule(e.target.value ? Number(e.target.value) : null)}
            className="module-filter"
          >
            <option value="">All Modules</option>
            {modules.map(module => (
              <option key={module.id} value={module.id}>{module.name}</option>
            ))}
          </select>
          
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value as 'date' | 'module' | 'length')}
            className="sort-select"
          >
            <option value="date">Sort by Date</option>
            <option value="module">Sort by Module</option>
            <option value="length">Sort by Length</option>
          </select>
        </div>
        
        <div className="action-buttons">
          <Button variant="secondary" onClick={loadNotesData}>
            🔄 Refresh
          </Button>
          {filteredNotes.length > 0 && (
            <Button variant="primary" onClick={handleExportNotes}>
              📥 Export Notes
            </Button>
          )}
        </div>
      </div>

      <div className="notes-content">
        {filteredNotes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3>No notes found</h3>
            <p>
              {notes.length === 0 
                ? "You haven't created any notes yet. Start taking notes while studying topics!"
                : "No notes match your current filters. Try adjusting your search or filters."
              }
            </p>
          </div>
        ) : (
          <div className="notes-grid">
            {filteredNotes.map((note) => (
              <Card key={note.topicId} className="note-card">
                <div className="note-header">
                  <div className="note-meta">
                    <span className="module-badge">{note.moduleName}</span>
                    <span className="topic-title">{note.topicTitle}</span>
                  </div>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDeleteNote(note.topicId)}
                    title="Delete note"
                  >
                    🗑️
                  </button>
                </div>
                
                <div className="note-content">
                  <p>{truncateContent(note.content)}</p>
                </div>
                
                <div className="note-footer">
                  <div className="note-stats">
                    <span>{note.wordCount} words</span>
                    <span>•</span>
                    <span>{formatDate(note.lastModified)}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => window.open(`/topics/${note.topicId}`, '_blank')}
                  >
                    View Topic →
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
