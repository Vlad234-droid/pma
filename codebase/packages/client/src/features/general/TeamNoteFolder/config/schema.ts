import * as Yup from 'yup';

export const schemaFolder = Yup.object().shape({
  title: Yup.string().required('Title is a required field').max(50),
});
