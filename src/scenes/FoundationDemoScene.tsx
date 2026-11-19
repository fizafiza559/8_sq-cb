/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SceneComponentProps } from '../types';
import { COLORS } from '../design/tokens';
import { useViewportTier } from '../hooks/useViewportTier';

export const FoundationDemoInteractiveControls: React.FC<{
  params: Record<string, number>;
  setParam: (key: string, value: number) => void;
}> = ({ params, setParam }) => {
  const n = params.n ?? 4;
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 w-full">
      <div className="flex items-center gap-3">
        <label htmlFor="foundation-slider" className="text-body font-semibold flex items-center gap-2" style={{ color: COLORS.headingText }}>
          Side length (<span style={{ color: COLORS.side.solid }}>n</span>):
          <span className="px-2.5 py-0.5 rounded-full text-ui font-bold" style={{ backgroundColor: COLORS.side.tint, color: COLORS.side.text }}>
            {n}
          </span>
        </label>
        <input
          id="foundation-slider"
          type="range"
          min={1}
          max={8}
          step={1}
          value={n}
          onChange={(e) => setParam('n', parseInt(e.target.value, 10))}
          className="w-40 accent-[#16A34A] cursor-pointer"
        />
      </div>

      <div className="flex items-center gap-2 text-ui font-semibold">
        <span>Area (<span style={{ color: COLORS.area.solid }}>n²</span>):</span>
        <span className="px-3 py-1 rounded-full text-title font-bold" style={{ backgroundColor: COLORS.area.tint, color: COLORS.area.text }}>
          {n * n}
        </span>
      </div>
    </div>
  );
};

export const FoundationDemoScene: React.FC<SceneComponentProps> = ({
  t,
  beatIndex,
  localProgress,
  params,
}) => {
  const viewWidth = 500;
  const viewHeight = 340;

  // Derive geometric size smoothly from t and params
  const targetN = params.n ?? (beatIndex === 0 ? 3 : beatIndex === 1 ? 4 : 5);
  const n = targetN;
  const area = n * n;

  const tileSize = Math.min(36, 180 / Math.max(1, n));
  const gridW = n * tileSize;
  const gridH = n * tileSize;
  const startX = (viewWidth - gridW) / 2;
  const startY = (viewHeight - gridH) / 2 + 10;

  const { tier, isNarrow } = useViewportTier();
  const isCompact = tier === 'compact';
  const svgMaxH = isCompact ? 140 : isNarrow ? 180 : tier === 'standard' ? 230 : 290;

  return (
    <svg
      viewBox={`0 0 ${viewWidth} ${viewHeight}`}
      className="w-full h-auto rounded-2xl select-none"
      style={{ backgroundColor: COLORS.canvasBg, maxHeight: `${svgMaxH}px` }}
    >
      {/* Faint Grid Background */}
      <defs>
        <pattern id="foundation-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke={COLORS.canvasGrid} strokeWidth="1" />
        </pattern>
      </defs>
      <rect width={viewWidth} height={viewHeight} fill="url(#foundation-grid)" />

      {/* Top dimension line: Side length n (Green #16A34A) */}
      <g transform={`translate(${startX}, ${startY - 16})`}>
        <line x1={0} y1={0} x2={gridW} y2={0} stroke={COLORS.side.solid} strokeWidth={2} strokeLinecap="round" />
        <line x1={0} y1={-4} x2={0} y2={4} stroke={COLORS.side.solid} strokeWidth={2} />
        <line x1={gridW} y1={-4} x2={gridW} y2={4} stroke={COLORS.side.solid} strokeWidth={2} />
        <text
          x={gridW / 2}
          y={-8}
          textAnchor="middle"
          className="text-micro font-bold"
          fill={COLORS.side.text}
        >
          side = {n}
        </text>
      </g>

      {/* Left dimension line: Side length n (Green #16A34A) */}
      <g transform={`translate(${startX - 16}, ${startY})`}>
        <line x1={0} y1={0} x2={0} y2={gridH} stroke={COLORS.side.solid} strokeWidth={2} strokeLinecap="round" />
        <line x1={-4} y1={0} x2={4} y2={0} stroke={COLORS.side.solid} strokeWidth={2} />
        <line x1={-4} y1={gridH} x2={4} y2={gridH} stroke={COLORS.side.solid} strokeWidth={2} />
        <text
          x={-10}
          y={gridH / 2}
          textAnchor="middle"
          dominantBaseline="central"
          className="text-micro font-bold"
          fill={COLORS.side.text}
        >
          {n}
        </text>
      </g>

      {/* Square Area Grid (Orange #F27A00) */}
      <g transform={`translate(${startX}, ${startY})`}>
        <rect
          x={0}
          y={0}
          width={gridW}
          height={gridH}
          rx={6}
          fill={COLORS.area.tint}
          stroke={COLORS.area.solid}
          strokeWidth={2}
        />

        {/* Unit Tile Grid */}
        {Array.from({ length: n }).map((_, c) =>
          Array.from({ length: n }).map((_, r) => (
            <rect
              key={`tile-${c}-${r}`}
              x={c * tileSize}
              y={r * tileSize}
              width={tileSize}
              height={tileSize}
              fill="none"
              stroke={COLORS.area.solid}
              strokeWidth={1}
              strokeOpacity={0.3}
            />
          ))
        )}

        {/* Center Area Badge */}
        <g transform={`translate(${gridW / 2}, ${gridH / 2})`}>
          <rect
            x={-42}
            y={-14}
            width={84}
            height={28}
            rx={6}
            fill={COLORS.surface}
            stroke={COLORS.area.solid}
            strokeWidth={1.5}
          />
          <text
            x={0}
            y={0}
            textAnchor="middle"
            dominantBaseline="central"
            className="text-micro font-extrabold"
            fill={COLORS.area.text}
          >
            Area = {area}
          </text>
        </g>
      </g>

      {/* Subtitle / Timeline status bar */}
      <g transform={`translate(${viewWidth / 2}, ${startY + gridH + 34})`}>
        <text textAnchor="middle" className="text-micro font-medium" fill={COLORS.mutedText}>
          Timeline t = {t.toFixed(2)} · Beat {beatIndex}
        </text>
      </g>
    </svg>
  );
};

