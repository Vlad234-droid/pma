import * as Yup from 'yup';
import { TargetType } from '../type';
import { FeedbackShema } from 'config/enum';

export const createRequestFeedbackSchema = Yup.object().shape({
  colleagues: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.string(),
        label: Yup.string(),
      }),
    )
    .min(1)
    .required(),
  targetType: Yup.string().required(),
  targetId: Yup.string()
    .notRequired()
    .when('targetType', {
      is: (val) => val === TargetType.OBJECTIVE,
      then: Yup.string().required(),
    }),
  comment_to_objective: Yup.string()
    .notRequired()
    .when('targetId', {
      is: (val) => val,
      then: (schema) => schema.required().min(FeedbackShema.MIN_LENGTH).max(FeedbackShema.MAX_LENGTH),
    }),
  comment_to_request: Yup.string().notRequired().min(FeedbackShema.MIN_LENGTH).max(FeedbackShema.MAX_LENGTH),
  comment_to_day_job: Yup.string()
    .notRequired()
    .when('targetType', {
      is: (val) => val === TargetType.GOAL,
      then: (schema) => schema.required().min(FeedbackShema.MIN_LENGTH).max(FeedbackShema.MAX_LENGTH),
    }),
  comment_to_your_self: Yup.string()
    .notRequired()
    .when('targetType', {
      is: (val) => val === TargetType.VALUE_BEHAVIOR,
      then: (schema) => schema.required().min(FeedbackShema.MIN_LENGTH).max(FeedbackShema.MAX_LENGTH),
    }),
  comment_to_your_impact: Yup.string()
    .notRequired()
    .when('targetType', {
      is: (val) => val === TargetType.OTHER,
      then: (schema) =>
        schema
          .typeError('Custom not a number message!')
          .required()
          .min(FeedbackShema.MIN_LENGTH)
          .max(FeedbackShema.MAX_LENGTH),
    }),
});
