/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';

export type ViewportTier = 'compact' | 'standard' | 'spacious';

export interface ViewportMetrics {
  tier: ViewportTier;
  stageH: number;
  stageW: number;
  isNarrow: boolean;
}

function getViewportMetrics(focusMode: boolean): ViewportMetrics {
  if (typeof window === 'undefined') {
    return {
      tier: 'standard',
      stageH: 656,
      stageW: 1024,
      isNarrow: false,
    };
  }

  const vw = window.innerWidth;
  const vh = window.visualViewport?.height ?? window.innerHeight;

  const chromeH = focusMode ? 0 : 112; // 56px header + 56px footer
  const railW = vw >= 768 && !focusMode ? 56 : 0;

  const stageH = Math.max(200, Math.round(vh - chromeH));
  const stageW = Math.max(280, Math.round(vw - railW));

  let tier: ViewportTier = 'spacious';
  if (stageH < 480) {
    tier = 'compact';
  } else if (stageH < 680) {
    tier = 'standard';
  }

  return {
    tier,
    stageH,
    stageW,
    isNarrow: stageW < 640,
  };
}

export function useViewportTier(focusMode = false): ViewportMetrics {
  const [metrics, setMetrics] = useState<ViewportMetrics>(() =>
    getViewportMetrics(focusMode)
  );

  useEffect(() => {
    setMetrics(getViewportMetrics(focusMode));

    let timeoutId: number | null = null;
    const handleResize = () => {
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
      timeoutId = window.setTimeout(() => {
        setMetrics(getViewportMetrics(focusMode));
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    window.visualViewport?.addEventListener('resize', handleResize);

    return () => {
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
      window.removeEventListener('resize', handleResize);
      window.visualViewport?.removeEventListener('resize', handleResize);
    };
  }, [focusMode]);

  return metrics;
}
