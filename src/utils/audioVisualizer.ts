import type { WorkEntry } from '../data/portfolio';

export type VisualizerMode = 'bars' | 'waveform' | 'circular';

export interface Point2D {
  x: number;
  y: number;
}

/**
 * Downsamples Web Audio frequency byte bins (0..255) into a fixed number of
 * normalized bar heights (0..1). When inactive, returns a gentle baseline.
 */
export function sampleVisualizerBars(
  frequencyData: ArrayLike<number>,
  barCount: number,
  isPlaying: boolean
): number[] {
  if (barCount <= 0) return [];
  if (!isPlaying || frequencyData.length === 0) {
    return Array.from({ length: barCount }, () => 0.08);
  }

  const binStep = Math.max(1, Math.floor(frequencyData.length / barCount));
  const bars: number[] = [];

  for (let i = 0; i < barCount; i++) {
    const start = i * binStep;
    const end = Math.min(frequencyData.length, start + binStep);
    let sum = 0;
    for (let j = start; j < end; j++) {
      sum += frequencyData[j];
    }
    const avg = sum / Math.max(1, end - start);
    const normalized = Math.max(0.08, Math.min(1, avg / 255));
    bars.push(Number(normalized.toFixed(3)));
  }

  return bars;
}

/**
 * Maps time-domain byte samples (0..255, centered at 128) into canvas coordinates.
 */
export function computeWaveformPoints(
  timeDomainData: ArrayLike<number>,
  width: number,
  height: number,
  isPlaying: boolean
): Point2D[] {
  if (width <= 0 || height <= 0) return [];
  const midY = height / 2;

  if (!isPlaying || timeDomainData.length === 0) {
    return [
      { x: 0, y: midY },
      { x: width, y: midY },
    ];
  }

  const sampleCount = Math.min(timeDomainData.length, 64);
  const step = Math.max(1, Math.floor(timeDomainData.length / sampleCount));
  const points: Point2D[] = [];

  for (let i = 0; i < sampleCount; i++) {
    const raw = timeDomainData[i * step] ?? 128;
    const normalized = (raw - 128) / 128;
    const x = sampleCount === 1 ? 0 : (i / (sampleCount - 1)) * width;
    const y = midY + normalized * (height * 0.38);
    points.push({
      x: Number(x.toFixed(2)),
      y: Number(y.toFixed(2)),
    });
  }

  return points;
}

export function hasPublishedProjectDetails(entry: WorkEntry): boolean {
  return Boolean(
    entry.summary ||
      entry.whatAndWhy ||
      entry.challengeAndDecision ||
      entry.liveUrl ||
      entry.codeUrl
  );
}
