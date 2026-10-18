import React from 'react';
import { TeamConfig, TeamSide } from '../types/game';
import { Trophy, RotateCcw, Sliders, Sparkles } from 'lucide-react';

interface VictoryModalProps {
  winner: TeamSide | null;
  redTeam: TeamConfig;
  blueTeam: TeamConfig;
  ropePosition: number;
  totalAnswered: number;
  onRematch: () => void;
  onOpenTeacherHub: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  winner,
  redTeam,
  blueTeam,
  ropePosition,
  totalAnswered,
  onRematch,
  onOpenTeacherHub
}) => {
  if (!winner) return null;

  const isRed = winner === 'red';
  const winningTeam = isRed ? redTeam : blueTeam;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div
        className={`max-w-lg w-full rounded-3xl p-6 sm:p-8 text-center border-2 shadow-2xl relative transition-all ${
          isRed
            ? 'bg-gradient-to-b from-rose-950 via-slate-900 to-slate-950 border-rose-500 shadow-rose-500/30'
            : 'bg-gradient-to-b from-sky-950 via-slate-900 to-slate-950 border-sky-500 shadow-sky-500/30'
        }`}
      >
        {/* Animated Trophy & Mascot */}
        <div className="relative inline-block mb-3">
          <div className="w-20 h-20 rounded-3xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-4xl shadow-inner mx-auto">
            <Trophy className="w-10 h-10 text-amber-400 animate-bounce" />
          </div>
          <span className="absolute -bottom-1 -right-1 text-2xl">
            {winningTeam.mascot}
          </span>
        </div>

        {/* Victory Badge */}
        <div>
          <span
            className={`text-[11px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${
              isRed
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                : 'bg-sky-500/20 text-sky-300 border-sky-500/30'
            }`}
          >
            Victory Achieved
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white mt-2 mb-1 tracking-tight">
          {winningTeam.name.toUpperCase()} WINS!
        </h2>

        <p className="text-slate-300 text-xs sm:text-sm mb-6 max-w-sm mx-auto leading-relaxed">
          Exceptional teamwork and CV / interview knowledge pulled the knot across the finish line!
        </p>

        {/* Match Statistics Card */}
        <div className="grid grid-cols-3 gap-2.5 p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center mb-6">
          <div className="p-2 rounded-xl bg-slate-900/60">
            <span className="text-[10px] text-rose-400 uppercase font-mono font-bold block">
              {redTeam.name}
            </span>
            <span className="text-xl font-mono font-black text-white tabular-nums">
              {redTeam.score} pts
            </span>
          </div>

          <div className="p-2 rounded-xl bg-slate-900/60">
            <span className="text-[10px] text-slate-400 uppercase font-mono font-bold block">
              Final Tug
            </span>
            <span className="text-xl font-mono font-black text-amber-400 tabular-nums">
              {Math.abs(ropePosition)} Knots
            </span>
          </div>

          <div className="p-2 rounded-xl bg-slate-900/60">
            <span className="text-[10px] text-sky-400 uppercase font-mono font-bold block">
              {blueTeam.name}
            </span>
            <span className="text-xl font-mono font-black text-white tabular-nums">
              {blueTeam.score} pts
            </span>
          </div>
        </div>

        {/* Rematch & Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <button
            onClick={onRematch}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider transition shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play Rematch</span>
          </button>

          <button
            onClick={onOpenTeacherHub}
            className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sliders className="w-4 h-4" />
            <span>Teacher Hub</span>
          </button>
        </div>

      </div>
    </div>
  );
};
