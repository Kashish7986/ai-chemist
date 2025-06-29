'use client';

// import React, { useState, useEffect, useMemo } from 'react';
// import {
//   useReactTable,
//   getCoreRowModel,
//   flexRender,
//   ColumnDef,
//   CellContext,
// } from '@tanstack/react-table';
// import { ParsedData, ValidationError } from '@/types';
// import Input from '@/components/common/Input';

// interface DataGridDisplayProps<T extends object> {
//   data: T[];
//   entity: keyof ParsedData;
//   onCellEdit: (entity: keyof ParsedData, rowIndex: number, columnId: string, value: any) => void;
//   errors: ValidationError[];
// }

// export default function DataGridDisplay<T extends object>({
//   data,
//   entity,
//   onCellEdit,
//   errors,
// }: DataGridDisplayProps<T>) {
//   const [editingCell, setEditingCell] = useState<{ rowIndex: number; columnId: string } | null>(null);

//   const getCellError = (rowIndex: number, columnId: string) => {
//     const rowErrors = errors.filter(
//       (err) =>
//         (err.id === (data[rowIndex] as any).ClientID ||
//          err.id === (data[rowIndex] as any).WorkerID ||
//          err.id === (data[rowIndex] as any).TaskID ||
//          err.id === String(rowIndex)) &&
//         (err.field === columnId || !err.field) // Match specific field or general row error
//     );
//     return rowErrors.length > 0 ? rowErrors : null;
//   };

//   const columns = useMemo<ColumnDef<T>[]>(
//     () => {
//       if (data.length === 0) return [];
//       return Object.keys(data[0]).map((key) => ({
//         accessorKey: key,
//         header: key,
//         cell: (info: CellContext<T, unknown>) => {
//           const rowIndex = info.row.index;
//           const columnId = info.column.id;
//           const cellValue = info.getValue();
//           const cellErrors = getCellError(rowIndex, columnId);

//           const isEditing = editingCell?.rowIndex === rowIndex && editingCell?.columnId === columnId;

//           return (
//             <div
//               className={`relative p-1 ${cellErrors ? 'bg-red-100 border border-red-500' : ''}`}
//               onClick={() => setEditingCell({ rowIndex, columnId })}
//             >
//               {isEditing ? (
//                 <Input
//                   type="text"
//                   value={String(cellValue)}
//                   onChange={(e) => onCellEdit(entity, rowIndex, columnId, e.target.value)}
//                   onBlur={() => setEditingCell(null)}
//                   autoFocus
//                   className="w-full p-0.5 border rounded text-sm"
//                 />
//               ) : (
//                 <span className="text-sm">
//                   {String(cellValue)}
//                 </span>
//               )}
//               {cellErrors && (
//                 <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-bl-md cursor-help"
//                      title={cellErrors.map(e => e.message).join('\n')}>
//                   !
//                 </div>
//               )}
//             </div>
//           );
//         },
//       }));
//     },
//     [data, editingCell, onCellEdit, entity, errors]
//   );

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   if (data.length === 0) {
//     return <div className="text-center text-gray-500 p-4 border rounded-lg bg-gray-50">No data uploaded yet.</div>;
//   }

//   return (
//     <div className="overflow-x-auto border rounded-lg shadow-sm bg-white">
//       <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-gray-50">
//           {table.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map((header) => (
//                 <th
//                   key={header.id}
//                   scope="col"
//                   className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   {header.isPlaceholder
//                     ? null
//                     : flexRender(header.column.columnDef.header, header.getContext())}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {table.getRowModel().rows.map((row) => (
//             <tr key={row.id}>
//               {row.getVisibleCells().map((cell) => (
//                 <td key={cell.id} className="px-4 py-1 whitespace-nowrap">
//                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


import React, { useState, useMemo, useCallback } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  CellContext,
} from '@tanstack/react-table';
import { ParsedData, ValidationError, Client, Worker, Task } from '@/types';
import Input from '@/components/common/Input';

interface DataGridDisplayProps<T extends Client | Worker | Task> {
  data: T[];
  entity: keyof ParsedData;
  onCellEdit: (entity: keyof ParsedData, rowIndex: number, columnId: string, value: string) => void;
  errors: ValidationError[];
}

export default function DataGridDisplay<T extends Client | Worker | Task>({
  data,
  entity,
  onCellEdit,
  errors,
}: DataGridDisplayProps<T>) {
  const [editingCell, setEditingCell] = useState<{ rowIndex: number; columnId: string } | null>(null);

  const getCellError = useCallback((rowIndex: number, columnId: string) => {
    const row = data[rowIndex];
    let id: string | undefined;
    
    if ('ClientID' in row) {
      id = row.ClientID;
    } else if ('WorkerID' in row) {
      id = row.WorkerID;
    } else if ('TaskID' in row) {
      id = row.TaskID;
    }

    return errors.filter(err => {
      const matchesId = err.id === id || err.id === String(rowIndex);
      const matchesField = !err.field || err.field === columnId;
      return matchesId && matchesField;
    });
  }, [data, errors]);

  const columns = useMemo<ColumnDef<T>[]>(() => {
    if (data.length === 0) return [];
    
    return Object.keys(data[0]).map((key) => ({
      accessorKey: key,
      header: key,
      cell: (info: CellContext<T, unknown>) => {
        const rowIndex = info.row.index;
        const columnId = info.column.id;
        const cellValue = info.getValue();
        const cellErrors = getCellError(rowIndex, columnId);

        const isEditing = editingCell?.rowIndex === rowIndex && editingCell?.columnId === columnId;

        return (
          <div
            className={`relative p-1 ${cellErrors.length ? 'bg-red-100 border border-red-500' : ''}`}
            onClick={() => setEditingCell({ rowIndex, columnId })}
          >
            {isEditing ? (
              <Input
                type="text"
                value={String(cellValue)}
                onChange={(e) => onCellEdit(entity, rowIndex, columnId, e.target.value)}
                onBlur={() => setEditingCell(null)}
                autoFocus
                className="w-full p-0.5 border rounded text-sm"
              />
            ) : (
              <span className="text-sm">
                {String(cellValue)}
              </span>
            )}
            {cellErrors.length > 0 && (
              <div 
                className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-bl-md cursor-help"
                title={cellErrors.map(e => e.message).join('\n')}
              >
                !
              </div>
            )}
          </div>
        );
      },
    }));
  }, [data, editingCell, entity, getCellError, onCellEdit]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (data.length === 0) {
    return <div className="text-center text-gray-500 p-4 border rounded-lg bg-gray-50">No data uploaded yet.</div>;
  }

  return (
    <div className="overflow-x-auto border rounded-lg shadow-sm bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-1 whitespace-nowrap">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

