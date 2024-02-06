import YogaIcon from '~/assets/icons/menu/yoga.svg?react';
import SwimmingIcon from '~/assets/icons/menu/swimming.svg?react';
import BikeIcon from '~/assets/icons/menu/bike.svg?react';
import WeightIcon from '~/assets/icons/menu/weight.svg?react';

export default function Sidebar() {
  const iconClasses = 'w-[62px] h-[64px]';
  return (
    <>
      <div className="flex h-full flex-col items-center justify-center gap-4 bg-gray-950 text-white shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)]">
        <YogaIcon className={iconClasses} />
        <SwimmingIcon className={iconClasses} />
        <BikeIcon className={iconClasses} />
        <WeightIcon className={iconClasses} />
      </div>
      <p className="absolute bottom-32 left-1/2 w-max -translate-x-1/2 rotate-[270deg] text-xs text-white	">
        Copyright, SportSee 2020
      </p>
    </>
  );
}
