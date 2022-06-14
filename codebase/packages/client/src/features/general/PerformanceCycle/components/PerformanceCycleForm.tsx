import React, { FC, useEffect, Fragment, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import get from 'lodash.get';
import { Button, Rule, useStyle } from '@pma/dex-wrapper';
import {
  ProcessTemplateActions,
  PerformanceCycleActions,
  processTemplateByUuidSelector,
  performanceCycleMappingKeys,
} from '@pma/store';
import useDispatch from 'hooks/useDispatch';
import { TileWrapper } from 'components/Tile';
import { Input, Item, Field } from 'components/Form';
import { DurationPicker } from 'components/Form/DurationPicker';
import Select from 'components/Form/Select';
import Datepicker from 'components/Datepicker';
import { useTranslation } from 'components/Translation';
import TemplatesModal from './TemplatesModal';
import FormsViewer from './FormsViwer';
import { createPMCycleSchema } from '../schema';
import { OBJECTIVE } from '../constants';
import { useFormWithCloseProtection } from 'hooks/useFormWithCloseProtection';

type Props = {
  onSubmit: (data: any) => void;
  defaultValues?: any;
  getConfigEntriesByUuid: (uuid: string) => void;
  canEdit?: boolean;
};

const PerformanceCycleForm: FC<Props> = ({ onSubmit, defaultValues, canEdit = true }) => {
  const dispatch = useDispatch();
  const { css } = useStyle();
  const { t } = useTranslation();

  const methods = useFormWithCloseProtection({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(createPMCycleSchema(t)),
    defaultValues,
  });

  const {
    getValues,
    setValue,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = methods;

  const formValues = getValues();

  const [properties = {}, timelinePoints = [], template, forms = []] = watch([
    'metadata.cycle.properties',
    'metadata.cycle.timelinePoints',
    'template',
    'forms',
  ]);

  const handleChangeTemplate = <T extends { uuid: string }>(template: T) => {
    setValue('template', template, { shouldValidate: true });
    dispatch(ProcessTemplateActions.getProcessTemplateMetadata({ fileUuid: template?.uuid }));
  };

  const templateDetails: any | undefined = useSelector(processTemplateByUuidSelector(template?.uuid));
  const mappingKeys = useSelector(performanceCycleMappingKeys);
  const mappingKeyOptions = useMemo(() => mappingKeys.map((value) => ({ label: value, value })), [mappingKeys]);

  const cycleStartTime = get(properties, 'pm_cycle_start_time');
  const isPropertiesShow = Boolean(Object.values(properties).find((value) => value));
  const isTimelinePointsShow = Boolean(timelinePoints?.length);

  useEffect(() => {
    if (templateDetails?.cycle) {
      const { properties, timelinePoints, ...rest } = templateDetails.cycle;
      setValue('metadata.cycle', rest);
      setValue('metadata.cycle.properties', properties);
      setValue('metadata.cycle.timelinePoints', timelinePoints);
      setValue('forms', templateDetails.forms);
    }
  }, [templateDetails?.cycle]);

  useEffect(() => {
    dispatch(PerformanceCycleActions.getPerformanceCycleMappingKeys());
  }, []);

  return (
    <form className={css({ marginTop: '32px' })} autoComplete='off'>
      <TileWrapper customStyle={{ margin: '8px', padding: '25px', maxWidth: '1300px', overflowY: 'visible' }}>
        <div
          className={css({
            fontWeight: 'bold',
            fontSize: '20px',
            marginBottom: '8px',
          })}
        >
          1. {t('general_settings', 'General settings')}
        </div>
        <Field
          name={'name'}
          Wrapper={Item}
          label={t('cycle_name', 'Cycle name')}
          Element={Input}
          placeholder={'Enter performance cycle name'}
          value={formValues.name}
          setValue={setValue}
          error={get(errors, 'name.message')}
          readonly={!canEdit}
        />
        <Field
          name={'entryConfigKey'}
          Wrapper={Item}
          label={t('cycle_group', 'Cycle group')}
          Element={Select}
          options={mappingKeyOptions}
          placeholder={'Select cycle group'}
          value={formValues.entryConfigKey}
          setValue={setValue}
          error={get(errors, 'entryConfigKey.message')}
          readonly={!canEdit}
        />
        <div className={css({ marginBottom: '23px' })}>{get(formValues, 'template.fileName', '')}</div>
        {canEdit && <TemplatesModal onSelect={handleChangeTemplate} />}
      </TileWrapper>
      <TileWrapper
        customStyle={{
          margin: '8px',
          padding: '25px',
          maxWidth: '1300px',
          overflow: 'visible',
          ...(!isPropertiesShow && { color: '#E5E5E5' }),
        }}
      >
        <div
          className={css({
            fontWeight: 'bold',
            fontSize: '20px',
          })}
        >
          2. {t('cycle_details', 'Cycle details')}
        </div>
        <div className={`${isPropertiesShow ? css(visibleContainerStyle) : css(containerStyle)}`}>
          <div className={css(itemStyle)}>
            <Field
              name={'metadata.cycle.properties.pm_cycle_start_time'}
              setValue={setValue}
              label={t('start_day', 'Start day')}
              Wrapper={Item}
              Element={Datepicker}
              value={cycleStartTime}
              readonly={!canEdit}
            />
          </div>
          <div className={css(itemStyle)}>
            <Field
              name={'metadata.cycle.properties.pm_cycle_end_time'}
              label={t('end_day', 'End day')}
              withIcon={false}
              Wrapper={Item}
              Element={Datepicker}
              error={errors?.metadata?.cycle?.properties?.pm_cycle_end_time?.message}
              value={get(formValues, 'metadata.cycle.properties.pm_cycle_end_time')}
              setValue={methods.setValue}
              readonly={!canEdit}
            />
          </div>
          <div className={css(itemStyle)}>
            <Field
              name={'metadata.cycle.properties.pm_cycle_max'}
              setValue={setValue}
              Wrapper={({ children }) => (
                <Item label={t('recurrence', 'Recurrence')} withIcon={false}>
                  {children}
                </Item>
              )}
              Element={Input}
              value={get(formValues, 'metadata.cycle.properties.pm_cycle_max')}
              readonly={!canEdit}
            />
          </div>

          <div className={css(itemStyle)}>
            <Item label={t('notifications', 'Notifications')} withIcon={false} />
            <div>
              <Field
                name={'metadata.cycle.properties.pm_cycle_before_start'}
                setValue={setValue}
                Wrapper={({ children }) => (
                  <Item label={t('before_start', 'Before start')} withIcon={false}>
                    {children}
                  </Item>
                )}
                Element={DurationPicker}
                value={get(formValues, 'metadata.cycle.properties.pm_cycle_before_start')}
                readonly={!canEdit}
              />
            </div>
            <div className={css(itemStyle)}>
              <Field
                name={'metadata.cycle.properties.pm_cycle_before_end'}
                setValue={setValue}
                Wrapper={({ children }) => (
                  <Item label={t('before_end', 'Before end')} withIcon={false}>
                    {children}
                  </Item>
                )}
                Element={DurationPicker}
                value={get(formValues, 'metadata.cycle.properties.pm_cycle_before_end')}
                readonly={!canEdit}
              />
            </div>
          </div>
        </div>
      </TileWrapper>
      <TileWrapper
        customStyle={{
          margin: '8px',
          padding: '25px',
          maxWidth: '1300px',
          overflowY: 'visible',
          ...(!isTimelinePointsShow && { color: '#E5E5E5' }),
        }}
      >
        <div
          className={css({
            fontWeight: 'bold',
            fontSize: '20px',
          })}
        >
          3. {t('cycle_reviews', 'Cycle reviews')}
        </div>
        <div
          className={css(
            isTimelinePointsShow
              ? {
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, minmax(150px, 1fr)) repeat(2, minmax(80px, 100px))',
                  gap: '8px',
                }
              : containerStyle,
          )}
        >
          <Item label={t('type_of_reviews', 'Type of reviews')} withIcon={false} marginBot={false} />
          <Item label={t('duration', 'Duration')} withIcon={false} marginBot={false} />
          <Item label={t('before_start', 'Before start')} withIcon={false} marginBot={false} />
          <Item label={t('before_end', 'Before end')} withIcon={false} marginBot={false} />
          <div className={css(itemStyle, { maxWidth: '100px' })}>
            <Item label={t('min', 'Min')} withIcon={false} marginBot={false} />
          </div>
          <div className={css(itemStyle, { maxWidth: '100px' })}>
            <Item label={t('max', 'Max')} withIcon={false} marginBot={false} />
          </div>
          {timelinePoints?.map((point: { reviewType: string }, index) => {
            return (
              <Fragment key={index}>
                <div className={css(itemStyle, { width: '100%' })}>
                  <Field
                    name={`metadata.cycle.timelinePoints[${index}].description`}
                    setValue={setValue}
                    Element={Input}
                    value={get(formValues, `metadata.cycle.timelinePoints[${index}].description`)}
                    readonly
                  />
                </div>
                <div className={css({ display: 'flex', gap: '8px' })}>
                  <div className={css(itemStyle, { width: '100%' })}>
                    <Field
                      name={`metadata.cycle.timelinePoints[${index}].properties.pm_review_duration`}
                      setValue={setValue}
                      Element={DurationPicker}
                      value={get(formValues, `metadata.cycle.timelinePoints[${index}].properties.pm_review_duration`)}
                      readonly={!canEdit}
                    />
                  </div>
                </div>
                <div className={css({ display: 'flex', gap: '8px' })}>
                  <div className={css(itemStyle, { width: '100%' })}>
                    <Field
                      name={`metadata.cycle.timelinePoints[${index}].properties.pm_review_before_start`}
                      setValue={setValue}
                      Element={DurationPicker}
                      value={get(
                        formValues,
                        `metadata.cycle.timelinePoints[${index}].properties.pm_review_before_start`,
                      )}
                      readonly={!canEdit}
                    />
                  </div>
                </div>
                <div className={css({ display: 'flex', gap: '8px' })}>
                  <div className={css(itemStyle, { width: '100%' })}>
                    <Field
                      name={`metadata.cycle.timelinePoints[${index}].properties.pm_review_before_end`}
                      setValue={setValue}
                      Element={DurationPicker}
                      value={get(formValues, `metadata.cycle.timelinePoints[${index}].properties.pm_review_before_end`)}
                      readonly={!canEdit}
                    />
                  </div>
                </div>
                {point.reviewType === OBJECTIVE ? (
                  <>
                    <div className={css(itemStyle, { maxWidth: '100px' })}>
                      <Field
                        name={`metadata.cycle.timelinePoints[${index}].properties.pm_review_min`}
                        setValue={setValue}
                        Element={Input}
                        error={get(errors, `metadata.cycle.timelinePoints[${index}].properties.pm_review_min.message`)}
                        value={get(formValues, `metadata.cycle.timelinePoints[${index}].properties.pm_review_min`)}
                        readonly={!canEdit}
                      />
                    </div>
                    <div className={css(itemStyle, { maxWidth: '100px' })}>
                      <Field
                        name={`metadata.cycle.timelinePoints[${index}].properties.pm_review_max`}
                        setValue={setValue}
                        Element={Input}
                        error={get(errors, `metadata.cycle.timelinePoints[${index}].properties.pm_review_max.message`)}
                        value={get(formValues, `metadata.cycle.timelinePoints[${index}].properties.pm_review_max`)}
                        readonly={!canEdit}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className={css(itemStyle, { maxWidth: '100px' })} />
                    <div className={css(itemStyle, { maxWidth: '100px' })} />
                  </>
                )}
              </Fragment>
            );
          })}
        </div>
      </TileWrapper>
      <FormsViewer forms={forms} isActive={forms.length} />
      {canEdit && (
        <div
          className={css({ display: 'flex', justifyContent: 'flex-end', paddingBottom: '100px', maxWidth: '1300px' })}
        >
          {/*@ts-ignore*/}
          {defaultValues?.status !== 'REGISTERED' && (
            <Button
              isDisabled={!isValid}
              mode='inverse'
              styles={[btnStyle]}
              onPress={() => handleSubmit((data) => onSubmit({ ...data, mode: 'SAVE' }))()}
            >
              {t('save_as_draft', 'Save as draft')}
            </Button>
          )}
          {/*@ts-ignore*/}
          <Button
            isDisabled={!isValid}
            styles={[btnStyle]}
            onPress={() => handleSubmit((data) => onSubmit({ ...data, mode: 'PUBLISH' }))()}
          >
            {t('save', 'Save')}
          </Button>
        </div>
      )}
    </form>
  );
};

// @ts-ignore
const btnStyle: Rule = {
  fontSize: '16px',
  border: '2px solid rgb(0, 83, 159)',
  minWidth: '200px',
  marginLeft: '8px',
};

const itemStyle: Rule = {
  fontStyle: 'normal',
  fontSize: '16px',
  lineHeight: '24px',
};

const containerStyle: Rule = {
  flexWrap: 'wrap',
  gap: '16px 8px',
  alignItems: 'center',
  display: 'none',
};

const visibleContainerStyle: Rule = () => ({
  display: 'inline-flex',
  flexWrap: 'wrap',
  gap: '16px 8px',
});

export default PerformanceCycleForm;