import { BrowserRouter } from 'react-router-dom';

import './shared/forms/YupTranslate';

import { AppThemeProvider, AuthProvider, DrawerProvider } from './shared/contexts';
import { Login, Sidebar } from './shared/components';
import { AppRoutes } from './routes';

export const App = () => {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <Login>

          <DrawerProvider>
            <BrowserRouter>

              <Sidebar>
                <AppRoutes />
              </Sidebar> 
              
            </BrowserRouter>
          </DrawerProvider>
          
        </Login>
      </AppThemeProvider>
    </AuthProvider>
  );
};
