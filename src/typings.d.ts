interface NoteObject {
  note: string[] | string | null;
  length: number;
  level: number;
}

interface NVP<T> {
  [key: string]: T;
}

interface ClipParams {
  notes: string | (string | string[])[];
  pattern: string;
  shuffle?: boolean;
  arpegiate?: boolean;
  subdiv?: string;
  amp: number;
  sizzle: boolean | 'sin' | 'cos' | 'rampUp' | 'rampDown';
  sizzleReps: number;
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

interface ChannelParams {
  idx?: number;
  player?: any;
  instrument?: any;
  sample?: any;
  synth?: any;
  sampler?: any;
  samples?: any;
  subdiv?: string;
  effects?: string[];
  pan?: number;
  volume?: number;
  clips?: any;
}

type SeqFn = (time: string, el: string) => void;

declare var Tone: any;
declare var require: NodeRequire;
declare module 'jsmidgen';
