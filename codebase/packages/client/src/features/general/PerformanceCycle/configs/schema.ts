import * as Yup from 'yup';
import { TFunction } from 'components/Translation';
import { formatDate } from 'utils';
import { OBJECTIVE } from '../constants/constants';

export const createPMCycleSchema = (t: TFunction) =>
  Yup.object().shape({
    name: Yup.string().required(),
    entryConfigKey: Yup.string().required(),
    metadata: Yup.object()
      .shape({
        cycle: Yup.object()
          .shape({
            properties: Yup.object()
              .shape({
                pm_cycle_start_time: Yup.date(),
                pm_cycle_end_time: Yup.date().min(Yup.ref('pm_cycle_start_time'), ({ min }) =>
                  t('end_day_mast_be_after', { min: formatDate(new Date(min)) }),
                ),
                pm_cycle_max: Yup.number().min(1),
                pm_cycle_before_start: Yup.string(),
                pm_cycle_before_end: Yup.string(),
              })
              .required('Cycle details is a required'),
            timelinePoints: Yup.array()
              .of(
                Yup.object().shape({
                  properties: Yup.object().shape({
                    pm_review_min: Yup.number().when(['pm_timeline_point_code'], (code, schema) =>
                      code === OBJECTIVE ? schema.min(1) : schema.notRequired(),
                    ),
                    pm_review_max: Yup.number().when(['pm_timeline_point_code'], (code, schema) =>
                      code === OBJECTIVE ? schema.min(1) : schema.notRequired(),
                    ),
                  }),
                }),
              )
              .required('Cycle reviews is a required'),
          })
          .required(),
      })
      .required(),
  });

export const chooseTemplateSchema = Yup.object().shape({
  template_search: Yup.string(),
});
