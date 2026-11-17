/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const COLORS = {
  pageBg: '#F0F4FF',
  surface: '#FFFFFF',
  dimmedCardBg: '#E8EDFF',
  dimmedCardBorder: '#EEF2FF',
  divider: '#CEDBEF',

  primary: '#005583',
  headingText: '#002538',
  bodyText: '#334155',
  mutedText: '#475569',
  subtitleText: '#475569',
  secondaryText: '#475569',

  chipBlueBg: '#DFF2FE',
  chipBlueText: '#056AA6',
  chipAmberBg: '#FEF9C2',
  chipAmberText: '#B45309',

  // Class 8 symbol/entity colours:
  // number = green #16A34A
  // square / area = blue #0788D3
  // cube / volume = orange #F27A00
  // odd numbers = purple #8B5CF6
  // matched pair / answer / highlight = pink #DB2777
  // lockerOpen = green #16A34A, lockerClosed = grey #94A3B8
  number: { solid: '#16A34A', tint: '#DCFCE7', text: '#15803D' },
  area: { solid: '#0788D3', tint: '#E0F2FE', text: '#056AA6' },
  volume: { solid: '#F27A00', tint: '#FFEDD5', text: '#B45309' },
  odd: { solid: '#8B5CF6', tint: '#EDE9FE', text: '#6D3FD6' },
  pair: { solid: '#DB2777', tint: '#FCE7F3', text: '#BE185D' },
  lockerOpen: { solid: '#16A34A', tint: '#DCFCE7', text: '#15803D' },
  lockerClosed: { solid: '#94A3B8', tint: '#F1F5F9', text: '#64748B' },

  // Compatibility aliases for existing UI components
  root: { solid: '#0788D3', tint: '#E0F2FE', text: '#056AA6' },
  side: { solid: '#16A34A', tint: '#DCFCE7', text: '#15803D' },

  canvasBg: '#FFFFFF',
  canvasGrid: '#E3EAF8',
};

export const DIMENSIONS = {
  canvasAspect: '4/3',
};
