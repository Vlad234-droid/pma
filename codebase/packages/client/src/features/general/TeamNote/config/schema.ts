import * as Yup from 'yup';
import { RICH_TEXT_CHARACTERS_LIMIT } from 'config/constants';
import { NEW_FOLDER_ID } from 'utils';

export const schemaTEAMNotes = Yup.object().shape({
  referenceColleagueUuid: Yup.string().required(),
  title: Yup.string().required().max(55),
  content: Yup.string().required().max(RICH_TEXT_CHARACTERS_LIMIT),
  folder: Yup.string().notRequired(),
  folderTitle: Yup.string()
    .notRequired()
    .when('folder', {
      is: (val) => val === NEW_FOLDER_ID,
      then: Yup.string().required('Title is a required field'),
    }),
});
