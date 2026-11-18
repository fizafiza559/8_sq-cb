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
  topics: _topics,
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
    <div data-no-nav="true" className="flex items-center gap-1.5 sm:gap-2 shrink-0">
      <button
        type="button"
        onClick={() => {
          setFocusMode((f) => !f);
          setShowIndex(false);
        }}
        title={focusMode ? 'Exit focus mode' : 'Focus mode'}
        aria-label={focusMode ? 'Exit focus mode' : 'Focus mode'}
        className="w-11 h-11 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 cursor-pointer transition-colors"
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
        title="Chapter Index & Navigation"
        aria-label="Open Chapter Index and Navigation"
        aria-expanded={showIndex}
        aria-controls="index-drawer"
        className="h-11 sm:h-10 px-3 sm:px-3.5 flex items-center justify-center gap-1.5 rounded-xl font-bold text-micro sm:text-small shadow-xs cursor-pointer transition-all whitespace-nowrap shrink-0"
        style={{
          backgroundColor: showIndex ? '#003F62' : COLORS.primary,
          color: '#FFFFFF',
        }}
      >
        <Layers className="w-4 h-4 shrink-0" />
        <span>Index</span>
      </button>
    </div>
  );

  return (
    <div
      className="h-[100dvh] w-full flex flex-col overflow-hidden select-none"
      style={{ backgroundColor: '#F8FAFF', color: COLORS.bodyText }}
    >
      {/* Screen-reader live announcement for current step */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Step {clampedUnitIndex + 1} of {totalUnits}
        {currentUnit?.title ? `: ${currentUnit.title}` : ''}
      </div>

      {/* 1. HEADER: Clean, minimal 56px chrome with breadcrumb left & Index hub right */}
      {!focusMode && (
        <header
          data-no-nav="true"
          className="h-14 px-3 sm:px-5 lg:px-6 border-b border-slate-200/80 bg-white/95 backdrop-blur-sm flex items-center justify-between gap-3 shrink-0 z-30"
        >
          {/* Left: Clean title / breadcrumb badge + compact Chapter indicator */}
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className="flex items-center gap-1.5 min-w-0 text-small font-semibold text-slate-700">
              <span className="font-extrabold tracking-tight shrink-0" style={{ color: COLORS.primary }}>
                NCERT
              </span>
              <span className="text-slate-300 shrink-0" aria-hidden="true">
                &gt;
              </span>
              <span className="text-slate-500 hidden sm:inline shrink-0">Class 8</span>
              <span className="text-slate-300 hidden sm:inline shrink-0" aria-hidden="true">
                &gt;
              </span>
              <span className="font-bold text-slate-900 truncate">
                {activeChapter === 'ch-1' ? 'Linear Equations' : 'Squares & Cubes'}
              </span>
            </div>

            {/* Compact Chapter 2 indicator / switcher */}
            <div ref={chapterMenuRef} className="relative inline-block shrink-0">
              <button
                type="button"
                onClick={() => setChapterMenuOpen((o) => !o)}
                className="min-h-[44px] sm:min-h-[34px] px-2.5 py-0.5 rounded-lg text-micro font-bold border border-sky-200/80 bg-sky-50/80 hover:bg-sky-100/80 flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap"
                style={{ color: COLORS.primary }}
                aria-expanded={chapterMenuOpen}
                aria-label="Chapter indicator"
              >
                <span>{activeChapter === 'ch-1' ? 'Ch 1' : 'Ch 2'}</span>
                <ChevronDown className="w-3 h-3 opacity-75" />
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
                    className={`min-h-[44px] px-3 py-2 rounded-xl text-left text-small transition-colors cursor-pointer flex items-center justify-between ${
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
                    className={`min-h-[44px] px-3 py-2 rounded-xl text-left text-small transition-colors cursor-pointer flex items-center justify-between ${
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
          </div>

          {/* Right: Calm utility actions + highlighted Index portal button */}
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

        {/* 4. STAGE: #F8FAFF with faint 28px square grid (#E3EAF8), zero-scroll 100vh lock */}
        <main
          {...stagePointerProps}
          className="flex-1 min-w-0 min-h-0 flex flex-col justify-between items-center overflow-hidden p-2 sm:p-3 select-none relative"
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
            <div data-no-nav="true" className="w-full flex justify-end px-2 pt-1 shrink-0 z-30 pointer-events-none">
              <div className="pointer-events-auto">{renderUtilityControls(true)}</div>
            </div>
          )}

          {topLeftExtra && (
            <div data-no-nav="true" className="w-full max-w-6xl mx-auto px-2 sm:px-4 pt-1 shrink-0">
              {topLeftExtra}
            </div>
          )}

          {/* Zero-overflow stage content - aligned cleanly to top */}
          <div className="w-full flex-1 min-w-0 min-h-0 max-w-6xl mx-auto px-1 sm:px-3 md:px-4 flex flex-col items-center justify-start overflow-hidden">
            <div className="w-full flex-1 min-w-0 min-h-0 flex flex-col items-center justify-start transition-opacity duration-200 ease-out">
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
        </main>
      </div>

      {/* 5. BOTTOM NAVIGATION DOCK: Wraps cleanly instead of horizontal scrolling */}
      {!focusMode && (
        <footer
          data-no-nav="true"
          className="min-h-14 px-2.5 sm:px-5 lg:px-6 py-1.5 border-t border-slate-200/80 bg-white/95 backdrop-blur-sm flex items-center justify-between gap-2 sm:gap-3 shrink-0 z-20"
        >
          {controlsDock ? (
            <div className="w-full max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2 min-w-0">
              <div className="flex-1 min-w-0 flex flex-wrap items-center gap-1.5">{controlsDock}</div>
              <button
                type="button"
                onClick={() => onNext()}
                className="shrink-0 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-small font-semibold text-white min-h-[44px] cursor-pointer transition-opacity hover:opacity-90 whitespace-nowrap"
                style={{ backgroundColor: COLORS.primary }}
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              {/* Mobile Step Dots (< 768px) */}
              <div className="md:hidden w-full flex items-center justify-between gap-2 min-w-0">
                {mobileDotTitle && (
                  <div
                    className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-small font-medium max-w-[85vw] truncate pointer-events-none shadow-sm"
                    style={{ color: COLORS.headingText }}
                  >
                    {mobileDotTitle}
                  </div>
                )}

                {totalSteps > 1 ? (
                  <div className="flex-1 min-w-0 flex flex-wrap items-center justify-center gap-x-1 gap-y-0.5">
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
                          className="min-h-[44px] min-w-[24px] px-1 flex items-center justify-center cursor-pointer shrink-0"
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
                ) : (
                  <span className="text-micro font-medium text-slate-500 truncate mx-auto">
                    {activeSectionId === 'sec-5'
                      ? 'Tap the right card to reveal solution steps'
                      : effectiveIsLastUnit && nextScreenLabel
                      ? `Tap to continue → ${nextScreenLabel}`
                      : 'Tap anywhere to continue'}
                  </span>
                )}
              </div>

              {/* Desktop / Tablet Bottom Dock (>= 768px) */}
              <div className="hidden md:flex w-full max-w-6xl mx-auto items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-micro font-semibold text-slate-500 tabular-nums shrink-0">
                  {activeSectionId === 'sec-5' ? (
                    <span>Practice Arena · Single-Screen Mode</span>
                  ) : (
                    <span>
                      Step {clampedUnitIndex + 1} of {totalUnits}
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0 flex items-center justify-center">
                  {activeSectionId === 'sec-5' ? (
                    <span className="text-micro font-medium text-slate-500 truncate">
                      Pick an option on the left or tap the right panel to step through the solution
                    </span>
                  ) : effectiveIsLastUnit && nextScreenLabel ? (
                    <span
                      className="text-small font-semibold truncate animate-fade-rise"
                      style={{ color: COLORS.primary }}
                    >
                      Tap to continue → {nextScreenLabel}
                    </span>
                  ) : (
                    <span
                      className={`text-micro font-medium truncate transition-opacity duration-300 ${
                        hasTappedOnce ? 'opacity-65' : 'opacity-85'
                      }`}
                      style={{ color: COLORS.mutedText }}
                    >
                      Tap anywhere to continue · Double-tap to go back
                    </span>
                  )}
                </div>

                {activeSectionId !== 'sec-5' ? (
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => onBack()}
                      className="h-9 px-3 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 text-micro font-semibold text-slate-600 transition-colors cursor-pointer"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => onNext()}
                      className="h-9 px-3.5 rounded-xl text-micro font-bold text-white inline-flex items-center gap-1 transition-opacity hover:opacity-90 cursor-pointer"
                      style={{ backgroundColor: COLORS.primary }}
                    >
                      <span>{effectiveIsLastUnit && nextScreenLabel ? 'Next Topic' : 'Continue'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="w-24 shrink-0" aria-hidden="true" />
                )}
              </div>
            </>
          )}
        </footer>
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
