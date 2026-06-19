import { NextRequest, NextResponse } from 'next/server';
import { buildDocumentFromText, MAX_UPLOAD_BYTES, validateUploadFile } from '@/lib/ingest-document';

export const runtime = 'nodejs';

async function extractPdfText(buffer: Buffer): Promise<string> {
  const { PDFParse } = await import('pdf-parse');
  const parser = new PDFParse({ data: buffer });
  try {
    const result = await parser.getText();
    return result.text ?? '';
  } finally {
    await parser.destroy();
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
    }

    const validationError = validateUploadFile({ name: file.name, size: file.size });
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const lower = file.name.toLowerCase();
    let rawText = '';

    if (lower.endsWith('.pdf')) {
      const buffer = Buffer.from(await file.arrayBuffer());
      if (buffer.byteLength > MAX_UPLOAD_BYTES) {
        return NextResponse.json({ error: 'File must be 5 MB or smaller.' }, { status: 400 });
      }
      rawText = await extractPdfText(buffer);
    } else {
      rawText = await file.text();
    }

    const title = file.name.replace(/\.[^.]+$/, '');
    const document = buildDocumentFromText(rawText, { title });

    return NextResponse.json({ document });
  } catch (err) {
    console.error('Ingest error:', err);
    const message = err instanceof Error ? err.message : 'Failed to process file.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
