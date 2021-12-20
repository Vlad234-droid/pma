import React, { Dispatch, FC, SetStateAction } from 'react';
import { Button, Rule, useStyle, useBreakpoints } from '@dex-ddl/core';
import { Trans } from 'components/Translation';
import { IconButton } from 'components/IconButton';

type ConfirmModalType = {
  onSubmit: (e: any) => void;
  setConfirmModal: Dispatch<SetStateAction<boolean>>;
};

const ConfirmModal: FC<ConfirmModalType> = ({ onSubmit, setConfirmModal }) => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  const { css, theme } = useStyle();
  return (
    <div>
      <div className={css(ImgContent_style)}>
        <h3 className={css(info_content_style, { marginTop: '0px' })}>
          Before you send this feedback, please check it is about something you&apos;ve observed during a first-hand
          interaction with this colleague.
        </h3>
        <h3 className={css(info_content_style)}>
          Feedback that&apos;s not related to a specific situation with a colleague should be shared in the Every Voice
          Matters survey.
        </h3>
      </div>

      <div className={css(Absolute_style)}>
        <div className={css(Relative_btn_styled)}>
          <div className={css(Spacing_style)}>
            <Button
              styles={[theme.font.fixed.f16, Button_styleback]}
              onPress={() => {
                setConfirmModal(() => false);
              }}
            >
              <Trans>Go back</Trans>
            </Button>
            <Button styles={[theme.font.fixed.f16, Button_style_submit]} onPress={onSubmit}>
              <Trans>Confirm</Trans>
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
          onPress={() => {
            setConfirmModal(() => false);
          }}
          iconProps={{ invertColors: true }}
        />
      </span>
    </div>
  );
};

const Absolute_style: Rule = {
  position: 'absolute',
  left: 0,
  bottom: 0,
  width: '100%',
  background: '#FFFFFF',
  height: '112px',
};

const Relative_btn_styled: Rule = ({ theme }) => ({
  position: 'relative',
  bottom: theme.spacing.s0,
  left: theme.spacing.s0,
  right: theme.spacing.s0,
  borderTop: `${theme.border.width.b1} solid ${theme.colors.backgroundDarkest}`,
});

const Spacing_style: Rule = ({ theme }) => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return {
    padding: mobileScreen ? theme.spacing.s6 : theme.spacing.s8,
    display: 'flex',
    justifyContent: 'space-between',
  };
};

const Button_styleback: Rule = ({ theme }) => ({
  fontWeight: theme.font.weight.bold,
  width: '49%',
  margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
  background: theme.colors.white,
  border: `${theme.border.width.b1} solid ${theme.colors.tescoBlue}`,
  color: `${theme.colors.tescoBlue}`,
});

const Button_style_submit: Rule = ({ theme }) => ({
  fontWeight: theme.font.weight.bold,
  width: '49%',
  margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
  background: theme.colors.tescoBlue,
  border: `${theme.border.width.b1} solid ${theme.colors.tescoBlue}`,
  color: `${theme.colors.white}`,
});

const ImgContent_style: Rule = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '2vh',
};

const info_content_style: Rule = {
  maxWidth: '86%',
  color: '#595959',
  textAlign: 'center',
  fontWeight: 'normal',
};

export default ConfirmModal;