export interface SquareAreaCanvasSvgProps {
  side: number;
  filledCount: number;
  pulseOutline?: boolean;
  showTotalBadge?: boolean;
  fillColor?: string;
  strokeColor?: string;
  customBadgeText?: string;
}

export const SquareAreaCanvasSvg: React.FC<SquareAreaCanvasSvgProps> = ({
  side,
  filledCount,
  pulseOutline = false,
  showTotalBadge = false,
  fillColor = '#10B981',
  strokeColor = '#059669',
  customBadgeText,
}) => {
  const tileSize = Math.min(18, Math.floor(136 / Math.max(1, side)));
  const gridPx = side * tileSize;
  const viewW = 240;
  const viewH = 176;
  const ox = (viewW - gridPx) / 2 + 8;
  const oy = (viewH - gridPx) / 2 + 6;

  return (
    <svg viewBox={`0 0 ${viewW} ${viewH}`} className="h-[118px] w-auto select-none">
      {/* Top Side Dimension Line */}
      <line x1={ox} y1={oy - 8} x2={ox + gridPx} y2={oy - 8} stroke={COLORS.side.solid} strokeWidth={2} />
      <text x={ox + gridPx / 2} y={oy - 14} textAnchor="middle" fill={COLORS.side.text} fontSize={14} fontWeight={800}>
        {side} cols
      </text>

      {/* Left Side Dimension Line */}
      <line x1={ox - 8} y1={oy} x2={ox - 8} y2={oy + gridPx} stroke={COLORS.side.solid} strokeWidth={2} />
      <text
        x={ox - 16}
        y={oy + gridPx / 2}
        textAnchor="middle"
        fill={COLORS.side.text}
        fontSize={14}
        fontWeight={800}
        transform={`rotate(-90 ${ox - 16} ${oy + gridPx / 2})`}
      >
        {side} rows
      </text>

      {/* Grid Outline + Sweeping Tiles */}
      <rect
        x={ox - 2}
        y={oy - 2}
        width={gridPx + 4}
        height={gridPx + 4}
        rx={5}
        fill={COLORS.area.tint}
        stroke={pulseOutline ? '#0284C7' : COLORS.area.solid}
        strokeWidth={pulseOutline ? 3 : 2}
        className={pulseOutline ? 'animate-pulse' : ''}
      />
      {Array.from({ length: side }).map((_, r) =>
        Array.from({ length: side }).map((__, c) => {
          const idx = r * side + c + 1;
          const isFilled = idx <= filledCount;
          return (
            <rect
              key={`${r}-${c}`}
              x={ox + c * tileSize + 0.5}
              y={oy + r * tileSize + 0.5}
              width={tileSize - 1}
              height={tileSize - 1}
              rx={2}
              fill={isFilled ? fillColor : '#FFFFFF'}
              stroke={isFilled ? strokeColor : '#CBD5E1'}
              strokeWidth={1}
              style={{
                transition: 'fill 160ms ease',
              }}
            />
          );
        })
      )}

      {showTotalBadge && (
        <g transform={`translate(${ox + gridPx / 2}, ${oy + gridPx / 2})`}>
          <rect
            x={-54}
            y={-15}
            width={108}
            height={30}
            rx={8}
            fill="#FFFFFF"
            stroke={COLORS.area.solid}
            strokeWidth={2}
          />
          <text
            x={0}
            y={1}
            textAnchor="middle"
            dominantBaseline="central"
            fill={COLORS.area.text}
            fontSize={14}
            fontWeight={900}
          >
            {customBadgeText ?? `${side}² = ${side * side}`}
          </text>
        </g>
      )}
    </svg>
  );
};

