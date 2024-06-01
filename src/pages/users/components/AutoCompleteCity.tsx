import { useEffect, useMemo, useState } from 'react';
import { useField } from '@unform/core';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';

import { CitiesService } from '../../../shared/services/api/cities/CitiesService';
import { useDebounce } from '../../../shared/hooks';

type TAutoCompleteOption = {
  id: string;
  label: string;
};

interface IAutoCompleteCityProps {
  isExternalLoading?: boolean;
}

export const AutoCompleteCity: React.FC<IAutoCompleteCityProps> = ({ isExternalLoading = false }) => {
  const { fieldName, registerField, defaultValue, error, clearError } = useField('cityId');
  const { debounce } = useDebounce();
  
  const [selectedId, setSelectedId] = useState<string | undefined>(defaultValue);

  const [options, setOptions] = useState<TAutoCompleteOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selectedId,
      setValue: (_, newSelectedId) =>  setSelectedId(newSelectedId)
    })
  }, [registerField, fieldName, selectedId]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      CitiesService.getAll(1, search, selectedId).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          console.log(result);

          setOptions(result.data.map(city => ({id: city.id, label: city.name})));
        }
      });
    });

  }, [search, selectedId]);

  const autoCompleteSelectedOption = useMemo(() => {
    if (!selectedId) return null;
    
    const selectedOption = options.find(option => option.id === selectedId);
    if (!selectedOption) return null;
    
    return selectedOption;
  }, [selectedId, options]);

  return (
    <Autocomplete
      disablePortal
      options={options}
      loading={isLoading}
      disabled={isExternalLoading}
      value={autoCompleteSelectedOption}
      onInputChange={(_, newValue) => setSearch(newValue)}
      onChange={(_, newValue) => { setSelectedId(newValue?.id); setSearch(''); clearError(); }}
      popupIcon={(isExternalLoading || isLoading) ? <CircularProgress size={24}/> : undefined}
      renderInput={(params) => (
        <TextField
          {...params}
          label='City'
          error={!!error}
          helperText={error}
        />
      )}
    />
  );
};
