import { useLoaderData } from 'react-router-dom';
import type { LoaderFunctionArgs } from 'react-router-dom';
import { fetchUserActivity } from '~/models/Activity';
import { fetchUserAverageSession } from '~/models/AverageSession';
import { fetchUserPerformance } from '~/models/Performance';
import { fetchUser } from '~/models/User';
import type { LoaderData } from '~/types/react-router';
import DailyActivityGraph from '~/components/DailyActivityGraph/DailyActivityGraph.tsx';
import NutrientCountCard from '~/components/NutrientCountCard/NutrientCountCard.tsx';
import AverageSessionGraph from '~/components/AverageSessionGraph/AverageSessionGraph.tsx';
import PerformanceGraph from '~/components/PerformanceGraph/PerformanceGraph.tsx';
import ScoreGraph from '~/components/ScoreGraph/ScoreGraph.tsx';

export async function loader({ request, params }: LoaderFunctionArgs) {
  if (!params.userId) {
    throw new Error('No user specified');
  }

  const userId = parseInt(params.userId);
  if (isNaN(userId)) {
    throw new Error('Invalid user specified');
  }

  const [user, userActivity, userAverageSession, userPerformance] =
    await Promise.all([
      fetchUser(userId, { signal: request.signal }),
      fetchUserActivity(userId, { signal: request.signal }),
      fetchUserAverageSession(userId, { signal: request.signal }),
      fetchUserPerformance(userId, { signal: request.signal }),
    ]);

  if (!user) {
    throw new Response('', { status: 404, statusText: 'Not Found' });
  }

  return {
    user,
    userActivity,
    userAverageSession,
    userPerformance,
  };
}

export default function Dashboard() {
  const { user, userActivity, userAverageSession, userPerformance } =
    useLoaderData() as LoaderData<typeof loader>;

  return (
    <>
      <h1 className="text-5xl">
        Bonjour{' '}
        <span className="text-[#ff0101]">{user.userInfos.firstName}</span>
      </h1>
      <p className="mt-8 text-lg font-normal">
        Félicitation ! Vous avez explosé vos objectifs hier &#128079;
      </p>
      <div className="mt-8 flex w-full flex-col-reverse justify-between gap-8 xl:flex-row">
        <div className="flex w-full flex-wrap justify-between gap-y-6">
          <div className="h-[20rem] w-full">
            {/*w-[50rem]*/}
            <DailyActivityGraph userActivity={userActivity} />
          </div>
          <div className="aspect-square w-[31%]">
            <AverageSessionGraph userAverageSession={userAverageSession} />
          </div>
          <div className="aspect-square w-[31%]">
            <PerformanceGraph userPerformance={userPerformance} />
          </div>
          <div className="aspect-square w-[31%]">
            <ScoreGraph score={user.todayScore} />
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-6 xl:flex-col">
          <div className="h-[124px] w-[47%] xl:w-[258px]">
            <NutrientCountCard
              nutrient="calories"
              count={user.keyData.calorieCount}
            />
          </div>
          <div className="h-[124px] w-[47%] xl:w-[258px]">
            <NutrientCountCard
              nutrient="proteins"
              count={user.keyData.proteinCount}
            />
          </div>
          <div className="h-[124px] w-[47%] xl:w-[258px]">
            <NutrientCountCard
              nutrient="carbohydrates"
              count={user.keyData.carbohydrateCount}
            />
          </div>
          <div className="h-[124px] w-[47%] xl:w-[258px]">
            <NutrientCountCard
              nutrient="lipids"
              count={user.keyData.lipidCount}
            />
          </div>
        </div>
      </div>
    </>
  );
}
