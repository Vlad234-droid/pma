import * as Yup from 'yup';
import { TargetType } from '../type';

export const createRequestFeedbackSchema = Yup.object().shape({
  targetColleagues: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.string(),
        label: Yup.string(),
      }),
    )
    .required(),
  targetType: Yup.string().required(),
  targetId: Yup.string()
    .notRequired()
    .when('targetType', {
      is: (val) => val === TargetType.OBJECTIVE,
      then: Yup.string().required(),
    }),
  comment_to_request: Yup.string().notRequired(),
  comment_to_day_job: Yup.string()
    .notRequired()
    .when('targetType', { is: (val) => val === TargetType.GOAL, then: Yup.string().required() }),
  comment_to_your_self: Yup.string()
    .notRequired()
    .when('targetType', { is: (val) => val === TargetType.VALUE_BEHAVIOR, then: Yup.string().required() }),
  comment_to_your_impact: Yup.string()
    .notRequired()
    .when('targetType', {
      is: (val) => val === TargetType.OTHER,
      then: Yup.string().typeError('Custom not a number message!').required(),
    }),
});
