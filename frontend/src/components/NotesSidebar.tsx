
import React, { useState, useEffect } from 'react';
import './NotesSidebar.css';

interface NotesSidebarProps {
    topicId: number;
    isOpen: boolean;
    onClose: () => void;
}

export const NotesSidebar: React.FC<NotesSidebarProps> = ({ topicId, isOpen, onClose }) => {
    const [note, setNote] = useState('');
    const [savedStatus, setSavedStatus] = useState('');

    useEffect(() => {
        // Load note from local storage
        if (topicId) {
            const savedNote = localStorage.getItem(`topic_note_${topicId}`);
            if (savedNote) {
                setNote(savedNote);
            } else {
                setNote('');
            }
        }
    }, [topicId]);

    const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newNote = e.target.value;
        setNote(newNote);

        // Auto-save debounced would be better, but simple save is fine for now
        localStorage.setItem(`topic_note_${topicId}`, newNote);
        localStorage.setItem(`topic_note_${topicId}_timestamp`, Date.now().toString());
        setSavedStatus('Saved');
        setTimeout(() => setSavedStatus(''), 2000);
    };

    return (
        <div className={`notes-sidebar ${isOpen ? 'open' : ''}`}>
            <div className="notes-header">
                <h3>📝 My Notes</h3>
                <button className="close-btn" onClick={onClose}>×</button>
            </div>
            <div className="notes-content">
                <textarea
                    value={note}
                    onChange={handleNoteChange}
                    placeholder="Jot down your key learnings, questions, or algorithm patterns here..."
                />
            </div>
            <div className="notes-footer">
                <span className="save-status">{savedStatus}</span>
                <button className="clear-btn" onClick={() => {
                    if (window.confirm('Clear all notes for this topic?')) {
                        setNote('');
                        localStorage.removeItem(`topic_note_${topicId}`);
                        localStorage.removeItem(`topic_note_${topicId}_timestamp`);
                    }
                }}>Clear</button>
            </div>
        </div>
    );
};
