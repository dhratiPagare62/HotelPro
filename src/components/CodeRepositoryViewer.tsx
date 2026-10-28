import React, { useState } from 'react';
import { Copy, Check, FileCode, Download, ExternalLink, Terminal } from 'lucide-react';
import { MERN_PROJECT_FILES } from '../data/sourceCodeFiles';

interface CodeRepositoryViewerProps {
  onOpenSubmissionModal: () => void;
}

export const CodeRepositoryViewer: React.FC<CodeRepositoryViewerProps> = ({
  onOpenSubmissionModal,
}) => {
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const currentFile = MERN_PROJECT_FILES[selectedFileIndex];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([currentFile.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = currentFile.path.split('/').pop() || 'file.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-neutral-900 border border-neutral-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-amber-400">MERN Architecture</span>
            <span className="text-neutral-600">·</span>
            <span className="text-xs text-neutral-400">Node.js · Express · MongoDB · React</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">
            Complete Project Source Code & Schemas
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Production-grade codebase ready for your GitHub repository and mentor submission on SkillWallet.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenSubmissionModal}
            className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5"
          >
            <span>Get Demo & GitHub Links</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Code Browser Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: File Tree */}
        <div className="lg:col-span-4 bg-neutral-900 border border-neutral-800 rounded-xl p-3 space-y-1">
          <div className="px-3 py-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            Project Files
          </div>
          {MERN_PROJECT_FILES.map((file, idx) => (
            <button
              key={file.path}
              onClick={() => setSelectedFileIndex(idx)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-mono transition-colors flex items-center justify-between ${
                selectedFileIndex === idx
                  ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                  : 'text-neutral-400 hover:bg-neutral-800/60 hover:text-neutral-200'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <FileCode className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{file.path}</span>
              </div>
              <span className="text-[10px] text-neutral-500 uppercase shrink-0">
                {file.language}
              </span>
            </button>
          ))}
        </div>

        {/* Right: Code Viewer */}
        <div className="lg:col-span-8 bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden flex flex-col">
          {/* File Toolbar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800 bg-neutral-900/50">
            <div>
              <span className="text-xs font-mono font-medium text-neutral-200">
                {currentFile.path}
              </span>
              <p className="text-[11px] text-neutral-500">
                {currentFile.description}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-2.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded text-xs flex items-center gap-1.5 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy File</span>
                  </>
                )}
              </button>
              <button
                onClick={handleDownloadFile}
                className="px-2.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded text-xs flex items-center gap-1.5 transition-colors"
                title="Download this file"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save</span>
              </button>
            </div>
          </div>

          {/* Code Textarea / Pre */}
          <div className="p-4 max-h-[560px] overflow-auto text-xs font-mono text-neutral-300 bg-black/60 leading-relaxed">
            <pre className="whitespace-pre">{currentFile.content}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};
