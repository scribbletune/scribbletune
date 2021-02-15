// global.window = true;
import {
  recursivelyApplyPatternToDurations,
  totalPatternDuration,
} from '../src/browser-clip';
import { expandStr } from '../src/utils';

describe('../src/browser-clip', () => {
  it('applies same duration to simple pattern', () => {
    expect(
      recursivelyApplyPatternToDurations(expandStr('xxxx'), 1)
    ).toStrictEqual([1, 1, 1, 1]);
  });

  it('split durations in subpattern', () => {
    expect(
      recursivelyApplyPatternToDurations(expandStr('x[xx]x'), 1)
    ).toStrictEqual([1, 0.5, 0.5, 1]);
  });

  it('split duration in subpattern to subpattern', () => {
    expect(
      recursivelyApplyPatternToDurations(expandStr('x[xxxx]x'), 1)
    ).toStrictEqual([1, 0.25, 0.25, 0.25, 0.25, 1]);
  });

  it('split duration in subpattern to subpattern', () => {
    expect(
      recursivelyApplyPatternToDurations(expandStr('x[x[xx]]x'), 1)
    ).toStrictEqual([1, 0.5, 0.25, 0.25, 1]);
  });

  it('is able to extend notes', () => {
    expect(
      recursivelyApplyPatternToDurations(expandStr('xx__x'), 1)
    ).toStrictEqual([1, 3, 1]);
  });

  it('is able to extend notes in subpattern', () => {
    expect(
      recursivelyApplyPatternToDurations(expandStr('x[x__-]x'), 1)
    ).toStrictEqual([1, 0.75, 1]);
  });

  it('applies same duration to simple pattern', () => {
    expect(totalPatternDuration('xxxx__--', 1)).toStrictEqual(8);
  });

  it('split durations in subpattern', () => {
    expect(totalPatternDuration('x[xx]x', 1)).toStrictEqual(3);
  });

  it('split duration in subpattern to subpattern', () => {
    expect(totalPatternDuration('x[x[xx]]x', 1)).toStrictEqual(3);
  });

  it('is able to extend notes in subpattern', () => {
    expect(totalPatternDuration('x[R[-x]-]-x_', 1)).toStrictEqual(5);
  });
});
