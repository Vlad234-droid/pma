import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { Button, Rule, useStyle } from '@dex-ddl/core';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  colleagueUUIDSelector,
  ConfigEntriesActions,
  getObjectiveSchema,
  getObjectivesStatusSelector,
  isObjectivesInStatus,
  ObjectiveActions,
  objectivesMetaSelector,
  objectivesSelector,
  PerformanceCycleActions,
  ProcessTemplateActions,
  SchemaActions,
} from '@pma/store';
import { useTranslation } from 'components/Translation';
import { configEntriesMetaSelector, configEntriesSelector } from '@pma/store/src/selectors/config-entries';
import { getProcessTemplateSelector } from '@pma/store/src/selectors/processTemplate';
import useDispatch from 'hooks/useDispatch';
import { createPMCycleSchema } from './schema';
import { getConfigEntriesByPerformanceCycle } from '@pma/store/src/selectors/performance-cycle';
import { TileWrapper } from 'components/Tile';
import { GenericItemField } from 'components/GenericForm';
import { Input, Item, Select } from 'components/Form';
import TemplatesModal from './TemplatesModal';
import { Accordion } from '../../Objectives';

export const PerformanceCycleForm: FC = () => {
  const params = useParams();
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const mappedObjectives: any = [];

  const { t } = useTranslation();

  const [objectives, setObjectives] = useState([]);

  const {
    components = [],
    meta: { loaded: schemaLoaded = false },
    markup = { max: 0, min: 0 },
  } = useSelector(getObjectiveSchema);

  const formElements = components.filter((component) => component.type != 'text');

  // @ts-ignore
  const { loaded: objectivesLoaded } = useSelector(objectivesMetaSelector);
  const status = useSelector(getObjectivesStatusSelector);
  const { origin } = useSelector(objectivesSelector);
  const isAllObjectivesInSameStatus = useSelector(isObjectivesInStatus(status));

  useEffect(() => {
    dispatch(SchemaActions.getSchema({ colleagueUuid }));
    dispatch(ObjectiveActions.getObjectives({ performanceCycleUuid: '' }));
  }, []);

  useEffect(() => {
    if (objectivesLoaded && schemaLoaded) {
      origin?.forEach((objectiveItem) => {
        const status = objectiveItem.status;
        const objective = objectiveItem?.properties?.mapJson;
        const subTitle = objective['title'] || '';
        const description = objective['description'] || '';
        const explanations = formElements
          .filter(({ key }) => !['title', 'description'].includes(key))
          .map((component) => {
            const { key, label } = component;

            return { title: label, steps: objective[key] ? [objective[key]] : [] };
          });
        mappedObjectives.push({
          id: Number(objectiveItem.number),
          title: `Objective ${objectiveItem.number}`,
          subTitle: subTitle,
          description: description,
          explanations,
          status,
        });
      });
      setObjectives(mappedObjectives);
    }
  }, [objectivesLoaded, schemaLoaded]);

  const { css, theme } = useStyle();

  const { data } = useSelector(configEntriesSelector) || {};
  const processTemplates = useSelector(getProcessTemplateSelector) || {};
  const { loaded } = useSelector(configEntriesMetaSelector) || {};

  const dispatch = useDispatch();

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

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(createPMCycleSchema),
  });
  const {
    formState: { errors, isValid },
    getValues,
    setValue,
    reset,
    trigger,
  } = methods;

  const getItems = (params) => {
    dispatch(ConfigEntriesActions.getConfigEntriesByUuid({ uuid: params.value }));
  };

  const performanceCycleUuid = params['performanceCycleUuid'];
  const { configEntryItem, formDataToFillObj, performanceCycleItem } = useSelector(
    getConfigEntriesByPerformanceCycle(performanceCycleUuid),
  );
  const [entryConfigUuid, setEntryConfigUuid] = useState('');

  if (configEntryItem && !entryConfigUuid) {
    setEntryConfigUuid(configEntryItem.uuid);
  }

  useEffect(() => {
    reset({
      ...formDataToFillObj,
      ...performanceCycleItem,
      ...performanceCycleItem?.metadata?.cycle?.timelinePoints?.[0].properties,
    });
  }, [performanceCycleItem]);

  useEffect(() => {
    dispatch(PerformanceCycleActions.getPerformanceCycleByUuid({ performanceCycleUuid }));
  }, []);

  useEffect(() => {
    if (entryConfigUuid) {
      getItems({ value: entryConfigUuid });
    }
  }, [entryConfigUuid]);

  const onSaveDraft = () => {
    const {
      name,
      template_uuid,
      pm_cycle_before_end,
      pm_cycle_before_start,
      pm_cycle_max,
      pm_cycle_start_time,
      pm_cycle_type,
      pm_type,
      startTime,
      endTime,
    } = getValues();
    debugger;
    const temp = {
      data: {
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
        properties: null,
        jsonMetadata: null,
        metadata: {
          cycle: {
            type: 'ELEMENT',
            properties: {},
            cycleType: 'FISCAL',
            timelinePoints: [
              {
                type: 'ELEMENT',
                properties: {
                  pm_cycle_before_end,
                  pm_cycle_before_start,
                  pm_cycle_max,
                  pm_cycle_start_time,
                  pm_cycle_type,
                  pm_type,
                },
              },
            ],
          },
        },
      },
    };
    dispatch(PerformanceCycleActions.createPerformanceCycle(temp));
  };

  //const [options1, setOptions1] = useState([]);
  const [options11, setOptions11] = useState([]);
  const [options2, setOptions2] = useState([]);
  const [options12, setOptions12] = useState([]);
  const [options13, setOptions13] = useState([]);
  const [options131, setOptions131] = useState([]);
  const [options14, setOptions14] = useState([]);

  useEffect(() => {
    setOptions2(
      data
        .filter((item) => {
          return item.uuid === options11;
        })
        .reduce((prev, item) => {
          return [
            ...prev,
            ...item.children?.map((child) => ({
              value: child.uuid,
              label: child.name,
              children: child.children,
            })),
          ];
        }, []),
    );
  }, [options11, data]);

  useEffect(() => {
    // @ts-ignore
    setOptions13(
      options2
        .filter((item) => {
          // @ts-ignore
          return item.value === options12;
        })
        // @ts-ignore
        .reduce((prev, item) => {
          return [
            ...prev,
            // @ts-ignore
            ...item.children?.map((child) => ({
              value: child.uuid,
              label: child.name,
              children: child.children,
            })),
          ];
        }, []),
    );
  }, [options12, options2]);

  useEffect(() => {
    setOptions14(
      options13
        ?.filter((item) => {
          // @ts-ignore
          return item.value === options131;
        })
        // @ts-ignore
        ?.reduce((prev, item) => {
          // @ts-ignore
          if (item?.children)
            return [
              ...prev,
              // @ts-ignore
              ...item?.children?.map((child) => ({
                value: child.compositeKey,
                label: child.name,
              })),
            ];
          return prev;
        }, []),
    );
  }, [options131, options13, options12]);

  const [processSelected, setProcessSelected] = useState(false);
  const [entryConfigKey, setEntryConfigKey] = useState('');

  const [isTemplatesModalOpen, showTemplatesModal] = useState(false);

  const closeTemplatesModal = () => {
    showTemplatesModal(false);
  };

  // @ts-ignore
  return (
    <form className={css({ marginTop: '32px' })}>
      <TileWrapper customStyle={{ margin: '8px', padding: '25px', maxWidth: '900px' }}>
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
          options={data.map((item) => {
            return { value: item.uuid, label: item.name };
          })}
          placeholder={'- Select organization level -   '}
          onChange={(_, data) => {
            console.log({ data });
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
          value={formDataToFillObj['level2'] || ''}
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
          value={formDataToFillObj['level3'] || ''}
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
        <GenericItemField
          name={`template_uuid`}
          methods={methods}
          Wrapper={({ children }) => (
            <Item label='Process' withIcon={false}>
              {children}
            </Item>
          )}
          Element={Select}
          options={processTemplates || []}
          placeholder={'- Select process - '}
          onChange={(_, value) => {
            // TODO: fetch
            dispatch(ProcessTemplateActions.getProcessTemplateMetadata({ fileUuid: value }));
            setProcessSelected(value);
          }}
        />

        <button type='button' onClick={() => showTemplatesModal(true)}>
          Choose Template
        </button>

        {isTemplatesModalOpen && <TemplatesModal closeModal={closeTemplatesModal} />}

        {/*<Button mode='inverse'>Import process</Button>*/}
      </TileWrapper>
      <TileWrapper
        customStyle={{
          margin: '8px',
          padding: '25px',
          maxWidth: '900px',
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
          <div className={css(item)}>
            <div>Type</div>
            <div className={css({ fontWeight: 'normal' })}>Fiscal year</div>
          </div>

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
              Element={(props) => <Input type={'date'} {...props} />}
            />
          </div>
          <div className={css(item)}>
            <GenericItemField
              name={`Recurrence`}
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
            <GenericItemField
              name={`min_objectives_number`}
              methods={methods}
              Wrapper={({ children }) => (
                <Item label='Min objectives number' withIcon={false}>
                  {children}
                </Item>
              )}
              Element={Input}
            />
          </div>
          <div className={css(item)}>
            <GenericItemField
              name={`pm_cycle_max`}
              methods={methods}
              Wrapper={({ children }) => (
                <Item label='Max objectives number' withIcon={false}>
                  {children}
                </Item>
              )}
              Element={Input}
            />
          </div>
        </div>
      </TileWrapper>
      <TileWrapper
        customStyle={{
          margin: '8px',
          padding: '25px',
          maxWidth: '900px',
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
        <div className={`${processSelected ? css(containerVisible) : css(container)}`}>
          <div className={css(item)}>
            <GenericItemField
              name={`type_of_reviews`}
              methods={methods}
              Wrapper={({ children }) => (
                <Item label='Type of reviews' withIcon={false}>
                  {children}
                </Item>
              )}
              Element={Input}
            />
          </div>
          <div className={css(item)}>
            <GenericItemField
              name={`length_of_reviews`}
              methods={methods}
              Wrapper={({ children }) => (
                <Item label='Length of reviews' withIcon={false}>
                  {children}
                </Item>
              )}
              Element={Input}
            />
          </div>
        </div>
      </TileWrapper>
      <TileWrapper
        customStyle={{
          margin: '8px',
          padding: '25px',
          maxWidth: '900px',
          ...(!processSelected && { color: '#E5E5E5' }),
        }}
      >
        <div
          className={css({
            fontWeight: 'bold',
            fontSize: '20px',
          })}
        >
          4. Cycle notification
        </div>
        <div className={`${processSelected ? css(containerVisible) : css(container)}`}>
          <div className={css(item)}>
            <GenericItemField
              name={`pm_cycle_before_start`}
              methods={methods}
              Wrapper={({ children }) => (
                <Item label='Before cycle start' withIcon={false}>
                  {children}
                </Item>
              )}
              Element={Input}
            />
          </div>
          <div className={css(item)}>
            <GenericItemField
              name={`pm_cycle_before_end`}
              methods={methods}
              Wrapper={({ children }) => (
                <Item label='Before cycle end' withIcon={false}>
                  {children}
                </Item>
              )}
              Element={Input}
            />
          </div>
          <div className={css(item)}>
            <GenericItemField
              name={`before_review`}
              methods={methods}
              Wrapper={({ children }) => (
                <Item label='Before review' withIcon={false}>
                  {children}
                </Item>
              )}
              Element={Input}
            />
          </div>
        </div>
      </TileWrapper>
      <TileWrapper
        customStyle={{
          margin: '8px',
          padding: '25px',
          maxWidth: '900px',
          ...(!processSelected && { color: '#E5E5E5' }),
        }}
      >
        <div
          className={css({
            fontWeight: 'bold',
            fontSize: '20px',
          })}
        >
          5. Forms builder
        </div>
        <div className={`${processSelected ? css(containerVisible) : css(container)}`}>
          <Accordion objectives={objectives} canShowStatus={!isAllObjectivesInSameStatus} />
        </div>
      </TileWrapper>
      <div className={css({ display: 'flex', justifyContent: 'flex-end', paddingBottom: '100px', maxWidth: '900px' })}>
        {/*@ts-ignore*/}
        <Button mode='inverse' styles={[btnStyle({ theme }) as Styles]} onPress={onSaveDraft}>
          Save as draft
        </Button>
        {/*@ts-ignore*/}
        <Button>Publish</Button>
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
  minWidth: '200px',
  display: 'grid',
  paddingRight: '20px',
  paddingTop: '14px',
  flex: '1 1 0',
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
  alignItems: 'center',
});
