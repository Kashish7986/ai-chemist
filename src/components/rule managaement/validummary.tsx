import { ValidationError } from '@/types';
import { ExclamationCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

interface ValidationSummaryProps {
  errors: {
    clients: ValidationError[];
    workers: ValidationError[];
    tasks: ValidationError[];
    overall: ValidationError[];
  };
}

export default function ValidationSummary({ errors }: ValidationSummaryProps) {
  const allErrors = [
    ...errors.clients.map(e => ({ ...e, entity: 'Clients' })),
    ...errors.workers.map(e => ({ ...e, entity: 'Workers' })),
    ...errors.tasks.map(e => ({ ...e, entity: 'Tasks' })),
    ...errors.overall.map(e => ({ ...e, entity: 'Overall' })),
  ];

  if (allErrors.length === 0) {
    return (
      <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center space-x-2">
        <InformationCircleIcon className="h-5 w-5" />
        <span>All data validated successfully!</span>
      </div>
    );
  }

  return (
    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg space-y-3">
      <h3 className="text-lg font-semibold flex items-center space-x-2">
        <ExclamationCircleIcon className="h-6 w-6" />
        <span>Validation Issues Found ({allErrors.length})</span>
      </h3>
      <ul className="list-disc pl-5 space-y-1 text-sm">
        {allErrors.map((err, index) => (
          <li key={index}>
            <strong>[{err.entity}]</strong> {err.id ? `ID: ${err.id}` : ''} {err.field ? `Field: ${err.field}` : ''} - {err.message}
            {err.suggestion && <span className="text-blue-600 italic ml-2"> (Suggestion: {err.suggestion})</span>}
          </li>
        ))}
      </ul>
      <p className="text-sm italic">Please fix the highlighted errors in the data grids above.</p>
    </div>
  );
}
