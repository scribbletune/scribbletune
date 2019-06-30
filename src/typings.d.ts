interface NoteObject {
  note: string[] | string | null;
  length: number;
  level: number;
}

interface NVP<T> {
  [key: string]: T;
}

type SizzleStyle = 'sin' | 'cos' | 'rampUp' | 'rampDown';

interface ClipParams {
  notes: string | (string | string[])[];
  pattern: string;
  shuffle?: boolean;
  arpegiate?: boolean;
  subdiv?: string;
  amp?: number;
  sizzle?: boolean | SizzleStyle;
  accent?: string;
  accentLow?: number;
  sizzleReps?: number;
  synth?: any;
  instrument?: any;
  sample?: any;
  samples?: any;
  sampler?: any;
  player?: any;
  dur?: string;
  effects?: string[];
  volume?: number;
}

interface ChannelParams extends ClipParams {
  idx?: number;
  clips?: any;
}

type SeqFn = (time: string, el: string) => void;

declare var Tone: any;
declare var require: NodeRequire;
declare module 'jsmidgen';
