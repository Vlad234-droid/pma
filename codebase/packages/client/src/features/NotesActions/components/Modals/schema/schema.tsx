import * as Yup from 'yup';

export const schemaNotes = Yup.object().shape({
  noteTitle: Yup.string().required(),
  noteText: Yup.string().required(),
  folder: Yup.string().notRequired(),
  folderTitle: Yup.string()
    .notRequired()
    .when('folder', {
      is: (val) => val === '+ Add new folder',
      then: Yup.string().required(),
    }),
});
export const schemaFolder = Yup.object().shape({
  folderTitle: Yup.string().required().max(50),
});
export const schemaTEAMNotes = Yup.object().shape({
  search_option: Yup.string().required(),
  noteTitle: Yup.string().required(),
  noteText: Yup.string().required(),
  folder: Yup.string().notRequired(),
  folderTitle: Yup.string()
    .notRequired()
    .when('folder', {
      is: (val) => val === '+ Add new folder',
      then: Yup.string().required(),
    }),
});

export const folderSchema = Yup.object().shape({
  folder: Yup.string().required(),
});

export const schemaNoteToEdit = Yup.object().shape({
  noteTitle: Yup.string().required(),
  noteText: Yup.string().required(),
  folder: Yup.string().notRequired(),
});
