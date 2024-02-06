import type { Nutrient } from './types.ts';

interface NutrientContent {
  name: string;
  unit: string;
}

type NutrientContents = Record<Nutrient, NutrientContent>;

interface NutrientContentProps {
  nutrient: Nutrient;
  count: number;
}

const NUTRIENT_CONTENTS: NutrientContents = {
  calories: {
    name: 'Calories',
    unit: 'kCal',
  },
  lipids: {
    name: 'Lipides',
    unit: 'g',
  },
  carbohydrates: {
    name: 'Glucides',
    unit: 'g',
  },
  proteins: {
    name: 'Protéines',
    unit: 'g',
  },
};

export default function NutrientContent({
  nutrient,
  count,
}: NutrientContentProps) {
  return (
    <div className="gap flex flex-col justify-center gap-0.5">
      <p className="text-xl font-bold text-[#282D30]">
        {new Intl.NumberFormat('en-US').format(count)}
        {NUTRIENT_CONTENTS[nutrient].unit}
      </p>
      <p className="text-sm text-[#74798C]">
        {NUTRIENT_CONTENTS[nutrient].name}
      </p>
    </div>
  );
}
