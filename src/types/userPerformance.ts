export interface PerformanceKind {
  1: 'cardio';
  2: 'energy';
  3: 'endurance';
  4: 'strength';
  5: 'speed';
  6: 'intensity';
}

export const performanceKindTransalted: {
  [key in keyof PerformanceKind]: string;
} = {
  1: 'Cardio',
  2: 'Énergie',
  3: 'Endurance',
  4: 'Force',
  5: 'Vitesse',
  6: 'Intensité',
};

export interface UserPerformance {
  userId: number;
  kind: PerformanceKind;
  data: {
    value: number;
    kind: keyof PerformanceKind;
  }[];
}
