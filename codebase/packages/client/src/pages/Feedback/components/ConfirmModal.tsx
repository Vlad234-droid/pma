import React, { Dispatch, FC, SetStateAction } from 'react';
import confirm from '../../../../public/confirm.png';
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
        <div>
          <img src={confirm} alt='confirm' />
        </div>
        <h3 className={css(info_content_style, { marginTop: '0px' })}>
          Before you send this feedback, please check it is about something you`ve observed during a first-hand
          interaction with this colleague.
        </h3>
        <h3 className={css(info_content_style)}>
          Feedback that`s not related to a specific situation with a colleague should be shared in the Every Voice
          Matters survey.
        </h3>
      </div>

      <div className={css(buttons_container_style)}>
        <Button
          styles={[theme.font.fixed.f20, Button_style]}
          onPress={() => {
            setConfirmModal(() => false);
          }}
        >
          <Trans>Go back</Trans>
        </Button>
        <Button styles={[theme.font.fixed.f20, Button_style]} onPress={onSubmit}>
          <Trans>Confirm</Trans>
        </Button>
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

const ImgContent_style: Rule = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '2vh',
};

const buttons_container_style: Rule = {
  display: 'flex',
  justifyContent: 'space-around',
  position: 'absolute',
  bottom: '0px',
  right: '0px',
  left: '0px',
  marginBottom: '16px',
};

const info_content_style: Rule = {
  maxWidth: '86%',
  color: '#595959',
  textAlign: 'center',
};

const Button_style: Rule = ({ theme }) => ({
  minWidth: '18%',
  margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
  background: theme.colors.tescoBlue,
  border: `${theme.border.width.b1} solid ${theme.colors.tescoBlue}`,
  color: `${theme.colors.white}`,
  whiteSpace: 'nowrap',
  borderRadius: '9px',
});

export default ConfirmModal;
