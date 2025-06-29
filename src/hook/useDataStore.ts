// import {create} from 'zustand';
// import { Client, Worker, Task, ValidationError } from '@/types';
// import { 
//   validateClientsData, 
//   validateWorkersData, 
//   validateTasksData 
// } from '@/lib/validation/coreValidator';

// interface DataStore {
//   clients: Client[];
//   workers: Worker[];
//   tasks: Task[];
//   addClient: (client: Client) => void;
//   updateClient: (clientId: string, updatedClient: Partial<Client>) => void;
//   removeClient: (clientId: string) => void;
//   addWorker: (worker: Worker) => void;
//   updateWorker: (workerId: string, updatedWorker: Partial<Worker>) => void;
//   removeWorker: (workerId: string) => void;
//   addTask: (task: Task) => void;
//   updateTask: (taskId: string, updatedTask: Partial<Task>) => void;
//   removeTask: (taskId: string) => void;
//   validateClients: () => ValidationError[];
//   validateWorkers: () => ValidationError[];
//   validateTasks: () => ValidationError[];
// }

// export const useDataStore = create<DataStore>((set, get) => ({
//   clients: [],
//   workers: [],
//   tasks: [],
  
//   // Add a new client
//   addClient: (client) => set((state) => ({ clients: [...state.clients, client] })),
  
//   // Update an existing client
//   updateClient: (clientId, updatedClient) => set((state) => ({
//     clients: state.clients.map(client => client.ClientID === clientId ? { ...client, ...updatedClient } : client)
//   })),
  
//   // Remove a client
//   removeClient: (clientId) => set((state) => ({
//     clients: state.clients.filter(client => client.ClientID !== clientId)
//   })),
  
//   // Add a new worker
//   addWorker: (worker) => set((state) => ({ workers: [...state.workers, worker] })),
  
//   // Update an existing worker
//   updateWorker: (workerId, updatedWorker) => set((state) => ({
//     workers: state.workers.map(worker => worker.WorkerID === workerId ? { ...worker, ...updatedWorker } : worker)
//   })),
  
//   // Remove a worker
//   removeWorker: (workerId) => set((state) => ({
//     workers: state.workers.filter(worker => worker.WorkerID !== workerId)
//   })),
  
//   // Add a new task
//   addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  
//   // Update an existing task
//   updateTask: (taskId, updatedTask) => set((state) => ({
//     tasks: state.tasks.map(task => task.TaskID === taskId ? { ...task, ...updatedTask } : task)
//   })),
  
//   // Remove a task
//   removeTask: (taskId) => set((state) => ({
//     tasks: state.tasks.filter(task => task.TaskID !== taskId)
//   })),
  
//   // Validate clients
//   validateClients: () => {
//     const currentClients = get().clients;
//     return validateClientsData(currentClients);
//   },

//   // Validate workers
//   validateWorkers: () => {
//     const currentWorkers = get().workers;
//     return validateWorkersData(currentWorkers);
//   },

//   // Validate tasks
//   validateTasks: () => {
//     const currentTasks = get().tasks;
//     return validateTasksData(currentTasks);
//   },
// }));











































































// import {create} from 'zustand';
// import { Client, Worker, Task, ValidationError } from '@/types';

// interface DataStore {
//   clients: Client[];
//   workers: Worker[];
//   tasks: Task[];
//   addClient: (client: Client) => void;
//   updateClient: (clientId: string, updatedClient: Partial<Client>) => void;
//   removeClient: (clientId: string) => void;
//   addWorker: (worker: Worker) => void;
//   updateWorker: (workerId: string, updatedWorker: Partial<Worker>) => void;
//   removeWorker: (workerId: string) => void;
//   addTask: (task: Task) => void;
//   updateTask: (taskId: string, updatedTask: Partial<Task>) => void;
//   removeTask: (taskId: string) => void;
//   validateClients: () => ValidationError[];
//   validateWorkers: () => ValidationError[];
//   validateTasks: () => ValidationError[];
// }

// export const useDataStore = create<DataStore>((set) => ({
//   clients: [],
//   workers: [],
//   tasks: [],
  
//   addClient: (client) => set((state) => ({ clients: [...state.clients, client] })),
//   updateClient: (clientId, updatedClient) => set((state) => ({
//     clients: state.clients.map(client => client.ClientID === clientId ? { ...client, ...updatedClient } : client)
//   })),
//   removeClient: (clientId) => set((state) => ({
//     clients: state.clients.filter(client => client.ClientID !== clientId)
//   })),
  
//   addWorker: (worker) => set((state) => ({ workers: [...state.workers, worker] })),
//   updateWorker: (workerId, updatedWorker) => set((state) => ({
//     workers: state.workers.map(worker => worker.WorkerID === workerId ? { ...worker, ...updatedWorker } : worker)
//   })),
//   removeWorker: (workerId) => set((state) => ({
//     workers: state.workers.filter(worker => worker.WorkerID !== workerId)
//   })),
  
