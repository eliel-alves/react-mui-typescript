import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import * as yup from 'yup';

import { VTextField, VForm, useVForm, IVFormErrors } from '../../shared/forms';
import { CitiesService } from '../../shared/services/api/cities/CitiesService';
import { DetailTools } from '../../shared/components';
import { PageLayout } from '../../shared/layouts';

interface IFormData {
  name: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  name: yup.string().required().min(3),
});

export const CitiesEdit: React.FC = () => {
  const { id = 'new' } = useParams<'id'>();
  const { formRef, save, saveAndBack, isSaveAndClose } = useVForm();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    if (id !== 'new') {
      setIsLoading(true);

      CitiesService.getById(id).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
          navigate('/cities');
        } else {
          setName(result.name);
          formRef.current?.setData(result);
        }
      });
    } else {
      formRef.current?.setData({
        name: ''
      });
    }
  }, [id]);

  const handleSave = (data: IFormData) => {
    formValidationSchema.validate(data, { abortEarly: false })
    .then((validatedData) => {
      setIsLoading(true);

      if (id === 'new') {
        CitiesService.create(validatedData).then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
          } else {
            if (isSaveAndClose()) {
              navigate('/cities');
            } else {
              navigate(`/cities/edit/${result}`);
            }
          }
        });
      } else {
        CitiesService.updateById(id, { id, ...validatedData }).then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
          } else {
            if (isSaveAndClose()) {
              navigate('/cities');
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
      CitiesService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert('Registry deleted successfully!');
          navigate('/cities');
        }
      });
    }
  };

  return (
    <PageLayout
      title={id === 'new' ? 'New City' : name}
      toolbar={
        <DetailTools
          newButtonText={'New City'}
          showSaveAndBackButton
          showNewButton={id !== 'new'}
          showDeleteButton={id !== 'new'}
          onClickSaveButton={save}
          onClickSaveAndBackButton={saveAndBack}
          onClickDeleteButton={() => handleDelete(id)}
          onClickBackButton={() => navigate('/cities')}
          onClickNewButton={() => navigate('/cities/edit/new')}
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
                  label='Name'
                  name='name'
                  disabled={isLoading}
                  onChange={e => setName(e.target.value)}
                />
              </Grid>
            </Grid>

          </Grid>

        </Box>
      </VForm>
    </PageLayout>
  );
};
