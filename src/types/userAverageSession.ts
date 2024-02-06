export interface Weekdays {
  1: 'L';
  2: 'M';
  3: 'M';
  4: 'J';
  5: 'V';
  6: 'S';
  7: 'D';
}

export type WeekdayNumber = keyof Weekdays;

interface Session {
  day: WeekdayNumber;
  sessionLength: number;
}

export interface UserAverageSession {
  userId: number;
  sessions: Session[];
}
