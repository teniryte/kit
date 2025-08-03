import pluralize from '../runtime/pluralize';

describe('pluralize', () => {
  it('pluralize', () => {
    expect(pluralize(1, 'день', 'дня', 'дней')).toBe('день');
    expect(pluralize(2, 'день', 'дня', 'дней')).toBe('дня');
    expect(pluralize(5, 'день', 'дня', 'дней')).toBe('дней');
    expect(pluralize(11, 'день', 'дня', 'дней')).toBe('дней');
    expect(pluralize(12, 'день', 'дня', 'дней')).toBe('дней');
    expect(pluralize(13, 'день', 'дня', 'дней')).toBe('дней');
    expect(pluralize(14, 'день', 'дня', 'дней')).toBe('дней');
  });
});
