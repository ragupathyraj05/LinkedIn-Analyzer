import React from 'react';
import { Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useExport } from '@/hooks/useExport';

export default function ExportReport({ elementId = 'dashboard-results' }) {
  const { isExporting, exportPDF } = useExport();

  return (
    <Button 
      onClick={() => exportPDF(elementId)} 
      disabled={isExporting}
      variant="outline"
      className="flex items-center gap-2 border-primary/20 bg-surface text-primary hover:bg-primary/5 border shadow-sm font-semibold"
    >
      {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
      {isExporting ? 'Generating PDF...' : 'Download Report'}
    </Button>
  );
}
