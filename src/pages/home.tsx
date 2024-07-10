import { useFilms } from '../api/films';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const { data } = useFilms();

  if (!data) {
    // TODO: Handle Error and Loading
    return null;
  }

  return (
    <main>
      <h2>Films</h2>
      <ul>
        {data.map((film, index) => (
          <li key={film.title}>
            <Link to={`/film/${index + 1}`}>{film.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
};
