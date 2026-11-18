import test from 'node:test';
import assert from 'node:assert/strict';
import { EDITORIAL_PORTFOLIO } from '../data/portfolio';
import {
  computeWaveformPoints,
  hasPublishedProjectDetails,
  sampleVisualizerBars,
} from './audioVisualizer';

test('sampleVisualizerBars returns flat idle baseline when not playing', () => {
  const idle = sampleVisualizerBars([200, 220, 255], 5, false);
  assert.equal(idle.length, 5);
  assert.ok(idle.every((v) => v === 0.08));
});

test('sampleVisualizerBars normalizes active frequency bins into 0.08..1', () => {
  const active = sampleVisualizerBars([0, 128, 255, 255], 2, true);
  assert.equal(active.length, 2);
  assert.ok(active[0] > 0.2 && active[0] < 0.35);
  assert.equal(active[1], 1);
});

test('computeWaveformPoints maps idle state to flat midline and active samples inside canvas bounds', () => {
  const idlePts = computeWaveformPoints([128, 255], 200, 100, false);
  assert.deepEqual(idlePts, [
    { x: 0, y: 50 },
    { x: 200, y: 50 },
  ]);

  const activePts = computeWaveformPoints([0, 128, 255], 200, 100, true);
  assert.equal(activePts.length, 3);
  assert.ok(activePts.every((p) => p.y >= 0 && p.y <= 100));
  assert.equal(activePts[1].y, 50);
});

test('hasPublishedProjectDetails distinguishes shipped Buzz from documenting SachAI/AetherAI', () => {
  const sachai = EDITORIAL_PORTFOLIO.work.find((w) => w.slug === 'sachai')!;
  const buzz = EDITORIAL_PORTFOLIO.work.find((w) => w.slug === 'buzz-music-player')!;
  assert.equal(hasPublishedProjectDetails(sachai), false);
  assert.equal(hasPublishedProjectDetails(buzz), true);
  assert.equal(buzz.stage, 'shipped');
});
