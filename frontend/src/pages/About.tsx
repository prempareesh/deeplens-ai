import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Layers, 
  Users, 
  ExternalLink, 
  Copy, 
  Check, 
  Brain,
  Atom
} from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useToast } from '../context/ToastContext';

export const About: React.FC = () => {
  const { showToast } = useToast();

  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const bibtexCViT = `@misc{wodajo2021deepfake,
  title={Deepfake Video Detection Using Convolutional Vision Transformer}, 
  author={Deressa Wodajo and Solomon Atnafu},
  year={2021},
  eprint={2102.11126},
  archivePrefix={arXiv},
  primaryClass={cs.CV}
}`;

  const bibtexCViT2 = `@inproceedings{wodajo2024deepfake,
  title={Improved Deepfake Video Detection Using Convolutional Vision Transformer},
  author={Deressa Wodajo, Peter Lambert, Glenn Van Wallendael, Solomon Atnafu and Hannes Mareen},
  booktitle={Proceedings of the IEEE International Conference on Games, Entertainment & Media (GEM)},
  year={2024},
  month={June},
  address={Turin (Torino), Italy}
}`;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast("Citation copied to clipboard", "success");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const pipelineSteps = [
    {
      title: "Temporal Frame Sampling",
      desc: "For video streams, temporal sequences are extracted at a uniform frame interval (e.g. 15 to 30 frames) to check consistency across time.",
      icon: <Layers className="w-5 h-5 text-accent-cyan" />
    },
    {
      title: "BlazeFace Landmark Extraction",
      desc: "Deep learning models localize bounding boxes and facial coordinates, filtering out background noise to focus exclusively on human features.",
      icon: <Brain className="w-5 h-5 text-primary-indigo" />
    },
    {
      title: "Spatial Patch Tokenization",
      desc: "Face images are resized to 224x224 pixels and segmented into non-overlapping patches (e.g., 7x7 or 14x14 grid) which function as visual tokens.",
      icon: <Cpu className="w-5 h-5 text-yellow-500" />
    },
    {
      title: "Convolutional Vision Transformer",
      desc: "A multi-layered transformer encoder extracts local details and global relationships via self-attention heads, modeling complex facial deformations.",
      icon: <Atom className="w-5 h-5 text-pink-500" />
    }
  ];

  const authors = [
    { name: "Deressa Wodajo", role: "Primary Investigator & Lead Architect" },
    { name: "Solomon Atnafu", role: "Academic Advisor & Research Supervisor" },
    { name: "Peter Lambert", role: "Co-Author & Scientific Advisor (GEM '24)" },
    { name: "Glenn Van Wallendael", role: "Co-Author & Temporal Analysis Contributor" },
    { name: "Hannes Mareen", role: "Co-Author & Verification Specialist" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col min-h-screen pt-[73px]"
    >
      <div className="max-w-6xl mx-auto w-full px-6 py-12 flex flex-col gap-16">
        
        {/* Hero Section */}
        <div className="flex flex-col gap-4 text-center items-center">
          <span className="text-xs uppercase font-heading tracking-widest text-accent-cyan font-bold px-3 py-1 bg-white/5 border border-border-custom rounded-full select-none">
            Research & Methodology
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl">
            Convolutional Vision Transformers <br />for Deepfake Media Auditing
          </h1>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-2xl mt-2">
            DeepLens implements CViT and CViT2, state-of-the-art vision networks engineered to analyze spatial pixel maps and temporal sequence layers for facial manipulation.
          </p>
        </div>

        {/* Model Pipeline Section */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="font-heading text-2xl font-bold text-white tracking-tight">The Inference Pipeline</h2>
            <p className="text-xs text-text-secondary">Technical breakdown of how files are processed from upload to classification metrics.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pipelineSteps.map((step, idx) => (
              <Card key={idx} hoverable className="border-white/5 bg-surface/30 flex gap-4 p-6 items-start">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-border-custom flex items-center justify-center flex-shrink-0 mt-0.5">
                  {step.icon}
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-heading text-sm font-bold text-white tracking-wide">{step.title}</h3>
                  <p className="text-xs text-text-secondary leading-relaxed">{step.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Publications & Citations */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="font-heading text-2xl font-bold text-white tracking-tight">Academic Publications</h2>
            <p className="text-xs text-text-secondary">Read the official research papers and cite them using the BibTeX blocks below.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Paper 1: CViT */}
            <Card className="flex flex-col gap-4 border-white/5 bg-surface/30">
              <div className="flex justify-between items-start border-b border-border-custom pb-3">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] uppercase font-bold text-primary-indigo font-heading">ArXiv Publication (2021)</span>
                  <h3 className="font-heading text-sm font-bold text-white">CViT: Deepfake Video Detection</h3>
                </div>
                <a href="https://arxiv.org/abs/2102.11126" target="_blank" rel="noreferrer">
                  <Button variant="outline" size="sm" className="px-2.5 py-1 text-[10px] gap-1">
                    ArXiv <ExternalLink className="w-3 h-3" />
                  </Button>
                </a>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Introduces Convolutional Vision Transformers combining local feature extraction from convolutional layers with multi-head self-attention mechanisms of Vision Transformers.
              </p>
              
              <div className="flex flex-col gap-1.5 mt-2">
                <div className="flex justify-between items-center text-[10px] font-bold text-text-secondary">
                  <span>BIBTEX CITATION</span>
                  <button 
                    onClick={() => copyToClipboard(bibtexCViT, 'cvit')}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    {copiedId === 'cvit' ? <Check className="w-3.5 h-3.5 text-success-green" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedId === 'cvit' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <pre className="p-3 bg-black/60 border border-border-custom rounded-xl font-mono text-[9px] text-text-secondary overflow-x-auto whitespace-pre">
                  {bibtexCViT}
                </pre>
              </div>
            </Card>

            {/* Paper 2: CViT2 */}
            <Card className="flex flex-col gap-4 border-white/5 bg-surface/30">
              <div className="flex justify-between items-start border-b border-border-custom pb-3">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] uppercase font-bold text-accent-cyan font-heading">IEEE GEM Conference (2024)</span>
                  <h3 className="font-heading text-sm font-bold text-white">CViT2: Improved Deepfake Detection</h3>
                </div>
                <a href="https://github.com/prempareesh/deeplens-ai/blob/main/docs/Deressa_Wodajo_MS_Thesis_2020.pdf" target="_blank" rel="noreferrer">
                  <Button variant="outline" size="sm" className="px-2.5 py-1 text-[10px] gap-1">
                    Thesis PDF <ExternalLink className="w-3 h-3" />
                  </Button>
                </a>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Optimized model parameters trained across five benchmark deepfake datasets (DFDC, FaceForensics++, TrustedMedia, DeepfakeTIMIT, Celeb-DF-v2) achieving superior generalization bounds.
              </p>
              
              <div className="flex flex-col gap-1.5 mt-2">
                <div className="flex justify-between items-center text-[10px] font-bold text-text-secondary">
                  <span>BIBTEX CITATION</span>
                  <button 
                    onClick={() => copyToClipboard(bibtexCViT2, 'cvit2')}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    {copiedId === 'cvit2' ? <Check className="w-3.5 h-3.5 text-success-green" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedId === 'cvit2' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <pre className="p-3 bg-black/60 border border-border-custom rounded-xl font-mono text-[9px] text-text-secondary overflow-x-auto whitespace-pre">
                  {bibtexCViT2}
                </pre>
              </div>
            </Card>
          </div>
        </div>

        {/* Authors Section */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="font-heading text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              Research Contributors <Users className="w-5 h-5 text-accent-cyan" />
            </h2>
            <p className="text-xs text-text-secondary">The researchers and software engineers responsible for the development of CViT and CViT2 models.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {authors.map((author, idx) => (
              <Card key={idx} hoverable className="border-white/5 bg-surface/30 flex flex-col gap-2 p-5 text-center">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-border-custom flex items-center justify-center text-text-secondary mx-auto mb-2 font-heading font-extrabold text-sm">
                  {author.name.charAt(0)}
                </div>
                <h3 className="font-heading text-xs font-bold text-white truncate max-w-full" title={author.name}>
                  {author.name}
                </h3>
                <span className="text-[9px] text-text-secondary font-medium tracking-wide">
                  {author.role}
                </span>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
};
