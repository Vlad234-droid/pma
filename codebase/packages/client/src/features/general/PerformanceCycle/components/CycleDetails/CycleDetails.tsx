import React, { FC } from 'react';
import { Button, CreateRule, Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { FieldValues, UseFormSetValue, UseFormWatch } from 'react-hook-form';

import { DurationPicker } from 'components/Form/DurationPicker';
import { Trans, useTranslation } from 'components/Translation';
import { TABLE_WRAPPER } from 'components/Table/Table';
import { Field, Input, Item } from 'components/Form';
import Datepicker from 'components/Datepicker';
import { TileWrapper } from 'components/Tile';
import { Icon } from 'components/Icon';
import { Line } from 'components/Line';

const CycleDetails: FC<Props> = ({ setValue, formValues, canEdit, errors, watch, onOpenForm }) => {
  const { t } = useTranslation();
  const { css, theme } = useStyle();

  const [properties = {}, timelinePoints = []] = watch(['metadata.cycle.properties', 'metadata.cycle.timelinePoints']);

  const hasBeforeStarProperties = properties.pm_cycle_before_start !== undefined;
  const hasBeforeEndProperties = properties.pm_cycle_before_end !== undefined;
  const cycleStartTime = get(properties, 'pm_cycle_start_time');
  const isPropertiesShow = Boolean(Object.values(properties).find((value) => value));

  return (
    <TileWrapper customStyle={customTileStyles}>
      <div className={`${isPropertiesShow ? css(visibleContainerStyle) : css(containerStyle)}`}>
        <div className={css(itemStyle)}>
          <Field
            name={'metadata.cycle.properties.pm_cycle_start_time'}
            setValue={setValue}
            Element={Datepicker}
            Wrapper={({ children }) => (
              <Item
                label={t('start_day', 'Start day')}
                withIcon={false}
                onHover={true}
                customIcon={
                  canEdit && cycleStartTime ? (
                    <Icon
                      graphic={'delete'}
                      onClick={() =>
                        setValue('metadata.cycle.properties.pm_cycle_start_time', undefined, {
                          shouldValidate: true,
                          shouldDirty: true,
                        })
                      }
                    />
                  ) : undefined
                }
              >
                {children}
              </Item>
            )}
            value={cycleStartTime}
            readonly={!canEdit}
          />
        </div>
        <div className={css(itemStyle)}>
          <Field
            name={'metadata.cycle.properties.pm_cycle_end_time'}
            setValue={setValue}
            Element={Datepicker}
            Wrapper={({ children }) => (
              <Item
                label={t('end_day', 'End day')}
                withIcon={false}
                onHover={true}
                customIcon={
                  canEdit && get(formValues, 'metadata.cycle.properties.pm_cycle_end_time') ? (
                    <Icon
                      graphic={'delete'}
                      onClick={() =>
                        setValue('metadata.cycle.properties.pm_cycle_end_time', undefined, {
                          shouldValidate: true,
                          shouldDirty: true,
                        })
                      }
                    />
                  ) : undefined
                }
              >
                {children}
              </Item>
            )}
            error={errors?.metadata?.cycle?.properties?.pm_cycle_end_time?.message}
            value={get(formValues, 'metadata.cycle.properties.pm_cycle_end_time')}
            readonly={!canEdit}
          />
        </div>
        <div className={css(itemStyle)}>
          <Field
            name={'metadata.cycle.properties.pm_cycle_max'}
            setValue={setValue}
            Wrapper={({ children }) => (
              <Item
                label={t('recurrence', 'Recurrence')}
                withIcon={false}
                onHover={true}
                customIcon={
                  canEdit && get(formValues, 'metadata.cycle.properties.pm_cycle_max') ? (
                    <Icon
                      graphic={'delete'}
                      onClick={() =>
                        setValue('metadata.cycle.properties.pm_cycle_max', undefined, {
                          shouldValidate: true,
                          shouldDirty: true,
                        })
                      }
                    />
                  ) : undefined
                }
              >
                {children}
              </Item>
            )}
            Element={Input}
            value={get(formValues, 'metadata.cycle.properties.pm_cycle_max')}
            readonly={!canEdit}
          />
        </div>
      </div>
      <div className={css(visibleContainerStyle)}>
        {(hasBeforeEndProperties || hasBeforeStarProperties) && (
          <div className={css(itemStyle)}>
            <Item label={t('notifications', 'Notifications')} withIcon={false} />
            {hasBeforeStarProperties && (
              <div>
                <Field
                  name={'metadata.cycle.properties.pm_cycle_before_start'}
                  setValue={setValue}
                  Wrapper={({ children }) => (
                    <Item
                      label={t('before_start', 'Before start')}
                      withIcon={false}
                      onHover={true}
                      customIcon={
                        canEdit && get(formValues, 'metadata.cycle.properties.pm_cycle_before_start') ? (
                          <Icon
                            graphic={'delete'}
                            onClick={() =>
                              setValue('metadata.cycle.properties.pm_cycle_before_start', undefined, {
                                shouldValidate: true,
                                shouldDirty: true,
                              })
                            }
                          />
                        ) : undefined
                      }
                    >
                      {children}
                    </Item>
                  )}
                  Element={DurationPicker}
                  formatDuration={true}
                  value={get(formValues, 'metadata.cycle.properties.pm_cycle_before_start')}
                  readonly={!canEdit}
                />
              </div>
            )}
            {hasBeforeEndProperties && (
              <div className={css(itemStyle)}>
                <Field
                  name={'metadata.cycle.properties.pm_cycle_before_end'}
                  setValue={setValue}
                  Wrapper={({ children }) => (
                    <Item
                      label={t('before_end', 'Before end')}
                      withIcon={false}
                      onHover={true}
                      customIcon={
                        get(formValues, 'metadata.cycle.properties.pm_cycle_before_end') && canEdit ? (
                          <Icon
                            graphic={'delete'}
                            onClick={() =>
                              setValue('metadata.cycle.properties.pm_cycle_before_end', undefined, {
                                shouldValidate: true,
                                shouldDirty: true,
                              })
                            }
                          />
                        ) : undefined
                      }
                    >
                      {children}
                    </Item>
                  )}
                  Element={DurationPicker}
                  value={get(formValues, 'metadata.cycle.properties.pm_cycle_before_end')}
                  readonly={!canEdit}
                  formatDuration={true}
                />
              </div>
            )}
          </div>
        )}
      </div>
      <Line styles={{ margin: '8px 0px 32px 0px' }} />

      <div>
        <div data-test-id={TABLE_WRAPPER} className={css(tableContainer)}>
          <div className={css(wrapper)}>
            <div className={css(innerWrapper)}>
              <table className={css(tableStyle)}>
                <thead>
                  <tr className={css(tableTitlesStyle)}>
                    {titles_map.map((title) => (
                      <th key={title} className={css(contentStyle({ readOnly: false }), titleRow)}>
                        <p
                          className={css(tableTitle, {
                            ...(title === 'min' || title === 'max' ? { textAlign: 'start' } : {}),
                          })}
                        >
                          {t(title)}
                        </p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timelinePoints?.map((point: { reviewType: string; type: string; form }, index) => {
                    const isTimeLinePoint = point.type === 'TIMELINE_POINT';
                    const isCalibrationPoint = point.reviewType === 'CALIBRATION';
                    return (
                      <>
                        <tr>
                          <td className={css(contentStyle({ readOnly: true }), descriptionStyle)}>
                            <div className={css(itemStyle, { width: '100%' })}>
                              <Field
                                name={`metadata.cycle.timelinePoints[${index}].description`}
                                setValue={setValue}
                                Element={Input}
                                value={get(formValues, `metadata.cycle.timelinePoints[${index}].description`)}
                                readonly
                                customStyles={{
                                  padding: '10px 0px 10px 6px',
                                  border: '0px',
                                  background: theme.colors.backgroundDark,
                                  ':focus': {
                                    outline: 'none !important',
                                    borderWidth: '0px !important',
                                  },
                                }}
                              />
                            </div>
                          </td>
                          <td
                            className={css(contentStyle({ readOnly: !canEdit || isTimeLinePoint }), descriptionStyle)}
                          >
                            <div className={css(itemStyle, { width: '100%' })}>
                              <Field
                                name={`metadata.cycle.timelinePoints[${index}].properties.pm_review_duration`}
                                setValue={setValue}
                                Element={DurationPicker}
                                formatDuration={true}
                                Wrapper={({ children }) => (
                                  <Item
                                    marginBot={false}
                                    withIcon={false}
                                    onHover={true}
                                    customIcon={
                                      get(
                                        formValues,
                                        `metadata.cycle.timelinePoints[${index}].properties.pm_review_duration`,
                                      ) &&
                                      canEdit &&
                                      !isTimeLinePoint ? (
                                        <Icon
                                          graphic={'delete'}
                                          onClick={() =>
                                            setValue(
                                              `metadata.cycle.timelinePoints[${index}].properties.pm_review_duration`,
                                              undefined,
                                              { shouldValidate: true, shouldDirty: true },
                                            )
                                          }
                                        />
                                      ) : undefined
                                    }
                                  >
                                    {children}
                                  </Item>
                                )}
                                value={get(
                                  formValues,
                                  `metadata.cycle.timelinePoints[${index}].properties.pm_review_duration`,
                                )}
                                readonly={!canEdit || isTimeLinePoint}
                                customStyles={{
                                  ...{
                                    padding: '10px 35px 10px 6px',
                                    height: '36px',
                                    borderWidth: '0px',
                                    ':focus': {
                                      outline: 'none !important',
                                      borderWidth: '0px !important',
                                    },
                                  },
                                  ...((!canEdit || isTimeLinePoint) && {
                                    background: theme.colors.backgroundDark,
                                  }),
                                }}
                              />
                            </div>
                          </td>

                          <td
                            className={css(
                              contentStyle({ readOnly: !canEdit || isCalibrationPoint || isTimeLinePoint }),
                              descriptionStyle,
                            )}
                          >
                            <div className={css(itemStyle, { width: '100%' })}>
                              <Field
                                name={`metadata.cycle.timelinePoints[${index}].properties.pm_review_lock`}
                                setValue={setValue}
                                Element={DurationPicker}
                                formatDuration={true}
                                Wrapper={({ children }) => (
                                  <Item
                                    withIcon={false}
                                    marginBot={false}
                                    onHover={true}
                                    customIcon={
                                      get(
                                        formValues,
                                        `metadata.cycle.timelinePoints[${index}].properties.pm_review_lock`,
                                      ) &&
                                      canEdit &&
                                      (!isCalibrationPoint || !isTimeLinePoint) ? (
                                        <Icon
                                          graphic={'delete'}
                                          onClick={() =>
                                            setValue(
                                              `metadata.cycle.timelinePoints[${index}].properties.pm_review_lock`,
                                              undefined,
                                              { shouldValidate: true, shouldDirty: true },
                                            )
                                          }
                                        />
                                      ) : undefined
                                    }
                                  >
                                    {children}
                                  </Item>
                                )}
                                value={get(
                                  formValues,
                                  `metadata.cycle.timelinePoints[${index}].properties.pm_review_lock`,
                                )}
                                readonly={!canEdit || isCalibrationPoint || isTimeLinePoint}
                                customStyles={{
                                  padding: '10px 0px 10px 6px',
                                  border: '0px',
                                  ...((!canEdit || isCalibrationPoint || isTimeLinePoint) && {
                                    background: theme.colors.backgroundDark,
                                  }),
                                  ':focus': {
                                    outline: 'none !important',
                                    borderWidth: '0px !important',
                                  },
                                }}
                              />
                            </div>
                          </td>

                          <td
                            className={css(
                              contentStyle({ readOnly: !canEdit || isCalibrationPoint || isTimeLinePoint }),
                              descriptionStyle,
                            )}
                          >
                            <div className={css(itemStyle, { width: '100%' })}>
                              <Field
                                name={`metadata.cycle.timelinePoints[${index}].properties.pm_review_overdue`}
                                setValue={setValue}
                                Element={DurationPicker}
                                formatDuration={true}
                                Wrapper={({ children }) => (
                                  <Item
                                    withIcon={false}
                                    onHover={true}
                                    marginBot={false}
                                    customIcon={
                                      get(
                                        formValues,
                                        `metadata.cycle.timelinePoints[${index}].properties.pm_review_overdue`,
                                      ) &&
                                      canEdit &&
                                      (!isCalibrationPoint || !isTimeLinePoint) ? (
                                        <Icon
                                          graphic={'delete'}
                                          onClick={() =>
                                            setValue(
                                              `metadata.cycle.timelinePoints[${index}].properties.pm_review_overdue`,
                                              undefined,
                                              { shouldValidate: true, shouldDirty: true },
                                            )
                                          }
                                        />
                                      ) : undefined
                                    }
                                  >
                                    {children}
                                  </Item>
                                )}
                                value={get(
                                  formValues,
                                  `metadata.cycle.timelinePoints[${index}].properties.pm_review_overdue`,
                                )}
                                readonly={!canEdit || isCalibrationPoint || isTimeLinePoint}
                                customStyles={{
                                  padding: '10px 0px 10px 6px',
                                  border: '0px',
                                  ...((!canEdit || isCalibrationPoint || isTimeLinePoint) && {
                                    background: theme.colors.backgroundDark,
                                  }),
                                  ':focus': {
                                    outline: 'none !important',
                                    borderWidth: '0px !important',
                                  },
                                }}
                              />
                            </div>
                          </td>

                          <td
                            className={css(contentStyle({ readOnly: !canEdit || isTimeLinePoint }), descriptionStyle)}
                          >
                            <div className={css(itemStyle, { width: '100%' })}>
                              <Field
                                name={`metadata.cycle.timelinePoints[${index}].properties.pm_review_start_delay`}
                                setValue={setValue}
                                Element={DurationPicker}
                                formatDuration={true}
                                Wrapper={({ children }) => (
                                  <Item
                                    withIcon={false}
                                    onHover={true}
                                    marginBot={false}
                                    customIcon={
                                      get(
                                        formValues,
                                        `metadata.cycle.timelinePoints[${index}].properties.pm_review_start_delay`,
                                      ) &&
                                      canEdit &&
                                      !isTimeLinePoint ? (
                                        <Icon
                                          graphic={'delete'}
                                          onClick={() =>
                                            setValue(
                                              `metadata.cycle.timelinePoints[${index}].properties.pm_review_start_delay`,
                                              undefined,
                                              { shouldValidate: true, shouldDirty: true },
                                            )
                                          }
                                        />
                                      ) : undefined
                                    }
                                  >
                                    {children}
                                  </Item>
                                )}
                                value={get(
                                  formValues,
                                  `metadata.cycle.timelinePoints[${index}].properties.pm_review_start_delay`,
                                )}
                                readonly={!canEdit || isTimeLinePoint}
                                customStyles={{
                                  padding: '10px 0px 10px 6px',
                                  border: '0px',
                                  ...((!canEdit || isTimeLinePoint) && {
                                    background: theme.colors.backgroundDark,
                                  }),
                                  ':focus': {
                                    outline: 'none !important',
                                    borderWidth: '0px !important',
                                  },
                                }}
                              />
                            </div>
                          </td>

                          <td
                            className={css(contentStyle({ readOnly: !canEdit || isTimeLinePoint }), descriptionStyle)}
                          >
                            <div className={css(itemStyle, { width: '100%' })}>
                              <Field
                                name={`metadata.cycle.timelinePoints[${index}].properties.pm_review_before_start`}
                                setValue={setValue}
                                Element={DurationPicker}
                                formatDuration={true}
                                Wrapper={({ children }) => (
                                  <Item
                                    withIcon={false}
                                    onHover={true}
                                    marginBot={false}
                                    customIcon={
                                      get(
                                        formValues,
                                        `metadata.cycle.timelinePoints[${index}].properties.pm_review_before_start`,
                                      ) &&
                                      canEdit &&
                                      !isTimeLinePoint ? (
                                        <Icon
                                          graphic={'delete'}
                                          onClick={() =>
                                            setValue(
                                              `metadata.cycle.timelinePoints[${index}].properties.pm_review_before_start`,
                                              undefined,
                                              { shouldValidate: true, shouldDirty: true },
                                            )
                                          }
                                        />
                                      ) : undefined
                                    }
                                  >
                                    {children}
                                  </Item>
                                )}
                                value={get(
                                  formValues,
                                  `metadata.cycle.timelinePoints[${index}].properties.pm_review_before_start`,
                                )}
                                readonly={!canEdit || isTimeLinePoint}
                                customStyles={{
                                  padding: '10px 0px 10px 6px',
                                  border: '0px',
                                  ...((!canEdit || isTimeLinePoint) && {
                                    background: theme.colors.backgroundDark,
                                  }),
                                  ':focus': {
                                    outline: 'none !important',
                                    borderWidth: '0px !important',
                                  },
                                }}
                              />
                            </div>
                          </td>

                          <td
                            className={css(contentStyle({ readOnly: !canEdit || isTimeLinePoint }), descriptionStyle)}
                          >
                            <div className={css(itemStyle, { width: '100%' })}>
                              <Field
                                name={`metadata.cycle.timelinePoints[${index}].properties.pm_review_before_end`}
                                setValue={setValue}
                                Element={DurationPicker}
                                formatDuration={true}
                                Wrapper={({ children }) => (
                                  <Item
                                    withIcon={false}
                                    marginBot={false}
                                    onHover={true}
                                    customIcon={
                                      get(
                                        formValues,
                                        `metadata.cycle.timelinePoints[${index}].properties.pm_review_before_end`,
                                      ) &&
                                      canEdit &&
                                      !isTimeLinePoint ? (
                                        <Icon
                                          graphic={'delete'}
                                          onClick={() =>
                                            setValue(
                                              `metadata.cycle.timelinePoints[${index}].properties.pm_review_before_end`,
                                              undefined,
                                              { shouldValidate: true, shouldDirty: true },
                                            )
                                          }
                                        />
                                      ) : undefined
                                    }
                                  >
                                    {children}
                                  </Item>
                                )}
                                value={get(
                                  formValues,
                                  `metadata.cycle.timelinePoints[${index}].properties.pm_review_before_end`,
                                )}
                                readonly={!canEdit || isTimeLinePoint}
                                customStyles={{
                                  padding: '10px 0px 10px 6px',
                                  border: '0px',
                                  ...((!canEdit || isTimeLinePoint) && {
                                    background: theme.colors.backgroundDark,
                                  }),
                                  ':focus': {
                                    outline: 'none !important',
                                    borderWidth: '0px !important',
                                  },
                                }}
                              />
                            </div>
                          </td>

                          <td
                            className={css(
                              contentStyle({ readOnly: !canEdit || point.reviewType !== OBJECTIVE }),
                              descriptionStyle,
                              {
                                maxWidth: '76px',
                                padding: '0px 0px 0px 2px',
                              },
                            )}
                          >
                            <div className={css(itemStyle)}>
                              <Field
                                name={`metadata.cycle.timelinePoints[${index}].properties.pm_review_min`}
                                setValue={setValue}
                                Element={Input}
                                Wrapper={({ children }) => (
                                  <Item
                                    withIcon={false}
                                    marginBot={false}
                                    onHover={true}
                                    iconCustomStyles={{ top: '-3px' }}
                                    customIcon={
                                      get(
                                        formValues,
                                        `metadata.cycle.timelinePoints[${index}].properties.pm_review_min`,
                                      ) &&
                                      canEdit &&
                                      point.reviewType === OBJECTIVE ? (
                                        <Icon
                                          graphic={'delete'}
                                          onClick={() =>
                                            setValue(
                                              `metadata.cycle.timelinePoints[${index}].properties.pm_review_min`,
                                              undefined,
                                              { shouldValidate: true, shouldDirty: true },
                                            )
                                          }
                                        />
                                      ) : undefined
                                    }
                                  >
                                    {children}
                                  </Item>
                                )}
                                error={get(
                                  errors,
                                  `metadata.cycle.timelinePoints[${index}].properties.pm_review_min.message`,
                                )}
                                value={get(
                                  formValues,
                                  `metadata.cycle.timelinePoints[${index}].properties.pm_review_min`,
                                )}
                                readonly={!canEdit || point.reviewType !== OBJECTIVE}
                                customStyles={{
                                  padding: '0px 0px 0px 2px',
                                  border: '0px',
                                  ...((!canEdit || point.reviewType !== OBJECTIVE) && {
                                    background: theme.colors.backgroundDark,
                                  }),
                                  ':focus': {
                                    outline: 'none !important',
                                    borderWidth: '0px !important',
                                  },
                                }}
                              />
                            </div>
                          </td>

                          <td
                            className={css(
                              contentStyle({ readOnly: !canEdit || point.reviewType !== OBJECTIVE }),
                              descriptionStyle,
                              {
                                maxWidth: '76px',
                                padding: '0px 0px 0px 2px',
                              },
                            )}
                          >
                            <div className={css(itemStyle)}>
                              <Field
                                name={`metadata.cycle.timelinePoints[${index}].properties.pm_review_max`}
                                setValue={setValue}
                                Element={Input}
                                Wrapper={({ children }) => (
                                  <Item
                                    withIcon={false}
                                    marginBot={false}
                                    iconCustomStyles={{ top: '-3px' }}
                                    onHover={true}
                                    customIcon={
                                      get(
                                        formValues,
                                        `metadata.cycle.timelinePoints[${index}].properties.pm_review_max`,
                                      ) &&
                                      canEdit &&
                                      point.reviewType === OBJECTIVE ? (
                                        <Icon
                                          graphic={'delete'}
                                          onClick={() =>
                                            setValue(
                                              `metadata.cycle.timelinePoints[${index}].properties.pm_review_max`,
                                              undefined,
                                              { shouldValidate: true, shouldDirty: true },
                                            )
                                          }
                                        />
                                      ) : undefined
                                    }
                                  >
                                    {children}
                                  </Item>
                                )}
                                error={get(
                                  errors,
                                  `metadata.cycle.timelinePoints[${index}].properties.pm_review_max.message`,
                                )}
                                value={get(
                                  formValues,
                                  `metadata.cycle.timelinePoints[${index}].properties.pm_review_max`,
                                )}
                                readonly={!canEdit || point.reviewType !== OBJECTIVE}
                                customStyles={{
                                  padding: '0px 0px 0px 2px',
                                  border: '0px',
                                  ...((!canEdit || point.reviewType !== OBJECTIVE) && {
                                    background: theme.colors.backgroundDark,
                                  }),
                                  ':focus': {
                                    outline: 'none !important',
                                    borderWidth: '0px !important',
                                  },
                                }}
                              />
                            </div>
                          </td>
                          <td className={css(contentStyle({ readOnly: false }), descriptionStyle)}>
                            <Button
                              onPress={() => {
                                onOpenForm(point?.form?.id, formValues?.template?.uuid);
                              }}
                              styles={[buttonWhiteStyle]}
                              isDisabled={!point?.form?.id || !formValues?.template?.uuid}
                            >
                              <Trans i18nKey='preview'>Preview</Trans>
                            </Button>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </TileWrapper>
  );
};
import get from 'lodash.get';

import { OBJECTIVE } from '../../constants/constants';

type Props = {
  setValue: UseFormSetValue<FieldValues>;
  formValues: FieldValues;
  canEdit: boolean;
  errors: FieldValues;
  watch: UseFormWatch<FieldValues>;
  onOpenForm: (formUuid: string, fileUuid: string) => void;
};

const titles_map = [
  'type_of_reviews',
  'duration',
  'pm_review_start_delay',
  'pm_review_lock',
  'pm_review_overdue',
  'before_start',
  'before_end',
  'min',
  'max',
  'actions',
];

const tableTitle: Rule = (theme) => ({
  margin: '0px',
  color: theme.colors.white,
  fontSize: theme.font.fixed.f16.fontSize,
  fontWeight: theme.font.weight.bold,
});
const itemStyle: Rule = (theme) => ({
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f20.lineHeight,
  fontWeight: theme.font.weight.bold,
});

const visibleContainerStyle: Rule = () => ({
  display: 'inline-flex',
  flexWrap: 'wrap',
  gap: '16px 8px',
});

const containerStyle: Rule = {
  flexWrap: 'wrap',
  gap: '16px 8px',
  alignItems: 'center',
  display: 'none',
};
const contentStyle: CreateRule<{ readOnly: boolean }> =
  ({ readOnly }) =>
  ({ theme }) => ({
    // @ts-ignore
    border: `1px solid ${theme.colors.lightGray}`,
    whiteSpace: 'nowrap',
    textAlign: 'center',
    verticalAlign: 'middle',
    height: '36px',
    padding: '0px 5px',
    ...(readOnly && { background: theme.colors.backgroundDark }),
  });
const titleRow: Rule = ({ theme }) => ({
  background: theme.colors.tescoBlue,
  color: theme.colors.white,
});
const tableTitlesStyle: Rule = ({ theme }) =>
  ({
    color: theme.colors.white,
    '& > th': {
      fontWeight: '700',
      fontSize: theme.font.fixed.f16.fontSize,
      lineHeight: theme.font.fixed.f20.fontSize,
    },
  } as Styles);

const descriptionStyle: Rule = ({ theme }) =>
  ({
    '& > th': {
      color: theme.colors.base,
      fontWeight: '400',
      fontSize: theme.font.fixed.f16.fontSize,
      lineHeight: '22px',
    },
  } as Styles);

const tableStyle: Rule = ({ theme }) => ({
  borderCollapse: 'collapse',
  marginTop: theme.spacing.s0,
  marginBottom: theme.spacing.s0,
  width: '100%',
});

const tableContainer: Rule = {
  width: '100%',
  marginBottom: '20px',
};

const wrapper: Rule = {
  display: 'table',
  tableLayout: 'fixed',
  width: '100%',
};

const innerWrapper: Rule = {
  display: 'table-cell',
  width: '100%',
};
const customTileStyles: Rule = {
  margin: '24px 19px 0px 32px',
  padding: '25px',
  maxWidth: '1300px',
  overflowY: 'visible',
  display: 'flex',
  flexDirection: 'column',
  width: '93%',
};

const buttonWhiteStyle: Rule = ({ theme }) => ({
  ...theme.font.fixed.f12,
  fontWeight: theme.font.weight.bold,
  margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
  background: theme.colors.white,
  border: `${theme.border.width.b1} solid ${theme.colors.tescoBlue}`,
  color: theme.colors.tescoBlue,
  height: '28px',
});

export default CycleDetails;
