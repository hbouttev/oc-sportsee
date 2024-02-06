import type { UserPerformance } from '~/types/userPerformance';
import type { ParsedJSONResponse } from '~/types/api';

export async function fetchUserPerformance(
  id: number,
  config: RequestInit = {}
): Promise<UserPerformance> {
  if (import.meta.env.VITE_MOCKED_API === 'true') {
    return (await import('~/mocks/performance.json'))
      .default as UserPerformance;
  }

  const response = await fetch(
    `${import.meta.env.VITE_API_HOST}/user/${id}/performance`,
    config
  );
  if (response.status !== 200) {
    throw response;
  }
  const userPerformance: ParsedJSONResponse<UserPerformance> =
    await response.json();

  return userPerformance.data;
}
