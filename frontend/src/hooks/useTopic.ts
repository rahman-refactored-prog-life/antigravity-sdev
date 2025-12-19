import { useState, useEffect, useMemo } from 'react';
import learningService, { type Topic } from '../services/learningService';
import progressService, { type TopicProgress } from '../services/progressService';

export const useTopic = (topicId: number) => {
    const [topic, setTopic] = useState<Topic | null>(null);
    const [progress, setProgress] = useState<TopicProgress | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadTopic(topicId);
    }, [topicId]);

    const loadTopic = async (id: number) => {
        try {
            setLoading(true);
            setError(null);
            const topicData = await learningService.getTopicById(id);
            setTopic(topicData);

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

    const { processedContent, codeBlockGroups } = useMemo(() => {
        if (!topic?.content) {
            return { processedContent: '', codeBlockGroups: [] };
        }

        const cleanContent = topic.content.replace(/^(?:# [^\n]+\n+)?(?:(?:Topic|Phase|Category|Difficulty|Estimated Time|Prerequisites):[^\n]*\n+)+/g, '');

        const lines = cleanContent.split('\n');
        const groups: { language: string; code: string; startLine: number; endLine: number }[][] = [];
        let currentGroup: { language: string; code: string; startLine: number; endLine: number }[] = [];
        let inCodeBlock = false;
        let codeBlockStart = -1;
        let currentLanguage = '';
        let currentCode: string[] = [];
        let lastCodeBlockEnd = -1;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (line.trim().startsWith('```')) {
                if (!inCodeBlock) {
                    inCodeBlock = true;
                    codeBlockStart = i;
                    currentLanguage = line.trim().substring(3).trim() || 'plaintext';
                    currentCode = [];

                    const languageExists = currentGroup.some(item => item.language === currentLanguage);
                    if (lastCodeBlockEnd >= 0 && (i - lastCodeBlockEnd) <= 3 && currentGroup.length > 0 && !languageExists) {
                        // Continue group
                    } else {
                        if (currentGroup.length > 0) groups.push([...currentGroup]);
                        currentGroup = [];
                    }
                } else {
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
        if (currentGroup.length > 0) groups.push(currentGroup);

        const multiLangGroups = groups.filter(group => group.length > 1);

        const newLines: string[] = [];
        let lineIdx = 0;
        const groupStarts = new Map<number, number>();
        multiLangGroups.forEach((group, idx) => {
            groupStarts.set(group[0].startLine, idx);
        });

        while (lineIdx < lines.length) {
            if (groupStarts.has(lineIdx)) {
                const groupIndex = groupStarts.get(lineIdx)!;
                const group = multiLangGroups[groupIndex];
                newLines.push(`\n\n__CODE_TABS_${groupIndex}__\n\n`);
                lineIdx = group[group.length - 1].endLine + 1;
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

    return { topic, progress, loading, error, processedContent, codeBlockGroups, setProgress };
};
