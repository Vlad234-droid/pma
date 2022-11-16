import React, { useState, forwardRef } from 'react';
import { Button, CreateRule, useStyle, Colors } from '@pma/dex-wrapper';

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
  const { css, matchMedia, theme } = useStyle();
  const { t } = useTranslation();
  const mobileScreen = matchMedia({ xSmall: true, small: true, medium: true }) || false;
  const [fullScreen, toggleFullScreen] = useState<boolean>(true);

  return (
    <div className={css(footerBlockStyle({ fullScreen, mobileScreen }))} ref={ref}>
      <div className={css(containerStyle({ mobileScreen }))}>
        <div />
        <div className={css(textStyle({ mobileScreen }))}>Performance ratings are available to edit</div>
        <div
          className={css({ display: 'flex', cursor: 'pointer', alignItems: 'center', justifyContent: 'end' })}
          onClick={() => toggleFullScreen(!fullScreen)}
        >
          <div className={css(colorStyle({ color: 'tescoBlue' }), { paddingRight: '5px', ...theme.font.fixed.f14 })}>
            {fullScreen ? t('minimise', 'Minimise') : t('maximise', 'Maximise')}
          </div>
          <Icon size={'22px'} graphic={fullScreen ? 'less' : 'full'} />
        </div>
      </div>
      {fullScreen && (
        <div className={css(buttonContainerStyle({ mobileScreen }))}>
          <Button
            onPress={onCancel}
            styles={[buttonStyle({ mobileScreen }), colorBackgroundStyle({}), colorStyle({ color: 'tescoBlue' })]}
          >
            <Trans i18nKey='cancel_and_exit'>Cancel and exit</Trans>
          </Button>
          <ButtonWithConfirmation
            onSave={onSave}
            buttonName={t('save_and_end_calibration_session', 'Save and end calibration session')}
            styles={[buttonStyle({ mobileScreen }), colorBackgroundStyle({ color: 'tescoBlue' }), colorStyle({})]}
            confirmationDescription={<ConfirmationDescription />}
            confirmationButtonTitle={t('end_session', 'End session')}
          />
        </div>
      )}
    </div>
  );
});

const footerBlockStyle: CreateRule<{ fullScreen: boolean; mobileScreen: boolean }> =
  ({ fullScreen, mobileScreen }) =>
  ({ theme }) => ({
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: fullScreen ? (mobileScreen ? '180px' : '152px') : '70px',
    background: theme.colors['paleOrange'],
    paddingLeft: '10px',
    paddingRight: '10px',
  });

const containerStyle: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingTop: mobileScreen ? '16px' : '25px',
  '& > div': {
    width: '33%',
    textAlign: 'center',
  },
  ...(mobileScreen && {
    '& > div': {
      width: '50%',
    },
    '& > div:first-child': {
      display: 'none',
    },
  }),
});

const buttonContainerStyle: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingTop: mobileScreen ? '16px' : '25px',
  justifyContent: 'center',
  ...(mobileScreen && {
    flexDirection: 'column',
    gap: '10px',
    alignItems: 'left',
  }),
});

const buttonStyle: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    ...theme.font.fixed.f16,
    fontWeight: theme.font.weight.bold,
    width: mobileScreen ? '100%' : '300px',
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

const textStyle: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    ...(mobileScreen ? theme.font.fixed.f16 : theme.font.fixed.f20),
    letterSpacing: '0px',
  });

export default Footer;
