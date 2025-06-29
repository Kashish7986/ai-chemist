// import { Rule, ValidationError } from '@/types';
// import { aiPrompts } from '@/lib/ai/aiPrompts';

// // This is a conceptual service that would interact with a real AI API (e.g., OpenAI, custom LLM)
// // In a real application, you'd use an SDK (e.g., openai-node) and handle API keys securely.
// // Define a type for the context parameter in callAI
// interface AIContext {
//   nlpText?: string; // For NLP conversion
//   error?: ValidationError; // For data correction
//   data?: any; // For rule suggestions, can be more specific if needed
// }

// interface AIResponse {
//   success: boolean;
//   data?: any;
//   error?: string;
// }

// export const callAI = async (prompt: string, context?: AIContext): Promise<AIResponse> => {
//   // Simulate API call delay
//   await new Promise(resolve => setTimeout(resolve, 1000));

//   // --- Mock AI Responses for demonstration ---
//   if (prompt.includes("convert_nlp_to_rule")) {
//     const nlpText = context.nlpText.toLowerCase();
//     if (nlpText.includes("tasks t1 and t2 must run together")) {
//       return {
//         success: true,
//         data: {
//           type: 'coRun',
//           description: 'Tasks T1 and T2 must run together',
//           config: { tasks: 'T1,T2' },
//         } as Rule,
//       };
//     } else if (nlpText.includes("sales workers are not overloaded")) {
//       return {
//         success: true,
//         data: {
//           type: 'loadLimit',
//           description: 'Limit load for sales workers',
//           config: { workerGroup: 'Sales', maxSlotsPerPhase: 5 }, // Example config
//         } as Rule,
//       };
//     }
//     return { success: false, error: 'Could not convert NLP to a known rule type.' };
//   }

//   if (prompt.includes("suggest_rules_from_data")) {
//     // Simulate AI finding patterns
//     return {
//       success: true,
//       data: [
//         {
//           type: 'coRun',
//           description: 'AI Suggestion: Tasks T12 and T14 always run together. Add a Co-run rule?',
//           config: { tasks: 'T12,T14' },
//           source: 'aiSuggestion',
//         } as Rule,
//         {
//           type: 'loadLimit',
//           description: 'AI Suggestion: Sales workers are overloaded this phase. Set a Load-limit?',
//           config: { workerGroup: 'Sales', maxSlotsPerPhase: 6 },
//           source: 'aiSuggestion',
//         } as Rule,
//       ],
//     };
//   }

//   if (prompt.includes("suggest_data_correction")) {
//     // Simulate AI suggesting a fix for a validation error
//     const error = context.error as ValidationError;
//     if (error.field === 'PriorityLevel' && error.message.includes('1 and 5')) {
//       return {
//         success: true,
//         data: {
//           suggestion: 'Change PriorityLevel to 3 (default/median).',
//           fixValue: 3,
//         },
//       };
//     }
//     return { success: false, error: 'No specific correction suggestion.' };
//   }

//   return { success: false, error: 'Unknown AI prompt.' };
// };

// // Example usage of prompts (not directly called here, but used by API routes)
// export const getNLPRuleConversionPrompt = (nlpText: string) => {
//   return aiPrompts.nlpToRuleConversion(nlpText);
// };

// export const getRuleSuggestionPrompt = (data: any) => {
//   return aiPrompts.ruleSuggestion(data);
// };

// export const getDataCorrectionPrompt = (error: ValidationError, rowData: any) => {
//   return aiPrompts.dataCorrection(error, rowData);
// };



// src/lib/ai/aiService.ts
// import { Rule, ValidationError, DataSummary, RowData, RuleConfig } from '@/types';
// import { aiPrompts } from './aiPrompts';

// interface AIContext {
//   nlpText?: string;
//   error?: ValidationError;
//   data?: DataSummary;
//    rowData?: Record<string, unknown>;
    
   
// }

// interface AIResponse<T = unknown> {
//   success: boolean;
//   data?: T;
//   error?: string;
// }

// interface RuleSuggestion {
//   type: Rule['type'];
//   description: string;
//   config: RuleConfig;
//   source: 'aiSuggestion';
// }

// interface DataCorrection {
//   suggestion: string;
//   fixValue?: string | number;
// }

// export const callAI = async <T = unknown>(prompt: string, context?: AIContext): Promise<AIResponse<T>> => {
//   // Simulate API call delay
//   await new Promise(resolve => setTimeout(resolve, 1000));

//   if (prompt.includes("convert_nlp_to_rule")) {
//     const nlpText = context?.nlpText?.toLowerCase() || '';
//     if (nlpText.includes("tasks t1 and t2 must run together")) {
//       return {
//         success: true,
//         data: {
//           type: 'coRun',
//           description: 'Tasks T1 and T2 must run together',
//           config: { tasks: 'T1,T2' },
//         } as unknown as T,
//       };
//     } else if (nlpText.includes("sales workers are not overloaded")) {
//       return {
//         success: true,
//         data: {
//           type: 'loadLimit',
//           description: 'Limit load for sales workers',
//           config: { workerGroup: 'Sales', maxSlotsPerPhase: 5 },
//         } as unknown as T,
//       };
//     }
//     return { 
//       success: false, 
//       error: 'Could not convert NLP to a known rule type.' 
//     };
//   }

