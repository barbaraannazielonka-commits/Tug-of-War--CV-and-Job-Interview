import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Question, TeamConfig, TeamSide, GameSettings } from './types/game';
import { DEFAULT_QUESTIONS } from './data/defaultQuestions';
import { sound } from './utils/sound';
import { ArenaRope } from './components/ArenaRope';
import { TeamCard } from './components/TeamCard';
import { QuestionCard } from './components/QuestionCard';
import { TeacherHubModal } from './components/TeacherHubModal';
import { VictoryModal } from './components/VictoryModal';
import { StudyGuideModal } from './components/StudyGuideModal';
import { Volume2, VolumeX, Maximize2, Minimize2, Pause, Play, BookOpen, Sliders } from 'lucide-react';

const STORAGE_KEY_QUESTIONS = 'tug_of_war_questions_v3';
const STORAGE_KEY_SETTINGS = 'tug_of_war_settings_v1';

export default function App() {
  // Load questions from localStorage or fallback to defaults
  const [questions, setQuestions] = useState<Question[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_QUESTIONS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (err) {
      console.warn('Could not read saved questions:', err);
    }
    return DEFAULT_QUESTIONS;
  });

  // Settings
  const [settings, setSettings] = useState<GameSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (saved) return JSON.parse(saved);
    } catch (err) {
      console.warn('Could not read saved settings:', err);
    }
    return {
      winThreshold: 4,
      stepDistance: 1,
      streakBonusEnabled: true,
      turnTimerSeconds: 0,
      soundMuted: false,
      categoryFilter: 'All'
    };
  });

  // Teams State
  const [redTeam, setRedTeam] = useState<TeamConfig>({
    name: 'Team Titans',
    mascot: '🦁',
    color: '#ef4444',
    score: 0,
    streak: 0
  });

  const [blueTeam, setBlueTeam] = useState<TeamConfig>({
    name: 'Team Wolves',
    mascot: '🐺',
    color: '#3b82f6',
    score: 0,
    streak: 0
  });

  // Arena & Match States
  const [activeTeamSide, setActiveTeamSide] = useState<TeamSide>('red');
  const [ropePosition, setRopePosition] = useState<number>(0);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [usedQuestionIds, setUsedQuestionIds] = useState<(string | number)[]>([]);
  const [winner, setWinner] = useState<TeamSide | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isTugging, setIsTugging] = useState<boolean>(false);

  // Question Response States
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  // Modals & Screen states
  const [isTeacherHubOpen, setIsTeacherHubOpen] = useState<boolean>(false);
  const [isStudyGuideOpen, setIsStudyGuideOpen] = useState<boolean>(false);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  // Turn Timer Countdown
  const [timerRemaining, setTimerRemaining] = useState<number | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Sync mute with sound engine
  useEffect(() => {
    sound.muted = settings.soundMuted;
  }, [settings.soundMuted]);

  // Persist questions to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_QUESTIONS, JSON.stringify(questions));
    } catch (err) {
      console.error('Storage error:', err);
    }
  }, [questions]);

  // Persist settings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
    } catch (err) {
      console.error('Storage error:', err);
    }
  }, [settings]);

  // Full-screen change listener
  useEffect(() => {
    const handleFSChange = () => {
      setIsFullScreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFSChange);
    return () => document.removeEventListener('fullscreenchange', handleFSChange);
  }, []);

  // Filtered pool of questions
  const filteredQuestions = React.useMemo(() => {
    if (settings.categoryFilter === 'All') return questions;
    return questions.filter(q => q.category === settings.categoryFilter);
  }, [questions, settings.categoryFilter]);

  const activeQuestion = filteredQuestions[currentQIndex] || filteredQuestions[0] || questions[0];

  // Turn Timer countdown effect
  useEffect(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    if (settings.turnTimerSeconds > 0 && !isAnswerRevealed && !isPaused && !winner) {
      setTimerRemaining(settings.turnTimerSeconds);

      timerIntervalRef.current = setInterval(() => {
        setTimerRemaining((prev) => {
          if (prev === null || prev <= 1) {
            if (prev === 1) {
              sound.playIncorrect();
            }
            return 0;
          }
          if (prev <= 5) {
            sound.playTick();
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setTimerRemaining(null);
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [currentQIndex, isAnswerRevealed, isPaused, winner, settings.turnTimerSeconds]);

  // Victory Fanfare & Confetti Blast
  useEffect(() => {
    if (winner) {
      sound.playVictory();
      const colors = winner === 'red' ? ['#ef4444', '#f87171', '#ffffff'] : ['#3b82f6', '#60a5fa', '#ffffff'];

      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
        colors
      });

      const interval = setInterval(() => {
        confetti({
          particleCount: 40,
          angle: 60,
          spread: 60,
          origin: { x: 0 },
          colors
        });
        confetti({
          particleCount: 40,
          angle: 120,
          spread: 60,
          origin: { x: 1 },
          colors
        });
      }, 700);

      return () => clearInterval(interval);
    }
  }, [winner]);

  // Move rope with physics & streak logic
  const applyScoreAndTug = useCallback((team: TeamSide, steps: number) => {
    setIsTugging(true);
    setTimeout(() => setIsTugging(false), 600);

    let bonusStep = 0;
    if (settings.streakBonusEnabled) {
      const currentStreak = team === 'red' ? redTeam.streak : blueTeam.streak;
      if (currentStreak >= 2) {
        bonusStep = 1;
      }
    }

    const totalSteps = steps + bonusStep;

    setRopePosition((prevPos) => {
      let nextPos = prevPos;
      if (team === 'red') {
        nextPos = Math.max(-settings.winThreshold, prevPos - totalSteps);
      } else {
        nextPos = Math.min(settings.winThreshold, prevPos + totalSteps);
      }

      // Check Victory
      if (nextPos <= -settings.winThreshold) {
        setWinner('red');
      } else if (nextPos >= settings.winThreshold) {
        setWinner('blue');
      }

      return nextPos;
    });

    if (team === 'red') {
      setRedTeam((prev) => ({
        ...prev,
        score: prev.score + 1,
        streak: prev.streak + 1
      }));
      setBlueTeam((prev) => ({ ...prev, streak: 0 }));
    } else {
      setBlueTeam((prev) => ({
        ...prev,
        score: prev.score + 1,
        streak: prev.streak + 1
      }));
      setRedTeam((prev) => ({ ...prev, streak: 0 }));
    }
  }, [settings.winThreshold, settings.streakBonusEnabled, redTeam.streak, blueTeam.streak]);

  // Lock in multiple choice answer
  const handleLockInAnswer = useCallback(() => {
    if (selectedOption === null || isAnswerRevealed || isPaused || winner) return;

    if (activeQuestion.type === 'mc') {
      const correct = selectedOption === activeQuestion.correct;
      setIsAnswerRevealed(true);
      setIsAnswerCorrect(correct);

      if (correct) {
        sound.playCorrect();
        sound.playTug();
        applyScoreAndTug(activeTeamSide, settings.stepDistance);
      } else {
        sound.playIncorrect();
        // Break team streak on wrong answer
        if (activeTeamSide === 'red') {
          setRedTeam((prev) => ({ ...prev, streak: 0 }));
        } else {
          setBlueTeam((prev) => ({ ...prev, streak: 0 }));
        }
      }
    }
  }, [selectedOption, isAnswerRevealed, isPaused, winner, activeQuestion, activeTeamSide, settings.stepDistance, applyScoreAndTug]);

  // Open-ended rubric evaluation
  const handleOpenEvaluation = useCallback((awarded: boolean) => {
    if (isAnswerRevealed || isPaused || winner) return;

    setIsAnswerRevealed(true);
    setIsAnswerCorrect(awarded);

    if (awarded) {
      sound.playCorrect();
      sound.playTug();
      applyScoreAndTug(activeTeamSide, settings.stepDistance);
    } else {
      sound.playIncorrect();
      if (activeTeamSide === 'red') {
        setRedTeam((prev) => ({ ...prev, streak: 0 }));
      } else {
        setBlueTeam((prev) => ({ ...prev, streak: 0 }));
      }
    }
  }, [isAnswerRevealed, isPaused, winner, activeTeamSide, settings.stepDistance, applyScoreAndTug]);

  // Advance to next question and handover turn
  const handleNextQuestion = useCallback(() => {
    if (winner) return;

    const nextUsed = [...usedQuestionIds, activeQuestion.id];
    setUsedQuestionIds(nextUsed);

    const availableIndices = filteredQuestions
      .map((q, idx) => ({ q, idx }))
      .filter((item) => !nextUsed.includes(item.q.id));

    let nextIdx: number;
    if (availableIndices.length > 0) {
      const randomItem = availableIndices[Math.floor(Math.random() * availableIndices.length)];
      nextIdx = randomItem.idx;
    } else {
      setUsedQuestionIds([]);
      nextIdx = (currentQIndex + 1) % filteredQuestions.length;
    }

    setCurrentQIndex(nextIdx);
    setSelectedOption(null);
    setIsAnswerRevealed(false);
    setIsAnswerCorrect(null);

    // Switch turns
    setActiveTeamSide((prev) => (prev === 'red' ? 'blue' : 'red'));
  }, [winner, usedQuestionIds, activeQuestion.id, filteredQuestions, currentQIndex]);

  // Skip question
  const handleSkipQuestion = () => {
    handleNextQuestion();
  };

  // Full Game Reset
  const handleResetGame = () => {
    setRopePosition(0);
    setRedTeam((prev) => ({ ...prev, score: 0, streak: 0 }));
    setBlueTeam((prev) => ({ ...prev, score: 0, streak: 0 }));
    setWinner(null);
    setSelectedOption(null);
    setIsAnswerRevealed(false);
    setIsAnswerCorrect(null);
    setUsedQuestionIds([]);
    setActiveTeamSide('red');
    sound.playWhistle();
  };

  // Toggle Fullscreen
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => console.warn(err));
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  };

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in form input/textarea
      const activeTag = (document.activeElement?.tagName || '').toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') return;

      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        setIsPaused((p) => !p);
      } else if (e.key === 'm' || e.key === 'M') {
        setSettings((prev) => ({ ...prev, soundMuted: !prev.soundMuted }));
      } else if (activeQuestion.type === 'mc' && !isAnswerRevealed && !isPaused && !winner) {
        if (e.key === 'a' || e.key === 'A' || e.key === '1') {
          setSelectedOption(0);
        } else if (e.key === 'b' || e.key === 'B' || e.key === '2') {
          setSelectedOption(1);
        } else if (e.key === 'c' || e.key === 'C' || e.key === '3') {
          setSelectedOption(2);
        } else if (e.key === 'd' || e.key === 'D' || e.key === '4') {
          setSelectedOption(3);
        } else if (e.key === 'Enter') {
          if (selectedOption !== null) {
            handleLockInAnswer();
          }
        }
      } else if (isAnswerRevealed && !winner && e.key === 'Enter') {
        handleNextQuestion();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeQuestion, isAnswerRevealed, isPaused, winner, selectedOption, handleLockInAnswer, handleNextQuestion]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-2 sm:p-4 md:p-6 text-slate-100 select-none relative">
      
      {/* TOP BAR CONTRACT: Zone 1 (Wordmark) — Zone 2 (4-5 Nav Links) — Zone 3 (1 Primary Action) */}
      <header className="flex items-center justify-between gap-4 sm:gap-8 pb-3 border-b border-slate-800/80 mb-3">
        
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-600 via-amber-500 to-sky-600 flex items-center justify-center shadow-lg shadow-amber-500/20 text-white font-black text-base">
            ⚔️
          </div>
          <span className="text-lg sm:text-xl font-black tracking-tight text-white">
            Tug of War
          </span>
        </div>

        {/* Zone 2: 4 single-line nav controls / utilities */}
        <nav className="flex items-center gap-2 sm:gap-4 text-xs font-semibold text-slate-300">
          <button
            onClick={() => setIsStudyGuideOpen(true)}
            className="hover:text-white transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Careers Guide</span>
          </button>

          <button
            onClick={() => setIsPaused((p) => !p)}
            className={`transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
              isPaused ? 'text-amber-300 font-bold' : 'hover:text-white text-slate-300'
            }`}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            <span>{isPaused ? 'Resume' : 'Pause'}</span>
          </button>

          <button
            onClick={() => setSettings((s) => ({ ...s, soundMuted: !s.soundMuted }))}
            className="hover:text-white transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
            title={settings.soundMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {settings.soundMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-slate-300" />}
            <span className="hidden md:inline">{settings.soundMuted ? 'Muted' : 'Sound'}</span>
          </button>

          <button
            onClick={toggleFullScreen}
            className="hover:text-white transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
            title="Toggle Fullscreen Projector"
          >
            {isFullScreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">{isFullScreen ? 'Exit Full' : 'Fullscreen'}</span>
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center shrink-0">
          <button
            onClick={() => setIsTeacherHubOpen(true)}
            className="px-3.5 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition shadow-md shadow-indigo-600/25 flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Teacher Deck</span>
          </button>
        </div>

      </header>

      {/* PAUSE BANNER */}
      {isPaused && (
        <div className="bg-amber-500/15 border border-amber-500/40 text-amber-200 py-2 px-4 rounded-xl mb-3 text-center text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 animate-pulse">
          <Pause className="w-4 h-4 text-amber-400" />
          <span>MATCH PAUSED — Turn locked for classroom lecture or discussion. Press Space or click Resume to continue.</span>
        </div>
      )}

      {/* 3-COLUMN ARENA: Team Red | Physical Braided Rope | Team Blue */}
      <div className="grid grid-cols-12 gap-2.5 sm:gap-4 items-stretch mb-3">
        
        {/* Team Red Card */}
        <div className="col-span-3 sm:col-span-2.5">
          <TeamCard
            teamSide="red"
            team={redTeam}
            isActive={activeTeamSide === 'red'}
            onUpdateName={(newName) => setRedTeam((prev) => ({ ...prev, name: newName }))}
          />
        </div>

        {/* Center Physical Tug Track */}
        <div className="col-span-6 sm:col-span-7">
          <ArenaRope
            ropePosition={ropePosition}
            winThreshold={settings.winThreshold}
            activeTeam={activeTeamSide}
            redTeam={redTeam}
            blueTeam={blueTeam}
            isTugging={isTugging}
          />
        </div>

        {/* Team Blue Card */}
        <div className="col-span-3 sm:col-span-2.5">
          <TeamCard
            teamSide="blue"
            team={blueTeam}
            isActive={activeTeamSide === 'blue'}
            onUpdateName={(newName) => setBlueTeam((prev) => ({ ...prev, name: newName }))}
          />
        </div>

      </div>

      {/* QUESTION ARENA */}
      <QuestionCard
        question={activeQuestion}
        questionIndex={currentQIndex}
        totalQuestions={filteredQuestions.length}
        activeTeamSide={activeTeamSide}
        activeTeam={activeTeamSide === 'red' ? redTeam : blueTeam}
        selectedOption={selectedOption}
        onSelectOption={(idx) => setSelectedOption(idx)}
        isAnswerRevealed={isAnswerRevealed}
        isAnswerCorrect={isAnswerCorrect}
        onLockInAnswer={handleLockInAnswer}
        onOpenEvaluation={handleOpenEvaluation}
        onNextQuestion={handleNextQuestion}
        onSkipQuestion={handleSkipQuestion}
        isPaused={isPaused}
        isWinnerDecided={Boolean(winner)}
        timerSecondsRemaining={timerRemaining}
      />

      {/* VICTORY CELEBRATION MODAL */}
      <VictoryModal
        winner={winner}
        redTeam={redTeam}
        blueTeam={blueTeam}
        ropePosition={ropePosition}
        totalAnswered={usedQuestionIds.length}
        onRematch={handleResetGame}
        onOpenTeacherHub={() => {
          handleResetGame();
          setIsTeacherHubOpen(true);
        }}
      />

      {/* TEACHER HUB MODAL */}
      <TeacherHubModal
        isOpen={isTeacherHubOpen}
        onClose={() => setIsTeacherHubOpen(false)}
        questions={questions}
        onUpdateQuestions={(newQuestions) => setQuestions(newQuestions)}
        onResetQuestionsToDefault={() => setQuestions(DEFAULT_QUESTIONS)}
        activeTeam={activeTeamSide}
        onSetActiveTeam={(team) => setActiveTeamSide(team)}
        redTeam={redTeam}
        blueTeam={blueTeam}
        winThreshold={settings.winThreshold}
        onUpdateWinThreshold={(val) => setSettings((s) => ({ ...s, winThreshold: val }))}
        settings={settings}
        onUpdateSettings={(newSettings) => setSettings((s) => ({ ...s, ...newSettings }))}
        onManualTug={(team, amount) => applyScoreAndTug(team, amount)}
        onRecenterRope={() => setRopePosition(0)}
        onHardResetMatch={handleResetGame}
      />

      {/* CAREERS STUDY GUIDE MODAL */}
      <StudyGuideModal
        isOpen={isStudyGuideOpen}
        onClose={() => setIsStudyGuideOpen(false)}
      />

      {/* FOOTER */}
      <footer className="mt-3.5 pt-2.5 pb-1 text-center border-t border-slate-800/80">
        <p className="text-sm sm:text-base font-semibold text-slate-200 tracking-wide">
          Nannestad High School - Barbara Anna Zielonka
        </p>
      </footer>

    </div>
  );
}
