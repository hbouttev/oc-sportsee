import type { UserPerformance } from '~/types/userPerformance.ts';
import { performanceKindTransalted } from '~/types/userPerformance.ts';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from 'recharts';

interface PerformanceGraphProps {
  userPerformance: UserPerformance;
}

export default function PerformanceGraph({
  userPerformance,
}: PerformanceGraphProps) {
  const data = userPerformance.data.map((performance) => {
    return {
      subject: performanceKindTransalted[performance.kind],
      value: performance.value,
      fullMark: 250,
    };
  });

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      className="rounded-[0.3125rem] bg-[#282D30] shadow-[0_2px_4px_0px_rgba(0,0,0,0.02)]"
    >
      <RadarChart
        cx="50%"
        cy="50%"
        outerRadius="80%"
        data={data}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
      >
        <PolarGrid />
        <PolarAngleAxis
          dataKey="subject"
          fontSize={12}
          stroke="#FFFFFF"
          tickLine={false}
        />
        <Radar dataKey="value" fill="#FF0101" fillOpacity={0.7} />
      </RadarChart>
    </ResponsiveContainer>
  );
}
