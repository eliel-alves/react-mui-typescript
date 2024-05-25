import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useDrawerContext } from '../shared/contexts';
import { Dashboard } from '../pages';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/home',
        label: 'Home'
      }
    ]);
  }, [setDrawerOptions]);

  return (
    <Routes>
      <Route path='/home' element={<Dashboard />} />

      <Route path='*' element={<Navigate to='/home' />} />
    </Routes>
  );
};
