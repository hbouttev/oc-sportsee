import type { User, UserWithScore, UserWithTodayScore } from '~/types/user';

export function userAdapter(user: UserWithScore | UserWithTodayScore): User {
  if ('score' in user) {
    // UserV1
    const { score, ...rest } = user;
    return {
      ...rest,
      todayScore: score,
    };
  }
  // UserV2
  return user;
}

export async function fetchUser(
  id: number,
  config: RequestInit = {}
): Promise<User> {
  if (import.meta.env.VITE_MOCKED_API === 'true') {
    const mockedUser = (await import('~/mocks/user.json'))
      .default as UserWithTodayScore;
    return userAdapter(mockedUser);
  }

  const response = await fetch(
    `${import.meta.env.VITE_API_HOST}/user/${id}`,
    config
  );
  if (response.status !== 200) {
    throw response;
  }
  const user: UserWithScore | UserWithTodayScore = (await response.json()).data;

  return userAdapter(user);
}
