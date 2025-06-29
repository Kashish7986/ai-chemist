// 'use client';

// import { useState} from 'react';
// import FileUploadSection from '@/components/data-ingestion/FileUploadSection';
// import DataGridDisplay from '@/components/data-ingestion/DataGridDisplay';
// import ValidationSummary from '@/components/data-ingestion/Validationsummary';
// import RuleInputForm from '@/components/rule managaement/RuleInputForm';
// import RuleList from '@/components/rule managaement/RuleList';
// import PrioritySlider from '@/components/prioritization/PrioritySlider';
// import Button from '@/components/common/Button';
// // import { ParsedData, Rule ,PrioritySetting } from '@/types';
// import { downloadJsonFile, downloadCsvFile } from '@/lib/utils/fileDownload';
// import { useDataStore } from '@/hook/useDataStore';

// import { 
//   ValidationResults, 
//   Rule, 
//   PrioritySetting, 
//   ParsedData, 
//   Client, 
//   Worker, 
//   Task 
// } from '@/types'; // Adjust the import path as necessary

// export default function HomePage() {
//   const {
//     clients,
//     workers,
//     tasks,
//     validationErrors,
//     rules,
//     priorities,
//     updateClient,
//     updateWorker,
//     updateTask,
//     setData,
//     validateClients,
//     validateWorkers,
//     validateTasks
//   } = useDataStore();

//   const [activeTab, setActiveTab] = useState<'upload' | 'rules' | 'priorities'>('upload');

//   const handleDataParsed = (data: Partial<ParsedData>) => {
//     const updates: Partial<ParsedData> = {};

//     if (data.clients) updates.clients = data.clients;
//     if (data.workers) updates.workers = data.workers;
//     if (data.tasks) updates.tasks = data.tasks;

//     setData(updates);
//     triggerValidation();
//   };

//   const triggerValidation = () => {
//     const validationResults: ValidationResults = {
//       clients: validateClients(),
//       workers: validateWorkers(),
//       tasks: validateTasks(),
//       overall: [] // Add this line to include the overall validation errors
//     };
//     setData({ validationErrors: validationResults });
//   };

//   const handleCellEdit = (entity: 'clients' | 'workers' | 'tasks', rowIndex: number, columnId: string, value: string) => {
//     switch (entity) {
//       case 'clients':
//         updateClient(clients[rowIndex].ClientID, { [columnId]: value });
//         break;
//       case 'workers':
//         updateWorker(workers[rowIndex].WorkerID, { [columnId]: value });
//         break;
//       case 'tasks':
//         updateTask(tasks[rowIndex].TaskID, { [columnId]: value });
//         break;
//     }
//     triggerValidation();
//   };

//   const handleAddRule = (newRule: Omit<Rule, 'id'>) => {
//     setData({
//       rules: [...rules, { ...newRule, id: `rule-${Date.now()}` }]
//     });
//   };

//   const handleUpdatePriorities = (newPriorities: PrioritySetting[]) => {
//     setData({ priorities: newPriorities });
//   };

//   const handleExport = () => {
//     const exportData = {
//       clients,
//       workers,
//       tasks,
//       rules,
//       priorities,
//     };
//     downloadJsonFile(exportData, 'data_alchemist_export.json');
//     downloadCsvFile(clients, 'clients_cleaned.csv');
//     downloadCsvFile(workers, 'workers_cleaned.csv');
//     downloadCsvFile(tasks, 'tasks_cleaned.csv');
//   };

//   const hasErrors = validationErrors.clients.length > 0 || 
//                    validationErrors.workers.length > 0 || 
//                    validationErrors.tasks.length > 0;

//   return (
//     <div className="space-y-8">
//       <h1 className="text-4xl font-bold text-center text-blue-700">Data Alchemist</h1>
//       <p className="text-center text-gray-600">Forge Your Own AI Resource-Allocation Configurator</p>

//       <div className="flex justify-center space-x-4 border-b pb-2">
//         <Button 
//           variant={activeTab === 'upload' ? 'primary' : 'secondary'} 
//           onClick={() => setActiveTab('upload')}
//         >
//           1. Data Ingestion & Validation
//         </Button>
//         <Button 
//           variant={activeTab === 'rules' ? 'primary' : 'secondary'} 
//           onClick={() => setActiveTab('rules')}
//         >
//           2. Define Business Rules
//         </Button>
//         <Button 
//           variant={activeTab === 'priorities' ? 'primary' : 'secondary'} 
//           onClick={() => setActiveTab('priorities')}
//         >
//           3. Set Priorities & Export
//         </Button>
//       </div>

