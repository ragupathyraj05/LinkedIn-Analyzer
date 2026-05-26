import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HomePage from '@/pages/HomePage';
import ResultsPage from '@/pages/ResultsPage';
import ReportPage from '@/pages/ReportPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-bg text-text-primary font-body antialiased selection:bg-primary/20">
        <Toaster position="top-center" toastOptions={{ 
          duration: 3000,
          style: {
            background: 'var(--surface)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border)',
          }
        }} />
        
        <Routes>
          {/* Routes with standard Layout */}
          <Route path="/" element={
            <>
              <Header />
              <main className="flex-1 flex flex-col"><HomePage /></main>
              <Footer />
            </>
          } />
          <Route path="/results" element={
            <>
              <Header />
              <main className="flex-1 flex flex-col"><ResultsPage /></main>
              <Footer />
            </>
          } />

          {/* Print specific route without standard layout */}
          <Route path="/report" element={<ReportPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
