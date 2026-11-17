/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Search,
  BookOpen,
  Lightbulb,
  Check,
  RotateCcw,
  SlidersHorizontal,
  FileText,
  XCircle,
  ChevronRight,
} from 'lucide-react';
import { PRACTICE_QUESTIONS, PracticeQuestion } from '../content/practiceData';
import { SubTabId } from '../content/sections';
import { Katex } from '../components/Katex';

interface PracticeSectionProps {
  activeSubTabId: SubTabId;
  onSelectSubTab?: (id: SubTabId) => void;
}

type TopicFilter = 'All' | 'Squares' | 'Square Roots' | 'Cubes' | 'Cube Roots' | 'Patterns & Puzzles';

export const PracticeSection: React.FC<PracticeSectionProps> = ({
  activeSubTabId,
  onSelectSubTab,
}) => {
  // Category maps directly to SubTabId: 'ncert-unsolved' | 'solved-examples' | 'concept-clearing'
  const currentCategory = useMemo(() => {
    if (activeSubTabId === 'solved-examples') return 'solved-examples';
    if (activeSubTabId === 'concept-clearing') return 'concept-clearing';
    return 'ncert-unsolved';
  }, [activeSubTabId]);

  // Topic filter state
  const [selectedTopic, setSelectedTopic] = useState<TopicFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Solved / completed question ids in current session
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  // Clean 2-button, step-by-step solution reveal, & MCQ prediction state per question ID
  const [showHint, setShowHint] = useState<Record<string, boolean>>({});
  const [showSolution, setShowSolution] = useState<Record<string, boolean>>({});
  const [revealedSteps, setRevealedSteps] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<Record<string, number>>({});

  // Filtered list of questions
  const filteredQuestions = useMemo(() => {
    return PRACTICE_QUESTIONS.filter((q) => {
      if (q.category !== currentCategory) return false;
      if (selectedTopic !== 'All' && q.topic !== selectedTopic) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = q.title.toLowerCase().includes(query);
        const matchesStatement = q.statement.toLowerCase().includes(query);
        const matchesSource = q.source.toLowerCase().includes(query);
        const matchesAnswer = q.answer.toLowerCase().includes(query);
        return matchesTitle || matchesStatement || matchesSource || matchesAnswer;
      }
      return true;
    });
  }, [currentCategory, selectedTopic, searchQuery]);

  // Stats for the current category
  const categoryTotal = useMemo(() => {
    return PRACTICE_QUESTIONS.filter((q) => q.category === currentCategory).length;
  }, [currentCategory]);

  const categorySolved = useMemo(() => {
    return PRACTICE_QUESTIONS.filter(
      (q) => q.category === currentCategory && completedIds.has(q.id)
    ).length;
  }, [currentCategory, completedIds]);

  const toggleHint = (q: PracticeQuestion) => {
    setShowHint((prev) => ({ ...prev, [q.id]: !prev[q.id] }));
  };

  const toggleSolution = (q: PracticeQuestion) => {
    const isCurrentlyOpen = Boolean(showSolution[q.id]);
    if (isCurrentlyOpen) {
      setShowSolution((prev) => ({ ...prev, [q.id]: false }));
      return;
    }

    const total = Math.max(1, q.steps.length);
    const existingCount = revealedSteps[q.id] ?? 0;
    const initialCount = existingCount > 0 ? Math.min(total, existingCount) : 1;

    setShowSolution((prev) => ({ ...prev, [q.id]: true }));
    setRevealedSteps((prev) => ({ ...prev, [q.id]: initialCount }));
    if (initialCount >= q.steps.length) {
      setCompletedIds((cPrev) => new Set(cPrev).add(q.id));
    }
  };

  const revealNextStep = (q: PracticeQuestion) => {
    const total = q.steps.length;
    const current = revealedSteps[q.id] ?? 1;
    if (current >= total) return;
    const next = Math.min(total, current + 1);
    setRevealedSteps((prev) => ({ ...prev, [q.id]: next }));
    if (next >= total) {
      setCompletedIds((cPrev) => new Set(cPrev).add(q.id));
    }
  };

  const revealAllSteps = (q: PracticeQuestion) => {
    setRevealedSteps((prev) => ({ ...prev, [q.id]: q.steps.length }));
    setCompletedIds((cPrev) => new Set(cPrev).add(q.id));
  };

  const resetQuestionState = (qId: string) => {
    setShowHint((prev) => ({ ...prev, [qId]: false }));
    setShowSolution((prev) => ({ ...prev, [qId]: false }));
    setRevealedSteps((prev) => {
      const next = { ...prev };
      delete next[qId];
      return next;
    });
    setSelectedOption((prev) => {
      const next = { ...prev };
      delete next[qId];
      return next;
    });
  };

  const handleSelectOption = (q: PracticeQuestion, optionIndex: number) => {
    setSelectedOption((prev) => ({ ...prev, [q.id]: optionIndex }));
    const isCorrect =
      q.correctOptionIndex !== undefined && optionIndex === q.correctOptionIndex;

    if (isCorrect) {
      setShowSolution((prev) => ({ ...prev, [q.id]: true }));
      setRevealedSteps((prev) => {
        const current = prev[q.id] ?? 0;
        const nextCount = current > 0 ? current : 1;
        if (nextCount >= q.steps.length) {
          setCompletedIds((cPrev) => new Set(cPrev).add(q.id));
        }
        return { ...prev, [q.id]: nextCount };
      });
    } else {
      setShowHint((prev) => ({ ...prev, [q.id]: true }));
    }
  };

  const topicsList: TopicFilter[] = [
    'All',
    'Squares',
    'Square Roots',
    'Cubes',
    'Cube Roots',
    'Patterns & Puzzles',
  ];

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-5 py-1 pb-16 animate-fade-rise">
      {/* Compact Header Strip: Category title + Segmented quick jump + Progress */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
        <div className="flex flex-wrap items-center gap-1.5 bg-white/90 p-1 rounded-2xl border border-slate-200/80 self-start">
          {[
            { id: 'ncert-unsolved' as SubTabId, label: 'Exercises (14)', icon: BookOpen },
            { id: 'solved-examples' as SubTabId, label: 'Examples (16)', icon: Sparkles },
            { id: 'concept-clearing' as SubTabId, label: 'Puzzles (10)', icon: Lightbulb },
          ].map((cat) => {
            const Icon = cat.icon;
            const active = currentCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectSubTab?.(cat.id)}
                className={`min-h-[38px] px-3 py-1.5 rounded-xl text-micro font-bold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-[#005583] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Category Progress */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto px-1">
          <span className="text-small text-slate-600 tabular-nums whitespace-nowrap">
            <strong className="font-bold text-slate-900">
              {categorySolved} / {categoryTotal}
            </strong>{' '}
            reviewed
          </span>
          <div className="w-24 h-2 rounded-full bg-slate-200/80 overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{
                width: `${categoryTotal > 0 ? (categorySolved / categoryTotal) * 100 : 0}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Unified Calm Search & Topic Filter Bar */}
      <div className="w-full bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 min-w-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search numbers, topics, or rules (e.g. 9408, taxicab)..."
            className="w-full min-h-[42px] pl-10 pr-14 py-2 rounded-xl text-small border border-slate-200/90 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-[#005583] focus:ring-2 focus:ring-sky-100 transition-all placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800 text-micro font-semibold cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Topic Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-1 hidden sm:block" />
          {topicsList.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setSelectedTopic(t)}
              className={`min-h-[38px] px-3 py-1.5 rounded-xl text-micro font-semibold shrink-0 whitespace-nowrap transition-colors cursor-pointer border ${
                selectedTopic === t
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200/80'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Questions List */}
      <div className="w-full flex flex-col gap-5">
        {filteredQuestions.length === 0 ? (
          <div className="w-full bg-white p-10 sm:p-12 rounded-3xl border border-slate-200/80 text-center flex flex-col items-center gap-3">
            <HelpCircle className="w-8 h-8 text-slate-300" />
            <h4 className="text-statement font-bold text-slate-700">No matching questions found</h4>
            <p className="text-small text-slate-500 max-w-sm">
              Try adjusting your search terms or selecting &quot;All&quot; in the topic filters above.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedTopic('All');
              }}
              className="mt-2 min-h-[40px] px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-small font-bold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredQuestions.map((q, qIndex) => {
            const isHintOpen = Boolean(showHint[q.id]);
            const isSolutionOpen = Boolean(showSolution[q.id]);
            const totalSteps = q.steps.length;
            const visibleStepCount = Math.min(totalSteps, Math.max(1, revealedSteps[q.id] ?? 1));
            const hasMoreSteps = visibleStepCount < totalSteps;
            const userChoice = selectedOption[q.id];
            const hasSelected = userChoice !== undefined;
            const isCorrectChoice =
              hasSelected && q.correctOptionIndex !== undefined && userChoice === q.correctOptionIndex;
            const hasAnyState = isHintOpen || isSolutionOpen || hasSelected;

            return (
              <div
                key={q.id}
                className="w-full bg-white rounded-3xl border border-slate-200/80 shadow-2xs transition-colors overflow-hidden"
              >
                {/* Question Content */}
                <div className="p-5 sm:p-7 flex flex-col gap-4">
                  {/* Unboxed Calm Metadata */}
                  <div className="flex items-center justify-between gap-2 flex-wrap text-micro">
                    <div className="flex items-center gap-2 text-slate-500">
                      <span className="font-mono font-bold text-slate-800 tabular-nums">
                        #{qIndex + 1}
                      </span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="font-semibold text-[#005583]">{q.source}</span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span>{q.topic}</span>
                    </div>

                    <div className="flex items-center gap-2 font-semibold">
                      {completedIds.has(q.id) && (
                        <span className="flex items-center gap-1 text-emerald-700">
                          <Check className="w-3.5 h-3.5" />
                          <span>Reviewed</span>
                        </span>
                      )}
                      {completedIds.has(q.id) && <span aria-hidden="true" className="text-slate-300">·</span>}
                      <span
                        className={
                          q.difficulty === 'Easy'
                            ? 'text-emerald-700'
                            : q.difficulty === 'Medium'
                            ? 'text-amber-700'
                            : 'text-purple-700'
                        }
                      >
                        {q.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Title & Statement */}
                  <div>
                    <h3 className="text-statement font-bold text-slate-900 leading-snug">
                      {q.title}
                    </h3>
                    <div className="text-body text-slate-700 mt-2 whitespace-pre-line leading-relaxed">
                      {q.statement}
                    </div>

                    {q.statementLatex && (
                      <div className="mt-3 px-4 py-2.5 rounded-xl bg-slate-50/90 inline-block overflow-x-auto max-w-full">
                        <Katex latex={q.statementLatex} displayMode={false} />
                      </div>
                    )}
                  </div>

                  {/* Interactive Prediction Options (1-Tap Retry Until Correct) */}
                  {q.predictionOptions && q.predictionOptions.length > 0 && (
                    <div className="mt-1 p-4 rounded-2xl bg-amber-50/50 border border-amber-200/60 flex flex-col gap-3">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-2 text-amber-900 text-small font-bold">
                          <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                          <span>Try to predict first!</span>
                        </div>
                        {hasSelected && !isCorrectChoice && (
                          <span className="text-micro font-bold text-rose-700">
                            ✕ Try again — tap another choice
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {q.predictionOptions.map((opt, optIdx) => {
                          const isSelected = userChoice === optIdx;
                          const isThisCorrect = q.correctOptionIndex === optIdx;

                          let btnStyle =
                            'bg-white text-slate-700 hover:bg-slate-50 border-amber-200/80 cursor-pointer';
                          if (isSelected && isThisCorrect) {
                            btnStyle =
                              'bg-emerald-50 text-emerald-950 border-emerald-500 font-bold ring-2 ring-emerald-500/20';
                          } else if (isSelected && !isThisCorrect) {
                            btnStyle =
                              'bg-rose-50 text-rose-900 border-rose-400 font-semibold cursor-pointer';
                          } else if (isCorrectChoice && !isThisCorrect) {
                            btnStyle = 'bg-white/60 text-slate-400 border-slate-200/70 opacity-65';
                          }

                          return (
                            <button
                              key={optIdx}
                              type="button"
                              disabled={isCorrectChoice}
                              onClick={() => handleSelectOption(q, optIdx)}
                              className={`min-h-[44px] p-3 rounded-xl border text-small text-left flex items-center justify-between gap-2 transition-all ${btnStyle}`}
                            >
                              <div className="flex items-start gap-2.5 min-w-0">
                                <span className="w-5 h-5 rounded-full bg-slate-100 font-mono text-micro font-bold text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <span className="leading-snug">{opt}</span>
                              </div>

                              {isSelected && isThisCorrect && (
                                <span className="inline-flex items-center gap-1 text-micro font-bold text-emerald-800 whitespace-nowrap shrink-0">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>Correct</span>
                                </span>
                              )}
                              {isSelected && !isThisCorrect && (
                                <span className="inline-flex items-center gap-1 text-micro font-bold text-rose-700 whitespace-nowrap shrink-0">
                                  <XCircle className="w-3.5 h-3.5 text-rose-600" />
                                  <span>Retry</span>
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Clean 2-Button Pill Row + Reset Icon */}
                  <div className="pt-3.5 flex items-center justify-between gap-3 border-t border-slate-100 flex-wrap">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => toggleHint(q)}
                        className={`min-h-[42px] px-4 py-2 rounded-full text-small font-bold border flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                          isHintOpen
                            ? 'bg-amber-100 text-amber-950 border-amber-400'
                            : 'bg-amber-50/80 text-amber-900 border-amber-200/80 hover:bg-amber-100'
                        }`}
                      >
                        <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>{isHintOpen ? 'Hide Hint' : '💡 Hint'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleSolution(q)}
                        className={`min-h-[42px] px-4 py-2 rounded-full text-small font-bold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                          isSolutionOpen
                            ? 'bg-slate-800 text-white hover:bg-slate-700'
                            : 'bg-[#005583] text-white hover:bg-[#003F62]'
                        }`}
                      >
                        <FileText className="w-4 h-4 shrink-0" />
                        <span>{isSolutionOpen ? 'Hide Solution' : '📝 Solution'}</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2.5">
                      {hasAnyState && (
                        <button
                          type="button"
                          onClick={() => resetQuestionState(q.id)}
                          aria-label="Reset question state"
                          title="Reset question"
                          className="min-h-[40px] w-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 flex items-center justify-center cursor-pointer transition-colors shrink-0"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      )}
                      <span className="text-micro text-slate-400 font-medium whitespace-nowrap tabular-nums">
                        {q.steps.length} {q.steps.length === 1 ? 'step' : 'steps'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Friendly 1-Line Hint Clue */}
                {isHintOpen && (
                  <div className="border-t border-amber-200/60 bg-amber-50/50 px-5 sm:px-7 py-4 flex items-start gap-2.5 animate-fade-rise">
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div className="text-small text-amber-950 leading-relaxed">
                      <strong className="font-bold">Hint: </strong>
                      <span>{q.keyRule}</span>
                    </div>
                  </div>
                )}

                {/* Step-by-Step Tap-to-Reveal Solution */}
                {isSolutionOpen && (
                  <div
                    onClick={() => {
                      if (!hasMoreSteps) return;
                      const sel = window.getSelection()?.toString();
                      if (sel && sel.length > 0) return;
                      revealNextStep(q);
                    }}
                    className={`bg-slate-50/70 border-t border-slate-200/70 p-5 sm:p-7 flex flex-col gap-4 animate-fade-rise ${
                      hasMoreSteps ? 'cursor-pointer' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2.5">
                        <span className="text-micro font-bold uppercase tracking-wider text-slate-500">
                          Step-by-Step Solution
                        </span>
                        <span className="text-micro font-bold text-[#005583] tabular-nums">
                          Step {visibleStepCount} of {totalSteps}
                        </span>
                      </div>

                      {hasMoreSteps && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            revealAllSteps(q);
                          }}
                          className="text-micro font-bold text-[#005583] hover:underline cursor-pointer px-2.5 py-1 rounded-lg hover:bg-white transition-colors"
                        >
                          Show all steps
                        </button>
                      )}
                    </div>

                    <div className="flex flex-col gap-3">
                      {q.steps.slice(0, visibleStepCount).map((st, sIdx) => (
                        <div
                          key={sIdx}
                          className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/75 flex flex-col gap-2.5 animate-fade-rise"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-lg bg-sky-100 text-[#005583] text-micro font-bold flex items-center justify-center shrink-0 tabular-nums">
                              {sIdx + 1}
                            </span>
                            <h5 className="text-small font-bold text-slate-900">{st.title}</h5>
                          </div>

                          {st.latex && (
                            <div className="p-2.5 rounded-xl bg-sky-50/60 overflow-x-auto text-center">
                              <Katex latex={st.latex} displayMode={false} />
                            </div>
                          )}

                          <p className="text-small text-slate-600 leading-relaxed">
                            {st.explanation}
                          </p>
                        </div>
                      ))}
                    </div>

                    {hasMoreSteps ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          revealNextStep(q);
                        }}
                        className="w-full min-h-[44px] px-4 py-2.5 rounded-2xl border border-dashed border-[#005583]/45 bg-sky-50/80 hover:bg-sky-100/80 text-[#005583] text-small font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        <span>
                          Tap to display Step {visibleStepCount + 1} of {totalSteps}
                        </span>
                        <ChevronRight className="w-4 h-4 shrink-0" />
                      </button>
                    ) : (
                      /* Final Answer Badge revealed once all steps are shown */
                      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-emerald-300/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fade-rise">
                        <div>
                          <span className="text-micro font-bold uppercase tracking-wider text-emerald-700">
                            Final Answer
                          </span>
                          <div className="text-body font-bold text-slate-900 mt-0.5">
                            {q.answer}
                          </div>
                        </div>

                        {q.answerLatex && (
                          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-50/80 shrink-0 max-w-full overflow-x-auto">
                            <Katex latex={q.answerLatex} displayMode={false} />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
