// export const downloadJsonFile = (data: any, filename: string) => {
//   const jsonString = JSON.stringify(data, null, 2);
//   const blob = new Blob([jsonString], { type: 'application/json' });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement('a');
//   a.href = url;
//   a.download = filename;
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);
//   URL.revokeObjectURL(url);
// };

// export const downloadCsvFile = (data: any[], filename: string) => {
//   if (data.length === 0) {
//     console.warn(`No data to export for ${filename}`);
//     return;
//   }

//   const headers = Object.keys(data[0]);
//   const csvRows = [
//     headers.join(','), // CSV Header
//     ...data.map(row => headers.map(header => {
//       const value = (row as any)[header];
//       // Handle values that might contain commas or newlines by quoting them
//       return `"${String(value).replace(/"/g, '""')}"`;
//     }).join(','))
//   ];

//   const csvString = csvRows.join('\n');
//   const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement('a');
//   a.href = url;
//   a.download = filename;
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);
//   URL.revokeObjectURL(url);
// };



// export const downloadJsonFile = <T>(data: T, filename: string): void => {
//   const jsonString = JSON.stringify(data, null, 2);
//   const blob = new Blob([jsonString], { type: 'application/json' });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement('a');
//   a.href = url;
//   a.download = filename;
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);
//   URL.revokeObjectURL(url);
// };

// export const downloadCsvFile = <T extends Record<string, any>>(data: T[], filename: string): void => {
//   if (data.length === 0) {
//     console.warn(`No data to export for ${filename}`);
//     return;
//   }

  

//   const headers = Object.keys(data[0]);
//   const csvRows = [
//     headers.join(','), // CSV Header
//     ...data.map(row => headers.map(header => {
//       const value = row[header];
//       // Handle values that might contain commas or newlines by quoting them
//       return `"${String(value).replace(/"/g, '""')}"`;
//     }).join(','))
//   ];

//   const csvString = csvRows.join('\n');
//   const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement('a');
//   a.href = url;
//   a.download = filename;
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);
//   URL.revokeObjectURL(url);
// };



/**
 * Downloads data as a JSON file
 * @param data The data to download (any serializable JSON object)
 * @param filename The name for the downloaded file (including .json extension)
 */
export const downloadJsonFile = (data: unknown, filename: string): void => {
  try {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading JSON file:', error);
  }
};

/**
 * Downloads an array of objects as a CSV file
 * @param data Array of objects with consistent shape
 * @param filename The name for the downloaded file (including .csv extension) 
 */
export const downloadCsvFile = <T extends object>(data: T[], filename: string): void => {
  if (data.length === 0) {
    console.warn(`No data to export for ${filename}`);
    return;
  }

  try {
    // Get headers from first object's keys
    const headers = Object.keys(data[0]);
    
    // Process each row
    const csvRows = [
      headers.join(','), // Header row
      ...data.map(row => 
        headers.map(header => {
          const value = row[header as keyof T];
          return `"${String(value).replace(/"/g, '""')}"`; // Escape quotes
        }).join(',')
      )
    ];

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
  } catch (error) {
    console.error('Error downloading CSV file:', error);
  }
};
