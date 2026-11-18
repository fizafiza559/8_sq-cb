/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { chapterData, sampleRefresherClip } from './content/chapterData';
import {
  CHAPTER_SECTIONS,
  SectionConfig,
  SectionId,
  SubTabConfig,
  SubTabId,
} from './content/sections';
import { RefresherMiniClip, Scene } from './types';
import { useTimeline } from './engine/useTimeline';
import { SlideShell, SlideStepItem } from './engine/SlideShell';
import { RevealUnit } from './engine/useTapNavigator';
import { QuickCheck } from './components/QuickCheck';
import { Katex } from './components/Katex';
import { HighlightHeadline } from './components/HighlightHeadline';
import { RefresherCard } from './components/RefresherCard';
import { SquareTileScene } from './scenes/SquareTileScene';
import { LastDigitPatternsScene } from './scenes/LastDigitPatternsScene';
import { OddSubtractionScene } from './scenes/OddSubtractionScene';
import { TriangularSquareZipper } from './scenes/TriangularSquareZipper';
import { SquareRootPrimeEstimateScene } from './scenes/SquareRootPrimeEstimateScene';
import { CubePatternsScene } from './scenes/CubePatternsScene';
import { CubeOddSumsAndTaxiScene } from './scenes/CubeOddSumsAndTaxiScene';
import { DifferenceEngineTable } from './scenes/DifferenceEngineTable';
import { HistoryVisualStory } from './scenes/HistoryVisualStory';
import { ChapterSummaryScene } from './scenes/ChapterSummaryScene';
import { SquarePairsPuzzle } from './scenes/SquarePairsPuzzle';
import { LockerStorySection, FactorPairsMorph36 } from './sections/LockerStorySection';
import { PracticeSection } from './sections/PracticeSection';
import { DotGridSquareVisualizer } from './components/DotGridSquareVisualizer';
import { IsometricCubeRenderer } from './components/IsometricCubeRenderer';
import { PrimeFactorGroupingHelper } from './components/PrimeFactorGroupingHelper';
import { COLORS } from './design/tokens';
import { selfCheck } from './math/facts';
import { useViewportTier } from './hooks/useViewportTier';

const ALL_SUBTABS: { sectionId: SectionId; subTab: SubTabConfig }[] = CHAPTER_SECTIONS.flatMap((sec) =>
  sec.subTabs.map((subTab) => ({ sectionId: sec.id, subTab }))
);

const REFRESHERS: Record<string, RefresherMiniClip> = {
  'refresher-multiplication': sampleRefresherClip,
};

