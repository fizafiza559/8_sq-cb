/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { COLORS } from '../design/tokens';
import { Katex } from '../components/Katex';
import {
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';

export interface OddSubtractionSceneProps {
  className?: string;
  initialStep?: number;
}

interface SubStep {
  stepNum: number;
  odd: number;
  from: number;
  result: number;
}

const STEPS_25: SubStep[] = [
  { stepNum: 1, odd: 1, from: 25, result: 24 },
  { stepNum: 2, odd: 3, from: 24, result: 21 },
  { stepNum: 3, odd: 5, from: 21, result: 16 },
  { stepNum: 4, odd: 7, from: 16, result: 9 },
  { stepNum: 5, odd: 9, from: 9, result: 0 },
];

const STEPS_38: SubStep[] = [
  { stepNum: 1, odd: 1, from: 38, result: 37 },
  { stepNum: 2, odd: 3, from: 37, result: 34 },
  { stepNum: 3, odd: 5, from: 34, result: 29 },
  { stepNum: 4, odd: 7, from: 29, result: 22 },
  { stepNum: 5, odd: 9, from: 22, result: 13 },
  { stepNum: 6, odd: 11, from: 13, result: 2 },
  { stepNum: 7, odd: 13, from: 2, result: -11 },
];

export const OddSubtractionScene: React.FC<OddSubtractionSceneProps> = ({
  className = '',
  initialStep = 0,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(initialStep);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  const maxSteps = 7;

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= maxSteps) {
            setIsPlaying(false);
            return maxSteps;
          }
          return prev + 1;
        });
      }, 850);
    } else if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying]);

  const handleStepNext = () => {
    setIsPlaying(false);
    setCurrentStep((s) => Math.min(maxSteps, s + 1));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const is25Finished = currentStep >= 5;
  const is38Overshot = currentStep >= 6;

  return (
    <div
      data-no-nav="true"
      className={`w-full max-w-4xl mx-auto flex flex-col gap-5 bg-white p-4 sm:p-6 rounded-3xl border shadow-xs ${className}`}
      style={{ borderColor: COLORS.divider }}
    >
      {/* Header & Controls */}
      <div
        className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b pb-3.5"
        style={{ borderColor: COLORS.divider }}
      >
        <div>
          <span className="text-micro font-bold uppercase tracking-wider text-slate-500">
            Animation 5 • Repeated Odd Subtraction Test
          </span>
          <h3 className="text-statement font-extrabold text-slate-900 mt-0.5">
            Subtract 1, 3, 5, 7, 9... Side by Side: 25 vs 38
          </h3>
        </div>

        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <button
            type="button"
            onClick={handleStepNext}
            disabled={currentStep >= maxSteps}
            className={`min-h-[40px] px-3.5 py-2 rounded-xl text-small font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              currentStep >= maxSteps
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-2xs'
            }`}
          >
            <span>Step Subtraction</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => {
              if (currentStep >= maxSteps) setCurrentStep(0);
              setIsPlaying((p) => !p);
            }}
            className={`min-h-[40px] px-3.5 py-2 rounded-xl text-small font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              isPlaying
                ? 'bg-amber-600 text-white'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? 'Pause' : 'Auto-Play'}</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="min-h-[40px] w-10 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 cursor-pointer flex items-center justify-center shrink-0"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Side-by-Side Comparison Ladders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {/* LEFT COLUMN: 25 (Perfect Square) */}
        <div
          className={`p-4 sm:p-5 rounded-2xl border flex flex-col gap-3.5 transition-all ${
            is25Finished
              ? 'bg-emerald-50/75 border-emerald-300 ring-2 ring-emerald-400/20'
              : 'bg-slate-50/70 border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-mono font-bold text-small flex items-center justify-center">
                25
              </span>
              <div>
                <h4 className="text-small font-extrabold text-slate-900 leading-tight">
                  Testing Number 25
                </h4>
                <span className="text-micro text-slate-500">Goal: Land on 0</span>
              </div>
            </div>

            {is25Finished && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-micro font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Perfect Square!</span>
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5 min-h-[245px]">
            {currentStep === 0 ? (
              <div className="my-auto text-center p-5 text-small text-slate-500">
                Tap <strong>Step Subtraction</strong> or <strong>Auto-Play</strong> to subtract 1, 3, 5, 7, 9...
              </div>
            ) : (
              STEPS_25.slice(0, currentStep).map((st) => {
                const isFinal = st.stepNum === 5;
                return (
                  <div
                    key={st.stepNum}
                    className={`p-2.5 rounded-xl border flex items-center justify-between text-small transition-all animate-fade-rise ${
                      isFinal
                        ? 'bg-emerald-100 text-emerald-950 border-emerald-400 font-bold'
                        : 'bg-white text-slate-800 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-100 font-mono text-micro font-bold text-slate-600 flex items-center justify-center">
                        {st.stepNum}
                      </span>
                      <span className="font-mono">
                        {st.from} − <strong className="text-purple-700">{st.odd}</strong> =
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-small">{st.result}</span>
                      {isFinal && (
                        <span className="text-micro font-bold text-emerald-800 bg-white px-2 py-0.5 rounded-md border border-emerald-300">
                          Hits 0!
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {is25Finished ? (
            <div className="p-3.5 rounded-xl bg-white border border-emerald-300 shadow-2xs flex flex-col gap-1 animate-fade-rise">
              <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-small">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Hits 0 in 5 steps!</span>
              </div>
              <div className="text-small text-slate-800 flex items-center gap-2">
                <span>Square root is the step count:</span>
                <Katex latex={`\\sqrt{25} = 5`} displayMode={false} />
              </div>
            </div>
          ) : (
            <div className="text-micro text-slate-500 text-center">
              Leftover now:{' '}
              <strong>{STEPS_25[Math.min(4, Math.max(0, currentStep - 1))]?.result ?? 25}</strong>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: 38 (Not a Square) */}
        <div
          className={`p-4 sm:p-5 rounded-2xl border flex flex-col gap-3.5 transition-all ${
            is38Overshot
              ? 'bg-amber-50/75 border-amber-300 ring-2 ring-amber-400/20'
              : 'bg-slate-50/70 border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-amber-600 text-white font-mono font-bold text-small flex items-center justify-center">
                38
              </span>
              <div>
                <h4 className="text-small font-extrabold text-slate-900 leading-tight">
                  Testing Number 38
                </h4>
                <span className="text-micro text-slate-500">Goal: Land on 0</span>
              </div>
            </div>

            {is38Overshot && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-micro font-bold bg-amber-100 text-amber-900 border border-amber-300">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>Not a Square</span>
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5 min-h-[245px]">
            {currentStep === 0 ? (
              <div className="my-auto text-center p-5 text-small text-slate-500">
                Watch what happens when we subtract 1, 3, 5, 7, 9, 11, 13 from 38!
              </div>
            ) : (
              STEPS_38.slice(0, currentStep).map((st) => {
                const isOvershoot = st.stepNum === 7;
                return (
                  <div
                    key={st.stepNum}
                    className={`p-2.5 rounded-xl border flex items-center justify-between text-small transition-all animate-fade-rise ${
                      isOvershoot
                        ? 'bg-rose-100 text-rose-950 border-rose-300 font-bold'
                        : st.stepNum === 6
                        ? 'bg-amber-100 text-amber-950 border-amber-300 font-bold'
                        : 'bg-white text-slate-800 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-100 font-mono text-micro font-bold text-slate-600 flex items-center justify-center">
                        {st.stepNum}
                      </span>
                      <span className="font-mono">
                        {st.from} − <strong className="text-purple-700">{st.odd}</strong> =
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-small">{st.result}</span>
                      {st.stepNum === 6 && (
                        <span className="text-micro font-bold text-amber-900 bg-white px-2 py-0.5 rounded-md border border-amber-300">
                          Remainder 2
                        </span>
                      )}
                      {isOvershoot && (
                        <span className="text-micro font-bold text-rose-700 bg-white px-2 py-0.5 rounded-md border border-rose-300">
                          Overshot!
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {is38Overshot ? (
            <div className="p-3.5 rounded-xl bg-white border border-amber-300 shadow-2xs flex flex-col gap-1 animate-fade-rise">
              <div className="flex items-center gap-1.5 text-amber-800 font-bold text-small">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Overshot 0! 38 is NOT a perfect square.</span>
              </div>
              <p className="text-small text-slate-700">
                After subtracting 11, only <strong>2</strong> is left. Subtracting the next odd (13) jumps past 0 to <strong>−11</strong>!
              </p>
            </div>
          ) : (
            <div className="text-micro text-slate-500 text-center">
              Leftover now:{' '}
              <strong>{STEPS_38[Math.min(6, Math.max(0, currentStep - 1))]?.result ?? 38}</strong>
            </div>
          )}
        </div>
      </div>

      {/* Summary Footer */}
      <div className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <p className="text-small font-medium text-slate-800 leading-relaxed">
          If subtracting 1, 3, 5, 7... stops cleanly at <strong>0</strong>, the number is a perfect square—and the number of steps is its <strong>square root</strong>!
        </p>
      </div>
    </div>
  );
};
