import type { UserActivity } from '~/types/userActivity';
import type { ParsedJSONResponse } from '~/types/api';

export async function fetchUserActivity(
  id: number,
  config: RequestInit = {}
): Promise<UserActivity> {
  if (import.meta.env.VITE_MOCKED_API === 'true') {
    return (await import('~/mocks/activity.json')).default as UserActivity;
  }

  const response = await fetch(
    `${import.meta.env.VITE_API_HOST}/user/${id}/activity`,
    config
  );
  if (response.status !== 200) {
    throw response;
  }
  const userActivity: ParsedJSONResponse<UserActivity> = await response.json();

  return userActivity.data;
}