export default function App() {
  const { tier, isNarrow } = useViewportTier();
  const [activeChapter, setActiveChapter] = useState<string>('ch-2');
  const [activeSectionId, setActiveSectionId] = useState<SectionId>('sec-0');
  const [activeSubTabId, setActiveSubTabId] = useState<SubTabId>('locker-puzzle');

  // Run selfCheck on mount in development
  useEffect(() => {
    try {
      selfCheck();
    } catch (err) {
      console.warn('selfCheck error:', err);
    }
  }, []);

  // Slide-based QuickCheck state for scenes (null = viewing scene beats)
  const [quickCheckIndex, setQuickCheckIndex] = useState<number | null>(null);
  const [quickCheckAnswers, setQuickCheckAnswers] = useState<Record<number, number>>({});
  const [quickCheckSolutionSteps, setQuickCheckSolutionSteps] = useState<Record<number, number>>({});

  // Module step for Section 0, Section 5, etc.
  const [moduleStep, setModuleStep] = useState(0);

  const chapter = chapterData;

  const activeSection: SectionConfig = useMemo(
    () => CHAPTER_SECTIONS.find((s) => s.id === activeSectionId) || CHAPTER_SECTIONS[0],
    [activeSectionId]
  );

  const activeSubTab: SubTabConfig = useMemo(
    () => activeSection.subTabs.find((st) => st.id === activeSubTabId) || activeSection.subTabs[0],
    [activeSection, activeSubTabId]
  );

  const activeSceneIndex = activeSubTab.sceneIndex ?? 0;
  const isSceneSubTab = activeSubTab.sceneIndex !== undefined;
  const currentScene: Scene = chapter.scenes[activeSceneIndex] || chapter.scenes[0];

  // Stable timeline hook
  const timeline = useTimeline(currentScene.beats.length);
  const { setT: setTimelineT } = timeline;
  const pendingBeatRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    if (pendingBeatRef.current !== null && isSceneSubTab) {
      setTimelineT(pendingBeatRef.current);
      pendingBeatRef.current = null;
    }
  }, [activeSubTabId, isSceneSubTab, currentScene.beats.length, setTimelineT]);

  const resetSlideSubStates = () => {
    pendingBeatRef.current = null;
    setQuickCheckIndex(null);
    setQuickCheckAnswers({});
    setQuickCheckSolutionSteps({});
    setModuleStep(0);
    timeline.setT(0);
  };

  const handleSelectSection = (sectionId: SectionId) => {
    const targetSection = CHAPTER_SECTIONS.find((s) => s.id === sectionId) || CHAPTER_SECTIONS[0];
    setActiveSectionId(sectionId);
    setActiveSubTabId(targetSection.subTabs[0].id);
    resetSlideSubStates();
  };

  const handleSelectSubTab = (subTabId: string, sectionId?: SectionId) => {
    const castSubTabId = subTabId as SubTabId;
    if (sectionId) {
      setActiveSectionId(sectionId);
    }
    setActiveSubTabId(castSubTabId);
    resetSlideSubStates();
  };

  const advanceAfterQuickCheck = () => {
    setQuickCheckIndex(null);
    setQuickCheckAnswers({});
    setQuickCheckSolutionSteps({});
    const subIdx = activeSection.subTabs.findIndex((st) => st.id === activeSubTab.id);
    if (subIdx >= 0 && subIdx < activeSection.subTabs.length - 1) {
      handleSelectSubTab(activeSection.subTabs[subIdx + 1].id);
      return;
    }
    const secIdx = CHAPTER_SECTIONS.findIndex((s) => s.id === activeSection.id);
    if (secIdx >= 0 && secIdx < CHAPTER_SECTIONS.length - 1) {
      handleSelectSection(CHAPTER_SECTIONS[secIdx + 1].id);
    }
  };

  // Left-rail steps
  const railSteps = useMemo<SlideStepItem[]>(() => {
    if (activeSubTab.id === 'locker-puzzle') {
      return [
        { id: 'lp-1', title: "1. Queen's Royal Decree" },
        { id: 'lp-2', title: '2. Secret Vault & Guess' },
        { id: 'lp-3', title: '3. Solution & Animation' },
      ];
    }
    if (activeSectionId === 'sec-5') {
      if (activeSubTab.id === 'ncert-unsolved') {
        return [
          { id: 'nu-1', title: 'Pages 10-11: Squares (Q1-Q5)' },
          { id: 'nu-2', title: 'Pages 10-11: Multipliers (Q6-Q9)' },
          { id: 'nu-3', title: 'Pages 16-17: Cubes (Q10-Q14)' },
        ];
      }
      if (activeSubTab.id === 'solved-examples') {
        return [
          { id: 'se-1', title: 'Squares & Roots (Ex 1 to 10)' },
          { id: 'se-2', title: 'Cubes & Roots (Ex 11 to 14)' },
          { id: 'se-3', title: 'Triangular & Differences (Ex 15-16)' },
        ];
      }
      if (activeSubTab.id === 'concept-clearing') {
        return [
          { id: 'cc-1', title: 'Factor Parity & Queen Passcode' },
          { id: 'cc-2', title: 'Zeros & Parity In-Text Rules' },
          { id: 'cc-3', title: 'Taxicab Numbers & Square Pairs' },
        ];
      }
    }
    if (activeSubTab.id === 'factor-partners') {
      return [
        { id: 'fp-1', title: 'Factors Division' },
        { id: 'fp-2', title: 'Partner Pairs' },
      ];
    }
    if (activeSubTab.id === 'squares-areas') {
      return [
        { id: 'sa-1', title: 'Equal Length and Width' },
        { id: 'sa-2', title: 'Square Area Explorer' },
      ];
    }
    if (isSceneSubTab) {
      return currentScene.beats.map((b) => ({ id: b.id, title: b.headline || b.narration }));
    }
    return [{ id: 'tool-step', title: activeSubTab.label }];
  }, [activeSubTab, currentScene.beats, isSceneSubTab]);

  const clampedStep = Math.max(0, Math.min(railSteps.length - 1, isSceneSubTab ? timeline.beatIndex : moduleStep));

  const currentBeat =
    currentScene.beats[Math.min(timeline.beatIndex, currentScene.beats.length - 1)] || currentScene.beats[0];

  const activeRefresher = currentScene.refresherId ? REFRESHERS[currentScene.refresherId] : undefined;

  // Tap-navigator units & Next/Back logic
  const qcQuestions = currentScene.quickCheck ?? [];
  const inQuickCheck = isSceneSubTab && quickCheckIndex !== null && qcQuestions.length > 0;

  const globalSubTabIdx = ALL_SUBTABS.findIndex(
    (entry) => entry.sectionId === activeSectionId && entry.subTab.id === activeSubTab.id
  );
  const nextGlobal = globalSubTabIdx >= 0 && globalSubTabIdx < ALL_SUBTABS.length - 1
    ? ALL_SUBTABS[globalSubTabIdx + 1]
    : undefined;

  const enterSubTabAtStart = (entry: { sectionId: SectionId; subTab: SubTabConfig }) => {
    pendingBeatRef.current = entry.subTab.sceneIndex !== undefined ? 0 : null;
    setActiveSectionId(entry.sectionId);
    setActiveSubTabId(entry.subTab.id);
    setQuickCheckIndex(null);
    setQuickCheckAnswers({});
    setQuickCheckSolutionSteps({});
    setModuleStep(0);
    timeline.setT(0);
  };

  let tapUnits: RevealUnit[] = railSteps;
  let currentUnitIndex = clampedStep;
  let isLastUnit = clampedStep >= railSteps.length - 1;
  let nextScreenLabel: string | undefined = nextGlobal?.subTab.label;

  if (inQuickCheck) {
    tapUnits = [
      ...qcQuestions.map((q, i) => ({ id: `${currentScene.id}-qc-${i}`, title: q.prompt })),
      { id: `${currentScene.id}-qc-result`, title: 'Quick Check Results' },
    ];
    currentUnitIndex = quickCheckIndex!;
    isLastUnit = quickCheckIndex! >= qcQuestions.length;
    nextScreenLabel = nextGlobal?.subTab.label;
  } else if (isSceneSubTab) {
    tapUnits = currentScene.beats.map((b) => ({ id: b.id, title: b.headline || b.narration }));
    currentUnitIndex = timeline.beatIndex;
    isLastUnit = timeline.beatIndex >= currentScene.beats.length - 1;
    nextScreenLabel = qcQuestions.length > 0 ? 'Quick Check' : nextGlobal?.subTab.label;
  } else {
    tapUnits = railSteps;
    currentUnitIndex = moduleStep;
    isLastUnit = moduleStep >= railSteps.length - 1;
    nextScreenLabel = nextGlobal?.subTab.label;
  }

  const handleTapNext = (): boolean => {
    if (inQuickCheck) {
      if (quickCheckIndex! < qcQuestions.length) {
        const activeQ = qcQuestions[quickCheckIndex!];
        const hasAnswered = quickCheckAnswers[quickCheckIndex!] !== undefined;
        const totalSolSteps = activeQ?.solutionSteps?.length || 1;
        const currentSolStep = quickCheckSolutionSteps[quickCheckIndex!] ?? 1;

        if (hasAnswered && currentSolStep < totalSolSteps) {
          setQuickCheckSolutionSteps((prev) => ({
            ...prev,
            [quickCheckIndex!]: currentSolStep + 1,
          }));
          return true;
        }

        setQuickCheckIndex((idx) => (idx === null ? 0 : Math.min(qcQuestions.length, idx + 1)));
        return true;
      }
      if (nextGlobal) {
        enterSubTabAtStart(nextGlobal);
        return true;
      }
      return false;
    }

    if (isSceneSubTab) {
      if (timeline.getCurrentOrTargetBeat() < currentScene.beats.length - 1) {
        timeline.goNext();
        return true;
      }
      if (qcQuestions.length > 0) {
        setQuickCheckAnswers({});
        setQuickCheckSolutionSteps({});
        setQuickCheckIndex(0);
        return true;
      }
      if (nextGlobal) {
        enterSubTabAtStart(nextGlobal);
        return true;
      }
      return false;
    }

    if (moduleStep < railSteps.length - 1) {
      setModuleStep((s) => s + 1);
      return true;
    }

    if (nextGlobal) {
      enterSubTabAtStart(nextGlobal);
      return true;
    }
    return false;
  };

  const handleTapBack = () => {
    if (inQuickCheck) {
      if (quickCheckIndex! > 0) {
        setQuickCheckIndex((idx) => (idx !== null ? idx - 1 : null));
        return;
      }
      setQuickCheckIndex(null);
      timeline.setT(currentScene.beats.length - 1);
      return;
    }

    if (isSceneSubTab) {
      if (timeline.getCurrentOrTargetBeat() > 0) {
        timeline.goBack();
        return;
      }
      if (globalSubTabIdx > 0) {
        const prevGlobal = ALL_SUBTABS[globalSubTabIdx - 1];
        setActiveSectionId(prevGlobal.sectionId);
        setActiveSubTabId(prevGlobal.subTab.id);
        if (prevGlobal.subTab.sceneIndex !== undefined) {
          const prevScene = chapter.scenes[prevGlobal.subTab.sceneIndex];
          const prevQcLen = prevScene.quickCheck?.length ?? 0;
          if (prevQcLen > 0) {
            setQuickCheckIndex(prevQcLen);
            timeline.setT(prevScene.beats.length - 1);
          } else {
            setQuickCheckIndex(null);
            timeline.setT(Math.max(0, prevScene.beats.length - 1));
          }
        }
      }
      return;
    }

    if (moduleStep > 0) {
      setModuleStep((s) => s - 1);
      return;
    }
    if (globalSubTabIdx > 0) {
      const prevGlobal = ALL_SUBTABS[globalSubTabIdx - 1];
      setActiveSectionId(prevGlobal.sectionId);
      setActiveSubTabId(prevGlobal.subTab.id);
    }
  };

  const renderSceneVisual = () => {
    const sId = currentScene.id;
    const subId = activeSubTab.id;
    const bId = currentBeat?.id ?? '';
    const beatIdx = timeline.beatIndex;

    // 1. Factor Partners (scene-1) -> FactorPairsMorph36
    if (sId === 'scene-1' || subId === 'factor-partners' || bId.startsWith('fp-')) {
      return <FactorPairsMorph36 beatIndex={beatIdx} />;
    }

    // 2. Squares as Areas (scene-2) -> SquareTileScene (Whole 1-5, Decimal 2.5, Fraction 3/5)
    if (sId === 'scene-2' || subId === 'squares-areas' || bId.startsWith('sa-')) {
      return <SquareTileScene beatIndex={beatIdx} />;
    }

    // 3. Last Digits, Zeros & Parity (scene-3) -> LastDigitPatternsScene
    if (sId === 'scene-3' || subId === 'last-digits' || bId.startsWith('ld-')) {
      return <LastDigitPatternsScene beatIndex={beatIdx} />;
    }

    // 4. Odd Numbers Make Squares (scene-4) -> DotGridSquareVisualizer / OddSubtractionScene
    if (sId === 'scene-4' || subId === 'odd-squares' || bId.startsWith('on-')) {
      if (bId === 'on-4' || bId === 'on-5') {
        return <OddSubtractionScene beatIndex={bId === 'on-4' ? 0 : 1} />;
      }
      return <DotGridSquareVisualizer initialMode="odd-borders" beatIndex={beatIdx} />;
    }

    // 5. Between Squares & Triangular (scene-5) -> Immediately loads TriangularSquareZipper on step 0!
    if (sId === 'scene-5' || subId === 'between-triangular' || bId.startsWith('bt-')) {
      return <TriangularSquareZipper initialN={4} beatIndex={beatIdx} />;
    }

    // 6. Roots and Plus-Minus (scene-6) -> SquareTileScene inverseMode
    if (sId === 'scene-6' || subId === 'roots-plus-minus' || bId.startsWith('rm-')) {
      return <SquareTileScene inverseMode={true} beatIndex={beatIdx} />;
    }

    // 7. Finding Roots (scene-7) -> OddSubtractionScene & SquareRootPrimeEstimateScene
    if (sId === 'scene-7' || subId === 'finding-roots' || bId.startsWith('fr-')) {
      if (bId === 'fr-2') {
        return <SquareRootPrimeEstimateScene initialTab="prime-pairs" beatIndex={0} />;
      }
      return <OddSubtractionScene beatIndex={0} />;
    }

    // 8. Estimating Roots (scene-8) -> SquareRootPrimeEstimateScene (1936 interval)
    if (sId === 'scene-8' || subId === 'estimating-roots' || bId.startsWith('er-')) {
      return <SquareRootPrimeEstimateScene initialTab="estimate-1936" beatIndex={beatIdx} />;
    }

    // 9. Building Cubes (scene-9) -> IsometricCubeRenderer
    if (sId === 'scene-9' || subId === 'building-cubes' || bId.startsWith('bc-')) {
      return <IsometricCubeRenderer initialN={4} beatIndex={beatIdx} />;
    }

    // 10. Cube Patterns (scene-10) -> CubePatternsScene (0-9 ending digits & trailing zeros)
    if (sId === 'scene-10' || subId === 'cube-patterns' || bId.startsWith('cp-')) {
      return <CubePatternsScene beatIndex={beatIdx} />;
    }

    // 11. Taxicab Numbers (scene-11) -> CubeOddSumsAndTaxiScene (1729, 4104, 13832)
    if (sId === 'scene-11' || subId === 'taxicab-numbers' || bId.startsWith('tc-')) {
      return <CubeOddSumsAndTaxiScene initialTab="taxicab" beatIndex={beatIdx} />;
    }

    // 12. Cubes and Odd Numbers (scene-12) -> CubeOddSumsAndTaxiScene (odd sums tape)
    if (sId === 'scene-12' || subId === 'cubes-odd-numbers' || bId.startsWith('co-')) {
      return <CubeOddSumsAndTaxiScene initialTab="odd-sums" beatIndex={beatIdx} />;
    }

    // 13. Cube Roots (scene-13) -> PrimeFactorGroupingHelper
    if (sId === 'scene-13' || subId === 'cube-roots' || bId.startsWith('cr-')) {
      return <PrimeFactorGroupingHelper initialNumber={3375} beatIndex={beatIdx} />;
    }

    // 14. Successive Differences (scene-14) -> DifferenceEngineTable
    if (sId === 'scene-14' || subId === 'successive-differences' || bId.startsWith('sd-')) {
      return <DifferenceEngineTable initialMode="cubes" beatIndex={beatIdx} />;
    }

    // 15. A Pinch of History (scene-15) -> HistoryVisualStory
    if (sId === 'scene-15' || subId === 'pinch-history' || bId.startsWith('ph-')) {
      return <HistoryVisualStory slideIndex={bId === 'ph-2' ? 1 : 0} />;
    }

    // 16. Chapter Summary (scene-16) -> Interactive Square vs Cube Summary
    if (sId === 'scene-16' || subId === 'chapter-summary' || bId.startsWith('cs-')) {
      return (
        <ChapterSummaryScene
          beatIndex={beatIdx}
          onJumpToSquarePairs={() => handleSelectSubTab('square-pairs', 'sec-4')}
          onJumpToPractice={() => handleSelectSubTab('ncert-unsolved', 'sec-5')}
        />
      );
    }

    // 17. Square Pairs (scene-17) -> SquarePairsPuzzle
    return <SquarePairsPuzzle />;
  };

  return (
    <SlideShell
      sections={CHAPTER_SECTIONS}
      activeSectionId={activeSectionId}
      onSelectSection={handleSelectSection}
      activeChapter={activeChapter}
      onSelectChapter={setActiveChapter}
      topics={activeSection.subTabs.map((st) => ({ id: st.id, label: st.label }))}
      activeTopicId={activeSubTabId}
      onSelectTopic={handleSelectSubTab}
      steps={railSteps}
      currentStepIndex={clampedStep}
      units={tapUnits}
      currentUnitIndex={currentUnitIndex}
      isLastUnit={isLastUnit}
      nextScreenLabel={nextScreenLabel}
      isAnimating={isSceneSubTab && !inQuickCheck ? timeline.isAnimating : undefined}
      finishAnimation={isSceneSubTab && !inQuickCheck ? timeline.finishAnimation : undefined}
      onSelectStep={(idx) => {
        if (isSceneSubTab) {
          setQuickCheckIndex(null);
          timeline.setT(idx);
        } else {
          setModuleStep(idx);
        }
      }}
      onNext={handleTapNext}
      onBack={handleTapBack}
    >
      {/* Custom Sections or Standard Scene Beats */}
      {activeSectionId === 'sec-5' ? (
        <PracticeSection
          activeSubTabId={activeSubTab.id}
          onSelectSubTab={(subId) => handleSelectSubTab(subId, 'sec-5')}
        />
      ) : activeSubTab.id === 'locker-puzzle' ? (
        <LockerStorySection
          subTabId="locker-story"
          stepIndex={clampedStep}
          onAdvanceStep={handleTapNext}
        />
      ) : isSceneSubTab && inQuickCheck ? (
        <QuickCheck
          questions={qcQuestions}
          currentIndex={quickCheckIndex!}
          answers={quickCheckAnswers}
          solutionStepsRevealed={quickCheckSolutionSteps}
          onSelectOption={(qIdx, optIdx) => {
            setQuickCheckAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
            setQuickCheckSolutionSteps((prev) => ({ ...prev, [qIdx]: 1 }));
          }}
          onRevealNextStep={(qIdx) => {
            const total = qcQuestions[qIdx]?.solutionSteps?.length || 1;
            setQuickCheckSolutionSteps((prev) => ({
              ...prev,
              [qIdx]: Math.min(total, (prev[qIdx] ?? 1) + 1),
            }));
          }}
          onRevealAllSteps={(qIdx) => {
            const total = qcQuestions[qIdx]?.solutionSteps?.length || 1;
            setQuickCheckSolutionSteps((prev) => ({ ...prev, [qIdx]: total }));
          }}
          onNext={() =>
            setQuickCheckIndex((idx) => (idx === null ? 0 : Math.min(qcQuestions.length, idx + 1)))
          }
          onReviewScene={() => {
            setQuickCheckIndex(null);
            setQuickCheckAnswers({});
            setQuickCheckSolutionSteps({});
            timeline.setT(0);
          }}
          onNextScene={advanceAfterQuickCheck}
        />
      ) : isSceneSubTab && !inQuickCheck ? (
        <div
          className={`w-full h-full min-w-0 min-h-0 flex flex-col items-center justify-between ${
            tier === 'compact' ? 'gap-1' : 'gap-1.5 sm:gap-2'
          } overflow-hidden`}
        >
          <div className="w-full min-w-0 flex flex-col items-center gap-0.5 px-1 shrink-0 overflow-hidden">
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-[900px] min-w-0">
              <HighlightHeadline
                text={currentBeat.headline || currentBeat.narration}
                focusWord={currentBeat.focusWord}
                focusColor={currentBeat.focusColor}
                highlightSymbols={currentBeat.highlight}
                maxWidthClass={
                  tier === 'compact'
                    ? 'max-w-[900px] !text-statement leading-tight'
                    : isNarrow
                    ? 'max-w-[900px] !text-title leading-snug'
                    : 'max-w-[900px]'
                }
              />
              {activeRefresher && <RefresherCard clip={activeRefresher} />}
            </div>

            {currentBeat.caption && tier !== 'compact' && (
              <p
                key={`cap-${currentBeat.id}`}
                className="text-micro sm:text-small text-center max-w-2xl leading-snug animate-fade-rise break-words line-clamp-2"
                style={{ color: COLORS.mutedText }}
              >
                {currentBeat.caption}
              </p>
            )}
          </div>

          <div
            data-no-nav={currentBeat.interactive ? 'true' : undefined}
            className="w-full max-w-4xl flex-1 min-w-0 min-h-0 flex items-center justify-center overflow-hidden transition-opacity duration-200 ease-out"
          >
            {renderSceneVisual()}
          </div>
        </div>
      ) : (
        <div className="w-full max-w-2xl mx-auto py-8 text-center">
          <h2 className="text-title font-bold mb-2">{activeSubTab.label}</h2>
          <p className="text-body text-slate-600">Explore this NCERT Class 8 topic using the interactive stage and steps above.</p>
        </div>
      )}
    </SlideShell>
  );
}
