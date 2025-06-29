'use client';

import React, { useState } from 'react';
import Button from '@/components/common/Button';
import { Rule, RuleConfig } from '@/types'; // Import RuleConfig as well

// Define the props for the RuleInputForm component
interface RuleInputFormProps {
  onAddRule: (newRule: Omit<Rule, 'id'>) => void;
}

export default function RuleInputForm({ onAddRule }: RuleInputFormProps) {
  const [name, setName] = useState('');
  const [condition, setCondition] = useState('');
  const [action, setAction] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState(''); // New state for value
  const [fields, setFields] = useState<string[]>([]); // New state for fields

  // State for 'type' if you want to allow user selection, otherwise use a default
  const [ruleType, setRuleType] = useState<Rule['type']>('custom'); // Default to 'custom'

  // For 'config', initialize as an empty object or a specific structure based on 'type'
  const [config, setConfig] = useState<RuleConfig>({}); // Initialize as an empty object

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !condition.trim() || !action.trim()) {
      alert('Please fill in all required rule fields (Name, Condition, Action).');
      return;
    }

    // Create the new rule object, now including all required properties
    const newRule: Omit<Rule, 'id'> = {
      name: name.trim(),
      condition: condition.trim(),
      action: action.trim(),
      description: description.trim(),
      type: ruleType, // Use the state variable for type
      config: config, // Use the state variable for config
      source: 'manual', // Default to 'manual' as it's added via form
      createdAt: new Date().toISOString(), // Generate current timestamp
      value: value.trim(), // Include value
      fields: fields, // Include fields
    };

    onAddRule(newRule);

    // Clear the form fields after submission
    setName('');
    setCondition('');
    setAction('');
    setDescription('');
    setValue(''); // Reset value
    setFields([]); // Reset fields
    setRuleType('custom'); // Reset type to default
    setConfig({}); // Reset config
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 border rounded-lg shadow-sm bg-white">
      <h3 className="text-xl font-semibold text-gray-800">Add New Business Rule</h3>

      <div>
        <label htmlFor="ruleName" className="block text-sm font-medium text-gray-700 mb-1">
          Rule Name:
        </label>
        <input
          type="text"
          id="ruleName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., High Priority Client Rule"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="ruleType" className="block text-sm font-medium text-gray-700 mb-1">
          Rule Type:
        </label>
        <select
          id="ruleType"
          value={ruleType}
          onChange={(e) => setRuleType(e.target.value as Rule['type'])}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="custom">Custom</option>
          <option value="coRun">Co-Run</option>
          <option value="slotRestriction">Slot Restriction</option>
          <option value="loadLimit">Load Limit</option>
          <option value="phaseWindow">Phase Window</option>
          <option value="patternMatch">Pattern Match</option>
          <option value="precedenceOverride">Precedence Override</option>
        </select>
      </div>

      <div>
        <label htmlFor="ruleCondition" className="block text-sm font-medium text-gray-700 mb-1">
          Condition:
        </label>
        <textarea
          id="ruleCondition"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          rows={3}
          placeholder="e.g., Client.Revenue > 100000 AND Client.Tier = 'Premium'"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        ></textarea>
        <p className="mt-1 text-xs text-gray-500">
          Define the logical condition for this rule. Use dot notation for properties (e.g., `Client.Revenue`).
        </p>
      </div>

      <div>
        <label htmlFor="ruleAction" className="block text-sm font-medium text-gray-700 mb-1">
          Action:
        </label>
        <textarea
          id="ruleAction"
          value={action}
          onChange={(e) => setAction(e.target.value)}
          rows={3}
          placeholder="e.g., Assign Task.Priority = 'High' AND Worker.Skill = 'Senior'"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        ></textarea>
        <p className="mt-1 text-xs text-gray-500">
          Specify the action to take when the condition is met.
        </p>
      </div>

      <div>
        <label htmlFor="ruleValue" className="block text-sm font-medium text-gray-700 mb-1">
          Value (Optional):
        </label>
        <input
          type="text"
          id="ruleValue"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="e.g., High"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="ruleFields" className="block text-sm font-medium text-gray-700 mb-1">
          Fields (Optional, comma-separated):
        </label>
        <input
          type="text"
          id="ruleFields"
          value={fields.join(',')}
          onChange={(e) => setFields(e.target.value.split(',').map(field => field.trim()))}
          placeholder="e.g., ClientID, WorkerID"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="ruleDescription" className="block text-sm font-medium text-gray-700 mb-1">
          Description (Optional):
        </label>
        <textarea
          id="ruleDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          placeholder="A brief explanation of what this rule does."
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        ></textarea>
      </div>

      <Button type="submit" variant="primary" className="w-full">
        Add Rule
      </Button>
    </form>
  );
}
