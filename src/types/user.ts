export interface UserWithScore {
  id: number;
  userInfos: {
    firstName: string;
    lastName: string;
    age: number;
  };
  score: number;
  keyData: {
    calorieCount: number;
    proteinCount: number;
    carbohydrateCount: number;
    lipidCount: number;
  };
}

export interface UserWithTodayScore extends Omit<UserWithScore, 'score'> {
  todayScore: number;
}

export type User = UserWithTodayScore;
