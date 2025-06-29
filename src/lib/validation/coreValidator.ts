// import { Client, Worker, Task, ValidationError } from '@/types';

// // Helper to check for missing required columns
// const checkRequiredColumns = (data: any[], entityName: string, requiredCols: string[]): ValidationError[] => {
//   const errors: ValidationError[] = [];
//   if (data.length === 0) return errors;

//   const actualCols = Object.keys(data[0]);
//   const missingCols = requiredCols.filter(col => !actualCols.includes(col));

//   if (missingCols.length > 0) {
//     errors.push({
//       id: 'N/A',
//       message: `Missing required column(s) for ${entityName}: ${missingCols.join(', ')}`,
//       type: 'error',
//     });
//   }
//   return errors;
// };

// // Helper to check for duplicate IDs
// const checkDuplicateIDs = (data: any[], idField: string, entityName: string): ValidationError[] => {
//   const errors: ValidationError[] = [];
//   const ids = data.map(row => row[idField]);
//   const seen = new Set<string>();
//   const duplicates = new Set<string>();

//   ids.forEach(id => {
//     if (seen.has(id)) {
//       duplicates.add(id);
//     } else {
//       seen.add(id);
//     }
//   });

//   if (duplicates.size > 0) {
//     errors.push({
//       id: 'N/A',
//       message: `Duplicate ${idField} found in ${entityName}: ${Array.from(duplicates).join(', ')}`,
//       type: 'error',
//     });
//   }
//   return errors;
// };

// export const validateClientsData = (clients: Client[]): ValidationError[] => {
//   let errors: ValidationError[] = [];

//   errors = errors.concat(checkRequiredColumns(clients, 'Clients', ['ClientID', 'ClientName', 'PriorityLevel', 'RequestedTaskIDs']));
//   errors = errors.concat(checkDuplicateIDs(clients, 'ClientID', 'Clients'));

//   clients.forEach((client, index) => {
//     // PriorityLevel not 1-5
//     const priority = parseInt(String(client.PriorityLevel));
//     if (isNaN(priority) || priority < 1 || priority > 5) {
//       errors.push({
//         id: client.ClientID || `row-${index}`,
//         field: 'PriorityLevel',
//         message: 'PriorityLevel must be an integer between 1 and 5.',
//         type: 'error',
//       });
//     }

//     // Broken JSON in AttributesJSON
//     if (client.AttributesJSON) {
//       try {
//         JSON.parse(client.AttributesJSON);
//       } catch (e) {
//         errors.push({
//           id: client.ClientID || `row-${index}`,
//           field: 'AttributesJSON',
//           message: 'AttributesJSON is not a valid JSON string.',
//           type: 'error',
//         });
//       }
//     }
//   });
//   return errors;
// };

// export const validateWorkersData = (workers: Worker[]): ValidationError[] => {
//   let errors: ValidationError[] = [];

//   errors = errors.concat(checkRequiredColumns(workers, 'Workers', ['WorkerID', 'WorkerName', 'Skills', 'AvailableSlots', 'MaxLoadPerPhase']));
//   errors = errors.concat(checkDuplicateIDs(workers, 'WorkerID', 'Workers'));

//   workers.forEach((worker, index) => {
//     // Malformed lists (non-numeric in AvailableSlots etc.)
//     if (worker.AvailableSlots) {
//       try {
//         const slots = JSON.parse(worker.AvailableSlots); // Assuming it's a JSON array string
//         if (!Array.isArray(slots) || !slots.every(s => typeof s === 'number')) {
//           throw new Error('Not an array of numbers');
//         }
//       } catch (e) {
//         errors.push({
//           id: worker.WorkerID || `row-${index}`,
//           field: 'AvailableSlots',
//           message: 'AvailableSlots must be a valid JSON array of numbers (e.g., [1,3,5]).',
//           type: 'error',
//         });
//       }
//     }

//     // MaxLoadPerPhase < 1 (or non-numeric)
//     const maxLoad = parseInt(String(worker.MaxLoadPerPhase));
//     if (isNaN(maxLoad) || maxLoad < 1) {
//       errors.push({
//         id: worker.WorkerID || `row-${index}`,
//         field: 'MaxLoadPerPhase',
//         message: 'MaxLoadPerPhase must be a positive integer.',
//         type: 'error',
//       });
//     }
//   });
//   return errors;
// };

