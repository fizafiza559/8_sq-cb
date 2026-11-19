/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { QuickCheckQuestion } from '../types';
import { Katex } from './Katex';
import { HighlightHeadline } from './HighlightHeadline';
import { COLORS } from '../design/tokens';
import {
  CheckCircle2,
  RotateCcw,
  Sparkles,
  XCircle,
} from 'lucide-react';
import { useViewportTier } from '../hooks/useViewportTier';
import { QuickCheckVisualizerStage } from './quickcheck/QuickCheckVisualizerStage';

interface QuickCheckProps {
  questions: QuickCheckQuestion[];
  currentIndex: number; // 0..questions.length-1 = question slides, questions.length = result slide
  answers: Record<number, number>;
  solutionStepsRevealed: Record<number, number>;
  onSelectOption: (questionIdx: number, optionIdx: number) => void;
  onRevealNextStep: (questionIdx: number) => void;
  onRevealAllSteps?: (questionIdx: number) => void;
  onResetQuestion?: (questionIdx: number) => void;
  onNext: () => void;
  onReviewScene: () => void;
  onNextScene: () => void;
  sceneId?: string;
}

export const QuickCheck: React.FC<QuickCheckProps> = ({
  questions,
  currentIndex,
  answers,
  solutionStepsRevealed,
  onSelectOption,
  onRevealNextStep,
  onRevealAllSteps,
  onResetQuestion,
  onNext,
  onReviewScene,
  onNextScene,
  sceneId,
}) => {
  const { tier } = useViewportTier();
  const isCompact = tier === 'compact';

  if (!questions || questions.length === 0) return null;

  // Result Slide
  if (currentIndex >= questions.length) {
    const correctCount = questions.filter((q, idx) => answers[idx] === q.correctIndex).length;
    const scoreText = `${correctCount} out of ${questions.length}`;

    return (
      <div className="w-full max-w-[900px] h-full max-h-full min-h-0 overflow-hidden mx-auto flex flex-col items-center justify-center text-center gap-3 sm:gap-4 py-2 px-2 animate-fade-rise">
        <HighlightHeadline
          text={`You got ${scoreText} right`}
          focusWord={scoreText}
          focusColor="root"
        />

        <p className="text-body max-w-lg" style={{ color: COLORS.mutedText }}>
          {correctCount === questions.length
            ? 'Clean sweep! You are ready for the next idea.'
            : 'Review any step from the step rail or jump straight to the next scene.'}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onReviewScene}
            className="px-5 py-2.5 rounded-full border bg-white text-ui font-semibold min-h-[44px] flex items-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer"
            style={{ borderColor: COLORS.divider, color: COLORS.headingText }}
          >
            <RotateCcw className="w-4 h-4" />
            Review the scene
          </button>
          <button
            type="button"
            onClick={onNextScene}
            className="px-6 py-2.5 rounded-full text-ui font-semibold min-h-[44px] text-white transition-colors cursor-pointer"
            style={{ backgroundColor: COLORS.primary }}
          >
            Next scene →
          </button>
        </div>
      </div>
    );
  }

  const q = questions[currentIndex];
  const selectedOption = answers[currentIndex];
  const hasAnswered = selectedOption !== undefined;
  const isCorrect = selectedOption === q.correctIndex;

  /* ========================================================================= */
  /* PHASE 1: UNATTEMPTED (Centered, Compact, Grouped Together, Zero Spoilers) */
  /* ========================================================================= */
  if (!hasAnswered) {
    return (
      <div
        key={`qc-slide-unattempted-${currentIndex}`}
        data-no-nav="true"
        className="w-full max-w-6xl mx-auto h-full min-h-0 flex flex-col items-center justify-center py-2 px-1 overflow-hidden animate-fade-rise"
      >
        <section
          aria-label="Quick Check question"
          className={`w-full max-w-2xl bg-white border border-slate-200/80 rounded-3xl ${
            isCompact ? 'p-3.5 gap-2.5' : 'p-4 sm:p-6 gap-3.5'
          } flex flex-col shadow-xs my-auto max-h-full overflow-y-auto no-scrollbar`}
        >
          {/* Metadata Header */}
          <div className="flex items-center justify-between gap-2 flex-wrap text-micro shrink-0">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg bg-sky-50 text-[#005583] font-extrabold uppercase tracking-wide border border-sky-100">
              Quick Check
            </span>
            <span className="font-bold text-slate-600 tabular-nums">
              Question {currentIndex + 1} of {questions.length}
            </span>
          </div>

          {/* Question Statement & Optional KaTeX */}
          <div className="flex flex-col gap-2 shrink-0">
            <h3 className="text-statement sm:text-title font-extrabold text-slate-900 leading-snug">
              {q.prompt}
            </h3>
            {q.latex && q.latex.length > 0 && (
              <div
                className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/60 inline-flex flex-wrap items-center gap-x-4 gap-y-1 max-w-full break-words math-step font-medium"
                style={{ color: COLORS.primary }}
              >
                {q.latex.map((l, i) => (
                  <Katex key={i} latex={l} displayMode={false} />
                ))}
              </div>
            )}
          </div>

          {/* Answer Options */}
          <div className="pt-1 flex flex-col gap-2 shrink-0">
            <span className="text-micro font-bold text-slate-600 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#005583]" />
              <span>Choose your answer to unlock the step-by-step solution:</span>
            </span>
            <div className={`grid ${isCompact ? 'grid-cols-2 gap-2' : 'grid-cols-1 sm:grid-cols-2 gap-2'}`}>
              {q.options.map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSelectOption(currentIndex, idx)}
                  className={`${
                    isCompact ? 'min-h-[40px] px-3 py-2' : 'min-h-[46px] px-3.5 py-2.5'
                  } rounded-2xl border border-slate-200/90 bg-white hover:bg-sky-50/70 hover:border-[#005583]/60 text-small font-bold text-slate-800 text-left flex items-center gap-2.5 cursor-pointer transition-all shadow-2xs group`}
                >
                  <span className="w-6 h-6 rounded-lg bg-slate-100 group-hover:bg-[#005583] group-hover:text-white transition-colors text-micro font-bold text-slate-700 flex items-center justify-center shrink-0 tabular-nums">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-snug">{opt}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  /* ========================================================================= */
  /* PHASE 2: ATTEMPTED (2-Column Split: Question Left, Solution Right)        */
  /* ========================================================================= */
  return (
    <div
      key={`qc-slide-attempted-${currentIndex}`}
      data-no-nav="true"
      className="w-full max-w-6xl mx-auto h-full min-h-0 flex flex-col md:flex-row gap-2.5 md:gap-3 lg:gap-4 overflow-hidden animate-fade-rise"
    >
      {/* LEFT COLUMN — QUESTION & SELECTED ANSWER */}
      <section
        aria-label="Active quick check question"
        className="w-full md:w-[42%] lg:w-[40%] max-h-[45%] md:max-h-full bg-white border border-slate-200/80 rounded-3xl p-3.5 sm:p-4 flex flex-col justify-between gap-2.5 overflow-y-auto no-scrollbar shadow-2xs shrink-0"
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2 flex-wrap text-micro">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg bg-sky-50 text-[#005583] font-bold">
              Quick Check · {currentIndex + 1} / {questions.length}
            </span>
            <span
              className={`font-bold ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}
            >
              {isCorrect ? 'Correct!' : 'Review Answer'}
            </span>
          </div>

          <div>
            <h3 className="text-statement font-extrabold text-slate-900 leading-snug">
              {q.prompt}
            </h3>
            {q.latex && q.latex.length > 0 && (
              <div
                className="mt-1.5 px-3 py-1.5 rounded-xl bg-slate-50/90 border border-slate-200/60 inline-flex flex-wrap items-center gap-x-4 gap-y-1 max-w-full break-words math-step font-medium"
                style={{ color: COLORS.primary }}
              >
                {q.latex.map((l, i) => (
                  <Katex key={i} latex={l} displayMode={false} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Options Status */}
        <div className="p-2.5 rounded-2xl bg-slate-50/80 border border-slate-200/70 flex flex-col gap-1.5 shrink-0">
          <span className="text-micro font-bold text-slate-600">Your Answer:</span>
          <div className="flex flex-col gap-1">
            {q.options.map((opt, optIdx) => {
              const isSelected = selectedOption === optIdx;
              const isRightOption = q.correctIndex === optIdx;

              let optionStyle = 'bg-white border-slate-200/70 text-slate-600 opacity-60';
              if (isRightOption) {
                optionStyle =
                  'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-1 ring-emerald-500/30 opacity-100';
              } else if (isSelected && !isRightOption) {
                optionStyle =
                  'bg-rose-50 border-rose-400 text-rose-950 font-semibold ring-1 ring-rose-400/30 opacity-100';
              }

              return (
                <div
                  key={optIdx}
                  className={`px-2.5 py-1.5 rounded-xl border text-micro sm:text-small flex items-center justify-between gap-2 ${optionStyle}`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-5 h-5 rounded-md font-mono text-micro font-bold flex items-center justify-center shrink-0 bg-white/80">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="leading-snug truncate">{opt}</span>
                  </div>
                  {isRightOption && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                  {isSelected && !isRightOption && (
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* RIGHT COLUMN — FULL INTERACTIVE VISUAL SOLUTION STAGE */}
      <section
        aria-label="Interactive Visual Solution Stage"
        className="w-full md:w-[58%] lg:w-[60%] flex-1 min-h-0 md:h-full overflow-hidden"
      >
        <QuickCheckVisualizerStage
          sceneId={sceneId || ''}
          questionIndex={currentIndex}
          onNext={onNext}
          onReset={onResetQuestion ? () => onResetQuestion(currentIndex) : undefined}
          isCorrect={isCorrect}
          isLastQuestion={currentIndex === questions.length - 1}
        />
      </section>
    </div>
  );
};
