// 'use client';

// import { useState, ChangeEvent } from 'react';
// import Button from '@/components/common/Button';
// import Input from '@/components/common/Input';
// import { ParsedData } from '@/types';

// interface FileUploadSectionProps {
//   onDataParsed: (data: Partial<ParsedData>) => void;
// }

// export default function FileUploadSection({ onDataParsed }: FileUploadSectionProps) {
//   const [clientFile, setClientFile] = useState<File | null>(null);
//   const [workerFile, setWorkerFile] = useState<File | null>(null);
//   const [taskFile, setTaskFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<File | null>>) => {
//     if (e.target.files && e.target.files[0]) {
//       setter(e.target.files[0]);
//     }
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     setError(null);

//     const formData = new FormData();
//     if (clientFile) formData.append('clients', clientFile);
//     if (workerFile) formData.append('workers', workerFile);
//     if (taskFile) formData.append('tasks', taskFile);

//     try {
//       const res = await fetch('/api/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.error || 'File upload failed');
//       }

//       const data: ParsedData = await res.json();
//        onDataParsed(data);
//     } catch (err) {
//       if (err instanceof Error) {
//         setError(err.message);
//       } else {
//         setError('An unknown error occurred');
//       }
//       console.error('Upload error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };


//   return (
//     <div className="p-6 border rounded-lg shadow-md bg-white space-y-4">
//       <h3 className="text-xl font-semibold mb-4">Upload Data Files (CSV or XLSX)</h3>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Clients Data</label>
//           <Input type="file" accept=".csv,.xlsx" onChange={(e) => handleFileChange(e, setClientFile)} />
//           {clientFile && <p className="text-xs text-gray-500 mt-1">{clientFile.name}</p>}
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Workers Data</label>
//           <Input type="file" accept=".csv,.xlsx" onChange={(e) => handleFileChange(e, setWorkerFile)} />
//           {workerFile && <p className="text-xs text-gray-500 mt-1">{workerFile.name}</p>}
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Tasks Data</label>
//           <Input type="file" accept=".csv,.xlsx" onChange={(e) => handleFileChange(e, setTaskFile)} />
//           {taskFile && <p className="text-xs text-gray-500 mt-1">{taskFile.name}</p>}
//         </div>
//       </div>
//       {error && <p className="text-red-500 text-sm">{error}</p>}
//       <Button onClick={handleSubmit} disabled={loading || (!clientFile && !workerFile && !taskFile)}>
//         {loading ? 'Processing...' : 'Upload & Parse Data'}
//       </Button>
//     </div>
//   );
// }


// import { useState, ChangeEvent } from 'react';
// import Button from '@/components/common/Button';
// import Input from '@/components/common/Input';
// import { ParsedData } from '@/types';

// interface FileUploadSectionProps {
//   onDataParsed: (data: Partial<ParsedData>) => void;
// }

// export default function FileUploadSection({ onDataParsed }: FileUploadSectionProps) {
//   const [clientFile, setClientFile] = useState<File | null>(null);
//   const [workerFile, setWorkerFile] = useState<File | null>(null);
//   const [taskFile, setTaskFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<File | null>>) => {
//     if (e.target.files && e.target.files[0]) {
//       setter(e.target.files[0]);
//     }
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     setError(null);

//     const formData = new FormData();
//     if (clientFile) formData.append('clients', clientFile);
//     if (workerFile) formData.append('workers', workerFile);
//     if (taskFile) formData.append('tasks', taskFile);

//     try {
//       const res = await fetch('/api/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.error || 'File upload failed');
//       }

