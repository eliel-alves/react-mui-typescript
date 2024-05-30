import { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';

export const useVForm = () => {
  const formRef = useRef<FormHandles>(null);

  const isSavingAndNew = useRef(false);
  const isSavingAndBack = useRef(false);
  
  const handleSave = useCallback(() => {
    isSavingAndBack.current = false;
    isSavingAndNew.current = false;
    formRef.current?.submitForm();

  }, []);

  const handleSaveAndNew = useCallback(() => {
    isSavingAndBack.current = false;
    isSavingAndNew.current = true;
    formRef.current?.submitForm();
  }, []);

  const handleSaveAndBack = useCallback(() => {
    isSavingAndBack.current = true;
    isSavingAndNew.current = false;
    formRef.current?.submitForm();
  }, []);

  const handleIsSaveAndNew = useCallback(() => {
    return isSavingAndNew.current;
  }, []);
  
  const handleIsSaveAndBack = useCallback(() => {
    return isSavingAndBack.current;
  }, []);
  
  return {
    formRef,
    save: handleSave,
    saveAndNew: handleSaveAndNew,
    saveAndBack: handleSaveAndBack,
    isSaveAndNew: handleIsSaveAndNew,
    isSaveAndClose: handleIsSaveAndBack,
  };
};
