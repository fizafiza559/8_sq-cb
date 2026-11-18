/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Lock,
  Unlock,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Scroll,
  ArrowRight,
  ArrowLeft,
  Grid,
  ChevronRight,
} from 'lucide-react';
import { lockers, divisors, toggleCount, isSquare } from '../math/facts';
import { Katex } from '../components/Katex';
import { useViewportTier } from '../hooks/useViewportTier';

export interface FactorPairsMorph36Props {
  beatIndex?: number;
  className?: string;
}

interface FactorPairOption {
  rows: number;
  cols: number;
  label: string;
  isSquarePair?: boolean;
}

const FACTOR_PAIR_OPTIONS_36: FactorPairOption[] = [
  { rows: 1, cols: 36, label: '1 × 36' },
  { rows: 2, cols: 18, label: '2 × 18' },
  { rows: 3, cols: 12, label: '3 × 12' },
  { rows: 4, cols: 9, label: '4 × 9' },
  { rows: 6, cols: 6, label: '6 × 6 (Square!)', isSquarePair: true },
];

export const FactorPairsMorph36: React.FC<FactorPairsMorph36Props> = ({
  beatIndex,
  className = '',
}) => {
  const { tier, isNarrow } = useViewportTier();
  const [selectedIdx, setSelectedIdx] = useState<number>(4);

  useEffect(() => {
    if (beatIndex === undefined) return;
    setSelectedIdx(beatIndex === 0 ? 3 : 4);
  }, [beatIndex]);

  const current = FACTOR_PAIR_OPTIONS_36[selectedIdx];

  // Viewport geometry for 36 smoothly positioned dots
  const canvasW = 680;
  const canvasH = 260;
  const padX = 28;
  const padY = 26;
  const availW = canvasW - padX * 2;
  const availH = canvasH - padY * 2;

  const stepX = Math.min(44, availW / Math.max(1, current.cols));
  const stepY = Math.min(36, availH / Math.max(1, current.rows));
  const dotRadius =
    current.cols >= 36 ? 6.5 : current.cols >= 18 ? 10 : current.cols >= 12 ? 12 : 14;

  const gridW = (current.cols - 1) * stepX;
  const gridH = (current.rows - 1) * stepY;
  const originX = (canvasW - gridW) / 2;
  const originY = (canvasH - gridH) / 2;

  const allFactors36 = divisors(36); // [1, 2, 3, 4, 6, 9, 12, 18, 36]
  const isCompactTier = tier === 'compact';
  const svgMaxH = isCompactTier ? '115px' : isNarrow ? '140px' : tier === 'standard' ? '185px' : '240px';

  return (
    <div
      data-no-nav="true"
      className={`w-full max-w-4xl h-full max-h-full min-h-0 overflow-hidden mx-auto rounded-3xl border border-slate-200/80 bg-white ${
        isCompactTier ? 'p-2 gap-1.5' : tier === 'standard' ? 'p-2.5 sm:p-3 gap-2' : 'p-3 sm:p-4 gap-2.5'
      } shadow-2xs flex flex-col justify-between ${className}`}
    >
      {/* Header */}
      <div className={`flex flex-wrap items-center justify-between gap-1.5 border-b border-slate-100 ${isCompactTier ? 'pb-1' : 'pb-2'} shrink-0`}>
        <div className="min-w-0">
          {!isCompactTier && (
            <span className="text-micro font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Grid className="w-3.5 h-3.5 text-orange-500 shrink-0" />
              <span>Why Square Numbers Have an Odd Factor Count</span>
            </span>
          )}
          <h3 className={`${isCompactTier ? 'text-small' : 'text-statement'} font-extrabold text-slate-900`}>
            Every rectangle pairs length with width. But when length equals width, the factor pairs with itself!
          </h3>
        </div>

        <span
          className="text-micro font-bold tabular-nums whitespace-nowrap"
          style={{
            color: current.isSquarePair ? '#C2410C' : '#1E40AF',
          }}
        >
          {current.rows} × {current.cols} = 36 tiles
        </span>
      </div>

      {/* Factor Pair Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 shrink-0">
        {FACTOR_PAIR_OPTIONS_36.map((opt, idx) => {
          const isActive = idx === selectedIdx;
          return (
            <button
              key={opt.label}
              type="button"
              onClick={() => setSelectedIdx(idx)}
              className={`${
                isCompactTier || isNarrow ? 'min-h-[40px] px-2.5 py-1 text-micro' : 'min-h-[44px] px-3 sm:px-4 py-1.5 text-micro sm:text-small'
              } rounded-xl font-bold border transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                isActive
                  ? opt.isSquarePair
                    ? 'bg-[#F27A00] text-white border-[#C2410C]'
                    : 'bg-[#005583] text-white border-[#003F62]'
                  : opt.isSquarePair
                  ? 'bg-orange-50/80 text-orange-800 border-orange-200 hover:bg-orange-100'
                  : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100'
              }`}
            >
              {opt.isSquarePair && <Sparkles className="w-3.5 h-3.5 shrink-0" />}
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>

      {/* Morphing Dot Grid Canvas */}
      <div
        className="w-full flex-1 min-h-0 rounded-2xl p-1.5 sm:p-2 flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-300"
        style={{
          backgroundColor: current.isSquarePair ? '#FFFBF5' : '#F8FAFC',
        }}
      >
        <svg
          viewBox={`0 0 ${canvasW} ${canvasH}`}
          className="w-full h-full select-none"
          style={{ maxHeight: svgMaxH }}
          aria-label={`36 dots arranged as ${current.rows} by ${current.cols}`}
        >
          {/* Subtle bounding box around current rectangle */}
          <rect
            x={originX - dotRadius - 8}
            y={originY - dotRadius - 8}
            width={gridW + (dotRadius + 8) * 2}
            height={gridH + (dotRadius + 8) * 2}
            rx={14}
            fill={current.isSquarePair ? 'rgba(242, 122, 0, 0.08)' : 'rgba(7, 136, 211, 0.05)'}
            stroke={current.isSquarePair ? '#F27A00' : '#93C5FD'}
            strokeWidth={current.isSquarePair ? 2.5 : 1.5}
            strokeDasharray={current.isSquarePair ? 'none' : '6 4'}
            style={{ transition: 'all 450ms cubic-bezier(0.22, 1, 0.36, 1)' }}
          />

          {Array.from({ length: 36 }, (_, idx) => {
            const r = Math.floor(idx / current.cols);
            const c = idx % current.cols;
            const cx = originX + c * stepX;
            const cy = originY + r * stepY;

            return (
              <g
                key={idx}
                style={{
                  transform: `translate(${cx}px, ${cy}px)`,
                  transition: `transform 480ms cubic-bezier(0.22, 1, 0.36, 1) ${(idx % 12) * 8}ms`,
                }}
              >
                <circle
                  cx={0}
                  cy={0}
                  r={dotRadius}
                  fill={current.isSquarePair ? '#F27A00' : '#0788D3'}
                  stroke={current.isSquarePair ? '#9A3412' : '#0369A1'}
                  strokeWidth={1.5}
                />
                {dotRadius >= 11 && (
                  <text
                    x={0}
                    y={3.5}
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize={9}
                    fontWeight={700}
                  >
                    {idx + 1}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Factor Partners & Lone 6x6 Explanation Badge */}
      <div className={`grid ${isCompactTier || isNarrow ? 'grid-cols-1 gap-1.5' : 'grid-cols-1 md:grid-cols-2 gap-2.5'} items-stretch border-t border-slate-100 pt-2 shrink-0`}>
        {/* All 9 Factors of 36 Strip */}
        {!isCompactTier && (
          <div className="p-2 sm:p-2.5 rounded-2xl bg-slate-50/80 flex flex-col gap-1.5 justify-center">
            <span className="text-micro font-bold uppercase tracking-wider text-slate-500">
              All Factors of 36 ({allFactors36.length} total — Odd Count)
            </span>
            <div className="flex flex-wrap items-center gap-1">
              {allFactors36.map((f) => {
                const isSelectedFactor = f === current.rows || f === current.cols;
                const isLoneSix = f === 6;
                return (
                  <span
                    key={f}
                    className={`px-2 py-0.5 rounded-lg font-mono text-micro sm:text-small font-bold border transition-all tabular-nums ${
                      isLoneSix && current.isSquarePair
                        ? 'bg-[#F27A00] text-white border-[#C2410C]'
                        : isSelectedFactor
                        ? 'bg-[#005583] text-white border-[#003F62]'
                        : isLoneSix
                        ? 'bg-orange-100 text-orange-900 border-orange-300'
                        : 'bg-white text-slate-700 border-slate-200/80'
                    }`}
                  >
                    {f}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Dynamic Insight Badge */}
        <div
          className={`${isCompactTier ? 'p-2' : 'p-2.5 sm:p-3'} rounded-2xl border flex flex-col justify-center gap-1 transition-all ${
            current.isSquarePair
              ? 'bg-orange-50/75 border-orange-200/90 text-orange-950'
              : 'bg-sky-50/60 border-sky-200/80 text-blue-950'
          }`}
        >
          {current.isSquarePair ? (
            <>
              <div className="flex items-center gap-1.5 font-extrabold text-micro sm:text-small text-orange-900">
                <Sparkles className="w-3.5 h-3.5 text-[#F27A00] shrink-0" />
                <span>The Lone Partner! 6 pairs with 6. No new partner is added, leaving 9 factors in total. That 9th flip leaves Locker 36 OPEN.</span>
              </div>
              <p className="text-micro sm:text-small leading-snug text-orange-950">
                6 pairs with itself! No distinct partner → <strong>ODD factors</strong>. Locker #36 stays OPEN!
              </p>
            </>
          ) : (
            <>
              <div className="font-extrabold text-micro sm:text-small text-blue-900 flex items-center gap-2">
                <Katex latex={`${current.rows} \\times ${current.cols} = 36`} displayMode={false} />
                <span>gives 2 distinct partners</span>
              </div>
              <p className="text-micro sm:text-small leading-snug text-slate-700">
                Both <strong>{current.rows}</strong> and <strong>{current.cols}</strong> flip Locker #36 and cancel out. Tap <strong>6 × 6</strong>!
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

interface LockerStorySectionProps {
  subTabId: 'locker-story' | 'factor-pairs';
  stepIndex: number;
  onAdvanceStep?: () => void;
}

interface DialogueTurn {
  speaker: string;
  role: 'narrator' | 'queen' | 'prince' | 'relative';
  line: string;
}

const STEP1_DIALOGUE: DialogueTurn[] = [
  {
    speaker: 'Storyteller',
    role: 'narrator',
    line: 'Queen Ratnamanjuri loved clever puzzles. In the palace hallway sat 100 closed wooden lockers.',
  },
  {
    speaker: 'Queen Ratnamanjuri',
    role: 'queen',
    line: '“I have a puzzle for all 100 of you. Whoever predicts which lockers stay open solves the mystery!”',
  },
  {
    speaker: 'Khoisnam',
    role: 'prince',
    line: '“100 lockers? How do the doors open, Mother?”',
  },
  {
    speaker: 'Queen Ratnamanjuri',
    role: 'queen',
    line: '“One by one, 100 people will walk down the hall. Watch what happens when they touch the doors.”',
  },
];

const STEP2_DIALOGUE: DialogueTurn[] = [
  {
    speaker: 'Khoisnam',
    role: 'prince',
    line: '“Wait—every single locker starts closed?”',
  },
  {
    speaker: 'Queen Ratnamanjuri',
    role: 'queen',
    line: '“Yes! Person 1 runs past and opens every locker door. All 100 swing open.”',
  },
  {
    speaker: 'Relative',
    role: 'relative',
    line: '“Then Person 2 changes every 2nd locker (2, 4, 6... closing them). And Person 3 changes every 3rd?”',
  },
  {
    speaker: 'Queen Ratnamanjuri',
    role: 'queen',
    line: '“Exactly. Each visit flips the door: open becomes closed, closed becomes open. All the way to Person 100.”',
  },
  {
    speaker: 'Khoisnam',
    role: 'prince',
    line: '“Every factor flips the lock! If a door gets an even number of flips, it shuts. So which ones stay open?”',
  },
];

const HEADING_FONT = "'Cinzel', Georgia, serif";
const BODY_FONT = "'Cormorant Garamond', Georgia, serif";

const PARCHMENT_PALETTE = {
  ink: '#3B2A1A',
  inkSoft: '#5E4630',
  inkMuted: '#7A5F43',
  paperBorder: '#C7A977',
  gold: '#B8862B',
  goldDark: '#7C5610',
  sealRed: '#8B2E1F',
  woodClosedTop: '#5E4836',
  woodClosedBottom: '#433224',
  woodClosedBorder: '#2C2016',
  woodOpenTop: '#F6E9CE',
  woodOpenBottom: '#E0C69A',
  woodOpenBorder: '#8D6738',
};

const PARCHMENT_SURFACE: React.CSSProperties = {
  background: 'linear-gradient(148deg, #FBF2E1 0%, #F1DFBE 56%, #E7CDA0 100%)',
  borderColor: PARCHMENT_PALETTE.paperBorder,
  boxShadow: 'inset 0 0 28px rgba(132, 92, 38, 0.09), 0 4px 16px rgba(59, 42, 26, 0.08)',
  color: PARCHMENT_PALETTE.ink,
  fontFamily: BODY_FONT,
};

const INSET_PARCHMENT: React.CSSProperties = {
  background: 'rgba(255, 250, 240, 0.62)',
  borderColor: '#D2B88C',
  color: PARCHMENT_PALETTE.ink,
};

export const LockerStorySection: React.FC<LockerStorySectionProps> = ({
  subTabId: _subTabId,
  stepIndex,
  onAdvanceStep,
}) => {
  const { tier, stageH, stageW, isNarrow } = useViewportTier();

  // Strictly synced to stepIndex: 0 = Queen's Decree, 1 = Secret Vault, 2 = Royal Walk
  const [panelIndex, setPanelIndex] = useState<number>(() => Math.min(2, Math.max(0, stepIndex)));

  // Tap-induced dialogue reveal counts for Steps 1 and 2
  const [decreeTurn, setDecreeTurn] = useState<number>(1);
  const [decreeFocusIdx, setDecreeFocusIdx] = useState<number>(0);
  const [vaultTurn, setVaultTurn] = useState<number>(1);
  const [vaultFocusIdx, setVaultFocusIdx] = useState<number>(0);

  // Separate pages in Step 3: 'walk' (Try the Walk) | 'solution' (The Solution)
  const [step3Page, setStep3Page] = useState<'walk' | 'solution'>('walk');

  // Royal Walk simulation state (starts paused at 0)
  const [currentPerson, setCurrentPerson] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [inspectedLocker, setInspectedLocker] = useState<number>(36);
  const [solutionStep, setSolutionStep] = useState<number>(1);

  const playTimerRef = useRef<number | null>(null);

  // Sync panelIndex strictly from stepIndex prop without jumping currentPerson
  useEffect(() => {
    if (stepIndex >= 0 && stepIndex <= 2) {
      setPanelIndex(stepIndex);
      if (stepIndex !== 2) {
        setIsPlaying(false);
      }
    }
  }, [stepIndex]);

  useEffect(() => {
    if (isPlaying) {
      const intervalMs = Math.max(80, Math.floor(400 / playbackSpeed));
      playTimerRef.current = window.setInterval(() => {
        setCurrentPerson((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 1;
        });
      }, intervalMs);
    } else if (playTimerRef.current !== null) {
      clearInterval(playTimerRef.current);
      playTimerRef.current = null;
    }
    return () => {
      if (playTimerRef.current !== null) {
        clearInterval(playTimerRef.current);
      }
    };
  }, [isPlaying, playbackSpeed]);

  const lockerStates = lockers(currentPerson, 100);
  const openCount = lockerStates.filter(Boolean).length;
  const touchedByCurrent =
    currentPerson > 0
      ? Array.from({ length: 100 }, (_, i) => i + 1).filter((num) => num % currentPerson === 0)
      : [];

  const inspectedFlipCount = toggleCount(inspectedLocker);
  const inspectedDivisors = divisors(inspectedLocker);
  const inspectedIsSquare = isSquare(inspectedLocker);
  const inspectedEndsOpen = inspectedFlipCount % 2 === 1;
  const inspectedRoot = Math.round(Math.sqrt(inspectedLocker));

  const isLandscapeCompact = tier === 'compact' && stageW >= 540;
  const useThreeColWalk =
    step3Page === 'walk' && (isLandscapeCompact || (tier !== 'compact' && stageW >= 820));
  const gridGapPx = tier === 'compact' || isNarrow ? 2 : 4;
  const chromeReserveH =
    step3Page === 'walk'
      ? useThreeColWalk
        ? isLandscapeCompact
          ? 86
          : 152
        : tier === 'compact'
        ? 210
        : isNarrow
        ? 270
        : 285
      : isNarrow || tier === 'compact'
      ? 295
      : 265;
  const availGridH = Math.max(135, stageH - chromeReserveH);
  const effStageW = Math.min(1152, stageW - 24);
  const availGridW = useThreeColWalk
    ? Math.max(
        160,
        Math.min(
          580,
          effStageW - (isLandscapeCompact ? 380 : stageW >= 1220 ? 556 : 458)
        )
      )
    : step3Page === 'solution' && !isNarrow
    ? Math.min(440, effStageW * 0.52 - 44)
    : Math.min(500, stageW - 44);
  const maxCellPx = useThreeColWalk ? 54 : 46;
  const cellSize = Math.max(
    14,
    Math.min(maxCellPx, Math.floor((Math.min(availGridW, availGridH) - 9 * gridGapPx) / 10))
  );
  const gridMaxW = cellSize * 10 + 9 * gridGapPx;
  const cellFontSize = `${Math.max(10, Math.round(cellSize * 0.66))}px`;

  const renderDialogueCard = (
    turns: DialogueTurn[],
    visibleCount: number,
    focusedIdx: number,
    onSelectFocus: (idx: number) => void,
    onNextTurn: () => void,
    onShowAll: () => void
  ) => {
    const hasMore = visibleCount < turns.length;
    const isCondensedDialogue = tier === 'compact' || isNarrow;
    const safeFocusIdx = Math.min(Math.max(0, focusedIdx), visibleCount - 1);

    const renderBubble = (item: DialogueTurn, idx: number) => {
      const isQueen = item.role === 'queen';
      const isNarrator = item.role === 'narrator';
      return (
        <div
          key={idx}
          className={`rounded-xl border ${
            tier === 'compact' ? 'px-2.5 py-1.5' : tier === 'standard' ? 'px-2.5 py-1.5 sm:px-3 sm:py-2' : 'px-3 py-2'
          } animate-fade-rise`}
          style={{
            background: isQueen
              ? 'linear-gradient(135deg, rgba(184, 134, 43, 0.16), rgba(251, 242, 225, 0.9))'
              : isNarrator
              ? 'rgba(235, 217, 186, 0.45)'
              : 'rgba(255, 252, 245, 0.75)',
            borderColor: isQueen ? PARCHMENT_PALETTE.gold : '#D5BD94',
          }}
        >
          <div
            className={`${tier === 'compact' ? 'text-[11px]' : 'text-[12px] sm:text-[13px]'} font-bold tracking-wide`}
            style={{
              fontFamily: HEADING_FONT,
              color: isQueen ? PARCHMENT_PALETTE.goldDark : PARCHMENT_PALETTE.sealRed,
            }}
          >
            {item.speaker}
          </div>
          <p
            className={`${
              tier === 'compact'
                ? 'text-[15px]'
                : tier === 'standard'
                ? 'text-[15px] sm:text-[16px]'
                : 'text-[16px] sm:text-[18px]'
            } leading-snug mt-0.5 font-semibold`}
            style={{
              fontFamily: BODY_FONT,
              color: PARCHMENT_PALETTE.ink,
              fontStyle: isQueen ? 'italic' : 'normal',
            }}
          >
            {item.line}
          </p>
        </div>
      );
    };

    return (
      <div
        role={hasMore ? 'button' : undefined}
        tabIndex={hasMore ? 0 : undefined}
        onClick={() => {
          if (!hasMore) return;
          const sel = window.getSelection()?.toString();
          if (sel && sel.length > 0) return;
          onNextTurn();
        }}
        onKeyDown={(e) => {
          if (hasMore && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onNextTurn();
          }
        }}
        className={`flex flex-col ${tier === 'compact' ? 'gap-1.5 p-2.5' : 'gap-2 p-3 sm:p-3.5'} rounded-2xl border transition-colors min-h-0 overflow-hidden ${
          hasMore ? 'cursor-pointer' : ''
        }`}
        style={INSET_PARCHMENT}
      >
        <div className="flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="text-[13px] font-semibold tabular-nums"
              style={{ color: PARCHMENT_PALETTE.inkMuted, fontFamily: BODY_FONT }}
            >
              Dialogue · {visibleCount} of {turns.length}
            </span>
            {isCondensedDialogue && visibleCount > 1 && (
              <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                {turns.slice(0, visibleCount).map((_, tIdx) => (
                  <button
                    key={tIdx}
                    type="button"
                    onClick={() => onSelectFocus(tIdx)}
                    aria-label={`View turn ${tIdx + 1}`}
                    className="min-w-[28px] min-h-[28px] px-1.5 rounded-md text-[12px] font-bold border cursor-pointer tabular-nums"
                    style={{
                      backgroundColor:
                        safeFocusIdx === tIdx ? PARCHMENT_PALETTE.goldDark : 'rgba(255,250,240,0.9)',
                      color: safeFocusIdx === tIdx ? '#FFF9EE' : PARCHMENT_PALETTE.ink,
                      borderColor: PARCHMENT_PALETTE.paperBorder,
                      fontFamily: HEADING_FONT,
                    }}
                  >
                    {tIdx + 1}
                  </button>
                ))}
              </div>
            )}
          </div>

          {hasMore && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onShowAll();
              }}
              className={`${
                tier === 'compact' ? 'min-h-[36px]' : 'min-h-[40px]'
              } px-2.5 py-1 rounded-lg text-[13px] font-bold underline underline-offset-2 cursor-pointer`}
              style={{ color: PARCHMENT_PALETTE.sealRed, fontFamily: BODY_FONT }}
            >
              Show all
            </button>
          )}
        </div>

        <div className="flex flex-col gap-1.5 min-h-0 overflow-hidden">
          {isCondensedDialogue
            ? renderBubble(turns[safeFocusIdx], safeFocusIdx)
            : turns.slice(0, visibleCount).map((item, idx) => renderBubble(item, idx))}
        </div>

        {hasMore && (
          <div
            className="text-[14px] font-bold text-center pt-0.5 animate-pulse shrink-0"
            style={{ color: PARCHMENT_PALETTE.sealRed, fontFamily: BODY_FONT }}
          >
            Tap dialogue to continue ({visibleCount} of {turns.length})
          </div>
        )}
      </div>
    );
  };

  const renderWoodenLockerGrid = () => (
    <div className="w-full flex flex-col items-center gap-1.5 shrink-0">
      <div
        className="grid grid-cols-10 w-full"
        style={{
          maxWidth: `${gridMaxW}px`,
          gap: `${gridGapPx}px`,
        }}
      >
        {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => {
          const isOpen = lockerStates[num - 1];
          const isTouched = touchedByCurrent.includes(num);
          const isSq = isSquare(num);
          const isInspected = inspectedLocker === num;
          const isGoldSquare = isOpen && isSq && currentPerson === 100;

          let doorStyle: React.CSSProperties;
          if (isGoldSquare) {
            doorStyle = {
              background: 'linear-gradient(145deg, #E5BC58 0%, #B8862B 100%)',
              borderColor: PARCHMENT_PALETTE.goldDark,
              color: '#2A1A08',
            };
          } else if (isOpen) {
            doorStyle = {
              background: `linear-gradient(150deg, ${PARCHMENT_PALETTE.woodOpenTop} 0%, ${PARCHMENT_PALETTE.woodOpenBottom} 100%)`,
              borderColor: PARCHMENT_PALETTE.woodOpenBorder,
              color: PARCHMENT_PALETTE.ink,
            };
          } else {
            doorStyle = {
              background: `linear-gradient(155deg, ${PARCHMENT_PALETTE.woodClosedTop} 0%, ${PARCHMENT_PALETTE.woodClosedBottom} 100%)`,
              borderColor: PARCHMENT_PALETTE.woodClosedBorder,
              color: '#EFE3CE',
            };
          }

          let boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.14)';
          if (isTouched && isInspected) {
            boxShadow = `0 0 0 2px ${PARCHMENT_PALETTE.sealRed}, 0 0 0 4px ${PARCHMENT_PALETTE.ink}`;
          } else if (isTouched) {
            boxShadow = `0 0 0 2px ${PARCHMENT_PALETTE.sealRed}`;
          } else if (isInspected) {
            boxShadow = `0 0 0 2px ${PARCHMENT_PALETTE.ink}`;
          }

          return (
            <button
              key={num}
              type="button"
              onClick={() => setInspectedLocker(num)}
              aria-label={`Locker ${num}: ${isOpen ? 'open' : 'closed'}${isSq ? ', perfect square' : ''}`}
              className="relative aspect-square rounded-md border flex flex-col items-center justify-center font-bold transition-transform cursor-pointer tabular-nums overflow-hidden"
              style={{
                ...doorStyle,
                boxShadow,
                fontSize: cellFontSize,
                transform: isTouched ? 'scale(1.04)' : undefined,
              }}
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[2px] opacity-60"
                style={{
                  backgroundColor: isOpen ? '#8C6738' : '#231910',
                }}
              />
              {isOpen && (
                <span
                  aria-hidden="true"
                  className="absolute left-0 inset-y-0 w-[3px]"
                  style={{
                    backgroundColor: isGoldSquare ? '#6E4B0D' : '#6A4E31',
                  }}
                />
              )}
              <span className="leading-none relative z-10 font-black">{num}</span>
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div
        className={`flex flex-wrap items-center justify-center ${
          tier === 'compact' ? 'gap-x-2.5 gap-y-0.5 text-[12px]' : 'gap-x-3.5 gap-y-1 text-[13px] sm:text-[14px]'
        } font-semibold`}
        style={{ color: PARCHMENT_PALETTE.inkSoft, fontFamily: BODY_FONT }}
      >
        <div className="flex items-center gap-1">
          <span
            className="w-3 h-3 rounded-sm border inline-block"
            style={{
              backgroundColor: PARCHMENT_PALETTE.gold,
              borderColor: PARCHMENT_PALETTE.goldDark,
            }}
          />
          <span style={{ color: PARCHMENT_PALETTE.ink }}>Squares (at 100)</span>
        </div>
        <div className="flex items-center gap-1">
          <span
            className="w-3 h-3 rounded-sm border inline-block"
            style={{
              backgroundColor: PARCHMENT_PALETTE.woodOpenTop,
              borderColor: PARCHMENT_PALETTE.woodOpenBorder,
            }}
          />
          <span>Open</span>
        </div>
        <div className="flex items-center gap-1">
          <span
            className="w-3 h-3 rounded-sm border inline-block"
            style={{
              backgroundColor: PARCHMENT_PALETTE.woodClosedTop,
              borderColor: PARCHMENT_PALETTE.woodClosedBorder,
            }}
          />
          <span>Closed</span>
        </div>
        {touchedByCurrent.length > 0 && tier !== 'compact' && (
          <div className="flex items-center gap-1">
            <span
              className="w-3 h-3 rounded-sm inline-block"
              style={{
                boxShadow: `0 0 0 2px ${PARCHMENT_PALETTE.sealRed}`,
              }}
            />
            <span style={{ color: PARCHMENT_PALETTE.sealRed }}>P{currentPerson}</span>
          </div>
        )}
      </div>
    </div>
  );

  const renderWalkControls = (isSidePanel = false) => {
    const isCompactBar = tier === 'compact' || isNarrow || isSidePanel;
    return (
      <div className={`flex flex-col ${tier === 'compact' ? 'gap-1' : 'gap-1.5'} shrink-0`}>
        {/* Control Bar */}
        <div
          className={`flex flex-wrap items-center justify-between gap-1.5 border-b ${
            tier === 'compact' ? 'pb-1' : 'pb-1.5'
          }`}
          style={{ borderColor: '#D6BE93' }}
        >
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() => {
                if (currentPerson >= 100 && !isPlaying) {
                  setCurrentPerson(0);
                }
                setIsPlaying((p) => !p);
              }}
              className={`${
                tier === 'compact' ? 'min-h-[40px] px-3 py-1 text-[13px]' : 'min-h-[44px] px-3.5 py-1.5 text-[14px]'
              } rounded-xl font-bold flex items-center gap-1.5 cursor-pointer transition-opacity hover:opacity-90 whitespace-nowrap shrink-0`}
              style={{
                backgroundColor: isPlaying ? PARCHMENT_PALETTE.sealRed : PARCHMENT_PALETTE.goldDark,
                color: '#FFF9EE',
                fontFamily: HEADING_FONT,
              }}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause' : tier === 'compact' ? 'Play' : 'Play Walk'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsPlaying(false);
                setCurrentPerson(0);
              }}
              className={`${
                tier === 'compact' ? 'min-h-[40px] min-w-[40px]' : 'min-h-[44px] min-w-[44px]'
              } rounded-xl border flex items-center justify-center cursor-pointer transition-colors shrink-0`}
              style={{
                backgroundColor: 'rgba(255, 250, 240, 0.8)',
                borderColor: PARCHMENT_PALETTE.paperBorder,
                color: PARCHMENT_PALETTE.ink,
              }}
              aria-label="Reset walk to 0"
              title="Reset to 0"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {tier !== 'compact' && !isNarrow && (
              <div
                className="flex items-center gap-0.5 p-0.5 rounded-xl border"
                style={{
                  backgroundColor: 'rgba(227, 204, 165, 0.5)',
                  borderColor: '#CEB282',
                }}
              >
                {[1, 2, 5].map((spd) => {
                  const active = playbackSpeed === spd;
                  return (
                    <button
                      key={spd}
                      type="button"
                      onClick={() => setPlaybackSpeed(spd)}
                      className="min-h-[38px] min-w-[38px] px-2 py-0.5 rounded-lg text-[13px] font-bold cursor-pointer tabular-nums transition-colors"
                      style={{
                        backgroundColor: active ? PARCHMENT_PALETTE.ink : 'transparent',
                        color: active ? '#FFF9EE' : PARCHMENT_PALETTE.inkSoft,
                        fontFamily: BODY_FONT,
                      }}
                    >
                      {spd}x
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Walker Status Counter */}
          <div
            className="px-2.5 py-1 rounded-xl border flex items-center gap-1.5 tabular-nums text-[13px] sm:text-[14px]"
            style={{
              backgroundColor: 'rgba(255, 250, 240, 0.78)',
              borderColor: PARCHMENT_PALETTE.paperBorder,
            }}
          >
            <span className="font-bold" style={{ color: PARCHMENT_PALETTE.ink, fontFamily: HEADING_FONT }}>
              {tier === 'compact' ? `P${currentPerson}` : currentPerson === 0 ? 'Walker 0' : `P${currentPerson}/100`}
            </span>
            <span style={{ color: PARCHMENT_PALETTE.paperBorder }} aria-hidden="true">
              ·
            </span>
            <span className="font-bold" style={{ color: PARCHMENT_PALETTE.goldDark, fontFamily: BODY_FONT }}>
              {openCount} Open
            </span>
          </div>
        </div>

        {/* Single 0-100 Scrubber Directly Above Grid */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span
              className="text-[13px] font-bold tabular-nums shrink-0"
              style={{ color: PARCHMENT_PALETTE.inkSoft, fontFamily: BODY_FONT }}
            >
              0
            </span>
            <input
              type="range"
              min={0}
              max={100}
              value={currentPerson}
              onChange={(e) => {
                setIsPlaying(false);
                setCurrentPerson(parseInt(e.target.value, 10));
              }}
              aria-label="Select walker number 0 to 100"
              className="flex-1 cursor-pointer h-2.5 rounded-lg"
              style={{ accentColor: PARCHMENT_PALETTE.sealRed }}
            />
            <span
              className="text-[13px] font-bold tabular-nums shrink-0"
              style={{ color: PARCHMENT_PALETTE.inkSoft, fontFamily: BODY_FONT }}
            >
              100
            </span>
          </div>

          {/* Presets: hidden on compact, 3 on standard/narrow/side, full on spacious */}
          {tier !== 'compact' && (
            <div className="flex flex-wrap items-center justify-center gap-1">
              {(tier === 'spacious' && !isCompactBar
                ? [
                    { label: '0 (Reset)', val: 0 },
                    { label: '1 (Open All)', val: 1 },
                    { label: '2 (Evens)', val: 2 },
                    { label: 'Person 3', val: 3 },
                    { label: 'Person 4', val: 4 },
                    { label: 'Person 10', val: 10 },
                    { label: 'All 100 (Final)', val: 100 },
                  ]
                : [
                    { label: '0 (Reset)', val: 0 },
                    { label: 'Person 10', val: 10 },
                    { label: '100 (Final)', val: 100 },
                  ]
              ).map((preset) => {
                const isSelected = currentPerson === preset.val;
                return (
                  <button
                    key={preset.val}
                    type="button"
                    onClick={() => {
                      setIsPlaying(false);
                      setCurrentPerson(preset.val);
                    }}
                    className="min-h-[36px] px-2.5 py-1 rounded-xl text-[13px] font-bold border cursor-pointer transition-colors whitespace-nowrap tabular-nums"
                    style={{
                      backgroundColor: isSelected
                        ? PARCHMENT_PALETTE.sealRed
                        : 'rgba(255, 250, 240, 0.72)',
                      borderColor: isSelected
                        ? PARCHMENT_PALETTE.sealRed
                        : PARCHMENT_PALETTE.paperBorder,
                      color: isSelected ? '#FFF9EE' : PARCHMENT_PALETTE.ink,
                      fontFamily: BODY_FONT,
                    }}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderSidebarWalkControls = () => (
    <div
      className={`h-full min-h-0 rounded-2xl border ${
        isLandscapeCompact ? 'p-2 gap-1.5' : 'p-3 gap-2.5'
      } flex flex-col justify-between overflow-hidden`}
      style={INSET_PARCHMENT}
    >
      <div className={`flex flex-col ${isLandscapeCompact ? 'gap-1.5' : 'gap-2.5'}`}>
        {/* Status Header */}
        <div
          className={`flex items-center justify-between gap-1.5 border-b ${
            isLandscapeCompact ? 'pb-1' : 'pb-2'
          }`}
          style={{ borderColor: '#D6BE93' }}
        >
          <span
            className={`${isLandscapeCompact ? 'text-[12px]' : 'text-[14px]'} font-bold tabular-nums`}
            style={{ color: PARCHMENT_PALETTE.ink, fontFamily: HEADING_FONT }}
          >
            {isLandscapeCompact ? `P${currentPerson}/100` : currentPerson === 0 ? 'Walker 0' : `Person ${currentPerson}/100`}
          </span>
          <span
            className={`px-2 py-0.5 rounded-lg font-bold tabular-nums ${
              isLandscapeCompact ? 'text-[11px]' : 'text-[13px]'
            }`}
            style={{
              backgroundColor: 'rgba(184, 134, 43, 0.16)',
              color: PARCHMENT_PALETTE.goldDark,
              fontFamily: BODY_FONT,
            }}
          >
            {openCount} Open
          </span>
        </div>

        {/* Play / Pause + Reset */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => {
              if (currentPerson >= 100 && !isPlaying) {
                setCurrentPerson(0);
              }
              setIsPlaying((p) => !p);
            }}
            className={`flex-1 ${
              isLandscapeCompact ? 'min-h-[36px] px-2 py-1 text-[12px]' : 'min-h-[44px] px-3 py-1.5 text-[14px]'
            } rounded-xl font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-opacity hover:opacity-90 whitespace-nowrap`}
            style={{
              backgroundColor: isPlaying ? PARCHMENT_PALETTE.sealRed : PARCHMENT_PALETTE.goldDark,
              color: '#FFF9EE',
              fontFamily: HEADING_FONT,
            }}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 shrink-0" /> : <Play className="w-3.5 h-3.5 shrink-0" />}
            <span>{isPlaying ? 'Pause' : isLandscapeCompact ? 'Play' : 'Play Walk'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setIsPlaying(false);
              setCurrentPerson(0);
            }}
            className={`${
              isLandscapeCompact ? 'min-h-[36px] min-w-[36px]' : 'min-h-[44px] min-w-[44px]'
            } rounded-xl border flex items-center justify-center cursor-pointer transition-colors shrink-0`}
            style={{
              backgroundColor: 'rgba(255, 250, 240, 0.9)',
              borderColor: PARCHMENT_PALETTE.paperBorder,
              color: PARCHMENT_PALETTE.ink,
            }}
            aria-label="Reset walk to 0"
            title="Reset to 0"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Speed Selector */}
        {!isLandscapeCompact && (
          <div className="flex flex-col gap-1">
            <span
              className="text-[12px] font-bold uppercase tracking-wider"
              style={{ color: PARCHMENT_PALETTE.inkMuted, fontFamily: HEADING_FONT }}
            >
              Walk Speed
            </span>
            <div
              className="grid grid-cols-3 gap-1 p-0.5 rounded-xl border"
              style={{
                backgroundColor: 'rgba(227, 204, 165, 0.5)',
                borderColor: '#CEB282',
              }}
            >
              {[1, 2, 5].map((spd) => {
                const active = playbackSpeed === spd;
                return (
                  <button
                    key={spd}
                    type="button"
                    onClick={() => setPlaybackSpeed(spd)}
                    className="min-h-[36px] px-2 py-0.5 rounded-lg text-[13px] font-bold cursor-pointer tabular-nums transition-colors"
                    style={{
                      backgroundColor: active ? PARCHMENT_PALETTE.ink : 'transparent',
                      color: active ? '#FFF9EE' : PARCHMENT_PALETTE.inkSoft,
                      fontFamily: BODY_FONT,
                    }}
                  >
                    {spd}x
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 0-100 Walker Scrubber */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between text-[12px] font-bold tabular-nums">
            <span style={{ color: PARCHMENT_PALETTE.inkMuted, fontFamily: HEADING_FONT }}>
              {isLandscapeCompact ? 'Walker' : 'Scrub Walker'}
            </span>
            <span style={{ color: PARCHMENT_PALETTE.sealRed }}>{currentPerson} / 100</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="text-[12px] font-bold tabular-nums shrink-0"
              style={{ color: PARCHMENT_PALETTE.inkSoft, fontFamily: BODY_FONT }}
            >
              0
            </span>
            <input
              type="range"
              min={0}
              max={100}
              value={currentPerson}
              onChange={(e) => {
                setIsPlaying(false);
                setCurrentPerson(parseInt(e.target.value, 10));
              }}
              aria-label="Select walker number 0 to 100"
              className="flex-1 min-w-0 cursor-pointer h-2.5 rounded-lg"
              style={{ accentColor: PARCHMENT_PALETTE.sealRed }}
            />
            <span
              className="text-[12px] font-bold tabular-nums shrink-0"
              style={{ color: PARCHMENT_PALETTE.inkSoft, fontFamily: BODY_FONT }}
            >
              100
            </span>
          </div>
        </div>
      </div>

      {/* Quick Presets */}
      <div className="flex flex-col gap-1 shrink-0">
        {!isLandscapeCompact && (
          <span
            className="text-[12px] font-bold uppercase tracking-wider"
            style={{ color: PARCHMENT_PALETTE.inkMuted, fontFamily: HEADING_FONT }}
          >
            Jump To Walker
          </span>
        )}
        <div className={`grid ${isLandscapeCompact ? 'grid-cols-3 gap-1' : 'grid-cols-2 gap-1.5'}`}>
          {(isLandscapeCompact
            ? [
                { label: '0', val: 0 },
                { label: 'P10', val: 10 },
                { label: '100', val: 100 },
              ]
            : [
                { label: '0 (Reset)', val: 0 },
                { label: '1 (All Open)', val: 1 },
                { label: '2 (Evens)', val: 2 },
                { label: 'Person 3', val: 3 },
                { label: 'Person 10', val: 10 },
                { label: '100 (Final)', val: 100 },
              ]
          ).map((preset) => {
            const isSelected = currentPerson === preset.val;
            return (
              <button
                key={preset.val}
                type="button"
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentPerson(preset.val);
                }}
                className={`${
                  isLandscapeCompact ? 'min-h-[30px] px-1.5 text-[11px]' : 'min-h-[36px] px-2 py-1 text-[12px]'
                } rounded-xl font-bold border cursor-pointer transition-colors whitespace-nowrap tabular-nums`}
                style={{
                  backgroundColor: isSelected
                    ? PARCHMENT_PALETTE.sealRed
                    : 'rgba(255, 250, 240, 0.78)',
                  borderColor: isSelected ? PARCHMENT_PALETTE.sealRed : PARCHMENT_PALETTE.paperBorder,
                  color: isSelected ? '#FFF9EE' : PARCHMENT_PALETTE.ink,
                  fontFamily: BODY_FONT,
                }}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  const storyHorizontal = !isNarrow || isLandscapeCompact;

  return (
    <div
      data-no-nav="true"
      className={`w-full ${
        panelIndex === 2 ? 'max-w-6xl' : 'max-w-4xl'
      } h-full max-h-full min-h-0 overflow-hidden mx-auto flex flex-col justify-center gap-1.5 sm:gap-2 animate-fade-rise`}
      style={{
        fontFamily: BODY_FONT,
        color: PARCHMENT_PALETTE.ink,
      }}
    >
      {/* ================================================================= */}
      {/* STEP 1: THE QUEEN'S DECREE (STORY + TAP DIALOGUE ONLY)            */}
      {/* ================================================================= */}
      {panelIndex === 0 && (
        <div
          className={`w-full max-h-full min-h-0 rounded-3xl border overflow-hidden flex ${
            storyHorizontal ? 'flex-row' : 'flex-col'
          } animate-fade-rise`}
          style={PARCHMENT_SURFACE}
        >
          {/* Left: Queen Court Image */}
          <div
            className={`${
              storyHorizontal
                ? 'w-5/12 h-auto min-h-0'
                : tier === 'compact'
                ? 'h-[82px] shrink-0'
                : 'h-[125px] sm:h-[155px] shrink-0'
            } relative overflow-hidden`}
            style={{ backgroundColor: '#2E2014' }}
          >
            <img
              src="/assets/aistudio/Gemini_Generated_Image_j5vt77j5vt77j5vt__1__8ec11c4a.png"
              alt="Queen Ratnamanjuri reading her royal decree to Khoisnam and relatives"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to top, rgba(32, 20, 11, 0.9) 0%, rgba(32, 20, 11, 0.25) 55%, transparent 100%)',
              }}
            />
            <div className="absolute bottom-2 left-3 right-3 text-[#FAF1DF]">
              {tier !== 'compact' && !isNarrow && (
                <div
                  className="text-[12px] font-bold tracking-wider"
                  style={{ fontFamily: HEADING_FONT, color: '#E8C57B' }}
                >
                  Palace of Ratnas
                </div>
              )}
              <p className="text-[13px] sm:text-[15px] font-semibold leading-snug">
                Queen Ratnamanjuri gathers her 100 children and relatives.
              </p>
            </div>
          </div>

          {/* Right: Tap-Induced Royal Dialogue & Single CTA */}
          <div
            className={`flex-1 min-h-0 ${
              tier === 'compact' ? 'p-2.5 gap-1.5' : 'p-3 sm:p-4 gap-2.5'
            } flex flex-col justify-between overflow-hidden`}
          >
            <div className={`flex flex-col ${tier === 'compact' ? 'gap-1' : 'gap-2'} min-h-0 overflow-hidden`}>
              <div className="flex items-center gap-2 shrink-0" style={{ color: PARCHMENT_PALETTE.goldDark }}>
                <Scroll className="w-4 h-4 shrink-0" />
                <span className="text-[12px] sm:text-[13px] font-bold tracking-wide" style={{ fontFamily: HEADING_FONT }}>
                  Chapter 1 · The Queen&apos;s Decree
                </span>
              </div>

              <h2
                className={`${
                  tier === 'compact' ? 'text-[17px]' : 'text-[20px] sm:text-[24px]'
                } font-bold leading-tight shrink-0`}
                style={{ fontFamily: HEADING_FONT, color: PARCHMENT_PALETTE.ink }}
              >
                The Royal Puzzle of 100 Lockers
              </h2>

              {renderDialogueCard(
                STEP1_DIALOGUE,
                decreeTurn,
                decreeFocusIdx,
                setDecreeFocusIdx,
                () => {
                  const next = Math.min(STEP1_DIALOGUE.length, decreeTurn + 1);
                  setDecreeTurn(next);
                  setDecreeFocusIdx(next - 1);
                },
                () => {
                  setDecreeTurn(STEP1_DIALOGUE.length);
                  setDecreeFocusIdx(STEP1_DIALOGUE.length - 1);
                }
              )}
            </div>

            <div className="flex items-center justify-end shrink-0 pt-0.5">
              <button
                type="button"
                onClick={() => {
                  setPanelIndex(1);
                  onAdvanceStep?.();
                }}
                className={`${
                  tier === 'compact' ? 'min-h-[40px] px-4 py-1.5 text-[14px]' : 'min-h-[44px] px-5 py-2 text-[15px]'
                } w-full sm:w-auto rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer transition-opacity hover:opacity-90`}
                style={{
                  backgroundColor: PARCHMENT_PALETTE.goldDark,
                  color: '#FFF9EE',
                  fontFamily: HEADING_FONT,
                }}
              >
                <span>Continue to the Vault</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* STEP 2: THE SECRET VAULT (STORY + TAP DIALOGUE ONLY, NO QUIZ)     */}
      {/* ================================================================= */}
      {panelIndex === 1 && (
        <div
          className={`w-full max-h-full min-h-0 rounded-3xl border overflow-hidden flex ${
            storyHorizontal ? 'flex-row' : 'flex-col'
          } animate-fade-rise`}
          style={PARCHMENT_SURFACE}
        >
          {/* Left: Secret Vault Image */}
          <div
            className={`${
              storyHorizontal
                ? 'w-5/12 h-auto min-h-0'
                : tier === 'compact'
                ? 'h-[82px] shrink-0'
                : 'h-[125px] sm:h-[155px] shrink-0'
            } relative overflow-hidden`}
            style={{ backgroundColor: '#2B2118' }}
          >
            <img
              src="/assets/aistudio/Gemini_Generated_Image_j5vt77j5vt77j5vt_bba255c4.png"
              alt="Advisor and Prince Khoisnam inside the Secret Stone Vault with 100 closed wooden lockers"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to top, rgba(32, 20, 11, 0.9) 0%, rgba(32, 20, 11, 0.25) 55%, transparent 100%)',
              }}
            />
            <div className="absolute bottom-2 left-3 right-3 text-[#FAF1DF]">
              {tier !== 'compact' && !isNarrow && (
                <div
                  className="text-[12px] font-bold tracking-wider"
                  style={{ fontFamily: HEADING_FONT, color: '#E8C57B' }}
                >
                  The Secret Stone Vault
                </div>
              )}
              <p className="text-[13px] sm:text-[15px] font-semibold leading-snug">
                100 closed wooden lockers line the ancient chamber walls.
              </p>
            </div>
          </div>

          {/* Right: Tap-Induced Rule Dialogue & Single CTA */}
          <div
            className={`flex-1 min-h-0 ${
              tier === 'compact' ? 'p-2.5 gap-1.5' : 'p-3 sm:p-4 gap-2.5'
            } flex flex-col justify-between overflow-hidden`}
          >
            <div className={`flex flex-col ${tier === 'compact' ? 'gap-1' : 'gap-2'} min-h-0 overflow-hidden`}>
              <div className="flex items-center gap-2 shrink-0" style={{ color: PARCHMENT_PALETTE.sealRed }}>
                <Lock className="w-4 h-4 shrink-0" />
                <span className="text-[12px] sm:text-[13px] font-bold tracking-wide" style={{ fontFamily: HEADING_FONT }}>
                  Chapter 2 · The Secret Vault
                </span>
              </div>

              <h2
                className={`${
                  tier === 'compact' ? 'text-[17px]' : 'text-[20px] sm:text-[24px]'
                } font-bold leading-tight shrink-0`}
                style={{ fontFamily: HEADING_FONT, color: PARCHMENT_PALETTE.ink }}
              >
                How the 100 Doors Flip
              </h2>

              {renderDialogueCard(
                STEP2_DIALOGUE,
                vaultTurn,
                vaultFocusIdx,
                setVaultFocusIdx,
                () => {
                  const next = Math.min(STEP2_DIALOGUE.length, vaultTurn + 1);
                  setVaultTurn(next);
                  setVaultFocusIdx(next - 1);
                },
                () => {
                  setVaultTurn(STEP2_DIALOGUE.length);
                  setVaultFocusIdx(STEP2_DIALOGUE.length - 1);
                }
              )}
            </div>

            <div className="flex items-center justify-end shrink-0 pt-0.5">
              <button
                type="button"
                onClick={() => {
                  setCurrentPerson(0);
                  setIsPlaying(false);
                  setStep3Page('walk');
                  setPanelIndex(2);
                  onAdvanceStep?.();
                }}
                className={`${
                  tier === 'compact' ? 'min-h-[40px] px-4 py-1.5 text-[14px]' : 'min-h-[44px] px-5 py-2 text-[15px]'
                } w-full sm:w-auto rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer transition-opacity hover:opacity-90`}
                style={{
                  backgroundColor: PARCHMENT_PALETTE.sealRed,
                  color: '#FFF9EE',
                  fontFamily: HEADING_FONT,
                }}
              >
                <span>Watch the Royal Walk</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* STEP 3: THE ROYAL WALK (TWO SEPARATE PAGES TO AVOID CLUTTER)      */}
      {/* ================================================================= */}
      {panelIndex === 2 && (
        <div className="w-full h-full max-h-full min-h-0 flex flex-col gap-1.5 sm:gap-2 overflow-hidden animate-fade-rise">
          {/* Page Switcher Header */}
          <div
            className={`w-full rounded-2xl border ${
              tier === 'compact' ? 'px-2 py-1' : 'p-1.5 sm:p-2'
            } flex items-center justify-between gap-2 shrink-0`}
            style={PARCHMENT_SURFACE}
          >
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setStep3Page('walk')}
                className={`${
                  tier === 'compact' ? 'min-h-[40px] px-2.5 py-1 text-[13px]' : 'min-h-[44px] px-3.5 py-1.5 text-[14px]'
                } rounded-xl font-bold cursor-pointer transition-colors whitespace-nowrap`}
                style={{
                  backgroundColor:
                    step3Page === 'walk' ? PARCHMENT_PALETTE.ink : 'rgba(255, 250, 240, 0.7)',
                  color: step3Page === 'walk' ? '#FFF9EE' : PARCHMENT_PALETTE.ink,
                  fontFamily: HEADING_FONT,
                }}
              >
                1. Try the Walk
              </button>

              <button
                type="button"
                onClick={() => setStep3Page('solution')}
                className={`${
                  tier === 'compact' ? 'min-h-[40px] px-2.5 py-1 text-[13px]' : 'min-h-[44px] px-3.5 py-1.5 text-[14px]'
                } rounded-xl font-bold cursor-pointer transition-colors whitespace-nowrap`}
                style={{
                  backgroundColor:
                    step3Page === 'solution' ? PARCHMENT_PALETTE.goldDark : 'rgba(255, 250, 240, 0.7)',
                  color: step3Page === 'solution' ? '#FFF9EE' : PARCHMENT_PALETTE.ink,
                  fontFamily: HEADING_FONT,
                }}
              >
                2. The Solution
              </button>
            </div>

            {!isNarrow && (
              <span
                className="text-[13px] font-semibold px-2 tabular-nums whitespace-nowrap"
                style={{ color: PARCHMENT_PALETTE.inkMuted, fontFamily: BODY_FONT }}
              >
                {step3Page === 'walk' ? 'Page 1 of 2 · Explore' : 'Page 2 of 2 · Solution'}
              </span>
            )}
          </div>

          {/* --------------------------------------------------------------- */}
          {/* PAGE 1: TRY THE WALK (CONTROLS LEFT | GRID CENTER | EXPLAIN RIGHT) */}
          {/* --------------------------------------------------------------- */}
          {step3Page === 'walk' && (
            <div
              className={`w-full flex-1 min-h-0 rounded-3xl border ${
                tier === 'compact' ? 'p-2 gap-2' : 'p-2.5 sm:p-3.5 gap-2.5 lg:gap-4'
              } flex ${
                useThreeColWalk ? 'flex-row items-stretch' : 'flex-col justify-between'
              } overflow-hidden animate-fade-rise`}
              style={PARCHMENT_SURFACE}
            >
              {useThreeColWalk ? (
                <>
                  {/* LEFT COLUMN: Controls */}
                  <div
                    className={`${
                      isLandscapeCompact
                        ? 'w-[170px]'
                        : 'w-[205px] xl:w-[245px]'
                    } h-full min-h-0 shrink-0`}
                  >
                    {renderSidebarWalkControls()}
                  </div>

                  {/* CENTER CANVAS: Large Locker Grid Centered & Lifted Slightly Above */}
                  <div
                    className={`flex-1 min-w-0 h-full min-h-0 flex flex-col items-center justify-center ${
                      isLandscapeCompact ? 'pb-1.5' : 'pb-4 lg:pb-6'
                    }`}
                  >
                    {renderWoodenLockerGrid()}
                  </div>

                  {/* RIGHT COLUMN: Locker Explanations */}
                  <div
                    className={`${
                      isLandscapeCompact
                        ? 'w-[178px] p-2 gap-1.5'
                        : 'w-[215px] xl:w-[265px] p-3 gap-2.5'
                    } h-full min-h-0 shrink-0 rounded-2xl border flex flex-col justify-between overflow-hidden`}
                    style={{
                      background: inspectedIsSquare
                        ? 'rgba(184, 134, 43, 0.14)'
                        : 'rgba(255, 250, 240, 0.72)',
                      borderColor: inspectedIsSquare ? PARCHMENT_PALETTE.gold : '#CEB282',
                    }}
                  >
                    <div className={`flex flex-col ${isLandscapeCompact ? 'gap-1' : 'gap-2'} min-h-0 overflow-hidden`}>
                      {/* Locker Title & Outcome */}
                      <div
                        className={`flex flex-wrap items-center justify-between gap-1 border-b ${
                          isLandscapeCompact ? 'pb-1' : 'pb-2'
                        }`}
                        style={{ borderColor: '#D6BE93' }}
                      >
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span
                            className={`${isLandscapeCompact ? 'text-[14px]' : 'text-[17px]'} font-bold tabular-nums`}
                            style={{ fontFamily: HEADING_FONT, color: PARCHMENT_PALETTE.ink }}
                          >
                            Locker #{inspectedLocker}
                          </span>
                          {inspectedIsSquare && (
                            <span
                              className="px-1.5 py-0.5 rounded-md text-[11px] font-bold tabular-nums"
                              style={{
                                backgroundColor: 'rgba(184, 134, 43, 0.22)',
                                color: PARCHMENT_PALETTE.goldDark,
                              }}
                            >
                              {inspectedRoot}×{inspectedRoot} Square
                            </span>
                          )}
                        </div>

                        <span
                          className={`${isLandscapeCompact ? 'text-[11px]' : 'text-[13px]'} font-bold`}
                          style={{
                            fontFamily: HEADING_FONT,
                            color: inspectedEndsOpen ? PARCHMENT_PALETTE.goldDark : PARCHMENT_PALETTE.sealRed,
                          }}
                        >
                          {inspectedEndsOpen ? 'Ends Open' : 'Ends Closed'}
                        </span>
                      </div>

                      {/* Factors / Flips */}
                      <div className="flex flex-col gap-1">
                        <span
                          className={`${isLandscapeCompact ? 'text-[11px]' : 'text-[12px]'} font-bold uppercase tracking-wider`}
                          style={{ color: PARCHMENT_PALETTE.inkMuted, fontFamily: HEADING_FONT }}
                        >
                          Flipped {inspectedFlipCount} {inspectedFlipCount === 1 ? 'time' : 'times'} by:
                        </span>
                        {isLandscapeCompact ? (
                          <div
                            className="text-[12px] font-bold tabular-nums leading-tight truncate"
                            style={{ color: PARCHMENT_PALETTE.sealRed }}
                            title={inspectedDivisors.join(', ')}
                          >
                            {inspectedDivisors.join(', ')}
                          </div>
                        ) : (
                          <div className="flex flex-wrap gap-1">
                            {inspectedDivisors.map((d) => (
                              <span
                                key={d}
                                className="px-2 py-0.5 text-[13px] rounded-md border font-bold tabular-nums"
                                style={{
                                  backgroundColor: 'rgba(255, 250, 240, 0.9)',
                                  borderColor: '#D2B88C',
                                  color: PARCHMENT_PALETTE.sealRed,
                                }}
                              >
                                {d}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Clear Explanation */}
                      <div
                        className={`${
                          isLandscapeCompact ? 'p-1.5 text-[12px]' : 'p-2.5 text-[14px] xl:text-[15px]'
                        } rounded-xl border leading-snug`}
                        style={INSET_PARCHMENT}
                      >
                        {inspectedEndsOpen ? (
                          <span>
                            <strong>Odd count ({inspectedFlipCount}):</strong> Factors pair up except{' '}
                            <strong className="tabular-nums">
                              {inspectedRoot}×{inspectedRoot}
                            </strong>
                            . That lone flip leaves Locker #{inspectedLocker} <strong>open</strong>!
                          </span>
                        ) : (
                          <span>
                            <strong>Even count ({inspectedFlipCount}):</strong> Every walker pairs with a
                            partner. Each pair flips open then shuts—so it ends <strong>closed</strong>.
                          </span>
                        )}
                      </div>

                      {/* Current Walker Info */}
                      {!isLandscapeCompact && (
                        <p className="text-[13px] leading-snug" style={{ color: PARCHMENT_PALETTE.inkSoft }}>
                          {currentPerson === 0
                            ? 'Tap any locker on the grid to inspect its factors, or press Play Walk.'
                            : `Walker #${currentPerson} flips multiples of ${currentPerson} (${touchedByCurrent.slice(0, 5).join(', ')}${
                                touchedByCurrent.length > 5 ? '…' : ''
                              }).`}
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => setStep3Page('solution')}
                      className={`${
                        isLandscapeCompact ? 'min-h-[34px] px-2.5 py-1 text-[12px]' : 'min-h-[42px] px-3.5 py-1.5 text-[14px]'
                      } w-full rounded-xl font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-opacity hover:opacity-90 shrink-0`}
                      style={{
                        backgroundColor: PARCHMENT_PALETTE.goldDark,
                        color: '#FFF9EE',
                        fontFamily: HEADING_FONT,
                      }}
                    >
                      <span>{isLandscapeCompact ? 'Solution' : 'See Full Solution'}</span>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {renderWalkControls(false)}

                  <div className="flex-1 min-h-0 flex flex-col items-center justify-center pb-2 -translate-y-0.5">
                    {renderWoodenLockerGrid()}
                  </div>

                  {/* Inspector Panel */}
                  <div
                    className={`${
                      tier === 'compact' || isNarrow ? 'p-2 rounded-xl gap-0.5' : 'p-2.5 sm:p-3 rounded-2xl gap-1'
                    } border flex flex-col shrink-0`}
                    style={{
                      background: inspectedIsSquare
                        ? 'rgba(184, 134, 43, 0.14)'
                        : 'rgba(255, 250, 240, 0.7)',
                      borderColor: inspectedIsSquare ? PARCHMENT_PALETTE.gold : '#CEB282',
                    }}
                  >
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`${tier === 'compact' ? 'text-[14px]' : 'text-[16px]'} font-bold tabular-nums`}
                          style={{ fontFamily: HEADING_FONT, color: PARCHMENT_PALETTE.ink }}
                        >
                          Locker #{inspectedLocker}
                        </span>
                        {inspectedIsSquare && (
                          <span
                            className="text-[13px] font-bold tabular-nums"
                            style={{ color: PARCHMENT_PALETTE.goldDark }}
                          >
                            · Square ({inspectedRoot}×{inspectedRoot})
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className="text-[13px] sm:text-[14px] font-bold"
                          style={{
                            fontFamily: HEADING_FONT,
                            color: inspectedEndsOpen ? PARCHMENT_PALETTE.goldDark : PARCHMENT_PALETTE.sealRed,
                          }}
                        >
                          {inspectedEndsOpen ? 'Ends Open' : 'Ends Closed'}
                        </span>
                        <button
                          type="button"
                          onClick={() => setStep3Page('solution')}
                          className={`${
                            tier === 'compact' ? 'min-h-[36px] px-2.5 py-1 text-[12px]' : 'min-h-[40px] px-3 py-1 text-[13px]'
                          } rounded-xl font-bold flex items-center gap-1 cursor-pointer transition-opacity hover:opacity-90 shrink-0`}
                          style={{
                            backgroundColor: PARCHMENT_PALETTE.goldDark,
                            color: '#FFF9EE',
                            fontFamily: HEADING_FONT,
                          }}
                        >
                          <span>Solution</span>
                          <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                        </button>
                      </div>
                    </div>

                    <p
                      className={`${
                        tier === 'compact' || isNarrow ? 'text-[13px] truncate' : 'text-[14px] sm:text-[15px]'
                      } leading-snug`}
                      style={{ color: PARCHMENT_PALETTE.ink }}
                    >
                      Flipped by <strong className="tabular-nums">{inspectedFlipCount}</strong>{' '}
                      {inspectedFlipCount === 1 ? 'person' : 'people'}:{' '}
                      <span className="font-bold tabular-nums" style={{ color: PARCHMENT_PALETTE.sealRed }}>
                        {inspectedDivisors.join(', ')}
                      </span>
                      {!isNarrow && (
                        <span style={{ color: PARCHMENT_PALETTE.inkSoft }}>
                          {' '}
                          —{' '}
                          {inspectedEndsOpen
                            ? `odd count of factors (${inspectedFlipCount}) stays open.`
                            : `factors pair up (${inspectedFlipCount}), so it ends closed.`}
                        </span>
                      )}
                    </p>
                  </div>
                </>
              )}
            </div>
          )}

          {/* --------------------------------------------------------------- */}
          {/* PAGE 2: THE SOLUTION (PROOF STEPS + SYNCED ROYAL WALK)          */}
          {/* --------------------------------------------------------------- */}
          {step3Page === 'solution' && (
            <div
              className={`flex-1 min-h-0 grid ${
                isNarrow || tier === 'compact'
                  ? 'grid-cols-1 gap-1.5'
                  : tier === 'standard'
                  ? 'grid-cols-12 gap-2.5'
                  : 'grid-cols-12 gap-3'
              } overflow-hidden animate-fade-rise`}
            >
              {/* Left / Top: Proof Steps */}
              <div
                className={`${
                  isNarrow || tier === 'compact'
                    ? 'shrink-0'
                    : tier === 'standard'
                    ? 'col-span-5 min-h-0'
                    : 'col-span-6 min-h-0'
                } rounded-3xl border overflow-hidden flex flex-col justify-between`}
                style={PARCHMENT_SURFACE}
              >
                {tier !== 'compact' && !isNarrow && (
                  <div
                    className={`relative ${tier === 'standard' ? 'h-[80px]' : 'h-[130px]'} overflow-hidden shrink-0`}
                    style={{ backgroundColor: '#2E2014' }}
                  >
                    <img
                      src="/assets/aistudio/Gemini_Generated_Image_j5vt77j5vt77j5vt__2__ad378f1a.png"
                      alt="Prince Khoisnam reveals the 10 open lockers filled with royal ratnas"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(to top, rgba(32, 20, 11, 0.9) 0%, rgba(32, 20, 11, 0.2) 60%, transparent 100%)',
                      }}
                    />
                    <div className="absolute bottom-2 left-3 right-3 text-[#FAF1DF]">
                      <div
                        className="text-[11px] font-bold tracking-wider"
                        style={{ fontFamily: HEADING_FONT, color: '#E8C57B' }}
                      >
                        The Treasure Revealed
                      </div>
                      <p className="text-[14px] font-semibold leading-snug">
                        Exactly 10 lockers open to reveal the royal ratnas.
                      </p>
                    </div>
                  </div>
                )}

                <div
                  role={solutionStep < 3 ? 'button' : undefined}
                  tabIndex={solutionStep < 3 ? 0 : undefined}
                  onClick={() => {
                    if (solutionStep >= 3) return;
                    const sel = window.getSelection()?.toString();
                    if (sel && sel.length > 0) return;
                    setSolutionStep((s) => Math.min(3, s + 1));
                  }}
                  onKeyDown={(e) => {
                    if (solutionStep < 3 && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      setSolutionStep((s) => Math.min(3, s + 1));
                    }
                  }}
                  className={`${
                    tier === 'compact' || isNarrow ? 'p-2.5 gap-1.5' : 'p-3 sm:p-3.5 gap-2'
                  } flex-1 min-h-0 flex flex-col justify-between overflow-hidden ${
                    solutionStep < 3 ? 'cursor-pointer' : ''
                  }`}
                >
                  <div className="flex flex-col gap-1.5 min-h-0 overflow-hidden">
                    <div className="flex items-center justify-between gap-2 flex-wrap shrink-0">
                      <span
                        className="text-[13px] font-bold tabular-nums"
                        style={{ color: PARCHMENT_PALETTE.goldDark, fontFamily: BODY_FONT }}
                      >
                        Proof · Step {solutionStep} of 3
                      </span>
                      {(tier === 'compact' || isNarrow) ? (
                        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                          {[1, 2, 3].map((sNum) => (
                            <button
                              key={sNum}
                              type="button"
                              onClick={() => setSolutionStep(sNum)}
                              className="min-w-[32px] min-h-[32px] px-2 rounded-lg text-[12px] font-bold border cursor-pointer tabular-nums"
                              style={{
                                backgroundColor:
                                  solutionStep === sNum ? PARCHMENT_PALETTE.goldDark : 'rgba(255,250,240,0.85)',
                                color: solutionStep === sNum ? '#FFF9EE' : PARCHMENT_PALETTE.ink,
                                borderColor: PARCHMENT_PALETTE.paperBorder,
                                fontFamily: HEADING_FONT,
                              }}
                            >
                              {sNum}
                            </button>
                          ))}
                        </div>
                      ) : (
                        solutionStep < 3 && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSolutionStep(3);
                            }}
                            className="min-h-[36px] px-2.5 py-1 rounded-lg text-[13px] font-bold underline underline-offset-2 cursor-pointer"
                            style={{ color: PARCHMENT_PALETTE.sealRed }}
                          >
                            Show all steps
                          </button>
                        )
                      )}
                    </div>

                    {tier !== 'compact' && (
                      <h3
                        className={`${
                          isNarrow ? 'text-[16px]' : 'text-[18px] sm:text-[20px]'
                        } font-bold leading-snug shrink-0`}
                        style={{ fontFamily: HEADING_FONT, color: PARCHMENT_PALETTE.ink }}
                      >
                        Why Do Exactly 10 Lockers Stay Open?
                      </h3>
                    )}

                    {/* Condensed single-step view on compact/narrow vs stacked steps on desktop */}
                    {(tier === 'compact' || isNarrow) ? (
                      <div
                        className="p-2 rounded-xl border text-[14px] leading-snug animate-fade-rise"
                        style={
                          solutionStep === 1
                            ? INSET_PARCHMENT
                            : solutionStep === 2
                            ? { background: 'rgba(184, 134, 43, 0.14)', borderColor: PARCHMENT_PALETTE.gold }
                            : { background: 'rgba(184, 134, 43, 0.22)', borderColor: PARCHMENT_PALETTE.goldDark }
                        }
                      >
                        {solutionStep === 1 && (
                          <>
                            <strong style={{ fontFamily: HEADING_FONT, color: PARCHMENT_PALETTE.sealRed }}>1. </strong>
                            Factors usually travel in pairs: <strong>12 = 1 × 12, 2 × 6, 3 × 4</strong>. That&apos;s 6 flips (even). Open, closed, open, closed, open, closed—shut!
                          </>
                        )}
                        {solutionStep === 2 && (
                          <>
                            <strong style={{ fontFamily: HEADING_FONT, color: PARCHMENT_PALETTE.goldDark }}>2. </strong>
                            What makes a square number different? One factor pairs with itself: <strong>6 × 6 = 36</strong>. That lone factor gives it an odd count of factors (9 flips)!
                          </>
                        )}
                        {solutionStep === 3 && (
                          <>
                            <strong style={{ fontFamily: HEADING_FONT, color: PARCHMENT_PALETTE.ink }}>3. </strong>
                            An odd number of flips leaves the door wide open. Exactly 10 lockers stay open: <strong className="tabular-nums">1, 4, 9, 16, 25, 36, 49, 64, 81, and 100</strong>!
                          </>
                        )}
                      </div>
                    ) : (
                      <>
                        <div
                          className="p-2 sm:p-2.5 rounded-xl border text-[14px] sm:text-[15px] leading-snug animate-fade-rise"
                          style={INSET_PARCHMENT}
                        >
                          <span
                            className="font-bold mr-1 tabular-nums"
                            style={{ fontFamily: HEADING_FONT, color: PARCHMENT_PALETTE.sealRed }}
                          >
                            1.
                          </span>
                          Factors usually travel in pairs: <strong className="tabular-nums">12 = 1 × 12, 2 × 6, 3 × 4</strong>. That&apos;s 6 flips (even) → shut!
                        </div>

                        {solutionStep >= 2 && (
                          <div
                            className="p-2 sm:p-2.5 rounded-xl border text-[14px] sm:text-[15px] leading-snug animate-fade-rise"
                            style={{
                              background: 'rgba(184, 134, 43, 0.14)',
                              borderColor: PARCHMENT_PALETTE.gold,
                            }}
                          >
                            <span
                              className="font-bold mr-1 tabular-nums"
                              style={{ fontFamily: HEADING_FONT, color: PARCHMENT_PALETTE.goldDark }}
                            >
                              2.
                            </span>
                            What makes a square different? One factor pairs with itself: <strong className="tabular-nums">6 × 6 = 36</strong> (9 flips) → stays open!
                          </div>
                        )}

                        {solutionStep >= 3 && (
                          <div
                            className="p-2 sm:p-2.5 rounded-xl border text-[14px] sm:text-[15px] leading-snug animate-fade-rise"
                            style={{
                              background: 'rgba(184, 134, 43, 0.22)',
                              borderColor: PARCHMENT_PALETTE.goldDark,
                            }}
                          >
                            <span
                              className="font-bold mr-1 tabular-nums"
                              style={{ fontFamily: HEADING_FONT, color: PARCHMENT_PALETTE.ink }}
                            >
                              3.
                            </span>
                            An odd number of flips leaves 10 lockers wide open:{' '}
                            <strong className="tabular-nums">
                              1, 4, 9, 16, 25, 36, 49, 64, 81, 100
                            </strong>.
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {solutionStep < 3 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSolutionStep((s) => Math.min(3, s + 1));
                      }}
                      className={`${
                        tier === 'compact' ? 'min-h-[36px] text-[13px]' : 'min-h-[42px] text-[14px]'
                      } w-full px-3 py-1.5 rounded-xl border border-dashed font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors shrink-0`}
                      style={{
                        borderColor: PARCHMENT_PALETTE.sealRed,
                        backgroundColor: 'rgba(139, 46, 31, 0.08)',
                        color: PARCHMENT_PALETTE.sealRed,
                        fontFamily: HEADING_FONT,
                      }}
                    >
                      <span>Tap to reveal Step {solutionStep + 1} of 3</span>
                      <ChevronRight className="w-4 h-4 shrink-0" />
                    </button>
                  )}
                </div>
              </div>

              {/* Right / Bottom: Synchronized Royal Walk Animation */}
              <div
                className={`${
                  isNarrow || tier === 'compact'
                    ? 'flex-1 min-h-0'
                    : tier === 'standard'
                    ? 'col-span-7 min-h-0'
                    : 'col-span-6 min-h-0'
                } rounded-3xl border ${
                  tier === 'compact' ? 'p-2 gap-1.5' : 'p-2.5 sm:p-3 gap-2'
                } flex flex-col justify-between overflow-hidden`}
                style={PARCHMENT_SURFACE}
              >
                {renderWalkControls(true)}

                {renderWoodenLockerGrid()}

                <div
                  className="px-2.5 py-1.5 rounded-xl border flex items-center justify-between gap-2 shrink-0"
                  style={INSET_PARCHMENT}
                >
                  <div className="text-[13px] sm:text-[14px] leading-snug truncate">
                    <strong className="tabular-nums">#{inspectedLocker}</strong> ·{' '}
                    <span className="tabular-nums">{inspectedFlipCount} flips</span> →{' '}
                    <strong
                      style={{
                        color: inspectedEndsOpen
                          ? PARCHMENT_PALETTE.goldDark
                          : PARCHMENT_PALETTE.sealRed,
                      }}
                    >
                      {inspectedEndsOpen ? 'Stays Open' : 'Ends Closed'}
                    </strong>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep3Page('walk')}
                    className={`${
                      tier === 'compact' ? 'min-h-[36px] text-[12px]' : 'min-h-[40px] text-[13px]'
                    } px-2.5 py-1 rounded-xl border font-bold flex items-center justify-center gap-1 cursor-pointer shrink-0`}
                    style={{
                      borderColor: PARCHMENT_PALETTE.paperBorder,
                      backgroundColor: 'rgba(255, 250, 240, 0.85)',
                      color: PARCHMENT_PALETTE.ink,
                      fontFamily: HEADING_FONT,
                    }}
                  >
                    <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
                    <span>Walk</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

