import * as Yup from 'yup';

export const createTipSchema = Yup.object().shape({
  tipTitle: Yup.string().min(10).max(50).required(),
  tipDescription: Yup.string().min(10).max(250).required(),
  tipTargetLevel1: Yup.string(),
  // tipTargetLevel1: Yup.string().required(),
  tipTargetLevel2: Yup.string(),
  tipTargetLevel3: Yup.string(),
  tipTargetLevel4: Yup.string(),
});
