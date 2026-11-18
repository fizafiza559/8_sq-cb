/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  BookOpen,
  Box,
  ChevronDown,
  Compass,
  Grid,
  History,
  Lock,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import { COLORS } from '../design/tokens';
import { SectionConfig, SectionId, SubTabId } from '../content/sections';

interface IndexDrawerProps {
  open: boolean;
  onClose: () => void;
  sections: SectionConfig[];
  activeSectionId: SectionId;
  activeTopicId?: string;
  onSelectSection: (sectionId: SectionId) => void;
  onSelectTopic?: (topicId: string, sectionId?: SectionId) => void;
}

interface RichTopicMeta {
  title: string;
  badge: string;
  keywords: string;
}

interface RichSectionMeta {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  accentBg: string;
  accentText: string;
}

const SECTION_META: Record<SectionId, RichSectionMeta> = {
  'sec-0': {
    title: 'Section 1: Lockers and Square Numbers',
    icon: Lock,
    accentBg: 'bg-amber-50',
    accentText: 'text-amber-700',
  },
  'sec-1': {
    title: 'Section 2: Patterns in Squares',
    icon: Sparkles,
    accentBg: 'bg-sky-50',
    accentText: 'text-sky-700',
  },
  'sec-2': {
    title: 'Section 3: Square Roots',
    icon: Compass,
    accentBg: 'bg-emerald-50',
    accentText: 'text-emerald-700',
  },
  'sec-3': {
    title: 'Section 4: Cubes and Cube Roots',
    icon: Box,
    accentBg: 'bg-purple-50',
    accentText: 'text-purple-700',
  },
  'sec-4': {
    title: 'Section 5: History and Puzzles',
    icon: History,
    accentBg: 'bg-orange-50',
    accentText: 'text-orange-700',
  },
  'sec-5': {
    title: 'Section 6: NCERT Practice Arena',
    icon: BookOpen,
    accentBg: 'bg-blue-50',
    accentText: 'text-[#005583]',
  },
};

const TOPIC_META: Partial<Record<SubTabId, RichTopicMeta>> = {
  'locker-puzzle': {
    title: 'The 100 Lockers Puzzle',
    badge: 'Interactive Sim',
    keywords: 'queen ratnamanjuri khoisnam locker puzzle open closed squares',
  },
  'factor-partners': {
    title: 'Factor Partners & The Lone 6×6',
    badge: '36-Dot Grid',
    keywords: 'factors partners divisor pairs odd factor count 36 grid',
  },
  'squares-areas': {
    title: 'Squares as Geometric Areas',
    badge: '2.5 Decimal & 3/5 Fraction',
    keywords: 'area tile decimal 2.5 fraction 3/5 square geometry',
  },
  'last-digits': {
    title: 'Last Digits, Zeros & Parity',
    badge: 'Machine & 1-30 Table',
    keywords: 'ending digits zeros parity even odd 1 to 30 table',
  },
  'odd-squares': {
    title: 'Odd Numbers Make Squares',
    badge: 'Gnomon L-Proof',
    keywords: 'odd numbers consecutive gnomon l border sum squares',
  },
  'between-triangular': {
    title: 'Between Squares & Triangular',
    badge: 'Zipper Animation',
    keywords: 'triangular numbers staircase zipper between squares',
  },
  'roots-plus-minus': {
    title: 'Roots and Plus-Minus',
    badge: 'Area to Side',
    keywords: 'square root plus minus negative positive inverse side',
  },
  'finding-roots': {
    title: 'Finding Roots: Repeated Subtraction & Prime Pairs',
    badge: '25 vs 38',
    keywords: 'repeated odd subtraction 25 38 prime factor pairs 324 156',
  },
  'estimating-roots': {
    title: 'Estimating Roots: Interval Halving',
    badge: '√1936 Bracket',
    keywords: 'estimate 1936 bracket interval halving midpoint 45 44',
  },
  'building-cubes': {
    title: 'Building Cubes Layer-by-Layer',
    badge: '3D Isometric 4×4×4',
    keywords: '3d isometric volume cubes layers 4x4x4 explode',
  },
  'cube-patterns': {
    title: 'Cube Patterns & Ending Digits',
    badge: '1-20 Cubes Table',
    keywords: 'cube digits swap 2 8 3 7 trailing zeros 1 to 20',
  },
  'taxicab-numbers': {
    title: 'Taxicab Numbers (1729, 4104, 13832)',
    badge: 'Dual Scale',
    keywords: 'ramanujan hardy 1729 4104 13832 taxicab balance scale',
  },
  'cubes-odd-numbers': {
    title: 'Cubes and Consecutive Odds',
    badge: 'Odd Number Tape',
    keywords: 'consecutive odd tape cubes sum pattern',
  },
  'cube-roots': {
    title: 'Cube Roots & Prime Triplets',
    badge: '3375 vs 500',
    keywords: 'prime triplets cube roots 3375 500 multiply divide',
  },
  'successive-differences': {
    title: 'Successive Differences Engine',
    badge: 'Difference Ladder',
    keywords: 'differences pyramid subtraction tree constant 2 6',
  },
  'pinch-history': {
    title: 'A Pinch of History: Varga, Ghana, Mūla',
    badge: 'Aryabhata Story',
    keywords: 'aryabhata sanskrit varga ghana mula root history',
  },
  'chapter-summary': {
    title: 'Chapter Summary',
    badge: '7 NCERT Review Cards',
    keywords: 'summary recap review squares cubes compare',
  },
  'square-pairs': {
    title: 'Square Pairs! (1 to 17 Chain)',
    badge: 'Interactive Puzzle',
    keywords: 'square pairs 1 to 17 chain game puzzle',
  },
  'ncert-unsolved': {
    title: 'Figure It Out Exercises',
    badge: '14 Unsolved Problems',
    keywords: 'figure it out ncert exercises practice unsolved problems',
  },
  'solved-examples': {
    title: 'Solved Examples',
    badge: '16 Step-by-Step Solutions',
    keywords: 'solved examples solutions worked out steps',
  },
  'concept-clearing': {
    title: 'Concept Clearing & In-Text Checks',
    badge: '10 Core Checks',
    keywords: 'concept clearing in text checks quick review',
  },
};

