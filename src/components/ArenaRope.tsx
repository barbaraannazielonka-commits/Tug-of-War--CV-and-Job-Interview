import React from 'react';
import { TeamConfig, TeamSide } from '../types/game';

interface ArenaRopeProps {
  ropePosition: number;
  winThreshold: number;
  activeTeam: TeamSide;
  redTeam: TeamConfig;
  blueTeam: TeamConfig;
  isTugging: boolean;
}

export const ArenaRope: React.FC<ArenaRopeProps> = ({
  ropePosition,
  winThreshold,
  activeTeam,
  redTeam,
  blueTeam,
  isTugging
}) => {
  // Calculate percentage: 0% = Red Maximum Pull, 50% = Center, 100% = Blue Maximum Pull
  // We keep a safety padding so the ribbon stays inside the visible rope track (e.g. 8% to 92%)
  const clampedPosition = Math.max(-winThreshold, Math.min(winThreshold, ropePosition));
  const progressRatio = clampedPosition / winThreshold; // -1 to 1
  const ribbonPercentage = 50 + progressRatio * 42; // 8% to 92%

  // Ticks along the rope
  const ticks = [];
  for (let i = -winThreshold; i <= winThreshold; i++) {
    ticks.push(i);
  }

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 sm:p-5 flex flex-col justify-between shadow-2xl relative overflow-hidden backdrop-blur-sm">
      
      {/* Arena Subheader / Status */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-400 pb-2 border-b border-slate-800/80">
        <div className="flex items-center gap-2 text-rose-400 font-mono text-[11px] uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-rose-500 inline-block"></span>
          <span>{redTeam.name} Zone</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-mono text-[11px] tabular-nums">
            Threshold: {winThreshold} Knots
          </span>
          <span className="text-slate-600">|</span>
          <span className={`text-[11px] font-bold font-mono px-2 py-0.5 rounded ${
            ropePosition < 0 
              ? 'bg-rose-950/80 text-rose-300 border border-rose-800/60' 
              : ropePosition > 0 
                ? 'bg-sky-950/80 text-sky-300 border border-sky-800/60' 
                : 'bg-slate-800 text-slate-400'
          }`}>
            {ropePosition === 0 
              ? 'Tied Dead Center' 
              : ropePosition < 0 
                ? `${redTeam.name} +${Math.abs(ropePosition)} Lead` 
                : `${blueTeam.name} +${ropePosition} Lead`}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sky-400 font-mono text-[11px] uppercase tracking-wider">
          <span>{blueTeam.name} Zone</span>
          <span className="w-2 h-2 rounded-full bg-sky-500 inline-block"></span>
        </div>
      </div>

      {/* Main Rope Pitch Area */}
      <div className="relative my-4 sm:my-6 py-6 flex items-center">
        
        {/* Red Win Goal Line */}
        <div className="absolute left-[8%] top-0 bottom-0 w-0.5 border-r-2 border-dashed border-rose-500/70 z-10 flex flex-col justify-between py-1">
          <span className="text-[10px] font-black text-rose-400 tracking-wider -rotate-90 origin-top-left -ml-2.5 uppercase font-mono">
            WIN
          </span>
          <span className="text-[9px] font-mono text-rose-400/80 -rotate-90 origin-bottom-left -ml-2.5">
            -{winThreshold}
          </span>
        </div>

        {/* Center Reference Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-700/80 -translate-x-1/2 z-0">
          <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 text-[10px] px-1.5 py-0.5 rounded text-slate-400 font-mono tabular-nums">
            0
          </div>
        </div>

        {/* Blue Win Goal Line */}
        <div className="absolute right-[8%] top-0 bottom-0 w-0.5 border-l-2 border-dashed border-sky-500/70 z-10 flex flex-col justify-between py-1 items-end">
          <span className="text-[10px] font-black text-sky-400 tracking-wider rotate-90 origin-top-right -mr-2.5 uppercase font-mono">
            WIN
          </span>
          <span className="text-[9px] font-mono text-sky-400/80 rotate-90 origin-bottom-right -mr-2.5">
            +{winThreshold}
          </span>
        </div>

        {/* The Braided Physical Rope */}
        <div className={`w-full h-8 sm:h-9 rope-braid rounded-full relative z-10 shadow-lg flex items-center ${isTugging ? 'animate-rope-strain' : ''}`}>
          
          {/* Team Red Puller Silhouette on Left End */}
          <div className={`absolute -left-4 sm:-left-6 -top-5 text-2xl sm:text-3xl pointer-events-none drop-shadow-md select-none transition-transform duration-300 ${
            activeTeam === 'red' ? 'animate-pull-red scale-110' : 'opacity-85'
          }`}>
            <span className="inline-block transform -scale-x-100 mr-1">{redTeam.mascot}</span>
            <span className="text-xl sm:text-2xl">💪</span>
          </div>

          {/* Knot Step Markings on Rope */}
          <div className="w-full flex justify-between px-[8%] relative z-10 pointer-events-none">
            {ticks.map((t) => {
              const isCenter = t === 0;
              const isLead = t === ropePosition;
              return (
                <div key={t} className="flex flex-col items-center">
                  <div className={`w-1 sm:w-1.5 rounded-full transition-all duration-300 ${
                    isCenter 
                      ? 'h-4 bg-amber-400' 
                      : isLead 
                        ? 'h-3.5 bg-white ring-2 ring-amber-400' 
                        : 'h-2 bg-amber-950/70'
                  }`} />
                </div>
              );
            })}
          </div>

          {/* Team Blue Puller Silhouette on Right End */}
          <div className={`absolute -right-4 sm:-right-6 -top-5 text-2xl sm:text-3xl pointer-events-none drop-shadow-md select-none transition-transform duration-300 ${
            activeTeam === 'blue' ? 'animate-pull-blue scale-110' : 'opacity-85'
          }`}>
            <span className="text-xl sm:text-2xl">💪</span>
            <span className="inline-block ml-1">{blueTeam.mascot}</span>
          </div>

          {/* Dynamic Traveling Central Ribbon Knot Marker */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-500 ease-out z-20 flex flex-col items-center pointer-events-none"
            style={{ left: `${ribbonPercentage}%` }}
          >
            {/* The Knot Ribbon */}
            <div className={`w-6 h-12 rounded-sm shadow-2xl flex flex-col items-center justify-between py-1 transition-all duration-300 ${
              ropePosition < 0 
                ? 'bg-rose-500 border-2 border-rose-300 shadow-rose-500/50' 
                : ropePosition > 0 
                  ? 'bg-sky-500 border-2 border-sky-300 shadow-sky-500/50' 
                  : 'bg-amber-400 border-2 border-amber-200 shadow-amber-400/50'
            }`}>
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-white/60"></div>
              <div className="text-[8px] font-black font-mono text-slate-900 uppercase">
                {ropePosition === 0 ? '||' : ropePosition < 0 ? '◀' : '▶'}
              </div>
              <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-slate-900"></div>
            </div>

            {/* Position Pill Marker */}
            <div className={`mt-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold whitespace-nowrap shadow-md border ${
              ropePosition < 0 
                ? 'bg-rose-950 text-rose-200 border-rose-600' 
                : ropePosition > 0 
                  ? 'bg-sky-950 text-sky-200 border-sky-600' 
                  : 'bg-slate-900 text-slate-300 border-slate-700'
            }`}>
              {ropePosition === 0 ? 'EVEN' : ropePosition < 0 ? `RED ${ropePosition}` : `BLUE +${ropePosition}`}
            </div>
          </div>

        </div>
      </div>

      {/* Tension Gauge Bar Footer */}
      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
        <div className="flex items-center gap-1.5">
          <span className="text-rose-400 font-bold">{Math.max(0, -ropePosition)}</span>
          <span>knots pulled left</span>
        </div>
        <div className="text-slate-500 hidden sm:block">
          {Math.abs(ropePosition) === 0 ? 'Rope centered at 0' : `Lead margin: ${Math.abs(ropePosition)} knot${Math.abs(ropePosition) > 1 ? 's' : ''}`}
        </div>
        <div className="flex items-center gap-1.5">
          <span>knots pulled right</span>
          <span className="text-sky-400 font-bold">{Math.max(0, ropePosition)}</span>
        </div>
      </div>

    </div>
  );
};
