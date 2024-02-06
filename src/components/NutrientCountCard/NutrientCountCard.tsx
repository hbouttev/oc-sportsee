import type { Nutrient } from './types.ts';
import NutrientContent from './NutrientContent.tsx';
import NutrientIcon from './NutrientIcon.tsx';

interface NutrientCountCardProps {
  nutrient: Nutrient;
  count: number;
}

export default function NutrientCountCard({
  nutrient,
  count,
}: NutrientCountCardProps) {
  return (
    <div className="flex h-full w-full items-center gap-6 rounded-[0.3125rem] bg-gray-50 p-8 shadow-[0_2px_4px_0px_rgba(0,0,0,0.02)]">
      <NutrientIcon nutrient={nutrient} />
      <NutrientContent nutrient={nutrient} count={count} />
    </div>
  );
}
