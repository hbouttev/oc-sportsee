import type { UserAverageSession } from '~/types/userAverageSession';
import type { ParsedJSONResponse } from '~/types/api';

export async function fetchUserAverageSession(
  id: number,
  config: RequestInit = {}
): Promise<UserAverageSession> {
  if (import.meta.env.VITE_MOCKED_API === 'true') {
    return (await import('~/mocks/average-sessions.json'))
      .default as UserAverageSession;
  }

  const response = await fetch(
    `${import.meta.env.VITE_API_HOST}/user/${id}/average-sessions`,
    config
  );
  if (response.status !== 200) {
    throw response;
  }
  const userAverageSession: ParsedJSONResponse<UserAverageSession> =
    await response.json();

  return userAverageSession.data;
}
