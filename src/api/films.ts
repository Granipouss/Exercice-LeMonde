import { useQuery } from '@tanstack/react-query';

export type Film = {
  url: string;
  title: string;
  opening_crawl: string;
  episode_id: string;
};

const getFilms = async () => {
  const response = await fetch(`https://swapi.dev/api/films/`);
  const data = await response.json();
  return data.results as Film[];
};

const getFilm = async (id: string) => {
  const response = await fetch(`https://swapi.dev/api/films/${id}`);
  const data = await response.json();
  return data as Film;
};

export const useFilms = () =>
  useQuery({
    queryKey: ['films'],
    queryFn: getFilms,
  });

export const useFilm = (id: string) =>
  useQuery({
    queryKey: ['films', id],
    queryFn: () => getFilm(id),
  });