//   addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
//   updateTask: (taskId, updatedTask) => set((state) => ({
//     tasks: state.tasks.map(task => task.TaskID === taskId ? { ...task, ...updatedTask } : task)
//   })),
//   removeTask: (taskId) => set((state) => ({
//     tasks: state.tasks.filter(task => task.TaskID !== taskId)
//   })),
  
//   validateClients: () => {
//     // Call your validation function here
//     return validateClientsData(get().clients);
//   },
//   validateWorkers: () => {
//     // Call your validation function here
//     return validateWorkersData(get().workers);
//   },
//   validateTasks: () => {
//     // Call your validation function here
//     return validateTasksData(get().tasks);
//   },
// }));











import { create } from 'zustand';
import { Client, Worker, Task, ValidationError, Rule, PrioritySetting } from '@/types';
import { 
  validateClientsData, 
  validateWorkersData, 
  validateTasksData 
} from '@/lib/validation/coreValidator';

interface DataStore {
  clients: Client[];
  workers: Worker[];
  tasks: Task[];
  validationErrors: {
    clients: ValidationError[];
    workers: ValidationError[];
    tasks: ValidationError[];
    overall?: ValidationError[];
  };
  rules: Rule[];
  priorities: PrioritySetting[];

  // Actions
  setData: (data: Partial<{
    clients: Client[];
    workers: Worker[];
    tasks: Task[];
    validationErrors: {
      clients: ValidationError[];
      workers: ValidationError[];
      tasks: ValidationError[];
      overall?: ValidationError[];
      errors?: ValidationError[]; // Optional for additional errors
    };
    
    rules: Rule[];
    priorities: PrioritySetting[];
  }>) => void;

  addClient: (client: Client) => void;
  updateClient: (clientId: string, updatedClient: Partial<Client>) => void;
  removeClient: (clientId: string) => void;
  
  addWorker: (worker: Worker) => void;
  updateWorker: (workerId: string, updatedWorker: Partial<Worker>) => void;
  removeWorker: (workerId: string) => void;
  
  addTask: (task: Task) => void;
  updateTask: (taskId: string, updatedTask: Partial<Task>) => void;
  removeTask: (taskId: string) => void;

  validateClients: () => ValidationError[];
  validateWorkers: () => ValidationError[];
  validateTasks: () => ValidationError[];
}

export const useDataStore = create<DataStore>((set, get) => ({
  clients: [],
  workers: [],
  tasks: [],
  validationErrors: {
    clients: [],
    workers: [],
    tasks: [],
  },
  rules: [],
  priorities: [],

  // Set multiple data at once (corrected implementation)
  setData: (data) => set((state) => {
    const newState = { ...state };
    if (data.clients) newState.clients = data.clients;
    if (data.workers) newState.workers = data.workers;
    if (data.tasks) newState.tasks = data.tasks;
    
    if (data.validationErrors) {
      newState.validationErrors = {
        ...state.validationErrors,
        ...data.validationErrors
      };
    }
    if (data.rules) newState.rules = data.rules;
    if (data.priorities) newState.priorities = data.priorities;
    return newState;
  }),

  // Add a new client
  addClient: (client) => set((state) => ({ clients: [...state.clients, client] })),
  
  // Update an existing client
  updateClient: (clientId, updatedClient) => set((state) => ({
    clients: state.clients.map(client => client.ClientID === clientId ? { ...client, ...updatedClient } : client)
  })),
  
  // Remove a client
  removeClient: (clientId) => set((state) => ({
    clients: state.clients.filter(client => client.ClientID !== clientId)
  })),
  
  // Add a new worker
  addWorker: (worker) => set((state) => ({ workers: [...state.workers, worker] })),
  
  // Update an existing worker
  updateWorker: (workerId, updatedWorker) => set((state) => ({
    workers: state.workers.map(worker => worker.WorkerID === workerId ? { ...worker, ...updatedWorker } : worker)
  })),
  
  // Remove a worker
  removeWorker: (workerId) => set((state) => ({
    workers: state.workers.filter(worker => worker.WorkerID !== workerId)
  })),
  
  // Add a new task
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  
  // Update an existing task
  updateTask: (taskId, updatedTask) => set((state) => ({
    tasks: state.tasks.map(task => task.TaskID === taskId ? { ...task, ...updatedTask } : task)
  })),
  
  // Remove a task
  removeTask: (taskId) => set((state) => ({
    tasks: state.tasks.filter(task => task.TaskID !== taskId)
  })),
  
  // Validate clients
  validateClients: () => {
    const currentClients = get().clients;
    return validateClientsData(currentClients);
  },

  // Validate workers
  validateWorkers: () => {
    const currentWorkers = get().workers;
    return validateWorkersData(currentWorkers);
  },

  // Validate tasks
  validateTasks: () => {
    const currentTasks = get().tasks;
    return validateTasksData(currentTasks);
  },
}));
