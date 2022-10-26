import * as Yup from 'yup';

export const reportByYearSchema = Yup.object().shape({
  year: Yup.string().required(),
  topics: Yup.object()
    .shape({
      REPORT_APPROVED_OBJECTIVES: Yup.boolean(),
      REPORT_MID_YEAR_REVIEW: Yup.boolean(),
      REPORT_MYR_BREAKDOWN: Yup.boolean(),
      REPORT_END_YEAR_REVIEW: Yup.boolean(),
      REPORT_EYR_BREAKDOWN: Yup.boolean(),
      REPORT_FEEDBACK: Yup.boolean(),
      REPORT_NEW_TO_BUSINESS: Yup.boolean(),
      REPORT_ANNIVERSARY_REVIEWS: Yup.boolean(),
      REPORT_WORK_LEVEL: Yup.boolean(),
    })
    .test('min 1 item', (value) => Object.values(value).some((item) => item)),
});
