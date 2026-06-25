import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, Image as ImageIcon, Video as VideoIcon, AlertCircle } from 'lucide-react';
import { Button } from './Button';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isLoading?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, isLoading = false }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const allowedExtensions = ['.mp4', '.avi', '.mov', '.mpeg', '.mpg', '.jpg', '.jpeg', '.png', '.bmp'];

  const validateFile = (file: File): boolean => {
    const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      setErrorMessage(`Unsupported format. Supported extensions: ${allowedExtensions.join(', ')}`);
      return false;
    }
    
    // Limit to 50MB for demo stability
    if (file.size > 50 * 1024 * 1024) {
      setErrorMessage("File exceeds size limit of 50MB.");
      return false;
    }
    
    setErrorMessage(null);
    return true;
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        onFileSelect(file);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        onFileSelect(file);
      }
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <motion.div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        whileHover={{ scale: 1.005 }}
        whileTap={{ scale: 0.995 }}
        className={`relative w-full rounded-2xl border-2 border-dashed p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${
          isDragActive
            ? 'border-primary-indigo bg-primary-indigo/5'
            : errorMessage
            ? 'border-danger-red/40 bg-danger-red/5'
            : 'border-border-custom hover:border-white/20 bg-surface/40 hover:bg-surface/60'
        } ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
        onClick={onButtonClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={allowedExtensions.join(',')}
          onChange={handleChange}
          disabled={isLoading}
        />

        {/* Dropzone Display Content */}
        <div className="w-14 h-14 rounded-full bg-white/5 border border-border-custom flex items-center justify-center text-text-secondary mb-4 group-hover:scale-110 transition-transform">
          <UploadCloud className="w-7 h-7 text-text-secondary" />
        </div>

        <h3 className="font-heading text-lg font-semibold text-white mb-2">
          Drag & drop your files here
        </h3>
        <p className="text-sm text-text-secondary max-w-sm mb-6 leading-relaxed">
          Upload any high-resolution image or video file.
          <br />Supported formats: JPEG, PNG, MP4, AVI, MOV (Max 50MB)
        </p>

        <div className="flex gap-4 justify-center text-xs text-text-secondary mb-6">
          <span className="flex items-center gap-1"><ImageIcon className="w-3.5 h-3.5 text-accent-cyan" /> Images</span>
          <span>&bull;</span>
          <span className="flex items-center gap-1"><VideoIcon className="w-3.5 h-3.5 text-primary-indigo" /> Videos</span>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isLoading}
          onClick={(e) => {
            e.stopPropagation();
            onButtonClick();
          }}
        >
          Select File
        </Button>
      </motion.div>

      {/* Error Alert Display */}
      {errorMessage && (
        <div className="flex items-center gap-2 text-danger-red text-xs mt-3 bg-danger-red/5 p-3 rounded-xl border border-danger-red/10">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
