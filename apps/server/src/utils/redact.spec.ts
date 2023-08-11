import { redactString } from './redact';

describe('redact', () => {
  it('should replace all characters in a string with "*"', () => {
    const value = '1@#$% ^78(0\r\n\t';
    const result = redactString(value);

    expect(result).toMatch('*************');
  });
});
