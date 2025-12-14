import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import './CodeEditor.css';

interface CodeEditorProps {
  language?: string;
  initialCode?: string;
  onExecute?: (code: string) => Promise<{ output: string; error?: string }>;
  onChange?: (code: string) => void;
  readOnly?: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  language = 'java',
  initialCode = '',
  onExecute,
  onChange,
  readOnly = false,
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);

  const handleEditorChange = (value: string | undefined) => {
    const newCode = value || '';
    setCode(newCode);
    if (onChange) {
      onChange(newCode);
    }
  };

  const handleExecute = async () => {
    if (!onExecute) return;

    setIsExecuting(true);
    setOutput('Executing...');

    try {
      const result = await onExecute(code);
      setOutput(result.output || result.error || 'No output');
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="code-editor-container">
      <div className="code-editor-header">
        <span className="language-badge">{language.toUpperCase()}</span>
        {onExecute && (
          <button
            className="execute-button"
            onClick={handleExecute}
            disabled={isExecuting || readOnly}
          >
            {isExecuting ? '⏳ Running...' : '▶️ Run Code'}
          </button>
        )}
      </div>

      <div className="monaco-wrapper">
        <Editor
          height="400px"
          defaultLanguage={language.toLowerCase()}
          language={language.toLowerCase()}
          value={code}
          theme="vs-dark"
          onChange={handleEditorChange}
          options={{
            readOnly: readOnly,
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 16, bottom: 16 },
            fontFamily: "'Fira Code', 'Droid Sans Mono', 'monospace'",
          }}
        />
      </div>

      {output && (
        <div className="code-output">
          <div className="output-header">Output:</div>
          <pre className="output-content">{output}</pre>
        </div>
      )}
    </div>
  );
};

