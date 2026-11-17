/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { COLORS } from '../design/tokens';
import { SymbolColorKey } from '../types';

interface HighlightHeadlineProps {
  text: string;
  focusWord?: string;
  focusColor?: SymbolColorKey;
  highlightSymbols?: string[];
  maxWidthClass?: string;
}

function resolveColorKey(
  focusColor?: SymbolColorKey,
  focusWord?: string,
  highlightSymbols?: string[]
): SymbolColorKey {
  if (focusColor) return focusColor;
  const first = highlightSymbols?.[0] as SymbolColorKey | undefined;
  if (first && first in COLORS) {
    return first;
  }
  return 'number';
}

export const HighlightHeadline: React.FC<HighlightHeadlineProps> = ({
  text,
  focusWord,
  focusColor,
  highlightSymbols,
  maxWidthClass = 'max-w-[900px]',
}) => {
  const colorKey = resolveColorKey(focusColor, focusWord, highlightSymbols);
  const colorEntry = COLORS[colorKey] || COLORS.number;
  const accentColor =
    typeof colorEntry === 'object' && colorEntry !== null && 'solid' in colorEntry
      ? colorEntry.solid
      : String(colorEntry);

  let before = text;
  let match = '';
  let after = '';

  if (focusWord && focusWord.trim().length > 0) {
    const idx = text.toLowerCase().indexOf(focusWord.toLowerCase());
    if (idx !== -1) {
      before = text.slice(0, idx);
      match = text.slice(idx, idx + focusWord.length);
      after = text.slice(idx + focusWord.length);
    }
  }

  return (
    <h1
      className={`${maxWidthClass} mx-auto text-center text-headline`}
      style={{
        color: COLORS.headingText,
      }}
    >
      {before}
      {match && <span style={{ color: accentColor }}>{match}</span>}
      {after}
    </h1>
  );
};
