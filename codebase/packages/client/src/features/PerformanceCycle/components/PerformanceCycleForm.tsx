import React, { FC, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
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
  SchemaActions,
} from '@pma/store';
import { Trans, useTranslation } from 'components/Translation';
import { configEntriesMetaSelector, configEntriesSelector } from '@pma/store/src/selectors/config-entries';
import {
  durationOptions,
  getFormsByProcessTemplateUuidSelector,
  getProcessTemplateByUuidSelector,
  getTimelinePointsByUuidSelector,
  getTimelinePointsReviewTypesByUuidSelector,
  getType,
} from '@pma/store/src/selectors/processTemplate';
import useDispatch from 'hooks/useDispatch';
import { createPMCycleSchema } from './schema';
import {
  getConfigEntriesByPerformanceCycle,
  getFormsByPerformanceCycleUuidSelector,
  getTimelinePointsByPerformanceCycleUuidSelector,
  getTimelinePointsReviewTypesByPerformanceCycleUuidSelector,
} from '@pma/store/src/selectors/performance-cycle';
import { TileWrapper } from 'components/Tile';
import { GenericItemField } from 'components/GenericForm';
import { Input, Item, Radio, Select } from 'components/Form';
import TemplatesModal from './TemplatesModal';
import { Page } from '../../../pages';
import { ObjectiveModal } from '../../Objectives/components/ObjectiveModal/ObjectiveModal';

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
  const history = useHistory();

  const [entryConfigUuid, setEntryConfigUuid] = useState('');
  const [options11, setOptions11] = useState([]);
  const [options2, setOptions2] = useState([]);
  const [options12, setOptions12] = useState([]);
  const [options13, setOptions13] = useState([]);
  const [options131, setOptions131] = useState([]);
  const [options14, setOptions14] = useState([]);
  const [processSelected, setProcessSelected] = useState(false);
  const [entryConfigKey, setEntryConfigKey] = useState('');
  const [isTemplatesModalOpen, showTemplatesModal] = useState(false);
  const [processTemplateName, setProcessTemplateName] = useState('');
  const [selectedForm, setSelectedForm] = useState('');

  const dispatch = useDispatch();

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(createPMCycleSchema),
  });
  const { getValues, setValue, reset, watch, handleSubmit } = methods;

  const watchStartTime = watch(['startTime']);

  const { data } = useSelector(configEntriesSelector) || {};
  const processTemplate = useSelector(getProcessTemplateByUuidSelector(processSelected));
  const timelinePoints = useSelector(getTimelinePointsByUuidSelector(processSelected));
  const timelinePointsReviewTypes = useSelector(getTimelinePointsReviewTypesByUuidSelector(processSelected));
  const formsByPerformanceCycleUuid = useSelector(getFormsByPerformanceCycleUuidSelector(performanceCycleUuid));
  const formsProcessTemplate = useSelector(getFormsByProcessTemplateUuidSelector(processSelected));
  const { loaded } = useSelector(configEntriesMetaSelector) || {};
  const { configEntryItem, formDataToFillObj, performanceCycleItem } = useSelector(
    getConfigEntriesByPerformanceCycle(performanceCycleUuid),
  );

  const timelinePointsFromPMCycle = useSelector(getTimelinePointsByPerformanceCycleUuidSelector(performanceCycleUuid));
  const timelinePointsReviewTypesFromPMCycle = useSelector(
    getTimelinePointsReviewTypesByPerformanceCycleUuidSelector(performanceCycleUuid),
  );

  useEffect(() => {
    if (watchStartTime?.length > 0 && watchStartTime?.[0])
      setValue('endTime', getDate(addYear(new Date(watchStartTime[0]))));
  }, [watchStartTime]);

  useEffect(() => {
    dispatch(SchemaActions.getSchema({ colleagueUuid }));
  }, []);

  useEffect(() => {
    if (!loaded) {
      dispatch(ConfigEntriesActions.getConfigEntries());
    }
  }, [loaded]);

  useEffect(() => {
    if (!loaded) {
      dispatch(ProcessTemplateActions.getProcessTemplate());
    }
  }, [loaded]);

  const getItems = (params) => {
    dispatch(ConfigEntriesActions.getConfigEntriesByUuid({ uuid: params.value }));
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
  useEffect(() => {
    if (timelinePoints) {
      const currentDate = new Date();
      reset({
        ...processTemplate,
        ...processTemplate?.cycle,
        ...processTemplate?.cycle?.properties,
        startTime: getDate(currentDate),
        endTime: getDate(addYear(currentDate)),
        pm_cycle_before_start_number: processTemplate?.cycle?.properties?.pm_cycle_before_start?.[1],
        pm_cycle_before_start_type: getType(processTemplate?.cycle?.properties?.pm_cycle_before_start),
        pm_cycle_before_end_number: processTemplate?.cycle?.properties?.pm_cycle_before_end?.[1],
        pm_cycle_before_end_type: getType(processTemplate?.cycle?.properties?.pm_cycle_before_end),
        ...timelinePoints,
      });
    }
  }, [processTemplate]);

  useEffect(() => {
    setProcessSelected(performanceCycleItem?.template.uuid);
    setEntryConfigKey(performanceCycleItem?.entryConfigKey);
  }, [performanceCycleItem]);

  useEffect(() => {
    if (performanceCycleItem) {
      setProcessTemplateName(performanceCycleItem?.template?.fileName);
      reset({
        ...formDataToFillObj,
        ...performanceCycleItem,
        ...performanceCycleItem?.metadata?.cycle?.properties,
        startTime: performanceCycleItem?.startTime?.substr(0, 10),
        endTime: performanceCycleItem?.endTime?.substr(0, 10),
        pm_cycle_before_start_number: performanceCycleItem?.metadata?.cycle?.properties?.pm_cycle_before_start?.[1],
        pm_cycle_before_start_type: getType(performanceCycleItem?.metadata?.cycle?.properties?.pm_cycle_before_start),
        pm_cycle_before_end_number: performanceCycleItem?.metadata?.cycle?.properties?.pm_cycle_before_end?.[1],
        pm_cycle_before_end_type: getType(performanceCycleItem?.metadata?.cycle?.properties?.pm_cycle_before_end),
        ...timelinePointsFromPMCycle,
      });
    }
  }, [performanceCycleItem]);

  useEffect(() => {
    if (entryConfigUuid) {
      getItems({ value: entryConfigUuid });
    }
  }, [entryConfigUuid]);

  function getValue(type) {
    return durationOptions.find((el) => el.label === type)?.value;
  }

  function getData() {
    const {
      name,
      pm_cycle_before_start_type,
      pm_cycle_before_start_number,
      pm_cycle_before_end_type,
      pm_cycle_before_end_number,
      pm_cycle_max,
      pm_cycle_start_time,
      pm_cycle_type,
      pm_type,
      startTime,
      endTime,
      ...rest
    } = getValues();

    const cycle_reviews = Object.keys(rest)
      .filter((key) => key.includes('cyclereviews__'))
      .reduce(
        // @ts-ignore
        (prev, key) => {
          const [, type, newKey, isDuration] = key.split('__');
          let value;
          if (isDuration === 'number' || isDuration === 'type') {
            value = `P${rest[`cyclereviews__${type}__${newKey}__number`]}${getValue(
              rest[`cyclereviews__${type}__${newKey}__type`],
            )}`;
          } else {
            value = rest[key];
          }
          // @ts-ignore
          if (prev.types.includes(type)) {
            return {
              result: [
                ...prev.result.map((item) => {
                  // @ts-ignore
                  if (item?.pm_review_type === type) {
                    // @ts-ignore
                    return { ...item, [newKey]: value };
                  }
                  return item;
                }),
              ],
              types: prev.types,
            };
          } else {
            return {
              result: [...prev.result, { pm_review_type: type, [newKey]: value }],
              types: [...prev.types, type],
            };
          }
        },
        { result: [], types: [] },
      );

    const pm_cycle_before_start = `P${pm_cycle_before_start_number}${getValue(pm_cycle_before_start_type)}`;
    const pm_cycle_before_end = `P${pm_cycle_before_end_number}${getValue(pm_cycle_before_end_type)}`;

    return {
      data: {
        ...(performanceCycleUuid !== 'new' && { uuid: performanceCycleUuid }),
        entryConfigKey: entryConfigKey,
        templateUUID: processSelected,
        name: name,
        createdBy: {
          uuid: colleagueUuid,
        },
        status: 'ACTIVE',
        type: 'FISCAL',
        startTime: new Date(startTime).toISOString(),
        endTime: new Date(endTime).toISOString(),
        properties: {
          pm_cycle_before_end,
          pm_cycle_before_start,
          pm_cycle_max,
          pm_cycle_start_time,
          pm_cycle_type,
          pm_type,
        },
        jsonMetadata: null,
        metadata: {
          cycle: {
            type: 'ELEMENT',
            properties: {
              pm_cycle_before_end,
              pm_cycle_before_start,
              pm_cycle_max,
              pm_cycle_start_time,
              pm_cycle_type,
              pm_type,
            },
            cycleType: 'FISCAL',
            // @ts-ignore
            timelinePoints: cycle_reviews.result.map(({ description, ...rest }) => ({
              type: 'REVIEW',
              description,
              properties: {
                ...rest,
              },
            })),
          },
        },
      },
    };
  }

  const onSaveDraft = () => {
    const data = getData();
    if (performanceCycleUuid !== 'new') {
      return dispatch(PerformanceCycleActions.updatePerformanceCycle(data));
    }
    dispatch(PerformanceCycleActions.createPerformanceCycle(data));
    history.push(`/${Page.PERFORMANCE_CYCLE}`);
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
    showTemplatesModal(false);
    dispatch(ProcessTemplateActions.getProcessTemplateMetadata({ fileUuid: value }));
    setProcessSelected(value);
  };

  const reviewTypes = timelinePointsReviewTypes || timelinePointsReviewTypesFromPMCycle;

  /*---------Render---------*/
  // @ts-ignore
  const forms = formsProcessTemplate || formsByPerformanceCycleUuid;
  return (
    <form className={css({ marginTop: '32px' })}>
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
        <GenericItemField
          name={`name`}
          methods={methods}
          Wrapper={({ children }) => (
            <Item label='Cycle name' withIcon={false}>
              {children}
            </Item>
          )}
          Element={Input}
          placeholder={'Enter performance cycle name'}
        />
        <GenericItemField
          name={`level1`}
          methods={methods}
          Wrapper={({ children }) => (
            <Item label='Level 1' withIcon={false}>
              {children}
            </Item>
          )}
          Element={Select}
          /*Element={(props) => <input type={'text'} {...props} />}*/
          options={data.map((item) => {
            return { value: item.uuid, label: item.name };
          })}
          placeholder={'- Select organization level -   '}
          onChange={(_, data) => {
            setOptions11(data);
            getItems({ value: data });
          }}
        />
        <GenericItemField
          name={`level2`}
          methods={methods}
          Wrapper={({ children }) => (
            <Item label='Level 2' withIcon={false}>
              {children}
            </Item>
          )}
          Element={Select}
          options={options2}
          placeholder={'- Select organization level -   '}
          onChange={(_, value) => setOptions12(value)}
        />
        <GenericItemField
          name={`level3`}
          methods={methods}
          Wrapper={({ children }) => (
            <Item label='Level 3' withIcon={false}>
              {children}
            </Item>
          )}
          Element={Select}
          options={options13}
          placeholder={'- Select organization level - '}
          onChange={(_, value) => {
            setOptions131(value);
          }}
        />
        <GenericItemField
          name={`entryConfigKey`}
          methods={methods}
          Wrapper={({ children }) => (
            <Item label='Level 4' withIcon={false}>
              {children}
            </Item>
          )}
          Element={Select}
          options={options14}
          placeholder={'- Select organization level - '}
          onChange={(_, value) => setEntryConfigKey(value)}
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
          ...(!processSelected && { color: '#E5E5E5' }),
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
        <div className={`${processSelected ? css(containerVisible) : css(container)}`}>
          {/*<div className={css(item)}>
            <div>Type</div>
            <div className={css({ fontWeight: 'normal' })}>Fiscal year</div>
          </div>*/}

          <div className={css(item)}>
            <GenericItemField
              name={`startTime`}
              methods={methods}
              Wrapper={({ children }) => (
                <Item label='Start day' withIcon={false}>
                  {children}
                </Item>
              )}
              Element={(props) => <Input type={'date'} {...props} />}
            />
          </div>
          <div className={css(item)}>
            <GenericItemField
              name={`endTime`}
              methods={methods}
              Wrapper={({ children }) => (
                <Item label='End day' withIcon={false}>
                  {children}
                </Item>
              )}
              Element={(props) => <Input type={'date'} readonly={true} {...props} />}
            />
          </div>
          <div className={css(item)}>
            <GenericItemField
              name={`pm_cycle_max`}
              methods={methods}
              Wrapper={({ children }) => (
                <Item label='Recurrence' withIcon={false}>
                  {children}
                </Item>
              )}
              Element={Input}
            />
          </div>

          <div className={css(item)}>
            <Item label='Notifications' withIcon={false} />
            <div>
              <GenericItemField
                name={`pm_cycle_before_start`}
                methods={methods}
                Wrapper={({ children }) => (
                  <Item label='Before start' withIcon={false}>
                    {children}
                  </Item>
                )}
                Element={(props) => (
                  <div className={css({ display: 'flex', gap: '8px' })}>
                    <GenericItemField
                      name={`pm_cycle_before_start_number`}
                      methods={methods}
                      Element={(props) => <Input type={'number'} {...props} />}
                    />
                    <GenericItemField
                      name={`pm_cycle_before_start_type`}
                      methods={methods}
                      Element={Select}
                      options={durationOptions}
                    />
                  </div>
                )}
              />
            </div>
            <div className={css(item)}>
              <GenericItemField
                name={`pm_cycle_before_end`}
                methods={methods}
                Wrapper={({ children }) => (
                  <Item label='Before end' withIcon={false}>
                    {children}
                  </Item>
                )}
                Element={(props) => (
                  <div className={css({ display: 'flex', gap: '8px' })}>
                    <GenericItemField
                      name={`pm_cycle_before_end_number`}
                      methods={methods}
                      Element={(props) => <Input type={'number'} {...props} />}
                    />
                    <GenericItemField
                      name={`pm_cycle_before_end_type`}
                      methods={methods}
                      Element={Select}
                      options={durationOptions}
                    />
                  </div>
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
          ...(!processSelected && { color: '#E5E5E5' }),
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
            processSelected
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
          <div className={css(item, { maxWidth: '100px' })}>
            <Item label='Min' withIcon={false} marginBot={false} />
          </div>
          <div className={css(item, { maxWidth: '100px' })}>
            <Item label='Max' withIcon={false} marginBot={false} />
          </div>
          {reviewTypes?.map((pm_review_type) => {
            return (
              <>
                <div className={css(item)}>
                  <GenericItemField
                    name={`cyclereviews__${pm_review_type}__description`}
                    methods={methods}
                    Element={Input}
                  />
                </div>
                <div className={css(item)} hidden={true}>
                  <GenericItemField
                    name={`cyclereviews__${pm_review_type}__pm_review_type`}
                    methods={methods}
                    Element={Input}
                  />
                </div>
                <div className={css({ display: 'flex', gap: '8px' })}>
                  <div className={css(item)}>
                    <GenericItemField
                      name={`cyclereviews__${pm_review_type}__pm_review_duration__number`}
                      methods={methods}
                      Element={(props) => <Input type={'number'} {...props} />}
                    />
                  </div>
                  <div className={css(item)}>
                    <GenericItemField
                      name={`cyclereviews__${pm_review_type}__pm_review_duration__type`}
                      methods={methods}
                      Element={Select}
                      options={durationOptions}
                    />
                  </div>
                </div>
                <div className={css({ display: 'flex', gap: '8px' })}>
                  <div className={css(item)}>
                    <GenericItemField
                      name={`cyclereviews__${pm_review_type}__pm_review_before_start__number`}
                      methods={methods}
                      Element={(props) => <Input type={'number'} {...props} />}
                    />
                  </div>
                  <div className={css(item)}>
                    <GenericItemField
                      name={`cyclereviews__${pm_review_type}__pm_review_before_start__type`}
                      methods={methods}
                      Element={Select}
                      options={durationOptions}
                    />
                  </div>
                </div>
                <div className={css({ display: 'flex', gap: '8px' })}>
                  <div className={css(item)}>
                    <GenericItemField
                      name={`cyclereviews__${pm_review_type}__pm_review_before_end__number`}
                      methods={methods}
                      Element={(props) => <Input type={'number'} {...props} />}
                    />
                  </div>
                  <div className={css(item)}>
                    <GenericItemField
                      name={`cyclereviews__${pm_review_type}__pm_review_before_end__type`}
                      methods={methods}
                      Element={Select}
                      options={durationOptions}
                    />
                  </div>
                </div>
                {pm_review_type === 'objective' ? (
                  <>
                    <div className={css(item, { maxWidth: '100px' })}>
                      <GenericItemField
                        name={`cyclereviews__${pm_review_type}__pm_review_min`}
                        methods={methods}
                        Element={Input}
                      />
                    </div>
                    <div className={css(item, { maxWidth: '100px' })}>
                      <GenericItemField
                        name={`cyclereviews__${pm_review_type}__pm_review_max`}
                        methods={methods}
                        Element={Input}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className={css(item, { maxWidth: '100px' })} />
                    <div className={css(item, { maxWidth: '100px' })} />
                  </>
                )}
              </>
            );
          })}
        </div>
      </TileWrapper>

      {/*------------4. Cycle notification-------------*/}
      <TileWrapper
        customStyle={{
          margin: '8px',
          padding: '25px',
          maxWidth: '1300px',
          ...(!processSelected && { color: '#E5E5E5' }),
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
        <div className={`${processSelected ? css(containerVisible) : css(container)}`}>
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
                        type='radio'
                        name='status'
                        value={form?.displayName}
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
              if (i?.displayName !== selectedForm) return null;
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
        <Button mode='inverse' styles={[btnStyle({ theme }) as Styles]} onPress={handleSubmit(onSaveDraft)}>
          Save as draft
        </Button>
        {/*@ts-ignore*/}
        <Button styles={[btnStyle({ theme }) as Styles]} onPress={handleSubmit(onPublish)}>
          Publish
        </Button>
      </div>
    </form>
  );
};

const btnStyle: Rule = ({ theme }) => ({
  fontSize: '16px',
  border: '1px solid rgb(0, 83, 159)',
  minWidth: '200px',
  marginLeft: '8px',
});

// @ts-ignore
const item: Rule = ({ theme }) => ({
  fontStyle: 'normal',
  fontWeight: theme.font.weight.bold,
  fontSize: '16px',
  lineHeight: '24px',
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
