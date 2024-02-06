import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
  PolarAngleAxis,
} from 'recharts';
import type { Props } from 'recharts/types/component/DefaultLegendContent';

interface ScoreGraphProps {
  score: number; // Float between 0 and 1
}

export default function ScoreGraph({ score }: ScoreGraphProps) {
  const scoreTextPercentage = (score * 100).toFixed(0);

  const data = [
    {
      name: 'Score',
      score: score,
      fill: '#FF0000',
    },
  ];

  const renderLegend = ({ payload }: Props) => {
    if (!payload) return null;
    return <p className="absolute p-7 text-[15px] text-black">Score</p>;
  };

  return (
    <div className="relative h-full w-full">
      <ResponsiveContainer
        width="100%"
        height="100%"
        className="rounded-[0.3125rem] bg-gray-50 shadow-[0_2px_4px_0px_rgba(0,0,0,0.02)]"
      >
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="60%"
          outerRadius="80%"
          barSize={10}
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <circle cx="50%" cy="50%" r="27%" fill="#FFFFFF" />
          <PolarAngleAxis
            type="number"
            domain={[0, 1]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            background={{ fill: '#f9fafb' }}
            angleAxisId={0}
            dataKey="score"
            cornerRadius={10}
            fill="#FFFFFF"
          />
          <Legend align="left" verticalAlign="top" content={renderLegend} />
        </RadialBarChart>
      </ResponsiveContainer>
      <p className="absolute left-1/2 top-1/2 w-1/3 -translate-x-1/2 -translate-y-1/2 transform text-center text-base text-[#74798C]">
        <span className="text-[26px] text-[#282D30]">
          {scoreTextPercentage}%
        </span>
        <br />
        de votre objectif
      </p>
    </div>
  );
}
