import { describe, expect, it } from 'vitest';
import { getUrgencyConfig, URGENCY_CONFIG } from './urgency-config';

describe('urgency-config', () => {
  it('defines all three urgency levels', () => {
    expect(Object.keys(URGENCY_CONFIG)).toEqual([
      'CRITICAL',
      'TIME-SENSITIVE',
      'INFORMATIONAL',
    ]);
  });

  it('provides badge and band classes for each level', () => {
    for (const level of Object.keys(URGENCY_CONFIG) as (keyof typeof URGENCY_CONFIG)[]) {
      const cfg = getUrgencyConfig(level);
      expect(cfg.badge).toMatch(/bg-crisis-/);
      expect(cfg.band).toMatch(/border-l-crisis-/);
      expect(cfg.legendDot).toMatch(/bg-crisis-/);
    }
  });
});
