import './App.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/home';
import { FilmDetailsPage } from './pages/film-details';
import { queryClient } from './api/client';
import { RootPage } from './pages/root';

const router = createBrowserRouter([
  {
    path: '/',
    Component: RootPage,
    children: [
      {
        path: '/',
        Component: HomePage,
      },
      {
        path: '/film/:filmId',
        Component: FilmDetailsPage,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
