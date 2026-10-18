import React, { useState } from 'react';
import { TeamConfig, TeamSide } from '../types/game';
import { Edit2, Check } from 'lucide-react';

interface TeamCardProps {
  teamSide: TeamSide;
  team: TeamConfig;
  isActive: boolean;
  onUpdateName: (newName: string) => void;
}

export const TeamCard: React.FC<TeamCardProps> = ({
  teamSide,
  team,
  isActive,
  onUpdateName
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(team.name);

  const isRed = teamSide === 'red';

  const handleSaveName = () => {
    if (nameInput.trim()) {
      onUpdateName(nameInput.trim());
    }
    setIsEditing(false);
  };

  return (
    <div
      className={`rounded-2xl p-3 sm:p-4 flex flex-col justify-between border-2 transition-all duration-300 relative overflow-hidden backdrop-blur-sm ${
        isActive
          ? isRed
            ? 'bg-rose-950/40 border-rose-500 shadow-xl shadow-rose-500/20 ring-4 ring-rose-500/20'
            : 'bg-sky-950/40 border-sky-500 shadow-xl shadow-sky-500/20 ring-4 ring-sky-500/20'
          : isRed
            ? 'bg-slate-900/70 border-rose-900/30 opacity-80'
            : 'bg-slate-900/70 border-sky-900/30 opacity-80'
      }`}
    >
      {/* Team Header & Turn Beacon */}
      <div className="flex items-center justify-between gap-1 pb-1">
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          {isEditing ? (
            <div className="flex items-center gap-1 w-full">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                className="bg-slate-800 text-xs text-white px-2 py-0.5 rounded border border-slate-600 focus:outline-none w-full"
                autoFocus
              />
              <button
                onClick={handleSaveName}
                className="text-emerald-400 hover:text-emerald-300 p-0.5"
                title="Save team name"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 truncate">
              <span className={`text-xs font-black uppercase tracking-wider truncate ${isRed ? 'text-rose-400' : 'text-sky-400'}`}>
                {team.name}
              </span>
              <button
                onClick={() => setIsEditing(true)}
                className="text-slate-500 hover:text-slate-300 transition-colors opacity-60 hover:opacity-100"
                title="Rename team"
              >
                <Edit2 className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {isActive && (
          <span className="flex h-2.5 w-2.5 relative shrink-0">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isRed ? 'bg-rose-400' : 'bg-sky-400'}`}></span>
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isRed ? 'bg-rose-500' : 'bg-sky-500'}`}></span>
          </span>
        )}
      </div>

      {/* Main Score Display */}
      <div className="my-2 text-center">
        <div className={`text-3xl sm:text-4xl lg:text-5xl font-black font-mono tracking-tight tabular-nums ${isRed ? 'text-rose-400' : 'text-sky-400'}`}>
          {team.score}
        </div>
        <div className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-widest mt-0.5">
          Points Won
        </div>
      </div>

      {/* Mascot Box & Streak */}
      <div className={`flex items-center justify-between py-1.5 px-2.5 rounded-xl border ${
        isRed ? 'bg-rose-950/40 border-rose-900/40 text-rose-200' : 'bg-sky-950/40 border-sky-900/40 text-sky-200'
      }`}>
        <div className="flex items-center gap-2">
          <span className={`text-xl ${isRed ? 'animate-pull-red' : 'animate-pull-blue'}`}>
            {team.mascot}
          </span>
          <div className="text-left">
            <p className="text-[11px] font-bold leading-tight uppercase font-mono">
              {isRed ? 'Team Red' : 'Team Blue'}
            </p>
            <p className="text-[10px] text-slate-400 font-medium">
              {team.streak > 1 ? `🔥 ${team.streak} Streak` : 'Active Competitor'}
            </p>
          </div>
        </div>
      </div>

      {/* Turn Banner */}
      <div className="mt-2">
        {isActive ? (
          <div className={`text-center py-1 rounded-lg text-white font-black text-[11px] uppercase tracking-wider shadow ${
            isRed ? 'bg-rose-600' : 'bg-sky-600'
          }`}>
            Answering Now
          </div>
        ) : (
          <div className="text-center py-1 text-slate-500 text-[11px] font-medium">
            Waiting Turn
          </div>
        )}
      </div>
    </div>
  );
};
