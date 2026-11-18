/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { isSquare, solveSquarePairsRow } from '../math/facts';
import { Katex } from '../components/Katex';
import {
  CheckCircle2,
  RotateCcw,
  Lightbulb,
  Wand2,
  AlertCircle,
  Sparkles,
  HelpCircle,
  CircleDot,
  X,
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
  const [showCircleModal, setShowCircleModal] = useState<boolean>(false);
  const [mobileTab, setMobileTab] = useState<'story' | 'board'>('board');
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
        text: 'Amazing! All 16 adjacent pairs add up to perfect squares (4, 9, 16, or 25)!',
      });
    } else {
      setCheckMessage({
        status: 'invalid',
        text: `${validPairsCount} of 16 links are squares. Swap cards to fix the red links!`,
      });
    }
  };

  const handleShowSolution = () => {
    setSlots([...sampleSolution]);
    setSelectedSlotIdx(null);
    setCheckMessage({
      status: 'valid',
      text: 'Loaded a valid 1–17 path! Notice 16 and 17 sit at the two ends.',
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
      className={`w-full max-w-6xl h-full max-h-full min-h-0 overflow-hidden mx-auto rounded-3xl border border-slate-200/80 bg-white ${
        isCompact ? 'p-2 gap-1.5' : 'p-3 sm:p-4 gap-2.5 sm:gap-3'
      } shadow-2xs flex flex-col justify-between ${className}`}
    >
      {/* 1. TOP HEADER: Official NCERT PUZZLE Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-slate-100 pb-2 shrink-0">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 font-black text-micro uppercase tracking-wider flex items-center gap-1.5 shadow-2xs">
            <span>🧩 IT&apos;S PUZZLE TIME!</span>
          </div>
          <h3 className="text-small sm:text-statement md:text-title font-black text-slate-900">
            Square Pairs!
          </h3>
        </div>

        {/* Mobile View Toggle */}
        <div className="flex md:hidden items-center justify-between gap-2 w-full pt-1">
          <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-100 text-micro font-bold">
            <button
              type="button"
              onClick={() => setMobileTab('board')}
              className={`px-3 py-1 rounded-md transition-colors ${
                mobileTab === 'board' ? 'bg-white text-[#005583] shadow-2xs' : 'text-slate-600'
              }`}
            >
              Play Board (1–17)
            </button>
            <button
              type="button"
              onClick={() => setMobileTab('story')}
              className={`px-3 py-1 rounded-md transition-colors ${
                mobileTab === 'story' ? 'bg-white text-[#005583] shadow-2xs' : 'text-slate-600'
              }`}
            >
              Rules &amp; Story
            </button>
          </div>

          <span className="text-micro font-bold text-slate-700 tabular-nums">
            {placedCount}/17 placed
          </span>
        </div>

        {/* Desktop Progress */}
        <div className="hidden md:flex items-center gap-3 text-small font-semibold tabular-nums">
          <span className="text-slate-600">
            Placed <strong className="text-slate-900">{placedCount}/17</strong>
          </span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="text-emerald-700">
            Square Links <strong>{validPairsCount}/16</strong>
          </span>
        </div>
      </div>

      {/* 2. MAIN TWO-COLUMN BODY */}
      <div className="flex-1 min-h-0 flex flex-col md:flex-row gap-3 lg:gap-4 overflow-hidden">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: THE PUZZLE STORY, RULES & 1-32 CIRCLE TEASER                 */}
        {/* ========================================================================= */}
        <div
          className={`w-full md:w-[42%] lg:w-[40%] flex flex-col justify-between gap-2.5 p-3 sm:p-4 rounded-2xl bg-amber-50/60 border border-amber-200/70 overflow-y-auto no-scrollbar shrink-0 ${
            mobileTab === 'board' ? 'hidden md:flex' : 'flex'
          }`}
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-micro font-extrabold uppercase tracking-wide text-amber-900">
              <HelpCircle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span>How Square Pairs Work</span>
            </div>

            <p className="text-micro sm:text-small text-slate-800 leading-snug">
              Look at these five numbers: <strong className="font-mono text-slate-950 font-black">3, 6, 10, 15, 1</strong>
            </p>

            <div className="p-2 sm:p-2.5 rounded-xl bg-white/90 border border-amber-200 flex flex-col gap-1 shadow-2xs font-mono text-micro sm:text-small">
              <div className="flex items-center justify-between text-emerald-900">
                <span>3 + 6 = 9</span>
                <span className="text-[11px] font-sans font-bold text-emerald-700">(3²)</span>
              </div>
              <div className="flex items-center justify-between text-emerald-900">
                <span>6 + 10 = 16</span>
                <span className="text-[11px] font-sans font-bold text-emerald-700">(4²)</span>
              </div>
              <div className="flex items-center justify-between text-emerald-900">
                <span>10 + 15 = 25</span>
                <span className="text-[11px] font-sans font-bold text-emerald-700">(5²)</span>
              </div>
              <div className="flex items-center justify-between text-emerald-900">
                <span>15 + 1 = 16</span>
                <span className="text-[11px] font-sans font-bold text-emerald-700">(4²)</span>
              </div>
            </div>

            <p className="text-micro sm:text-small text-slate-800 leading-snug">
              Each pair of adjacent numbers adds up to a square!
            </p>

            {/* Challenge description */}
            <div className="p-2.5 rounded-xl bg-amber-100/70 border border-amber-300/80 flex flex-col gap-1 text-micro sm:text-small text-amber-950">
              <strong className="font-extrabold text-[#005583]">Your Mission:</strong>
              <span>
                Arrange all numbers from <strong>1 to 17</strong> (no repeats) in a row so that <em>every adjacent pair</em> sums to a square.
              </span>
              <span className="text-[11px] text-amber-900 font-medium mt-0.5">
                Can you arrange them in more than one way? If not, can you explain why?
              </span>
            </div>
          </div>

          {/* Bonus 1 to 32 Circle Challenge Card */}
          <div className="p-2.5 rounded-xl bg-white border border-pink-200 flex flex-col gap-1.5 shadow-2xs shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-pink-700 flex items-center gap-1">
                <CircleDot className="w-3.5 h-3.5 text-pink-600" />
                <span>Textbook Bonus: 1 to 32 Circle</span>
              </span>
              <button
                type="button"
                onClick={() => setShowCircleModal(true)}
                className="text-[11px] font-bold text-[#005583] hover:underline cursor-pointer"
              >
                View Circle →
              </button>
            </div>
            <p className="text-micro text-slate-600 leading-snug">
              Can you do the same with numbers 1 to 32, but arranging them in a <strong>closed circle</strong>?
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: INTERACTIVE SEQUENCE SLOTS & NUMBER CARD TRAY               */}
        {/* ========================================================================= */}
        <div
          className={`w-full md:w-[58%] lg:w-[60%] flex flex-col justify-between gap-2 sm:gap-2.5 overflow-hidden ${
            mobileTab === 'story' ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Action Toolbar */}
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
                className={`${isCompact ? 'min-h-[34px] px-3' : 'min-h-[38px] px-3.5'} py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-micro sm:text-small font-bold flex items-center gap-1.5 cursor-pointer shrink-0 shadow-2xs`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Check</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className={`${isCompact ? 'min-h-[34px] w-9' : 'min-h-[38px] w-10'} rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-600 flex items-center justify-center cursor-pointer shrink-0 shadow-2xs`}
                title="Clear Board"
                aria-label="Clear Board"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Endpoint Hint Box */}
          {showEndpointHint && (
            <div className="p-2 sm:p-2.5 rounded-xl bg-amber-50 border border-amber-300 text-micro sm:text-small text-amber-950 flex items-start gap-2 animate-fade-rise shrink-0">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="leading-snug">
                <strong>Why only one way?</strong> In 1..17, <strong>17</strong> only adds with <strong>8</strong> to make 25, and <strong>16</strong> only adds with <strong>9</strong> to make 25. Having only 1 partner each, 16 and 17 must be the two end cards!
              </div>
            </div>
          )}

          {/* Sequence Board: 17 Slots in a Clean Scroll-Free Wrap */}
          <div className="p-2 sm:p-3 rounded-2xl bg-slate-50/80 border border-slate-200/70 flex flex-col justify-center flex-1 min-h-0 overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold mb-1.5 shrink-0">
              <span>Row Sequence (1 to 17):</span>
              {selectedSlotIdx !== null && (
                <span className="text-[#005583] font-bold">
                  Slot #{selectedSlotIdx + 1} selected
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-y-1.5 gap-x-1">
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
                          ? 'w-8 h-8 sm:w-9 sm:h-9 text-micro rounded-lg'
                          : 'w-10 h-10 sm:w-11 sm:h-11 text-small sm:text-statement rounded-xl'
                      } border-2 font-mono font-black tabular-nums transition-all cursor-pointer flex flex-col items-center justify-center relative shadow-2xs ${
                        isSelected
                          ? 'bg-[#005583] text-white border-[#003F62] ring-2 ring-sky-300 scale-105'
                          : val !== null
                          ? showEndpointHint && (val === 16 || val === 17)
                            ? 'bg-amber-100 text-amber-950 border-amber-500'
                            : 'bg-white text-slate-900 border-slate-300/90 hover:border-[#005583]'
                          : isEndpoint && showEndpointHint
                          ? 'bg-amber-50/80 text-amber-800 border-dashed border-amber-400'
                          : 'bg-white/80 text-slate-400 border-dashed border-slate-300/90 hover:border-slate-400'
                      }`}
                    >
                      <span>{val !== null ? val : idx + 1}</span>
                    </button>

                    {/* Bridge Between Adjacent Slots */}
                    {bridge && (
                      <div
                        className={`px-1 py-0.5 rounded-md text-[10px] font-mono font-bold tabular-nums border transition-colors ${
                          bridge.sum === null
                            ? 'border-transparent text-slate-300'
                            : bridge.valid
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
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

          {/* Number Card Tray (Circles of options on the right) */}
          <div className="flex flex-col gap-1 pt-1 border-t border-slate-100 shrink-0">
            <span className="text-[11px] sm:text-micro font-bold text-slate-600">
              Card Options (Tap to place in row):
            </span>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1 sm:gap-1.5">
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
                        ? 'w-8 h-8 sm:w-9 sm:h-9 text-micro'
                        : 'w-10 h-10 sm:w-11 sm:h-11 text-small sm:text-statement'
                    } rounded-full border-2 font-mono font-black tabular-nums transition-all flex items-center justify-center shadow-2xs ${
                      isUsed
                        ? 'bg-slate-100 text-slate-300 border-slate-200/70 cursor-not-allowed scale-90'
                        : isHintEnd
                        ? 'bg-amber-100 text-amber-950 border-amber-400 hover:bg-amber-200 cursor-pointer scale-105'
                        : 'bg-white text-[#005583] border-sky-300 hover:border-[#005583] hover:bg-sky-50 cursor-pointer hover:scale-105'
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
              className={`p-2.5 rounded-2xl border flex items-center gap-2 text-micro sm:text-small font-bold animate-fade-rise shrink-0 ${
                checkMessage.status === 'valid'
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                  : checkMessage.status === 'incomplete'
                  ? 'bg-sky-50 text-blue-900 border-sky-200'
                  : 'bg-amber-50 text-amber-950 border-amber-300'
              }`}
            >
              {checkMessage.status === 'valid' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              )}
              <span>{checkMessage.text}</span>
            </div>
          )}
        </div>
      </div>

      {/* 3. MODAL: 1 TO 32 CIRCULAR PUZZLE PREVIEW */}
      {showCircleModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/60 backdrop-blur-xs animate-fade-rise"
          onClick={() => setShowCircleModal(false)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 flex flex-col gap-3 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-2">
                <span className="text-statement font-extrabold text-pink-700">
                  Circle of 32 Squares
                </span>
                <span className="px-2 py-0.5 rounded-full bg-pink-100 text-pink-800 text-[11px] font-bold">
                  NCERT Question
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowCircleModal(false)}
                className="w-8 h-8 rounded-full border flex items-center justify-center text-slate-500 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-small text-slate-700 leading-snug">
              &quot;Can you do the same with numbers from 1 to 32 (without repetition), but this time arranging all the numbers in a circle?&quot;
            </p>

            {/* SVG Circle Preview of 32 Nodes */}
            <div className="w-full flex items-center justify-center py-2">
              <svg viewBox="0 0 280 280" className="w-64 h-64 select-none">
                <circle cx={140} cy={140} r={105} fill="none" stroke="#FCE7F3" strokeWidth={3} strokeDasharray="4 4" />
                {Array.from({ length: 32 }, (_, i) => {
                  const angle = (i * 2 * Math.PI) / 32 - Math.PI / 2;
                  const cx = 140 + 105 * Math.cos(angle);
                  const cy = 140 + 105 * Math.sin(angle);
                  return (
                    <g key={`node-${i}`}>
                      <rect
                        x={cx - 9}
                        y={cy - 9}
                        width={18}
                        height={18}
                        rx={4}
                        fill="#FDF2F8"
                        stroke="#DB2777"
                        strokeWidth={1.5}
                      />
                      <text
                        x={cx}
                        y={cy}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize={8}
                        fontWeight={800}
                        fill="#9D174D"
                      >
                        {i + 1}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border text-micro text-slate-600 leading-relaxed">
              <strong>Fun Fact:</strong> Unlike 1 to 17 which can only form a row, the numbers 1 to 32 can form a complete closed loop! For example, 32 connects to 17 (32+17=49=7²).
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
