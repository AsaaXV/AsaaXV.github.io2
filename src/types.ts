export interface FlipCardItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  iconType: 'plastic' | 'tumbler' | 'food';
  frontDescription: string;
  backTips: string[];
  impactMetric: string;
  campusContext: string;
  flipBackText?: string;
}

export interface ComparisonItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  captionUnderPhoto?: string;
  before: {
    label: string;
    description: string;
    drawback: string;
    visualType: 'glass-waste' | 'cardboard-waste' | 'tshirt-waste';
  };
  after: {
    label: string;
    description: string;
    benefit: string;
    visualType: 'glass-plant' | 'cardboard-organizer' | 'tshirt-totebag';
  };
}

export interface RecyclePhase {
  step: number;
  title: string;
  subtitle?: string;
  description?: string;
  campusAction?: string;
  action?: string;
  material?: string;
}

export interface FactItem {
  id: string;
  number: string;
  unit: string;
  title: string;
  description: string;
  source: string;
  detailText: string;
  badge: string;
}

export interface ActionFolder {
  id: string;
  stepNumber: number;
  title: string;
  summary: string;
  checklist: string[];
  quote: string;
  isCompleted: boolean;
}

export interface TeamMember {
  name: string;
  nim: string;
  role: string;
}

export interface LogbookEntry {
  meeting: number;
  date: string;
  focus: string;
  feedback: string;
  deliverable: string;
  isPassed: boolean;
}