//       const data: ParsedData = await res.json();
//       onDataParsed(data);
//     } catch (err) {
//       if (err instanceof Error) {
//         setError(err.message);
//       } else {
//         setError('An unknown error occurred');
//       }
//       console.error('Upload error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 border rounded-lg shadow-md bg-white space-y-4">
//       <h3 className="text-xl font-semibold mb-4">Upload Data Files (CSV or XLSX)</h3>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Clients Data</label>
//           <input
//             type="file"
//             accept=".csv,.xlsx"
//             onChange={(e) => handleFileChange(e, setClientFile)}
//             className="block w-full text-sm text-gray-500
//               file:mr-4 file:py-2 file:px-4
//               file:rounded-md file:border-0
//               file:text-sm file:font-semibold
//               file:bg-blue-50 file:text-blue-700
//               hover:file:bg-blue-100"
//           />
//           {clientFile && <p className="text-xs text-gray-500 mt-1">{clientFile.name}</p>}
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Workers Data</label>
//           <input
//             type="file"
//             accept=".csv,.xlsx"
//             onChange={(e) => handleFileChange(e, setWorkerFile)}
//             className="block w-full text-sm text-gray-500
//               file:mr-4 file:py-2 file:px-4
//               file:rounded-md file:border-0
//               file:text-sm file:font-semibold
//               file:bg-blue-50 file:text-blue-700
//               hover:file:bg-blue-100"
//           />
//           {workerFile && <p className="text-xs text-gray-500 mt-1">{workerFile.name}</p>}
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Tasks Data</label>
//           <input
//             type="file"
//             accept=".csv,.xlsx"
//             onChange={(e) => handleFileChange(e, setTaskFile)}
//             className="block w-full text-sm text-gray-500
//               file:mr-4 file:py-2 file:px-4
//               file:rounded-md file:border-0
//               file:text-sm file:font-semibold
//               file:bg-blue-50 file:text-blue-700
//               hover:file:bg-blue-100"
//           />
//           {taskFile && <p className="text-xs text-gray-500 mt-1">{taskFile.name}</p>}
//         </div>
//       </div>
//       {error && <p className="text-red-500 text-sm">{error}</p>}
//       <Button onClick={handleSubmit} disabled={loading || (!clientFile && !workerFile && !taskFile)}>
//         {loading ? 'Processing...' : 'Upload & Parse Data'}
//       </Button>
//     </div>
//   );
// }




  'use client';

import { useState, ChangeEvent } from 'react';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { ParsedData } from '@/types';

interface FileUploadSectionProps {
  onDataParsed: (data: Partial<ParsedData>) => void;
}

export default function FileUploadSection({ onDataParsed }: FileUploadSectionProps) {
  const [clientFile, setClientFile] = useState<File | null>(null);
  const [workerFile, setWorkerFile] = useState<File | null>(null);
  const [taskFile, setTaskFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    if (clientFile) formData.append('clients', clientFile);
    if (workerFile) formData.append('workers', workerFile);
    if (taskFile) formData.append('tasks', taskFile);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'File upload failed');
      }

      const data: ParsedData = await res.json();
      onDataParsed(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 border rounded-lg shadow-md bg-white space-y-4">
      <h3 className="text-xl font-semibold mb-4">Upload Data Files (CSV or XLSX)</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Clients Data</label>
          <Input type="file" accept=".csv,.xlsx" onChange={(e) => handleFileChange(e, setClientFile)} />
          {clientFile && <p className="text-xs text-gray-500 mt-1">{clientFile.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Workers Data</label>
          <Input type="file" accept=".csv,.xlsx" onChange={(e) => handleFileChange(e, setWorkerFile)} />
          {workerFile && <p className="text-xs text-gray-500 mt-1">{workerFile.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tasks Data</label>
          <Input type="file" accept=".csv,.xlsx" onChange={(e) => handleFileChange(e, setTaskFile)} />
          {taskFile && <p className="text-xs text-gray-500 mt-1">{taskFile.name}</p>}
        </div>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button onClick={handleSubmit} disabled={loading || (!clientFile && !workerFile && !taskFile)}>
        {loading ? 'Processing...' : 'Upload & Parse Data'}
      </Button>
    </div>
  );
}
