import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { CalibrationSessionStatusEnum } from '@pma/openapi';
import {
  CalibrationSessionsAction,
  calibrationSessionsMetaSelector,
  colleagueFilterMetaSelector,
  getCalibrationSessionsSelector,
  getColleagueFilterSelector,
  ColleagueFilterAction,
} from '@pma/store';

import { Page } from 'pages';
import { paramsReplacer } from 'utils';
import useDispatch from 'hooks/useDispatch';
import { Trans, useTranslation } from 'components/Translation';
import Spinner from 'components/Spinner';
import { IconButton, Position } from 'components/IconButton';
import ButtonWithConfirmation from 'components/ButtonWithConfirmation';
import { Accordion, BaseAccordion, ExpandButton, Panel, Section } from 'components/Accordion';

import { FilterStatus } from './utils/types';
import { DateBadge } from './components/DateBadge';
import { buildPath } from '../Routes';

import { dataFromSessionResponse } from './utils';
import { SortBy } from '../Filters';

const CalibrationSessionList: FC<{ filterStatus: FilterStatus; searchValue: string; sortValue: SortBy }> = ({
  filterStatus,
}) => {
  const { css } = useStyle();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [sessionExpanded, setSessionExpanded] = useState<string>();
  const [colleagueFilterInfo, setColleagueFilterInfo] = useState<any>({});

  const activeStatuses = [
    CalibrationSessionStatusEnum.Created,
    CalibrationSessionStatusEnum.Started,
    CalibrationSessionStatusEnum.Updated,
  ];
  const completedStatuses = [CalibrationSessionStatusEnum.Completed];

  const { loading: calibrationSessionLoading } = useSelector(calibrationSessionsMetaSelector);
  const { loading: calibrationFilterLoading } = useSelector(colleagueFilterMetaSelector);
  const colleagueFilter = useSelector(getColleagueFilterSelector) || {};
  const calibrationSessions = useSelector(getCalibrationSessionsSelector) || [];
  const calibrationSessionsByStatus = calibrationSessions.filter((calibrationSession) => {
    if (calibrationSession.status) {
      return filterStatus === FilterStatus.ACTIVE
        ? activeStatuses.includes(calibrationSession?.status)
        : completedStatuses.includes(calibrationSession.status);
    }
    return false;
  });

  const handleDelete = (uuid: string | null) => {
    if (uuid) {
      dispatch(CalibrationSessionsAction.deleteCalibrationSession({ uuid }));
    }
  };
  const handleEdit = (uuid) =>
    uuid
      ? navigate(buildPath(paramsReplacer(Page.CALIBRATION_SESSION, { ':uuid': uuid })), {
          state: {
            filterStatus,
          },
        })
      : navigate(buildPath(Page.NOT_FOUND));

  useEffect(() => {
    if (sessionExpanded) {
      const calibrationSession = calibrationSessions.find((cs) => cs.uuid === sessionExpanded) || {};
      const { participants = {} } = calibrationSession;
      const { filters = [] } = participants;
      const defaultFilters = dataFromSessionResponse(filters, colleagueFilter);
      setColleagueFilterInfo(defaultFilters);
    }
  }, [sessionExpanded]);

  useEffect(() => {
    dispatch(CalibrationSessionsAction.getCalibrationSessions({}));
    dispatch(ColleagueFilterAction.getColleagueFilter({}));
  }, []);

  if (calibrationSessionLoading) {
    return <Spinner fullHeight />;
  }

  return (
    <>
      {calibrationSessionsByStatus?.length ? (
        calibrationSessionsByStatus.map((calibrationSession, index) => (
          <Accordion
            key={calibrationSession?.uuid}
            id={'session-accordion'}
            customStyle={index === 0 ? borderStyles : marginStyles}
          >
            <BaseAccordion id={'session-base-accordion'}>
              {({ collapseAllSections }) => {
                if (calibrationSession.uuid !== sessionExpanded) {
                  collapseAllSections();
                }
                return (
                  <Section defaultExpanded={false}>
                    <div className={css(sectionBodyStyle)}>
                      <div className={css(titleStyle)}>{calibrationSession.title}</div>
                      <div className={css(expandButtonStyle)}>
                        <DateBadge time={calibrationSession.startTime || ''} />
                        <ExpandButton onClick={(expanded) => expanded && setSessionExpanded(calibrationSession.uuid)} />
                      </div>
                    </div>
                    <Panel>
                      <div className={css(infoContainerStyle)}>
                        {calibrationFilterLoading ? (
                          <Spinner fullHeight />
                        ) : (
                          <>
                            {Object.entries(colleagueFilterInfo).map(([filterName, filterOptions]) => {
                              return (
                                <div key={filterName}>
                                  <div className={css(groupStyles, boldStyles)}>
                                    {t(`group_name_${filterName}`, filterName)}:
                                  </div>
                                  <div className={css(groupStyles)}>
                                    {Array.isArray(filterOptions) &&
                                      filterOptions.map((filterOption) => {
                                        return (
                                          <span key={filterOption.uuid || filterOption.code}>{filterOption?.name}</span>
                                        );
                                      })}
                                  </div>
                                </div>
                              );
                            })}
                          </>
                        )}
                        {!!calibrationSession.description?.length && (
                          <div>
                            <div className={css(groupStyles, boldStyles)}>Notes</div>
                            <div className={css(groupStyles)}>{calibrationSession.description}</div>
                          </div>
                        )}
                      </div>
                      <div className={css({ paddingBottom: '24px', display: ' flex', gap: '30px' })}>
                        {calibrationSession?.status !== CalibrationSessionStatusEnum.Completed && (
                          <>
                            <IconButton
                              isDisabled={false}
                              onPress={() => handleEdit(calibrationSession.uuid || null)}
                              graphic='edit'
                              customVariantRules={{ default: iconButtonStyles, disabled: iconButtonStyles }}
                              iconStyles={iconStyles}
                              iconPosition={Position.LEFT}
                              iconProps={{ size: '16px' }}
                            >
                              <Trans i18nKey='edit_or_start_session'>Edit or start session</Trans>
                            </IconButton>
                            <ButtonWithConfirmation
                              withIcon
                              graphic={'delete'}
                              onSave={() => handleDelete(calibrationSession.uuid || null)}
                              buttonName={t('delete_session', 'Delete Session')}
                              confirmationButtonTitle={t('delete_session', 'Delete Session')}
                              styles={iconButtonStyles}
                              isDisabled={false}
                              confirmationTitle={''}
                              confirmationDescription={t(
                                'calibration_session_delete',
                                'You are about to delete the calibration session. Once the session is deleted all changes will be lost.',
                              )}
                            />
                          </>
                        )}
                        {calibrationSession?.status === CalibrationSessionStatusEnum.Completed && (
                          <IconButton
                            isDisabled={false}
                            onPress={() => handleEdit(calibrationSession.uuid || null)}
                            graphic='view'
                            customVariantRules={{ default: iconButtonStyles, disabled: iconButtonStyles }}
                            iconStyles={iconStyles}
                            iconPosition={Position.LEFT}
                            iconProps={{ size: '16px' }}
                          >
                            <Trans i18nKey='view_session'>View Session</Trans>
                          </IconButton>
                        )}
                      </div>
                    </Panel>
                  </Section>
                );
              }}
            </BaseAccordion>
          </Accordion>
        ))
      ) : (
        <div className={css(emptyBlockStyle)}>
          <Trans i18nKey='no_calibration_session'>You do not have calibration sessions</Trans>
        </div>
      )}
    </>
  );
};

