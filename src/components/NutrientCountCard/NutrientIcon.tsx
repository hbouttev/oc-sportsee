import React from 'react';
import CaloriesIcon from '~/assets/icons/calories-icon.svg?react';
import LipidsIcon from '~/assets/icons/fat-icon.svg?react';
import CarbohydratesIcon from '~/assets/icons/carbs-icon.svg?react';
import ProteinsIcon from '~/assets/icons/protein-icon.svg?react';
import type { Nutrient } from './types.ts';

type NutrientIcons = Record<Nutrient, React.ReactNode>;

interface NutrientIconProps {
  nutrient: Nutrient;
}

const NUTRIENT_ICON_CLASSES = 'w-[60px] h-[60px]';

const NUTRIENT_ICONS: NutrientIcons = {
  calories: <CaloriesIcon className={NUTRIENT_ICON_CLASSES} />,
  lipids: <LipidsIcon className={NUTRIENT_ICON_CLASSES} />,
  carbohydrates: <CarbohydratesIcon className={NUTRIENT_ICON_CLASSES} />,
  proteins: <ProteinsIcon className={NUTRIENT_ICON_CLASSES} />,
};

export default function NutrientIcon({ nutrient }: NutrientIconProps) {
  return NUTRIENT_ICONS[nutrient];
}
