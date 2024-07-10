import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export const RootPage: React.FC = () => {
  return (
    <>
      <Link to="/">
        <h1>A webside</h1>
      </Link>
      <Outlet />
    </>
  );
};
