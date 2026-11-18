/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Lightbulb,
  RotateCcw,
  Sparkles,
  XCircle,
} from 'lucide-react';
import { PRACTICE_QUESTIONS, PracticeQuestion } from '../content/practiceData';
import { SubTabId } from '../content/sections';
import { Katex } from '../components/Katex';
import { playCorrectSound, playIncorrectSound } from '../utils/audio';

interface PracticeSectionProps {
  activeSubTabId: SubTabId;
  onSelectSubTab?: (id: SubTabId) => void;
}

type TopicFilter = 'All' | 'Squares' | 'Roots' | 'Cubes' | 'Patterns';

const TOPIC_OPTIONS: { value: TopicFilter; label: string }[] = [
  { value: 'All', label: 'All Topics' },
  { value: 'Squares', label: 'Squares' },
  { value: 'Roots', label: 'Roots' },
  { value: 'Cubes', label: 'Cubes' },
  { value: 'Patterns', label: 'Patterns & Puzzles' },
];

export const PracticeSection: React.FC<PracticeSectionProps> = ({
  activeSubTabId,
  onSelectSubTab,
}) => {
  const currentCategory = useMemo(() => {
    if (activeSubTabId === 'solved-examples') return 'solved-examples';
    if (activeSubTabId === 'concept-clearing') return 'concept-clearing';
    return 'ncert-unsolved';
  }, [activeSubTabId]);

  const [selectedTopic, setSelectedTopic] = useState<TopicFilter>('All');
  const [questionIndex, setQuestionIndex] = useState<number>(0);

  // Per-question interaction state
  const [revealedStepById, setRevealedStepById] = useState<Record<string, number>>({});
  const [selectedOptionById, setSelectedOptionById] = useState<Record<string, number>>({});
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  // Reset question cursor cleanly when category or topic filter changes
  useEffect(() => {
    setQuestionIndex(0);
  }, [currentCategory, selectedTopic]);

  const filteredQuestions = useMemo(() => {
    return PRACTICE_QUESTIONS.filter((q) => {
      if (q.category !== currentCategory) return false;
      if (selectedTopic === 'All') return true;
      if (selectedTopic === 'Squares') return q.topic === 'Squares';
      if (selectedTopic === 'Roots') {
        return q.topic === 'Square Roots' || q.topic === 'Cube Roots';
      }
      if (selectedTopic === 'Cubes') return q.topic === 'Cubes';
      if (selectedTopic === 'Patterns') return q.topic === 'Patterns & Puzzles';
      return true;
    });
  }, [currentCategory, selectedTopic]);

  const safeIndex =
    filteredQuestions.length > 0
      ? Math.max(0, Math.min(filteredQuestions.length - 1, questionIndex))
      : 0;
  const activeQuestion: PracticeQuestion | undefined = filteredQuestions[safeIndex];

  // Determine if active question has been attempted
  const hasAttempted = activeQuestion
    ? selectedOptionById[activeQuestion.id] !== undefined ||
      (revealedStepById[activeQuestion.id] ?? 0) > 0
    : false;

  const revealedStepIndex = activeQuestion ? (revealedStepById[activeQuestion.id] ?? 0) : 0;
  const totalSteps = activeQuestion ? Math.max(1, activeQuestion.steps.length) : 1;
  const isAllRevealed = activeQuestion ? revealedStepIndex >= totalSteps : false;

  const advanceRevealStep = (q: PracticeQuestion) => {
    const sel = window.getSelection()?.toString();
    if (sel && sel.length > 0) return;

    const total = Math.max(1, q.steps.length);
    const current = revealedStepById[q.id] ?? 0;
    if (current >= total) return;
    const next = Math.min(total, current + 1);
    setRevealedStepById((prev) => ({ ...prev, [q.id]: next }));

    if (next >= total) {
      setCompletedIds((prev) => new Set(prev).add(q.id));
    }
  };

  const resetQuestion = (qId: string) => {
    setRevealedStepById((prev) => ({ ...prev, [qId]: 0 }));
    setSelectedOptionById((prev) => {
      const next = { ...prev };
      delete next[qId];
      return next;
    });
  };

  const handleSelectPrediction = (q: PracticeQuestion, optIdx: number) => {
    if (selectedOptionById[q.id] !== undefined) return;

    // Play right/wrong sound
    if (q.correctOptionIndex !== undefined) {
      if (optIdx === q.correctOptionIndex) {
        playCorrectSound();
      } else {
        playIncorrectSound();
      }
    } else {
      playCorrectSound();
    }

    setSelectedOptionById((prev) => ({ ...prev, [q.id]: optIdx }));

    // Automatically unlock the right-side explanation on option tap
    setRevealedStepById((prev) => {
      const current = prev[q.id] ?? 0;
      if (current >= 1) return prev;
      if (q.steps.length <= 1) {
        setCompletedIds((cPrev) => new Set(cPrev).add(q.id));
      }
      return { ...prev, [q.id]: 1 };
    });
  };

  const handleOpenEndedAttempt = (q: PracticeQuestion) => {
    playCorrectSound();
    setRevealedStepById((prev) => {
      const current = prev[q.id] ?? 0;
      if (current >= 1) return prev;
      if (q.steps.length <= 1) {
        setCompletedIds((cPrev) => new Set(cPrev).add(q.id));
      }
      return { ...prev, [q.id]: 1 };
    });
  };

  const goPrev = () => {
    setQuestionIndex((idx) => Math.max(0, idx - 1));
  };

  const goNext = () => {
    setQuestionIndex((idx) => Math.min(filteredQuestions.length - 1, idx + 1));
  };

  const getFooterCueText = () => {
    if (revealedStepIndex === 0) {
      return 'Tap card to reveal Step 1';
    }
    if (revealedStepIndex < totalSteps - 1) {
      return `Tap card for Step ${revealedStepIndex + 1} (${revealedStepIndex} of ${totalSteps})`;
    }
    if (revealedStepIndex === totalSteps - 1) {
      return `Tap card for Final Answer (${revealedStepIndex} of ${totalSteps})`;
    }
    return "✓ All steps revealed. Tap 'Next Question →' to continue.";
  };

  return (
    <div
      data-no-nav="true"
      className="w-full max-w-6xl mx-auto h-full min-h-0 flex flex-col gap-2 sm:gap-2.5 animate-fade-rise overflow-hidden"
    >
      {/* 1. TOP SUB-HEADER & QUESTION NAVIGATOR */}
      <div className="w-full min-h-[44px] shrink-0 bg-white/95 border border-slate-200/80 rounded-2xl px-2.5 sm:px-3.5 py-1.5 flex flex-wrap items-center justify-between gap-2 shadow-2xs">
        {/* Category Selector Buttons */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1 bg-slate-100/80 p-1 rounded-xl w-full sm:w-auto">
          {[
            { id: 'ncert-unsolved' as SubTabId, label: 'NCERT Unsolved', icon: BookOpen },
            { id: 'solved-examples' as SubTabId, label: 'Solved Examples', icon: Sparkles },
            { id: 'concept-clearing' as SubTabId, label: 'Concept Clearing', icon: Lightbulb },
          ].map((cat) => {
            const Icon = cat.icon;
            const active = currentCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectSubTab?.(cat.id)}
                className={`min-h-[40px] sm:min-h-[36px] px-2.5 sm:px-3 py-1 rounded-lg text-micro font-bold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-[#005583] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/70'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Topic Filter + Prev / Counter / Next */}
        <div className="flex items-center justify-between sm:justify-end gap-1.5 sm:gap-2 flex-wrap w-full sm:w-auto">
          <select
            aria-label="Filter by topic"
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value as TopicFilter)}
            className="min-h-[40px] sm:min-h-[36px] px-2.5 rounded-xl border border-slate-200 bg-slate-50/80 text-micro font-semibold text-slate-700 focus:outline-none focus:border-[#005583] cursor-pointer"
          >
            {TOPIC_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={goPrev}
              disabled={safeIndex <= 0 || filteredQuestions.length === 0}
              className="min-h-[40px] sm:min-h-[36px] px-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-micro font-bold text-slate-700 inline-flex items-center gap-1 cursor-pointer transition-colors whitespace-nowrap"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Prev</span>
            </button>
            <span className="px-1.5 sm:px-2 text-micro font-bold text-slate-700 tabular-nums whitespace-nowrap">
              {filteredQuestions.length > 0
                ? `${safeIndex + 1} / ${filteredQuestions.length}`
                : '0 / 0'}
            </span>
            <button
              type="button"
              onClick={goNext}
              disabled={safeIndex >= filteredQuestions.length - 1 || filteredQuestions.length === 0}
              className="min-h-[40px] sm:min-h-[36px] px-2.5 rounded-xl text-micro font-bold text-white bg-[#005583] hover:bg-[#003F62] disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-1 cursor-pointer transition-colors whitespace-nowrap"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN WORKSPACE */}
      {!activeQuestion ? (
        <div className="flex-1 min-h-0 bg-white rounded-3xl border border-slate-200/80 p-8 flex flex-col items-center justify-center text-center gap-3">
          <HelpCircle className="w-8 h-8 text-slate-300" />
          <h4 className="text-statement font-bold text-slate-700">
            No questions in this topic for this category
          </h4>
          <button
            type="button"
            onClick={() => setSelectedTopic('All')}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-small font-bold text-slate-700 cursor-pointer"
          >
            Show All Topics
          </button>
        </div>
      ) : !hasAttempted ? (
        /* ========================================================================= */
        /* PHASE 1: UNATTEMPTED (Centered, Compact, Close Together, Zero Spoilers)   */
        /* ========================================================================= */
        <div className="flex-1 min-h-0 flex flex-col items-center justify-center py-2 px-1 overflow-hidden animate-fade-rise">
          <section
            aria-label="Active practice question"
            className="w-full max-w-2xl bg-white border border-slate-200/80 rounded-3xl p-4 sm:p-6 flex flex-col gap-3.5 shadow-xs my-auto"
          >
            {/* Metadata Header */}
            <div className="flex items-center justify-between gap-2 flex-wrap text-micro">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg bg-sky-50 text-[#005583] font-extrabold uppercase tracking-wide border border-sky-100">
                {activeQuestion.source}
              </span>
              <div className="flex items-center gap-2 font-semibold">
                {completedIds.has(activeQuestion.id) && (
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                    <Check className="w-3.5 h-3.5" />
                    <span>Completed</span>
                  </span>
                )}
                <span
                  className={
                    activeQuestion.difficulty === 'Easy'
                      ? 'text-emerald-700 font-bold'
                      : activeQuestion.difficulty === 'Medium'
                      ? 'text-amber-700 font-bold'
                      : 'text-purple-700 font-bold'
                  }
                >
                  {activeQuestion.difficulty}
                </span>
              </div>
            </div>

            {/* Question Title & Statement */}
            <div className="flex flex-col gap-1.5">
              <h3 className="text-statement sm:text-title font-extrabold text-slate-900 leading-snug">
                {activeQuestion.title}
              </h3>
              <p className="text-small sm:text-body text-slate-700 whitespace-pre-line leading-relaxed break-words">
                {activeQuestion.statement}
              </p>
              {activeQuestion.statementLatex && (
                <div className="mt-1 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/60 inline-block max-w-full break-words">
                  <Katex latex={activeQuestion.statementLatex} displayMode={false} />
                </div>
              )}
            </div>

            {/* Prediction Options (if available) */}
            {activeQuestion.predictionOptions && activeQuestion.predictionOptions.length > 0 ? (
              <div className="pt-1 flex flex-col gap-2">
                <span className="text-micro font-bold text-slate-600 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#005583]" />
                  <span>Choose your predicted answer to unlock the step-by-step solution:</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeQuestion.predictionOptions.map((opt, optIdx) => (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelectPrediction(activeQuestion, optIdx)}
                      className="min-h-[46px] px-3.5 py-2.5 rounded-2xl border border-slate-200/90 bg-white hover:bg-sky-50/70 hover:border-[#005583]/60 text-small font-bold text-slate-800 text-left flex items-center gap-2.5 cursor-pointer transition-all shadow-2xs group"
                    >
                      <span className="w-6 h-6 rounded-lg bg-slate-100 group-hover:bg-[#005583] group-hover:text-white transition-colors text-micro font-bold text-slate-700 flex items-center justify-center shrink-0">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="leading-snug">{opt}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
                <span className="text-micro font-medium text-slate-500">
                  Solve this in your notebook, then click below to verify your steps.
                </span>
                <button
                  type="button"
                  onClick={() => handleOpenEndedAttempt(activeQuestion)}
                  className="w-full sm:w-auto min-h-[44px] px-5 py-2 rounded-2xl bg-[#005583] hover:bg-[#003F62] text-white text-small font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-2xs"
                >
                  <span>Check Steps &amp; Solution</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </section>
        </div>
      ) : (
        /* ========================================================================= */
        /* PHASE 2: ATTEMPTED (2-Column Split: Question Left, Solution Right)        */
        /* ========================================================================= */
        <div className="flex-1 min-h-0 flex flex-col md:flex-row gap-2.5 md:gap-3 lg:gap-4 overflow-hidden animate-fade-rise">
          {/* LEFT COLUMN — QUESTION & SELECTED ANSWER */}
          <section
            aria-label="Active question"
            className="w-full md:w-[42%] lg:w-[40%] max-h-[45%] md:max-h-full bg-white border border-slate-200/80 rounded-3xl p-3.5 sm:p-4 flex flex-col justify-between gap-2.5 overflow-y-auto no-scrollbar shadow-2xs shrink-0"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2 flex-wrap text-micro">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg bg-sky-50 text-[#005583] font-bold">
                  {activeQuestion.source}
                </span>
                <div className="flex items-center gap-2 font-semibold">
                  {completedIds.has(activeQuestion.id) && (
                    <span className="inline-flex items-center gap-1 text-emerald-700">
                      <Check className="w-3.5 h-3.5" />
                      <span>Done</span>
                    </span>
                  )}
                  <span
                    className={
                      activeQuestion.difficulty === 'Easy'
                        ? 'text-emerald-700'
                        : activeQuestion.difficulty === 'Medium'
                        ? 'text-amber-700'
                        : 'text-purple-700'
                    }
                  >
                    {activeQuestion.difficulty}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-statement font-extrabold text-slate-900 leading-snug">
                  {activeQuestion.title}
                </h3>
                <p className="text-small text-slate-700 mt-1 whitespace-pre-line leading-relaxed break-words">
                  {activeQuestion.statement}
                </p>
                {activeQuestion.statementLatex && (
                  <div className="mt-1.5 px-3 py-1.5 rounded-xl bg-slate-50/90 border border-slate-200/60 inline-block max-w-full break-words">
                    <Katex latex={activeQuestion.statementLatex} displayMode={false} />
                  </div>
                )}
              </div>
            </div>

            {/* Prediction Choices Status */}
            {activeQuestion.predictionOptions && activeQuestion.predictionOptions.length > 0 && (
              <div className="p-2.5 rounded-2xl bg-slate-50/80 border border-slate-200/70 flex flex-col gap-1.5 shrink-0">
                <span className="text-micro font-bold text-slate-600">Your Prediction:</span>
                <div className="flex flex-col gap-1">
                  {activeQuestion.predictionOptions.map((opt, optIdx) => {
                    const userChoice = selectedOptionById[activeQuestion.id];
                    const isSelected = userChoice === optIdx;
                    const isCorrect = activeQuestion.correctOptionIndex === optIdx;

                    let optionStyle = 'bg-white border-slate-200/70 text-slate-600 opacity-60';
                    if (isCorrect) {
                      optionStyle =
                        'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-1 ring-emerald-500/30 opacity-100';
                    } else if (isSelected && !isCorrect) {
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
                        {isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                        {isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </section>

          {/* RIGHT COLUMN — STEP-BY-STEP ANSWER & HINTS (Now Revealed) */}
          <section
            aria-label="Step-by-step solution and hints"
            role={!isAllRevealed ? 'button' : undefined}
            tabIndex={!isAllRevealed ? 0 : undefined}
            onClick={() => advanceRevealStep(activeQuestion)}
            onKeyDown={(e) => {
              if (!isAllRevealed && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                advanceRevealStep(activeQuestion);
              }
            }}
            className={`w-full md:w-[58%] lg:w-[60%] flex-1 min-h-0 md:h-full bg-slate-50/80 border border-slate-200/80 rounded-3xl p-3.5 sm:p-4 flex flex-col justify-between gap-2.5 overflow-y-auto no-scrollbar transition-colors ${
              isAllRevealed ? 'cursor-default' : 'cursor-pointer hover:border-[#005583]/40'
            }`}
          >
            {/* Panel Header with Reset / Re-try Icon */}
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-200/70 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-micro font-extrabold uppercase tracking-wider text-slate-500">
                  Hints &amp; Solution Steps
                </span>
                <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200/80 text-micro font-bold text-[#005583] tabular-nums">
                  {revealedStepIndex} / {totalSteps}
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  resetQuestion(activeQuestion.id);
                }}
                aria-label="Re-try question"
                title="Re-try question"
                className="min-h-[38px] px-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 text-micro font-bold flex items-center gap-1.5 cursor-pointer transition-colors shrink-0 shadow-2xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Re-try</span>
              </button>
            </div>

            {/* Revealed Steps List */}
            <div className="flex-1 min-h-0 flex flex-col gap-2 overflow-y-auto no-scrollbar py-0.5">
              {/* Key Rule / Clue */}
              <div className="px-3.5 py-2 rounded-2xl bg-amber-50/90 border border-amber-200/80 flex items-start gap-2 animate-fade-rise">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-micro sm:text-small text-amber-950 leading-snug">
                  <strong className="font-bold">Key Rule: </strong>
                  {activeQuestion.keyRule}
                </p>
              </div>

              {/* Solution Steps Revealed One by One */}
              {activeQuestion.steps.slice(0, revealedStepIndex).map((step, sIdx) => (
                <div
                  key={sIdx}
                  className="bg-white px-3.5 py-2.5 rounded-2xl border border-slate-200/80 flex flex-col gap-1 animate-fade-rise shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-sky-100 text-[#005583] text-[11px] font-extrabold flex items-center justify-center shrink-0 tabular-nums">
                      {sIdx + 1}
                    </span>
                    <h4 className="text-micro sm:text-small font-bold text-slate-900">
                      {step.title}
                    </h4>
                  </div>
                  {step.latex && (
                    <div className="px-2.5 py-1 rounded-xl bg-sky-50/70 text-center max-w-full break-words">
                      <Katex latex={step.latex} displayMode={false} />
                    </div>
                  )}
                  <p className="text-micro sm:text-small text-slate-600 leading-snug">
                    {step.explanation}
                  </p>
                </div>
              ))}

              {/* Final Answer Badge (on Final Step) */}
              {isAllRevealed && (
                <div className="px-3.5 py-2.5 rounded-2xl bg-emerald-50 border border-emerald-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2 animate-fade-rise">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800">
                      Final Answer
                    </span>
                    <div className="text-small sm:text-body font-bold text-emerald-950 leading-snug">
                      {activeQuestion.answer}
                    </div>
                  </div>
                  {activeQuestion.answerLatex && (
                    <div className="px-3 py-1 rounded-xl bg-white border border-emerald-200 shrink-0 max-w-full break-words">
                      <Katex latex={activeQuestion.answerLatex} displayMode={false} />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Tap Cue & Next Button */}
            <div className="pt-2 border-t border-slate-200/70 flex items-center justify-between gap-2 shrink-0">
              <span
                className={`text-micro font-bold ${
                  isAllRevealed ? 'text-emerald-700' : 'text-[#005583]'
                }`}
              >
                {getFooterCueText()}
              </span>
              {isAllRevealed && safeIndex < filteredQuestions.length - 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                  className="min-h-[38px] sm:min-h-[36px] px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-micro font-bold inline-flex items-center gap-1 cursor-pointer transition-colors shrink-0 shadow-2xs"
                >
                  <span>Next Question →</span>
                </button>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
