import * as Yup from 'yup';
import { FeedbackArea } from '../../../config/enum';

export const createRequestFeedbackSchema = Yup.object().shape({
  search_option: Yup.string().required(),
  area_options: Yup.string().required(),
  objective_options: Yup.string()
    .notRequired()
    .when('area_options', {
      is: (val) => val === FeedbackArea.OBJECTIVES,
      then: Yup.string().required(),
    }),
  comment_to_request: Yup.string().notRequired(),
});
