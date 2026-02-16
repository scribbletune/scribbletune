// ---------------------------------------------------------------------------
// Tone.js boundary types
// Tone is a runtime global (not an npm dependency). These declarations cover
// only the API surface Scribbletune actually uses.
// ---------------------------------------------------------------------------

interface ToneAudioContext {
  rawContext: unknown;
  transport: ToneTransportInstance;
}

interface ToneTransportInstance {
  position: string;
  ticks: number;
  bpm: { value: number };
  start(): void;
  stop(): void;
  cancel(): void;
  scheduleOnce(
    cb: (time: number) => void,
    time: number | string | ToneTicksValue
  ): number;
}

interface ToneTimeValue {
  toSeconds(): number;
}

interface ToneTicksValue {
  toTicks(): number;
  toSeconds(): number;
}

interface ToneInstrument {
  context: ToneAudioContext;
  volume: { value: number };
  name: string;
  loaded?: boolean;
  onload?: (() => void) | null;
  chain(...nodes: ToneNode[]): ToneInstrument;
  toDestination(): ToneInstrument;
  triggerAttackRelease(
    note: string | string[],
    duration: string | number,
    time?: string | number
  ): void;
  start(time?: string | number): void;
  stop(time?: string | number): void;
  get(): Record<string, unknown>;
  sync(): ToneInstrument;
  [key: string]: unknown;
}

interface ToneNode {
  context?: ToneAudioContext;
  start?(): ToneNode;
  toDestination(): ToneNode;
}

interface ToneSequence {
  state: string;
  start(time?: number | string | ToneTicksValue): void;
  stop(time?: number | string | ToneTicksValue): void;
  clear(): void;
  /** Custom properties set by Channel.addClip */
  align?: string;
  alignOffset?: string;
  [key: string]: unknown;
}

/**
 * Duck type for Channel.checkToneObjLoaded — matches any Tone object that
 * exposes loaded / onload and may contain inner buffers.
 */
interface ToneLoadable {
  loaded?: boolean;
  onload?: (() => void) | null;
  buffer?: ToneLoadable;
  _buffer?: ToneLoadable;
  _buffers?: ToneLoadable;
  [key: string]: unknown;
}

/** External sound producer passed via ChannelParams.external */
interface ExternalOutput {
  init?(rawContext: unknown): Promise<void>;
  triggerAttackRelease?(note: string, duration: number, time: string): void;
  setVolume?(volume: number): void;
}

// ---------------------------------------------------------------------------
// Tone namespace — classes support instanceof narrowing
// ---------------------------------------------------------------------------

declare namespace Tone {
  class Player {
    constructor(params?: Record<string, unknown>);
    context: ToneAudioContext;
    volume: { value: number };
    name: string;
    loaded: boolean;
    onload: (() => void) | null;
    buffer: ToneLoadable;
    _buffer: ToneLoadable;
    loop: boolean;
    chain(...nodes: ToneNode[]): ToneInstrument;
    toDestination(): ToneInstrument;
    triggerAttackRelease(
      note: string | string[],
      duration: string | number,
      time?: string | number
    ): void;
    start(time?: string | number): void;
    stop(time?: string | number): void;
    get(): Record<string, unknown>;
    sync(): ToneInstrument;
    [key: string]: unknown;
  }

  class PolySynth {
    constructor(voice?: unknown, params?: Record<string, unknown>);
    context: ToneAudioContext;
    volume: { value: number };
    name: string;
    loaded: boolean;
    onload: (() => void) | null;
    _dummyVoice: { name: string };
    chain(...nodes: ToneNode[]): ToneInstrument;
    toDestination(): ToneInstrument;
    triggerAttackRelease(
      note: string | string[],
      duration: string | number,
      time?: string | number
    ): void;
    start(time?: string | number): void;
    stop(time?: string | number): void;
    get(): Record<string, unknown>;
    sync(): ToneInstrument;
    [key: string]: unknown;
  }

  class Sampler {
    constructor(params?: Record<string, unknown>);
    context: ToneAudioContext;
    volume: { value: number };
    name: string;
    loaded: boolean;
    onload: (() => void) | null;
    _buffers: {
      baseUrl: string;
      _buffers: Map<string, ToneLoadable>;
    };
    chain(...nodes: ToneNode[]): ToneInstrument;
    toDestination(): ToneInstrument;
    triggerAttackRelease(
      note: string | string[],
      duration: string | number,
      time?: string | number
    ): void;
    start(time?: string | number): void;
    stop(time?: string | number): void;
    get(): Record<string, unknown>;
    sync(): ToneInstrument;
    [key: string]: unknown;
  }

  class NoiseSynth {
    constructor(params?: Record<string, unknown>);
    context: ToneAudioContext;
    volume: { value: number };
    name: string;
    loaded: boolean;
    onload: (() => void) | null;
    chain(...nodes: ToneNode[]): ToneInstrument;
    toDestination(): ToneInstrument;
    triggerAttackRelease(
      duration: string | number,
      time?: string | number
    ): void;
    start(time?: string | number): void;
    stop(time?: string | number): void;
    get(): Record<string, unknown>;
    sync(): ToneInstrument;
    [key: string]: unknown;
  }

  class ToneAudioBuffer {
    loaded: boolean;
    onload: (() => void) | null;
    [key: string]: unknown;
  }

  class ToneBufferSource {
    loaded: boolean;
    onload: (() => void) | null;
    [key: string]: unknown;
  }

  class Sequence {
    constructor(params?: Record<string, unknown>);
    state: string;
    start(time?: number | string): void;
    stop(time?: number | string): void;
    clear(): void;
    [key: string]: unknown;
  }

  // Static functions
  function start(): void;
  function getContext(): ToneAudioContext;
  function setContext(ctx: ToneAudioContext): void;
  function loaded(): Promise<void>;
  function Time(value: string | number): ToneTimeValue;
  function Ticks(value: string | number): ToneTicksValue;
  function Offline(
    cb: (ctx: ToneAudioContext) => Promise<void>,
    duration: number
  ): Promise<ToneLoadable>;

  // Transport singleton
  const Transport: ToneTransportInstance;
}

/**
 * For dynamic access: new (Tone as unknown as ToneDynamic)[synthName]({...})
 * Used at 4 call sites in channel.ts where instruments are created by name.
 */
interface ToneDynamic {
  [key: string]: new (params?: Record<string, unknown>) => ToneInstrument;
}
