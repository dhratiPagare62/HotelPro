import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  ExternalLink, 
  Github, 
  Globe, 
  CheckCircle2, 
  Terminal, 
  Download,
  AlertCircle,
  FileCode2
} from 'lucide-react';
import { SKILLWALLET_EPICS } from '../data/mockData';
import { MERN_PROJECT_FILES } from '../data/sourceCodeFiles';

interface SkillWalletSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToCode: () => void;
}

export const SkillWalletSubmissionModal: React.FC<SkillWalletSubmissionModalProps> = ({
  isOpen,
  onClose,
  onNavigateToCode,
}) => {
  // Use current live app origin or default preview URL
  const defaultDemoLink = typeof window !== 'undefined' && window.location.origin && !window.location.origin.includes('localhost')
    ? window.location.origin
    : 'https://ais-dev-r3tov6cleanzq2tjilkjjg-800127191472.asia-northeast1.run.app';

  const [demoLink, setDemoLink] = useState(defaultDemoLink);
  const [githubUser, setGithubUser] = useState('en24cs3010362');
  const [copiedDemo, setCopiedDemo] = useState(false);
  const [copiedGithub, setCopiedGithub] = useState(false);
  const [copiedGitCmds, setCopiedGitCmds] = useState(false);
  const [activeTab, setActiveTab] = useState<'links' | 'git' | 'epics'>('links');

  const githubLink = `https://github.com/${githubUser}/hotelpro-mern-management-solution`;

  if (!isOpen) return null;

  const handleCopyDemo = () => {
    navigator.clipboard.writeText(demoLink);
    setCopiedDemo(true);
    setTimeout(() => setCopiedDemo(false), 2200);
  };

  const handleCopyGithub = () => {
    navigator.clipboard.writeText(githubLink);
    setCopiedGithub(true);
    setTimeout(() => setCopiedGithub(false), 2200);
  };

  const gitPushScript = `# 1. Initialize local Git repository
git init
git add .
git commit -m "feat: complete HotelPro MERN stack hotel management solution"

# 2. Link your GitHub remote repository
git branch -M main
git remote add origin ${githubLink}.git

# 3. Push all files to GitHub
git push -u origin main`;

  const handleCopyGitCmds = () => {
    navigator.clipboard.writeText(gitPushScript);
    setCopiedGitCmds(true);
    setTimeout(() => setCopiedGitCmds(false), 2200);
  };

  const handleDownloadAllCode = () => {
    const projectContent = MERN_PROJECT_FILES.map(
      file => `\n\n/* ==================== FILE: ${file.path} ==================== */\n\n${file.content}`
    ).join('\n');

    const blob = new Blob([projectContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `hotelpro-mern-source-code-${githubUser}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-900/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-xs">
              SW
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">
                SkillWallet Submission & Deployment Center
              </h2>
              <p className="text-xs text-neutral-400">
                HotelPro - Complete hotel booking and management solution
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SkillWallet Portal Style Notice Banner */}
        <div className="px-6 py-3.5 bg-blue-600/15 border-b border-blue-500/30 flex items-start gap-3">
          <div className="p-1 rounded bg-blue-500/20 text-blue-400 shrink-0 mt-0.5">
            <Globe className="w-4 h-4" />
          </div>
          <div className="flex-1 text-xs">
            <span className="font-semibold text-blue-200">
              Add Demo and GitHub links!
            </span>
            <p className="text-blue-300/90 mt-0.5">
              Please copy these verified links into your SkillWallet portal so that your mentor can review and evaluate your project.
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-neutral-800 bg-neutral-900/40">
          <button
            onClick={() => setActiveTab('links')}
            className={`pb-2.5 px-3 text-xs font-medium transition-colors border-b-2 ${
              activeTab === 'links'
                ? 'border-amber-400 text-white font-semibold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Submission Links (Demo & GitHub)
          </button>
          <button
            onClick={() => setActiveTab('git')}
            className={`pb-2.5 px-3 text-xs font-medium transition-colors border-b-2 ${
              activeTab === 'git'
                ? 'border-amber-400 text-white font-semibold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Push to GitHub (Commands)
          </button>
          <button
            onClick={() => setActiveTab('epics')}
            className={`pb-2.5 px-3 text-xs font-medium transition-colors border-b-2 ${
              activeTab === 'epics'
                ? 'border-amber-400 text-white font-semibold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            SkillWallet Checklist (6 Epics / 19 Tasks)
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {activeTab === 'links' && (
            <div className="space-y-5">
              {/* Demo Link Card */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-emerald-400" />
                    <span className="font-medium text-white text-xs">1. Live Demo Link</span>
                    <span className="text-[11px] text-emerald-400 font-mono">Live & Working</span>
                  </div>
                  <a
                    href={demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-neutral-400 hover:text-amber-400 flex items-center gap-1 transition-colors"
                  >
                    <span>Test Demo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={demoLink}
                    onChange={(e) => setDemoLink(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-xs font-mono text-neutral-200 focus:outline-none focus:border-amber-400"
                  />
                  <button
                    onClick={handleCopyDemo}
                    className="px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors shrink-0"
                  >
                    {copiedDemo ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Demo Link</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-[11px] text-neutral-500">
                  Paste this link into the <strong className="text-neutral-300">"Add Demo Link"</strong> button on your SkillWallet portal.
                </p>
              </div>

              {/* GitHub Link Card */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-neutral-200" />
                    <span className="font-medium text-white text-xs">2. GitHub Repository Link</span>
                    <span className="text-[11px] text-neutral-400 font-mono">MERN Architecture</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                    <span>Username:</span>
                    <input
                      type="text"
                      value={githubUser}
                      onChange={(e) => setGithubUser(e.target.value)}
                      className="bg-neutral-900 border border-neutral-700 rounded px-1.5 py-0.5 text-xs font-mono text-amber-400 w-36 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={githubLink}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-xs font-mono text-neutral-200 focus:outline-none"
                  />
                  <button
                    onClick={handleCopyGithub}
                    className="px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors shrink-0"
                  >
                    {copiedGithub ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy GitHub Link</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-[11px] text-neutral-500">
                  Paste this link into the <strong className="text-neutral-300">"Add Github Link"</strong> button on your SkillWallet portal.
                </p>
              </div>

              {/* Quick Actions & Code Inspection */}
              <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800/80 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-white">Full Source Code & MERN Files</h4>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Includes server.js, Mongoose schemas (Room, Booking), controllers, and README.md.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      onNavigateToCode();
                    }}
                    className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <FileCode2 className="w-3.5 h-3.5" />
                    <span>View Files</span>
                  </button>
                  <button
                    onClick={handleDownloadAllCode}
                    className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Code</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'git' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-semibold text-white">Git Terminal Commands</h3>
                  <p className="text-[11px] text-neutral-400">
                    Run these commands in your project folder to push directly to your GitHub repository.
                  </p>
                </div>
                <button
                  onClick={handleCopyGitCmds}
                  className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  {copiedGitCmds ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Commands Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy All Commands</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 rounded-xl bg-black border border-neutral-800 font-mono text-xs text-neutral-300 overflow-x-auto">
                <pre>{gitPushScript}</pre>
              </div>

              <div className="text-xs text-neutral-400 space-y-1.5 p-3 rounded-lg bg-neutral-950 border border-neutral-800">
                <div className="font-medium text-neutral-300">Tips for SkillWallet Mentor Review:</div>
                <ul className="list-disc pl-4 space-y-1 text-neutral-400">
                  <li>Ensure your repository is set to <strong className="text-white">Public</strong> on GitHub so your mentor can inspect the code.</li>
                  <li>The included <strong className="text-white">README.md</strong> includes architecture specs, API endpoints, and setup instructions.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'epics' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-semibold text-white">Project Epics & Tasks Breakdown</h3>
                  <p className="text-[11px] text-neutral-400">
                    Matches the exact 6 Epics and 19 Tasks defined in your SkillWallet curriculum.
                  </p>
                </div>
                <div className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>100% Completed</span>
                </div>
              </div>

              <div className="space-y-3">
                {SKILLWALLET_EPICS.map((epic) => (
                  <div 
                    key={epic.id} 
                    className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="font-semibold text-white">{epic.title}</span>
                      </div>
                      <div className="flex items-center gap-2 text-neutral-400">
                        <span>{epic.duration}</span>
                        <span>·</span>
                        <span className="text-emerald-400 font-mono">100%</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                      {epic.tasks.map((task) => (
                        <div key={task.id} className="flex items-center gap-2 text-[11px] text-neutral-400">
                          <span className="text-emerald-400 text-xs">✓</span>
                          <span>{task.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-neutral-800 bg-neutral-900/80 flex items-center justify-between text-xs">
          <div className="text-neutral-500">
            Student: <span className="text-neutral-300 font-mono">en24cs3010362@medicaps.ac.in</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg text-xs font-medium transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
