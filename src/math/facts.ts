/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function divisors(n: number): number[] {
  const divs: number[] = [];
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) divs.push(i);
  }
  return divs;
}

export function factorPairs(n: number): [number, number][] {
  const pairs: [number, number][] = [];
  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      pairs.push([i, n / i]);
    }
  }
  return pairs;
}

export function toggleCount(n: number): number {
  return divisors(n).length;
}

export function lockers(maxPerson: number, total: number = 100): boolean[] {
  const state = new Array(total).fill(false); // false = closed, true = open
  for (let p = 1; p <= maxPerson; p++) {
    for (let l = p; l <= total; l += p) {
      state[l - 1] = !state[l - 1];
    }
  }
  return state;
}

export function isSquare(n: number): boolean {
  if (n < 0) return false;
  const r = Math.round(Math.sqrt(n));
  return r * r === n;
}

export function isCube(n: number): boolean {
  const r = Math.round(Math.cbrt(n));
  return r * r * r === n;
}

export function nthOdd(n: number): number {
  return 2 * n - 1;
}

export function sumOfFirstOdds(n: number): number {
  return n * n;
}

export function subtractOdds(N: number): { steps: { odd: number; result: number }[]; isSquare: boolean; stepsCount: number } {
  const steps: { odd: number; result: number }[] = [];
  let current = N;
  let k = 1;
  while (current > 0) {
    const odd = nthOdd(k);
    current = current - odd;
    steps.push({ odd, result: current });
    k++;
    if (k > 200) break; // safety guard
  }
  return {
    steps,
    isSquare: current === 0,
    stepsCount: steps.length,
  };
}

export function betweenSquares(n: number): { start: number; end: number; numbers: number[]; count: number } {
  const p = n * n;
  const q = (n + 1) * (n + 1);
  const numbers: number[] = [];
  for (let i = p + 1; i < q; i++) {
    numbers.push(i);
  }
  return {
    start: p + 1,
    end: q - 1,
    numbers,
    count: numbers.length,
  };
}

export function squaresPerBlock(blockSz: number = 100, maxN: number = 1000): number[] {
  const blocksCount = maxN / blockSz;
  const counts: number[] = new Array(blocksCount).fill(0);
  for (let i = 1; i * i <= maxN; i++) {
    const sq = i * i;
    const blockIdx = Math.floor((sq - 1) / blockSz);
    if (blockIdx >= 0 && blockIdx < blocksCount) {
      counts[blockIdx]++;
    }
  }
  return counts;
}

export function triangular(n: number): number {
  return (n * (n + 1)) / 2;
}

export function primeFactors(n: number): number[] {
  const factors: number[] = [];
  let temp = n;
  let d = 2;
  while (d * d <= temp) {
    while (temp % d === 0) {
      factors.push(d);
      temp /= d;
    }
    d++;
  }
  if (temp > 1) {
    factors.push(temp);
  }
  return factors;
}

export function groupIdentical(n: number, k: number): { groups: number[][]; leftover: number[]; root?: number } {
  const pfacts = primeFactors(n);
  const freq = new Map<number, number>();
  for (const pf of pfacts) {
    freq.set(pf, (freq.get(pf) || 0) + 1);
  }
  const groups: number[][] = [];
  const leftover: number[] = [];
  let rootVal = 1;
  let exact = true;

  for (const [prime, count] of freq.entries()) {
    const fullGroups = Math.floor(count / k);
    const rem = count % k;
    for (let i = 0; i < fullGroups; i++) {
      groups.push(new Array(k).fill(prime));
      rootVal *= prime;
    }
    if (rem > 0) {
      exact = false;
      for (let i = 0; i < rem; i++) {
        leftover.push(prime);
      }
    }
  }

  return {
    groups,
    leftover,
    root: exact ? rootVal : undefined,
  };
}

export function lastDigitOfSquare(d: number): number {
  const sq = (d * d) % 10;
  return sq;
}

export function lastDigitOfCube(d: number): number {
  const cb = (d * d * d) % 10;
  return cb;
}

export function trailingZeros(n: number): { originalZeros: number; squareZeros: number; cubeZeros: number } {
  const str = n.toString();
  let z = 0;
  for (let i = str.length - 1; i >= 0; i--) {
    if (str[i] === '0') z++;
    else break;
  }
  return {
    originalZeros: z,
    squareZeros: z * 2,
    cubeZeros: z * 3,
  };
}

