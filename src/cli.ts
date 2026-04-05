import { scale } from 'harmonics';
import { arp } from './arp';
import { clip } from './clip';
import { midi } from './midi';
import {
  getChordDegrees,
  getChordsByProgression,
  progression,
} from './progression';
import type { ClipParams, NoteObject, SizzleStyle } from './types';

type CommandType = 'riff' | 'chord' | 'arp';

type CliDeps = {
  writeMidi?: (notes: NoteObject[], fileName: string, bpm?: number) => void;
  stdout?: (msg: string) => void;
  stderr?: (msg: string) => void;
};

type ParsedOptions = {
  command: CommandType;
  positionals: string[];
  outfile: string;
  bpm?: number;
  amp?: number;
  accent?: string;
  accentLow?: number;
  sizzle?: boolean | SizzleStyle;
  sizzleReps?: number;
  subdiv?: string;
  count?: number;
  order?: string;
  style?: string;
  fitPattern?: boolean;
};

const HELP_TEXT = `Usage:
  scribbletune --riff <root> <mode> <pattern> <subdiv>
  scribbletune --chord <root> <mode> <pattern> <subdiv> <progression|random>
  scribbletune --arp <root> <mode> <pattern> <subdiv> <progression|random>

Examples:
  scribbletune --riff C3 phrygian x-xRx_RR 8n --style AABC --sizzle sin 2 --outfile riff.mid
  scribbletune --chord C3 major xxxx 1m 1645 --sizzle cos 1 --outfile chord.mid
  scribbletune --chord C3 major xxxx 1m CM-FM-Am-GM
  scribbletune --chord C3 major xxxx 1m random
  scribbletune --arp C3 major xxxx 1m 1736 --sizzle cos 4

Options:
  --outfile <name>      Output MIDI filename (default: music.mid)
  --bpm <number>        Tempo in BPM
  --subdiv <value>      Note subdivision (e.g. 4n, 1m)
  --sizzle [style] [n]  Sizzle style: sin|cos|rampUp|rampDown and optional reps
  --sizzle-reps <n>     Repetitions for sizzle
  --amp <0-127>         Maximum note level
  --accent <pattern>    Accent pattern using x and -
  --accent-low <0-127>  Accent low level
  --count <2-8>         Arp note count (arp command only)
  --order <digits>      Arp order string (arp command only)
  --style <letters>     Riff motif/style pattern (e.g. AABC)
  --fit-pattern         Repeat pattern until it can consume all generated notes (default)
  --no-fit-pattern      Disable automatic pattern fitting
  -h, --help            Show this help
`;

const romanByDigit = (
  progDigits: string,
  mode: string
): { chordDegrees: string; raw: string } => {
  const modeForDegrees = mode.toLowerCase();
  const chordDegrees = getChordDegrees(modeForDegrees);
  if (!chordDegrees.length) {
    throw new TypeError(`Unsupported mode "${mode}" for progression digits`);
  }

  const romans = progDigits.split('').map(digit => {
    const idx = Number(digit) - 1;
    if (idx < 0 || idx >= chordDegrees.length) {
      throw new TypeError(
        `Invalid progression digit "${digit}" in "${progDigits}"`
      );
    }
    return chordDegrees[idx];
  });

  return { chordDegrees: romans.join(' '), raw: progDigits };
};

const parseProgression = (
  root: string,
  mode: string,
  progressionInput: string
): string => {
  if (progressionInput === 'random') {
    const modeType = mode === 'minor' || mode === 'm' ? 'minor' : 'major';
    const randomProg = progression(modeType, 4).join(' ');
    return getChordsByProgression(`${root} ${mode}`, randomProg);
  }

  if (/^[1-7]+$/.test(progressionInput)) {
    const converted = romanByDigit(progressionInput, mode);
    return getChordsByProgression(`${root} ${mode}`, converted.chordDegrees);
  }

  if (/^[ivIV°+7\s,]+$/.test(progressionInput)) {
    const normalized = progressionInput.replace(/\s*,+\s*/g, ' ');
    return getChordsByProgression(`${root} ${mode}`, normalized);
  }

  return progressionInput.replace(/-/g, ' ');
};

const normalizeArpOrder = (order: string): string => {
  if (!/^\d+$/.test(order)) {
    throw new TypeError('Invalid value for --order');
  }

  // Backward-compatible: if user already uses zero-based (contains 0), keep as is.
  if (order.includes('0')) {
    return order;
  }

  // One-based shorthand (e.g. 1234, 2143) mapped to arp()'s zero-based indices.
  return order
    .split('')
    .map(ch => {
      const n = Number(ch);
      if (n < 1) {
        throw new TypeError('Invalid value for --order');
      }
      return String(n - 1);
    })
    .join('');
};