//       {activeTab === 'upload' && (
//         <section className="space-y-6">
//           <h2 className="text-2xl font-semibold">Data Ingestion & Validation</h2>
//           <FileUploadSection onDataParsed={handleDataParsed} />

//           {hasErrors && <ValidationSummary errors={validationErrors} />}

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {clients.length > 0 && (
//               <div className="col-span-1">
//                 <h3 className="text-xl font-medium mb-2">Clients Data</h3>
//                 <DataGridDisplay
//                   data={clients}
//                   entity="clients"
//                   onCellEdit={handleCellEdit}
//                   errors={validationErrors.clients}
//                 />
//               </div>
//             )}
//             {workers.length > 0 && (
//               <div className="col-span-1">
//                 <h3 className="text-xl font-medium mb-2">Workers Data</h3>
//                 <DataGridDisplay
//                   data={workers}
//                   entity="workers"
//                   onCellEdit={handleCellEdit}
//                   errors={validationErrors.workers}
//                 />
//               </div>
//             )}
//             {tasks.length > 0 && (
//               <div className="col-span-1">
//                 <h3 className="text-xl font-medium mb-2">Tasks Data</h3>
//                 <DataGridDisplay
//                   data={tasks}
//                   entity="tasks"
//                   onCellEdit={handleCellEdit}
//                   errors={validationErrors.tasks}
//                 />
//               </div>
//             )}
//           </div>
//         </section>
//       )}

//       {activeTab === 'rules' && (
//         <section className="space-y-6">
//           <h2 className="text-2xl font-semibold">Define Business Rules</h2>
//           <RuleInputForm onAddRule={handleAddRule} />
//           <RuleList rules={rules} />
//         </section>
//       )}

//       {activeTab === 'priorities' && (
//         <section className="space-y-6">
//           <h2 className="text-2xl font-semibold">Set Priorities & Export</h2>
//           <PrioritySlider 
//             onUpdatePriorities={handleUpdatePriorities} 
//             initialPriorities={priorities} 
//           />
//           <div className="flex justify-center">
//             <Button 
//               variant="primary" 
//               onClick={handleExport} 
//               disabled={hasErrors}
//             >
//               Export Cleaned Data & Rules
//             </Button>
//           </div>
//           {hasErrors && (
//             <p className="text-red-500 text-center">
//               Please fix all validation errors before exporting.
//             </p>
//           )}
//         </section>
//       )}
//     </div>
//   );
// }



'use client';

import { useState } from 'react';
import FileUploadSection from '@/components/data-ingestion/FileUploadSection';
import DataGridDisplay from '@/components/data-ingestion/DataGridDisplay';
import ValidationSummary from '@/components/data-ingestion/Validationsummary';
// import RuleInputForm from '@/components/rule managaement/validummary';
import RuleInputForm from '@/components/rule managaement/RuleInputForm';
import RuleList from '@/components/rule managaement/RuleList';
import PrioritySlider from '@/components/prioritization/PrioritySlider';
import Button from '@/components/common/Button';
import { downloadJsonFile, downloadCsvFile } from '@/lib/utils/fileDownload';
import { useDataStore } from '@/hook/useDataStore';

import {
  ValidationResults,
  Rule,
  PrioritySetting,
  ParsedData,
} from '@/types';

export default function HomePage() {
  const {
    clients,
    workers,
    tasks,
    validationErrors,
    rules,
    priorities,
    updateClient,
    updateWorker,
    updateTask,
    setData,
    validateClients,
    validateWorkers,
    validateTasks,
  } = useDataStore();

  const [activeTab, setActiveTab] = useState<'upload' | 'rules' | 'priorities'>('upload');

  const handleDataParsed = (data: Partial<ParsedData>) => {
    const updates: Partial<ParsedData> = {};

    if (data.clients) updates.clients = data.clients;
    if (data.workers) updates.workers = data.workers;
    if (data.tasks) updates.tasks = data.tasks;

    setData(updates);
    triggerValidation();
  };

  const triggerValidation = () => {
    const validationResults: ValidationResults = {
      clients: validateClients(),
      workers: validateWorkers(),
      tasks: validateTasks(),
      overall: [], // Ensure this field is always included
    };
    setData({ validationErrors: validationResults });
  };

  const handleCellEdit = (
    entity: 'clients' | 'workers' | 'tasks',
    rowIndex: number,
    columnId: string,
    value: string
  ) => {
    switch (entity) {
      case 'clients':
        updateClient(clients[rowIndex].ClientID, { [columnId]: value });
        break;
      case 'workers':
        updateWorker(workers[rowIndex].WorkerID, { [columnId]: value });
        break;
      case 'tasks':
        updateTask(tasks[rowIndex].TaskID, { [columnId]: value });
        break;
    }
    triggerValidation();
  };

  const handleAddRule = (newRule: Omit<Rule, 'id'>) => {
    setData({
      rules: [...rules, { ...newRule, id: `rule-${Date.now()}` }],
    });
  };

  const handleUpdatePriorities = (newPriorities: PrioritySetting[]) => {
    setData({ priorities: newPriorities });
  };

  const handleExport = () => {
    const exportData = {
      clients,
      workers,
      tasks,
      rules,
      priorities,
    };
    downloadJsonFile(exportData, 'data_alchemist_export.json');
    downloadCsvFile(clients, 'clients_cleaned.csv');
    downloadCsvFile(workers, 'workers_cleaned.csv');
    downloadCsvFile(tasks, 'tasks_cleaned.csv');
  };

  const hasErrors =
    validationErrors.clients.length > 0 ||
    validationErrors.workers.length > 0 ||
    validationErrors.tasks.length > 0;

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center text-blue-700">Data Alchemist</h1>
      <p className="text-center text-gray-600">
        Forge Your Own AI Resource-Allocation Configurator
      </p>

      <div className="flex justify-center space-x-4 border-b pb-2">
        <Button
          variant={activeTab === 'upload' ? 'primary' : 'secondary'}
          onClick={() => setActiveTab('upload')}
        >
          1. Data Ingestion & Validation
        </Button>
        <Button
          variant={activeTab === 'rules' ? 'primary' : 'secondary'}
          onClick={() => setActiveTab('rules')}
        >
          2. Define Business Rules
        </Button>
        <Button
          variant={activeTab === 'priorities' ? 'primary' : 'secondary'}
          onClick={() => setActiveTab('priorities')}
        >
          3. Set Priorities & Export
        </Button>
      </div>

      {activeTab === 'upload' && (
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold padding-left" >Data Ingestion & Validation</h2>

          <FileUploadSection onDataParsed={handleDataParsed} />

          {hasErrors && (
            <ValidationSummary
              errors={{
                clients: validationErrors.clients,
                workers: validationErrors.workers,
                tasks: validationErrors.tasks,
                overall: validationErrors.overall ?? [],
              }}
            />
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {clients.length > 0 && (
              <div className="col-span-1">
                <h3 className="text-xl font-medium mb-2">Clients Data</h3>
                <DataGridDisplay
                  data={clients}
                  entity="clients"
                  onCellEdit={handleCellEdit}
                  errors={validationErrors.clients}
                />
              </div>
            )}
            {workers.length > 0 && (
              <div className="col-span-1">
                <h3 className="text-xl font-medium mb-2">Workers Data</h3>
                <DataGridDisplay
                  data={workers}
                  entity="workers"
                  onCellEdit={handleCellEdit}
                  errors={validationErrors.workers}
                />
              </div>
            )}
            {tasks.length > 0 && (
              <div className="col-span-1">
                <h3 className="text-xl font-medium mb-2">Tasks Data</h3>
                <DataGridDisplay
                  data={tasks}
                  entity="tasks"
                  onCellEdit={handleCellEdit}
                  errors={validationErrors.tasks}
                />
              </div>
            )}
          </div>
        </section>
      )}

      {activeTab === 'rules' && (
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Define Business Rules</h2>
          <RuleInputForm onAddRule={handleAddRule} />
          <RuleList rules={rules} />
        </section>
      )}

      {activeTab === 'priorities' && (
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Set Priorities & Export</h2>
          <PrioritySlider
            onUpdatePriorities={handleUpdatePriorities}
            initialPriorities={priorities}
          />
          <div className="flex justify-center">
            <Button
              variant="primary"
              onClick={handleExport}
              disabled={hasErrors}
            >
              Export Cleaned Data & Rules
            </Button>
          </div>
          {hasErrors && (
            <p className="text-red-500 text-center">
              Please fix all validation errors before exporting.
            </p>
          )}
        </section>
      )}
    </div>
  );
}


















