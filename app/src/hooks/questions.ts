// hooks/useQuestions.ts
import { useState, useEffect } from 'react';

export function useQuestions() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch('http://localhost:3000/api/quiz');
        if (!response.ok) {
          throw new Error('Erreur de réseau');
        }
        const data = await response.json();
        setQuestions(data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message || 'Une erreur est survenue');
        setLoading(false);
      }
    }

    fetchQuestions();
  }, []);

  return { questions, loading, error };
}
