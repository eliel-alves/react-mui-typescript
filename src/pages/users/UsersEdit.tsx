import { useEffect, useRef, useState } from 'react';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import { VTextField, VForm, useVForm, IVFormErrors } from '../../shared/forms';
import { UsersService } from '../../shared/services/api/users/UsersService';
import { DetailTools } from '../../shared/components';
import { PageLayout } from '../../shared/layouts';

interface IFormData {
  fullName: string;
  email: string;
  cityId: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  fullName: yup.string().required().min(3),
  email: yup.string().required().email(),
  cityId: yup.string().required()
});

export const UsersEdit: React.FC = () => {
  const { id = 'new' } = useParams<'id'>();
  const { formRef, save, saveAndBack, isSaveAndClose } = useVForm();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    if (id !== 'new') {
      setIsLoading(true);

      UsersService.getById(id).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
          navigate('/users');
        } else {
          setName(result.fullName);
          formRef.current?.setData(result);
        }
      });
    } else {
      formRef.current?.setData({
        fullName: '',
        email: '',
        cityId: ''
      });
    }
  }, [id]);

  const handleSave = (data: IFormData) => {
    formValidationSchema.validate(data, { abortEarly: false })
    .then((validatedData) => {
      setIsLoading(true);

      if (id === 'new') {
        UsersService.create(validatedData).then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
          } else {
            if (isSaveAndClose()) {
              navigate('/users');
            } else {
              navigate(`/users/edit/${result}`);
            }
          }
        });
      } else {
        UsersService.updateById(id, { id, ...validatedData }).then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
          } else {
            if (isSaveAndClose()) {
              navigate('/users');
            }
          }
        });
      }
    })
    .catch((errors: yup.ValidationError) => {
      const validationErrors: IVFormErrors = {};

      errors.inner.forEach(error => {
        if (!error.path) return;

        validationErrors[error.path] = error.message;
      });

      formRef.current?.setErrors(validationErrors);
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Do you really want to delete?')) {
      UsersService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert('Registry deleted successfully!');
          navigate('/users');
        }
      });
    }
  };

  return (
    <PageLayout
      title={id === 'new' ? 'New User' : name}
      toolbar={
        <DetailTools
          newButtonText={'New User'}
          showSaveAndBackButton
          showNewButton={id !== 'new'}
          showDeleteButton={id !== 'new'}
          onClickSaveButton={save}
          onClickSaveAndBackButton={saveAndBack}
          onClickDeleteButton={() => handleDelete(id)}
          onClickBackButton={() => navigate('/users')}
          onClickNewButton={() => navigate('/users/edit/new')}
        />
      }
    >
      <VForm
        ref={formRef}
        onSubmit={handleSave}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Box
          marginX={4}
          marginY={2}
          display='flex'
          flexDirection='column'
          component={Paper}
          variant='outlined'
        >

          <Grid container direction='column' padding={2} spacing={2}>

            {isLoading && (
              <Grid item>
                <LinearProgress variant='indeterminate'/>
              </Grid>
            )}

            <Grid item>
              <Typography variant='h6'>General</Typography>
            </Grid>

            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label='Full name'
                  name='fullName'
                  disabled={isLoading}
                  onChange={e => setName(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label='Email'
                  name='email'
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label='City'
                  name='cityId'
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

          </Grid>

        </Box>
      </VForm>
    </PageLayout>
  );
};
