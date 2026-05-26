import React, { useCallback, useState } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { parsePDF } from '@/lib/pdfUtils';

export default function PDFParser({ onTextExtracted, onError }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState('');

  const processFile = async (file) => {
    if (file.type !== 'application/pdf') {
      onError('Please upload a valid PDF file.');
      return;
    }
    
    try {
      setIsProcessing(true);
      setFileName(file.name);
      const text = await parsePDF(file);
      if (!text || text.trim().length < 50) {
        throw new Error('Extracted text was too short. Please upload a valid LinkedIn PDF export.');
      }
      onTextExtracted(text);
    } catch (err) {
      onError(err.message || 'Failed to parse PDF.');
      setFileName('');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 text-center transition-all ${isDragging ? 'border-primary bg-primary/5' : 'border-border bg-surface hover:border-text-secondary/50'}`}
    >
      <input
        type="file"
        accept=".pdf"
        onChange={handleChange}
        className="absolute inset-0 z-50 h-full w-full cursor-pointer opacity-0"
        title=""
      />
      
      {isProcessing ? (
        <div className="flex flex-col items-center text-primary animate-pulse">
          <UploadCloud className="mb-3 h-12 w-12" />
          <p className="text-sm font-medium">Extracting profile data...</p>
        </div>
      ) : fileName ? (
        <div className="flex flex-col items-center text-success">
          <CheckCircle2 className="mb-3 h-12 w-12" />
          <p className="text-sm font-medium">Successfully processed {fileName}</p>
          <p className="mt-1 text-xs text-text-secondary">Click or drag another to replace</p>
        </div>
      ) : (
        <div className="flex flex-col items-center text-text-secondary pointer-events-none">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <FileText className="h-8 w-8" />
          </div>
          <p className="mb-1 text-base font-medium text-text-primary">Click to upload or drag and drop</p>
          <p className="text-sm">LinkedIn PDF Export (Max 5MB)</p>
          <div className="mt-6 flex items-center justify-center gap-1 text-xs font-medium text-primary bg-primary/10 rounded-full px-3 py-1">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>Go to Profile → More → Save to PDF</span>
          </div>
        </div>
      )}
    </div>
  );
}
