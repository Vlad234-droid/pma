import React, { FC } from 'react';
import { useNavigate } from 'react-router';

import { Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { CalibrationSession, CalibrationSessionStatusEnum } from '@pma/openapi';

import { paramsReplacer } from 'utils';
import { Page } from 'pages';

import { Accordion, BaseAccordion, ExpandButton, Panel, Section } from 'components/Accordion';
import { IconButton, Position } from 'components/IconButton';
import { Trans, useTranslation } from 'components/Translation';
import { buildPath } from 'features/general/Routes';
import ButtonWithConfirmation from 'components/ButtonWithConfirmation';
import { DateBadge } from '../DateBadge';

const SessionAccordion: FC<{
  isFirst?: boolean;
  calibrationSession: CalibrationSession;
  onDeleteCalibrationSession: (uuid: string | null) => void;
}> = ({ isFirst = false, calibrationSession, onDeleteCalibrationSession }) => {
  const { css } = useStyle();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const navigateToPage = () =>
    calibrationSession.uuid
      ? navigate(buildPath(paramsReplacer(Page.EDIT_CALIBRATION_SESSION, { ':uuid': calibrationSession.uuid })))
      : navigate(buildPath(Page.NOT_FOUND));

  return (
    <Accordion id={'session-accordion'} customStyle={isFirst ? borderStyles : marginStyles}>
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
                      onPress={navigateToPage}
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
                      onSave={() => onDeleteCalibrationSession(calibrationSession.uuid || null)}
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
                    onPress={console.log}
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
  );
};

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

export default SessionAccordion;
