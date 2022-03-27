import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { Button, Rule, useStyle } from '@dex-ddl/core';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  colleagueUUIDSelector,
  ConfigEntriesActions,
  PerformanceCycleActions,
  ProcessTemplateActions,
} from '@pma/store';
import { configEntriesMetaSelector, configEntriesSelector } from '@pma/store/src/selectors/config-entries';
import {
  getFormsByProcessTemplateUuidSelector,
  getProcessTemplateByUuidSelector,
} from '@pma/store/src/selectors/processTemplate';
import {
  getConfigEntriesByPerformanceCycle,
  getFormsByPerformanceCycleUuidSelector,
} from '@pma/store/src/selectors/performance-cycle';
import { ObjectiveModal } from 'features/Objectives/components/ObjectiveModal/ObjectiveModal';
import useDispatch from 'hooks/useDispatch';
import { Trans, useTranslation } from 'components/Translation';
import { TileWrapper } from 'components/Tile';
import { GenericItemField } from 'components/GenericForm';
import { Input, Item, Radio, Select, Attention } from 'components/Form';
import { DurationPicker } from 'components/Form/DurationPicker';
import { Page } from 'pages';
import Spinner from 'components/Spinner';
import TemplatesModal from './TemplatesModal';
import { createPMCycleSchema } from './schema';

function getChildren(data, options11: any, key, value) {
  return data
    .filter((item) => {
      return item[key] === options11;
    })
    .reduce((prev, item) => {
      return [
        ...prev,
        ...item.children?.map((child) => ({
          value: child[value],
          label: child.name,
          children: child.children,
        })),
      ];
    }, []);
}

