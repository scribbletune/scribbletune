import { describe, expect, it, vi } from 'vitest';
import { runCli } from '../src/cli';
import type { NoteObject } from '../src/types';

const getFirstNote = (notes: NoteObject[]): string | null => {
  const first = notes.find(noteObj => noteObj.note)?.note;
  if (!first || !first.length) {
    return null;
  }
  return first[0] || null;
};

describe('../src/cli', () => {
  it('prints help and exits with code 0', () => {
    const out = vi.fn();
    const err = vi.fn();
    const writeMidi = vi.fn();

    const code = runCli(['--help'], { stdout: out, stderr: err, writeMidi });

    expect(code).toBe(0);
    expect(out).toHaveBeenCalled();
    expect(err).not.toHaveBeenCalled();
    expect(writeMidi).not.toHaveBeenCalled();
  });

  it('generates a riff clip from issue-like args', () => {
    const out = vi.fn();
    const err = vi.fn();
    const writeMidi = vi.fn();

    const code = runCli(
      [
        '--riff',
        'C3',
        'phrygian',
        'x-xRx_RR',
        '8n',
        '--style',
        'AABC',
        '--sizzle',
        'sin',
        '2',
        '--outfile',
        'riff.mid',
      ],
      { stdout: out, stderr: err, writeMidi }
    );

    expect(code).toBe(0);
    expect(err).not.toHaveBeenCalled();
    expect(writeMidi).toHaveBeenCalledOnce();
    expect(writeMidi.mock.calls[0][1]).toBe('riff.mid');
    expect(writeMidi.mock.calls[0][0].length).toBeGreaterThan(0);
  });

  it('applies --subdiv for riff command', () => {
    const out = vi.fn();
    const err = vi.fn();
    const writeMidi = vi.fn();

    const code = runCli(
      ['--riff', 'C3', 'phrygian', 'x', '8n', '--style', 'AABC'],
      { stdout: out, stderr: err, writeMidi }
    );

    expect(code).toBe(0);
    const notes = writeMidi.mock.calls[0][0] as NoteObject[];
    expect(notes[0].length).toBe(64);
  });

  it('generates chord clip from digit progression', () => {
    const writeMidi = vi.fn();
    const out = vi.fn();
    const err = vi.fn();

    const code = runCli(
      ['--chord', 'C3', 'major', 'xxxx', '1m', '1645', '--sizzle', 'cos', '1'],
      { stdout: out, stderr: err, writeMidi }
    );

    expect(code).toBe(0);
    expect(writeMidi).toHaveBeenCalledOnce();
    const notes = writeMidi.mock.calls[0][0] as NoteObject[];
    expect(getFirstNote(notes)).toBe('C3');
  });

  it('generates chord clip from explicit chord list', () => {
    const writeMidi = vi.fn();
    const out = vi.fn();
    const err = vi.fn();

    const code = runCli(
      ['--chord', 'C3', 'major', 'xxxx', '1m', 'CM-FM-Am-GM'],
      { stdout: out, stderr: err, writeMidi }
    );

    expect(code).toBe(0);
    expect(writeMidi).toHaveBeenCalledOnce();
    const notes = writeMidi.mock.calls[0][0] as NoteObject[];
    expect(getFirstNote(notes)).toBe('C4');
  });

  it('generates arp clip from digit progression', () => {
    const writeMidi = vi.fn();
    const out = vi.fn();
    const err = vi.fn();

    const code = runCli(
      ['--arp', 'C3', 'major', 'xxxx', '1m', '1736', '--sizzle', 'cos', '4'],
      { stdout: out, stderr: err, writeMidi }
    );

    expect(code).toBe(0);
    expect(writeMidi).toHaveBeenCalledOnce();
    const notes = writeMidi.mock.calls[0][0] as NoteObject[];
    expect(notes.length).toBeGreaterThan(0);
  });

  it('applies positional subdiv for arp command', () => {
    const writeMidi = vi.fn();
    const out = vi.fn();
    const err = vi.fn();

    const code = runCli(['--arp', 'C3', 'major', 'x', '8n', 'I,IV,v,vi'], {
      stdout: out,
      stderr: err,
      writeMidi,
    });

    expect(code).toBe(0);
    expect(writeMidi).toHaveBeenCalledOnce();
    const notes = writeMidi.mock.calls[0][0] as NoteObject[];
    expect(notes[0].length).toBe(64);
  });

  it('returns non-zero with unknown option', () => {
    const writeMidi = vi.fn();
    const out = vi.fn();
    const err = vi.fn();

    const code = runCli(['--riff', 'C3', 'major', 'xxxx', '--bad-flag'], {
      stdout: out,
      stderr: err,
      writeMidi,
    });

    expect(code).toBe(1);
    expect(writeMidi).not.toHaveBeenCalled();
    expect(err).toHaveBeenCalled();
  });

  it('supports one-based arp order from cli', () => {
    const writeMidi = vi.fn();
    const out = vi.fn();
    const err = vi.fn();

    const code = runCli(
      ['--arp', 'C3', 'major', 'xxxx', '4n', '1', '--order', '2143'],
      { stdout: out, stderr: err, writeMidi }
    );

    expect(code).toBe(0);
    const notes = writeMidi.mock.calls[0][0] as NoteObject[];
    expect(notes[0].note?.[0]).toBe('E3');
    expect(notes[1].note?.[0]).toBe('C3');
    expect(notes[2].note?.[0]).toBe('C4');
    expect(notes[3].note?.[0]).toBe('G3');
  });

  it('keeps zero-based arp order backward compatible', () => {
    const writeMidi = vi.fn();
    const out = vi.fn();
    const err = vi.fn();

    const code = runCli(
      ['--arp', 'C3', 'major', 'xxxx', '4n', '1', '--order', '1032'],
      { stdout: out, stderr: err, writeMidi }
    );

    expect(code).toBe(0);
    const notes = writeMidi.mock.calls[0][0] as NoteObject[];
    expect(notes[0].note?.[0]).toBe('E3');
    expect(notes[1].note?.[0]).toBe('C3');
    expect(notes[2].note?.[0]).toBe('C4');
    expect(notes[3].note?.[0]).toBe('G3');
  });

  it('supports repeat syntax for pattern strings', () => {
    const writeMidi = vi.fn();
    const out = vi.fn();
    const err = vi.fn();

    const code = runCli(['--arp', 'C3', 'major', 'x.repeat(4)', '4n', '1'], {
      stdout: out,
      stderr: err,
      writeMidi,
    });

    expect(code).toBe(0);
    const notes = writeMidi.mock.calls[0][0] as NoteObject[];
    expect(notes.length).toBe(4);
  });

  it('applies style as section sequence for riff', () => {
    const writeMidi = vi.fn();
    const out = vi.fn();
    const err = vi.fn();

    const code = runCli(
      ['--riff', 'C3', 'major', 'x', '4n', '--style', 'AABC'],
      {
        stdout: out,
        stderr: err,
        writeMidi,
      }
    );

    expect(code).toBe(0);
    const notes = writeMidi.mock.calls[0][0] as NoteObject[];
    expect(notes.length).toBe(4);
    expect(notes[0].note?.[0]).toBe('C3');
    expect(notes[1].note?.[0]).toBe('C3');
    expect(notes[2].note?.[0]).toBe('D3');
    expect(notes[3].note?.[0]).toBe('E3');
  });

  it('repeats each style section by pattern step count', () => {
    const writeMidi = vi.fn();
    const out = vi.fn();
    const err = vi.fn();

    const code = runCli(
      ['--riff', 'C3', 'major', 'x-x[xx]', '4n', '--style', 'AABC'],
      { stdout: out, stderr: err, writeMidi }
    );

    expect(code).toBe(0);
    const notes = writeMidi.mock.calls[0][0] as NoteObject[];
    expect(notes.length).toBe(20);
    const played = notes.filter(n => n.note).map(n => n.note?.[0]);
    expect(played.length).toBe(16);
    expect(played.slice(0, 4)).toEqual(['C3', 'C3', 'C3', 'C3']);
    expect(played.slice(4, 8)).toEqual(['C3', 'C3', 'C3', 'C3']);
    expect(played.slice(8, 12)).toEqual(['D3', 'D3', 'D3', 'D3']);
    expect(played.slice(12, 16)).toEqual(['E3', 'E3', 'E3', 'E3']);
  });

  it('reuses exact style section notes for repeated letters (including R)', () => {
    const writeMidi = vi.fn();
    const out = vi.fn();
    const err = vi.fn();
    const randomSpy = vi.spyOn(Math, 'random');

    // Two A sections would diverge without caching due to different random values.
    const seq = [
      0.9,
      0.0,
      0.9,
      0.15, // A section (R picks low notes)
      0.9,
      0.95,
      0.9,
      0.8, // would be different for 2nd A if recomputed
      0.9,
      0.3,
      0.9,
      0.45, // B
      0.9,
      0.6,
      0.9,
      0.75, // C
    ];
    randomSpy.mockImplementation(() => seq.shift() ?? 0.9);

    const code = runCli(
      ['--riff', 'C3', 'major', 'xRxR', '4n', '--style', 'AABC'],
      { stdout: out, stderr: err, writeMidi }
    );

    randomSpy.mockRestore();

    expect(code).toBe(0);
    const notes = writeMidi.mock.calls[0][0] as NoteObject[];
    const played = notes.filter(n => n.note).map(n => n.note?.[0] as string);
    const firstA = played.slice(0, 4);
    const secondA = played.slice(4, 8);
    expect(firstA).toEqual(secondA);
  });

  it('fits pattern to generated note count by default', () => {
    const writeMidi = vi.fn();
    const out = vi.fn();
    const err = vi.fn();

    const code = runCli(['--arp', 'C3', 'major', 'x', '4n', '1736'], {
      stdout: out,
      stderr: err,
      writeMidi,
    });

    expect(code).toBe(0);
    const notes = writeMidi.mock.calls[0][0] as NoteObject[];
    expect(notes.length).toBe(16);
  });

  it('can disable auto fit with --no-fit-pattern', () => {
    const writeMidi = vi.fn();
    const out = vi.fn();
    const err = vi.fn();

    const code = runCli(
      ['--arp', 'C3', 'major', 'x', '4n', '1736', '--no-fit-pattern'],
      { stdout: out, stderr: err, writeMidi }
    );

    expect(code).toBe(0);
    const notes = writeMidi.mock.calls[0][0] as NoteObject[];
    expect(notes.length).toBe(1);
  });

  // ── Missing command paths ────────────────────────────────────────────────

  it('generates a basic riff without --style', () => {
    const writeMidi = vi.fn();
    const out = vi.fn();
    const err = vi.fn();

    const code = runCli(['--riff', 'C3', 'major', 'x', '4n'], {
      stdout: out,
      stderr: err,
      writeMidi,
    });

    expect(code).toBe(0);
    const notes = writeMidi.mock.calls[0][0] as NoteObject[];
    // C major scale has 7 notes; fitPattern repeats 'x' 7 times
    expect(notes.length).toBe(7);
    expect(notes[0].note?.[0]).toBe('C3');
  });

  it('generates chord clip from roman numeral space-separated progression', () => {
    const writeMidi = vi.fn();
    const out = vi.fn();
    const err = vi.fn();

    const code = runCli(['--chord', 'C3', 'major', 'xxxx', '1m', 'I IV vi V'], {
      stdout: out,
      stderr: err,
      writeMidi,
    });

    expect(code).toBe(0);
    const notes = writeMidi.mock.calls[0][0] as NoteObject[];
    expect(notes.length).toBe(4);
    expect(getFirstNote(notes)).toBe('C3');
  });

  it('generates chord clip from roman numeral comma-separated progression', () => {
    const writeMidi = vi.fn();
    const out = vi.fn();
    const err = vi.fn();

    const code = runCli(['--chord', 'C3', 'major', 'xxxx', '1m', 'I,IV,vi,V'], {
      stdout: out,
      stderr: err,
      writeMidi,
    });

    expect(code).toBe(0);
    const notes = writeMidi.mock.calls[0][0] as NoteObject[];
    expect(notes.length).toBe(4);
    expect(getFirstNote(notes)).toBe('C3');
  });

  it('generates chord clip from random progression', () => {
    const writeMidi = vi.fn();
    const out = vi.fn();
    const err = vi.fn();

    const code = runCli(['--chord', 'C3', 'major', 'xxxx', '1m', 'random'], {
      stdout: out,
      stderr: err,
      writeMidi,
    });

    expect(code).toBe(0);
    const notes = writeMidi.mock.calls[0][0] as NoteObject[];
    expect(notes.length).toBeGreaterThan(0);
  });

  it('generates arp clip from single degree', () => {
    const writeMidi = vi.fn();
    const out = vi.fn();
    const err = vi.fn();

    const code = runCli(['--arp', 'C3', 'major', 'xxxx', '4n', '1'], {
      stdout: out,
      stderr: err,
      writeMidi,
    });

    expect(code).toBe(0);
    const notes = writeMidi.mock.calls[0][0] as NoteObject[];
    expect(notes.length).toBe(4);
    expect(notes[0].note?.[0]).toBe('C3');
  });

  it('generates arp clip from explicit chord names', () => {
    const writeMidi = vi.fn();
    const out = vi.fn();
    const err = vi.fn();

    const code = runCli(['--arp', 'C3', 'major', 'xxxx', '1m', 'CM-FM-Am-GM'], {
      stdout: out,
      stderr: err,
      writeMidi,
    });

    expect(code).toBe(0);
    const notes = writeMidi.mock.calls[0][0] as NoteObject[];
    expect(notes.length).toBeGreaterThan(0);
    expect(notes[0].note?.[0]).toBe('C4');
  });

  it('generates arp clip with --count option', () => {
    const writeMidi = vi.fn();
    const out = vi.fn();
    const err = vi.fn();

    const code = runCli(
      ['--arp', 'C3', 'major', 'xxxx', '4n', '1', '--count', '4'],
      { stdout: out, stderr: err, writeMidi }
    );

    expect(code).toBe(0);
    const notes = writeMidi.mock.calls[0][0] as NoteObject[];
    expect(notes.length).toBe(4);
    expect(notes[0].note?.[0]).toBe('C3');
  });

  // ── Untested options ─────────────────────────────────────────────────────

  it('passes --bpm to writeMidi as third argument', () => {
    const writeMidi = vi.fn();
    const out = vi.fn();
    const err = vi.fn();

    const code = runCli(
      ['--riff', 'C3', 'major', 'xxxx', '4n', '--bpm', '120'],
      { stdout: out, stderr: err, writeMidi }
    );

    expect(code).toBe(0);
    expect(writeMidi.mock.calls[0][2]).toBe(120);
  });

  it('caps note levels with --amp', () => {
    const writeMidi = vi.fn();
    const out = vi.fn();
    const err = vi.fn();

    const code = runCli(
      ['--riff', 'C3', 'major', 'xxxx', '4n', '--amp', '60'],
      { stdout: out, stderr: err, writeMidi }
    );

    expect(code).toBe(0);
    const notes = writeMidi.mock.calls[0][0] as NoteObject[];
    for (const note of notes) {
      expect(note.level).toBe(60);
    }
  });

  it('applies --accent pattern to note levels', () => {
    const writeMidi = vi.fn();
    const out = vi.fn();
    const err = vi.fn();

    const code = runCli(
      ['--riff', 'C3', 'major', 'xxxx', '4n', '--accent', 'x---'],
      { stdout: out, stderr: err, writeMidi }
    );

    expect(code).toBe(0);
    const notes = writeMidi.mock.calls[0][0] as NoteObject[];
    // Accented note gets full amp (100), non-accented gets accentLow (70)
    expect(notes[0].level).toBe(100);
    expect(notes[1].level).toBe(70);
  });

  it('applies --accent-low to set minimum accent level', () => {
    const writeMidi = vi.fn();
    const out = vi.fn();
    const err = vi.fn();

    const code = runCli(
      [
        '--riff',
        'C3',
        'major',
        'xxxx',
        '4n',
        '--accent',
        'x---',
        '--accent-low',
        '40',
      ],
      { stdout: out, stderr: err, writeMidi }
    );

    expect(code).toBe(0);
    const notes = writeMidi.mock.calls[0][0] as NoteObject[];
    expect(notes[0].level).toBe(100);
    expect(notes[1].level).toBe(40);
  });

  it('applies --sizzle with no style (boolean true)', () => {
    const writeMidi = vi.fn();
    const out = vi.fn();
    const err = vi.fn();

    const code = runCli(['--riff', 'C3', 'major', 'xxxx', '4n', '--sizzle'], {
      stdout: out,
      stderr: err,
      writeMidi,
    });

    expect(code).toBe(0);
    expect(writeMidi).toHaveBeenCalledOnce();
  });

  it('applies --sizzle with style but no reps', () => {
    const writeMidi = vi.fn();
    const out = vi.fn();
    const err = vi.fn();

    const code = runCli(
      ['--riff', 'C3', 'major', 'xxxx', '4n', '--sizzle', 'sin'],
      { stdout: out, stderr: err, writeMidi }
    );

    expect(code).toBe(0);
    expect(writeMidi).toHaveBeenCalledOnce();
  });

  it('applies --sizzle with numeric reps and no style', () => {
    const writeMidi = vi.fn();
    const out = vi.fn();
    const err = vi.fn();

    const code = runCli(
      ['--riff', 'C3', 'major', 'xxxx', '4n', '--sizzle', '2'],
      { stdout: out, stderr: err, writeMidi }
    );

    expect(code).toBe(0);
    expect(writeMidi).toHaveBeenCalledOnce();
  });

  it('applies --sizzle-reps as a standalone flag', () => {
    const writeMidi = vi.fn();
    const out = vi.fn();
    const err = vi.fn();

    const code = runCli(
      [
        '--riff',
        'C3',
        'major',
        'xxxx',
        '4n',
        '--sizzle',
        'cos',
        '--sizzle-reps',
        '3',
      ],
      { stdout: out, stderr: err, writeMidi }
    );

    expect(code).toBe(0);
    expect(writeMidi).toHaveBeenCalledOnce();
  });

  // ── Pattern helpers ──────────────────────────────────────────────────────

  it('expands prefix repeat pattern syntax 2(x-x)', () => {
    const writeMidi = vi.fn();
    const out = vi.fn();
    const err = vi.fn();

    const code = runCli(
      ['--riff', 'C3', 'major', '2(x-x)', '4n', '--no-fit-pattern'],
      { stdout: out, stderr: err, writeMidi }
    );

    expect(code).toBe(0);
    const notes = writeMidi.mock.calls[0][0] as NoteObject[];
    // '2(x-x)' → 'x-xx-x': 6 total events, 4 note-ons
    expect(notes.length).toBe(6);
    expect(notes.filter(n => n.note).length).toBe(4);
  });

  it('expands suffix repeat pattern syntax (x-x)2', () => {
    const writeMidi = vi.fn();
    const out = vi.fn();
    const err = vi.fn();

    const code = runCli(
      ['--riff', 'C3', 'major', '(x-x)2', '4n', '--no-fit-pattern'],
      { stdout: out, stderr: err, writeMidi }
    );

    expect(code).toBe(0);
    const notes = writeMidi.mock.calls[0][0] as NoteObject[];
    // '(x-x)2' → 'x-xx-x': 6 total events, 4 note-ons
    expect(notes.length).toBe(6);
    expect(notes.filter(n => n.note).length).toBe(4);
  });

  it("expands quoted .repeat() pattern syntax 'x-x'.repeat(3)", () => {
    const writeMidi = vi.fn();
    const out = vi.fn();
    const err = vi.fn();

    const code = runCli(
      ['--riff', 'C3', 'major', "'x-x'.repeat(3)", '4n', '--no-fit-pattern'],
      { stdout: out, stderr: err, writeMidi }
    );

    expect(code).toBe(0);
    const notes = writeMidi.mock.calls[0][0] as NoteObject[];
    // 'x-x'.repeat(3) → 'x-xx-xx-x': 9 total events, 6 note-ons
    expect(notes.length).toBe(9);
    expect(notes.filter(n => n.note).length).toBe(6);
  });

  // ── Error paths ──────────────────────────────────────────────────────────

  it('shows help and exits 0 for empty args', () => {
    const writeMidi = vi.fn();
    const out = vi.fn();
    const err = vi.fn();

    const code = runCli([], { stdout: out, stderr: err, writeMidi });

    expect(code).toBe(0);
    expect(out).toHaveBeenCalled();
    expect(writeMidi).not.toHaveBeenCalled();
  });

  it('returns error when first arg is not a valid command', () => {
    const writeMidi = vi.fn();
    const out = vi.fn();
    const err = vi.fn();

    const code = runCli(['--badcommand', 'C3', 'major', 'xxxx', '4n'], {
      stdout: out,
      stderr: err,
      writeMidi,
    });

    expect(code).toBe(1);
    expect(err).toHaveBeenCalled();
    expect(writeMidi).not.toHaveBeenCalled();
  });

  it('returns error for missing riff required args', () => {
    const writeMidi = vi.fn();
    const out = vi.fn();
    const err = vi.fn();

    const code = runCli(['--riff', 'C3'], {
      stdout: out,
      stderr: err,
      writeMidi,
    });

    expect(code).toBe(1);
    expect(err).toHaveBeenCalled();
    expect(writeMidi).not.toHaveBeenCalled();
  });

  it('returns error for missing chord required args', () => {
    const writeMidi = vi.fn();
    const out = vi.fn();
    const err = vi.fn();

    const code = runCli(['--chord', 'C3', 'major'], {
      stdout: out,
      stderr: err,
      writeMidi,
    });

    expect(code).toBe(1);
    expect(err).toHaveBeenCalled();
    expect(writeMidi).not.toHaveBeenCalled();
  });

  it('returns error for missing arp required args', () => {
    const writeMidi = vi.fn();
    const out = vi.fn();
    const err = vi.fn();

    const code = runCli(['--arp', 'C3', 'major'], {
      stdout: out,
      stderr: err,
      writeMidi,
    });

    expect(code).toBe(1);
    expect(err).toHaveBeenCalled();
    expect(writeMidi).not.toHaveBeenCalled();
  });

  it('returns error for invalid --order value', () => {
    const writeMidi = vi.fn();
    const out = vi.fn();
    const err = vi.fn();

    const code = runCli(
      ['--arp', 'C3', 'major', 'xxxx', '4n', '1', '--order', 'abc'],
      { stdout: out, stderr: err, writeMidi }
    );

    expect(code).toBe(1);
    expect(err).toHaveBeenCalled();
    expect(writeMidi).not.toHaveBeenCalled();
  });
});
