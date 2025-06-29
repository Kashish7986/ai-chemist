import { Client, Worker, Task, ValidationError } from '@/types';

export const validateCrossReferences = (
  clients: Client[],
  workers: Worker[],
  tasks: Task[]
): ValidationError[] => {
  const errors: ValidationError[] = [];

  const taskIds = new Set(tasks.map(t => t.TaskID));
  const workerSkills = new Set(workers.flatMap(w => w.Skills.split(',').map(s => s.trim())));

  // Unknown references (RequestedTaskIDs not in tasks)
  clients.forEach(client => {
    const requested = client.RequestedTaskIDs.split(',').map(id => id.trim()).filter(Boolean);
    requested.forEach(reqId => {
      if (!taskIds.has(reqId)) {
        errors.push({
          id: client.ClientID,
          field: 'RequestedTaskIDs',
          message: `Requested Task ID '${reqId}' does not exist in tasks data.`,
          type: 'error',
        });
      }
    });
  });

  // Skill-coverage matrix: every RequiredSkill maps to >=1 worker.
  tasks.forEach(task => {
    const required = task.RequiredSkills.split(',').map(s => s.trim()).filter(Boolean);
    required.forEach(reqSkill => {
      if (!workerSkills.has(reqSkill)) {
        errors.push({
          id: task.TaskID,
          field: 'RequiredSkills',
          message: `Required skill '${reqSkill}' for this task is not covered by any worker.`,
          type: 'error',
        });
      }
    });
  });

  // TODO: Implement more complex cross-reference validations:
  // - Circular co-run groups (A→B→C→A) - requires rule parsing
  // - Conflicting rules vs. phase-window constraints - requires rule parsing
  // - Overloaded workers (AvailableSlots.length < MaxLoadPerPhase) - requires parsing AvailableSlots
  // - Phase-slot saturation: sum of task durations per Phase ≤ total worker slots
  // - Max-concurrency feasibility: MaxConcurrent ≤ count of qualified, available workers

  return errors;
};
