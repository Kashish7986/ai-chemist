'use client';

import { useState, useEffect } from 'react';
import Input from '@/components/common/Input';
import { PrioritySetting } from '@/types';
import React from 'react';
import Button from '@/components/common/Button';

interface PrioritySliderProps {
  initialPriorities: PrioritySetting[];
  onUpdatePriorities: (priorities: PrioritySetting[]) => void;
}

export default function PrioritySlider({ initialPriorities, onUpdatePriorities }: PrioritySliderProps) {
  const [priorities, setPriorities] = useState<PrioritySetting[]>(initialPriorities);

  useEffect(() => {
    setPriorities(initialPriorities);
  }, [initialPriorities]);

  const handleSliderChange = (index: number, value: number) => {
    const newPriorities = [...priorities];
    newPriorities[index].weight = value;
    setPriorities(newPriorities);
    onUpdatePriorities(newPriorities);
  };

  return (
    <div className="p-6 border rounded-lg shadow-md bg-white space-y-6">
      <h3 className="text-xl font-semibold mb-4">Set Allocation Priorities</h3>
      <p className="text-gray-600 text-sm">Adjust the sliders to assign relative importance to different criteria for the downstream allocator.</p>

      <div className="space-y-4">
        {priorities.map((p, index) => (
          <div key={p.criteria} className="flex items-center space-x-4">
            <label className="w-1/3 text-gray-700 font-medium">{p.criteria}</label>
            <div className="w-2/3 flex items-center space-x-2">
              <Input
                type="range"
                min={0} // Ensure this is a number
                max={100} // Ensure this is a number
                value={p.weight}
                onChange={(e) => handleSliderChange(index, parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="w-12 text-right font-semibold text-blue-600">{p.weight}%</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h4 className="text-lg font-medium mb-2">Preset Profiles</h4>
        <div className="flex space-x-3">
          <Button variant="secondary" onClick={() => onUpdatePriorities([
            { criteria: 'Maximize Fulfillment', weight: 90 },
            { criteria: 'Minimize Cost', weight: 30 },
            { criteria: 'Fair Distribution', weight: 50 },
          ])}>
            Maximize Fulfillment
          </Button>
          <Button variant="secondary" onClick={() => onUpdatePriorities([
            { criteria: 'Maximize Fulfillment', weight: 50 },
            { criteria: 'Minimize Cost', weight: 90 },
            { criteria: 'Fair Distribution', weight: 30 },
          ])}>
            Minimize Cost
          </Button>
          <Button variant="secondary" onClick={() => onUpdatePriorities([
            { criteria: 'Maximize Fulfillment', weight: 50 },
            { criteria: 'Minimize Cost', weight: 50 },
            { criteria: 'Fair Distribution', weight: 90 },
          ])}>
            Fair Distribution
          </Button>
        </div>
      </div>
    </div>
  );
}

