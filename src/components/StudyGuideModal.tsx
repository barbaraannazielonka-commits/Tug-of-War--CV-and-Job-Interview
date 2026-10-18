import React from 'react';
import { X, BookOpen, Printer, CheckCircle, AlertTriangle } from 'lucide-react';

interface StudyGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudyGuideModal: React.FC<StudyGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-slate-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Careers & Interview Master Guide
              </h2>
              <p className="text-xs text-slate-400">
                Key takeaways, the STAR method matrix, and CV architecture
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Guide</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-xs sm:text-sm flex-1 leading-relaxed">
          
          {/* STAR Method Section */}
          <div className="bg-slate-950/80 p-4 sm:p-5 rounded-2xl border border-slate-800">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 mb-2">
              The STAR Behavioral Interview Framework
            </h3>
            <p className="text-slate-400 text-xs mb-4">
              Use this structure whenever an interviewer says: <em className="text-slate-300">"Tell me about a time when..."</em>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="font-mono font-black text-rose-400 text-sm block mb-1">S — Situation</span>
                <p className="text-xs text-slate-300">Set the scene. Briefly give context: where were you working, studying, or volunteering, and what was the background context? Keep to 15-20 seconds.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="font-mono font-black text-amber-400 text-sm block mb-1">T — Task</span>
                <p className="text-xs text-slate-300">Define the explicit challenge or objective. What needed to be done, who was depending on you, and what was the deadline or constraint?</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="font-mono font-black text-emerald-400 text-sm block mb-1">A — Action (60% of time)</span>
                <p className="text-xs text-slate-300">The core of your answer. Detail what YOU specifically decided, communicated, organized, and carried out. Avoid saying only "we"—highlight your role.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="font-mono font-black text-sky-400 text-sm block mb-1">R — Result</span>
                <p className="text-xs text-slate-300">Quantify the positive outcome: did you finish 2 days early? Raise £300? Boost attendance by 20%? Always reflect on key lessons learned.</p>
              </div>
            </div>
          </div>

          {/* Action Verbs Bank */}
          <div className="bg-slate-950/80 p-4 sm:p-5 rounded-2xl border border-slate-800">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400 mb-2">
              High-Impact Power Verbs for CVs
            </h3>
            <p className="text-slate-400 text-xs mb-3">
              Never start bullets with passive phrases like <em>"Responsible for"</em> or <em>"Helped with"</em>. Use these dynamic verbs:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-indigo-300">Coordinated</div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-indigo-300">Spearheaded</div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-indigo-300">Facilitated</div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-indigo-300">Optimized</div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-indigo-300">Synthesized</div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-indigo-300">Engineered</div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-indigo-300">Collaborated</div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-indigo-300">Reconciled</div>
            </div>
          </div>

          {/* Dos and Don'ts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="bg-emerald-950/20 border border-emerald-500/30 p-4 rounded-2xl">
              <div className="flex items-center gap-2 text-emerald-400 font-bold mb-3 text-xs uppercase font-mono">
                <CheckCircle className="w-4 h-4" />
                <span>The Golden CV Dos</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside">
                <li>Keep entry-level CVs to 1 clean, standard page.</li>
                <li>List experience in Reverse Chronological order.</li>
                <li>Tailor keywords to match the specific job description.</li>
                <li>Quantify impact with metrics (numbers, percentages, scale).</li>
                <li>Arrive 10 to 15 minutes before your scheduled interview.</li>
                <li>Follow up with a polite thank-you email within 24 hours.</li>
              </ul>
            </div>

            <div className="bg-rose-950/20 border border-rose-500/30 p-4 rounded-2xl">
              <div className="flex items-center gap-2 text-rose-400 font-bold mb-3 text-xs uppercase font-mono">
                <AlertTriangle className="w-4 h-4" />
                <span>Critical Red Flags to Avoid</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside">
                <li>Never put Date of Birth, National Insurance/SSN, or marital status.</li>
                <li>Never use informal, unprofessional email handles.</li>
                <li>Do not leave mobile phones on tables or on vibrate mode.</li>
                <li>Avoid badmouthing past schools, teachers, or employers.</li>
                <li>Never reply "No, I have no questions" at the end.</li>
                <li>Do not say "I have no weaknesses" or "I am a perfectionist".</li>
              </ul>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
