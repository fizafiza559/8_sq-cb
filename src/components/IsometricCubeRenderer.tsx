/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { COLORS } from '../design/tokens';
import { Katex } from './Katex';
import { Box, Layers, Plus, Minus, Play, Pause, Maximize2, Minimize2 } from 'lucide-react';

export interface IsometricCubeRendererProps {
  initialN?: number;
  beatIndex?: number;
  className?: string;
  onNChange?: (n: number) => void;
}

function projectIso(
  x: number,
  y: number,
  z: number,
  size: number,
  cx: number,
  cy: number
) {
  const cos30 = 0.8660254;
  const sin30 = 0.5;
  const screenX = cx + (x - y) * size * cos30;
  const screenY = cy + (x + y) * size * sin30 - z * size;
  return { x: screenX, y: screenY };
}

function getCubeFaces(
  x: number,
  y: number,
  z: number,
  size: number,
  cx: number,
  cy: number
) {
  const p0 = projectIso(x, y, z + 1, size, cx, cy);
  const p1 = projectIso(x + 1, y, z + 1, size, cx, cy);
  const p2 = projectIso(x + 1, y + 1, z + 1, size, cx, cy);
  const p3 = projectIso(x, y + 1, z + 1, size, cx, cy);

  const p5 = projectIso(x + 1, y, z, size, cx, cy);
  const p6 = projectIso(x + 1, y + 1, z, size, cx, cy);
  const p7 = projectIso(x, y + 1, z, size, cx, cy);

  const topFace = `${p0.x},${p0.y} ${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`;
  const rightFace = `${p1.x},${p1.y} ${p5.x},${p5.y} ${p6.x},${p6.y} ${p2.x},${p2.y}`;
  const leftFace = `${p3.x},${p3.y} ${p2.x},${p2.y} ${p6.x},${p6.y} ${p7.x},${p7.y}`;

  return { topFace, rightFace, leftFace };
}

