// import csv from 'csv-parser';
// import { Readable } from 'stream';

// export const parseCsvFile = <T>(file: File): Promise<T[]> => {
//   return new Promise((resolve, reject) => {
//     const results: T[] = [];
//     const reader = new FileReader();

//     reader.onload = (event) => {
//       const csvString = event.target?.result as string;
//       const stream = Readable.from(csvString);

//       stream
//         .pipe(csv())
//         .on('data', (data) => results.push(data))
//         .on('end', () => {
//           resolve(results);
//         })
//         .on('error', (error) => {
//           reject(new Error(`Failed to parse CSV: ${error.message}`));
//         });
//     };

//     reader.onerror = () => {
//       reject(new Error('Failed to read file.'));
//     };

//     reader.readAsText(file);
//   });
// };



import { parse } from 'csv-parse';

export const parseCsvFileStream = <T>(file: File): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const results: T[] = [];

    reader.onload = async (event) => {
      try {
        const csvString = event.target?.result;
        if (typeof csvString !== 'string') {
          throw new Error('Failed to read file as text');
        }

        const parser = parse({
          columns: true,
          skip_empty_lines: true,
          trim: true,
          cast: true
        });

        const chunks = csvString.match(/.{1,10000}/g) || []; // Split into chunks
        for (const chunk of chunks) {
          parser.write(chunk);
          for await (const record of parser) {
            results.push(record as T);
          }
        }

        resolve(results);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to parse CSV';
        reject(new Error(message));
      }
    };

    reader.onerror = () => {
      reject(new Error(reader.error?.message || 'Failed to read file'));
    };

    reader.readAsText(file);
  });
};
