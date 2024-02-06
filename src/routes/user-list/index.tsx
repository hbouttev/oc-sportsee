import { Link } from 'react-router-dom';

export default function UserList() {
  return (
    <>
      <h1 className="text-xl">Liste des utilisateurs (test)</h1>
      <ul className="pt-6">
        <li>
          <Link to="/dashboard/12" className="underline">
            Karl Dovineau
          </Link>
        </li>
        <li>
          <Link to="/dashboard/18" className="underline">
            Cecilia Ratorez
          </Link>
        </li>
      </ul>
    </>
  );
}
