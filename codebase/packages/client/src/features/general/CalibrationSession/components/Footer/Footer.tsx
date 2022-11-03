import React, { useState, forwardRef } from 'react';
import { Button, CreateRule, Rule, useStyle, Colors } from '@pma/dex-wrapper';

import { Icon } from 'components/Icon';
import ButtonWithConfirmation from 'components/ButtonWithConfirmation';
import { Trans, useTranslation } from 'components/Translation';

type Props = {
  onCancel: () => void;
  onSave: () => void;
};

const ConfirmationDescription = () => (
  <div>
    <p>
      You are about to end the calibration session. Once the session has ended, calibration ratings will be locked, and
      line managers will no longer be able to change these ratings.
    </p>
    <p>
      People partners may amend any ratings by re-starting and saving the session up until the final submission
      deadline.
    </p>
    <p>To confirm, please select ‘end session’</p>
  </div>
);

const Footer = forwardRef<any, Props>(({ onCancel, onSave }, ref) => {
  const { css, matchMedia } = useStyle();
  const { t } = useTranslation();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const [fullScreen, toggleFullScreen] = useState<boolean>(true);

  return (
    <div className={css(footerBlockStyle({ fullScreen }))} ref={ref}>
      <div className={css(containerStyle({ mobileScreen }))}>
        <div />
        <div>Performance ratings are available to edit</div>
        <div
          className={css({ display: 'flex', cursor: 'pointer', alignItems: 'center' })}
          onClick={() => toggleFullScreen(!fullScreen)}
        >
          <div className={css(colorStyle({ color: 'tescoBlue' }), { paddingRight: '5px' })}>
            {fullScreen ? t('minimise', 'Minimise') : t('maximise', 'Maximise')}
          </div>
          <Icon graphic={fullScreen ? 'less' : 'full'} />
        </div>
      </div>
      {fullScreen && (
        <div className={css(buttonContainerStyle({ mobileScreen }))}>
          <Button
            onPress={onCancel}
            styles={[buttonStyle, colorBackgroundStyle({}), colorStyle({ color: 'tescoBlue' })]}
          >
            <Trans i18nKey='cancel_and_exit'>Cancel and exit</Trans>
          </Button>
          <ButtonWithConfirmation
            onSave={onSave}
            buttonName={t('save_and_end_calibration_session', 'Save and end calibration session')}
            styles={[buttonStyle, colorBackgroundStyle({ color: 'tescoBlue' }), colorStyle({})]}
            confirmationDescription={<ConfirmationDescription />}
            confirmationButtonTitle={t('end_session', 'End session')}
          />
        </div>
      )}
    </div>
  );
});

const footerBlockStyle: CreateRule<{ fullScreen: boolean }> =
  ({ fullScreen }) =>
  ({ theme }) => ({
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: fullScreen ? '198px' : '100px',
    background: theme.colors['paleOrange'],
  });

const containerStyle: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingTop: '20px',
  justifyContent: 'space-around',
  ...(mobileScreen && {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '10px',
    paddingLeft: '20px',
  }),
});

const buttonContainerStyle: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingTop: '20px',
  justifyContent: 'center',
  ...(mobileScreen && {
    flexDirection: 'column',
    gap: '10px',
    paddingLeft: '20px',
  }),
});

const buttonStyle: Rule = ({ theme }) => ({
  ...theme.font.fixed.f16,
  fontWeight: theme.font.weight.bold,
  width: '40%',
  margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
  border: `${theme.border.width.b2} solid ${theme.colors.tescoBlue}`,
});

const colorBackgroundStyle: CreateRule<{ color?: Colors }> =
  ({ color = 'white' }) =>
  ({ theme }) => ({
    background: theme.colors[color],
  });

const colorStyle: CreateRule<{ color?: Colors }> =
  ({ color = 'white' }) =>
  ({ theme }) => ({
    color: theme.colors[color],
  });

export default Footer;
