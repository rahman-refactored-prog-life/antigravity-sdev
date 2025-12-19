import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { CodeEditor } from './CodeEditor';
import './PracticeSidebar.css';

interface PracticeSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export const PracticeSidebar: React.FC<PracticeSidebarProps> = ({ isOpen, onClose }) => {
    const { topicId } = useParams<{ topicId: string }>();
    const location = useLocation();
    const [code, setCode] = useState('');

    // Determine context (Topic specific or General Scratchpad)
    const isTopicContext = !!topicId && location.pathname.includes('/topics/');
    const storageKey = isTopicContext
        ? `topic_code_${topicId}`
        : 'global_scratchpad_code';

    useEffect(() => {
        // Load saved code on open or context change
        const savedCode = localStorage.getItem(storageKey);
        if (savedCode) {
            setCode(savedCode);
        } else {
            // Default templates
            setCode(isTopicContext
                ? `public class Solution {\n    public static void main(String[] args) {\n        // Write your solution for Topic ${topicId} here\n        System.out.println("Hello from Topic ${topicId}!");\n    }\n}`
                : `public class Main {\n    public static void main(String[] args) {\n        // Java Scratchpad\n        System.out.println("Hello, World!");\n    }\n}`
            );
        }
    }, [topicId, isTopicContext, storageKey]);

    const handleCodeChange = (newCode: string | undefined) => {
        if (newCode !== undefined) {
            setCode(newCode);
            localStorage.setItem(storageKey, newCode);
        }
    };

    const executeCode = async (_codeToRun: string): Promise<{ output: string; error?: string }> => {
        return new Promise((resolve) => {
            // Simulation of backend execution
            setTimeout(() => {
                resolve({
                    output: `> Execution Complete\n\n${isTopicContext ? `[Topic ${topicId} Environment]` : '[Global Environment]'}\nOutput:\nHello, World!\n(Backend execution pending implementation)`
                });
            }, 1000);
        });
    };

    return (
        <div className={`practice-sidebar ${isOpen ? 'open' : ''}`}>
            <div className="practice-header">
                <h3>{isTopicContext ? '💻 Practice Mode' : '📝 Java Scratchpad'}</h3>
                <button className="close-btn" onClick={onClose}>×</button>
            </div>

            <div className="practice-content">
                <div className="editor-container">
                    <CodeEditor
                        language="java"
                        initialCode={code}
                        onChange={handleCodeChange}
                        onExecute={executeCode}
                    />
                </div>
            </div>
        </div>
    );
};
