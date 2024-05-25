import { Avatar, Box, Divider, Drawer, List, useMediaQuery, useTheme } from '@mui/material';
import { ReactNode } from 'react';
import { SidebarItem } from './SidebarItem';
import { useDrawerContext } from '../../contexts';

interface ISidebarProps {
  children: ReactNode;
}

export const Sidebar: React.FC<ISidebarProps> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext();

  return (
    <>
      <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen} >
        <Box width={theme.spacing(28)} height='100%' display='flex' flexDirection='column'>
          <Box width='100%' height={theme.spacing(20)} display='flex' alignItems='center' justifyContent='center'>
            <Avatar
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
              src='https://avatars.githubusercontent.com/eliel-alves'
            />
          </Box>

          <Divider />

          <Box flex={1}>
            <List component='nav'>
              <SidebarItem name='Home' icon='home' />
            </List>
          </Box>
        </Box>
      </Drawer>

      <Box height='100vh' marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};
