import * as Yup from 'yup';
import { addNewFolderId } from 'utils';
import { RICH_TEXT_CHARACTERS_LIMIT } from 'config/constants';

export const schemaNotes = Yup.object().shape({
  //@ts-ignore
  noteTitle: Yup.string().required('Title is a required field'),
  noteText: Yup.string().required('Text is a required field').max(RICH_TEXT_CHARACTERS_LIMIT),
  folder: Yup.string().notRequired(),
  folderTitle: Yup.string()
    .notRequired()
    .when('folder', {
      is: (val) => val === addNewFolderId,
      then: Yup.string().required('Title is a required field'),
    }),
});
export const schemaFolder = Yup.object().shape({
  folderTitle: Yup.string().required('Title is a required field').max(50),
});
export const schemaTEAMNotes = Yup.object().shape({
  search_option: Yup.string().required(),
  noteTitle: Yup.string().required(),
  noteText: Yup.string().required().max(RICH_TEXT_CHARACTERS_LIMIT),
  folder: Yup.string().notRequired(),
  folderTitle: Yup.string()
    .notRequired()
    .when('folder', {
      is: (val) => val === addNewFolderId,
      then: Yup.string().required('Title is a required field'),
    }),
});

export const folderSchema = Yup.object().shape({
  folder: Yup.string().required(),
});

export const schemaNoteToEdit = Yup.object().shape({
  noteTitle: Yup.string().required('Title is a required field'),
  noteText: Yup.string().required('Text is a required field').max(RICH_TEXT_CHARACTERS_LIMIT),
  folder: Yup.string().notRequired(),
});