export const PerformanceCycleForm: FC = () => {
  const params = useParams();
  const performanceCycleUuid = params['performanceCycleUuid'];
  const colleagueUuid = useSelector(colleagueUUIDSelector);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const [entryConfigUuid, setEntryConfigUuid] = useState('');
  const [options11, setOptions11] = useState([]);
  const [options2, setOptions2] = useState([]);
  const [options12, setOptions12] = useState([]);
  const [options13, setOptions13] = useState([]);
  const [options131, setOptions131] = useState([]);
  const [options14, setOptions14] = useState([]);
  const [processSelected, setProcessSelected] = useState(false);
  const [, setEntryConfigKey] = useState('');
  const [isTemplatesModalOpen, showTemplatesModal] = useState(false);
  const [processTemplateName, setProcessTemplateName] = useState('');
  const [selectedForm, setSelectedForm] = useState('');
  const [showProperties, setShowProperties] = useState(false);

  const dispatch = useDispatch();

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(createPMCycleSchema),
  });
  const { getValues, setValue, watch, handleSubmit, control } = methods;

  const { data } = useSelector(configEntriesSelector) || {};
  const processTemplate = useSelector(getProcessTemplateByUuidSelector(processSelected));
  const formsByPerformanceCycleUuid = useSelector(getFormsByPerformanceCycleUuidSelector(performanceCycleUuid));
  const formsProcessTemplate = useSelector(getFormsByProcessTemplateUuidSelector(processSelected));
  const { loaded, loading } = useSelector(configEntriesMetaSelector) || {};
  const { configEntryItem, formDataToFillObj, performanceCycleItem } = useSelector(
    getConfigEntriesByPerformanceCycle(performanceCycleUuid),
  );

  const watchStartTime = watch(['cycle.metadata.cycle.properties.pm_cycle_start_time']);

  useEffect(() => {
    if (watchStartTime?.length > 0 && watchStartTime?.[0])
      setValue(
        'cycle.metadata.cycle.properties.pm_cycle_end_time',
        getDate(subDay(addYear(new Date(watchStartTime[0])))),
      );
  }, [watchStartTime]);

  useEffect(() => {
    if (!loaded) {
      dispatch(ConfigEntriesActions.getConfigEntries());
    }
  }, [loaded]);

  useEffect(() => {
    if (!loaded) {
      dispatch(ProcessTemplateActions.getProcessTemplate({ type: '1', status: '2' }));
    }
  }, [loaded]);

  const getItems = ({ value }) => {
    if (value) dispatch(ConfigEntriesActions.getConfigEntriesByUuid({ uuid: value }));
  };

  useEffect(() => {
    if (performanceCycleUuid !== 'new')
      dispatch(PerformanceCycleActions.getPerformanceCycleByUuid({ performanceCycleUuid }));
  }, [performanceCycleUuid]);

  useEffect(() => {
    setProcessTemplateName(processTemplate?.cycle?.code);
  }, [processTemplate]);

  if (configEntryItem && !entryConfigUuid) {
    setEntryConfigUuid(configEntryItem.uuid);
  }

  const { css, theme } = useStyle();

  const getDate = (date) => date.toISOString().substr(0, 10);
  const addYear = (date) => new Date(date.setFullYear(date.getFullYear() + 1));
  const subDay = (date) => new Date(date.setTime(date.getTime() - 24 * 60 * 60 * 1000));

  useEffect(() => {
    setValue('cycle', { metadata: { cycle: processTemplate?.cycle } });
  }, [processTemplate]);

  useEffect(() => {
    if (performanceCycleItem) {
      setValue('cycle', performanceCycleItem);
      setValue('name', performanceCycleItem.name);
      setValue('entryConfigKey', performanceCycleItem.entryConfigKey);
      setShowProperties(true);
    }
  }, [performanceCycleItem]);

  useEffect(() => {
    // TODO: remove this code after getConfigEntriesByPerformanceCycle is refactored
    setTimeout(() => {
      for (const property in formDataToFillObj) {
        setValue(property, formDataToFillObj[property]);
      }
    }, 2000);
  }, [formDataToFillObj['entryConfigKey']]);

  useEffect(() => {
    if (entryConfigUuid) {
      getItems({ value: entryConfigUuid });
    }
  }, [entryConfigUuid]);

  function getData() {
    const { cycle, entryConfigKey, name } = getValues();
    return {
      data: {
        entryConfigKey: entryConfigKey,
        template: processSelected ? { uuid: processSelected } : performanceCycleItem.template,
        name: name,
        createdBy: {
          uuid: colleagueUuid,
        },
        type: 'FISCAL',
        startTime: new Date(cycle.metadata.cycle.properties.pm_cycle_start_time).toISOString(),
        endTime: new Date(cycle.metadata.cycle.properties.pm_cycle_end_time).toISOString(),
        properties: cycle.metadata.cycle.properties,
        metadata: cycle.metadata,
      },
    };
  }

  const onSaveDraft = () => {
    const data = getData();
    if (performanceCycleUuid !== 'new') {
      return dispatch(PerformanceCycleActions.updatePerformanceCycle(data));
    }
    dispatch(PerformanceCycleActions.createPerformanceCycle(data));
    navigate(`/${Page.PERFORMANCE_CYCLE}`);
  };

  const onPublish = () => {
    const data = getData();
    dispatch(PerformanceCycleActions.publishPerformanceCycle(data));
  };

  useEffect(() => setOptions2(getChildren(data, options11, 'uuid', 'uuid')), [options11, data]);

  useEffect(() => setOptions13(getChildren(options2, options12, 'value', 'uuid')), [options12, options2]);

  useEffect(
    () => setOptions14(getChildren(options13, options131, 'value', 'compositeKey')),
    [options131, options13, options12],
  );

  const closeTemplatesModal = () => {
    showTemplatesModal(false);
  };

  const selectTemplate = (value) => {
    console.log('value', value);

    showTemplatesModal(false);
    dispatch(ProcessTemplateActions.getProcessTemplateMetadata({ fileUuid: value }));
    setProcessSelected(value);
    setShowProperties(true);
  };

  const timelinePointsValues = getValues('cycle.metadata.cycle.timelinePoints');

  const onError = (errors, e) => console.error(errors, e);

  if (loading || !loaded) {
    return (
      <Spinner withText fullHeight />
    )
  }

  /*---------Render---------*/
  // @ts-ignore
  const forms = formsProcessTemplate || formsByPerformanceCycleUuid;
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
          1. General settings
        </div>
        <Attention />
        <GenericItemField
          name={`name`}
          methods={methods}
          Wrapper={Item}
          label={'Cycle name'}
          Element={Input}
          placeholder={'Enter performance cycle name'}
        />
        <GenericItemField
          name={`level1`}
          methods={methods}
          Wrapper={Item}
          label={'Level 1'}
          Element={Select}
          options={data.map((item) => {
            return { value: item.uuid, label: item.name };
          })}
          placeholder={'- Select organization level -   '}
          onChange={(data) => {
            setOptions11(data);
            getItems({ value: data });
          }}
        />
        <GenericItemField
          name={`level2`}
          methods={methods}
          Wrapper={Item}
          label={'Level 2'}
          Element={Select}
          options={options2}
          placeholder={'- Select organization level -   '}
          onChange={(value) => setOptions12(value)}
        />
        <GenericItemField
          name={`level3`}
          methods={methods}
          Wrapper={Item}
          label={'Level 3'}
          Element={Select}
          options={options13}
          placeholder={'- Select organization level - '}
          onChange={(value) => {
            setOptions131(value);
          }}
        />
        <GenericItemField
          name={`entryConfigKey`}
          methods={methods}
          Wrapper={Item}
          label={'Level 4'}
          Element={Select}
          options={options14}
          placeholder={'- Select organization level - '}
          onChange={(value) => setEntryConfigKey(value)}
          value={formDataToFillObj['entryConfigKey'] || ''}
        />
        <div className={css({ marginBottom: '23px' })}>
          {performanceCycleItem?.template?.fileName || processTemplateName}
        </div>
        <Button onPress={() => showTemplatesModal(true)}>Choose Template</Button>
        {isTemplatesModalOpen && <TemplatesModal selectTemplate={selectTemplate} closeModal={closeTemplatesModal} />}
      </TileWrapper>
      <TileWrapper
        customStyle={{
          margin: '8px',
          padding: '25px',
          maxWidth: '1300px',
          overflow: 'visible',
          ...(!showProperties && { color: '#E5E5E5' }),
        }}
      >
        <div
          className={css({
            fontWeight: 'bold',
            fontSize: '20px',
          })}
        >
          2. Cycle details
        </div>
        <div className={`${showProperties ? css(containerVisible) : css(container)}`}>
          <div className={css(itemRule)}>
            <GenericItemField
              name={`cycle.metadata.cycle.properties.pm_cycle_start_time`}
              methods={methods}
              Wrapper={({ children }) => (
                <Item label='Start day' withIcon={false}>
                  {children}
                </Item>
              )}
              Element={(props) => <Input type={'date'} {...props} />}
            />
          </div>
          <div className={css(itemRule)}>
            <GenericItemField
              name={`cycle.metadata.cycle.properties.pm_cycle_end_time`}
              methods={methods}
              Wrapper={({ children }) => (
                <Item label='End day' withIcon={false}>
                  {children}
                </Item>
              )}
              Element={(props) => <Input type={'date'} readonly={true} {...props} />}
            />
          </div>
          <div className={css(itemRule)}>
            <GenericItemField
              name={`cycle.metadata.cycle.properties.pm_cycle_max`}
              methods={methods}
              Wrapper={({ children }) => (
                <Item label='Recurrence' withIcon={false}>
                  {children}
                </Item>
              )}
              Element={Input}
            />
          </div>

          <div className={css(itemRule)}>
            <Item label='Notifications' withIcon={false} />
            <div>
              <GenericItemField
                name={`cycle.metadata.cycle.properties.pm_cycle_before_start`}
                methods={methods}
                Wrapper={({ children }) => (
                  <Item label='Before start' withIcon={false}>
                    {children}
                  </Item>
                )}
                Element={() => (
                  <DurationPicker control={control} name={'cycle.metadata.cycle.properties.pm_cycle_before_start'} />
                )}
              />
            </div>
            <div className={css(itemRule)}>
              <GenericItemField
                name={`cycle.metadata.cycle.properties.pm_cycle_before_end`}
                methods={methods}
                Wrapper={({ children }) => (
                  <Item label='Before end' withIcon={false}>
                    {children}
                  </Item>
                )}
                Element={() => (
                  <DurationPicker control={control} name={'cycle.metadata.cycle.properties.pm_cycle_before_end'} />
                )}
              />
            </div>
          </div>
        </div>
      </TileWrapper>

      {/*------------3. Cycle reviews-------------*/}
      <TileWrapper
        customStyle={{
          margin: '8px',
          padding: '25px',
          maxWidth: '1300px',
          overflowY: 'visible',
          ...(!showProperties && { color: '#E5E5E5' }),
        }}
      >
        <div
          className={css({
            fontWeight: 'bold',
            fontSize: '20px',
          })}
        >
          3. Cycle reviews
        </div>
        <div
          className={css(
            showProperties
              ? {
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, minmax(180px, 1fr)) repeat(2, 100px)',
                  gap: '8px',
                  overflowY: 'scroll',
                }
              : container,
          )}
        >
          <Item label='Type of reviews' withIcon={false} marginBot={false} />
          <Item label='Duration' withIcon={false} marginBot={false} />
          <Item label='Before start' withIcon={false} marginBot={false} />
          <Item label='Before end' withIcon={false} marginBot={false} />
          <div className={css(itemRule, { maxWidth: '100px' })}>
            <Item label='Min' withIcon={false} marginBot={false} />
          </div>
          <div className={css(itemRule, { maxWidth: '100px' })}>
            <Item label='Max' withIcon={false} marginBot={false} />
          </div>
          {timelinePointsValues?.map((timelinePoint, index) => {
            if (timelinePoint.type !== 'REVIEW') return null;
            return (
              <>
                <div className={css(itemRule)}>
                  <GenericItemField
                    name={`cycle.metadata.cycle.timelinePoints[${index}].description`}
                    methods={methods}
                    Element={Input}
                  />
                </div>
                <div className={css({ display: 'flex', gap: '8px' })}>
                  <div className={css(itemRule)}>
                    <GenericItemField
                      name={`cycle.metadata.cycle.timelinePoints[${index}].properties.pm_review_duration`}
                      methods={methods}
                      Element={() => (
                        <DurationPicker
                          control={control}
                          name={`cycle.metadata.cycle.timelinePoints[${index}].properties.pm_review_duration`}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className={css({ display: 'flex', gap: '8px' })}>
                  <div className={css(itemRule)}>
                    <GenericItemField
                      name={`cycle.metadata.cycle.timelinePoints[${index}].properties.pm_review_before_start`}
                      methods={methods}
                      Element={() => (
                        <DurationPicker
                          control={control}
                          name={`cycle.metadata.cycle.timelinePoints[${index}].properties.pm_review_before_start`}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className={css({ display: 'flex', gap: '8px' })}>
                  <div className={css(itemRule)}>
                    <GenericItemField
                      name={`cycle.metadata.cycle.timelinePoints[${index}].properties.pm_review_before_end`}
                      methods={methods}
                      Element={() => (
                        <DurationPicker
                          control={control}
                          name={`cycle.metadata.cycle.timelinePoints[${index}].properties.pm_review_before_end`}
                        />
                      )}
                    />
                  </div>
                </div>
                {timelinePoint.reviewType === 'OBJECTIVE' ? (
                  <>
                    <div className={css(itemRule, { maxWidth: '100px' })}>
                      <GenericItemField
                        name={`cycle.metadata.cycle.timelinePoints[${index}].properties.pm_review_min`}
                        methods={methods}
                        Element={Input}
                      />
                    </div>
                    <div className={css(itemRule, { maxWidth: '100px' })}>
                      <GenericItemField
                        name={`cycle.metadata.cycle.timelinePoints[${index}].properties.pm_review_max`}
                        methods={methods}
                        Element={Input}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className={css(itemRule, { maxWidth: '100px' })} />
                    <div className={css(itemRule, { maxWidth: '100px' })} />
                  </>
                )}
              </>
            );
          })}
        </div>
      </TileWrapper>

      {/*------------4. Forms-------------*/}
      <TileWrapper
        customStyle={{
          margin: '8px',
          padding: '25px',
          maxWidth: '1300px',
          ...(!showProperties && { color: '#E5E5E5' }),
        }}
      >
        <div
          className={css({
            fontWeight: 'bold',
            fontSize: '20px',
          })}
        >
          {t('4. Forms')}
        </div>
        <div className={`${showProperties ? css(containerVisible) : css(container)}`}>
          <div className={css({ display: 'flex', marginTop: '8px' })}>
            {forms &&
              forms?.map((form, i) => {
                return (
                  <div key={i} className={css({ padding: '0px 10px' })}>
                    <label
                      className={css({
                        display: 'flex',
                        alignItems: 'center',
                      })}
                    >
                      <Radio
                        name='status'
                        checked={selectedForm === form?.displayName}
                        onChange={() => setSelectedForm(form?.displayName)}
                      />
                      <span
                        className={css({
                          fontSize: '16px',
                          lineHeight: '20px',
                          padding: '0px 5px',
                        })}
                      >
                        <Trans>{form?.displayName}</Trans>
                      </span>
                    </label>
                  </div>
                );
              })}
          </div>
          {forms &&
            forms?.map((form, i) => {
              if (form?.displayName !== selectedForm) return null;
              return (
                <ObjectiveModal
                  key={i}
                  formValues={{}}
                  schemaComponents={form?.components}
                  methods={methods}
                  currentObjectiveNumber={1}
                  useSingleStep={false}
                  submitForm={false}
                  setPrevObjectiveNumber={() => console.log}
                  onSaveDraft={() => console.log}
                  onSubmit={() => console.log}
                  setNextObjectiveNumber={() => console.log}
                  onClose={() => console.log}
                  skipFooter={true}
                  skipHelp={true}
                />
              );
            })}
        </div>
      </TileWrapper>
      <div className={css({ display: 'flex', justifyContent: 'flex-end', paddingBottom: '100px', maxWidth: '1300px' })}>
        {/*@ts-ignore*/}
        <Button mode='inverse' styles={[btnStyle({ theme }) as Styles]} onPress={handleSubmit(onSaveDraft, onError)}>
          Save as draft
        </Button>
        {/*@ts-ignore*/}
        <Button styles={[btnStyle({ theme }) as Styles]} onPress={handleSubmit(onPublish, onError)}>
          Publish
        </Button>
      </div>
    </form>
  );
};

const btnStyle: Rule = ({ theme }) => ({
  fontSize: '16px',
  border: `1px solid ${theme.colors.tescoBlue}`,
  minWidth: '200px',
  marginLeft: '8px',
});

const itemRule: Rule = ({ theme }) => ({
  fontSize: `${theme.font.fixed.f16}px`,
  lineHeight: 1.5,
});

const container: Rule = () => ({
  flexWrap: 'wrap',
  gap: '16px 8px',
  alignItems: 'center',
  display: 'none',
});

const containerVisible: Rule = () => ({
  display: 'inline-flex',
  flexWrap: 'wrap',
  gap: '16px 8px',
});

