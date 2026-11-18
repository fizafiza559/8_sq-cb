/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { QuickCheckQuestion, QuickCheckStep } from '../types';
import { Katex } from './Katex';
import { HighlightHeadline } from './HighlightHeadline';
import { COLORS } from '../design/tokens';
import { CheckCircle2, ChevronRight, RotateCcw, XCircle } from 'lucide-react';

interface QuickCheckProps {
  questions: QuickCheckQuestion[];
  currentIndex: number; // 0..questions.length-1 = question slides, questions.length = result slide
  answers: Record<number, number>;
  solutionStepsRevealed: Record<number, number>;
  onSelectOption: (questionIdx: number, optionIdx: number) => void;
  onRevealNextStep: (questionIdx: number) => void;
  onRevealAllSteps?: (questionIdx: number) => void;
  onNext: () => void;
  onReviewScene: () => void;
  onNextScene: () => void;
}

export const QuickCheck: React.FC<QuickCheckProps> = ({
  questions,
  currentIndex,
  answers,
  solutionStepsRevealed,
  onSelectOption,
  onRevealNextStep,
  onRevealAllSteps,
  onNext,
  onReviewScene,
  onNextScene,
}) => {
  if (!questions || questions.length === 0) return null;

  // Result Slide
  if (currentIndex >= questions.length) {
    const correctCount = questions.filter((q, idx) => answers[idx] === q.correctIndex).length;
    const scoreText = `${correctCount} out of ${questions.length}`;

    return (
      <div className="w-full max-w-[900px] max-h-full overflow-y-auto no-scrollbar mx-auto flex flex-col items-center text-center gap-4 py-3 animate-fade-rise">
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

  const steps: QuickCheckStep[] =
    q.solutionSteps && q.solutionSteps.length > 0
      ? q.solutionSteps
      : [{ title: 'Solution', text: q.explanation }];
  const totalSteps = steps.length;
  const visibleStepCount = Math.min(
    totalSteps,
    Math.max(1, solutionStepsRevealed[currentIndex] ?? 1)
  );
  const hasMoreSteps = visibleStepCount < totalSteps;

  return (
    <div
      key={`qc-slide-${currentIndex}`}
      className="w-full max-w-[900px] max-h-full overflow-y-auto no-scrollbar mx-auto flex flex-col items-center gap-4 py-2 animate-fade-rise"
    >
      {/* Question as the slide headline */}
      <HighlightHeadline text={q.prompt} />

      {/* Optional KaTeX equation strip */}
      {q.latex && q.latex.length > 0 && (
        <div
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 math-step font-medium"
          style={{ color: COLORS.primary }}
        >
          {q.latex.map((l, i) => (
            <Katex key={i} latex={l} displayMode={false} />
          ))}
        </div>
      )}

      {/* Large Option Buttons: 2x2 on desktop, stacked on phones */}
      <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-3">
        {q.options.map((opt, idx) => {
          let bg = '#FFFFFF';
          let border = COLORS.divider;
          let text = COLORS.headingText;

          if (hasAnswered) {
            if (idx === q.correctIndex) {
              bg = '#DCFCE7';
              border = '#16A34A';
              text = '#15803D';
            } else if (idx === selectedOption) {
              bg = '#FEE2E2';
              border = '#DC2626';
              text = '#B91C1C';
            }
          }

          return (
            <button
              key={idx}
              type="button"
              onClick={() => !hasAnswered && onSelectOption(currentIndex, idx)}
              disabled={hasAnswered}
              className="w-full text-left px-5 py-4 rounded-2xl border transition-colors flex items-center justify-between gap-3 cursor-pointer disabled:cursor-default text-ui-option font-semibold min-h-[52px] hover:border-[#005583]/60"
              style={{
                backgroundColor: bg,
                borderColor: border,
                color: text,
              }}
            >
              <span className="flex items-center gap-3 min-w-0">
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-micro tabular-nums font-bold border shrink-0"
                  style={{ borderColor: border }}
                >
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="leading-snug">{opt}</span>
              </span>
              {hasAnswered && idx === q.correctIndex && (
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
              )}
              {hasAnswered && idx === selectedOption && idx !== q.correctIndex && (
                <XCircle className="w-5 h-5 text-red-600 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Step-by-Step Solution Reveal & Next */}
      {hasAnswered && (
        <div
          data-no-nav="true"
          onClick={() => {
            if (!hasMoreSteps) return;
            const sel = window.getSelection()?.toString();
            if (sel && sel.length > 0) return;
            onRevealNextStep(currentIndex);
          }}
          className={`w-full max-w-2xl rounded-2xl border p-4 sm:p-5 flex flex-col gap-3.5 text-left animate-fade-rise ${
            hasMoreSteps ? 'cursor-pointer' : ''
          }`}
          style={{
            backgroundColor: isCorrect ? '#F0FDF4' : '#FEF2F2',
            borderColor: isCorrect ? '#86EFAC' : '#FCA5A5',
          }}
        >
          {/* Feedback Header & Step Progress */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <span
                className="text-small font-extrabold"
                style={{ color: isCorrect ? '#15803D' : '#B91C1C' }}
              >
                {isCorrect ? '✓ Right! Step-by-Step Solution' : 'Look closely — Step-by-Step Solution'}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-white/90 border border-slate-200 text-micro font-bold text-slate-700 tabular-nums">
                Step {visibleStepCount} of {totalSteps}
              </span>
            </div>

            {hasMoreSteps && onRevealAllSteps && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRevealAllSteps(currentIndex);
                }}
                className="text-micro font-bold text-[#005583] hover:underline cursor-pointer px-2 py-1 rounded-md hover:bg-white/70 transition-colors"
              >
                Show all steps
              </button>
            )}
          </div>

          {/* Revealed Solution Steps */}
          <div className="flex flex-col gap-2.5">
            {steps.slice(0, visibleStepCount).map((st, sIdx) => (
              <div
                key={sIdx}
                className="bg-white rounded-xl border border-slate-200/70 p-3.5 sm:p-4 flex flex-col gap-1.5 animate-fade-rise"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-800 text-micro font-bold flex items-center justify-center shrink-0 tabular-nums">
                    {sIdx + 1}
                  </span>
                  <span className="text-small font-bold text-slate-900">
                    {st.title || `Step ${sIdx + 1}`}
                  </span>
                </div>

                {st.latex && (
                  <div className="my-0.5 p-2.5 rounded-lg bg-blue-50/50 overflow-x-auto text-center">
                    <Katex latex={st.latex} displayMode={false} />
                  </div>
                )}

                <p className="text-small text-slate-700 leading-relaxed">{st.text}</p>
              </div>
            ))}
          </div>

          {/* Action CTA: Tap for Next Step OR Next Question */}
          <div className="flex items-center justify-center pt-1">
            {hasMoreSteps ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRevealNextStep(currentIndex);
                }}
                className="w-full min-h-[44px] px-5 py-2.5 rounded-full text-ui font-semibold text-white flex items-center justify-center gap-1.5 transition-opacity hover:opacity-95 cursor-pointer shadow-2xs"
                style={{ backgroundColor: COLORS.primary }}
              >
                <span>
                  Tap to display Step {visibleStepCount + 1} of {totalSteps}
                </span>
                <ChevronRight className="w-4 h-4 shrink-0" />
              </button>
            ) : (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
                className="px-7 py-2.5 rounded-full text-ui font-semibold min-h-[44px] text-white transition-colors cursor-pointer shadow-2xs"
                style={{ backgroundColor: COLORS.primary }}
              >
                {currentIndex < questions.length - 1 ? 'Next' : 'Finish'} →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

