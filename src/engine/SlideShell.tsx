/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronRight, Eye, EyeOff, Layers, Maximize2, Minimize2 } from 'lucide-react';
import { COLORS } from '../design/tokens';
import { SectionConfig, SectionId } from '../content/sections';
import { RevealUnit, useTapNavigator } from './useTapNavigator';
import { IndexDrawer } from '../components/IndexDrawer';

export interface SlideStepItem {
  id: string;
  title: string;
}

export interface SlideTopicTab {
  id: string;
  label: string;
}

interface SlideShellProps {
  sections: SectionConfig[];
  activeSectionId: SectionId;
  onSelectSection: (sectionId: SectionId) => void;

  activeChapter?: string;
  onSelectChapter?: (chapterId: string) => void;

  topics?: SlideTopicTab[];
  activeTopicId?: string;
  onSelectTopic?: (topicId: string, sectionId?: SectionId) => void;
  topLeftExtra?: React.ReactNode;

  steps: SlideStepItem[];
  currentStepIndex: number;
  onSelectStep: (index: number) => void;

  // Ordered reveal units for tap/keyboard navigation (defaults to rail steps)
  units?: RevealUnit[];
  currentUnitIndex?: number;
  onNext: () => boolean | void;
  onBack: () => void;
  isAnimating?: () => boolean;
  finishAnimation?: () => boolean;

  // Subtle cue on the final unit of the current screen
  isLastUnit?: boolean;
  nextScreenLabel?: string;

  // Slim controls dock row directly above mobile dots (slides in on interactive steps)
  controlsDock?: React.ReactNode;

  children: React.ReactNode;
}

