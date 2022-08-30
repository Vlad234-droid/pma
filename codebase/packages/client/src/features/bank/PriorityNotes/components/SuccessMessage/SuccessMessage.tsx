import React, { FC } from 'react';
import { Button, useStyle, Rule, CreateRule } from '@pma/dex-wrapper';

import { WrapperModal } from 'features/general/Modal';
import { Trans } from 'components/Translation';
import success from 'images/success.jpg';

export type SuccessMessage = {
  onClose: () => void;
  description?: string;
  title: string;
};

type Props = SuccessMessage;

export const SuccessMessage: FC<Props> = ({ onClose, description, title }) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;

  return (
    <WrapperModal title={title} onClose={onClose} onOverlayClick={onClose}>
      <div className={css(wrapperStyle)}>
        <div className={css(containerStyle({ mobileScreen }))}>
          <img src={success} alt='success' />
          <div className={css(titleStyle)}>
            <Trans i18nKey='done'>Done</Trans>!
          </div>
          <div className={css(descriptionStyle)}>{description}</div>
        </div>
        <div className={css(buttonWrapperStyle)}>
          <div
            className={css({
              padding: '36px 36px',
              display: 'flex',
              justifyContent: 'center',
            })}
          >
            <Button styles={[buttonStyle]} onPress={onClose}>
              <Trans i18nKey='okay'>Okay</Trans>
            </Button>
          </div>
        </div>
      </div>
    </WrapperModal>
  );
};

const wrapperStyle: Rule = { height: '100%' };

const containerStyle: CreateRule<{
  mobileScreen: boolean;
}> = ({ mobileScreen }) => ({
  height: '100%',
  overflow: 'auto',
  textAlign: 'center',
  padding: mobileScreen ? '0 16px' : '0 40px',
});

const titleStyle: Rule = ({ theme }) => ({
  fontSize: theme.font.fixed.f28.fontSize,
  lineHeight: theme.font.fixed.f28.lineHeight,
  fontWeight: theme.font.weight.bold,
  letterSpacing: '0px',
  padding: '10px',
});

const descriptionStyle: Rule = ({ theme }) => ({
  fontSize: theme.font.fixed.f24.fontSize,
  lineHeight: theme.font.fixed.f24.lineHeight,
  letterSpacing: '0px',
  padding: '10px',
});

const buttonWrapperStyle: Rule = ({ theme }) => ({
  position: 'relative',
  bottom: 0,
  left: 0,
  right: 0,
  // @ts-ignore
  borderTop: `${theme.border.width.b2} solid ${theme.colors.lightGray}`,
});

const buttonStyle: Rule = ({ theme }) => ({
  background: theme.colors.white,
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  fontWeight: theme.font.weight.bold,
  color: `${theme.colors.tescoBlue}`,
  border: `2px solid ${theme.colors.tescoBlue}`,
  letterSpacing: '0px',
  width: '50%',
  margin: '0px 4px',
});
