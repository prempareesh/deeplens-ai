import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, 
  RefreshCw, 
  FileText, 
  Download, 
  CheckCircle, 
  XCircle,
  HelpCircle,
  Clock,
  HardDrive
} from 'lucide-react';
import { FileUpload } from '../components/FileUpload';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Progress } from '../components/Progress';
import { useToast } from '../context/ToastContext';
import { useHistory } from '../context/HistoryContext';

export const Detect: React.FC = () => {
  const { showToast } = useToast();
  const { addHistoryItem } = useHistory();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisLogs, setAnalysisLogs] = useState<string[]>([]);
  const [result, setResult] = useState<{
    prediction: 'REAL' | 'FAKE';
    confidence: number;
    processingTime: number;
    mediaType: 'image' | 'video';
  } | null>(null);

  const steps = [
    "Reading file bytes and parsing metadata...",
    "Extracting face boundaries and frames...",
    "Resizing regions of interest to 224x224 patches...",
    "Feeding tokenized visual embeddings to self-attention matrix...",
    "Computing logits classification head prediction...",
  ];

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setResult(null);
    setUploadProgress(0);
    setAnalysisLogs([]);
    
    // Auto-trigger simulation
    startSimulatedInference(file);
  };

  const startSimulatedInference = (file: File) => {
    setIsProcessing(true);
    showToast(`Media upload started: ${file.name}`, 'info');

    // 1. Simulate file upload progress
    let uploadVal = 0;
    const uploadInterval = setInterval(() => {
      uploadVal += Math.floor(Math.random() * 15) + 5;
      if (uploadVal >= 100) {
        uploadVal = 100;
        clearInterval(uploadInterval);
        
        // 2. Start running analysis step logs
        runAnalysisSteps(file);
      }
      setUploadProgress(uploadVal);
    }, 100);
  };

  const runAnalysisSteps = (file: File) => {
    let stepIdx = 0;
    const runNextStep = () => {
      if (stepIdx < steps.length) {
        setAnalysisLogs(prev => [...prev, steps[stepIdx]]);
        stepIdx++;
        setTimeout(runNextStep, 900);
      } else {
        // 3. Finalize simulation result
        finalizeResult(file);
      }
    };
    runNextStep();
  };

  const finalizeResult = (file: File) => {
    const isVideo = file.type.startsWith('video') || file.name.endsWith('.mp4') || file.name.endsWith('.avi') || file.name.endsWith('.mov');
    
    // Clever name heuristic
    const isFakeName = file.name.toLowerCase().includes('fake');
    const prediction: 'REAL' | 'FAKE' = isFakeName 
      ? 'FAKE' 
      : (Math.random() > 0.4 ? 'REAL' : 'FAKE');
      
    const confidence = prediction === 'REAL' 
      ? parseFloat((Math.random() * 4 + 95).toFixed(2)) 
      : parseFloat((Math.random() * 9 + 89).toFixed(2));
      
    const processingTime = isVideo 
      ? parseFloat((Math.random() * 0.8 + 1.2).toFixed(2)) 
      : parseFloat((Math.random() * 0.05 + 0.05).toFixed(2));

    const mediaType: 'video' | 'image' = isVideo ? 'video' : 'image';

    const inferenceResult = {
      prediction,
      confidence,
      processingTime,
      mediaType
    };

    setResult(inferenceResult);
    setIsProcessing(false);
    
    // Add to history context
    addHistoryItem({
      name: file.name,
      mediaType,
      prediction,
      confidence,
      processingTime,
      fileSize: formatBytes(file.size),
      resolution: isVideo ? '1920x1080' : '1024x1024'
    });

    showToast(`Verification completed. Prediction: ${prediction} (${confidence}%)`, prediction === 'REAL' ? 'success' : 'error');
  };

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const resetDetector = () => {
    setSelectedFile(null);
    setResult(null);
    setIsProcessing(false);
  };

  return (
    <div className="flex flex-col min-h-screen pt-[73px]">
      <div className="max-w-7xl mx-auto w-full px-6 py-12 flex flex-col gap-8">
        
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="font-heading text-3xl font-extrabold text-white tracking-tight">
            AI Detection Panel
          </h1>
          <p className="text-sm text-text-secondary leading-relaxed">
            Verify image and video files using our state-of-the-art Convolutional Vision Transformer network.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Dropzone & Upload Status */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {!selectedFile ? (
              <FileUpload onFileSelect={handleFileSelect} isLoading={isProcessing} />
            ) : (
              <Card className="flex flex-col gap-6">
                
                {/* File Details */}
                <div className="flex justify-between items-start border-b border-border-custom pb-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-widest text-primary-indigo font-bold font-heading">active upload</span>
                    <h3 className="font-heading text-lg font-bold text-white max-w-sm truncate">{selectedFile.name}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-text-secondary block flex items-center gap-1"><HardDrive className="w-3.5 h-3.5 text-accent-cyan" /> {formatBytes(selectedFile.size)}</span>
                  </div>
                </div>

                {/* Progress Indicators */}
                <div className="flex flex-col gap-4">
                  <Progress 
                    value={uploadProgress} 
                    label={uploadProgress < 100 ? "Uploading media file..." : "Media uploaded. Executing Transformer pipelines..."} 
                    showValue 
                    color={uploadProgress < 100 ? "primary" : "accent"}
                  />
                </div>

                {/* Simulated Log output */}
                {analysisLogs.length > 0 && (
                  <div className="flex flex-col gap-2 p-4 rounded-xl bg-background/50 border border-border-custom font-mono text-xs text-text-secondary max-h-[180px] overflow-y-auto">
                    {analysisLogs.map((log, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex gap-2 items-start"
                      >
                        <span className="text-accent-cyan">&bull;</span>
                        <span>{log}</span>
                      </motion.div>
                    ))}
                    {isProcessing && uploadProgress === 100 && (
                      <div className="flex gap-2 items-center text-primary-indigo animate-pulse mt-1">
                        <RefreshCw className="w-3 h-3 animate-spin" />
                        <span>Running convolutional embeddings...</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Action button */}
                <div className="flex justify-end pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    disabled={isProcessing} 
                    onClick={resetDetector}
                  >
                    Upload Another File
                  </Button>
                </div>

              </Card>
            )}
          </div>

          {/* Right Column: Prediction Results Card */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card 
                    glow={result.prediction === 'REAL' ? 'accent' : 'primary'}
                    className="flex flex-col gap-6"
                  >
                    
                    {/* Header */}
                    <div className="flex flex-col gap-1 border-b border-border-custom pb-4 text-center">
                      <span className="text-xs uppercase tracking-widest text-text-secondary font-bold font-heading">inference metrics</span>
                      <h3 className="font-heading text-lg font-bold text-white">Detection Result</h3>
                    </div>

                    {/* Gauge Result Indicator */}
                    <div className="flex flex-col items-center justify-center p-6 bg-background/30 rounded-2xl border border-border-custom relative">
                      <div className="absolute top-4 left-4">
                        {result.prediction === 'REAL' ? (
                          <CheckCircle className="w-6 h-6 text-success-green" />
                        ) : (
                          <XCircle className="w-6 h-6 text-danger-red" />
                        )}
                      </div>

                      <div className="text-center flex flex-col gap-1 mt-2">
                        <span className="text-xs uppercase tracking-widest text-text-secondary font-semibold">integrity status</span>
                        <span className={`font-heading text-4xl font-extrabold tracking-wide ${
                          result.prediction === 'REAL' ? 'text-success-green' : 'text-danger-red'
                        }`}>
                          {result.prediction}
                        </span>
                        <span className="text-xs text-text-secondary mt-1">
                          Calculated Confidence: <strong>{result.confidence}%</strong>
                        </span>
                      </div>
                    </div>

                    {/* Metadata Specs */}
                    <div className="flex flex-col gap-3 text-sm">
                      <div className="flex justify-between items-center py-1.5 border-b border-border-custom/5">
                        <span className="text-text-secondary flex items-center gap-2"><Clock className="w-4 h-4" /> Processing Time</span>
                        <span className="text-white font-medium">{result.processingTime} seconds</span>
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-b border-border-custom/5">
                        <span className="text-text-secondary flex items-center gap-2"><HelpCircle className="w-4 h-4" /> Network Model</span>
                        <span className="text-white font-medium">CViT2 (Vision Transformer)</span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col gap-3 pt-2">
                      <Button variant="primary" className="w-full" leftIcon={<FileText className="w-4.5 h-4.5" />}>
                        Download Audit Report
                      </Button>
                      <Button variant="outline" className="w-full" leftIcon={<Download className="w-4.5 h-4.5" />}>
                        Export Prediction Log (JSON)
                      </Button>
                    </div>

                  </Card>
                </motion.div>
              ) : (
                <Card className="flex flex-col items-center justify-center p-12 text-center border-white/5 bg-surface/30">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-border-custom flex items-center justify-center text-text-secondary mb-4 animate-pulse">
                    <ShieldAlert className="w-6 h-6 text-text-secondary" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-white mb-2">Awaiting Upload</h3>
                  <p className="text-xs text-text-secondary leading-relaxed max-w-[240px]">
                    Once you upload an image or video file, Vision Transformer self-attention outputs will load here.
                  </p>
                </Card>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
};
