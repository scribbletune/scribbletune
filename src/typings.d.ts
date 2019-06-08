type NoteObject = {
  note: string[] | string | null;
  length: number;
  level: number;
};

type NVP<T> = {
  [key: string]: T;
};

type Params = {
  idx?: number;
  player?: any;
  instrument?: any;
  sample?: any;
  synth?: any;
  sampler?: any;
  samples?: any;
  pattern: string;
  notes: string[];
  dur?: string;
  subdiv?: string;
  effects?: string[];
  pan?: number;
  volume?: number;
  clips?: any;
};

declare var Tone: any;
declare var require: NodeRequire;
declare module 'jsmidgen';
