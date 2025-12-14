import React, { useEffect, useRef, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-sql';
import './CodeBlock.css';

export type CodeLanguage = 'java' | 'javascript' | 'python' | 'c' | 'cpp' | 'sql';

interface CodeBlockProps {
  code: string;
  language: CodeLanguage;
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
  theme?: 'light' | 'dark';
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  showLineNumbers = true,
  showCopyButton = true,
  theme = 'dark',
  className = '',
}) => {
  const codeRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, language]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const lines = code.split('\n');

  return (
    <div className={`code-block code-block--${theme} ${className}`}>
      {showCopyButton && (
        <button
          className="code-block__copy"
          onClick={handleCopy}
          aria-label="Copy code"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      )}
      <pre className={showLineNumbers ? 'line-numbers' : ''}>
        <code ref={codeRef} className={`language-${language}`}>
          {code}
        </code>
      </pre>
      {showLineNumbers && (
        <div className="code-block__line-numbers">
          {lines.map((_, index) => (
            <div key={index} className="code-block__line-number">
              {index + 1}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
