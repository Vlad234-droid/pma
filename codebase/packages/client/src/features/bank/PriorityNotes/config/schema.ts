import { TFunction } from 'components/Translation';
import * as Yup from 'yup';

export const createSchemmaPriorityNote = (t: TFunction) =>
  Yup.object().shape({
    //@ts-ignore
    content: Yup.string().required(t('priority_note_required', 'Note is a required field')).max(5000),
  });
