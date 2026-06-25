import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Book, 
  Terminal, 
  Code, 
  FolderGit2, 
  ChevronRight, 
  Cpu, 
  Layers,
  CheckCircle,
  Copy,
  Check
} from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useToast } from '../context/ToastContext';

type TabId = 'overview' | 'api' | 'cli' | 'weights';

export const Docs: React.FC = () => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast("Code block copied", "success");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const navItems = [
    { id: 'overview', label: 'Platform Overview', icon: <Book className="w-4 h-4" /> },
    { id: 'api', label: 'FastAPI Integration', icon: <Code className="w-4 h-4" /> },
    { id: 'cli', label: 'CLI Prediction Tool', icon: <Terminal className="w-4 h-4" /> },
    { id: 'weights', label: 'Model Weights Setup', icon: <FolderGit2 className="w-4 h-4" /> }
  ] as const;

  const curlExample = `curl -X 'POST' \\
  'http://localhost:8000/predict' \\
  -H 'accept: application/json' \\
  -H 'Content-Type: multipart/form-data' \\
  -F 'file=@sample_image.jpg'`;

  const pythonExample = `import requests

url = "http://localhost:8000/predict"
files = {"file": ("sample_image.jpg", open("sample_image.jpg", "rb"), "image/jpeg")}

response = requests.post(url, files=files)
print(response.json())
# Output:
# {
#   "prediction": "REAL",
#   "confidence": 98.85,
#   "processing_time": 0.08,
#   "media_type": "image"
# }`;

  const cliExample = `python cvit_prediction.py \\
  --p /path/to/video.mp4 \\
  --f 15 \\
  --n cvit2 \\
  --w cvit2_deepfake_detection_ep_50 \\
  --fp16 y`;

  const weightFolderStructure = `backend/
└── ai_model/
    └── weight/
        ├── cvit_deepfake_detection_ep_50.pth
        └── cvit2_deepfake_detection_ep_50.pth`;

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              <h2 className="font-heading text-xl font-bold text-white tracking-tight">Platform Overview</h2>
              <p className="text-xs text-text-secondary leading-relaxed">
                DeepLens is a deepfake classification suite built with Convolutional Vision Transformers (CViT) for high-fidelity detection.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="p-5 border-white/5 bg-surface/30 flex flex-col gap-2">
                <span className="w-8 h-8 rounded-lg bg-white/5 border border-border-custom flex items-center justify-center text-accent-cyan mb-1">
                  <Cpu className="w-4 h-4" />
                </span>
                <h4 className="font-heading font-bold text-sm text-white">Hybrid Transformers</h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Incorporates convolution kernels to learn low-level textures, passing inputs directly to multi-head self-attention encoders.
                </p>
              </Card>
              <Card className="p-5 border-white/5 bg-surface/30 flex flex-col gap-2">
                <span className="w-8 h-8 rounded-lg bg-white/5 border border-border-custom flex items-center justify-center text-primary-indigo mb-1">
                  <Layers className="w-4 h-4" />
                </span>
                <h4 className="font-heading font-bold text-sm text-white">Dual Mode Support</h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Supports image classifications (single frame logits evaluation) and temporal video sequence predictions across frame blocks.
                </p>
              </Card>
            </div>

            <div className="flex flex-col gap-3 mt-2">
              <h3 className="font-heading text-sm font-bold text-white tracking-wide">Standard Features</h3>
              <ul className="flex flex-col gap-2.5 text-xs text-text-secondary">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success-green flex-shrink-0 mt-0.5" />
                  <span>Real-time analysis output logs displaying transformer pipeline execution path.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success-green flex-shrink-0 mt-0.5" />
                  <span>In-depth analytical dashboards for weekly volume audits, model confidence distribution, and format segmentation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success-green flex-shrink-0 mt-0.5" />
                  <span>Secure local session memory caches to retain scanning audits without cloud data leaks.</span>
                </li>
              </ul>
            </div>
          </motion.div>
        );

      case 'api':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              <h2 className="font-heading text-xl font-bold text-white tracking-tight">FastAPI Integration Guide</h2>
              <p className="text-xs text-text-secondary">
                Use the REST API endpoint inside your software services for programmatic verification audits.
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase font-bold text-accent-cyan tracking-widest font-heading">ENDPOINT PATH</span>
              <div className="flex items-center gap-3 p-3 bg-white/5 border border-border-custom rounded-xl text-xs font-mono">
                <span className="bg-success-green/10 text-success-green border border-success-green/20 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">POST</span>
                <span className="text-white">/predict</span>
              </div>
            </div>

            {/* Request Parameter Details */}
            <div className="flex flex-col gap-2.5">
              <h3 className="font-heading text-sm font-bold text-white tracking-wide">Request Schema</h3>
              <div className="p-4 bg-background/50 border border-border-custom rounded-xl flex flex-col gap-3 text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-border-custom/5">
                  <span className="font-mono text-white font-bold">file</span>
                  <span className="text-text-secondary">UploadFile (Multipart) • Supporting Image/Video</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-border-custom/5">
                  <span className="font-mono text-white font-bold">model</span>
                  <span className="text-text-secondary">String (Optional) • cvit or cvit2</span>
                </div>
              </div>
            </div>

            {/* Code tabs */}
            <div className="flex flex-col gap-4">
              {/* Curl Example */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-[10px] font-bold text-text-secondary">
                  <span>INTEGRATION: CURL COMMAND</span>
                  <button 
                    onClick={() => copyCode(curlExample, 'curl')}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    {copiedId === 'curl' ? <Check className="w-3.5 h-3.5 text-success-green" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedId === 'curl' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <pre className="p-3 bg-black/60 border border-border-custom rounded-xl font-mono text-[10px] text-text-secondary overflow-x-auto whitespace-pre">
                  {curlExample}
                </pre>
              </div>

              {/* Python Example */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-[10px] font-bold text-text-secondary">
                  <span>INTEGRATION: PYTHON REQUESTS</span>
                  <button 
                    onClick={() => copyCode(pythonExample, 'python')}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    {copiedId === 'python' ? <Check className="w-3.5 h-3.5 text-success-green" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedId === 'python' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <pre className="p-3 bg-black/60 border border-border-custom rounded-xl font-mono text-[10px] text-text-secondary overflow-x-auto whitespace-pre">
                  {pythonExample}
                </pre>
              </div>
            </div>
          </motion.div>
        );

      case 'cli':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              <h2 className="font-heading text-xl font-bold text-white tracking-tight">CLI Prediction Scripts</h2>
              <p className="text-xs text-text-secondary">
                Execute inference locally directly from your developer console using command line utilities.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-[10px] font-bold text-text-secondary">
                <span>CLI COMMAND ROUTE</span>
                <button 
                  onClick={() => copyCode(cliExample, 'cli')}
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  {copiedId === 'cli' ? <Check className="w-3.5 h-3.5 text-success-green" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedId === 'cli' ? 'Copied' : 'Copy'}
                </button>
              </div>
              <pre className="p-3 bg-black/60 border border-border-custom rounded-xl font-mono text-[10px] text-text-secondary overflow-x-auto whitespace-pre">
                {cliExample}
              </pre>
            </div>

            {/* CLI Argument explanation table */}
            <div className="flex flex-col gap-2.5">
              <h3 className="font-heading text-sm font-bold text-white tracking-wide">Argument Properties</h3>
              <div className="flex flex-col divide-y divide-border-custom/5 text-xs text-text-secondary bg-background/50 border border-border-custom rounded-xl p-4 gap-2.5">
                <div className="flex justify-between items-start gap-4 pb-2 border-b border-border-custom/5">
                  <span className="font-mono text-white font-bold flex-shrink-0">--p</span>
                  <span className="text-left">Target path to the media file or folder of images for scanning.</span>
                </div>
                <div className="flex justify-between items-start gap-4 pb-2 border-b border-border-custom/5">
                  <span className="font-mono text-white font-bold flex-shrink-0">--f</span>
                  <span className="text-left">Total frames processed for video inference blocks. (e.g. 15 or 30).</span>
                </div>
                <div className="flex justify-between items-start gap-4 pb-2 border-b border-border-custom/5">
                  <span className="font-mono text-white font-bold flex-shrink-0">--n</span>
                  <span className="text-left">Model architecture selection: `cvit` or `cvit2`.</span>
                </div>
                <div className="flex justify-between items-start gap-4 pb-2 border-b border-border-custom/5">
                  <span className="font-mono text-white font-bold flex-shrink-0">--w</span>
                  <span className="text-left">Exact path location mapping to model weight binary `.pth` parameters.</span>
                </div>
                <div className="flex justify-between items-start gap-4">
                  <span className="font-mono text-white font-bold flex-shrink-0">--fp16</span>
                  <span className="text-left">Activates half-precision computation format for lower latency on NVIDIA cards (`y` / `n`).</span>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'weights':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              <h2 className="font-heading text-xl font-bold text-white tracking-tight">Model Weights Setup</h2>
              <p className="text-xs text-text-secondary">
                To serve local predictions, you must download pre-trained weights from Hugging Face and place them in the correct folder.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="p-4 border-white/5 bg-surface/30 flex flex-col gap-3">
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase font-bold text-primary-indigo font-heading">CVIT2 WEIGHT (RECOMMENDED)</span>
                  <h4 className="font-heading font-bold text-xs text-white">5 Datasets Trained</h4>
                </div>
                <p className="text-[11px] text-text-secondary leading-relaxed">
                  Trained on DFDC, FaceForensics++, TrustedMedia, DeepfakeTIMIT, Celeb-v2 datasets for high generalizability.
                </p>
                <div className="mt-2.5">
                  <a href="https://huggingface.co/datasets/Deressa/cvit/blob/main/cvit2_deepfake_detection_ep_50.pth" target="_blank" rel="noreferrer">
                    <Button variant="outline" size="sm" className="w-full text-[10px]">Download cvit2_deepfake_ep_50.pth</Button>
                  </a>
                </div>
              </Card>

              <Card className="p-4 border-white/5 bg-surface/30 flex flex-col gap-3">
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase font-bold text-accent-cyan font-heading">CVIT WEIGHT</span>
                  <h4 className="font-heading font-bold text-xs text-white">DFDC Dataset Trained</h4>
                </div>
                <p className="text-[11px] text-text-secondary leading-relaxed">
                  Standard version trained specifically on the Deepfake Detection Challenge benchmark dataset.
                </p>
                <div className="mt-2.5">
                  <a href="https://huggingface.co/datasets/Deressa/cvit/blob/main/cvit_deepfake_detection_ep_50.pth" target="_blank" rel="noreferrer">
                    <Button variant="outline" size="sm" className="w-full text-[10px]">Download cvit_deepfake_ep_50.pth</Button>
                  </a>
                </div>
              </Card>
            </div>

            {/* Folder layout tree structure */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase font-bold text-text-secondary font-heading">DEPLOYMENT STRUCTURE</span>
              <pre className="p-3 bg-black/60 border border-border-custom rounded-xl font-mono text-[10px] text-text-secondary">
                {weightFolderStructure}
              </pre>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen pt-[73px]">
      <div className="max-w-6xl mx-auto w-full px-6 py-12 flex flex-col gap-8">
        
        {/* Header */}
        <div className="flex flex-col gap-2 border-b border-border-custom pb-6">
          <h1 className="font-heading text-3xl font-extrabold text-white tracking-tight">
            Developer Documentation
          </h1>
          <p className="text-sm text-text-secondary">
            Integrate DeepLens classifications programmatically inside your network configurations.
          </p>
        </div>

        {/* Sidebar + Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar Menu */}
          <div className="lg:col-span-3 flex flex-col gap-1.5 bg-surface/10 border border-border-custom/50 rounded-2xl p-2 md:p-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold select-none transition-all duration-200 ${
                  activeTab === item.id 
                    ? 'bg-primary-indigo text-white shadow-lg shadow-primary-indigo/10' 
                    : 'text-text-secondary hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 opacity-50 transition-transform ${activeTab === item.id ? 'translate-x-0.5' : ''}`} />
              </button>
            ))}
          </div>

          {/* Right Main Pane */}
          <div className="lg:col-span-9">
            <Card className="border-white/5 bg-surface/30 p-8 min-h-[420px]">
              <AnimatePresence mode="wait">
                {renderContent()}
              </AnimatePresence>
            </Card>
          </div>

        </div>

      </div>
    </div>
  );
};
