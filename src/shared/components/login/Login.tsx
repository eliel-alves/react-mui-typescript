import { useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, CircularProgress, TextField, Typography } from '@mui/material';
import * as yup from 'yup';

import { useAuthContext } from '../../contexts';

const loginSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(5)
});

interface ILoginProps {
  children: React.ReactNode;
}

export const Login: React.FC<ILoginProps> = ({ children }) => {
  const { isAuthenticated, login } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = () => {
    setIsLoading(true);

    loginSchema
    .validate({ email, password }, { abortEarly: false })
    .then(validatedData => {
      setIsLoading(true);

      login(validatedData.email, validatedData.password)
      .then(() => {
        setIsLoading(false);
      });
    })
    .catch((errors: yup.ValidationError) => {
      setIsLoading(false);

      errors.inner.forEach(error => {
        if (error.path === 'email') {
          setEmailError(error.message);
        } else if (error.path === 'password') {
          setPasswordError(error.message);
        }
      });
    });
  };

  if (isAuthenticated) return (
    <>{children}</>
  );

  return (
    <Box width='100vw' height='100vh' display='flex' justifyContent='center' alignItems='center'>
      <Card>
        <CardContent>
          <Box display='flex' flexDirection='column' gap={2} width={250}>
            <Typography variant='h6' align='center'>Sign In</Typography>
            <TextField
              fullWidth
              value={email}
              disabled={isLoading}
              error={!!emailError}
              helperText={emailError}
              onKeyDown={() => setEmailError('')}
              onChange={e => setEmail(e.target.value)}
              label='Email'
              type='email'
            />
            <TextField
              fullWidth
              value={password}
              disabled={isLoading}
              error={!!passwordError}
              helperText={passwordError}
              onKeyDown={() => setPasswordError('')}
              onChange={e => setPassword(e.target.value)}
              label='Password'
              type='password'
            />
          </Box>
        </CardContent>
        <CardActions>
          <Box width='100%' display='flex' justifyContent='center'>
            <Button
              disabled={isLoading}
              variant='contained'
              onClick={handleSubmit}
              endIcon={isLoading ? <CircularProgress size={20} variant='indeterminate' color='inherit'/> : undefined}
            >
              Login
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
}