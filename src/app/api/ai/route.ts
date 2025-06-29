import { NextRequest, NextResponse } from 'next/server';
import { callAI } from '@/lib/ai/aiService';
import { Rule, ValidationError, Client, Worker, Task} from '@/types/index';

export const runtime = 'edge';

// Define all required interfaces locally
interface RuleSuggestion {
  type: Rule['type'];
  description: string;
  config: Rule['config'];
}

interface CorrectionSuggestion {
  suggestion: string;
  fixValue?: string | number;
}

interface NLPRequest {
  nlpText: string;
}

interface CorrectionRequest {
  error: ValidationError;
  rowData: Record<string, unknown>;
}

interface RulesRequest {
  clients: Client[];
  workers: Worker[];
  tasks: Task[];
}

interface SearchRequest {
  query: string;
  dataset: string;
}

export async function POST(req: NextRequest) {
  try {
    const { action, data } = await req.json();

    if (!action) {
      return NextResponse.json(
        { error: 'Action parameter is required' },
        { status: 400 }
      );
    }

    switch (action) {
      case 'nlp-to-rule': {
        const { nlpText } = data as NLPRequest;
        if (typeof nlpText !== 'string') {
          return NextResponse.json(
            { error: 'nlpText must be a string' },
            { status: 400 }
          );
        }

        const result = await callAI<Omit<Rule, 'id' | 'source' | 'createdAt'>>(
          'convert_nlp_to_rule', 
          { nlpText }
        );
        
        if (!result.success || !result.data) {
          return NextResponse.json(
            { error: result.error || 'Failed to convert NLP to rule' },
            { status: 400 }
          );
        }

        const rule: Rule = {
          ...result.data,
          id: `rule-${Date.now()}`,
          source: 'nlp',
          createdAt: new Date().toISOString()
        };

        return NextResponse.json(rule);
      }

      case 'suggest-corrections': {
        const { error, rowData } = data as CorrectionRequest;
        if (!error || !rowData) {
          return NextResponse.json(
            { error: 'Valid error and rowData are required' },
            { status: 400 }
          );
        }

        const result = await callAI<CorrectionSuggestion>(
          'suggest_data_correction',
          { error, rowData }
        );
        
        return NextResponse.json({
          success: result.success,
          suggestion: result.data?.suggestion || null,
          fixValue: result.data?.fixValue || null
        });
      }

      case 'suggest-rules': {
        const { clients, workers, tasks } = data as RulesRequest;
        if (!clients || !workers || !tasks) {
          return NextResponse.json(
            { error: 'Valid clients, workers and tasks arrays are required' },
            { status: 400 }
          );
        }

        const result = await callAI<RuleSuggestion[]>(
          'suggest_rules_from_data',
          { clients, workers, tasks }
        );
        
        if (!result.success) {
          return NextResponse.json(
            { error: result.error || 'Failed to generate rule suggestions' },
            { status: 400 }
          );
        }

        const suggestions: Rule[] = (result.data || []).map((rule) => ({
          ...rule,
          id: `suggestion-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          source: 'aiSuggestion',
          createdAt: new Date().toISOString()
        }));

        return NextResponse.json(suggestions);
      }

      case 'natural-search': {
        const { query, dataset } = data as SearchRequest;
        if (typeof query !== 'string' || typeof dataset !== 'string') {
          return NextResponse.json(
            { error: 'Query and dataset must be strings' },
            { status: 400 }
          );
        }

        return NextResponse.json({
          query,
          results: [] as string[],
          generatedQuery: ''
        });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid action specified' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('AI API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}













// import { NextRequest, NextResponse } from 'next/server';
// import { callAI } from '@/lib/ai/aiService';
// import { Rule, ValidationError } from '@/types';

// export const runtime = 'edge'; // Optional: Use Vercel's Edge Runtime for faster responses

// export async function POST(req: NextRequest) {
//   try {
//     const { action, data } = await req.json();

//     if (!action) {
//       return NextResponse.json(
//         { error: 'Action parameter is required' },
//         { status: 400 }
//       );
//     }

//     // Handle different AI actions
//     switch (action) {
//       case 'nlp-to-rule': {
//         if (!data?.nlpText) {
//           return NextResponse.json(
//             { error: 'nlpText is required for this action' },
//             { status: 400 }
//           );
//         }

//         const result = await callAI('convert_nlp_to_rule', { nlpText: data.nlpText });
        
//         if (!result.success) {
//           return NextResponse.json(
//             { error: result.error || 'Failed to convert natural language to rule' },
//             { status: 400 }
//           );
//         }

//         const rule: Rule = {
//           ...result.data,
//           id: `rule-${Date.now()}`,
//           source: 'ai-nlp',
//           createdAt: new Date().toISOString()
//         };

//         return NextResponse.json(rule);
//       }

//       case 'suggest-corrections': {
//         if (!data?.error || !data?.rowData) {
//           return NextResponse.json(
//             { error: 'Error and rowData are required for this action' },
//             { status: 400 }
//           );
//         }

//         const error = data.error as ValidationError;
//         const rowData = data.rowData;

//         const result = await callAI('suggest_data_correction', { error, rowData });
        
//         return NextResponse.json({
//           success: result.success,
//           suggestion: result.data?.suggestion || null,
//           fixValue: result.data?.fixValue || null
//         });
//       }

//       case 'suggest-rules': {
//         if (!data?.clients || !data?.workers || !data?.tasks) {
//           return NextResponse.json(
//             { error: 'Client, worker and task data are required for this action' },
//             { status: 400 }
//           );
//         }

//         const result = await callAI('suggest_rules_from_data', data);
        
//         if (!result.success) {
//           return NextResponse.json(
//             { error: result.error || 'Failed to generate rule suggestions' },
//             { status: 400 }
//           );
//         }

//         const suggestions: Rule[] = (result.data || []).map((rule: any) => ({
//           ...rule,
//           id: `suggestion-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
//           source: 'ai-suggestion',
//           createdAt: new Date().toISOString()
//         }));

//         return NextResponse.json(suggestions);
//       }

//       case 'natural-search': {
//         if (!data?.query || !data?.dataset) {
//           return NextResponse.json(
//             { error: 'Query and dataset are required for this action' },
//             { status: 400 }
//           );
//         }

//         // This would be implemented based on your search requirements
//         const exampleResponse = {
//           query: data.query,
//           results: [],
//           generatedQuery: ''
//         };

//         return NextResponse.json(exampleResponse);
//       }

//       default:
//         return NextResponse.json(
//           { error: 'Invalid action specified' },
//           { status: 400 }
//         );
//     }
//   } catch (error: any) {
//     console.error('AI API error:', error);
//     return NextResponse.json(
//       { error: error.message || 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }
