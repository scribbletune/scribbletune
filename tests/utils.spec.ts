import { shuffle, expandStr, sizzleMap, isNote } from '../src/utils';

describe('../src/utils', () => {
  // it('shuffles as expected', () => {
  //   const shuffledPattern = shuffle(['x', '_', '-', '-']);
  //   expect(shuffledPattern[0] === 'x' && shuffledPattern[1] === '_').toBe(
  //     false
  //   );
  // });

  it('expands as expected', () => {
    expect(expandStr('x')[0]).toBe('x');
    expect(expandStr('xx')[1]).toBe('x');
    expect(expandStr('x[-x]')[1][0]).toBe('-');
    expect(expandStr('x[-x[-x]]')[1][2][1]).toBe('x');
  });

  it('sizzles', () => {
    expect(sizzleMap()[0]).toBe(63);
    expect(sizzleMap()[1]).toBe(90);
  });

  it('is able to recognize a valid note', () => {
    expect(isNote('Fg')).toBe(false);
    expect(isNote('j')).toBe(false);
    expect(isNote('CM')).toBe(false);
    expect(isNote('C4th')).toBe(false);
    expect(isNote('F4')).toBe(true);
    expect(isNote('db3')).toBe(true);
  });
});