export function getCubesByDigits(): { oneDigit: number; twoDigit: number; threeDigit: number } {
  let oneDigit = 0;
  let twoDigit = 0;
  let threeDigit = 0;
  for (let i = 1; i * i * i <= 999; i++) {
    const cb = i * i * i;
    const digits = cb.toString().length;
    if (digits === 1) oneDigit++;
    else if (digits === 2) twoDigit++;
    else if (digits === 3) threeDigit++;
  }
  return { oneDigit, twoDigit, threeDigit };
}

export function cubeAsOdds(n: number): { odds: number[]; sum: number } {
  const start = n * n - n + 1;
  const odds: number[] = [];
  let sum = 0;
  for (let i = 0; i < n; i++) {
    const odd = start + 2 * i;
    odds.push(odd);
    sum += odd;
  }
  return { odds, sum };
}

export function taxicabWays(N: number): [number, number][] {
  const pairs: [number, number][] = [];
  const limit = Math.round(Math.cbrt(N));
  for (let a = 1; a <= limit; a++) {
    for (let b = a; b <= limit; b++) {
      if (a * a * a + b * b * b === N) {
        pairs.push([a, b]);
      }
    }
  }
  return pairs;
}

export function successiveDifferences(list: number[]): number[][] {
  const levels: number[][] = [list];
  let current = list;
  while (current.length > 1) {
    const next: number[] = [];
    for (let i = 0; i < current.length - 1; i++) {
      next.push(current[i + 1] - current[i]);
    }
    levels.push(next);
    current = next;
    if (current.every((v) => v === current[0])) break;
  }
  return levels;
}

// Simple solver for square pairs (1..17 row)
export function solveSquarePairsRow(maxN: number = 17): { solutionsCount: number; samplePath: number[] } {
  let solutionsCount = 0;
  let samplePath: number[] = [];

  function dfs(path: number[], visited: boolean[]) {
    if (path.length === maxN) {
      solutionsCount++;
      if (samplePath.length === 0) samplePath = [...path];
      return;
    }
    const last = path[path.length - 1];
    for (let next = 1; next <= maxN; next++) {
      if (!visited[next]) {
        if (isSquare(last + next)) {
          visited[next] = true;
          path.push(next);
          dfs(path, visited);
          path.pop();
          visited[next] = false;
        }
      }
    }
  }

  const visited = new Array(maxN + 1).fill(false);
  for (let start = 1; start <= maxN; start++) {
    visited[start] = true;
    dfs([start], visited);
    visited[start] = false;
  }

  // Each path counted twice (forward and backward) except symmetric ones
  return {
    solutionsCount: Math.round(solutionsCount / 2),
    samplePath,
  };
}

export function solveSquarePairsCircle(maxN: number = 32): { exists: boolean; sampleCircle?: number[] } {
  let sampleCircle: number[] | undefined;

  function dfs(path: number[], visited: boolean[]) {
    if (path.length === maxN) {
      if (isSquare(path[path.length - 1] + path[0])) {
        sampleCircle = [...path];
      }
      return;
    }
    const last = path[path.length - 1];
    for (let next = 1; next <= maxN; next++) {
      if (!visited[next]) {
        if (isSquare(last + next)) {
          visited[next] = true;
          path.push(next);
          dfs(path, visited);
          if (sampleCircle) return;
          path.pop();
          visited[next] = false;
        }
      }
    }
  }

  const visited = new Array(maxN + 1).fill(false);
  visited[1] = true;
  dfs([1], visited);

  return {
    exists: !!sampleCircle,
    sampleCircle,
  };
}

