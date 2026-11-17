/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Dot {
  row: number;
  col: number;
}

export function dotSquare(n: number): Dot[] {
  const dots: Dot[] = [];
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      dots.push({ row: r, col: c });
    }
  }
  return dots;
}

export function lFrame(k: number): Dot[] {
  const dots: Dot[] = [];
  // k-th L-frame in an n x n grid (where max(row+1, col+1) == k)
  for (let i = 0; i < k; i++) {
    dots.push({ row: k - 1, col: i });
    if (i < k - 1) {
      dots.push({ row: i, col: k - 1 });
    }
  }
  return dots;
}

export function triangleDots(n: number): Dot[] {
  const dots: Dot[] = [];
  for (let r = 0; r < n; r++) {
    for (let c = 0; c <= r; c++) {
      dots.push({ row: r, col: c });
    }
  }
  return dots;
}

export function trianglePair(n: number): { lower: Dot[]; upper: Dot[] } {
  const lower: Dot[] = [];
  const upper: Dot[] = [];
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (c <= r) {
        lower.push({ row: r, col: c });
      } else {
        upper.push({ row: r, col: c });
      }
    }
  }
  return { lower, upper };
}

export interface AreaPart {
  x: number;
  y: number;
  width: number;
  height: number;
  label?: string;
  colorType: 'number' | 'area' | 'side';
}

export function areaPicture(side: number | string): { parts: AreaPart[]; totalArea: number } {
  if (typeof side === 'number') {
    const parts: AreaPart[] = [];
    for (let r = 0; r < side; r++) {
      for (let c = 0; c < side; c++) {
        parts.push({ x: c, y: r, width: 1, height: 1, colorType: 'area' });
      }
    }
    return { parts, totalArea: side * side };
  }

  if (side === '3/5') {
    // 5x5 unit square with 3x3 shaded (area 9/25)
    const parts: AreaPart[] = [];
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        parts.push({
          x: c,
          y: r,
          width: 1,
          height: 1,
          colorType: r < 3 && c < 3 ? 'area' : 'number',
        });
      }
    }
    return { parts, totalArea: 0.36 }; // 9/25
  }

  if (side === '2.5') {
    // 2.5 x 2.5 square split into 2x2 full cells, two 2x0.5 strips and one 0.5x0.5 piece
    const parts: AreaPart[] = [
      { x: 0, y: 0, width: 2, height: 2, colorType: 'area', label: '2×2' },
      { x: 2, y: 0, width: 0.5, height: 2, colorType: 'side', label: '2×0.5' },
      { x: 0, y: 2, width: 2, height: 0.5, colorType: 'side', label: '0.5×2' },
      { x: 2, y: 2, width: 0.5, height: 0.5, label: '0.5×0.5', colorType: 'number' },
    ];
    return { parts, totalArea: 6.25 };
  }

  return { parts: [], totalArea: 0 };
}

export interface CubeFace {
  points: string;
  fill: string;
  stroke: string;
}

export interface RenderCube {
  x: number;
  y: number;
  z: number;
  faces: CubeFace[];
}

export function isoCube(n: number, maxLayer: number = n): RenderCube[] {
  const cubes: RenderCube[] = [];
  // Painter's order: back to front (z, y, x)
  for (let z = 0; z < maxLayer; z++) {
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        // Isometric projection coordinates
        // tile width w, height h
        const w = 32;
        const h = 16;
        const screenX = 200 + (x - y) * (w / 2);
        const screenY = 100 + (x + y) * (h / 2) - z * h;

        // 3 faces: top, left, right
        const top = `${screenX},${screenY - h} ${screenX + w / 2},${screenY} ${screenX},${screenY + h} ${screenX - w / 2},${screenY}`;
        const left = `${screenX - w / 2},${screenY} ${screenX},${screenY + h} ${screenX},${screenY + h + h} ${screenX - w / 2},${screenY + h}`;
        const right = `${screenX},${screenY + h} ${screenX + w / 2},${screenY} ${screenX + w / 2},${screenY + h} ${screenX},${screenY + h + h}`;

        cubes.push({
          x,
          y,
          z,
          faces: [
            { points: top, fill: '#FED7AA', stroke: '#F97316' },
            { points: left, fill: '#FFEDD5', stroke: '#F97316' },
            { points: right, fill: '#FDBA74', stroke: '#EA580C' },
          ],
        });
      }
    }
  }
  return cubes;
}

export function isoLayer(n: number, k: number): RenderCube[] {
  return isoCube(n, k);
}

export function arrayRect(a: number, b: number): Dot[] {
  const dots: Dot[] = [];
  for (let r = 0; r < a; r++) {
    for (let c = 0; c < b; c++) {
      dots.push({ row: r, col: c });
    }
  }
  return dots;
}
