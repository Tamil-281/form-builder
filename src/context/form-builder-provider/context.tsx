import { createContext, useContext } from 'react';

import type { FormBuilderState, FormBuilderAction } from '../type';

export const FormBuilderContext = createContext<{
  state: FormBuilderState;
  dispatch: React.Dispatch<FormBuilderAction>;
} | null>(null);

export const useFormBuilder = () => {
  const context = useContext(FormBuilderContext);
  if (!context) {
    throw new Error('useFormBuilder must be used within a FormBuilderProvider');
  }
  return context;
};
