import { tempFormatter } from './formatters';

describe('Validation temp data', () => {
  test('check negative', () => {
    expect(tempFormatter(-30)).toBe('-30°C');
  });
  test('check positive', () => {
    expect(tempFormatter(30)).toBe('+30°C');
  });
});