// export const validateTasksData = (tasks: Task[]): ValidationError[] => {
//   let errors: ValidationError[] = [];

//   errors = errors.concat(checkRequiredColumns(tasks, 'Tasks', ['TaskID', 'TaskName', 'Duration', 'RequiredSkills', 'PreferredPhases', 'MaxConcurrent']));
//   errors = errors.concat(checkDuplicateIDs(tasks, 'TaskID', 'Tasks'));

//   tasks.forEach((task, index) => {
//     // Duration < 1
//     const duration = parseInt(String(task.Duration));
//     if (isNaN(duration) || duration < 1) {
//       errors.push({
//         id: task.TaskID || `row-${index}`,
//         field: 'Duration',
//         message: 'Duration must be a positive integer.',
//         type: 'error',
//       });
//     }

//     // PreferredPhases malformed (not list or range syntax)
//     if (task.PreferredPhases) {
//       const phaseStr = String(task.PreferredPhases).trim();
//       const isRange = /^\d+-\d+$/.test(phaseStr);
//       const isList = /^\[\s*(\d+\s*,\s*)*\d+\s*\]$/.test(phaseStr); // Basic check for [1,2,3]
//       if (!isRange && !isList) {
//         try { // Try parsing as JSON array just in case
//           const parsed = JSON.parse(phaseStr);
//           if (!Array.isArray(parsed) || !parsed.every(p => typeof p === 'number')) {
//              throw new Error('Not a valid list');
//           }
//         } catch {
//           errors.push({
//             id: task.TaskID || `row-${index}`,
//             field: 'PreferredPhases',
//             message: 'PreferredPhases must be a range (e.g., "1-3") or a JSON array of numbers (e.g., "[2,4,5]").',
//             type: 'error',
//           });
//         }
//       }
//     }

//     // MaxConcurrent < 1 (or non-numeric)
//     const maxConcurrent = parseInt(String(task.MaxConcurrent));
//     if (isNaN(maxConcurrent) || maxConcurrent < 1) {
//       errors.push({
//         id: task.TaskID || `row-${index}`,
//         field: 'MaxConcurrent',
//         message: 'MaxConcurrent must be a positive integer.',
//         type: 'error',
//       });
//     }
//   });
//   return errors;
// };





import { Client, Worker, Task, ValidationError } from '@/types';

// Helper to check for missing required columns
const checkRequiredColumns = <T extends Record<string, unknown>>(
  data: T[],
  entityName: string,
  requiredCols: string[]
): ValidationError[] => {
  const errors: ValidationError[] = [];
  if (data.length === 0) return errors;

  const actualCols = Object.keys(data[0]);
  const missingCols = requiredCols.filter(col => !actualCols.includes(col));

  if (missingCols.length > 0) {
    errors.push({
      id: 'N/A',
      message: `Missing required column(s) for ${entityName}: ${missingCols.join(', ')}`,
      type: 'error',
    });
  }
  return errors;
};

// Helper to check for duplicate IDs
const checkDuplicateIDs = <T extends Record<string, unknown>>(
  data: T[],
  idField: keyof T & string,
  entityName: string
): ValidationError[] => {
  const errors: ValidationError[] = [];
  const ids = data.map(row => String(row[idField]));
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  ids.forEach(id => {
    if (seen.has(id)) {
      duplicates.add(id);
    } else {
      seen.add(id);
    }
  });

  if (duplicates.size > 0) {
    errors.push({
      id: 'N/A',
      message: `Duplicate ${idField} found in ${entityName}: ${Array.from(duplicates).join(', ')}`,
      type: 'error',
    });
  }
  return errors;
};

