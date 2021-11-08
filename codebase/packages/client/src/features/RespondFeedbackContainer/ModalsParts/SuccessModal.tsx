import React, { FC } from 'react';
import { SuccessModalProps } from '../type';
import { useStyle, useBreakpoints, Rule, Styles, Button } from '@dex-ddl/core';
import { IconButton } from 'components/IconButton';
import success from 'components/Icon/img/success.jpg';
import { Trans } from 'components/Translation';

const SuccessModal: FC<SuccessModalProps> = ({
  setModalSuccess,
  modalSuccess,
  setIsOpen,
  setSelectedPerson,
  selectedPerson,
}) => {
  const { css, theme } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return (
    <div className={css(WrapperSuccessContainer)}>
      <div className={css(Success_img)}>
        <img src={success} alt='success' />
      </div>
      <h2 className={css(Done_text)}>Done!</h2>
      <p className={css(Description)}>
        {`${selectedPerson?.f_name} ${selectedPerson?.l_name}`} will now be able to see your feedback
      </p>
      <div
        className={css({
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
        })}
      >
        <div
          className={css({
            position: 'relative',
            bottom: theme.spacing.s0,
            left: theme.spacing.s0,
            right: theme.spacing.s0,
            borderTop: `${theme.border.width.b1} solid ${theme.colors.backgroundDarkest}`,
          })}
        >
          <div
            className={css({
              padding: mobileScreen ? theme.spacing.s6 : theme.spacing.s8,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            })}
          >
            <Button
              styles={[
                theme.font.fixed.f16,
                {
                  fontWeight: theme.font.weight.bold,
                  width: '49%',
                  margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
                  background: theme.colors.tescoBlue,
                  border: `${theme.border.width.b1} solid ${theme.colors.tescoBlue}`,
                  color: `${theme.colors.white}`,
                },
              ]}
              onPress={() => {
                setModalSuccess(() => false);
                setIsOpen(() => false);
                setSelectedPerson(() => null);
              }}
            >
              <Trans i18nKey='OK'>Okay</Trans>
            </Button>
          </div>
        </div>
      </div>
      <span
        className={css({
          position: 'fixed',
          top: theme.spacing.s5,
          left: mobileScreen ? theme.spacing.s5 : theme.spacing.s10,
          textDecoration: 'none',
          border: 'none',
          cursor: 'pointer',
        })}
      >
        <IconButton
          graphic='arrowLeft'
          onPress={() => setModalSuccess(() => false)}
          iconProps={{ invertColors: true }}
        />
      </span>
    </div>
  );
};

const WrapperSuccessContainer: Rule = {
  paddingTop: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
};
const Success_img: Rule = {
  width: '164px',
  height: '164px',
  '& > img': {
    width: '100%',
    maxHeight: '100%',
  },
} as Styles;

const Done_text: Rule = {
  fontWeight: 'bold',
  fontSize: '28px',
  lineHeight: '32px',
  margin: '20px 0px 16px 0px',
};

const Description: Rule = {
  maxWidth: '357px',
  margin: '0px',
  fontWeight: 'normal',
  fontSize: '24px',
  lineHeight: '28px',
  textAlign: 'center',
};

export default SuccessModal;
