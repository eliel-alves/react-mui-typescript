import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

import { CitiesService } from '../../shared/services/api/cities/CitiesService';
import { ListingTools } from '../../shared/components';
import { PageLayout } from '../../shared/layouts';
import { UsersService } from '../../shared/services/api/users/UsersService';

export const Dashboard = () => {

  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [isLoadingCities, setIsLoadingCities] = useState(true);
  const [totalCountUsers, setTotalCountUsers] = useState(0);
  const [totalCountCities, setTotalCountCities] = useState(0);
  
  useEffect(() => {
    setIsLoadingUsers(true);
    setIsLoadingCities(true);

    CitiesService.getAll(1).then((result) => {
      setIsLoadingCities(false);

      if (result instanceof Error) {
        alert(result.message);
      } else {
        setTotalCountCities(result.totalCount);
      }
    });

    UsersService.getAll(1).then((result) => {
      setIsLoadingUsers(false);

      if (result instanceof Error) {
        alert(result.message);
      } else {
        setTotalCountUsers(result.totalCount);
      }
    });
  }, []);

  return (
    <PageLayout
      title='Dashboard'
      toolbar={<ListingTools showNewButton={false} />}
    >
      <Box width='100%' display='flex'>
        <Grid container margin={4}>
          <Grid item container spacing={2}>

            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>Users Total</Typography>
                  <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                    {!isLoadingUsers && (
                      <Typography variant='h1' fontWeight='500'>
                        {totalCountUsers}
                      </Typography>
                    )}

                    {isLoadingUsers && (
                      <Typography variant='h6'>
                        Loading...
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>Cities Total</Typography>
                  <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                    {!isLoadingCities && (
                      <Typography variant='h1' fontWeight='500'>
                        {totalCountCities}
                      </Typography>
                    )}

                    {isLoadingCities && (
                      <Typography variant='h6'>
                        Loading...
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

          </Grid>
        </Grid>
      </Box>
    </PageLayout>
  );
};
