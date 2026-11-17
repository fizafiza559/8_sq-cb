/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { COLORS } from '../design/tokens';
import { Katex } from '../components/Katex';
import { Sparkles, Play, RotateCcw, ArrowRight } from 'lucide-react';

export interface TriangularSquareZipperProps {
  initialN?: 3 | 4;
  beatIndex?: number;
  className?: string;
}

export const TriangularSquareZipper: React.FC<TriangularSquareZipperProps> = ({
  initialN = 4,
  beatIndex,
  className = '',
}) => {
  const [n, setN] = useState<3 | 4>(initialN);
  const [zipPercent, setZipPercent] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {
    if (beatIndex === undefined) return;
    setIsAnimating(false);
    if (beatIndex <= 1) {
      setN(3);
      setZipPercent(beatIndex === 0 ? 0 : 100);
    } else if (beatIndex === 2) {
      setN(4);
      setZipPercent(0);
    } else {
      setN(4);
      setZipPercent(100);
    }
  }, [beatIndex]);

  useEffect(() => {
    if (!isAnimating) return;
    let rafId = 0;
    const startVal = zipPercent >= 98 ? 0 : zipPercent;
    const startTime = performance.now();
    const duration = 900;

    const tick = (now: number) => {
      const elapsed = Math.min(1, (now - startTime) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setZipPercent(Math.round(startVal + (100 - startVal) * eased));
      if (elapsed < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setIsAnimating(false);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isAnimating]); // intentionally triggers once per play click

  const tPrev = (n * (n - 1)) / 2;
  const tCurr = (n * (n + 1)) / 2;
  const totalSquare = n * n;

  const progress = zipPercent / 100;
  const isLocked = zipPercent >= 98;

  // Grid sizing
  const svgW = 540;
  const svgH = 260;
  const spacing = n === 3 ? 46 : 38;
  const dotR = n === 3 ? 15 : 13;

  // Position of the n x n assembled square on the left-center
  const squareW = (n - 1) * spacing;
  const baseLeftX = zipPercent > 0 ? 110 + (170 - 110) * progress : 110;
  const baseTopY = (svgH - squareW) / 2;

  // Orange Triangle T_n: bottom-left staircase in the n x n square
  // row r from 0..n-1, col c from 0..r
  const orangeDots: { x: number; y: number; key: string }[] = [];
  for (let r = 0; r < n; r++) {
    for (let c = 0; c <= r; c++) {
      orangeDots.push({
        key: `o-${r}-${c}`,
        x: baseLeftX + c * spacing,
        y: baseTopY + r * spacing,
      });
    }
  }

  // Blue Triangle T_{n-1}: starts upright on the right side, rotates 180 deg and zips
  // into the upper-right complement (r = 0..n-2, c = r+1..n-1)
  const blueStartBaseX = 345;
  const blueStartCenterY = svgH / 2;
  const prevRows = n - 1;
  const blueGridH = (prevRows - 1) * spacing;
  const blueStartTopY = blueStartCenterY - blueGridH / 2;

  const blueDots: { x: number; y: number; key: string }[] = [];
  for (let r = 0; r < prevRows; r++) {
    for (let c = 0; c <= r; c++) {
      // Start upright staircase
      const sx = blueStartBaseX + c * spacing;
      const sy = blueStartTopY + r * spacing;

      // Rotated 180° complement target in the n x n grid:
      // Flipping (r, c) upside-down puts it in upper-right:
      // targetRow = (prevRows - 1 - r), targetCol = (n - 1 - c)
      const targetRow = prevRows - 1 - r;
      const targetCol = n - 1 - c;
      const tx = baseLeftX + targetCol * spacing;
      const ty = baseTopY + targetRow * spacing;

      // Arc slightly upward during mid-zip for a playful rotation feel
      const arcLift = Math.sin(progress * Math.PI) * -28;
      blueDots.push({
        key: `b-${r}-${c}`,
        x: sx + (tx - sx) * progress,
        y: sy + (ty - sy) * progress + arcLift,
      });
    }
  }

  return (
    <div
      data-no-nav="true"
      className={`w-full max-w-4xl mx-auto rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-7 shadow-xs flex flex-col gap-5 ${className}`}
    >
      {/* Header & Presets */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <span className="text-micro font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#F27A00]" />
            <span>Triangular Staircase Zipper</span>
          </span>
          <h3 className="text-statement font-extrabold text-slate-900 mt-0.5">
            Two Neighboring Triangular Numbers Zip Into a Square!
          </h3>
        </div>

        {/* Presets n=3, n=4 */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setIsAnimating(false);
              setN(3);
            }}
            className={`min-h-[40px] px-3.5 py-1.5 rounded-xl text-small font-bold border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              n === 3
                ? 'bg-[#005583] text-white border-[#003F62] shadow-2xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            n = 3 (3 + 6 = 9)
          </button>
          <button
            type="button"
            onClick={() => {
              setIsAnimating(false);
              setN(4);
            }}
            className={`min-h-[40px] px-3.5 py-1.5 rounded-xl text-small font-bold border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              n === 4
                ? 'bg-[#005583] text-white border-[#003F62] shadow-2xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            n = 4 (6 + 10 = 16)
          </button>
        </div>
      </div>

      {/* Interactive Slider & Zip Button */}
      <div className="p-4 rounded-2xl bg-slate-50/80 flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-1 w-full flex items-center gap-2.5 sm:gap-3">
          <span className="text-micro font-bold text-slate-600 shrink-0 whitespace-nowrap">
            <span className="hidden sm:inline">Separate (0%)</span>
            <span className="sm:hidden">0%</span>
          </span>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={zipPercent}
            onChange={(e) => {
              setIsAnimating(false);
              setZipPercent(parseInt(e.target.value, 10));
            }}
            aria-label="Zip triangular staircases together"
            className="flex-1 accent-[#F27A00] cursor-pointer h-2.5 bg-slate-200 rounded-lg"
          />
          <span className="text-micro font-bold text-slate-600 shrink-0 whitespace-nowrap">
            <span className="hidden sm:inline">Interlocked (100%)</span>
            <span className="sm:hidden">100%</span>
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              if (zipPercent >= 98) setZipPercent(0);
              setIsAnimating(true);
            }}
            className="min-h-[40px] px-4 py-2 rounded-xl bg-[#F27A00] hover:bg-[#D96B00] text-white text-small font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer whitespace-nowrap shrink-0"
          >
            <Play className="w-4 h-4" />
            <span>{zipPercent >= 98 ? 'Replay Zip' : 'Zip Together'}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setIsAnimating(false);
              setZipPercent(0);
            }}
            className="min-h-[40px] w-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 flex items-center justify-center cursor-pointer shrink-0"
            title="Separate Triangles"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* SVG Zipper Stage */}
      <div
        className="w-full rounded-2xl border p-3 flex flex-col items-center justify-center overflow-hidden transition-colors duration-300"
        style={{
          borderColor: isLocked ? '#F27A00' : COLORS.divider,
          backgroundColor: isLocked ? '#FFFBF5' : '#FFFFFF',
          backgroundImage: `radial-gradient(${COLORS.canvasGrid} 1.5px, transparent 1.5px)`,
          backgroundSize: '20px 20px',
        }}
      >
        <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto max-h-[260px] select-none">
          {/* Square Target Frame */}
          <rect
            x={baseLeftX - dotR - 10}
            y={baseTopY - dotR - 10}
            width={squareW + (dotR + 10) * 2}
            height={squareW + (dotR + 10) * 2}
            rx={16}
            fill={isLocked ? 'rgba(242, 122, 0, 0.08)' : 'rgba(148, 163, 184, 0.05)'}
            stroke={isLocked ? '#F27A00' : '#CBD5E1'}
            strokeWidth={isLocked ? 3 : 1.5}
            strokeDasharray={isLocked ? 'none' : '6 5'}
          />

          {/* Separate-State Labels */}
          {zipPercent < 40 && (
            <g opacity={1 - zipPercent / 40}>
              <text
                x={baseLeftX + squareW / 2}
                y={baseTopY - dotR - 18}
                textAnchor="middle"
                fill="#C2410C"
                fontSize={13}
                fontWeight={800}
              >
                T{n} = {tCurr} orange dots
              </text>
              <text
                x={blueStartBaseX + ((prevRows - 1) * spacing) / 2}
                y={blueStartTopY - dotR - 18}
                textAnchor="middle"
                fill="#0369A1"
                fontSize={13}
                fontWeight={800}
              >
                T{n - 1} = {tPrev} blue dots
              </text>
            </g>
          )}

          {/* Locked Square Label */}
          {isLocked && (
            <text
              x={baseLeftX + squareW / 2}
              y={baseTopY - dotR - 20}
              textAnchor="middle"
              fill="#9A3412"
              fontSize={14}
              fontWeight={900}
            >
              Perfect {n} × {n} Square = {totalSquare} dots!
            </text>
          )}

          {/* Orange Staircase Dots (T_n) */}
          {orangeDots.map((d, idx) => (
            <g key={d.key}>
              <circle
                cx={d.x}
                cy={d.y}
                r={dotR}
                fill="#F27A00"
                stroke="#9A3412"
                strokeWidth={1.8}
              />
              <text
                x={d.x}
                y={d.y + 4}
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize={10}
                fontWeight={800}
              >
                {idx + 1}
              </text>
            </g>
          ))}

          {/* Blue Staircase Dots (T_{n-1}) */}
          {blueDots.map((d, idx) => (
            <g key={d.key}>
              <circle
                cx={d.x}
                cy={d.y}
                r={dotR}
                fill="#0788D3"
                stroke="#075985"
                strokeWidth={1.8}
              />
              <text
                x={d.x}
                y={d.y + 4}
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize={10}
                fontWeight={800}
              >
                {idx + 1}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Live Equation Footer */}
      <div className="p-4 rounded-2xl bg-slate-50/80 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-small font-bold text-slate-800">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#0788D3]" />
            <span>T{n - 1} ({tPrev})</span>
          </span>
          <span>+</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#F27A00]" />
            <span>T{n} ({tCurr})</span>
          </span>
          <ArrowRight className="w-4 h-4 text-slate-400" />
          <span className="font-extrabold text-slate-900">
            {n}² = {totalSquare}
          </span>
        </div>

        <div className="text-body font-bold text-[#005583]">
          <Katex
            latex={`T_{${n - 1}} + T_{${n}} = ${tPrev} + ${tCurr} = ${totalSquare} = ${n}^2`}
            displayMode={false}
          />
        </div>
      </div>
    </div>
  );
};