export const IndexDrawer: React.FC<IndexDrawerProps> = ({
  open,
  onClose,
  sections,
  activeSectionId,
  activeTopicId,
  onSelectSection,
  onSelectTopic,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const [howToUseOpen, setHowToUseOpen] = useState(false);

  const drawerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const activeItemRef = useRef<HTMLButtonElement>(null);

  // Reset transient state, focus search or close safely, and trap Tab focus when open
  useEffect(() => {
    if (!open) return;

    setHowToUseOpen(false);
    setSearchQuery('');

    const frameId = window.requestAnimationFrame(() => {
      activeItemRef.current?.scrollIntoView({ block: 'center', behavior: 'auto' });
      closeBtnRef.current?.focus({ preventScroll: true });
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onClose();
        return;
      }

      if (e.key === 'Tab' && drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [open, onClose]);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredSections = useMemo(() => {
    if (!normalizedQuery) return sections;

    return sections
      .map((sec) => {
        const secMeta = SECTION_META[sec.id];
        const secMatches =
          sec.label.toLowerCase().includes(normalizedQuery) ||
          (secMeta?.title.toLowerCase().includes(normalizedQuery) ?? false);

        if (secMatches) return sec;

        const matchingTabs = sec.subTabs.filter((topic) => {
          const meta = TOPIC_META[topic.id];
          const haystack = [
            topic.label,
            meta?.title ?? '',
            meta?.badge ?? '',
            meta?.keywords ?? '',
          ]
            .join(' ')
            .toLowerCase();
          return haystack.includes(normalizedQuery);
        });

        if (matchingTabs.length === 0) return null;
        return { ...sec, subTabs: matchingTabs };
      })
      .filter((s): s is SectionConfig => s !== null);
  }, [sections, normalizedQuery]);

  if (!open) return null;

  const toggleSectionCollapse = (secId: string) => {
    setCollapsedSections((prev) => ({ ...prev, [secId]: !prev[secId] }));
  };

  return (
    <div data-no-nav="true" className="fixed inset-0 z-50 flex justify-end">
      {/* Soft dimmed backdrop */}
      <div
        data-no-nav="true"
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/30 backdrop-blur-[1px] animate-backdrop-in"
      />

      {/* Right-side primary navigation drawer */}
      <div
        ref={drawerRef}
        id="index-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="index-drawer-title"
        data-no-nav="true"
        className="relative z-10 h-full w-full sm:w-[380px] md:w-[420px] bg-white border-l border-slate-200/80 shadow-2xl flex flex-col animate-drawer-in"
      >
        {/* Header & Quick Search */}
        <div className="px-4 sm:px-5 pt-4 pb-3.5 border-b border-slate-200/80 flex flex-col gap-3 shrink-0 bg-white">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <Grid className="w-4 h-4 shrink-0" style={{ color: COLORS.primary }} />
                <h2
                  id="index-drawer-title"
                  className="text-statement sm:text-title font-extrabold tracking-tight leading-tight"
                  style={{ color: COLORS.headingText }}
                >
                  Chapter Index &amp; Navigation
                </h2>
              </div>
              <p className="text-micro font-medium text-slate-500 mt-0.5">
                Class 8 NCERT · Squares &amp; Cubes
              </p>
            </div>

            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label="Close chapter index"
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick progress summary chip */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-sky-50/90 text-[#005583] text-micro font-bold tabular-nums">
              6 Sections · 18 Topics · 40 Exercises
            </span>
          </div>

          {/* Quick filter/search input */}
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Jump to 1729, Prime, Locker, Figure It Out..."
              aria-label="Filter topics, puzzles, or exercises"
              className="w-full h-10 pl-9 pr-9 rounded-xl bg-slate-50 border border-slate-200/90 text-small text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#005583] focus:bg-white transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  searchInputRef.current?.focus();
                }}
                aria-label="Clear search filter"
                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 absolute right-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Thorough 6-Section Navigation Hub */}
        <nav
          aria-label="Chapter index"
          className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-3.5 sm:px-4 py-3.5 space-y-3 bg-slate-50/40"
        >
          {filteredSections.length === 0 ? (
            <div className="py-12 px-4 text-center flex flex-col items-center gap-2">
              <Search className="w-6 h-6 text-slate-300" />
              <p className="text-small font-semibold text-slate-600">
                No topics match &ldquo;{searchQuery}&rdquo;
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-micro font-bold text-[#005583] hover:underline cursor-pointer"
              >
                Show all 6 sections
              </button>
            </div>
          ) : (
            filteredSections.map((sec) => {
              const isActiveSection = sec.id === activeSectionId;
              const secMeta = SECTION_META[sec.id];
              const SectionIcon = secMeta?.icon || BookOpen;
              const isCollapsed = !normalizedQuery && Boolean(collapsedSections[sec.id]);

              return (
                <section
                  key={sec.id}
                  className={`rounded-2xl border bg-white overflow-hidden transition-colors ${
                    isActiveSection ? 'border-sky-200 shadow-2xs' : 'border-slate-200/80'
                  }`}
                >
                  {/* Section Card Header */}
                  <div className="flex items-center justify-between gap-2 px-3 py-2.5 border-b border-slate-100/90">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectSection(sec.id);
                        onClose();
                      }}
                      className="flex-1 min-w-0 flex items-center gap-2.5 text-left cursor-pointer group"
                    >
                      <span
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                          secMeta?.accentBg || 'bg-slate-100'
                        } ${secMeta?.accentText || 'text-slate-700'}`}
                      >
                        <SectionIcon className="w-4 h-4" />
                      </span>
                      <div className="min-w-0">
                        <div className="text-small font-extrabold text-slate-900 group-hover:text-[#005583] transition-colors leading-snug">
                          {secMeta?.title || sec.label}
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleSectionCollapse(sec.id)}
                      aria-expanded={!isCollapsed}
                      aria-label={`Toggle ${sec.label}`}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer shrink-0 transition-colors"
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isCollapsed ? '-rotate-90' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Topic Rows */}
                  {!isCollapsed && (
                    <div className="p-1.5 flex flex-col gap-1">
                      {sec.subTabs.map((topic) => {
                        const isActiveTopic = isActiveSection && topic.id === activeTopicId;
                        const meta = TOPIC_META[topic.id];
                        const displayTitle = meta?.title || topic.label;
                        const badgeText = meta?.badge;

                        return (
                          <button
                            key={topic.id}
                            ref={isActiveTopic ? activeItemRef : undefined}
                            type="button"
                            onClick={() => {
                              if (onSelectTopic) {
                                onSelectTopic(topic.id, sec.id);
                              } else {
                                onSelectSection(sec.id);
                              }
                              onClose();
                            }}
                            aria-current={isActiveTopic ? 'page' : undefined}
                            className={`w-full min-h-[44px] px-3 py-2 rounded-xl text-left flex items-center justify-between gap-2.5 transition-colors cursor-pointer ${
                              isActiveTopic
                                ? 'bg-sky-50 text-[#005583] border-l-4 border-[#005583]'
                                : 'text-slate-700 hover:bg-slate-50 border-l-4 border-transparent'
                            }`}
                          >
                            <span
                              className={`text-small leading-snug ${
                                isActiveTopic ? 'font-bold text-[#005583]' : 'font-medium text-slate-800'
                              }`}
                            >
                              {displayTitle}
                            </span>

                            {badgeText && (
                              <span
                                className={`px-2 py-0.5 rounded-md text-[11px] font-semibold whitespace-nowrap shrink-0 ${
                                  isActiveTopic
                                    ? 'bg-sky-100/90 text-[#005583]'
                                    : 'bg-slate-100 text-slate-500'
                                }`}
                              >
                                {badgeText}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </section>
              );
            })
          )}
        </nav>

        {/* Bottom collapsed 'How to use' row */}
        <div className="shrink-0 border-t border-slate-200/80 px-3.5 py-2 bg-white">
          <button
            type="button"
            onClick={() => setHowToUseOpen((prev) => !prev)}
            aria-expanded={howToUseOpen}
            className="w-full min-h-[40px] px-2.5 py-1.5 rounded-xl flex items-center justify-between text-small font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <span>Quick Navigation Tips</span>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                howToUseOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {howToUseOpen && (
            <ul className="px-2.5 pb-2.5 pt-1 space-y-1.5 text-micro leading-relaxed text-slate-600 animate-fade-rise">
              <li>
                <strong className="text-slate-800">Tap &amp; Double-tap:</strong> Tap stage to continue · Double-tap to go back.
              </li>
              <li>
                <strong className="text-slate-800">Step rail &amp; keys:</strong> Use left step numbers, Space, Enter, or Arrow keys.
              </li>
              <li>
                <strong className="text-slate-800">Instant jump:</strong> Pick any topic above to open its interactive lab right away.
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
