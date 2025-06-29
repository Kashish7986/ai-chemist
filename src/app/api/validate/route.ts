import { NextRequest, NextResponse } from 'next/server';
import { parseCsvFileStream } from '@/lib/data-processing/csvParser';
import { parseXlsxFile } from '@/lib/data-processing/xlsxParser';
import { Client, Worker, Task, ParsedData } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const clientsFile = formData.get('clients') as File | null;
    const workersFile = formData.get('workers') as File | null;
    const tasksFile = formData.get('tasks') as File | null;

    const parsedData: Partial<ParsedData> = {};

    if (clientsFile) {
      const fileType = clientsFile.name.split('.').pop();
      if (fileType === 'csv') {
        parsedData.clients = await parseCsvFileStream<Client>(clientsFile);
      } else if (fileType === 'xlsx') {
        parsedData.clients = await parseXlsxFile<Client>(clientsFile);
      } else {
        return NextResponse.json({ error: 'Unsupported file type for clients.' }, { status: 400 });
      }
    }

    if (workersFile) {
      const fileType = workersFile.name.split('.').pop();
      if (fileType === 'csv') {
        parsedData.workers = await parseCsvFileStream<Worker>(workersFile);
      } else if (fileType === 'xlsx') {
        parsedData.workers = await parseXlsxFile<Worker>(workersFile);
      } else {
        return NextResponse.json({ error: 'Unsupported file type for workers.' }, { status: 400 });
      }
    }

    if (tasksFile) {
      const fileType = tasksFile.name.split('.').pop();
      if (fileType === 'csv') {
        parsedData.tasks = await parseCsvFileStream<Task>(tasksFile);
      } else if (fileType === 'xlsx') {
        parsedData.tasks = await parseXlsxFile<Task>(tasksFile);
      } else {
        return NextResponse.json({ error: 'Unsupported file type for tasks.' }, { status: 400 });
      }
    }

    return NextResponse.json(parsedData, { status: 200 });
  } catch (error) {
    console.error('File upload API error:', error);
    return NextResponse.json({ error: (error as Error).message || 'Failed to process files.' }, { status: 500 });
  }
}