// Dev-only selfCheck()
export function selfCheck() {
  const results: { check: string; status: 'PASS' | 'FAIL'; detail: string }[] = [];

  // 1. Lockers after person 100
  const lockSt = lockers(100, 100);
  const openLockers = lockSt.map((isOpen, idx) => (isOpen ? idx + 1 : null)).filter(Boolean);
  const expectedOpen = [1, 4, 9, 16, 25, 36, 49, 64, 81, 100];
  const lockersPass = JSON.stringify(openLockers) === JSON.stringify(expectedOpen);
  results.push({
    check: 'Lockers 100 open state',
    status: lockersPass ? 'PASS' : 'FAIL',
    detail: `Open: ${openLockers.join(', ')}`,
  });

  // 2. Primes as 2-toggle lockers
  const primes = [2, 3, 5, 7, 11];
  const primesPass = primes.every((p) => toggleCount(p) === 2);
  results.push({
    check: 'Primes have 2 toggles',
    status: primesPass ? 'PASS' : 'FAIL',
    detail: `Toggles for [2,3,5,7,11] = ${primes.map(toggleCount).join(',')}`,
  });

  // 3. Factors count: 36 has 9, 6 has 4
  const fac36 = toggleCount(36) === 9;
  const fac6 = toggleCount(6) === 4;
  results.push({
    check: 'Factor counts (36=9, 6=4)',
    status: fac36 && fac6 ? 'PASS' : 'FAIL',
    detail: `36 factors: ${toggleCount(36)}, 6 factors: ${toggleCount(6)}`,
  });

  // 4. subtractOdds
  const sub25 = subtractOdds(25);
  const sub81 = subtractOdds(81);
  const sub38 = subtractOdds(38);
  results.push({
    check: 'Subtract odds (25->5, 81->9)',
    status: sub25.stepsCount === 5 && sub81.stepsCount === 9 && sub38.steps[sub38.steps.length - 1].result === -11 ? 'PASS' : 'FAIL',
    detail: `25 steps: ${sub25.stepsCount}, 81 steps: ${sub81.stepsCount}, 38 final: ${sub38.steps[sub38.steps.length - 1].result}`,
  });

  // 5. betweenSquares
  const b16 = betweenSquares(16);
  const b99 = betweenSquares(99);
  results.push({
    check: 'Between squares counts (n=16 -> 32, n=99 -> 198)',
    status: b16.count === 32 && b99.count === 198 ? 'PASS' : 'FAIL',
    detail: `n=16 count: ${b16.count}, n=99 count: ${b99.count}`,
  });

  // 6. squaresPerBlock
  const spb = squaresPerBlock(100, 1000);
  const expectedSpb = [10, 4, 3, 3, 2, 2, 2, 2, 2, 1];
  const spbPass = JSON.stringify(spb) === JSON.stringify(expectedSpb);
  results.push({
    check: 'Squares per block up to 1000',
    status: spbPass ? 'PASS' : 'FAIL',
    detail: `Blocks: ${spb.join(', ')}`,
  });

  // 7. triangular relation
  let triPass = true;
  for (let n = 2; n <= 10; n++) {
    if (triangular(n - 1) + triangular(n) !== n * n) triPass = false;
  }
  results.push({
    check: 'Triangular relation T(n-1)+T(n) = n^2',
    status: triPass ? 'PASS' : 'FAIL',
    detail: 'Checked n=2..10',
  });

  // 8. primeFactors grouping
  const g324 = groupIdentical(324, 2);
  const g3375 = groupIdentical(3375, 3);
  results.push({
    check: 'Prime factor grouping (324->18, 3375->15)',
    status: g324.root === 18 && g3375.root === 15 ? 'PASS' : 'FAIL',
    detail: `324 root: ${g324.root}, 3375 root: ${g3375.root}`,
  });

  // 9. cubesByDigits
  const cbd = getCubesByDigits();
  results.push({
    check: 'Cubes by digits (2, 2, 5)',
    status: cbd.oneDigit === 2 && cbd.twoDigit === 2 && cbd.threeDigit === 5 ? 'PASS' : 'FAIL',
    detail: `1-dig: ${cbd.oneDigit}, 2-dig: ${cbd.twoDigit}, 3-dig: ${cbd.threeDigit}`,
  });

  // 10. cubeAsOdds
  const co10 = cubeAsOdds(10);
  results.push({
    check: 'Cube as odds (n=10 sum=1000)',
    status: co10.sum === 1000 && co10.odds[0] === 91 && co10.odds[co10.odds.length - 1] === 109 ? 'PASS' : 'FAIL',
    detail: `Sum: ${co10.sum}, range: ${co10.odds[0]}..${co10.odds[co10.odds.length - 1]}`,
  });

  // 11. taxicabWays
  const tc1729 = taxicabWays(1729);
  const tc4104 = taxicabWays(4104);
  results.push({
    check: 'Taxicab ways (1729 and 4104)',
    status: tc1729.length >= 2 && tc4104.length >= 2 ? 'PASS' : 'FAIL',
    detail: `1729 pairs: ${tc1729.map((p) => p.join(',')).join('; ')}`,
  });

  console.table(results);
  return results;
}
