/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { isSquare, solveSquarePairsRow } from '../math/facts';
import {
  CheckCircle2,
  RotateCcw,
  Lightbulb,
  Wand2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { useViewportTier } from '../hooks/useViewportTier';

export interface SquarePairsPuzzleProps {
  className?: string;
}

const TOTAL_CARDS = 17;

export const SquarePairsPuzzle: React.FC<SquarePairsPuzzleProps> = ({
  className = '',
}) => {
  const [slots, setSlots] = useState<(number | null)[]>(() =>
    Array(TOTAL_CARDS).fill(null)
  );
  const [selectedSlotIdx, setSelectedSlotIdx] = useState<number | null>(null);
  const [draggedCard, setDraggedCard] = useState<{
    num: number;
    fromSlotIdx: number | null;
  } | null>(null);
  const [showEndpointHint, setShowEndpointHint] = useState<boolean>(false);
  const [checkMessage, setCheckMessage] = useState<{
    status: 'idle' | 'valid' | 'incomplete' | 'invalid';
    text: string;
  }>({ status: 'idle', text: '' });
  const { tier, isNarrow } = useViewportTier();
  const isCompact = tier === 'compact';

  // Compute reference solution dynamically from math engine
  const sampleSolution = useMemo(() => solveSquarePairsRow(TOTAL_CARDS).samplePath, []);

  // Cards still remaining in the tray
  const usedSet = useMemo(() => {
    const s = new Set<number>();
    slots.forEach((v) => {
      if (v !== null) s.add(v);
    });
    return s;
  }, [slots]);

  const placedCount = usedSet.size;

  // Evaluate adjacent pairs live
  const bridgeStatuses = useMemo(() => {
    const bridges: { sum: number | null; valid: boolean }[] = [];
    for (let i = 0; i < TOTAL_CARDS - 1; i++) {
      const a = slots[i];
      const b = slots[i + 1];
      if (a !== null && b !== null) {
        const sum = a + b;
        bridges.push({ sum, valid: isSquare(sum) });
      } else {
        bridges.push({ sum: null, valid: false });
      }
    }
    return bridges;
  }, [slots]);

  const validPairsCount = bridgeStatuses.filter((b) => b.valid).length;

  // Tap a card from the tray -> place in selected slot or first empty slot
  const handleTrayCardTap = (num: number) => {
    setCheckMessage({ status: 'idle', text: '' });
    if (usedSet.has(num)) return;

    setSlots((prev) => {
      const next = [...prev];
      if (selectedSlotIdx !== null && next[selectedSlotIdx] === null) {
        next[selectedSlotIdx] = num;
        return next;
      }
      const firstEmpty = next.findIndex((v) => v === null);
      if (firstEmpty !== -1) {
        next[firstEmpty] = num;
      }
      return next;
    });
    setSelectedSlotIdx(null);
  };

  // Tap a slot: select for swap, swap if another slot is selected, or tap twice to remove back to tray
  const handleSlotTap = (idx: number) => {
    setCheckMessage({ status: 'idle', text: '' });
    if (selectedSlotIdx === null) {
      if (slots[idx] !== null) {
        setSelectedSlotIdx(idx);
      }
      return;
    }

    if (selectedSlotIdx === idx) {
      // Second tap on same occupied slot removes it back to tray
      setSlots((prev) => {
        const next = [...prev];
        next[idx] = null;
        return next;
      });
      setSelectedSlotIdx(null);
      return;
    }

    // Swap selectedSlotIdx and idx
    setSlots((prev) => {
      const next = [...prev];
      const temp = next[selectedSlotIdx];
      next[selectedSlotIdx] = next[idx];
      next[idx] = temp;
      return next;
    });
    setSelectedSlotIdx(null);
  };

  // Desktop Drag & Drop Handlers
  const handleDropOnSlot = (targetIdx: number) => {
    if (!draggedCard) return;
    setCheckMessage({ status: 'idle', text: '' });

    setSlots((prev) => {
      const next = [...prev];
      const { num, fromSlotIdx } = draggedCard;
      const existingAtTarget = next[targetIdx];

      if (fromSlotIdx !== null) {
        next[fromSlotIdx] = existingAtTarget;
        next[targetIdx] = num;
      } else {
        // From tray: if target occupied, push existing back to tray cleanly
        next[targetIdx] = num;
      }
      return next;
    });

    setDraggedCard(null);
    setSelectedSlotIdx(null);
  };

  const handleAutoCheck = () => {
    if (placedCount < TOTAL_CARDS) {
      setCheckMessage({
        status: 'incomplete',
        text: `Place all 17 cards first (${placedCount} of 17 placed so far).`,
      });
      return;
    }
    if (validPairsCount === TOTAL_CARDS - 1) {
      setCheckMessage({
        status: 'valid',
        text: 'Amazing! All 16 neighboring pairs add up to square numbers (4, 9, 16, or 25)!',
      });
    } else {
      setCheckMessage({
        status: 'invalid',
        text: `${validPairsCount} of 16 links are squares. Fix the amber links by swapping cards!`,
      });
    }
  };

  const handleShowSolution = () => {
    setSlots([...sampleSolution]);
    setSelectedSlotIdx(null);
    setCheckMessage({
      status: 'valid',
      text: 'Loaded a working 1–17 path! Notice 16 and 17 sit at the two ends.',
    });
  };

  const handleReset = () => {
    setSlots(Array(TOTAL_CARDS).fill(null));
    setSelectedSlotIdx(null);
    setCheckMessage({ status: 'idle', text: '' });
  };

  return (
    <div
      data-no-nav="true"
      className={`w-full max-w-4xl h-full max-h-full min-h-0 overflow-hidden mx-auto rounded-3xl border border-slate-200/80 bg-white ${
        isCompact ? 'p-2 gap-1.5' : 'p-2.5 sm:p-4 gap-2 sm:gap-2.5'
      } shadow-2xs flex flex-col justify-between ${className}`}
    >
      {/* Header & Progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-slate-100 pb-2 shrink-0">
        <div className="min-w-0">
          {!isCompact && (
            <div className="hidden sm:flex flex-wrap items-center gap-1.5 text-micro text-slate-500 font-semibold">
              <span>Challenge Game</span>
              <span aria-hidden="true">·</span>
              <span>Sums Must Be 4, 9, 16, or 25</span>
            </div>
          )}
          <h3 className="text-small sm:text-statement font-bold text-slate-900 mt-0.5">
            Square Pairs 1–17 Puzzle
          </h3>
        </div>

        <div className="flex items-center gap-3 text-micro sm:text-small font-semibold tabular-nums">
          <span className="text-slate-600">
            Placed <strong className="text-slate-900">{placedCount}/17</strong>
          </span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="text-emerald-700">
            Green Links <strong>{validPairsCount}/16</strong>
          </span>
        </div>
      </div>

      {/* Unified Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 shrink-0">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setShowEndpointHint((h) => !h)}
            className={`${isCompact ? 'min-h-[34px] px-2.5' : 'min-h-[38px] px-3'} py-1 rounded-xl text-micro sm:text-small font-bold border flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
              showEndpointHint
                ? 'bg-amber-100 text-amber-950 border-amber-400'
                : 'bg-amber-50/80 text-amber-900 border-amber-200/80 hover:bg-amber-100'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>{showEndpointHint ? 'Hide Hint' : 'Hint (16 & 17)'}</span>
          </button>

          <button
            type="button"
            onClick={handleShowSolution}
            className={`${isCompact ? 'min-h-[34px] px-2.5' : 'min-h-[38px] px-3'} py-1 rounded-xl text-micro sm:text-small font-bold border border-slate-200/80 bg-slate-50/80 hover:bg-slate-100 text-slate-700 flex items-center gap-1.5 cursor-pointer shrink-0`}
          >
            <Wand2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
            <span>Example Path</span>
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleAutoCheck}
            className={`${isCompact ? 'min-h-[34px] px-2.5' : 'min-h-[38px] px-3'} py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-micro sm:text-small font-bold flex items-center gap-1.5 cursor-pointer shrink-0`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>Check</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className={`${isCompact ? 'min-h-[34px] w-9' : 'min-h-[38px] w-10'} rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-600 flex items-center justify-center cursor-pointer shrink-0`}
            title="Clear Board"
            aria-label="Clear Board"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Endpoint Hint Box */}
      {showEndpointHint && (
        <div className="p-3 rounded-2xl bg-amber-50/75 border border-amber-200/80 text-small text-amber-950 flex items-start gap-2.5 animate-fade-rise">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Endpoint Secret:</strong> 17 only pairs with <strong>8</strong> (17 + 8 = 25), and 16 only pairs with{' '}
            <strong>9</strong> (16 + 9 = 25). Since each has just <strong>1</strong> partner, 16 and 17 sit at the two ends!
          </div>
        </div>
      )}

      {/* Sequence Board (17 Slots with Neighbor Bridge Badges) */}
      <div className={`${isCompact ? 'p-2 gap-1.5' : 'p-2.5 sm:p-3 gap-2'} rounded-2xl bg-slate-50/75 flex flex-col justify-center flex-1 min-h-0 overflow-hidden`}>
        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-micro text-slate-500 font-medium shrink-0">
          <span>
            Tap cards below to fill · Tap two slots to swap
          </span>
          {selectedSlotIdx !== null && (
            <span className="font-bold text-[#005583]">
              Slot #{selectedSlotIdx + 1} selected — tap another to swap
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-y-1.5 gap-x-1">
          {slots.map((val, idx) => {
            const isSelected = selectedSlotIdx === idx;
            const isEndpoint = idx === 0 || idx === TOTAL_CARDS - 1;
            const bridge = idx < TOTAL_CARDS - 1 ? bridgeStatuses[idx] : null;

            return (
              <React.Fragment key={`slot-${idx}`}>
                {/* Slot Card */}
                <button
                  type="button"
                  draggable={val !== null}
                  onDragStart={() =>
                    val !== null && setDraggedCard({ num: val, fromSlotIdx: idx })
                  }
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDropOnSlot(idx)}
                  onClick={() => handleSlotTap(idx)}
                  className={`${
                    isCompact || isNarrow
                      ? 'min-w-[32px] min-h-[34px] px-1 text-micro rounded-lg'
                      : 'min-w-[40px] min-h-[42px] px-2 text-small rounded-xl'
                  } border-2 font-mono font-black tabular-nums transition-all cursor-pointer flex flex-col items-center justify-center relative ${
                    isSelected
                      ? 'bg-[#005583] text-white border-[#003F62] ring-2 ring-sky-300'
                      : val !== null
                      ? showEndpointHint && (val === 16 || val === 17)
                        ? 'bg-amber-100 text-amber-950 border-amber-500'
                        : 'bg-white text-slate-900 border-slate-300/90 hover:border-[#005583]'
                      : isEndpoint && showEndpointHint
                      ? 'bg-amber-50/70 text-amber-800 border-dashed border-amber-400'
                      : 'bg-white/70 text-slate-400 border-dashed border-slate-300/90 hover:border-slate-400'
                  }`}
                >
                  <span>{val !== null ? val : idx + 1}</span>
                  {val === null && !isCompact && (
                    <span className="text-[8px] font-sans font-semibold opacity-75 leading-none">
                      {isEndpoint && showEndpointHint ? 'End' : 'slot'}
                    </span>
                  )}
                </button>

                {/* Bridge Between Adjacent Slots */}
                {bridge && (
                  <div
                    className={`px-1 py-0.5 rounded-md text-[10px] font-mono font-bold tabular-nums border transition-colors ${
                      bridge.sum === null
                        ? 'border-transparent text-slate-300'
                        : bridge.valid
                        ? 'bg-emerald-100/90 text-emerald-900 border-emerald-300'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}
                    title={
                      bridge.sum !== null
                        ? bridge.valid
                          ? `Square sum: ${bridge.sum}`
                          : `Sum ${bridge.sum} is not a square`
                        : undefined
                    }
                  >
                    {bridge.sum !== null ? (bridge.valid ? `=${bridge.sum}✓` : `${bridge.sum}✗`) : '·'}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Number Card Tray (1 to 17) */}
      <div className="flex flex-col gap-1.5 pt-1 border-t border-slate-100 shrink-0">
        {!isCompact && (
          <span className="text-micro font-bold text-slate-500">
            Available Cards (1 to 17):
          </span>
        )}
        <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
          {Array.from({ length: TOTAL_CARDS }, (_, i) => i + 1).map((num) => {
            const isUsed = usedSet.has(num);
            const isHintEnd = showEndpointHint && (num === 16 || num === 17);
            return (
              <button
                key={`tray-${num}`}
                type="button"
                disabled={isUsed}
                draggable={!isUsed}
                onDragStart={() => setDraggedCard({ num, fromSlotIdx: null })}
                onClick={() => handleTrayCardTap(num)}
                className={`${
                  isCompact || isNarrow
                    ? 'min-w-[32px] min-h-[34px] px-1.5 text-micro rounded-lg'
                    : 'min-w-[40px] min-h-[40px] px-2 text-small rounded-xl'
                } border-2 font-mono font-black tabular-nums transition-colors flex items-center justify-center ${
                  isUsed
                    ? 'bg-slate-100 text-slate-300 border-slate-200/70 cursor-not-allowed'
                    : isHintEnd
                    ? 'bg-amber-100 text-amber-950 border-amber-400 hover:bg-amber-200 cursor-pointer'
                    : 'bg-white text-[#005583] border-sky-200 hover:border-[#005583] hover:bg-sky-50 cursor-pointer'
                }`}
              >
                {num}
              </button>
            );
          })}
        </div>
      </div>

      {/* Validation Message Banner */}
      {checkMessage.status !== 'idle' && (
        <div
          className={`p-3 rounded-2xl border flex items-center gap-2.5 text-small font-bold animate-fade-rise ${
            checkMessage.status === 'valid'
              ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
              : checkMessage.status === 'incomplete'
              ? 'bg-sky-50 text-blue-900 border-sky-200'
              : 'bg-amber-50 text-amber-950 border-amber-300'
          }`}
        >
          {checkMessage.status === 'valid' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
          )}
          <span>{checkMessage.text}</span>
        </div>
      )}
    </div>
  );
};
