import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Trash2, 
  Download, 
  Eye, 
  Clock, 
  FileVideo, 
  FileImage, 
  Filter, 
  Calendar,
  AlertTriangle,
  History as HistoryIcon
} from 'lucide-react';
import { useHistory, type HistoryItem } from '../context/HistoryContext';
import { useToast } from '../context/ToastContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { EmptyState } from '../components/EmptyState';

export const History: React.FC = () => {
  const { history, clearHistory } = useHistory();
  const { showToast } = useToast();

  const [search, setSearch] = useState('');
  const [mediaFilter, setMediaFilter] = useState<'all' | 'image' | 'video'>('all');
  const [resultFilter, setResultFilter] = useState<'all' | 'REAL' | 'FAKE'>('all');
  
  // Modal states
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const [isConfirmClearOpen, setIsConfirmClearOpen] = useState(false);

  // Filtered History
  const filteredHistory = useMemo(() => {
    return history.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const matchesMedia = mediaFilter === 'all' || item.mediaType === mediaFilter;
      const matchesResult = resultFilter === 'all' || item.prediction === resultFilter;
      return matchesSearch && matchesMedia && matchesResult;
    });
  }, [history, search, mediaFilter, resultFilter]);

  const handleClearHistory = () => {
    clearHistory();
    setIsConfirmClearOpen(false);
    showToast("Audit logs cleared successfully", "info");
  };

  const downloadItemJSON = (item: HistoryItem) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(item, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `deeplens_report_${item.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast(`Verification log downloaded for ${item.name}`, 'success');
  };

  return (
    <div className="flex flex-col min-h-screen pt-[73px]">
      <div className="max-w-7xl mx-auto w-full px-6 py-12 flex flex-col gap-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border-custom pb-6">
          <div className="flex flex-col gap-2">
            <h1 className="font-heading text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              Verification Logs <HistoryIcon className="w-6 h-6 text-primary-indigo" />
            </h1>
            <p className="text-sm text-text-secondary">
              Search and filter comprehensive audits of your previous image and video analyses.
            </p>
          </div>
          {history.length > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              className="border-danger-red/35 hover:bg-danger-red/10 text-danger-red font-semibold"
              leftIcon={<Trash2 className="w-4 h-4" />}
              onClick={() => setIsConfirmClearOpen(true)}
            >
              Clear Logs
            </Button>
          )}
        </div>

        {/* Filter Controls Bar */}
        <Card className="p-4 border-white/5 bg-surface/30 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by file name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-background border border-border-custom rounded-xl py-2 pl-10 pr-4 text-xs text-white placeholder-text-secondary focus:outline-none focus:ring-1 focus:ring-primary-indigo transition-all"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
            {/* Format filter */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-text-secondary tracking-widest flex items-center gap-1 select-none"><Filter className="w-3 h-3 text-accent-cyan" /> format:</span>
              <div className="flex rounded-lg bg-background p-1 border border-border-custom">
                <button
                  onClick={() => setMediaFilter('all')}
                  className={`px-3 py-1 rounded-md text-[10px] font-bold tracking-wide transition-all ${mediaFilter === 'all' ? 'bg-primary-indigo text-white shadow-sm' : 'text-text-secondary hover:text-white'}`}
                >
                  All
                </button>
                <button
                  onClick={() => setMediaFilter('image')}
                  className={`px-3 py-1 rounded-md text-[10px] font-bold tracking-wide transition-all ${mediaFilter === 'image' ? 'bg-primary-indigo text-white shadow-sm' : 'text-text-secondary hover:text-white'}`}
                >
                  Images
                </button>
                <button
                  onClick={() => setMediaFilter('video')}
                  className={`px-3 py-1 rounded-md text-[10px] font-bold tracking-wide transition-all ${mediaFilter === 'video' ? 'bg-primary-indigo text-white shadow-sm' : 'text-text-secondary hover:text-white'}`}
                >
                  Videos
                </button>
              </div>
            </div>

            {/* Prediction Filter */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-text-secondary tracking-widest flex items-center gap-1 select-none"><Filter className="w-3 h-3 text-primary-indigo" /> integrity:</span>
              <div className="flex rounded-lg bg-background p-1 border border-border-custom">
                <button
                  onClick={() => setResultFilter('all')}
                  className={`px-3 py-1 rounded-md text-[10px] font-bold tracking-wide transition-all ${resultFilter === 'all' ? 'bg-accent-cyan text-background font-black shadow-sm' : 'text-text-secondary hover:text-white'}`}
                >
                  All
                </button>
                <button
                  onClick={() => setResultFilter('REAL')}
                  className={`px-3 py-1 rounded-md text-[10px] font-bold tracking-wide transition-all ${resultFilter === 'REAL' ? 'bg-success-green/10 text-success-green border border-success-green/20' : 'text-text-secondary hover:text-white'}`}
                >
                  Real
                </button>
                <button
                  onClick={() => setResultFilter('FAKE')}
                  className={`px-3 py-1 rounded-md text-[10px] font-bold tracking-wide transition-all ${resultFilter === 'FAKE' ? 'bg-danger-red/10 text-danger-red border border-danger-red/20' : 'text-text-secondary hover:text-white'}`}
                >
                  Fake
                </button>
              </div>
            </div>
          </div>

        </Card>

        {/* Logs Table */}
        {filteredHistory.length > 0 ? (
          <Card className="p-0 border-white/5 bg-surface/30 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border-custom bg-white/[0.02] text-text-secondary uppercase font-bold font-heading select-none">
                    <th className="px-6 py-4">File Details</th>
                    <th className="px-6 py-4">Format</th>
                    <th className="px-6 py-4">Inference Date</th>
                    <th className="px-6 py-4">Processing Time</th>
                    <th className="px-6 py-4 text-right">Confidence</th>
                    <th className="px-6 py-4 text-right">Result</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-custom/5 text-white font-medium">
                  <AnimatePresence>
                    {filteredHistory.map((item) => (
                      <motion.tr
                        key={item.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-white/[0.01] transition-colors"
                      >
                        {/* File Name & details */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white/5 border border-border-custom flex items-center justify-center text-text-secondary">
                              {item.mediaType === 'video' ? (
                                <FileVideo className="w-4 h-4 text-accent-cyan" />
                              ) : (
                                <FileImage className="w-4 h-4 text-primary-indigo" />
                              )}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-semibold text-white max-w-[220px] truncate block">
                                {item.name}
                              </span>
                              <span className="text-[10px] text-text-secondary">
                                {item.fileSize || 'N/A'} • {item.resolution || 'N/A'}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Format */}
                        <td className="px-6 py-4 capitalize text-text-secondary">
                          {item.mediaType}
                        </td>

                        {/* Date */}
                        <td className="px-6 py-4 text-text-secondary">
                          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {item.date}</span>
                        </td>

                        {/* Processing Speed */}
                        <td className="px-6 py-4 text-text-secondary">
                          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {item.processingTime}s</span>
                        </td>

                        {/* Confidence */}
                        <td className="px-6 py-4 text-right font-mono font-bold">
                          {item.confidence}%
                        </td>

                        {/* Result */}
                        <td className="px-6 py-4 text-right">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            item.prediction === 'REAL' 
                              ? 'bg-success-green/10 text-success-green border border-success-green/20' 
                              : 'bg-danger-red/10 text-danger-red border border-danger-red/20'
                          }`}>
                            {item.prediction}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedItem(item)}
                              title="Inspect Details"
                              className="w-7 h-7 rounded-lg hover:bg-white/5 border border-transparent hover:border-border-custom flex items-center justify-center text-text-secondary hover:text-white transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => downloadItemJSON(item)}
                              title="Download JSON Log"
                              className="w-7 h-7 rounded-lg hover:bg-white/5 border border-transparent hover:border-border-custom flex items-center justify-center text-text-secondary hover:text-white transition-colors"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </Card>
        ) : (
          <EmptyState 
            icon={<HistoryIcon className="w-8 h-8 text-text-secondary" />}
            title="No verification logs found"
            description={
              search || mediaFilter !== 'all' || resultFilter !== 'all'
                ? "Try adjusting your filters or search keywords to locate the media verification records."
                : "You haven't run any media verifications yet. Navigate to the AI Detection panel to perform your first scan."
            }
          />
        )}

      </div>

      {/* 1. Clear History Confirmation Modal */}
      <Modal
        isOpen={isConfirmClearOpen}
        onClose={() => setIsConfirmClearOpen(false)}
        title="Clear Audit Logs"
      >
        <div className="flex flex-col gap-4 text-sm">
          <div className="p-3 bg-danger-red/10 border border-danger-red/20 rounded-xl text-danger-red flex gap-3 items-start">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="flex flex-col gap-0.5">
              <span className="font-bold">Caution: Permanent Action</span>
              <p className="text-xs text-danger-red/80 leading-relaxed">
                This will delete all saved media verification logs from your local session. This action cannot be undone.
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" size="sm" onClick={() => setIsConfirmClearOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="primary" 
              size="sm" 
              className="bg-danger-red hover:bg-danger-red/80 border-transparent text-white" 
              onClick={handleClearHistory}
            >
              Clear Logs
            </Button>
          </div>
        </div>
      </Modal>

      {/* 2. Log Details Inspection Modal */}
      <Modal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        title="Log Metadata Audit"
      >
        {selectedItem && (
          <div className="flex flex-col gap-5 text-xs text-white">
            
            {/* Header Status */}
            <div className="flex items-center justify-between border-b border-border-custom pb-4">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase font-bold text-text-secondary">log sequence id</span>
                <span className="font-mono text-sm text-accent-cyan font-bold">{selectedItem.id}</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                selectedItem.prediction === 'REAL' 
                  ? 'bg-success-green/10 text-success-green border border-success-green/20' 
                  : 'bg-danger-red/10 text-danger-red border border-danger-red/20'
              }`}>
                {selectedItem.prediction}
              </span>
            </div>

            {/* Technical Parameters */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-3 rounded-xl border border-border-custom flex flex-col gap-1">
                <span className="text-[9px] uppercase tracking-wider text-text-secondary font-bold">File Name</span>
                <span className="font-semibold text-white truncate max-w-full" title={selectedItem.name}>{selectedItem.name}</span>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-border-custom flex flex-col gap-1">
                <span className="text-[9px] uppercase tracking-wider text-text-secondary font-bold">Media Format</span>
                <span className="font-semibold text-white capitalize">{selectedItem.mediaType}</span>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-border-custom flex flex-col gap-1">
                <span className="text-[9px] uppercase tracking-wider text-text-secondary font-bold">Verification Confidence</span>
                <span className="font-semibold text-white font-mono">{selectedItem.confidence}%</span>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-border-custom flex flex-col gap-1">
                <span className="text-[9px] uppercase tracking-wider text-text-secondary font-bold">Processing Time</span>
                <span className="font-semibold text-white font-mono">{selectedItem.processingTime} seconds</span>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-border-custom flex flex-col gap-1">
                <span className="text-[9px] uppercase tracking-wider text-text-secondary font-bold">File Size</span>
                <span className="font-semibold text-white">{selectedItem.fileSize || 'N/A'}</span>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-border-custom flex flex-col gap-1">
                <span className="text-[9px] uppercase tracking-wider text-text-secondary font-bold">Resolution Specs</span>
                <span className="font-semibold text-white font-mono">{selectedItem.resolution || 'N/A'}</span>
              </div>
            </div>

            {/* JSON Code block */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] uppercase font-bold text-text-secondary">Raw Cryptographic Data Logs</span>
              <pre className="p-3 bg-black/60 border border-border-custom rounded-xl font-mono text-[10px] text-text-secondary max-h-[140px] overflow-y-auto whitespace-pre-wrap select-all">
                {JSON.stringify(selectedItem, null, 2)}
              </pre>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedItem(null)}>
                Close
              </Button>
              <Button 
                variant="primary" 
                size="sm" 
                leftIcon={<Download className="w-4 h-4" />}
                onClick={() => {
                  downloadItemJSON(selectedItem);
                  setSelectedItem(null);
                }}
              >
                Download Report
              </Button>
            </div>

          </div>
        )}
      </Modal>

    </div>
  );
};
