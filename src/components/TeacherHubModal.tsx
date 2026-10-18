import React, { useState } from 'react';
import { Question, TeamConfig, TeamSide, GameSettings } from '../types/game';
import { X, Plus, Trash2, Edit3, RotateCcw, Download, Upload, Sliders, ListChecks, Check } from 'lucide-react';

interface TeacherHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  onUpdateQuestions: (newQuestions: Question[]) => void;
  onResetQuestionsToDefault: () => void;
  activeTeam: TeamSide;
  onSetActiveTeam: (team: TeamSide) => void;
  redTeam: TeamConfig;
  blueTeam: TeamConfig;
  winThreshold: number;
  onUpdateWinThreshold: (val: number) => void;
  settings: GameSettings;
  onUpdateSettings: (newSettings: Partial<GameSettings>) => void;
  onManualTug: (team: TeamSide, amount: number) => void;
  onRecenterRope: () => void;
  onHardResetMatch: () => void;
}

export const TeacherHubModal: React.FC<TeacherHubModalProps> = ({
  isOpen,
  onClose,
  questions,
  onUpdateQuestions,
  onResetQuestionsToDefault,
  activeTeam,
  onSetActiveTeam,
  redTeam,
  blueTeam,
  winThreshold,
  onUpdateWinThreshold,
  settings,
  onUpdateSettings,
  onManualTug,
  onRecenterRope,
  onHardResetMatch
}) => {
  const [activeTab, setActiveTab] = useState<'calibration' | 'questions'>('calibration');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Form for Adding / Editing Question
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [formType, setFormType] = useState<'mc' | 'open'>('mc');
  const [formCategory, setFormCategory] = useState('CV Writing');
  const [formQuestion, setFormQuestion] = useState('');
  const [formOptions, setFormOptions] = useState(['', '', '', '']);
  const [formCorrect, setFormCorrect] = useState(0);
  const [formRubric, setFormRubric] = useState('');
  const [formExplanation, setFormExplanation] = useState('');
  const [formCareerTip, setFormCareerTip] = useState('');

  if (!isOpen) return null;

  const categories = ['All', 'CV Structure', 'CV Writing', 'STAR Method', 'Interview Strategy', 'First Impressions', 'Professionalism', 'References & Follow-up'];

  const filteredQuestions = questions.filter((q) => {
    const matchesCategory = selectedCategory === 'All' || q.category === selectedCategory;
    const matchesSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          q.explanation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenAddForm = () => {
    setEditingId(null);
    setFormType('mc');
    setFormCategory('CV Writing');
    setFormQuestion('');
    setFormOptions(['', '', '', '']);
    setFormCorrect(0);
    setFormRubric('');
    setFormExplanation('');
    setFormCareerTip('');
    setIsEditorOpen(true);
  };

  const handleOpenEditForm = (q: Question) => {
    setEditingId(q.id);
    setFormType(q.type);
    setFormCategory(q.category);
    setFormQuestion(q.question);
    setFormExplanation(q.explanation);
    setFormCareerTip(q.careerTip || '');
    if (q.type === 'mc') {
      setFormOptions([...q.options]);
      setFormCorrect(q.correct);
    } else {
      setFormRubric(q.rubric);
    }
    setIsEditorOpen(true);
  };

  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formQuestion.trim() || !formExplanation.trim()) {
      alert('Please fill in both question and explanation.');
      return;
    }

    let updatedQuestion: Question;
    const qId = editingId ?? Date.now();

    if (formType === 'mc') {
      if (formOptions.some(opt => !opt.trim())) {
        alert('Please fill all 4 options for multiple choice.');
        return;
      }
      updatedQuestion = {
        id: qId,
        type: 'mc',
        category: formCategory,
        question: formQuestion.trim(),
        options: formOptions.map(o => o.trim()),
        correct: formCorrect,
        explanation: formExplanation.trim(),
        careerTip: formCareerTip.trim() || undefined
      };
    } else {
      if (!formRubric.trim()) {
        alert('Please provide a grading rubric for open discussion.');
        return;
      }
      updatedQuestion = {
        id: qId,
        type: 'open',
        category: formCategory,
        question: formQuestion.trim(),
        rubric: formRubric.trim(),
        explanation: formExplanation.trim(),
        careerTip: formCareerTip.trim() || undefined
      };
    }

    if (editingId !== null) {
      onUpdateQuestions(questions.map(q => q.id === editingId ? updatedQuestion : q));
    } else {
      onUpdateQuestions([...questions, updatedQuestion]);
    }

    setIsEditorOpen(false);
  };

  const handleDeleteQuestion = (id: string | number) => {
    if (questions.length <= 2) {
      alert('Must maintain at least 2 questions in the bank.');
      return;
    }
    if (confirm('Delete this question from the active bank?')) {
      onUpdateQuestions(questions.filter(q => q.id !== id));
    }
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(questions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `tag_of_war_questions_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed) && parsed.length > 0) {
          onUpdateQuestions(parsed);
          alert(`Successfully imported ${parsed.length} questions!`);
        } else {
          alert('Invalid JSON format: expected an array of questions.');
        }
      } catch (err) {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Teacher Control Deck
              </h2>
              <p className="text-xs text-slate-400">
                Classroom calibration, question bank, and manual score overrides
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 px-4 sm:px-6 bg-slate-950/40 gap-4">
          <button
            onClick={() => setActiveTab('calibration')}
            className={`py-3 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'calibration'
                ? 'border-indigo-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Match Calibration</span>
          </button>
          <button
            onClick={() => setActiveTab('questions')}
            className={`py-3 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'questions'
                ? 'border-indigo-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ListChecks className="w-4 h-4" />
            <span>Question Bank ({questions.length})</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {activeTab === 'calibration' ? (
            <div className="space-y-6">
              
              {/* Turn Control & Score Overrides */}
              <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400 mb-3">
                  Turn & Score Adjustments
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  
                  {/* Switch Active Turn */}
                  <div>
                    <label className="text-xs font-semibold text-slate-400 block mb-1.5">
                      Forced Turn Handover
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onSetActiveTeam('red')}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition cursor-pointer ${
                          activeTeam === 'red'
                            ? 'bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-600/30'
                            : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                        }`}
                      >
                        {redTeam.name} (Red)
                      </button>
                      <button
                        onClick={() => onSetActiveTeam('blue')}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition cursor-pointer ${
                          activeTeam === 'blue'
                            ? 'bg-sky-600 text-white border-sky-500 shadow-md shadow-sky-600/30'
                            : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                        }`}
                      >
                        {blueTeam.name} (Blue)
                      </button>
                    </div>
                  </div>

                  {/* Manual Tug Injections */}
                  <div>
                    <label className="text-xs font-semibold text-slate-400 block mb-1.5">
                      Manual Tug Injection
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onManualTug('red', 1)}
                        className="py-2 px-2.5 rounded-xl bg-rose-950/70 hover:bg-rose-900 text-rose-200 border border-rose-800/60 text-xs font-bold transition cursor-pointer"
                      >
                        +1 Red Tug
                      </button>
                      <button
                        onClick={() => onManualTug('blue', 1)}
                        className="py-2 px-2.5 rounded-xl bg-sky-950/70 hover:bg-sky-900 text-sky-200 border border-sky-800/60 text-xs font-bold transition cursor-pointer"
                      >
                        +1 Blue Tug
                      </button>
                    </div>
                  </div>

                  {/* Center Rope */}
                  <div>
                    <label className="text-xs font-semibold text-slate-400 block mb-1.5">
                      Rope Position Reset
                    </label>
                    <button
                      onClick={onRecenterRope}
                      className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition cursor-pointer"
                    >
                      Center Rope to 0
                    </button>
                  </div>

                </div>
              </div>

              {/* Match Rules & Game Pacing */}
              <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400 mb-3">
                  Match Rules & Timers
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  
                  {/* Knots to Win */}
                  <div>
                    <label className="text-xs font-semibold text-slate-400 block mb-1.5">
                      Knots to Win (Margin)
                    </label>
                    <select
                      value={winThreshold}
                      onChange={(e) => onUpdateWinThreshold(Number(e.target.value))}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs font-bold text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value={3}>3 Knots (Fast 10-Minute Blitz)</option>
                      <option value={4}>4 Knots (Standard 15-Minute Round)</option>
                      <option value={5}>5 Knots (Extended Classroom Play)</option>
                      <option value={6}>6 Knots (Marathon Tournament)</option>
                    </select>
                  </div>

                  {/* Turn Timer */}
                  <div>
                    <label className="text-xs font-semibold text-slate-400 block mb-1.5">
                      Turn Discussion Timer
                    </label>
                    <select
                      value={settings.turnTimerSeconds}
                      onChange={(e) => onUpdateSettings({ turnTimerSeconds: Number(e.target.value) })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs font-bold text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value={0}>Disabled (Unlimited Discussion)</option>
                      <option value={30}>30 Seconds (Fast Paced)</option>
                      <option value={45}>45 Seconds (Balanced)</option>
                      <option value={60}>60 Seconds (Deep Collaboration)</option>
                    </select>
                  </div>

                  {/* Streak Bonus */}
                  <div>
                    <label className="text-xs font-semibold text-slate-400 block mb-1.5">
                      Hot Streak Mechanic
                    </label>
                    <button
                      onClick={() => onUpdateSettings({ streakBonusEnabled: !settings.streakBonusEnabled })}
                      className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold border transition cursor-pointer ${
                        settings.streakBonusEnabled
                          ? 'bg-amber-500/20 text-amber-200 border-amber-500/40'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {settings.streakBonusEnabled ? '🔥 Streak Bonus Active' : 'Off (Standard Pacing)'}
                    </button>
                  </div>

                </div>
              </div>

              {/* Hard Match Reset */}
              <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-200">
                    Hard Match Reset
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Resets rope to 0, zeroes team points, clears used questions, and begins fresh.
                  </p>
                </div>

                {!showResetConfirm ? (
                  <button
                    onClick={() => setShowResetConfirm(true)}
                    className="py-2 px-4 bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/40 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer"
                  >
                    Reset Match
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-rose-400 font-bold">Confirm wipe?</span>
                    <button
                      onClick={() => {
                        onHardResetMatch();
                        setShowResetConfirm(false);
                      }}
                      className="py-1.5 px-3 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold cursor-pointer"
                    >
                      Yes, Reset
                    </button>
                    <button
                      onClick={() => setShowResetConfirm(false)}
                      className="py-1.5 px-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

            </div>
          ) : (
            /* QUESTIONS TAB */
            <div className="space-y-4">
              
              {/* Actions & Filters Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-1">
                  <input
                    type="text"
                    placeholder="Search question keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 flex-1"
                  />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleOpenAddForm}
                    className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New Question</span>
                  </button>

                  <button
                    onClick={handleExportJSON}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs border border-slate-700 transition cursor-pointer"
                    title="Export Questions JSON"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>

                  <label
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs border border-slate-700 transition cursor-pointer"
                    title="Import Questions JSON"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
                  </label>

                  <button
                    onClick={() => {
                      if (confirm('Restore the original factory CV & Interview questions?')) {
                        onResetQuestionsToDefault();
                      }
                    }}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs border border-slate-700 transition cursor-pointer"
                    title="Reset to Defaults"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
                {filteredQuestions.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 text-xs">
                    No questions match the filter or search query.
                  </div>
                ) : (
                  filteredQuestions.map((q, idx) => (
                    <div
                      key={q.id}
                      className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-start justify-between gap-3 text-xs group hover:border-slate-700 transition"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-slate-500 text-[10px]">#{idx + 1}</span>
                          <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                            {q.type}
                          </span>
                          <span className="text-[11px] font-semibold text-indigo-400">
                            {q.category}
                          </span>
                        </div>
                        <p className="text-white font-medium leading-relaxed">
                          {q.question}
                        </p>
                        <p className="text-slate-400 text-[11px] mt-1 line-clamp-1">
                          {q.explanation}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 pt-1">
                        <button
                          onClick={() => handleOpenEditForm(q)}
                          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
                          title="Edit Question"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteQuestion(q.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition cursor-pointer"
                          title="Delete Question"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            {questions.length} total career questions loaded
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer"
          >
            Done & Return to Match
          </button>
        </div>

      </div>

      {/* QUESTION EDITOR SUB-MODAL */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-5 sm:p-6 shadow-2xl flex flex-col max-h-[88vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h3 className="text-base font-bold text-white">
                {editingId ? 'Edit Question' : 'Create Custom Question'}
              </h3>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveQuestion} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Type</label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value as 'mc' | 'open')}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                  >
                    <option value="mc">Multiple Choice (4 Options)</option>
                    <option value="open">Open Discussion (Rubric)</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
                  >
                    {categories.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Question Prompt</label>
                <textarea
                  rows={3}
                  value={formQuestion}
                  onChange={(e) => setFormQuestion(e.target.value)}
                  placeholder="Enter the question text here..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              {formType === 'mc' ? (
                <div className="space-y-2">
                  <label className="text-slate-400 font-semibold block">
                    Options & Correct Answer
                  </label>
                  {formOptions.map((opt, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="correctOpt"
                        checked={formCorrect === idx}
                        onChange={() => setFormCorrect(idx)}
                        className="accent-indigo-500"
                        title="Mark as correct answer"
                      />
                      <span className="font-mono font-bold text-slate-400 w-4">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => {
                          const updated = [...formOptions];
                          updated[idx] = e.target.value;
                          setFormOptions(updated);
                        }}
                        placeholder={`Option ${String.fromCharCode(65 + idx)}...`}
                        className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                        required
                      />
                    </div>
                  ))}
                  <p className="text-[11px] text-slate-500 italic">
                    Select the radio button beside the correct option.
                  </p>
                </div>
              ) : (
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">
                    Teacher Discussion Rubric & Answer Key
                  </label>
                  <textarea
                    rows={3}
                    value={formRubric}
                    onChange={(e) => setFormRubric(e.target.value)}
                    placeholder="Criteria for students to earn the tug point..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
              )}

              <div>
                <label className="text-slate-400 font-semibold block mb-1">
                  Educational Explanation
                </label>
                <textarea
                  rows={2}
                  value={formExplanation}
                  onChange={(e) => setFormExplanation(e.target.value)}
                  placeholder="Explain why this answer is recommended..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">
                  Employer / Career Tip (Optional)
                </label>
                <input
                  type="text"
                  value={formCareerTip}
                  onChange={(e) => setFormCareerTip(e.target.value)}
                  placeholder="Practical advice for high schoolers..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Question</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