export const validateClientsData = (clients: Client[]): ValidationError[] => {
  let errors: ValidationError[] = [];

  errors = errors.concat(checkRequiredColumns(clients, 'Clients', ['ClientID', 'ClientName', 'PriorityLevel', 'RequestedTaskIDs']));
  errors = errors.concat(checkDuplicateIDs(clients, 'ClientID', 'Clients'));

  clients.forEach((client, index) => {
    const rowId = client.ClientID ? client.ClientID : `row-${index + 1}`;

    // PriorityLevel not 1-5
    const priority = parseInt(String(client.PriorityLevel));
    if (isNaN(priority) || priority < 1 || priority > 5) {
      errors.push({
        id: rowId,
        field: 'PriorityLevel',
        message: 'PriorityLevel must be an integer between 1 and 5.',
        type: 'error',
      });
    }

    // Broken JSON in AttributesJSON
    if (client.AttributesJSON) {
      try {
        JSON.parse(client.AttributesJSON);
      } catch {
        errors.push({
          id: rowId,
          field: 'AttributesJSON',
          message: 'AttributesJSON is not a valid JSON string.',
          type: 'error',
        });
      }
    }
  });
  return errors;
};

export const validateWorkersData = (workers: Worker[]): ValidationError[] => {
  let errors: ValidationError[] = [];

  errors = errors.concat(checkRequiredColumns(workers, 'Workers', ['WorkerID', 'WorkerName', 'Skills', 'AvailableSlots', 'MaxLoadPerPhase']));
  errors = errors.concat(checkDuplicateIDs(workers, 'WorkerID', 'Workers'));

  workers.forEach((worker, index) => {
    const rowId = worker.WorkerID ? worker.WorkerID : `row-${index + 1}`;

    // Malformed lists (non-numeric in AvailableSlots etc.)
    if (worker.AvailableSlots) {
      try {
        const slots = JSON.parse(worker.AvailableSlots);
        if (!Array.isArray(slots) || !slots.every(s => typeof s === 'number')) {
          throw new Error('Not an array of numbers');
        }
      } catch {
        errors.push({
          id: rowId,
          field: 'AvailableSlots',
          message: 'AvailableSlots must be a valid JSON array of numbers (e.g., [1,3,5]).',
          type: 'error',
        });
      }
    }

    // MaxLoadPerPhase < 1 (or non-numeric)
    const maxLoad = parseInt(String(worker.MaxLoadPerPhase));
    if (isNaN(maxLoad) || maxLoad < 1) {
      errors.push({
        id: rowId,
        field: 'MaxLoadPerPhase',
        message: 'MaxLoadPerPhase must be a positive integer.',
        type: 'error',
      });
    }
  });
  return errors;
};

export const validateTasksData = (tasks: Task[]): ValidationError[] => {
  let errors: ValidationError[] = [];

  errors = errors.concat(checkRequiredColumns(tasks, 'Tasks', ['TaskID', 'TaskName', 'Duration', 'RequiredSkills', 'PreferredPhases', 'MaxConcurrent']));
  errors = errors.concat(checkDuplicateIDs(tasks, 'TaskID', 'Tasks'));

  tasks.forEach((task, index) => {
    const rowId = task.TaskID ? task.TaskID : `row-${index + 1}`;

    // Duration < 1
    const duration = parseInt(String(task.Duration));
    if (isNaN(duration) || duration < 1) {
      errors.push({
        id: rowId,
        field: 'Duration',
        message: 'Duration must be a positive integer.',
        type: 'error',
      });
    }

    // PreferredPhases malformed (not list or range syntax)
    if (task.PreferredPhases) {
      const phaseStr = String(task.PreferredPhases).trim();
      const isRange = /^\d+-\d+$/.test(phaseStr);
      const isList = /^\[\s*(\d+\s*,\s*)*\d+\s*\]$/.test(phaseStr);
      if (!isRange && !isList) {
        try {
          const parsed = JSON.parse(phaseStr);
          if (!Array.isArray(parsed) || !parsed.every(p => typeof p === 'number')) {
            throw new Error();
          }
        } catch {
          errors.push({
            id: rowId,
            field: 'PreferredPhases',
            message: 'PreferredPhases must be a range (e.g., "1-3") or a JSON array of numbers (e.g., "[2,4,5]").',
            type: 'error',
          });
        }
      }
    }

    // MaxConcurrent < 1 (or non-numeric)
    const maxConcurrent = parseInt(String(task.MaxConcurrent));
    if (isNaN(maxConcurrent) || maxConcurrent < 1) {
      errors.push({
        id: rowId,
        field: 'MaxConcurrent',
        message: 'MaxConcurrent must be a positive integer.',
        type: 'error',
      });
    }
  });
  return errors;
};
