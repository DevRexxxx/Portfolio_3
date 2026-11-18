import { useEffect, useRef, useState } from 'react';
import { Play, Square } from 'lucide-react';
import {
  computeWaveformPoints,
  sampleVisualizerBars,
  type VisualizerMode,
} from '../utils/audioVisualizer';

interface BuzzAudioVisualizerProps {
  theme: 'light' | 'dark';
  reducedMotion: boolean;
}

export function BuzzAudioVisualizer({
  theme,
  reducedMotion,
}: BuzzAudioVisualizerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState<VisualizerMode>('bars');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const oscsRef = useRef<OscillatorNode[]>([]);
  const rafRef = useRef<number>(0);

  const stopAudio = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }

    const ctx = audioCtxRef.current;
    const gain = masterGainRef.current;
    if (ctx && gain) {
      const now = ctx.currentTime;
      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(gain.gain.value, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

      const activeOscs = [...oscsRef.current];
      window.setTimeout(() => {
        activeOscs.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {
            // Already stopped
          }
        });
      }, 160);
    }

    oscsRef.current = [];
    setIsPlaying(false);
  };

  const startAudio = async () => {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;

    if (!AudioCtx) return;

    const ctx = audioCtxRef.current ?? new AudioCtx();
    audioCtxRef.current = ctx;

    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    const analyser = ctx.createAnalyser();
    analyser.fftSize = 128;
    analyser.smoothingTimeConstant = 0.82;
    analyserRef.current = analyser;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.18);
    masterGainRef.current = masterGain;

    const freqs = [220, 329.63, 493.88];
    const oscs: OscillatorNode[] = [];

    freqs.forEach((hz, idx) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(hz, ctx.currentTime);
      oscGain.gain.setValueAtTime(idx === 0 ? 0.55 : 0.25, ctx.currentTime);
      osc.connect(oscGain);
      oscGain.connect(masterGain);
      osc.start();
      oscs.push(osc);
    });

    masterGain.connect(analyser);
    analyser.connect(ctx.destination);

    oscsRef.current = oscs;
    setIsPlaying(true);
  };

  const handleToggle = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      void startAudio();
    }
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      oscsRef.current.forEach((osc) => {
        try {
          osc.stop();
        } catch {
          // Ignore cleanup errors
        }
      });
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        void audioCtxRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.clientWidth || 640;
    const height = canvas.clientHeight || 112;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const freqBuf = new Uint8Array(
      analyserRef.current ? analyserRef.current.frequencyBinCount : 64
    );
    const timeBuf = new Uint8Array(
      analyserRef.current ? analyserRef.current.fftSize : 128
    );

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const inkColor = theme === 'dark' ? '#F2EDE4' : '#1A1A1A';
      const mutedColor =
        theme === 'dark' ? 'rgba(242, 237, 228, 0.20)' : 'rgba(26, 26, 26, 0.16)';
      const accentColor = '#E8452C';

      if (analyserRef.current && isPlaying) {
        analyserRef.current.getByteFrequencyData(freqBuf);
        analyserRef.current.getByteTimeDomainData(timeBuf);
      }

      if (mode === 'bars') {
        const bars = sampleVisualizerBars(freqBuf, 36, isPlaying);
        const gap = 5;
        const barW = Math.max(2, (width - gap * (bars.length - 1)) / bars.length);

        bars.forEach((norm, idx) => {
          const barH = Math.max(3, norm * (height - 16));
          const x = idx * (barW + gap);
          const y = height - barH - 6;
          ctx.fillStyle =
            isPlaying && idx % 6 === 0
              ? accentColor
              : isPlaying
                ? inkColor
                : mutedColor;
          ctx.fillRect(x, y, barW, barH);
        });
      } else if (mode === 'waveform') {
        const pts = computeWaveformPoints(timeBuf, width, height, isPlaying);
        ctx.beginPath();
        pts.forEach((pt, idx) => {
          if (idx === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.strokeStyle = isPlaying ? accentColor : mutedColor;
        ctx.lineWidth = 1.75;
        ctx.stroke();
      } else {
        const bars = sampleVisualizerBars(freqBuf, 28, isPlaying);
        const cx = width / 2;
        const cy = height / 2;
        const baseR = Math.min(width, height) * 0.26;

        ctx.beginPath();
        ctx.arc(cx, cy, baseR, 0, Math.PI * 2);
        ctx.strokeStyle = mutedColor;
        ctx.lineWidth = 1;
        ctx.stroke();

        bars.forEach((norm, idx) => {
          const angle = (idx / bars.length) * Math.PI * 2 - Math.PI / 2;
          const len = 4 + norm * 22;
          const x1 = cx + Math.cos(angle) * baseR;
          const y1 = cy + Math.sin(angle) * baseR;
          const x2 = cx + Math.cos(angle) * (baseR + len);
          const y2 = cy + Math.sin(angle) * (baseR + len);

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = isPlaying ? accentColor : mutedColor;
          ctx.lineWidth = 1.6;
          ctx.stroke();
        });
      }
    };

    draw();

    if (isPlaying && !reducedMotion) {
      const tick = () => {
        draw();
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying, mode, theme, reducedMotion]);

  return (
    <div
      data-testid="buzz-audio-visualizer"
      data-state={isPlaying ? 'playing' : 'idle'}
      className="border-t border-[#1A1A1A]/12 dark:border-[#F2EDE4]/12 pt-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleToggle}
            aria-pressed={isPlaying}
            className="inline-flex items-center gap-2 border border-[#1A1A1A]/25 dark:border-[#F2EDE4]/25 px-4 py-2 text-xs font-medium text-[#1A1A1A] dark:text-[#F2EDE4] hover:border-[#E8452C] hover:text-[#E8452C] transition-colors cursor-pointer whitespace-nowrap shrink-0 min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8452C]"
          >
            {isPlaying ? (
              <>
                <Square className="h-3 w-3 fill-current" aria-hidden="true" />
                <span>Stop tone</span>
              </>
            ) : (
              <>
                <Play className="h-3 w-3 fill-current" aria-hidden="true" />
                <span>Play tone</span>
              </>
            )}
          </button>

          <span className="text-xs text-[#5C564F] dark:text-[#A39B90]">
            {isPlaying
              ? reducedMotion
                ? 'Audio tone playing (static canvas under reduced motion)'
                : 'Synthesizing Web Audio chord live'
              : 'Web Audio API experiment · off by default'}
          </span>
        </div>

        <div
          role="group"
          aria-label="Visualizer mode"
          className="flex items-center gap-5 text-xs"
        >
          {(['bars', 'waveform', 'circular'] as const).map((m) => {
            const active = mode === m;
            return (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                aria-pressed={active}
                className={`capitalize cursor-pointer whitespace-nowrap shrink-0 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8452C] ${
                  active
                    ? 'text-[#E8452C] underline underline-offset-4'
                    : 'text-[#5C564F] dark:text-[#A39B90] hover:text-[#1A1A1A] dark:hover:text-[#F2EDE4]'
                }`}
              >
                {m}
              </button>
            );
          })}
        </div>
      </div>

      <canvas
        ref={canvasRef}
        aria-label="Interactive Web Audio frequency visualizer"
        className="w-full h-[112px] block border border-[#1A1A1A]/10 dark:border-[#F2EDE4]/10 bg-[#EFE9DD]/60 dark:bg-[#1E1C19]"
      />
    </div>
  );
}
