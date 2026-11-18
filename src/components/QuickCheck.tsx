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
import { useViewportTier } from '../hooks/useViewportTier';

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
  const { tier, isNarrow } = useViewportTier();
  const isCompact = tier === 'compact';

  if (!questions || questions.length === 0) return null;

  // Result Slide
  if (currentIndex >= questions.length) {
    const correctCount = questions.filter((q, idx) => answers[idx] === q.correctIndex).length;
    const scoreText = `${correctCount} out of ${questions.length}`;

    return (
      <div className="w-full max-w-[900px] h-full max-h-full min-h-0 overflow-hidden mx-auto flex flex-col items-center justify-center text-center gap-3 sm:gap-4 py-2 animate-fade-rise">
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

  const showCompactStepOnly = tier !== 'spacious' || isNarrow;
  const collapseOptionsAfterAnswer = hasAnswered && (isCompact || isNarrow);
  const activeStepIdx = visibleStepCount - 1;
  const activeStep = steps[activeStepIdx];

  return (
    <div
      key={`qc-slide-${currentIndex}`}
      className={`w-full max-w-[900px] h-full max-h-full min-h-0 overflow-hidden mx-auto flex flex-col items-center justify-between ${
        isCompact ? 'gap-1.5 py-1' : 'gap-2.5 sm:gap-3.5 py-1.5'
      } px-1 animate-fade-rise`}
    >
      {/* Question Header */}
      <div className="w-full flex flex-col items-center gap-1.5 shrink-0">
        <HighlightHeadline
          text={q.prompt}
          maxWidthClass={
            isCompact
              ? 'max-w-[900px] !text-statement leading-tight'
              : isNarrow
              ? 'max-w-[900px] !text-title leading-snug'
              : 'max-w-[900px]'
          }
        />

        {/* Optional KaTeX equation strip */}
        {q.latex && q.latex.length > 0 && (
          <div
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 math-step font-medium"
            style={{ color: COLORS.primary }}
          >
            {q.latex.map((l, i) => (
              <Katex key={i} latex={l} displayMode={false} />
            ))}
          </div>
        )}
      </div>

      {/* Answer Options (collapses to crisp 1-line summary after answering on compact/narrow) */}
      {collapseOptionsAfterAnswer ? (
        <div className="w-full max-w-2xl px-3 py-2 rounded-xl border border-slate-200 bg-white flex flex-wrap items-center justify-between gap-2 text-micro sm:text-small font-semibold shrink-0">
          <span className={isCorrect ? 'text-emerald-700' : 'text-rose-700'}>
            Your pick: <strong>{String.fromCharCode(65 + selectedOption)}. {q.options[selectedOption]}</strong>
          </span>
          {!isCorrect && (
            <span className="text-emerald-700">
              Correct: <strong>{String.fromCharCode(65 + q.correctIndex)}. {q.options[q.correctIndex]}</strong>
            </span>
          )}
        </div>
      ) : (
        <div
          className={`w-full max-w-2xl grid ${
            isCompact ? 'grid-cols-2 gap-2' : 'grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3'
          } shrink-0`}
        >
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
                className={`w-full text-left px-3 sm:px-4 ${
                  isCompact ? 'py-2 min-h-[40px] text-small' : 'py-2.5 sm:py-3 min-h-[44px] text-ui-option'
                } rounded-2xl border transition-colors flex items-center justify-between gap-2 cursor-pointer disabled:cursor-default font-semibold hover:border-[#005583]/60`}
                style={{
                  backgroundColor: bg,
                  borderColor: border,
                  color: text,
                }}
              >
                <span className="flex items-center gap-2.5 min-w-0">
                  <span
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-micro tabular-nums font-bold border shrink-0"
                    style={{ borderColor: border }}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-snug truncate sm:whitespace-normal">{opt}</span>
                </span>
                {hasAnswered && idx === q.correctIndex && (
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 shrink-0" />
                )}
                {hasAnswered && idx === selectedOption && idx !== q.correctIndex && (
                  <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Step-by-Step Solution Reveal & Next */}
      {hasAnswered ? (
        <div
          data-no-nav="true"
          onClick={() => {
            if (!hasMoreSteps) return;
            const sel = window.getSelection()?.toString();
            if (sel && sel.length > 0) return;
            onRevealNextStep(currentIndex);
          }}
          className={`w-full max-w-2xl flex-1 min-h-0 overflow-hidden rounded-2xl border ${
            isCompact ? 'p-2.5 gap-2' : 'p-3 sm:p-4 gap-2.5'
          } flex flex-col justify-between text-left animate-fade-rise ${
            hasMoreSteps ? 'cursor-pointer' : ''
          }`}
          style={{
            backgroundColor: isCorrect ? '#F0FDF4' : '#FEF2F2',
            borderColor: isCorrect ? '#86EFAC' : '#FCA5A5',
          }}
        >
          {/* Feedback Header & Step Progress */}
          <div className="flex items-center justify-between gap-2 flex-wrap shrink-0">
            <div className="flex items-center gap-2">
              <span
                className="text-micro sm:text-small font-extrabold"
                style={{ color: isCorrect ? '#15803D' : '#B91C1C' }}
              >
                {isCorrect ? '✓ Right! Solution' : 'Look closely — Solution'}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-white/90 border border-slate-200 text-micro font-bold text-slate-700 tabular-nums">
                Step {visibleStepCount} of {totalSteps}
              </span>
            </div>

            {hasMoreSteps && onRevealAllSteps && !showCompactStepOnly && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRevealAllSteps(currentIndex);
                }}
                className="min-h-[36px] text-micro font-bold text-[#005583] hover:underline cursor-pointer px-2.5 py-1 rounded-md hover:bg-white/70 transition-colors"
              >
                Show all steps
              </button>
            )}
          </div>

          {/* Revealed Solution Steps (single active step on non-spacious, stacked on spacious) */}
          <div className="flex flex-col gap-1.5 min-h-0 overflow-hidden">
            {(showCompactStepOnly ? [activeStep] : steps.slice(0, visibleStepCount)).map((st, idx) => {
              const displayIdx = showCompactStepOnly ? activeStepIdx : idx;
              return (
                <div
                  key={displayIdx}
                  className={`bg-white rounded-xl border border-slate-200/70 ${
                    isCompact ? 'p-2.5 gap-1' : 'p-3 sm:p-3.5 gap-1.5'
                  } flex flex-col animate-fade-rise`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-blue-50 text-blue-800 text-micro font-bold flex items-center justify-center shrink-0 tabular-nums">
                      {displayIdx + 1}
                    </span>
                    <span className="text-small font-bold text-slate-900">
                      {st.title || `Step ${displayIdx + 1}`}
                    </span>
                  </div>

                  {st.latex && (
                    <div className="my-0.5 px-2 py-1 rounded-lg bg-blue-50/50 text-center max-w-full overflow-hidden">
                      <Katex latex={st.latex} displayMode={false} />
                    </div>
                  )}

                  <p className="text-micro sm:text-small text-slate-700 leading-snug">{st.text}</p>
                </div>
              );
            })}
          </div>

          {/* Action CTA: Tap for Next Step OR Next Question */}
          <div className="flex items-center justify-center pt-0.5 shrink-0">
            {hasMoreSteps ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRevealNextStep(currentIndex);
                }}
                className={`w-full ${
                  isCompact ? 'min-h-[40px] py-2' : 'min-h-[44px] py-2.5'
                } px-5 rounded-full text-small sm:text-ui font-semibold text-white flex items-center justify-center gap-1.5 transition-opacity hover:opacity-95 cursor-pointer shadow-2xs`}
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
                className={`px-7 ${
                  isCompact ? 'min-h-[40px] py-2' : 'min-h-[44px] py-2.5'
                } rounded-full text-small sm:text-ui font-semibold text-white transition-colors cursor-pointer shadow-2xs`}
                style={{ backgroundColor: COLORS.primary }}
              >
                {currentIndex < questions.length - 1 ? 'Next' : 'Finish'} →
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="shrink-0" />
      )}
    </div>
  );
};

