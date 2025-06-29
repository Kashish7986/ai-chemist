// Data Entities
export type Client = {
  ClientID: string;
  ClientName: string;
  PriorityLevel: number; // 1-5
  RequestedTaskIDs: string; // comma-separated
  GroupTag?: string;
  AttributesJSON?: string; // JSON string
};

export type Worker = {
  WorkerID: string;
  WorkerName: string;
  Skills: string; // comma-separated
  AvailableSlots: string; // e.g., "[1,3,5]" or "1-5"
  MaxLoadPerPhase: number;
  WorkerGroup?: string;
  QualificationLevel?: string;
};

export type Task = {
  TaskID: string;
  TaskName: string;
  Category?: string;
  Duration: number; // >=1
  RequiredSkills: string; // comma-separated
  PreferredPhases: string; // e.g., "1-3" or "[2,4,5]"
  MaxConcurrent: number;
};

export type ParsedData = {
  clients: Client[];
  workers: Worker[];
  tasks: Task[];
};

// Validation
export type ValidationError = {
  id: string; // ClientID, WorkerID, TaskID or row index
  field?: string;
  message: string;
  type: 'error' | 'warning';
  suggestion?: string; // AI suggestion
  row: number; // Row index in the original data
  column: string; // Column name in the original data
  message?: string; // Optional message for localization
};

export type ValidationResults = {
  clients: ValidationError[];
  workers: ValidationError[];
  tasks: ValidationError[];
  overall: ValidationError[]; // Cross-entity errors
};




// Rules
// export type Rule = {
//   id: string;
//   type: 'coRun' | 'slotRestriction' | 'loadLimit' | 'phaseWindow' | 'patternMatch' | 'precedenceOverride' | 'custom';
//   description: string; // User-friendly description
//   config: Record<string, any>; // JSON configuration for the rule
//   source: 'manual' | 'nlp' | 'aiSuggestion';
// };

// export type RulesConfig = Rule[];

// Union type for all possible rule configurations
export type RuleConfig = 
  | CoRunConfig 
  | SlotRestrictionConfig 
  | LoadLimitConfig 
  | PhaseWindowConfig;
// Update the Rule type to use the new RuleConfig type
export type Rule = {
  id: string;
  name: string; // Name of the rule
  action: string; // Action to take when the rule is applied
  type: 'coRun' | 'slotRestriction' | 'loadLimit' | 'phaseWindow' | 'patternMatch' | 'precedenceOverride' | 'custom';
  description: string; // User-friendly description
  config: RuleConfig; // Use the specific RuleConfig type
  source: 'manual' | 'nlp' | 'aiSuggestion';
   createdAt: string; // Ensure this is included
   condition: string; // Optional conditions for the rule
  source: 'manual' | 'nlp' | 'aiSuggestion'; // Ensure this matches your usage
};



// Prioritization
export type PrioritySetting = {
  criteria: string;
  weight: number; // 0-100
  field: string; // e.g., 'PriorityLevel', 
  priority: number; // 1-5
};
// Define the structure for the data summary
export type DataSummary = {
  clients: Client[];
  workers: Worker[];
  tasks: Task[];
  rules: RulesConfig;
  priorities: PrioritySetting[];
};




export interface ClientRowData {
  ClientID: string;
  ClientName: string;
  PriorityLevel: number; // 1-5
  RequestedTaskIDs: string; // comma-separated
  GroupTag?: string;
  AttributesJSON?: string; // JSON string
}

export interface WorkerRowData {
  WorkerID: string;
  WorkerName: string;
  Skills: string; // comma-separated
  AvailableSlots: string; // e.g., "[1,3,5]" or "1-5"
  MaxLoadPerPhase: number;
  WorkerGroup?: string;
  QualificationLevel?: string;
}

export interface TaskRowData {
  TaskID: string;
  TaskName: string;
  Category?: string;
  Duration: number; // >=1
  RequiredSkills: string; // comma-separated
  PreferredPhases: string; // e.g., "1-3" or "[2,4,5]"
  MaxConcurrent: number;
}

// Union type for row data
export type RowData = ClientRowData | WorkerRowData | TaskRowData;

// src/types.ts or app/types.ts



export interface AIContext {
  // rowData: Record<string, unknown>; // Ensure this is included
  // clients: Client[]; // Ensure this is included
  // workers: Worker[]; // Ensure this is included
  // tasks: Task[]; // Ensure this is included
     nlpText?: string;
  error?: ValidationError;
  rowData?: Record<string, unknown>;
  clients?: Client[];
  workers?: Worker[];
  tasks?: Task[];
  query?: string;
  dataset?: string;

}
export interface ValidationSummaryProps
{
  errors:ValidationResults
    errors: {
    clients: ValidationError[];
    workers: ValidationError[];
    tasks: ValidationError[];
    overall: ValidationError[];
  };
}
// Define Client, Worker, Task, and other necessary types
