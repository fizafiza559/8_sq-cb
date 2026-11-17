/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Search,
  BookOpen,
  Lightbulb,
  Check,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react';
import { PRACTICE_QUESTIONS, PracticeQuestion } from '../content/practiceData';
import { SubTabId } from '../content/sections';
import { Katex } from '../components/Katex';
import { COLORS } from '../design/tokens';

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

  // Interactive user guesses: questionId -> selectedOptionIndex
  const [userGuesses, setUserGuesses] = useState<Record<string, number>>({});

  // Expanded hint tier per question: 0 = hidden, 1 = Gentle Clue, 2 = Intermediate Step, 3 = Full Tap-by-Tap Walkthrough
  const [hintTierById, setHintTierById] = useState<Record<string, 0 | 1 | 2 | 3>>({});
  // Revealed step count inside Tier 3 walkthrough per question
  const [walkthroughStepById, setWalkthroughStepById] = useState<Record<string, number>>({});

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

  const setQuestionHintTier = (q: PracticeQuestion, tier: 0 | 1 | 2 | 3) => {
    setHintTierById((prev) => ({ ...prev, [q.id]: tier }));
    if (tier === 3) {
      setWalkthroughStepById((prev) => ({
        ...prev,
        [q.id]: Math.max(1, prev[q.id] ?? 1),
      }));
      if (q.steps.length <= 1) {
        setCompletedIds((cPrev) => new Set(cPrev).add(q.id));
      }
    }
  };

  const advanceWalkthroughStep = (q: PracticeQuestion) => {
    setWalkthroughStepById((prev) => {
      const current = prev[q.id] ?? 1;
      const next = Math.min(q.steps.length, current + 1);
      if (next >= q.steps.length) {
        setCompletedIds((cPrev) => new Set(cPrev).add(q.id));
      }
      return { ...prev, [q.id]: next };
    });
  };

  const revealAllWalkthroughSteps = (q: PracticeQuestion) => {
    setHintTierById((prev) => ({ ...prev, [q.id]: 3 }));
    setWalkthroughStepById((prev) => ({ ...prev, [q.id]: q.steps.length }));
    setCompletedIds((cPrev) => new Set(cPrev).add(q.id));
  };

  const handleSelectOption = (q: PracticeQuestion, optionIndex: number) => {
    setUserGuesses((prev) => ({ ...prev, [q.id]: optionIndex }));
    setHintTierById((prev) => ({ ...prev, [q.id]: 3 }));
    setWalkthroughStepById((prev) => ({ ...prev, [q.id]: q.steps.length }));
    setCompletedIds((prev) => new Set(prev).add(q.id));
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
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 py-2 pb-16 animate-fade-rise">
      {/* Category Nav Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
        <button
          type="button"
          onClick={() => onSelectSubTab?.('ncert-unsolved')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
            currentCategory === 'ncert-unsolved'
              ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-500/30 shadow-sm'
              : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span
              className={`text-micro font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                currentCategory === 'ncert-unsolved'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              Exercises (14)
            </span>
            <BookOpen
              className={`w-4 h-4 ${
                currentCategory === 'ncert-unsolved' ? 'text-blue-600' : 'text-slate-400'
              }`}
            />
          </div>
          <h4 className="text-statement font-bold text-slate-900 leading-tight">
            NCERT Unsolved Exercises
          </h4>
          <p className="text-micro text-slate-500 mt-1 line-clamp-1">
            Figure It Out • Pages 10-11 & 16-17
          </p>
        </button>

        <button
          type="button"
          onClick={() => onSelectSubTab?.('solved-examples')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
            currentCategory === 'solved-examples'
              ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/30 shadow-sm'
              : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span
              className={`text-micro font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                currentCategory === 'solved-examples'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              Examples (16)
            </span>
            <Sparkles
              className={`w-4 h-4 ${
                currentCategory === 'solved-examples' ? 'text-emerald-600' : 'text-slate-400'
              }`}
            />
          </div>
          <h4 className="text-statement font-bold text-slate-900 leading-tight">
            Solved Examples
          </h4>
          <p className="text-micro text-slate-500 mt-1 line-clamp-1">
            Complete textbook derivations & solutions
          </p>
        </button>

        <button
          type="button"
          onClick={() => onSelectSubTab?.('concept-clearing')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
            currentCategory === 'concept-clearing'
              ? 'bg-purple-50/80 border-purple-500 ring-2 ring-purple-500/30 shadow-sm'
              : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span
              className={`text-micro font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                currentCategory === 'concept-clearing'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              In-Text Puzzles (10)
            </span>
            <Lightbulb
              className={`w-4 h-4 ${
                currentCategory === 'concept-clearing' ? 'text-purple-600' : 'text-slate-400'
              }`}
            />
          </div>
          <h4 className="text-statement font-bold text-slate-900 leading-tight">
            Concept & In-Text
          </h4>
          <p className="text-micro text-slate-500 mt-1 line-clamp-1">
            Math talks, Ramanujan taxicabs & zero rules
          </p>
        </button>
      </div>

      {/* Filter Toolbar & Progress */}
      <div className="w-full bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g., 9408, 1323, taxicab, odd)..."
            className="w-full pl-10 pr-4 py-2 rounded-xl text-small border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-micro"
            >
              Clear
            </button>
          )}
        </div>

        {/* Topic Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1 mr-0.5 hidden sm:block" />
          {topicsList.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setSelectedTopic(t)}
              className={`px-3 py-1.5 rounded-xl text-micro font-bold shrink-0 transition-colors cursor-pointer border ${
                selectedTopic === t
                  ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Category Progress */}
        <div className="flex items-center justify-end gap-2 shrink-0 border-t md:border-t-0 pt-2 md:pt-0 border-slate-100">
          <div className="flex items-center gap-1.5 text-small text-slate-600">
            <span className="font-semibold text-slate-900">
              {categorySolved} / {categoryTotal}
            </span>
            <span>Reviewed</span>
          </div>
          <div className="w-20 h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{
                width: `${categoryTotal > 0 ? (categorySolved / categoryTotal) * 100 : 0}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="w-full flex flex-col gap-4">
        {filteredQuestions.length === 0 ? (
          <div className="w-full bg-white p-12 rounded-3xl border border-slate-200 text-center flex flex-col items-center gap-3">
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
              className="mt-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-small font-bold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredQuestions.map((q, qIndex) => {
            const activeTier = hintTierById[q.id] ?? 0;
            const visibleStepsCount = Math.min(
              q.steps.length,
              Math.max(1, walkthroughStepById[q.id] ?? 1)
            );
            const allWalkthroughDone = activeTier === 3 && visibleStepsCount >= q.steps.length;
            const userChoice = userGuesses[q.id];
            const hasGuessed = userChoice !== undefined;
            const isCorrectGuess =
              hasGuessed && q.correctOptionIndex !== undefined && userChoice === q.correctOptionIndex;

            return (
              <div
                key={q.id}
                className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all overflow-hidden"
              >
                {/* Header Row */}
                <div className="p-4 sm:p-6 flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2 text-micro text-slate-500">
                      <span className="w-7 h-7 rounded-xl bg-slate-100 font-mono font-bold text-small text-slate-700 flex items-center justify-center shrink-0 tabular-nums">
                        {qIndex + 1}
                      </span>
                      <span className="font-semibold text-blue-700">{q.source}</span>
                      <span aria-hidden="true">·</span>
                      <span>{q.topic}</span>
                    </div>

                    <div className="flex items-center gap-2 text-micro font-bold">
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
                    <h3 className="text-statement font-extrabold text-slate-900 leading-snug">
                      {q.title}
                    </h3>
                    <div className="text-body text-slate-700 mt-2 whitespace-pre-line leading-relaxed">
                      {q.statement}
                    </div>

                    {q.statementLatex && (
                      <div className="my-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 inline-block overflow-x-auto max-w-full">
                        <Katex latex={q.statementLatex} displayMode={false} />
                      </div>
                    )}
                  </div>

                  {/* Interactive Prediction Options (Guess First) */}
                  {q.predictionOptions && q.predictionOptions.length > 0 && (
                    <div className="mt-2 p-4 rounded-2xl bg-amber-50/60 border border-amber-200/70 flex flex-col gap-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-amber-900 text-small font-bold">
                          <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                          <span>Try to predict first!</span>
                        </div>
                        {hasGuessed && (
                          <button
                            type="button"
                            onClick={() => {
                              setUserGuesses((prev) => {
                                const next = { ...prev };
                                delete next[q.id];
                                return next;
                              });
                            }}
                            className="text-micro text-amber-700 hover:text-amber-900 flex items-center gap-1 cursor-pointer whitespace-nowrap"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Try again</span>
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.predictionOptions.map((opt, optIdx) => {
                          const isSelected = userChoice === optIdx;
                          const isThisCorrect = q.correctOptionIndex === optIdx;

                          let btnStyle =
                            'bg-white text-slate-700 hover:bg-slate-50 border-amber-200/80';
                          if (hasGuessed) {
                            if (isThisCorrect) {
                              btnStyle =
                                'bg-emerald-100 text-emerald-900 border-emerald-400 font-bold shadow-2xs';
                            } else if (isSelected) {
                              btnStyle =
                                'bg-rose-100 text-rose-900 border-rose-300 font-medium line-through';
                            } else {
                              btnStyle = 'bg-white/60 text-slate-400 border-slate-200 opacity-60';
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              type="button"
                              disabled={hasGuessed}
                              onClick={() => handleSelectOption(q, optIdx)}
                              className={`min-h-[44px] p-3 rounded-xl border text-small text-left flex items-start gap-2.5 transition-all cursor-pointer ${btnStyle}`}
                            >
                              <span className="w-5 h-5 rounded-full bg-slate-100 font-mono text-micro font-bold text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span className="leading-snug">{opt}</span>
                            </button>
                          );
                        })}
                      </div>

                      {hasGuessed && (
                        <div
                          className={`p-3 rounded-xl text-small font-medium flex items-center gap-2 ${
                            isCorrectGuess
                              ? 'bg-emerald-100/70 text-emerald-950 border border-emerald-300'
                              : 'bg-blue-100/70 text-blue-950 border border-blue-300'
                          }`}
                        >
                          <CheckCircle2
                            className={`w-4 h-4 shrink-0 ${
                              isCorrectGuess ? 'text-emerald-700' : 'text-blue-700'
                            }`}
                          />
                          <span>
                            {isCorrectGuess
                              ? 'Spot on! Check each step below.'
                              : 'Nice try! Let’s walk through the steps below.'}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 3-Tier Progressive Hint Buttons */}
                  <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-t border-slate-100 mt-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setQuestionHintTier(q, activeTier === 1 ? 0 : 1)}
                        className={`min-h-[40px] px-3.5 py-2 rounded-xl text-small font-bold border flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                          activeTier >= 1
                            ? 'bg-amber-100 text-amber-950 border-amber-400'
                            : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                        }`}
                      >
                        <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>Hint 1: Clue</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setQuestionHintTier(q, activeTier === 2 ? 1 : 2)}
                        className={`min-h-[40px] px-3.5 py-2 rounded-xl text-small font-bold border flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                          activeTier >= 2
                            ? 'bg-sky-100 text-sky-950 border-sky-400'
                            : 'bg-sky-50 text-sky-900 border-sky-200 hover:bg-sky-100'
                        }`}
                      >
                        <Sparkles className="w-4 h-4 text-sky-600 shrink-0" />
                        <span>Hint 2: Next Step</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setQuestionHintTier(q, activeTier === 3 ? 0 : 3)}
                        className={`min-h-[40px] px-4 py-2 rounded-xl text-small font-bold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                          activeTier === 3
                            ? 'bg-slate-800 text-white hover:bg-slate-700'
                            : 'bg-[#005583] text-white hover:bg-[#003F62] shadow-2xs'
                        }`}
                      >
                        <span>{activeTier === 3 ? 'Hide Walkthrough' : 'Hint 3: Walkthrough'}</span>
                        {activeTier === 3 ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    <span className="text-micro text-slate-500 font-medium whitespace-nowrap">
                      {q.steps.length} {q.steps.length === 1 ? 'step' : 'steps'}
                    </span>
                  </div>
                </div>

                {/* Tier 1+: Gentle Clue Panel */}
                {activeTier >= 1 && (
                  <div className="border-t border-amber-200/70 bg-amber-50/60 px-4 sm:px-6 py-3.5 flex items-start gap-2.5 animate-fade-rise">
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div className="text-small text-amber-950">
                      <strong className="font-bold">Hint 1 (Gentle Clue): </strong>
                      <span>{q.keyRule}</span>
                    </div>
                  </div>
                )}

                {/* Tier 2+: Intermediate Opening Step Panel */}
                {activeTier >= 2 && q.steps[0] && (
                  <div className="border-t border-sky-200/70 bg-sky-50/60 px-4 sm:px-6 py-3.5 flex flex-col gap-1.5 animate-fade-rise">
                    <div className="text-small font-bold text-sky-950">
                      Hint 2 (Start Like This): {q.steps[0].title}
                    </div>
                    {q.steps[0].latex && (
                      <div className="p-2 rounded-xl bg-white border border-sky-200 self-start overflow-x-auto max-w-full">
                        <Katex latex={q.steps[0].latex} displayMode={false} />
                      </div>
                    )}
                    <p className="text-small text-sky-900">{q.steps[0].explanation}</p>
                  </div>
                )}

                {/* Tier 3: Full Tap-by-Tap Animated Walkthrough */}
                {activeTier === 3 && (
                  <div className="bg-slate-50/80 border-t border-slate-200 p-4 sm:p-6 flex flex-col gap-4 animate-fade-rise">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-micro font-bold uppercase tracking-wider text-slate-600">
                        Step-by-Step Walkthrough ({visibleStepsCount} of {q.steps.length})
                      </span>
                      <div className="flex items-center gap-2">
                        {!allWalkthroughDone && (
                          <>
                            <button
                              type="button"
                              onClick={() => advanceWalkthroughStep(q)}
                              className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-small font-bold cursor-pointer whitespace-nowrap"
                            >
                              Next Step ({visibleStepsCount + 1}/{q.steps.length})
                            </button>
                            <button
                              type="button"
                              onClick={() => revealAllWalkthroughSteps(q)}
                              className="min-h-[38px] px-3 py-1.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-micro font-bold cursor-pointer whitespace-nowrap"
                            >
                              Show All
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Progressively Revealed Steps */}
                    <div className="flex flex-col gap-3">
                      {q.steps.slice(0, visibleStepsCount).map((st, sIdx) => (
                        <div
                          key={sIdx}
                          className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col gap-2 animate-fade-rise"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-800 text-micro font-bold flex items-center justify-center shrink-0 tabular-nums">
                              {sIdx + 1}
                            </span>
                            <h5 className="text-small font-bold text-slate-900">{st.title}</h5>
                          </div>

                          {st.latex && (
                            <div className="my-1 p-2.5 rounded-xl bg-blue-50/60 border border-blue-100 overflow-x-auto text-center">
                              <Katex latex={st.latex} displayMode={false} />
                            </div>
                          )}

                          <p className="text-small text-slate-600 leading-relaxed">
                            {st.explanation}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Direct Answer Banner (unlocked once final step is reached) */}
                    {allWalkthroughDone && (
                      <div className="p-4 rounded-2xl bg-white border border-emerald-300 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fade-rise">
                        <div>
                          <span className="text-micro font-bold uppercase tracking-wider text-emerald-800">
                            Final Answer
                          </span>
                          <div className="text-body font-bold text-slate-900 mt-0.5">
                            {q.answer}
                          </div>
                        </div>

                        {q.answerLatex && (
                          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 shrink-0">
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
