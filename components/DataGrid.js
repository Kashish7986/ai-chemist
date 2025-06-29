import { useState } from 'react';

export default function DataGrid({ data, onCellEdit }) {
  const [editingCell, setEditingCell] = useState(null);

  const handleCellClick = (rowIndex, colKey) => {
    setEditingCell({ rowIndex, colKey });
  };

  const handleCellChange = (e, rowIndex, colKey) => {
    onCellEdit(rowIndex, colKey, e.target.value);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border">
        <thead>
          <tr>
            {Object.keys(data[0] || {}).map((header) => (
              <th key={header} className="border p-2 bg-gray-100">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.entries(row).map(([key, value]) => (
                <td 
                  key={key} 
                  className={
                    `border p-2 ${editingCell?.rowIndex === rowIndex && 
                     editingCell?.colKey === key ? 'bg-blue-50' : ''}`
                  }
                  onClick={() => handleCellClick(rowIndex, key)}
                >
                  {editingCell?.rowIndex === rowIndex && 
                   editingCell?.colKey === key ? (
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleCellChange(e, rowIndex, key)}
                      onBlur={() => setEditingCell(null)}
                      autoFocus
                      className="w-full"
                    />
                  ) : (
                    value
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
