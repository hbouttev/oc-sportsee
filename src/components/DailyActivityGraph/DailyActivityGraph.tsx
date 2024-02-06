import type { UserActivity } from '~/types/userActivity.ts';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { Props } from 'recharts/types/component/DefaultLegendContent';
import type { TooltipProps } from 'recharts/types/component/Tooltip';
import type {
  ValueType,
  NameType,
} from 'recharts/types/component/DefaultTooltipContent';

interface DailyActivityGraphProps {
  userActivity: UserActivity;
}

export default function DailyActivityGraph({
  userActivity,
}: DailyActivityGraphProps) {
  const data = userActivity.sessions.map((session) => {
    return {
      name: new Date(session.day).getDate(),
      kilogram: session.kilogram,
      calories: session.calories,
    };
  });

  const renderLegend = ({ payload }: Props) => {
    if (!payload) return null;
    return (
      <div className="flex justify-between pb-12">
        <p className="text-[15px] text-charts-title">Activité quotidienne</p>
        <ul className="flex gap-7">
          {payload.map(({ value, color, dataKey }) => {
            // We need to use Tailwind theme colors extensions for text color
            // here because this seems to be evaluated at runtime and doesn't
            // create a custom Tailwind class with custom arbitrary value (e.g.
            // text-[#50d71e]).
            return (
              <li
                key={`item-${dataKey}`}
                className="flex items-center gap-2.5 text-charts-primary"
              >
                <svg
                  fill={color}
                  height="8px"
                  width="8px"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="50" cy="50" r="50" />
                </svg>
                <p>{value}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  const renderTooltip = ({ payload }: TooltipProps<ValueType, NameType>) => {
    if (!payload || payload.length === 0) return null;
    return (
      <div className="bg-charts-red px-1.5 py-3 text-[7px] text-white">
        <ul className="flex flex-col items-center gap-6">
          {payload.map(({ value, dataKey, unit }) => {
            return (
              <li key={`item-${dataKey}`}>
                {value}
                {unit}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      className="rounded-[0.3125rem] bg-gray-50 p-6 shadow-[0_2px_4px_0px_rgba(0,0,0,0.02)]"
    >
      <BarChart data={data} barSize={7} barGap={10}>
        <CartesianGrid
          strokeDasharray="2 2"
          vertical={false}
          strokeWidth={0.5}
        />
        <XAxis
          dataKey="name"
          stroke="#9B9EAC"
          tickLine={false}
          tickMargin={15}
          strokeWidth={1}
          strokeOpacity={1}
          fontSize={14}
          axisLine={{ stroke: '#DEDEDE' }}
        />
        <YAxis hide yAxisId="left" orientation="left" stroke="#9B9EAC" />
        <YAxis
          domain={([dataMin, dataMax]) => {
            // we want to ensure an even number of ticks
            let min = dataMin - 1;
            let max = dataMax + 1;
            if (
              (dataMin % 2 === 0 && dataMax % 2 === 0) ||
              (dataMin % 2 !== 0 && dataMax % 2 !== 0)
            ) {
              return [min, max];
            } else {
              return [min, max + 1];
            }
          }}
          yAxisId="right"
          orientation="right"
          stroke="#9B9EAC"
          axisLine={false}
          tickLine={false}
          tickMargin={40}
          fontSize={14}
        />
        <Tooltip
          cursor={{ fill: '#c4c4c4', fillOpacity: 0.5 }}
          content={renderTooltip}
          allowEscapeViewBox={{ x: true, y: true }}
          offset={20}
        />
        <Legend
          align="right"
          verticalAlign="top"
          iconSize={6}
          iconType="circle"
          wrapperStyle={{
            fontSize: 14,
          }}
          content={renderLegend}
        />
        <Bar
          yAxisId="right"
          dataKey="kilogram"
          fill="#282D30"
          legendType="circle"
          radius={[10, 10, 0, 0]}
          unit="kg"
          name="Poids (kg)"
        />
        <Bar
          yAxisId="left"
          dataKey="calories"
          fill="#E60000"
          legendType="circle"
          radius={[10, 10, 0, 0]}
          unit="kCal"
          name="Calories brûlées (kCal)"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
