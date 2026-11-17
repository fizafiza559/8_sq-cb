/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { COLORS } from '../design/tokens';
import { isSquare, solveSquarePairsRow } from '../math/facts';
import {
  CheckCircle2,
  RotateCcw,
  Lightbulb,
  Wand2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

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
      className={`w-full max-w-4xl mx-auto rounded-3xl border bg-white p-4 sm:p-6 shadow-xs flex flex-col gap-5 ${className}`}
      style={{ borderColor: COLORS.divider }}
    >
      {/* Header & Progress */}
      <div
        className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b pb-4"
        style={{ borderColor: COLORS.divider }}
      >
        <div>
          <div className="flex items-center gap-2 text-micro text-slate-500 font-semibold">
            <span>Challenge Game</span>
            <span aria-hidden="true">·</span>
            <span>Sums Must Be 4, 9, 16, or 25</span>
          </div>
          <h3 className="text-statement font-extrabold text-slate-900 mt-0.5">
            Square Pairs 1–17 Puzzle
          </h3>
        </div>

        <div className="flex items-center gap-3 text-small font-bold tabular-nums">
          <span className="text-slate-600">
            Cards: <strong className="text-slate-900">{placedCount}/17</strong>
          </span>
          <span aria-hidden="true" className="text-slate-300">|</span>
          <span className="text-emerald-700">
            Green Links: <strong>{validPairsCount}/16</strong>
          </span>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setShowEndpointHint((h) => !h)}
            className={`min-h-[40px] px-3.5 py-2 rounded-xl text-small font-bold border flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              showEndpointHint
                ? 'bg-amber-100 text-amber-950 border-amber-400'
                : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
            }`}
          >
            <Lightbulb className="w-4 h-4 text-amber-600" />
            <span>{showEndpointHint ? 'Hide Endpoint Hint' : 'Hint (16 & 17)'}</span>
          </button>

          <button
            type="button"
            onClick={handleShowSolution}
            className="min-h-[40px] px-3.5 py-2 rounded-xl text-small font-bold border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
          >
            <Wand2 className="w-4 h-4 text-purple-600" />
            <span>Example Path</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAutoCheck}
            className="min-h-[40px] px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-small font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer whitespace-nowrap shrink-0"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Check Sequence</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="min-h-[40px] w-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 flex items-center justify-center cursor-pointer shrink-0"
            title="Clear Board"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Endpoint Hint Box */}
      {showEndpointHint && (
        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-small text-amber-950 flex items-start gap-2.5 animate-fade-rise">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong>Endpoint Secret:</strong> Look at <strong>16</strong> and <strong>17</strong>!
            <br />
            17 can only pair with <strong>8</strong> (17 + 8 = 25), and 16 can only pair with{' '}
            <strong>9</strong> (16 + 9 = 25). Since each has only <strong>1</strong> partner, 16 and 17 MUST sit at the two ends!
          </div>
        </div>
      )}

      {/* Sequence Board (17 Slots with Neighbor Bridge Badges) */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-micro text-slate-500 font-medium">
          <span>
            Tap cards below to fill slots · Tap two slots to swap · Drag cards on desktop
          </span>
          {selectedSlotIdx !== null && (
            <span className="font-bold text-[#005583]">
              Slot #{selectedSlotIdx + 1} selected — tap another slot to swap or tap again to remove
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-y-3 gap-x-1">
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
                  className={`min-w-[44px] min-h-[48px] px-2 rounded-xl border-2 font-mono text-small font-black tabular-nums transition-all cursor-pointer flex flex-col items-center justify-center relative ${
                    isSelected
                      ? 'bg-[#005583] text-white border-[#003F62] ring-2 ring-sky-300 scale-105'
                      : val !== null
                      ? showEndpointHint && (val === 16 || val === 17)
                        ? 'bg-amber-100 text-amber-950 border-amber-500 shadow-2xs'
                        : 'bg-white text-slate-900 border-slate-300 shadow-2xs hover:border-[#005583]'
                      : isEndpoint && showEndpointHint
                      ? 'bg-amber-50/70 text-amber-800 border-dashed border-amber-400'
                      : 'bg-slate-100/70 text-slate-400 border-dashed border-slate-300 hover:border-slate-400'
                  }`}
                >
                  <span>{val !== null ? val : idx + 1}</span>
                  {val === null && (
                    <span className="text-[9px] font-sans font-semibold opacity-75">
                      {isEndpoint && showEndpointHint ? 'End' : 'slot'}
                    </span>
                  )}
                </button>

                {/* Bridge Between Adjacent Slots */}
                {bridge && (
                  <div
                    className={`px-1.5 py-0.5 rounded-md text-[11px] font-mono font-extrabold tabular-nums border transition-all ${
                      bridge.sum === null
                        ? 'border-transparent text-slate-300'
                        : bridge.valid
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-400 shadow-2xs'
                        : 'bg-rose-50 text-rose-700 border-rose-300'
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
      <div className="flex flex-col gap-2">
        <span className="text-micro font-bold text-slate-600">
          Available Number Cards (1 to 17):
        </span>
        <div className="flex flex-wrap items-center gap-2">
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
                className={`min-w-[44px] min-h-[44px] px-2.5 rounded-xl border-2 font-mono text-small font-black tabular-nums transition-all flex items-center justify-center ${
                  isUsed
                    ? 'bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed'
                    : isHintEnd
                    ? 'bg-amber-100 text-amber-950 border-amber-500 hover:bg-amber-200 cursor-pointer shadow-2xs'
                    : 'bg-white text-[#005583] border-sky-200 hover:border-[#005583] hover:bg-sky-50 cursor-pointer shadow-2xs'
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
          className={`p-4 rounded-2xl border flex items-center gap-2.5 text-small font-bold animate-fade-rise ${
            checkMessage.status === 'valid'
              ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
              : checkMessage.status === 'incomplete'
              ? 'bg-blue-50 text-blue-900 border-blue-200'
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