//   if (prompt.includes("suggest_rules_from_data")) {
//     const suggestions: RuleSuggestion[] = [
//       {
//         type: 'coRun',
//         description: 'AI Suggestion: Tasks T12 and T14 always run together. Add a Co-run rule?',
//         config: { tasks: 'T12,T14' },
//         source: 'aiSuggestion',
//       },
//       {
//         type: 'loadLimit',
//         description: 'AI Suggestion: Sales workers are overloaded this phase. Set a Load-limit?',
//         config: { workerGroup: 'Sales', maxSlotsPerPhase: 6 },
//         source: 'aiSuggestion',
//       }
//     ];
    
//     return {
//       success: true,
//       data: suggestions as unknown as T,
//     };
//   }

//   if (prompt.includes("suggest_data_correction")) {
//     const error = context?.error;
//     if (error?.field === 'PriorityLevel' && error.message.includes('1 and 5')) {
//       const correction: DataCorrection = {
//         suggestion: 'Change PriorityLevel to 3 (default/median).',
//         fixValue: 3,
//       };
//       return {
//         success: true,
//         data: correction as unknown as T,
//       };
//     }
//     return { 
//       success: false, 
//       error: 'No specific correction suggestion.' 
//     };
//   }

//   return { 
//     success: false, 
//     error: 'Unknown AI prompt.' 
//   };
// };

// export const getNLPRuleConversionPrompt = (nlpText: string): string => {
//   return aiPrompts.nlpToRuleConversion(nlpText);
// };

// export const getRuleSuggestionPrompt = (data: DataSummary): string => {
//   return aiPrompts.ruleSuggestion(data);
// };

// export const getDataCorrectionPrompt = (error: ValidationError, rowData: RowData): string => {
//   return aiPrompts.dataCorrection(error, rowData);
// };



import { Rule, ValidationError, DataSummary, RowData, RuleConfig, Client, Worker, Task } from '@/types';
import { aiPrompts } from './aiPrompts';

interface AIContext {
  nlpText?: string;
  error?: ValidationError;
  data?: DataSummary;
  rowData?: Record<string, unknown>;
  clients?: Client[];
  workers?: Worker[];
  tasks?: Task[];
}

interface AIResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

interface RuleSuggestion {
  type: Rule['type'];
  description: string;
  config: RuleConfig;
  source: 'aiSuggestion';
}

interface DataCorrection {
  suggestion: string;
  fixValue?: string | number;
}

export const callAI = async <T = unknown>(prompt: string, context?: AIContext): Promise<AIResponse<T>> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (prompt.includes("convert_nlp_to_rule")) {
    const nlpText = context?.nlpText?.toLowerCase() || '';
    if (nlpText.includes("tasks t1 and t2 must run together")) {
      return {
        success: true,
        data: {
          type: 'coRun',
          description: 'Tasks T1 and T2 must run together',
          config: { tasks: 'T1,T2' },
        } as unknown as T,
      };
    } else if (nlpText.includes("sales workers are not overloaded")) {
      return {
        success: true,
        data: {
          type: 'loadLimit',
          description: 'Limit load for sales workers',
          config: { workerGroup: 'Sales', maxSlotsPerPhase: 5 },
        } as unknown as T,
      };
    }
    return { 
      success: false, 
      error: 'Could not convert NLP to a known rule type.' 
    };
  }

  if (prompt.includes("suggest_rules_from_data")) {
    const suggestions: RuleSuggestion[] = [];
    
    // Add rules based on workers if available
    if (context?.workers) {
      suggestions.push({
        type: 'loadLimit',
        description: `Optimized rule for ${context.workers.length} workers`,
        config: { maxWorkers: context.workers.length },
        source: 'aiSuggestion'
      });
    }

    // Add rules based on tasks if available
    if (context?.tasks) {
      suggestions.push({
        type: 'coRun',
        description: `Task grouping suggestion for ${context.tasks.length} tasks`,
        config: { taskCount: context.tasks.length },
        source: 'aiSuggestion'
      });
    }

    // Default suggestions
    suggestions.push(
      {
        type: 'coRun',
        description: 'Tasks T12 and T14 always run together',
        config: { tasks: 'T12,T14' },
        source: 'aiSuggestion',
      },
      {
        type: 'loadLimit',
        description: 'Sales workers load limit',
        config: { workerGroup: 'Sales', maxSlotsPerPhase: 6 },
        source: 'aiSuggestion',
      }
    );
    
    return {
      success: true,
      data: suggestions as unknown as T,
    };
  }

  if (prompt.includes("suggest_data_correction")) {
    const error = context?.error;
    if (error?.field === 'PriorityLevel' && error.message.includes('1 and 5')) {
      const correction: DataCorrection = {
        suggestion: 'Change PriorityLevel to 3 (default/median).',
        fixValue: 3,
      };
      return {
        success: true,
        data: correction as unknown as T,
      };
    }
    return { 
      success: false, 
      error: 'No specific correction suggestion.' 
    };
  }

  return { 
    success: false, 
    error: 'Unknown AI prompt.' 
  };
};

export const getNLPRuleConversionPrompt = (nlpText: string): string => {
  return aiPrompts.nlpToRuleConversion(nlpText);
};

export const getRuleSuggestionPrompt = (data: DataSummary): string => {
  return aiPrompts.ruleSuggestion(data);
};

export const getDataCorrectionPrompt = (error: ValidationError, rowData: RowData): string => {
  return aiPrompts.dataCorrection(error, rowData);
};
