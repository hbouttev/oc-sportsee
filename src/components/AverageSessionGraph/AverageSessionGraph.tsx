import type {
  UserAverageSession,
  Weekdays,
} from '~/types/userAverageSession.ts';
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { Props } from 'recharts/types/component/DefaultLegendContent';
import type { TooltipProps } from 'recharts/types/component/Tooltip';
import type {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';

interface AverageSessionGraphProps {
  userAverageSession: UserAverageSession;
}

const WEEKDAYS: Weekdays = {
  1: 'L',
  2: 'M',
  3: 'M',
  4: 'J',
  5: 'V',
  6: 'S',
  7: 'D',
};

export default function AverageSessionGraph({
  userAverageSession,
}: AverageSessionGraphProps) {
  const data = userAverageSession.sessions.map((session) => {
    return {
      name: WEEKDAYS[session.day],
      length: session.sessionLength,
    };
  });

  const renderLegend = ({ payload }: Props) => {
    if (!payload) return null;
    return (
      <p className="p-7 text-[15px] text-white">Durée moyenne des sessions</p>
    );
  };

  const renderTooltip = ({ payload }: TooltipProps<ValueType, NameType>) => {
    if (!payload || payload.length === 0) return null;
    return (
      <div className="bg-white p-2 text-[8px] text-black">
        {payload[0].value} {payload[0].unit}
      </div>
    );
  };

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      className="rounded-[0.3125rem] bg-[#FF0000] pb-3 shadow-[0_2px_4px_0px_rgba(0,0,0,0.02)] hover:before:bg-black/10"
    >
      <LineChart data={data}>
        <defs>
          <linearGradient id="colorLength" x1="0" y1="1" x2="1" y2="1">
            <stop offset="5%" stopColor="#FFFFFF" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#FFFFFF" stopOpacity={1} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="name"
          fontSize={12}
          stroke="#FFFFFF"
          opacity={0.5}
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          tick={<CustomTick />}
        />
        <Tooltip
          // cursor={{ stroke: '#000000', strokeOpacity: 0.1, strokeWidth: 10 }}
          cursor={false}
          content={renderTooltip}
        />
        <Legend
          align="left"
          verticalAlign="top"
          wrapperStyle={{
            fontSize: 15,
            opacity: 0.5,
          }}
          content={renderLegend}
        />
        <Line
          type="monotone"
          dataKey="length"
          stroke="url(#colorLength)"
          strokeWidth={2}
          dot={false}
          unit="min"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

function CustomTick({ x, y, payload, index, visibleTicksCount }: any) {
  let textAnchor = 'middle';
  // let firstOrLastClass = '';
  let dx = 0;
  if (index === 0) {
    // firstOrLastClass = 'ml-10';
    textAnchor = 'start';
    dx = 3;
  } else if (index === visibleTicksCount - 1) {
    // firstOrLastClass = 'mr-10';
    textAnchor = 'end';
    dx = -3;
  }

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={10}
        dx={dx}
        textAnchor={textAnchor}
        fill="#FFFFFF"
        fontSize={12}
        opacity={0.5}
      >
        {payload.value}
      </text>
    </g>
  );
}
