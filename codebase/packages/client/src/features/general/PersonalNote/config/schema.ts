import * as Yup from 'yup';
import { NEW_FOLDER_ID } from 'utils';
import { RICH_TEXT_CHARACTERS_LIMIT } from 'config/constants';

export const schemaNotes = Yup.object().shape({
  //@ts-ignore
  title: Yup.string().required('Title is a required field'),
  content: Yup.string().required('Text is a required field').max(RICH_TEXT_CHARACTERS_LIMIT),
  folder: Yup.string().notRequired(),
  folderTitle: Yup.string()
    .notRequired()
    .when('folder', {
      is: (val) => val === NEW_FOLDER_ID,
      then: Yup.string().required('Title is a required field'),
    }),
});
