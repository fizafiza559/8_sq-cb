/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { COLORS } from '../design/tokens';
import { Katex } from '../components/Katex';
import { Grid, Layers, Sparkles } from 'lucide-react';
import { useViewportTier } from '../hooks/useViewportTier';

export interface SquareTileSceneProps {
  inverseMode?: boolean;
  initialMode?: 'integer' | 'decimal' | 'fraction';
  initialN?: number;
  beatIndex?: number;
  className?: string;
}

type HighlightPiece = 'main' | 'right' | 'bottom' | 'corner' | null;

export const SquareTileScene: React.FC<SquareTileSceneProps> = ({
  inverseMode = false,
  initialMode = 'integer',
  initialN = 4,
  beatIndex,
  className = '',
}) => {
  const [mode, setMode] = useState<'integer' | 'decimal' | 'fraction'>(initialMode);
  const [n, setN] = useState<number>(Math.max(1, Math.min(5, initialN)));
  const [activePiece, setActivePiece] = useState<HighlightPiece>(null);
  const { tier, isNarrow } = useViewportTier();
  const isCompact = tier === 'compact';
  const svgMaxH = isCompact ? 115 : isNarrow ? 150 : tier === 'standard' ? 185 : 225;

  useEffect(() => {
    if (beatIndex === undefined) return;
    if (inverseMode) {
      setMode('integer');
      setN(beatIndex === 0 ? 4 : 5);
    } else {
      setMode('integer');
      setN(beatIndex === 0 ? 4 : 5);
    }
  }, [beatIndex, inverseMode]);

  return (
    <div
      data-no-nav="true"
      className={`w-full max-w-3xl h-full max-h-full min-h-0 overflow-hidden mx-auto flex flex-col items-center justify-between ${
        isCompact ? 'gap-1.5 p-2' : 'gap-2 sm:gap-2.5 p-2.5 sm:p-4'
      } bg-white rounded-3xl border border-slate-200/80 shadow-xs ${className}`}
    >
      {/* Top Mode Toggle Bar */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-1.5 border-b border-slate-100 pb-2 shrink-0">
        <div className="flex items-center gap-2 text-micro sm:text-small font-semibold text-slate-600">
          <span>{inverseMode ? 'Area to Side Explorer' : 'Square Area Modes'}</span>
          {inverseMode && (
            <>
              <span aria-hidden="true">·</span>
              <span style={{ color: COLORS.odd.text }}>√A = s</span>
            </>
          )}
        </div>

        {/* 3 Mode Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1 bg-slate-100/90 p-1 rounded-xl w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setMode('integer')}
            className={`min-h-[44px] sm:min-h-[38px] px-2.5 sm:px-3 py-1.5 rounded-lg text-micro font-bold cursor-pointer transition-all flex items-center gap-1.5 shrink-0 ${
              mode === 'integer'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Grid className="w-3.5 h-3.5 shrink-0" style={{ color: COLORS.area.solid }} />
            <span>Whole (1–5)</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('decimal')}
            className={`min-h-[44px] sm:min-h-[38px] px-2.5 sm:px-3 py-1.5 rounded-lg text-micro font-bold cursor-pointer transition-all flex items-center gap-1.5 shrink-0 ${
              mode === 'decimal'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 shrink-0" style={{ color: COLORS.number.solid }} />
            <span>Decimal 2.5</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('fraction')}
            className={`min-h-[44px] sm:min-h-[38px] px-2.5 sm:px-3 py-1.5 rounded-lg text-micro font-bold cursor-pointer transition-all flex items-center gap-1.5 shrink-0 ${
              mode === 'fraction'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 shrink-0" style={{ color: COLORS.volume.solid }} />
            <span>Fraction 3/5</span>
          </button>
        </div>
      </div>

      {/* Mode 1: Whole Numbers (1-5) */}
      {mode === 'integer' && (
        <div className="w-full flex-1 min-h-0 flex flex-col items-center justify-between gap-2 overflow-hidden animate-fade-rise">
          <div className={`w-full flex flex-col sm:flex-row items-center justify-between gap-2 bg-slate-50/80 ${isCompact ? 'p-1.5 px-2.5' : 'p-2 sm:px-3.5'} rounded-2xl shrink-0`}>
            <div className="flex items-center gap-3">
              <label
                htmlFor="tile-n-slider"
                className="text-small font-semibold text-slate-700 flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>Side ({inverseMode ? 's = √A' : 'n'}):</span>
                <span
                  className="px-2.5 py-0.5 rounded-md text-small font-bold tabular-nums"
                  style={{ backgroundColor: COLORS.side.tint, color: COLORS.side.text }}
                >
                  {n} units
                </span>
              </label>

              <input
                id="tile-n-slider"
                type="range"
                min={1}
                max={5}
                value={n}
                onChange={(e) => setN(parseInt(e.target.value, 10))}
                className="w-32 sm:w-40 accent-[#16A34A] cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setN(val)}
                  className={`w-11 h-11 sm:w-9 sm:h-9 rounded-lg text-small font-bold tabular-nums cursor-pointer transition-colors ${
                    n === val
                      ? 'bg-[#16A34A] text-white shadow-2xs'
                      : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Tile Grid */}
          <div className="relative flex-1 min-h-0 flex items-center justify-center p-1.5 bg-slate-50/50 rounded-2xl w-full overflow-hidden">
            <svg
              viewBox="0 0 360 240"
              className="w-full max-w-[340px] h-auto overflow-visible select-none"
              style={{ maxHeight: `${svgMaxH}px` }}
            >
              {(() => {
                const tileSize = Math.min(38, 175 / Math.max(1, n));
                const totalW = n * tileSize;
                const totalH = n * tileSize;
                const startX = (360 - totalW) / 2;
                const startY = (220 - totalH) / 2 + 12;

                const tiles = [];
                for (let r = 0; r < n; r++) {
                  for (let c = 0; c < n; c++) {
                    const x = startX + c * tileSize;
                    const y = startY + r * tileSize;
                    tiles.push(
                      <rect
                        key={`${r}-${c}`}
                        x={x}
                        y={y}
                        width={tileSize}
                        height={tileSize}
                        fill={COLORS.area.tint}
                        stroke={COLORS.area.solid}
                        strokeWidth="1.5"
                        rx="3"
                        className="transition-all duration-200"
                      />
                    );
                  }
                }

                return (
                  <g>
                    {tiles}

                    {/* Top dimension label (Side) */}
                    <path
                      d={`M ${startX} ${startY - 8} L ${startX + totalW} ${startY - 8}`}
                      stroke={COLORS.side.solid}
                      strokeWidth="2"
                    />
                    <rect
                      x={startX + totalW / 2 - 26}
                      y={startY - 26}
                      width="52"
                      height="18"
                      rx="4"
                      fill={COLORS.side.solid}
                    />
                    <text
                      x={startX + totalW / 2}
                      y={startY - 13}
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="14"
                      fontWeight="bold"
                    >
                      {n} units
                    </text>

                    {/* Left dimension label (Side) */}
                    <path
                      d={`M ${startX - 8} ${startY} L ${startX - 8} ${startY + totalH}`}
                      stroke={COLORS.side.solid}
                      strokeWidth="2"
                    />
                    <rect
                      x={startX - 48}
                      y={startY + totalH / 2 - 9}
                      width="34"
                      height="18"
                      rx="4"
                      fill={COLORS.side.solid}
                    />
                    <text
                      x={startX - 31}
                      y={startY + totalH / 2 + 4}
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="14"
                      fontWeight="bold"
                    >
                      {n}
                    </text>

                    {/* Center Area Badge in Orange */}
                    <rect
                      x={startX + totalW / 2 - 38}
                      y={startY + totalH / 2 - 14}
                      width="76"
                      height="28"
                      rx="6"
                      fill="#FFFFFF"
                      stroke={COLORS.volume.solid}
                      strokeWidth="2"
                    />
                    <text
                      x={startX + totalW / 2}
                      y={startY + totalH / 2 + 4}
                      textAnchor="middle"
                      fill={COLORS.volume.text}
                      fontSize="14"
                      fontWeight="800"
                    >
                      {n * n} sq
                    </text>
                  </g>
                );
              })()}
            </svg>
          </div>

          {/* Formula Strip */}
          <div className="w-full flex items-center justify-center p-2.5 rounded-2xl bg-blue-50/60">
            {inverseMode ? (
              <div className="text-body font-medium text-slate-800 flex flex-wrap items-center justify-center gap-2">
                <span>
                  Area = <strong>{n * n}</strong> sq units ⟹ Side
                </span>
                <Katex latex={`s = \\sqrt{${n * n}} = ${n}`} displayMode={false} />
              </div>
            ) : (
              <div className="text-body font-medium text-slate-800 flex flex-wrap items-center justify-center gap-2">
                <span>
                  Side = <strong>{n}</strong> ⟹ Area
                </span>
                <Katex latex={`A = ${n} \\times ${n} = ${n}^2 = ${n * n}`} displayMode={false} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mode 2: Decimal Preset (2.5 x 2.5 = 6.25) */}
      {mode === 'decimal' && (
        <div className="w-full flex-1 min-h-0 flex flex-col items-center justify-between gap-2 overflow-hidden animate-fade-rise">
          <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-micro sm:text-small text-slate-600 px-1 shrink-0">
            <span className="font-bold text-slate-900">
              Geometric Dissection of (2 + 0.5)²
            </span>
            {!isCompact && (
              <span className="tabular-nums font-semibold text-emerald-700">
                Tap any piece to inspect
              </span>
            )}
          </div>

          {/* Visual SVG Decomposition of (2 + 0.5) x (2 + 0.5) */}
          <div className="relative flex-1 min-h-0 flex items-center justify-center p-1.5 bg-slate-50/50 rounded-2xl w-full overflow-hidden">
            <svg
              viewBox="0 0 360 245"
              className="w-full max-w-[340px] h-auto overflow-visible select-none"
              style={{ maxHeight: `${svgMaxH}px` }}
            >
              {(() => {
                const scale = 68;
                const originX = 75;
                const originY = 28;
                const block2 = 2 * scale; // 136px
                const blockHalf = 0.5 * scale; // 34px

                return (
                  <g>
                    {/* 1. Main 2x2 Block (Area = 4.0) - Light Blue */}
                    <g
                      className="cursor-pointer transition-opacity"
                      style={{ opacity: activePiece && activePiece !== 'main' ? 0.55 : 1 }}
                      onClick={() => setActivePiece(activePiece === 'main' ? null : 'main')}
                    >
                      <rect
                        x={originX}
                        y={originY}
                        width={block2}
                        height={block2}
                        fill="#E0F2FE"
                        stroke="#0788D3"
                        strokeWidth={activePiece === 'main' ? '3' : '2'}
                        rx="4"
                      />
                      <text
                        x={originX + block2 / 2}
                        y={originY + block2 / 2 - 4}
                        textAnchor="middle"
                        fill="#056AA6"
                        fontSize="14"
                        fontWeight="bold"
                      >
                        2 × 2 = 4.0
                      </text>
                      <text
                        x={originX + block2 / 2}
                        y={originY + block2 / 2 + 14}
                        textAnchor="middle"
                        fill="#056AA6"
                        fontSize="14"
                      >
                        Main Square
                      </text>
                    </g>

                    {/* 2. Right Edge Strip (2 x 0.5 = 1.0) - Soft Green */}
                    <g
                      className="cursor-pointer transition-opacity"
                      style={{ opacity: activePiece && activePiece !== 'right' ? 0.55 : 1 }}
                      onClick={() => setActivePiece(activePiece === 'right' ? null : 'right')}
                    >
                      <rect
                        x={originX + block2}
                        y={originY}
                        width={blockHalf}
                        height={block2}
                        fill="#DCFCE7"
                        stroke="#16A34A"
                        strokeWidth={activePiece === 'right' ? '3' : '2'}
                        rx="3"
                      />
                      <text
                        x={originX + block2 + blockHalf / 2}
                        y={originY + block2 / 2 + 4}
                        textAnchor="middle"
                        fill="#15803D"
                        fontSize="14"
                        fontWeight="bold"
                      >
                        1.0
                      </text>
                    </g>

                    {/* 3. Bottom Edge Strip (0.5 x 2 = 1.0) - Soft Green */}
                    <g
                      className="cursor-pointer transition-opacity"
                      style={{ opacity: activePiece && activePiece !== 'bottom' ? 0.55 : 1 }}
                      onClick={() => setActivePiece(activePiece === 'bottom' ? null : 'bottom')}
                    >
                      <rect
                        x={originX}
                        y={originY + block2}
                        width={block2}
                        height={blockHalf}
                        fill="#DCFCE7"
                        stroke="#16A34A"
                        strokeWidth={activePiece === 'bottom' ? '3' : '2'}
                        rx="3"
                      />
                      <text
                        x={originX + block2 / 2}
                        y={originY + block2 + blockHalf / 2 + 4}
                        textAnchor="middle"
                        fill="#15803D"
                        fontSize="14"
                        fontWeight="bold"
                      >
                        2 × 0.5 = 1.0
                      </text>
                    </g>

                    {/* 4. Corner Square (0.5 x 0.5 = 0.25) - Soft Amber */}
                    <g
                      className="cursor-pointer transition-opacity"
                      style={{ opacity: activePiece && activePiece !== 'corner' ? 0.55 : 1 }}
                      onClick={() => setActivePiece(activePiece === 'corner' ? null : 'corner')}
                    >
                      <rect
                        x={originX + block2}
                        y={originY + block2}
                        width={blockHalf}
                        height={blockHalf}
                        fill="#FEF3C7"
                        stroke="#D97706"
                        strokeWidth={activePiece === 'corner' ? '3' : '2'}
                        rx="2"
                      />
                      <text
                        x={originX + block2 + blockHalf / 2}
                        y={originY + block2 + blockHalf / 2 + 3}
                        textAnchor="middle"
                        fill="#B45309"
                        fontSize="14"
                        fontWeight="bold"
                      >
                        0.25
                      </text>
                    </g>

                    {/* Outer Dimensions */}
                    <text
                      x={originX + block2 / 2}
                      y={originY - 10}
                      textAnchor="middle"
                      fill="#056AA6"
                      fontSize="14"
                      fontWeight="bold"
                    >
                      2
                    </text>
                    <text
                      x={originX + block2 + blockHalf / 2}
                      y={originY - 10}
                      textAnchor="middle"
                      fill="#15803D"
                      fontSize="14"
                      fontWeight="bold"
                    >
                      + 0.5
                    </text>
                    <text
                      x={originX - 10}
                      y={originY + block2 / 2 + 4}
                      textAnchor="end"
                      fill="#056AA6"
                      fontSize="14"
                      fontWeight="bold"
                    >
                      2
                    </text>
                    <text
                      x={originX - 10}
                      y={originY + block2 + blockHalf / 2 + 4}
                      textAnchor="end"
                      fill="#15803D"
                      fontSize="14"
                      fontWeight="bold"
                    >
                      0.5
                    </text>
                    <text
                      x={originX + (block2 + blockHalf) / 2}
                      y={originY + block2 + blockHalf + 20}
                      textAnchor="middle"
                      fill="#334155"
                      fontSize="14"
                      fontWeight="bold"
                    >
                      Total Side = 2.5 units
                    </text>
                  </g>
                );
              })()}
            </svg>
          </div>

          {/* Interactive Sum Equation */}
          <div className="w-full p-2.5 rounded-2xl bg-slate-50/80 flex flex-col items-center gap-2">
            <div className="flex flex-wrap items-center justify-center gap-1.5 text-small font-bold tabular-nums">
              <button
                type="button"
                onClick={() => setActivePiece(activePiece === 'main' ? null : 'main')}
                className={`min-h-[44px] sm:min-h-[36px] px-3 sm:px-2.5 py-1 rounded-lg border cursor-pointer transition-all ${
                  activePiece === 'main'
                    ? 'bg-sky-200 border-sky-500 text-sky-950 scale-105'
                    : 'bg-sky-50 border-sky-200 text-sky-800 hover:bg-sky-100'
                }`}
              >
                4
              </button>
              <span className="text-slate-500">+</span>
              <button
                type="button"
                onClick={() => setActivePiece(activePiece === 'right' ? null : 'right')}
                className={`min-h-[44px] sm:min-h-[36px] px-3 sm:px-2.5 py-1 rounded-lg border cursor-pointer transition-all ${
                  activePiece === 'right'
                    ? 'bg-emerald-200 border-emerald-500 text-emerald-950 scale-105'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100'
                }`}
              >
                1
              </button>
              <span className="text-slate-500">+</span>
              <button
                type="button"
                onClick={() => setActivePiece(activePiece === 'bottom' ? null : 'bottom')}
                className={`min-h-[44px] sm:min-h-[36px] px-3 sm:px-2.5 py-1 rounded-lg border cursor-pointer transition-all ${
                  activePiece === 'bottom'
                    ? 'bg-emerald-200 border-emerald-500 text-emerald-950 scale-105'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100'
                }`}
              >
                1
              </button>
              <span className="text-slate-500">+</span>
              <button
                type="button"
                onClick={() => setActivePiece(activePiece === 'corner' ? null : 'corner')}
                className={`min-h-[44px] sm:min-h-[36px] px-3 sm:px-2.5 py-1 rounded-lg border cursor-pointer transition-all ${
                  activePiece === 'corner'
                    ? 'bg-amber-200 border-amber-500 text-amber-950 scale-105'
                    : 'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100'
                }`}
              >
                0.25
              </button>
              <span className="text-slate-600 mx-1">=</span>
              <Katex latex={`4 + 1 + 1 + 0.25 = 6.25 \\implies 2.5^2 = 6.25`} displayMode={false} />
            </div>
          </div>
        </div>
      )}

      {/* Mode 3: Fraction Preset ((3/5)^2 = 9/25 = 0.36) */}
      {mode === 'fraction' && (
        <div className="w-full flex-1 min-h-0 flex flex-col items-center justify-between gap-2 overflow-hidden animate-fade-rise">
          <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-micro sm:text-small text-slate-600 px-1 shrink-0">
            <span className="font-bold text-slate-900">
              Fraction Square: 3/5 of a 1 × 1 Unit Square
            </span>
            {!isCompact && (
              <span className="tabular-nums font-semibold" style={{ color: COLORS.volume.text }}>
                9 of 25 sub-squares shaded
              </span>
            )}
          </div>

          {/* SVG 5x5 Grid showing 3x3 highlighted in vivid orange #F27A00 */}
          <div className="relative flex-1 min-h-0 flex items-center justify-center p-1.5 bg-slate-50/50 rounded-2xl w-full overflow-hidden">
            <svg
              viewBox="0 0 360 245"
              className="w-full max-w-[340px] h-auto overflow-visible select-none"
              style={{ maxHeight: `${svgMaxH}px` }}
            >
              {(() => {
                const subSize = 36;
                const totalUnits = 5 * subSize; // 180px
                const startX = (360 - totalUnits) / 2;
                const startY = 26;

                const cells = [];
                for (let r = 0; r < 5; r++) {
                  for (let c = 0; c < 5; c++) {
                    const isInside = r < 3 && c < 3;
                    cells.push(
                      <rect
                        key={`${r}-${c}`}
                        x={startX + c * subSize}
                        y={startY + r * subSize}
                        width={subSize}
                        height={subSize}
                        fill={isInside ? '#F27A00' : '#F8FAFC'}
                        fillOpacity={isInside ? 0.85 : 1}
                        stroke={isInside ? '#B45309' : '#CBD5E1'}
                        strokeWidth={isInside ? '1.5' : '1'}
                      />
                    );
                  }
                }

                return (
                  <g>
                    {/* 25 sub-squares */}
                    {cells}

                    {/* Outer 1x1 unit boundary */}
                    <rect
                      x={startX}
                      y={startY}
                      width={totalUnits}
                      height={totalUnits}
                      fill="none"
                      stroke="#334155"
                      strokeWidth="2.5"
                      rx="2"
                    />

                    {/* Highlighted 3x3 border */}
                    <rect
                      x={startX}
                      y={startY}
                      width={3 * subSize}
                      height={3 * subSize}
                      fill="none"
                      stroke="#9A3412"
                      strokeWidth="2.5"
                    />

                    {/* Label inside 3x3 corner */}
                    <rect
                      x={startX + (3 * subSize) / 2 - 36}
                      y={startY + (3 * subSize) / 2 - 12}
                      width="72"
                      height="24"
                      rx="6"
                      fill="#FFFFFF"
                      fillOpacity="0.95"
                      stroke="#B45309"
                      strokeWidth="1.5"
                    />
                    <text
                      x={startX + (3 * subSize) / 2}
                      y={startY + (3 * subSize) / 2 + 4}
                      textAnchor="middle"
                      fill="#9A3412"
                      fontSize="14"
                      fontWeight="bold"
                    >
                      9 squares
                    </text>

                    {/* Side length dimension */}
                    <text
                      x={startX + (3 * subSize) / 2}
                      y={startY - 8}
                      textAnchor="middle"
                      fill="#B45309"
                      fontSize="14"
                      fontWeight="bold"
                    >
                      3/5 unit
                    </text>

                    <text
                      x={startX - 8}
                      y={startY + (3 * subSize) / 2 + 4}
                      textAnchor="end"
                      fill="#B45309"
                      fontSize="14"
                      fontWeight="bold"
                    >
                      3/5
                    </text>

                    <text
                      x={startX + totalUnits / 2}
                      y={startY + totalUnits + 20}
                      textAnchor="middle"
                      fill="#475569"
                      fontSize="14"
                      fontWeight="600"
                    >
                      1 × 1 Unit Square = 5 × 5 = 25 equal sub-squares
                    </text>
                  </g>
                );
              })()}
            </svg>
          </div>

          {/* Fraction Breakdown Equation */}
          <div className="w-full p-2.5 rounded-2xl bg-orange-50/60 flex flex-wrap items-center justify-center text-center">
            <Katex
              latex={`\\text{Side} = \\frac{3}{5} \\implies \\text{Area} = \\frac{3}{5} \\times \\frac{3}{5} = \\frac{9}{25} = 0.36`}
              displayMode={false}
            />
          </div>
        </div>
      )}
    </div>
  );
};
