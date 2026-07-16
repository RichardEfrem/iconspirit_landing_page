"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Inline, branding-free video player built on the YouTube IFrame API.
 * It lives in the page (no modal). YouTube's own controls — channel name, title
 * bar, logo, captions, end-screen suggestions — are disabled; we render our own.
 * The YouTube script loads only after the first play click (a "facade"), so the
 * page stays light until the visitor actually wants to watch.
 */

// Minimal typing for the bits of the IFrame API we use.
interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  mute(): void;
  unMute(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  getCurrentTime(): number;
  getDuration(): number;
  destroy(): void;
}
interface YTNamespace {
  Player: new (el: HTMLElement, opts: unknown) => YTPlayer;
  PlayerState: { ENDED: number; PLAYING: number; PAUSED: number };
}
declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<YTNamespace> | null = null;
function loadYouTubeAPI(): Promise<YTNamespace> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      if (window.YT) resolve(window.YT);
    };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  });
  return apiPromise;
}

function fmt(s: number) {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function VideoPlayer({
  videoId,
  poster,
  className = "",
}: {
  videoId: string;
  poster: string;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const rafRef = useRef<number | undefined>(undefined);

  const [activated, setActivated] = useState(false); // has the visitor pressed play at least once
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const tick = useCallback(() => {
    const p = playerRef.current;
    if (p) {
      setTime(p.getCurrentTime());
      setDuration(p.getDuration());
    }
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  // Build the player once the visitor activates it. Torn down on unmount.
  useEffect(() => {
    if (!activated) return;
    let cancelled = false;

    loadYouTubeAPI().then((YT) => {
      if (cancelled || !hostRef.current) return;
      playerRef.current = new YT.Player(hostRef.current, {
        videoId,
        playerVars: {
          autoplay: 1,
          controls: 0, // no native control bar
          modestbranding: 1,
          rel: 0, // restrict end cards to same channel
          fs: 0,
          disablekb: 1,
          cc_load_policy: 0, // don't auto-show closed captions
          iv_load_policy: 3, // no annotations
          playsinline: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (e: { target: YTPlayer }) => {
            setReady(true);
            setDuration(e.target.getDuration());
            rafRef.current = requestAnimationFrame(tick);
          },
          onStateChange: (e: { data: number }) => {
            const S = window.YT!.PlayerState;
            if (e.data === S.PLAYING) {
              setPlaying(true);
              setEnded(false);
            } else if (e.data === S.PAUSED) {
              setPlaying(false);
            } else if (e.data === S.ENDED) {
              setPlaying(false);
              setEnded(true);
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [activated, videoId, tick]);

  const togglePlay = () => {
    const p = playerRef.current;
    if (!p) return;
    if (ended) {
      p.seekTo(0, true);
      p.playVideo();
    } else if (playing) {
      p.pauseVideo();
    } else {
      p.playVideo();
    }
  };

  const toggleMute = () => {
    const p = playerRef.current;
    if (!p) return;
    if (muted) {
      p.unMute();
      setMuted(false);
    } else {
      p.mute();
      setMuted(true);
    }
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const p = playerRef.current;
    if (!p) return;
    const t = Number(e.target.value);
    p.seekTo(t, true);
    setTime(t);
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else wrapRef.current?.requestFullscreen?.();
  };

  return (
    <div
      ref={wrapRef}
      className={`group relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-2xl ${className}`}
    >
      {/* YouTube iframe is injected here by the API after activation */}
      {activated && <div ref={hostRef} className="absolute inset-0 h-full w-full" />}

      {/* Poster + big play button (facade) — shown until the player is playing */}
      {(!activated || !ready) && (
        <button
          type="button"
          onClick={() => setActivated(true)}
          aria-label="Play company profile video"
          className="absolute inset-0 h-full w-full cursor-pointer"
        >
          <Image
            src={poster}
            alt="Watch the IconSpirit company profile"
            fill
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-cover"
          />
          <span className="absolute inset-0 bg-ink/30 transition-colors group-hover:bg-ink/20" />
          <span className="absolute inset-0 flex items-center justify-center">
            {activated ? (
              <span className="h-12 w-12 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            ) : (
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-clay/90 shadow-lg transition-transform group-hover:scale-110">
                <svg viewBox="0 0 24 24" className="ml-1 h-9 w-9 fill-white" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            )}
          </span>
        </button>
      )}

      {/* Once playing, a click-catcher intercepts pointer input so YouTube chrome
          never appears on hover; a tap toggles play/pause. */}
      {activated && ready && (
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? "Pause" : "Play"}
          className="absolute inset-0 h-full w-full cursor-pointer"
        />
      )}

      {/* Center play / replay button when paused or ended */}
      {activated && ready && !playing && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-clay/90 shadow-lg">
            <svg viewBox="0 0 24 24" className="ml-1 h-9 w-9 fill-white" aria-hidden>
              {ended ? (
                <path d="M12 5V1L7 6l5 5V7a5 5 0 11-5 5H5a7 7 0 107-7z" />
              ) : (
                <path d="M8 5v14l11-7z" />
              )}
            </svg>
          </span>
        </div>
      )}

      {/* Custom control bar */}
      {activated && ready && (
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-linear-to-t from-black/70 to-transparent px-4 pb-3 pt-8 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? "Pause" : "Play"}
            className="flex-none text-white"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
              {playing ? <path d="M6 5h4v14H6zM14 5h4v14h-4z" /> : <path d="M8 5v14l11-7z" />}
            </svg>
          </button>

          <span className="flex-none text-xs tabular-nums text-white/80">{fmt(time)}</span>

          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={time}
            onChange={seek}
            aria-label="Seek"
            className="h-1 flex-1 cursor-pointer appearance-none rounded-full accent-clay"
            style={{
              background: `linear-gradient(to right, var(--color-clay) ${
                duration ? (time / duration) * 100 : 0
              }%, rgba(255,255,255,0.25) 0%)`,
            }}
          />

          <span className="flex-none text-xs tabular-nums text-white/80">{fmt(duration)}</span>

          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Unmute" : "Mute"}
            className="flex-none text-white"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
              {muted ? (
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3l2.5 2.5-1 1L15.5 13 13 15.5l-1-1L14.5 12 12 9.5l1-1L15.5 11 18 8.5l1 1z" />
              ) : (
                <path d="M3 9v6h4l5 5V4L7 9H3zm13 3a4 4 0 00-2-3.46v6.92A4 4 0 0016 12z" />
              )}
            </svg>
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label="Fullscreen"
            className="flex-none text-white"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
              <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