export const IsometricCubeRenderer: React.FC<IsometricCubeRendererProps> = ({
  initialN = 4,
  beatIndex,
  className = '',
  onNChange,
}) => {
  const [n, setN] = useState<number>(initialN);
  const [visibleLayers, setVisibleLayers] = useState<number>(initialN);
  const [explodeLayers, setExplodeLayers] = useState<boolean>(false);
  const [isAutoStacking, setIsAutoStacking] = useState<boolean>(false);
  const stackTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (beatIndex === undefined) return;
    setIsAutoStacking(false);
    if (beatIndex === 0) {
      setN(3);
      setVisibleLayers(3);
      setExplodeLayers(false);
    } else {
      setN(4);
      setVisibleLayers(4);
      setExplodeLayers(true);
    }
  }, [beatIndex]);

  useEffect(() => {
    if (isAutoStacking) {
      stackTimerRef.current = window.setInterval(() => {
        setVisibleLayers((prev) => {
          if (prev >= n) {
            setIsAutoStacking(false);
            return n;
          }
          return prev + 1;
        });
      }, 750);
    } else if (stackTimerRef.current !== null) {
      clearInterval(stackTimerRef.current);
      stackTimerRef.current = null;
    }
    return () => {
      if (stackTimerRef.current !== null) {
        clearInterval(stackTimerRef.current);
      }
    };
  }, [isAutoStacking, n]);

  const handleNChange = (newN: number) => {
    setIsAutoStacking(false);
    const clamped = Math.max(1, Math.min(5, newN));
    setN(clamped);
    setVisibleLayers(clamped);
    onNChange?.(clamped);
  };

  const viewWidth = 540;
  const viewHeight = explodeLayers ? 460 : 400;

  const cubeSize = explodeLayers
    ? n <= 2
      ? 36
      : n === 3
      ? 28
      : n === 4
      ? 22
      : 18
    : n <= 2
    ? 46
    : n === 3
    ? 34
    : n === 4
    ? 26
    : 21;

  const explodeGap = explodeLayers ? (n <= 3 ? 0.95 : 0.78) : 0;
  const cx = viewWidth / 2;
  const cy = explodeLayers ? 310 + (n - 3) * 14 : 210 + (n - 2) * 15;

  const perLayer = n * n;
  const currentCubesCount = perLayer * visibleLayers;
  const totalVolume = n * n * n;

  return (
    <div
      data-no-nav="true"
      className={`w-full max-w-4xl mx-auto rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-7 shadow-xs flex flex-col gap-5 ${className}`}
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <span className="text-micro font-bold uppercase tracking-wider text-slate-500">
            3D Isometric Volume Builder
          </span>
          <h3 className="text-statement font-extrabold flex items-center gap-2 mt-0.5" style={{ color: COLORS.headingText }}>
            <Box className="w-5 h-5 text-purple-600 shrink-0" />
            <span>Building {n} × {n} × {n} Layer by Layer ({totalVolume} Cubes)</span>
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setExplodeLayers((e) => !e)}
            className={`min-h-[40px] px-3.5 py-1.5 rounded-xl text-small font-bold border flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              explodeLayers
                ? 'bg-[#F27A00] text-white border-[#C2410C] shadow-xs'
                : 'bg-orange-50 text-orange-900 border-orange-300 hover:bg-orange-100'
            }`}
          >
            {explodeLayers ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span>{explodeLayers ? 'Collapse Cube' : 'Explode Layers'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (visibleLayers >= n) setVisibleLayers(1);
              setIsAutoStacking((p) => !p);
            }}
            className={`min-h-[40px] px-3.5 py-1.5 rounded-xl text-small font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              isAutoStacking
                ? 'bg-amber-600 text-white'
                : 'bg-[#005583] hover:bg-[#003F62] text-white shadow-2xs'
            }`}
          >
            {isAutoStacking ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isAutoStacking ? 'Pause' : 'Stack Layers'}</span>
          </button>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50/80">
        {/* Edge Length Controller */}
        <div className="flex items-center justify-between md:justify-start gap-3">
          <span className="text-small font-bold whitespace-nowrap" style={{ color: COLORS.headingText }}>
            Side (<span style={{ color: COLORS.side.solid }}>n</span>):
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleNChange(n - 1)}
              disabled={n <= 1}
              className="w-9 h-9 rounded-xl border bg-white flex items-center justify-center font-bold text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 cursor-pointer"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span
              className="w-10 text-center text-small font-extrabold px-2 py-1.5 rounded-lg"
              style={{ backgroundColor: COLORS.side.tint, color: COLORS.side.text }}
            >
              {n}
            </span>
            <button
              type="button"
              onClick={() => handleNChange(n + 1)}
              disabled={n >= 5}
              className="w-9 h-9 rounded-xl border bg-white flex items-center justify-center font-bold text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <input
            type="range"
            min={1}
            max={5}
            step={1}
            value={n}
            onChange={(e) => handleNChange(parseInt(e.target.value, 10))}
            className="w-24 sm:w-28 accent-[#16A34A] cursor-pointer"
          />
        </div>

        {/* Step-by-Step Layer Counter Chips (e.g. 16 -> 32 -> 48 -> 64) */}
        <div className="flex items-center justify-between md:justify-end gap-2 flex-wrap">
          <span className="text-small font-bold flex items-center gap-1.5 whitespace-nowrap" style={{ color: COLORS.headingText }}>
            <Layers className="w-4 h-4 text-purple-600" />
            <span>Layers:</span>
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {Array.from({ length: n }).map((_, lIdx) => {
              const layerCount = lIdx + 1;
              const cumCubes = layerCount * perLayer;
              const isSelected = visibleLayers === layerCount;
              return (
                <button
                  key={lIdx}
                  type="button"
                  onClick={() => {
                    setIsAutoStacking(false);
                    setVisibleLayers(layerCount);
                  }}
                  className={`min-h-[36px] px-2.5 py-1 rounded-xl text-micro font-bold border transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-purple-700 text-white shadow-xs border-purple-800'
                      : 'bg-white text-slate-700 hover:bg-purple-50 border-slate-200'
                  }`}
                >
                  L{layerCount}: {cumCubes}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3D Isometric SVG Canvas */}
      <div
        className="w-full flex items-center justify-center rounded-2xl border border-slate-100 bg-white overflow-hidden relative"
        style={{
          backgroundImage: `radial-gradient(${COLORS.canvasGrid} 1.5px, transparent 1.5px)`,
          backgroundSize: '20px 20px',
        }}
      >
        <svg
          viewBox={`0 0 ${viewWidth} ${viewHeight}`}
          className="w-full h-auto max-h-[300px] sm:max-h-[420px] select-none"
        >
          {/* Left Badge */}
          <g transform="translate(22, 22)">
            <rect
              x={0}
              y={0}
              width={136}
              height={54}
              rx={12}
              fill={COLORS.surface}
              stroke={COLORS.side.solid}
              strokeWidth={1.5}
            />
            <text x={68} y={21} textAnchor="middle" className="text-micro font-bold" fill={COLORS.side.text}>
              Each Flat Layer
            </text>
            <text x={68} y={42} textAnchor="middle" className="text-small font-extrabold" fill={COLORS.side.text}>
              {n} × {n} = {perLayer} cubes
            </text>
          </g>

          {/* Right Badge */}
          <g transform={`translate(${viewWidth - 158}, 22)`}>
            <rect
              x={0}
              y={0}
              width={136}
              height={54}
              rx={12}
              fill={COLORS.surface}
              stroke={COLORS.volume.solid}
              strokeWidth={1.5}
            />
            <text x={68} y={21} textAnchor="middle" className="text-micro font-bold" fill={COLORS.volume.text}>
              Total Stacked
            </text>
            <text x={68} y={42} textAnchor="middle" className="text-small font-extrabold" fill={COLORS.volume.text}>
              {currentCubesCount} / {totalVolume} cubes
            </text>
          </g>

          {/* Unit Cubes Render (Painter's algorithm: z ascending, then y, then x) */}
          <g>
            {Array.from({ length: visibleLayers }).map((_, z) => {
              const zPos = z * (1 + explodeGap);
              // Label to the right of each exploded layer
              const labelAnchor = projectIso(n, 0.5, zPos + 0.5, cubeSize, cx, cy);
              return (
                <g key={`layer-${z}`}>
                  {Array.from({ length: n }).map((_, y) =>
                    Array.from({ length: n }).map((_, x) => {
                      const faces = getCubeFaces(x, y, zPos, cubeSize, cx, cy);
                      const isTopLayer = z === visibleLayers - 1;
                      return (
                        <g key={`cube-${x}-${y}-${z}`}>
                          <polygon
                            points={faces.topFace}
                            fill={isTopLayer ? '#FED7AA' : COLORS.volume.tint}
                            stroke={COLORS.volume.solid}
                            strokeWidth={1}
                            strokeLinejoin="round"
                          />
                          <polygon
                            points={faces.rightFace}
                            fill={isTopLayer ? '#C4B5FD' : '#DDD6FE'}
                            stroke="#7C3AED"
                            strokeWidth={1}
                            strokeLinejoin="round"
                          />
                          <polygon
                            points={faces.leftFace}
                            fill={isTopLayer ? '#A78BFA' : '#C4B5FD'}
                            stroke="#6D28D9"
                            strokeWidth={1}
                            strokeLinejoin="round"
                          />
                        </g>
                      );
                    })
                  )}
                  {explodeLayers && (
                    <text
                      x={labelAnchor.x + 14}
                      y={labelAnchor.y + 4}
                      fill="#7C2D12"
                      fontSize={11}
                      fontWeight={800}
                    >
                      Layer {z + 1} (+{perLayer} → {(z + 1) * perLayer})
                    </text>
                  )}
                </g>
              );
            })}
          </g>

          {/* Bottom Caption */}
          <g transform={`translate(${viewWidth / 2}, ${viewHeight - 20})`}>
            <text textAnchor="middle" className="text-micro font-bold" fill={COLORS.headingText}>
              {explodeLayers
                ? `Exploded View: ${visibleLayers} flat ${n}×${n} sheets (${perLayer} cubes each) = ${currentCubesCount} cubes`
                : `Showing ${visibleLayers} of ${n} layers • ${visibleLayers} × ${perLayer} = ${currentCubesCount} unit cubes`}
            </text>
          </g>
        </svg>
      </div>

      {/* Formula Strip */}
      <div className="p-4 rounded-2xl bg-slate-50/80 text-center space-y-1">
        <div className="text-body sm:text-statement font-bold overflow-x-auto" style={{ color: COLORS.volume.text }}>
          <Katex
            latex={`\\text{Volume} = ${n} \\times ${n} \\times ${n} = ${n}^3 = ${totalVolume} \\quad (${Array.from({ length: visibleLayers }, (_, i) => (i + 1) * perLayer).join(' \\to ')})`}
            displayMode={false}
          />
        </div>
        <p className="text-micro font-medium" style={{ color: COLORS.mutedText }}>
          Each layer holds {n} × {n} = {perLayer} cubes. Stack {n} layers to fill a {n} × {n} × {n} cube ({totalVolume} cubes)!
        </p>
      </div>
    </div>
  );
};
