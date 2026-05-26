import { useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import toast from 'react-hot-toast';

export function useExport() {
  const [isExporting, setIsExporting] = useState(false);

  const exportPDF = async (elementId, filename = 'linkedin-analysis-report.pdf') => {
    try {
      setIsExporting(true);
      toast.loading('Preparing your report...', { id: 'pdf-export' });

      // Find the element to export
      const element = document.getElementById(elementId);
      if (!element) {
        throw new Error('Export container not found');
      }

      // Convert to canvas
      const canvas = await html2canvas(element, {
         scale: 2, // Higher resolution
         useCORS: true,
         logging: false,
         windowWidth: element.scrollWidth,
         windowHeight: element.scrollHeight
      });

      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      
      // Calculate PDF dimensions (A4 size)
      const pdf = new jsPDF({
         orientation: 'portrait',
         unit: 'px',
         format: [canvas.width, canvas.height] 
         // Alternatively, we could map to standard A4 and paginate, 
         // but a single continuous page looks better for digital reports.
      });

      pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
      
      // Save it
      pdf.save(filename);
      toast.success('Report downloaded successfully!', { id: 'pdf-export' });
    } catch (error) {
      console.error('PDF Export Error:', error);
      toast.error('Failed to generate PDF report', { id: 'pdf-export' });
    } finally {
      setIsExporting(false);
    }
  };

  return { isExporting, exportPDF };
}
