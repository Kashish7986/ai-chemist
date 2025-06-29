// src/types/index.d.ts

// Define specific configurations for each rule type
export interface CoRunConfig {
  tasks: string; // Comma-separated task IDs
}

export interface SlotRestrictionConfig {
  workerGroup: string; // Name of the worker group
  maxSlots: number; // Maximum slots allowed
}

export interface LoadLimitConfig {
  workerGroup: string; // Name of the worker group
  maxLoadPerPhase: number; // Maximum load per phase
}

export interface PhaseWindowConfig {
  phase: number; // Specific phase
  startTime: string; // Start time in HH:mm format
  endTime: string; // End time in HH:mm format
}

// Union type for all possible rule configurations
export type RuleConfig = 
  | CoRunConfig 
  | SlotRestrictionConfig 
  | LoadLimitConfig 
  | PhaseWindowConfig;

// Update the Rule type to use the new RuleConfig type
export type Rule = {
  id: string;
  type: 'coRun' | 'slotRestriction' | 'loadLimit' | 'phaseWindow' | 'patternMatch' | 'precedenceOverride' | 'custom';
  description: string; // User-friendly description
  config: RuleConfig; // Use the specific RuleConfig type
  source: 'manual' | 'nlp' | 'aiSuggestion';
};