const emptyBlockStyle: Rule = ({ theme }) => ({
  paddingBottom: '20px',
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  letterSpacing: '0px',
});

const borderStyles: Rule = ({ theme }) => ({
  // @ts-ignore
  borderTop: `2px solid ${theme.colors.lightGray}`,
});

const marginStyles: Rule = {
  marginTop: 0,
};

const titleStyle: Rule = ({ theme }) => ({
  color: theme.colors.tescoBlue,
  fontWeight: theme.font.weight.bold,
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  letterSpacing: '0px',
});

const sectionBodyStyle: Rule = {
  padding: '24px 24px 24px 0px',
  display: 'flex',
  alignItems: 'center',
};

const expandButtonStyle: Rule = { marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '10px' };

const groupStyles: Rule = ({ theme }) => ({
  padding: '0',
  ...theme.font.fixed.f14,
  letterSpacing: '0px',
});

const boldStyles: Rule = ({ theme }) => ({
  fontWeight: theme.font.weight.bold,
});

const iconButtonStyles: Rule = ({ theme }) => ({
  padding: '0',
  color: theme.colors.tescoBlue,
  fontWeight: theme.font.weight.bold,
  ...theme.font.fixed.f14,
  letterSpacing: '0px',
});

const iconStyles: Rule = { marginRight: '5px' };

const infoContainerStyle: Rule = {
  '& > div': { width: '100%' },
  paddingBottom: '24px',
  display: ' flex',
  flexWrap: 'wrap',
  rowGap: '30px',
} as Styles;

export default CalibrationSessionList;
