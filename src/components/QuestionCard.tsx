import React, { useState } from 'react';
import { Question, TeamConfig, TeamSide } from '../types/game';
import { CheckCircle2, XCircle, Lightbulb, Clock, Eye, EyeOff } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  activeTeamSide: TeamSide;
  activeTeam: TeamConfig;
  selectedOption: number | null;
  onSelectOption: (index: number) => void;
  isAnswerRevealed: boolean;
  isAnswerCorrect: boolean | null;
  onLockInAnswer: () => void;
  onOpenEvaluation: (awarded: boolean) => void;
  onNextQuestion: () => void;
  onSkipQuestion: () => void;
  isPaused: boolean;
  isWinnerDecided: boolean;
  timerSecondsRemaining: number | null;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionIndex,
  totalQuestions,
  activeTeamSide,
  activeTeam,
  selectedOption,
  onSelectOption,
  isAnswerRevealed,
  isAnswerCorrect,
  onLockInAnswer,
  onOpenEvaluation,
  onNextQuestion,
  onSkipQuestion,
  isPaused,
  isWinnerDecided,
  timerSecondsRemaining
}) => {
  const [showRubric, setShowRubric] = useState(false);

  const isRed = activeTeamSide === 'red';
  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <main className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl flex-1 flex flex-col justify-between backdrop-blur-md">
      
      {/* Top Meta Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
        
        {/* Active Team Tag & Category */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-3">
          <span
            className={`px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider text-white shadow-sm flex items-center gap-1.5 ${
              isRed ? 'bg-rose-600 shadow-rose-600/30' : 'bg-sky-600 shadow-sky-600/30'
            }`}
          >
            <span>{isRed ? '🔴' : '🔵'}</span>
            <span>{activeTeam.name}'s Turn</span>
          </span>

          <span className="text-xs font-semibold text-slate-300">
            {question.category}
          </span>

          <span className="text-slate-500 font-mono text-xs tabular-nums">
            Q{questionIndex + 1} of {totalQuestions}
          </span>
        </div>

        {/* Question Type & Timer */}
        <div className="flex items-center gap-2">
          {timerSecondsRemaining !== null && timerSecondsRemaining >= 0 && !isAnswerRevealed && (
            <div
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold border ${
                timerSecondsRemaining <= 10
                  ? 'bg-rose-950/80 text-rose-300 border-rose-600 animate-pulse'
                  : 'bg-slate-800 text-slate-300 border-slate-700'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{timerSecondsRemaining}s</span>
            </div>
          )}

          <span
            className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold uppercase tracking-wider border ${
              question.type === 'open'
                ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'
            }`}
          >
            {question.type === 'open' ? 'Open Discussion' : 'Multiple Choice'}
          </span>
        </div>

      </div>

      {/* Main Question Heading */}
      <div className="my-4 sm:my-5">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-snug tracking-tight">
          {question.question}
        </h2>
      </div>

      {/* Answer Area: Multiple Choice vs Open Discussion */}
      {question.type === 'mc' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 my-2">
          {question.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = isAnswerRevealed && idx === question.correct;
            const isWrongSelected = isAnswerRevealed && isSelected && !isCorrect;

            let cardStyle = 'bg-slate-800/60 border-slate-700/70 text-slate-200 hover:bg-slate-800 hover:border-slate-600';

            if (isAnswerRevealed) {
              if (isCorrect) {
                cardStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-100 ring-2 ring-emerald-500/40 font-semibold';
              } else if (isWrongSelected) {
                cardStyle = 'bg-rose-950/60 border-rose-500 text-rose-200 ring-2 ring-rose-500/40 opacity-90';
              } else {
                cardStyle = 'bg-slate-900/60 border-slate-800/80 text-slate-500 opacity-40';
              }
            } else if (isSelected) {
              cardStyle = isRed
                ? 'bg-rose-950/50 border-rose-500 text-white ring-2 ring-rose-500/40'
                : 'bg-sky-950/50 border-sky-500 text-white ring-2 ring-sky-500/40';
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={isAnswerRevealed || isPaused || isWinnerDecided}
                onClick={() => onSelectOption(idx)}
                className={`flex items-start text-left p-3 sm:p-4 rounded-xl border transition-all duration-200 group active:scale-[0.99] min-h-[60px] cursor-pointer ${cardStyle}`}
              >
                <span
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-black font-mono text-xs mr-3 shrink-0 transition-colors ${
                    isCorrect
                      ? 'bg-emerald-500 text-white'
                      : isWrongSelected
                        ? 'bg-rose-500 text-white'
                        : isSelected
                          ? isRed
                            ? 'bg-rose-600 text-white'
                            : 'bg-sky-600 text-white'
                          : 'bg-slate-700 text-slate-300 group-hover:bg-slate-600'
                  }`}
                >
                  {optionLetters[idx]}
                </span>
                <span className="text-sm sm:text-base leading-relaxed self-center font-medium">
                  {option}
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        /* Open-Ended Question Teacher Grading Rubric & Buttons */
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 my-2">
          
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
              Classroom Discussion & Teacher Rubric
            </span>
            <button
              onClick={() => setShowRubric(!showRubric)}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 cursor-pointer"
            >
              {showRubric ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showRubric ? 'Hide Marking Criteria' : 'Show Marking Criteria'}</span>
            </button>
          </div>

          {showRubric && (
            <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-100 text-xs sm:text-sm mb-4 leading-relaxed">
              <strong className="block text-[11px] uppercase font-bold text-amber-400 mb-1 font-mono">
                Evaluation Criteria:
              </strong>
              {question.rubric}
            </div>
          )}

          {!isAnswerRevealed ? (
            <div className="space-y-2 pt-1">
              <p className="text-xs text-slate-400">
                Let <span className="font-bold text-white">{activeTeam.name}</span> formulate their response as a team. Teacher awards the point:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  disabled={isPaused || isWinnerDecided}
                  onClick={() => onOpenEvaluation(true)}
                  className="py-3 px-4 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white font-bold rounded-xl text-sm shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Award Tug (+1 Pull)</span>
                </button>
                <button
                  type="button"
                  disabled={isPaused || isWinnerDecided}
                  onClick={() => onOpenEvaluation(false)}
                  className="py-3 px-4 bg-rose-600/90 hover:bg-rose-500 active:scale-[0.99] text-white font-bold rounded-xl text-sm shadow-lg shadow-rose-600/20 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Incomplete / No Tug Awarded</span>
                </button>
              </div>
            </div>
          ) : (
            <p className="text-center text-xs text-slate-400 italic py-1">
              Judgment recorded for this turn.
            </p>
          )}

        </div>
      )}

      {/* Answer Explanation & Career Coach Tip */}
      {isAnswerRevealed && (
        <div
          className={`mt-3 p-3.5 sm:p-4 rounded-xl border flex items-start gap-3 transition-all ${
            isAnswerCorrect
              ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-100'
              : 'bg-rose-950/40 border-rose-500/50 text-rose-100'
          }`}
        >
          <div className="shrink-0 mt-0.5">
            {isAnswerCorrect ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            ) : (
              <Lightbulb className="w-5 h-5 text-amber-400" />
            )}
          </div>
          <div className="flex-1 text-xs sm:text-sm">
            <div className="font-bold uppercase tracking-wider mb-1 font-mono text-[11px]">
              {isAnswerCorrect
                ? 'Correct Answer! Rope Pulled Toward ' + activeTeam.name
                : 'Incorrect / Learning Opportunity'}
            </div>
            <p className="text-slate-300 leading-relaxed font-normal">
              {question.explanation}
            </p>
            {question.careerTip && (
              <div className="mt-2 pt-2 border-t border-slate-700/60 text-slate-400 flex items-start gap-1.5 text-xs">
                <span className="font-bold text-amber-400 font-mono">Employer Insight:</span>
                <span>{question.careerTip}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Controls / Action Bar */}
      <div className="flex items-center justify-between gap-3 pt-4 mt-3 border-t border-slate-800">
        
        <button
          type="button"
          onClick={onSkipQuestion}
          disabled={isPaused || isWinnerDecided}
          className="px-3.5 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition cursor-pointer"
        >
          Skip Question
        </button>

        <div>
          {!isAnswerRevealed ? (
            question.type === 'mc' && (
              <button
                type="button"
                onClick={onLockInAnswer}
                disabled={selectedOption === null || isPaused || isWinnerDecided}
                className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-lg cursor-pointer ${
                  selectedOption === null || isPaused || isWinnerDecided
                    ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                    : isRed
                      ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30 hover:scale-105'
                      : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/30 hover:scale-105'
                }`}
              >
                Lock In Answer
              </button>
            )
          ) : (
            <button
              type="button"
              onClick={onNextQuestion}
              disabled={isWinnerDecided}
              className="px-6 py-2.5 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 transition-all duration-200 hover:scale-105 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Next Turn</span>
              <span>➔</span>
            </button>
          )}
        </div>

      </div>

    </main>
  );
};
