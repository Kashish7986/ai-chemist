// import { ValidationError } from '@/types';

// // This file defines the prompts that would be sent to an LLM.
// // Using template literals allows for dynamic content.

// export const aiPrompts = {
//   nlpToRuleConversion: (nlpText: string) => `
//     You are an AI assistant that converts natural language descriptions into structured JSON rules for a resource allocation system.
//     The system has the following rule types: 'coRun', 'slotRestriction', 'loadLimit', 'phaseWindow', 'patternMatch', 'precedenceOverride'.
    
//     Given the following natural language request, identify the rule type and extract relevant parameters into a JSON object.
//     If you cannot determine a specific rule type, use 'custom'.
    
//     Natural Language: "${nlpText}"
    
//     Output JSON format (example for coRun):
//     {
//       "type": "coRun",
//       "description": "Tasks T1 and T2 must run together",
//       "config": { "tasks": "T1,T2" }
//     }
    
//     Example for loadLimit:
//     {
//       "type": "loadLimit",
//       "description": "Limit sales workers to 5 slots per phase",
//       "config": { "workerGroup": "Sales", "maxSlotsPerPhase": 5 }
//     }
    
//     If the request is unclear or cannot be converted, return an empty JSON object or a specific error message.
//     `,

//   ruleSuggestion: (dataSummary: any) => `
//     You are an AI assistant that analyzes resource allocation data to suggest potential business rules.
//     Given a summary of client, worker, and task data, identify patterns or potential issues that could be addressed by rules.
    
//     Data Summary:
//     Clients: ${JSON.stringify(dataSummary.clients.slice(0, 5))}... (first 5 for brevity)
//     Workers: ${JSON.stringify(dataSummary.workers.slice(0, 5))}...
//     Tasks: ${JSON.stringify(dataSummary.tasks.slice(0, 5))}...
    
//     Suggest up to 3 rules that would optimize resource allocation or fix common problems.
//     For each suggestion, provide the rule type, a user-friendly description, and the suggested configuration.
    
//     Output JSON array of rules (e.g., for coRun and loadLimit):
//     [
//       {
//         "type": "coRun",
//         "description": "Tasks T12 and T14 always run together. Add a Co-run rule?",
//         "config": { "tasks": "T12,T14" }
//       },
//       {
//         "type": "loadLimit",
//         "description": "Sales workers are overloaded this phase. Set a Load-limit?",
//         "config": { "workerGroup": "Sales", "maxSlotsPerPhase": 6 }
//       }
//     ]
//     `,

//   dataCorrection: (error: ValidationError, rowData: any) => `
//     You are an AI assistant that suggests corrections for data validation errors.
//     Given a specific validation error and the full row data, propose a precise fix.
    
//     Validation Error: ${JSON.stringify(error)}
//     Row Data: ${JSON.stringify(rowData)}
    
//     Suggest a correction for the problematic field. If a direct value can be provided, include 'fixValue'.
    
//     Output JSON format:
//     {
//       "suggestion": "Change PriorityLevel to 3 (median value).",
//       "fixValue": 3
//     }
//     If no specific fix is possible, return an empty object.
//     `,
// };


// src/lib/ai/aiPrompts.ts

// src/lib/ai/aiPrompts.ts

import { ValidationError, DataSummary, RowData } from '@/types';

export const aiPrompts = {
  nlpToRuleConversion: (nlpText: string) => `
    You are an AI assistant that converts natural language descriptions into structured JSON rules for a resource allocation system.
    The system has the following rule types: 'coRun', 'slotRestriction', 'loadLimit', 'phaseWindow', 'patternMatch', 'precedenceOverride'.
    
    Given the following natural language request, identify the rule type and extract relevant parameters into a JSON object.
    If you cannot determine a specific rule type, use 'custom'.
    
    Natural Language: "${nlpText}"
    
    Output JSON format (example for coRun):
    {
      "type": "coRun",
      "description": "Tasks T1 and T2 must run together",
      "config": { "tasks": "T1,T2" }
    }
    
    Example for loadLimit:
    {
      "type": "loadLimit",
      "description": "Limit sales workers to 5 slots per phase",
      "config": { "workerGroup": "Sales", "maxSlotsPerPhase": 5 }
    }
    
    If the request is unclear or cannot be converted, return an empty JSON object or a specific error message.
  `,

  ruleSuggestion: (dataSummary: DataSummary) => `
    You are an AI assistant that analyzes resource allocation data to suggest potential business rules.
    Given a summary of client, worker, and task data, identify patterns or potential issues that could be addressed by rules.
    
    Data Summary:
    Clients: ${JSON.stringify(dataSummary.clients.slice(0, 5))}... (first 5 for brevity)
    Workers: ${JSON.stringify(dataSummary.workers.slice(0, 5))}...
    Tasks: ${JSON.stringify(dataSummary.tasks.slice(0, 5))}...
    
    Suggest up to 3 rules that would optimize resource allocation or fix common problems.
    For each suggestion, provide the rule type, a user-friendly description, and the suggested configuration.
    
    Output JSON array of rules (e.g., for coRun and loadLimit):
    [
      {
        "type": "coRun",
        "description": "Tasks T12 and T14 always run together. Add a Co-run rule?",
        "config": { "tasks": "T12,T14" }
      },
      {
        "type": "loadLimit",
        "description": "Sales workers are overloaded this phase. Set a Load-limit?",
        "config": { "workerGroup": "Sales", "maxSlotsPerPhase": 6 }
      }
    ]
  `,

  dataCorrection: (error: ValidationError, rowData: RowData) => `
    You are an AI assistant that suggests corrections for data validation errors.
    Given a specific validation error and the full row data, propose a precise fix.
    
    Validation Error: ${JSON.stringify(error)}
    Row Data: ${JSON.stringify(rowData)}
    
    Suggest a correction for the problematic field. If a direct value can be provided, include 'fixValue'.
    
    Output JSON format:
    {
      "suggestion": "Change PriorityLevel to 3 (median value).",
      "fixValue": 3
    }
    If no specific fix is possible, return an empty object.
  `,
};

