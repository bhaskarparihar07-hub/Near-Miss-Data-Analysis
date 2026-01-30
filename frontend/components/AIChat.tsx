'use client';

import { useState } from 'react';
import { api } from '@/lib/api';

export default function AIChat() {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!question.trim()) return;

        setLoading(true);
        setError('');
        setAnswer('');

        try {
            const response: any = await api.queryAI(question);
            if (response.success) {
                setAnswer(response.data.answer);
            } else {
                setError(response.error || 'Failed to get answer');
            }
        } catch (err: any) {
            setError(err.message || 'Failed to connect to AI service');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span>🤖</span>
                <span>AI Assistant</span>
            </h3>

            <form onSubmit={handleSubmit} className="mb-4">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Ask about the incident data..."
                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        disabled={loading || !question.trim()}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? 'Thinking...' : 'Ask'}
                    </button>
                </div>
            </form>

            {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
                    <p className="font-semibold">Error:</p>
                    <p>{error}</p>
                    {error.includes('not configured') && (
                        <p className="mt-2 text-xs">
                            💡 To enable AI features, set GEMINI_API_KEY in backend/.env
                        </p>
                    )}
                </div>
            )}

            {answer && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <p className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">Answer:</p>
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{answer}</p>
                </div>
            )}

            <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                <p className="font-semibold mb-1">Example questions:</p>
                <ul className="list-disc list-inside space-y-1">
                    <li>What were the most common incidents in 2024?</li>
                    <li>Which region has the highest severity incidents?</li>
                    <li>Show me trends for dropped objects</li>
                    <li>What safety recommendations do you have?</li>
                </ul>
            </div>
        </div>
    );
}
