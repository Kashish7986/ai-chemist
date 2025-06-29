'use client';

import React, { useState } from 'react';

interface Rule {
  // Define the properties of the Rule interface here
  // For example:
  id: string;
  name: string;
  source?: string;
}

interface NLPRuleConverterProps {
  onRuleConverted: (rule: Rule) => void;
}

export default function NLPRuleConverter({ onRuleConverted }: NLPRuleConverterProps) {
  const [nlpInput, setNlpInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/rules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nlpText: nlpInput, action: 'convert' }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to convert NLP to rule.');
      }

      const convertedRule: Rule = await res.json();
      onRuleConverted({ ...convertedRule, source: 'nlp' });
      setNlpInput(''); // Clear input on success
    } catch (err) {
      // Type the error as an unknown type
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
      console.error('NLP conversion error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <textarea
        value={nlpInput}
        onChange={(e) => setNlpInput(e.target.value)}
        placeholder="Enter NLP text here"
      />
      <button onClick={handleConvert} disabled={loading}>
        {loading ? 'Converting...' : 'Convert'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}








































// import { useState } from 'react';
// import Button from '@/components/common/Button';
// import Input from '@/components/common/Input';
// import { Rule } from '@/types';

// interface NLPRuleConverterProps {
//   onRuleConverted: (rule: Rule) => void;
// }

// export default function NLPRuleConverter({ onRuleConverted }: NLPRuleConverterProps) {
//   const [nlpInput, setNlpInput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleConvert = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch('/api/rules', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ nlpText: nlpInput, action: 'convert' }),
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.error || 'Failed to convert NLP to rule.');
//       }

//       const convertedRule: Rule = await res.json();
//       onRuleConverted({ ...convertedRule, source: 'nlp' });
//       setNlpInput(''); // Clear input on success
//     } catch (err: any) {
//       setError(err.message);
//       console.error('NLP conversion error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 border rounded-lg bg-gray-50 space-y-3">
//       <h4 className="text-lg font-medium">Natural Language to Rule Converter (AI)</h4>
//       <p className="text-sm text-gray-600">Describe your rule in plain English, and AI will convert it.</p>
//       <Input
//         type="textarea"
//         value={nlpInput}
//         onChange={(e) => setNlpInput(e.target.value)}
//         placeholder="e.g., 'Make sure sales workers are not overloaded in phase 2'"
//         rows={3}
//       />
//       {error && <p className="text-red-500 text-sm">{error}</p>}
//       <Button onClick={handleConvert} disabled={loading || !nlpInput.trim()}>
//         {loading ? 'Converting...' : 'Convert to Rule'}
//       </Button>
//     </div>
//   );
// }
