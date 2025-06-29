// import * as XLSX from 'xlsx';

// export const parseXlsxFile = <T>(file: File): Promise<T[]> => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();

//     reader.onload = (event) => {
//       try {
//         const data = new Uint8Array(event.target?.result as ArrayBuffer);
//         const workbook = XLSX.read(data, { type: 'array' });
//         const sheetName = workbook.SheetNames[0];
//         const worksheet = workbook.Sheets[sheetName];
//         const json = XLSX.utils.sheet_to_json<T>(worksheet);
//         resolve(json);
//       } catch (error: any) {
//         reject(new Error(`Failed to parse XLSX: ${error.message}`));
//       }
//     };

//     reader.onerror = () => {
//       reject(new Error('Failed to read file.'));
//     };

//     reader.readAsArrayBuffer(file);
//   });
// };


import * as XLSX from 'xlsx';

export const parseXlsxFile = <T>(file: File): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        // Ensure the result is an ArrayBuffer
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        
        // Read the workbook from the data
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Get the first sheet name
        const sheetName = workbook.SheetNames[0];
        
        // Get the worksheet
        const worksheet = workbook.Sheets[sheetName];
        
        // Convert the worksheet to JSON
        const json = XLSX.utils.sheet_to_json<T>(worksheet, { header: 1 }); // Use header: 1 if you want an array of arrays
        
        resolve(json);
      } catch (error) {
        // Handle any parsing errors
        reject(new Error(`Failed to parse XLSX: ${error instanceof Error ? error.message : 'Unknown error'}`));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file.'));
    };

    // Read the file as an ArrayBuffer
    reader.readAsArrayBuffer(file);
  });
};