const expandPatternSyntax = (pattern: string): string => {
  const jsRepeatQuoted = pattern.match(/^(['"])(.+)\1\.repeat\((\d+)\)$/);
  if (jsRepeatQuoted) {
    return jsRepeatQuoted[2].repeat(Number(jsRepeatQuoted[3]));
  }

  const jsRepeatUnquoted = pattern.match(/^(.+)\.repeat\((\d+)\)$/);
  if (jsRepeatUnquoted) {
    return jsRepeatUnquoted[1].repeat(Number(jsRepeatUnquoted[2]));
  }

  const prefixRepeat = pattern.match(/^(\d+)\((.+)\)$/);
  if (prefixRepeat) {
    return prefixRepeat[2].repeat(Number(prefixRepeat[1]));
  }

  const suffixRepeat = pattern.match(/^\((.+)\)(\d+)$/);
  if (suffixRepeat) {
    return suffixRepeat[1].repeat(Number(suffixRepeat[2]));
  }

  return pattern;
};

const countPatternSteps = (pattern: string): number =>
  (pattern.match(/[xR]/g) || []).length;

const fitPatternToNoteCount = (pattern: string, noteCount: number): string => {
  const stepCount = countPatternSteps(pattern);
  if (!stepCount || stepCount >= noteCount) {
    return pattern;
  }
  const reps = Math.ceil(noteCount / stepCount);
  return pattern.repeat(reps);
};

const resolvePattern = (
  rawPattern: string,
  noteCount: number,
  fitPattern = false
): string => {
  const expanded = expandPatternSyntax(rawPattern);
  return fitPattern ? fitPatternToNoteCount(expanded, noteCount) : expanded;
};

const parseCliArgs = (argv: string[]): ParsedOptions | null => {
  if (argv.length === 0 || argv.includes('-h') || argv.includes('--help')) {
    return null;
  }

  let commandArg = argv[0];
  if (commandArg.startsWith('--')) {
    commandArg = commandArg.slice(2);
  }
  if (commandArg !== 'riff' && commandArg !== 'chord' && commandArg !== 'arp') {
    throw new TypeError(
      `First argument must be riff/chord/arp (or --riff/--chord/--arp), received "${argv[0]}"`
    );
  }

  const positionals: string[] = [];
  const options: ParsedOptions = {
    command: commandArg,
    positionals,
    outfile: 'music.mid',
    fitPattern: true,
  };

  let i = 1;
  while (i < argv.length) {
    const token = argv[i];
    if (!token.startsWith('--')) {
      positionals.push(token);
      i++;
      continue;
    }

    if (token === '--outfile') {
      options.outfile = argv[i + 1];
      i += 2;
      continue;
    }

    if (token === '--bpm') {
      options.bpm = Number(argv[i + 1]);
      i += 2;
      continue;
    }

    if (token === '--subdiv') {
      options.subdiv = argv[i + 1];
      i += 2;
      continue;
    }

    if (token === '--sizzle') {
      const styleOrNum = argv[i + 1];
      const maybeNum = argv[i + 2];
      if (!styleOrNum || styleOrNum.startsWith('--')) {
        options.sizzle = true;
        i += 1;
        continue;
      }
      if (/^\d+$/.test(styleOrNum)) {
        options.sizzle = true;
        options.sizzleReps = Number(styleOrNum);
        i += 2;
        continue;
      }
      options.sizzle = styleOrNum as SizzleStyle;
      if (maybeNum && /^\d+$/.test(maybeNum)) {
        options.sizzleReps = Number(maybeNum);
        i += 3;
      } else {
        i += 2;
      }
      continue;
    }

    if (token === '--sizzle-reps') {
      options.sizzleReps = Number(argv[i + 1]);
      i += 2;
      continue;
    }

    if (token === '--amp') {
      options.amp = Number(argv[i + 1]);
      i += 2;
      continue;
    }

    if (token === '--accent') {
      options.accent = argv[i + 1];
      i += 2;
      continue;
    }

    if (token === '--accent-low') {
      options.accentLow = Number(argv[i + 1]);
      i += 2;
      continue;
    }

    if (token === '--count') {
      options.count = Number(argv[i + 1]);
      i += 2;
      continue;
    }

    if (token === '--order') {
      options.order = argv[i + 1];
      i += 2;
      continue;
    }

    if (token === '--style') {
      options.style = argv[i + 1];
      i += 2;
      continue;
    }

    if (token === '--fit-pattern') {
      options.fitPattern = true;
      i += 1;
      continue;
    }

    if (token === '--no-fit-pattern') {
      options.fitPattern = false;
      i += 1;
      continue;
    }

    throw new TypeError(`Unknown option "${token}"`);
  }

  return options;
};

const baseClipParams = (parsed: ParsedOptions): Partial<ClipParams> => {
  const raw: Record<string, unknown> = {
    sizzle: parsed.sizzle,
    sizzleReps: parsed.sizzleReps,
    amp: parsed.amp,
    accent: parsed.accent,
    accentLow: parsed.accentLow,
  };
  return Object.fromEntries(
    Object.entries(raw).filter(([, v]) => v !== undefined)
  ) as Partial<ClipParams>;
};

const makeRiff = (parsed: ParsedOptions): NoteObject[] => {
  const [root, mode, pattern, subdiv] = parsed.positionals;
  const style = parsed.style;
  if (!root || !mode || !pattern || !subdiv) {
    throw new TypeError('riff requires: <root> <mode> <pattern> <subdiv>');
  }
  const riffScale = scale(`${root} ${mode}`);

  // Style defines sections: each style letter gets one full pattern block.
  // Example: style AABC + pattern x-x[xx] => 4 blocks in A,A,B,C order.
  if (style?.length) {
    const sectionPattern = expandPatternSyntax(pattern);
    const letters = style.toUpperCase().split('');
    const sectionCache: Record<string, NoteObject[]> = {};
    const combined: NoteObject[] = [];
    const clipParams = {
      ...baseClipParams(parsed),
      subdiv: parsed.subdiv || subdiv,
    };

    for (const letter of letters) {
      if (!sectionCache[letter]) {
        // Build each style section once, then reuse it exactly for repeated letters.
        const idx = letter.charCodeAt(0) - 65;
        const note = riffScale[idx >= 0 ? idx % riffScale.length : 0];
        sectionCache[letter] = clip({
          notes: [note],
          randomNotes: riffScale,
          pattern: sectionPattern,
          ...clipParams,
        });
      }

      // Clone section events so each block can be mutated independently downstream if needed.
      combined.push(
        ...sectionCache[letter].map(event => ({
          ...event,
          note: event.note ? [...event.note] : null,
        }))
      );
    }

    return combined;
  }

  const riffNotes = riffScale;
  const resolvedPattern = resolvePattern(
    pattern,
    riffNotes.length,
    parsed.fitPattern
  );

  return clip({
    notes: riffNotes,
    randomNotes: riffScale,
    pattern: resolvedPattern,
    ...baseClipParams(parsed),
    subdiv: parsed.subdiv || subdiv,
  });
};

const makeChord = (parsed: ParsedOptions): NoteObject[] => {
  const [root, mode, pattern, subdiv, progressionInput] = parsed.positionals;
  if (!root || !mode || !progressionInput || !pattern || !subdiv) {
    throw new TypeError(
      'chord requires: <root> <mode> <pattern> <subdiv> <progression|random>'
    );
  }
  const chords = parseProgression(root, mode, progressionInput);
  const chordCount = chords.trim().split(/\s+/).length;
  const resolvedPattern = resolvePattern(
    pattern,
    chordCount,
    parsed.fitPattern
  );
  return clip({
    notes: chords,
    pattern: resolvedPattern,
    ...baseClipParams(parsed),
    subdiv: parsed.subdiv || subdiv,
  });
};

const makeArp = (parsed: ParsedOptions): NoteObject[] => {
  const [root, mode, pattern, subdiv, progressionInput] = parsed.positionals;
  if (!root || !mode || !progressionInput || !pattern || !subdiv) {
    throw new TypeError(
      'arp requires: <root> <mode> <pattern> <subdiv> <progression|random>'
    );
  }
  const chords = parseProgression(root, mode, progressionInput);
  const arpNotes = arp({
    chords,
    count: parsed.count || 4,
    order: parsed.order ? normalizeArpOrder(parsed.order) : '0123',
  });
  const resolvedPattern = resolvePattern(
    pattern,
    arpNotes.length,
    parsed.fitPattern
  );

  return clip({
    notes: arpNotes,
    pattern: resolvedPattern,
    ...baseClipParams(parsed),
    subdiv: parsed.subdiv || subdiv,
  });
};

export const runCli = (argv: string[], deps?: CliDeps): number => {
  const stdout = deps?.stdout || console.log;
  const stderr = deps?.stderr || console.error;
  const writeMidi =
    deps?.writeMidi ||
    ((notes, fileName, bpm) => {
      midi(notes, fileName, bpm);
    });

  try {
    const parsed = parseCliArgs(argv);
    if (!parsed) {
      stdout(HELP_TEXT);
      return 0;
    }

    let notes: NoteObject[] = [];
    if (parsed.command === 'riff') {
      notes = makeRiff(parsed);
    } else if (parsed.command === 'chord') {
      notes = makeChord(parsed);
    } else {
      notes = makeArp(parsed);
    }

    writeMidi(notes, parsed.outfile, parsed.bpm);
    stdout(
      `Generated ${parsed.command} clip (${notes.length} events) -> ${parsed.outfile}`
    );
    return 0;
  } catch (e) {
    stderr(e instanceof Error ? e.message : String(e));
    stderr('Run with --help for usage');
    return 1;
  }
};

if (process.argv[1]?.includes('cli')) {
  process.exit(runCli(process.argv.slice(2)));
}
