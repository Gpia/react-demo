import { ip } from './is';

describe('tool', () => {
  it('it should validate ip address', () => {
    expect(ip('1100')).toBe(false);
  });
});
