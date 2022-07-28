import * as Yup from 'yup';

export const folderSchema = Yup.object().shape({
  folder: Yup.string().required(),
});
