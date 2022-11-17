import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { CalibrationSessionStatusEnum } from '@pma/openapi';
import { CalibrationSessionsAction, calibrationSessionsMetaSelector, getCalibrationSessionsSelector } from '@pma/store';

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

const CalibrationSessionList: FC<{ filterStatus: FilterStatus }> = ({ filterStatus }) => {
  const { css } = useStyle();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const activeStatuses = [
    CalibrationSessionStatusEnum.Created,
    CalibrationSessionStatusEnum.Started,
    CalibrationSessionStatusEnum.Updated,
  ];
  const completedStatuses = [CalibrationSessionStatusEnum.Completed];

  const { loading: calibrationSessionLoading } = useSelector(calibrationSessionsMetaSelector);
  const calibrationSessions = useSelector(getCalibrationSessionsSelector) || [];
  const calibrationSessionsByStatus = calibrationSessions.filter((calibrationSession) => {
    if (calibrationSession.status) {
      return filterStatus === FilterStatus.ACTIVE
        ? activeStatuses.includes(calibrationSession?.status)
        : completedStatuses.includes(calibrationSession.status);
    }
    return false;
  });

  useEffect(() => {
    dispatch(CalibrationSessionsAction.getCalibrationSessions({}));
  }, []);

  const handleDelete = (uuid: string | null) => {
    if (uuid) {
      dispatch(CalibrationSessionsAction.deleteCalibrationSession({ uuid }));
    }
  };
  const handleEdit = (uuid) =>
    uuid
      ? navigate(buildPath(paramsReplacer(Page.CALIBRATION_SESSION, { ':uuid': uuid })))
      : navigate(buildPath(Page.NOT_FOUND));

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
              {() => (
                <Section defaultExpanded={false}>
                  <div className={css(sectionBodyStyle)}>
                    <div className={css(titleStyle)}>{calibrationSession.title}</div>
                    <div className={css(expandButtonStyle)}>
                      <DateBadge time={calibrationSession.startTime || ''} />
                      <ExpandButton />
                    </div>
                  </div>
                  <Panel>
                    <div className={css(infoContainerStyle)}>
                      <div>
                        <div>Work level:</div>
                        <div>Colleagues</div>
                      </div>
                      <div>
                        <div>Department</div>
                        <div>Grocery</div>
                      </div>
                      <div>
                        <div>Store</div>
                        <div>5025</div>
                      </div>
                      <div>
                        <div>Ratings changed: N/A</div>
                      </div>
                      <div>
                        <div>Notes</div>
                        <div>{calibrationSession.description}</div>
                      </div>
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
                            buttonName={t('delete', 'Delete')}
                            styles={iconButtonStyles}
                            isDisabled={false}
                            confirmationTitle={''}
                            confirmationDescription={t(
                              'calibration_session_delete',
                              'Are you sure you want to delete calibration session?',
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
              )}
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
