import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { UsersService } from '../../shared/services/api/users/UsersService';
import { DetailTools } from '../../shared/components';
import { PageLayout } from '../../shared/layouts';
import { LinearProgress } from '@mui/material';

export const UsersEdit: React.FC = () => {
  const { id = 'new' } = useParams<'id'>();
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
          console.log(result);
        }
      });
    }
  }, [id]);

  const handleSave = () => {
    console.log('Save');
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

          onClickSaveButton={handleSave}
          onClickSaveAndBackButton={handleSave}
          onClickDeleteButton={() => handleDelete(id)}
          onClickBackButton={() => navigate('/users')}
          onClickNewButton={() => navigate('/users/edit/new')}
        />
      }
    >

      {isLoading && (
        <LinearProgress variant='indeterminate' />
      )}
      <div>{id}</div>
    </PageLayout>
  );
};
