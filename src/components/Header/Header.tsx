import { NavLink } from 'react-router-dom';
import logoSportsee from '~/assets/logos/sportsee-full.svg';

export default function Header() {
  return (
    <div className="flex h-full items-center justify-between  bg-gray-950 px-7 shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)]">
      <img
        src={logoSportsee}
        alt="Logo SportSee"
        height="100%"
        className="mr-16"
      />
      <nav className="flex w-full justify-around text-2xl text-white">
        <NavLink to={`/`}>Accueil</NavLink>
        <NavLink to={`/`}>Profil</NavLink>
        <NavLink to={`/`}>Réglage</NavLink>
        <NavLink to={`/`}>Communauté</NavLink>
      </nav>
    </div>
  );
}