export const SlideShell: React.FC<SlideShellProps> = ({
  sections,
  activeSectionId,
  onSelectSection,
  activeChapter = 'ch-2',
  onSelectChapter,
  topics,
  activeTopicId,
  onSelectTopic,
  topLeftExtra,
  steps,
  currentStepIndex,
  onSelectStep,
  units,
  currentUnitIndex,
  onNext,
  onBack,
  isAnimating,
  finishAnimation,
  isLastUnit,
  nextScreenLabel,
  controlsDock,
  children,
}) => {
  const [focusMode, setFocusMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showIndex, setShowIndex] = useState(false);
  const [hasTappedOnce, setHasTappedOnce] = useState(false);

  // Hover or long-press step title tooltip state
  const [tooltip, setTooltip] = useState<{ text: string; top: number; left: number } | null>(null);
  const [mobileDotTitle, setMobileDotTitle] = useState<string | null>(null);
  const [chapterMenuOpen, setChapterMenuOpen] = useState(false);
  const chapterMenuRef = useRef<HTMLDivElement>(null);
  const longPressTimerRef = useRef<number | null>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const wasIndexOpenRef = useRef(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (chapterMenuRef.current && !chapterMenuRef.current.contains(e.target as Node)) {
        setChapterMenuOpen(false);
      }
    };
    if (chapterMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [chapterMenuOpen]);

  const activeSection = sections.find((s) => s.id === activeSectionId) || sections[0];
  const totalSteps = Math.max(1, steps.length);
  const clampedStep = Math.max(0, Math.min(totalSteps - 1, currentStepIndex));

  const effectiveUnits = units && units.length > 0 ? units : steps;
  const effectiveUnitIndex = currentUnitIndex !== undefined ? currentUnitIndex : clampedStep;

  const {
    stagePointerProps,
    ripples,
    totalUnits,
    clampedIndex: clampedUnitIndex,
    currentUnit,
  } = useTapNavigator({
    units: effectiveUnits,
    currentIndex: effectiveUnitIndex,
    goNext: onNext,
    goBack: onBack,
    isAnimating,
    finishAnimation,
    disabled: showIndex,
    onFirstSuccessfulTap: () => setHasTappedOnce(true),
  });

  const effectiveIsLastUnit =
    isLastUnit !== undefined ? isLastUnit : clampedUnitIndex >= totalUnits - 1;

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Return focus to the Sections menu button whenever the Index drawer closes
  useEffect(() => {
    if (showIndex) {
      wasIndexOpenRef.current = true;
    } else if (wasIndexOpenRef.current) {
      wasIndexOpenRef.current = false;
      window.requestAnimationFrame(() => {
        menuBtnRef.current?.focus({ preventScroll: true });
      });
    }
  }, [showIndex]);

  const handleCloseIndex = useCallback(() => {
    setShowIndex(false);
  }, []);

  useEffect(() => {
    return () => {
      if (longPressTimerRef.current) window.clearTimeout(longPressTimerRef.current);
    };
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Gracefully ignore if browser/iframe blocks fullscreen API
    }
  };

  const showStepTooltip = (el: HTMLElement, title: string) => {
    const rect = el.getBoundingClientRect();
    setTooltip({
      text: title,
      top: rect.top + rect.height / 2,
      left: rect.right + 10,
    });
  };

  const handleTouchStartStep = (el: HTMLElement, title: string, isMobileStrip = false) => {
    if (longPressTimerRef.current) window.clearTimeout(longPressTimerRef.current);
    longPressTimerRef.current = window.setTimeout(() => {
      if (isMobileStrip) {
        setMobileDotTitle(title);
      } else {
        showStepTooltip(el, title);
      }
    }, 380);
  };

  const clearStepTooltip = () => {
    if (longPressTimerRef.current) {
      window.clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    setTooltip(null);
    setMobileDotTitle(null);
  };

  const renderUtilityControls = (compact = false) => (
    <div data-no-nav="true" className="flex items-center gap-1.5 shrink-0">
      <button
        type="button"
        onClick={() => {
          setFocusMode((f) => !f);
          setShowIndex(false);
        }}
        title={focusMode ? 'Exit focus mode' : 'Focus mode'}
        aria-label={focusMode ? 'Exit focus mode' : 'Focus mode'}
        className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 cursor-pointer transition-colors"
        style={{ color: focusMode ? COLORS.primary : COLORS.mutedText }}
      >
        {focusMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>

      {!compact && (
        <button
          type="button"
          onClick={toggleFullscreen}
          title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          className="hidden sm:flex w-10 h-10 items-center justify-center rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 cursor-pointer transition-colors"
          style={{ color: isFullscreen ? COLORS.primary : COLORS.mutedText }}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      )}

      <button
        ref={menuBtnRef}
        type="button"
        onClick={() => setShowIndex((s) => !s)}
        title="Sections & Topics"
        aria-label="Open sections and topics menu"
        aria-expanded={showIndex}
        aria-controls="index-drawer"
        className="h-10 px-3 flex items-center justify-center gap-1.5 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 cursor-pointer transition-colors text-micro font-bold whitespace-nowrap shrink-0"
        style={{ color: showIndex ? COLORS.primary : COLORS.headingText }}
      >
        <Layers className="w-4 h-4 shrink-0" style={{ color: COLORS.primary }} />
        <span className="lg:hidden">Sections</span>
        <span className="hidden lg:inline">Index</span>
      </button>
    </div>
  );

  return (
    <div
      className="h-screen w-full flex flex-col overflow-hidden select-none"
      style={{ backgroundColor: '#F8FAFF', color: COLORS.bodyText }}
    >
      {/* Screen-reader live announcement for current step */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Step {clampedUnitIndex + 1} of {totalUnits}
        {currentUnit?.title ? `: ${currentUnit.title}` : ''}
      </div>

      {/* 1. HEADER: Calm minimal 56px navigation chrome (hidden in Focus mode) */}
      {!focusMode && (
        <header
          data-no-nav="true"
          className="h-14 px-3 sm:px-5 lg:px-6 border-b border-slate-200/80 bg-white/95 backdrop-blur-sm flex items-center justify-between gap-3 shrink-0 z-30"
        >
          {/* Left: Compact Brand + Chapter Switcher + Mobile Active Section label */}
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="font-bold tracking-tight text-small shrink-0"
              style={{ color: COLORS.primary }}
            >
              NCERT
            </span>

            {/* Chapter Switcher Dropdown */}
            <div ref={chapterMenuRef} className="relative inline-block shrink-0">
              <button
                type="button"
                onClick={() => setChapterMenuOpen((o) => !o)}
                className="min-h-[38px] px-2.5 py-1 rounded-xl text-micro font-semibold border border-slate-200/80 bg-slate-50/60 hover:bg-slate-100/80 flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap"
                style={{ color: COLORS.headingText }}
                aria-expanded={chapterMenuOpen}
                aria-label="Switch chapter"
              >
                <span className="sm:hidden">{activeChapter === 'ch-1' ? 'Ch 1' : 'Ch 2'}</span>
                <span className="hidden sm:inline">
                  {activeChapter === 'ch-1' ? 'Ch 1: Linear Equations' : 'Ch 2: Squares & Cubes'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {chapterMenuOpen && (
                <div
                  className="absolute left-0 mt-1.5 w-64 rounded-2xl border border-slate-200 bg-white shadow-lg p-1.5 z-50 animate-fade-rise flex flex-col gap-1"
                >
                  <button
                    type="button"
                    onClick={() => {
                      onSelectChapter?.('ch-1');
                      setChapterMenuOpen(false);
                    }}
                    className={`min-h-[40px] px-3 py-2 rounded-xl text-left text-small transition-colors cursor-pointer flex items-center justify-between ${
                      activeChapter === 'ch-1'
                        ? 'bg-blue-50 text-blue-900 font-bold'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span>Chapter 1: Linear Equations</span>
                    {activeChapter === 'ch-1' && (
                      <span className="text-micro text-blue-600 font-bold">Active</span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectChapter?.('ch-2');
                      setChapterMenuOpen(false);
                    }}
                    className={`min-h-[40px] px-3 py-2 rounded-xl text-left text-small transition-colors cursor-pointer flex items-center justify-between ${
                      activeChapter === 'ch-2' || !activeChapter
                        ? 'bg-blue-50 text-blue-900 font-bold'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span>Chapter 2: Squares &amp; Cubes</span>
                    {(activeChapter === 'ch-2' || !activeChapter) && (
                      <span className="text-micro text-blue-600 font-bold">Active</span>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Active Section indicator on phones/tablets where center nav collapses */}
            <div className="lg:hidden flex items-center gap-1.5 min-w-0 text-small text-slate-500">
              <span className="opacity-50">/</span>
              <button
                type="button"
                onClick={() => setShowIndex(true)}
                className="truncate font-semibold text-slate-800 hover:text-[#005583] cursor-pointer text-left max-w-[140px] sm:max-w-[240px]"
              >
                {activeSection.shortLabel.replace(/^\d+\.\s*/, '')}
              </button>
            </div>
          </div>

          {/* Centre (lg+): Calm typographic section tabs with subtle bottom indicator */}
          <nav
            aria-label="Chapter sections"
            className="hidden lg:flex items-center justify-center gap-1 flex-1 min-w-0 overflow-x-auto no-scrollbar"
          >
            {sections.map((sec) => {
              const isActive = sec.id === activeSectionId;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => onSelectSection(sec.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative min-h-[40px] px-3 py-1.5 text-ui whitespace-nowrap shrink-0 flex items-center transition-colors cursor-pointer rounded-lg ${
                    isActive
                      ? 'font-bold text-[#005583]'
                      : 'font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50/80'
                  }`}
                >
                  <span>{sec.shortLabel}</span>
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full"
                      style={{ backgroundColor: COLORS.primary }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Calm utility actions + collapsible Sections trigger */}
          {renderUtilityControls(false)}
        </header>
      )}

      {/* Middle Area: Left Step Rail + Grid Stage */}
      <div className="flex-1 min-h-0 flex relative overflow-hidden">
        {/* 3. LEFT STEP RAIL (Desktop >= 768px, hidden in Focus mode) */}
        {!focusMode && (
          <aside
            aria-label="Step rail"
            data-no-nav="true"
            className="hidden md:flex flex-col items-center w-14 shrink-0 border-r border-slate-200/80 bg-white/95 py-3.5 gap-1.5 overflow-y-auto no-scrollbar z-20"
          >
            {steps.map((step, idx) => {
              const isActive = idx === clampedStep;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => onSelectStep(idx)}
                  onMouseEnter={(e) => showStepTooltip(e.currentTarget, step.title)}
                  onMouseLeave={clearStepTooltip}
                  onTouchStart={(e) => handleTouchStartStep(e.currentTarget, step.title, false)}
                  onTouchEnd={clearStepTooltip}
                  onTouchCancel={clearStepTooltip}
                  aria-label={`Step ${idx + 1}: ${step.title}`}
                  aria-current={isActive ? 'step' : undefined}
                  className="w-11 h-11 p-1 flex items-center justify-center shrink-0 cursor-pointer"
                >
                  <span
                    className="w-9 h-9 rounded-full text-micro tabular-nums font-semibold flex items-center justify-center shrink-0 transition-colors"
                    style={{
                      backgroundColor: isActive ? COLORS.primary : '#FFFFFF',
                      color: isActive ? '#FFFFFF' : COLORS.mutedText,
                      border: `1px solid ${isActive ? COLORS.primary : '#E2E8F0'}`,
                    }}
                  >
                    {idx + 1}
                  </span>
                </button>
              );
            })}
          </aside>
        )}

        {/* Fixed tooltip for hovered/long-pressed rail button */}
        {tooltip && !focusMode && (
          <div
            className="fixed z-50 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-small font-medium max-w-[240px] pointer-events-none -translate-y-1/2 shadow-sm"
            style={{
              top: tooltip.top,
              left: tooltip.left,
              color: COLORS.headingText,
            }}
          >
            {tooltip.text}
          </div>
        )}

        {/* 4. STAGE: #F8FAFF with faint 28px square grid (#E3EAF8), tap/double-tap navigable */}
        <main
          {...stagePointerProps}
          className="flex-1 min-w-0 min-h-0 flex flex-col relative overflow-y-auto select-none"
          style={{
            backgroundColor: '#F8FAFF',
            backgroundImage:
              'linear-gradient(to right, rgba(227, 234, 248, 0.72) 1px, transparent 1px), linear-gradient(to bottom, rgba(227, 234, 248, 0.72) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            touchAction: 'manipulation',
          }}
        >
          {/* Floating utility icons when Focus mode hides the header */}
          {focusMode && (
            <div data-no-nav="true" className="sticky top-3 z-30 flex justify-end px-4 pointer-events-none">
              <div className="pointer-events-auto">{renderUtilityControls(true)}</div>
            </div>
          )}

          {/* 2. TOPICS + optional top-left filter: scrollable single-row bar on phones & spacious on desktop */}
          {((topics && topics.length >= 2) || topLeftExtra) && (
            <div
              data-no-nav="true"
              className="px-4 sm:px-6 md:px-10 pt-3 pb-1 border-b border-slate-200/50 bg-white/55 backdrop-blur-[2px] flex items-center gap-4 overflow-x-auto no-scrollbar shrink-0"
            >
              {topics && topics.length >= 2 && (
                <div className="flex items-center gap-1 sm:gap-2 min-w-max">
                  {topics.map((topic) => {
                    const isActive = topic.id === activeTopicId;
                    return (
                      <button
                        key={topic.id}
                        type="button"
                        onClick={() => onSelectTopic?.(topic.id)}
                        className="text-ui font-semibold min-h-[44px] px-3 py-1.5 transition-colors cursor-pointer border-b-2 flex items-center whitespace-nowrap shrink-0"
                        style={{
                          color: isActive ? COLORS.primary : COLORS.mutedText,
                          borderColor: isActive ? COLORS.primary : 'transparent',
                        }}
                      >
                        {topic.label}
                      </button>
                    );
                  })}
                </div>
              )}
              {topLeftExtra && <div className="shrink-0">{topLeftExtra}</div>}
            </div>
          )}

          {/* Centered airy stage content */}
          <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-10 py-4 sm:py-6 flex flex-col items-center">
            {activeSection.storyHook && clampedStep === 0 && (
              <p className="mb-3 text-micro sm:text-small font-medium text-slate-500 text-center max-w-xl animate-fade-rise">
                {activeSection.storyHook}
              </p>
            )}
            <div className="w-full min-w-0 my-auto flex flex-col items-center transition-opacity duration-200 ease-out">
              {children}
            </div>
          </div>

          {/* Instant soft primary ripple at first-tap point */}
          {ripples.map((r) => (
            <span
              key={r.id}
              aria-hidden="true"
              className="fixed pointer-events-none z-40 rounded-full animate-tap-ripple"
              style={{
                left: r.x,
                top: r.y,
                width: '44px',
                height: '44px',
                backgroundColor: 'rgba(0, 85, 131, 0.16)',
                border: '1.5px solid rgba(0, 85, 131, 0.35)',
              }}
            />
          ))}

          {/* Bottom stage cues: quiet unboxed text cue */}
          <div className="w-full px-4 pb-4 pt-1 flex flex-col items-center gap-1.5 pointer-events-none shrink-0">
            {effectiveIsLastUnit && nextScreenLabel && (
              <p
                className="text-small font-semibold text-center animate-fade-rise"
                style={{ color: COLORS.primary }}
              >
                Tap to continue → {nextScreenLabel}
              </p>
            )}
            <p
              aria-hidden={hasTappedOnce}
              className={`text-micro font-medium text-center transition-opacity duration-500 ${
                hasTappedOnce ? 'opacity-0' : 'opacity-75'
              }`}
              style={{ color: COLORS.mutedText }}
            >
              Tap anywhere to continue · Double-tap to go back
            </p>
          </div>
        </main>
      </div>

      {/* Slim Controls Dock for interactive steps (with Continue chip) */}
      <div
        data-no-nav="true"
        className={`shrink-0 overflow-hidden transition-all duration-300 ease-out bg-white ${
          controlsDock ? 'max-h-64 opacity-100 border-t border-slate-200/80' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        {controlsDock && (
          <div className="px-4 md:px-6 py-2.5 max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex-1 min-w-0">{controlsDock}</div>
            <button
              type="button"
              onClick={() => onNext()}
              className="self-end sm:self-auto shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-ui font-semibold text-white min-h-[44px] cursor-pointer transition-opacity hover:opacity-90 whitespace-nowrap"
              style={{ backgroundColor: COLORS.primary }}
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* 3b. MOBILE STEP DOTS (< 768px) */}
      {!focusMode && totalSteps > 1 && (
        <div
          data-no-nav="true"
          className="md:hidden relative px-4 py-1.5 border-t border-slate-200/80 shrink-0 overflow-x-auto no-scrollbar bg-white/90"
        >
          {mobileDotTitle && (
            <div
              className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-small font-medium max-w-[85vw] truncate pointer-events-none shadow-sm"
              style={{ color: COLORS.headingText }}
            >
              {mobileDotTitle}
            </div>
          )}
          <div className="flex items-center gap-1 min-w-max mx-auto">
            {steps.map((step, idx) => {
              const isActive = idx === clampedStep;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => onSelectStep(idx)}
                  onTouchStart={(e) => handleTouchStartStep(e.currentTarget, step.title, true)}
                  onTouchEnd={clearStepTooltip}
                  onTouchCancel={clearStepTooltip}
                  aria-label={`Step ${idx + 1}: ${step.title}`}
                  aria-current={isActive ? 'step' : undefined}
                  className="h-9 px-1 flex items-center justify-center cursor-pointer shrink-0"
                >
                  <span
                    className="h-2.5 rounded-full transition-all block"
                    style={{
                      width: isActive ? '22px' : '8px',
                      backgroundColor: isActive ? COLORS.primary : '#CBD5E1',
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}
      <IndexDrawer
        open={showIndex}
        onClose={handleCloseIndex}
        sections={sections}
        activeSectionId={activeSectionId}
        activeTopicId={activeTopicId}
        onSelectSection={onSelectSection}
        onSelectTopic={onSelectTopic}
      />
    </div>
  );
};
