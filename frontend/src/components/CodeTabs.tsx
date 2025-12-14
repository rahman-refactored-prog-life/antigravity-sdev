import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import './CodeTabs.css';

interface CodeTabsProps {
  solutions: {
    language: string;
    code: string;
  }[];
  title?: string;
  readOnly?: boolean;
}

export const CodeTabs: React.FC<CodeTabsProps> = ({ 
  solutions, 
  title = 'Solution',
  readOnly = true 
}) => {
  const [activeTab, setActiveTab] = useState(0);

  if (!solutions || solutions.length === 0) {
    return null;
  }

  const getLanguageId = (lang: string): string => {
    const langMap: { [key: string]: string } = {
      'java': 'java',
      'javascript': 'javascript',
      'python': 'python',
      'c++': 'cpp',
      'c': 'c',
      'go': 'go',
      'typescript': 'typescript',
      'sql': 'sql'
    };
    return langMap[lang.toLowerCase()] || 'plaintext';
  };

  return (
    <div className="code-tabs">
      {title && <h4 className="code-tabs-title">{title}</h4>}
      
      {/* Tab Headers */}
      <div className="code-tabs-header">
        {solutions.map((solution, index) => (
          <button
            key={index}
            className={`code-tab ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {solution.language}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="code-tabs-content">
        <Editor
          height="400px"
          language={getLanguageId(solutions[activeTab].language)}
          value={solutions[activeTab].code}
          theme="vs-dark"
          options={{
            readOnly: readOnly,
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
          }}
        />
      </div>
    </div>
  );
};
