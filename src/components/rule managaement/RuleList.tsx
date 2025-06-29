import { Rule } from '@/types';
import Button from '../common/Button';

interface RuleListProps {
  rules: Rule[];
  onDelete?: (ruleId: string) => void;
  onEdit?: (rule: Rule) => void;
}

export default function RuleList({ rules, onDelete, onEdit }: RuleListProps) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-2">Current Rules ({rules.length})</h3>
      
      {rules.length === 0 ? (
        <p className="text-gray-500">No rules defined yet.</p>
      ) : (
        <ul className="space-y-2">
          {rules.map((rule) => (
            <li key={rule.id} className="p-3 border rounded-lg bg-gray-50 flex justify-between items-center">
              <div>
                <h4 className="font-medium">{rule.description}</h4>
                <p className="text-sm text-gray-500">
                  Type: {rule.type} | Source: {rule.source}
                </p>
              </div>
              <div className="flex space-x-2">
                {onEdit && (
                  <Button 
                    variant="secondary" 
                    onClick={() => onEdit(rule)}
                    className="text-xs"
                  >
                    Edit
                  </Button>
                )}
                {onDelete && (
                  <Button 
                    variant="danger" 
                    onClick={() => onDelete(rule.id)}
                    className="text-xs"
                  >
                    Delete
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
