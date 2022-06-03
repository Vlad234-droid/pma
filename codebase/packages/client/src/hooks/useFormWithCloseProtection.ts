import { useEffect } from 'react';
import { useForm as useReactHookForm } from 'react-hook-form';

export const useFormWithCloseProtection: typeof useReactHookForm = (props) => {
  const form = useReactHookForm(props);
  const values = form.getValues();
  /* 
    TODO: Fix all forms - register field correctly and use defaultValues. form.formState.isDirty isn't working correctly, it depends on defaultValues and field register, but not all forms have it correctly setuped. 
  */
  const isDirty = Object.values(values).filter((el) => Array.isArray(el) ? el.length : el).length;
  
  useEffect(() => {
    if (isDirty) {
      window.onbeforeunload = () => true;
    }

    return () => {
      window.onbeforeunload = null;
    };
  }, [isDirty]);

  return form;
};
