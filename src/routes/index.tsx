import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useDrawerContext } from '../shared/contexts';
import {
  UsersList,
  UsersEdit,
  CitiesList,
  CitiesEdit,
  Dashboard
} from '../pages';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'dashboard',
        path: '/dashboard',
        label: 'Dashboard'
      },
      {
        icon: 'location_city',
        path: '/cities',
        label: 'Cities'
      },
      {
        icon: 'people',
        path: '/users',
        label: 'Users'
      },
    ]);
  }, [setDrawerOptions]);

  return (
    <Routes>
      <Route path='/dashboard' element={<Dashboard />} />

      <Route path='/users' element={<UsersList />} />
      <Route path='/users/edit/:id' element={<UsersEdit />} />

      <Route path='/cities' element={<CitiesList />} />
      <Route path='/cities/edit/:id' element={<CitiesEdit />} />

      <Route path='*' element={<Navigate to='/dashboard' />} />
    </Routes>
  );
};
