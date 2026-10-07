import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility', () => {
  it('combines class names correctly', () => {
    const result = cn('text-red-500', 'font-bold', { hidden: false });
    expect(result).toBe('text-red-500 font-bold');
  });
});
