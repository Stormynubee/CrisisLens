import type { DemoDocument, UrgencyLevel } from '@/lib/types';

export interface DemoCatalogItem extends DemoDocument {
  scenarioQuote: string;
  stitchIcon: string;
}

export const DEMO_CATALOG: DemoCatalogItem[] = [
  {
    id: 'kv-heatwave',
    title: 'KV Dharamgarh Heat-Wave Circular',
    subtitle: 'Early dismissal notice during extreme heat',
    category: 'school',
    icon: 'Building2',
    stitchIcon: 'article',
    urgency: 'TIME-SENSITIVE',
    description:
      'Priya, a Class XI student, received this circular about changed school timings.',
    scenarioQuote:
      '"I received this notice from Priya\'s school. Does she have classes tomorrow during the heatwave warning?"',
  },
  {
    id: 'hospital-discharge',
    title: 'Hospital Discharge Summary',
    subtitle: 'Post-accident discharge with follow-up instructions',
    category: 'medical',
    icon: 'Heart',
    stitchIcon: 'favorite',
    urgency: 'CRITICAL',
    description:
      'A mother in Kalahandi whose husband was discharged after a road accident.',
    scenarioQuote:
      '"They handed me these papers when discharging my mother, Sunita Devi. I don\'t understand the medication schedule."',
  },
  {
    id: 'pm-kisan-rejection',
    title: 'PM-KISAN Rejection Notice',
    subtitle: 'Payment rejection with 30-day appeal window',
    category: 'government',
    icon: 'Landmark',
    stitchIcon: 'account_balance',
    urgency: 'TIME-SENSITIVE',
    description: 'Ramesh Patra received a rejection letter with an appeal window.',
    scenarioQuote:
      '"My application was rejected, Ramesh Patra. It says something about a mismatch in records. How do I fix this?"',
  },
];

export const ONBOARDING_QUICK_PICKS: {
  id: string;
  label: string;
  urgency: UrgencyLevel;
  stitchIcon: string;
  tone: 'critical' | 'amber' | 'government';
}[] = [
  {
    id: 'hospital-discharge',
    label: 'Hospital Discharge Summary',
    urgency: 'CRITICAL',
    stitchIcon: 'emergency',
    tone: 'critical',
  },
  {
    id: 'kv-heatwave',
    label: 'KV Heat-Wave Circular',
    urgency: 'TIME-SENSITIVE',
    stitchIcon: 'schedule',
    tone: 'amber',
  },
  {
    id: 'pm-kisan-rejection',
    label: 'PM-KISAN Rejection Notice',
    urgency: 'TIME-SENSITIVE',
    stitchIcon: 'account_balance',
    tone: 'government',
  },
];

export function getDemoById(id: string) {
  return DEMO_CATALOG.find((d) => d.id === id);
}