export interface FractionDecimalSquareCanvasSvgProps {
  stage: 'outline' | 'partition' | 'compare';
}

export const FractionDecimalSquareCanvasSvg: React.FC<FractionDecimalSquareCanvasSvgProps> = ({
  stage,
}) => {
  const showArea = stage !== 'outline';
  return (
    <svg viewBox="0 0 360 128" className="h-[116px] w-full max-w-[360px] select-none">
      {/* Left: 3/5 inside 5x5 unit square */}
      <g transform="translate(32, 22)">
        <text x={45} y={-8} textAnchor="middle" fill="#005583" fontSize={14} fontWeight={900}>
          side = 3/5
        </text>
        <rect x={0} y={0} width={90} height={90} rx={5} fill="#F8FAFC" stroke="#94A3B8" strokeWidth={1.5} strokeDasharray="4 2" />
        {Array.from({ length: 5 }).map((_, r) =>
          Array.from({ length: 5 }).map((__, c) => {
            const inFrac = r < 3 && c < 3;
            return (
              <rect
                key={`f-${r}-${c}`}
                x={c * 18 + 1}
                y={r * 18 + 1}
                width={16}
                height={16}
                rx={2}
                fill={inFrac && showArea ? '#0284C7' : inFrac ? '#E0F2FE' : '#FFFFFF'}
                stroke={inFrac ? '#0369A1' : '#CBD5E1'}
                strokeWidth={inFrac ? 1.4 : 0.8}
                style={{ transition: 'fill 320ms cubic-bezier(0.22, 1, 0.36, 1)' }}
              />
            );
          })
        )}
        {showArea && (
          <g transform="translate(45, 76)">
            <rect x={-30} y={-11} width={60} height={22} rx={7} fill="#FFFFFF" stroke="#0284C7" strokeWidth={1.5} />
            <text x={0} y={4} textAnchor="middle" fill="#005583" fontSize={14} fontWeight={900}>
              9/25
            </text>
          </g>
        )}
      </g>

      {/* Right: 2.5 x 2.5 partitioned area (2+0.5) x (2+0.5) */}
      <g transform="translate(210, 22)">
        <text x={45} y={-8} textAnchor="middle" fill="#B45309" fontSize={14} fontWeight={900}>
          side = 2.5
        </text>
        {/* 2x2 = 4 */}
        <rect
          x={0}
          y={0}
          width={72}
          height={72}
          rx={3}
          fill={showArea ? '#F59E0B' : '#FEF3C7'}
          stroke="#B45309"
          strokeWidth={1.5}
          style={{ transition: 'fill 320ms cubic-bezier(0.22, 1, 0.36, 1)' }}
        />
        <text x={36} y={40} textAnchor="middle" fill={showArea ? '#FFFFFF' : '#92400E'} fontSize={14} fontWeight={900}>
          {showArea ? '4' : '2×2'}
        </text>
        {/* 2 x 0.5 = 1 */}
        <rect
          x={72}
          y={0}
          width={18}
          height={72}
          rx={2}
          fill={showArea ? '#FBBF24' : '#FEF3C7'}
          stroke="#B45309"
          strokeWidth={1.5}
        />
        {/* 0.5 x 2 = 1 */}
        <rect
          x={0}
          y={72}
          width={72}
          height={18}
          rx={2}
          fill={showArea ? '#FBBF24' : '#FEF3C7'}
          stroke="#B45309"
          strokeWidth={1.5}
        />
        {/* 0.5 x 0.5 = 0.25 */}
        <rect
          x={72}
          y={72}
          width={18}
          height={18}
          rx={2}
          fill={showArea ? '#FDE68A' : '#FFFBEB'}
          stroke="#B45309"
          strokeWidth={1.5}
        />
        {showArea && (
          <g transform="translate(45, 76)">
            <rect x={-30} y={-11} width={60} height={22} rx={7} fill="#FFFFFF" stroke="#D97706" strokeWidth={1.5} />
            <text x={0} y={4} textAnchor="middle" fill="#92400E" fontSize={14} fontWeight={900}>
              6.25
            </text>
          </g>
        )}
      </g>

      {/* Center Status */}
      {stage === 'compare' && (
        <g transform="translate(154, 52)">
          <rect x={-26} y={-14} width={52} height={28} rx={10} fill="#FFFBEB" stroke="#D97706" strokeWidth={1.5} />
          <text x={0} y={5} textAnchor="middle" fill="#92400E" fontSize={14} fontWeight={900}>
            Real²
          </text>
        </g>
      )}
    </svg>
  );
};


