import React, { CSSProperties, FC, HTMLProps } from 'react';
import { Button, useStyle, Rule, CreateRule, Styles } from '@pma/dex-wrapper';

import { WrapperModal } from 'features/general/Modal';
import { Trans } from 'components/Translation';

export type SuccessModal = {
  onClose: () => void;
  description?: string;
  title: string;
  additionalText?: string;
  mark?: JSX.Element;
  customElement?: JSX.Element;
  customButtonStyles?: Rule | Styles | CSSProperties | {};
};

type Props = HTMLProps<HTMLInputElement> & SuccessModal;

const DefaultMark = (
  <>
    <circle data-test-id='success-mark' opacity='0.1' cx='82.5' cy='82.0002' r='65.2653' fill='#FF9900' />
    <path
      d='M82.4999 37.583V85.4163H48.3333M147.417 81.9997C147.417 117.854 118.354 146.916 82.4999 146.916C46.6454 146.916 17.5833 117.854 17.5833 81.9997C17.5833 46.1452 46.6454 17.083 82.4999 17.083C118.354 17.083 147.417 46.1452 147.417 81.9997Z'
      stroke='#FF9900'
      strokeWidth='1.2'
    />
  </>
);

const SuccessModal: FC<Props> = ({
  onClose,
  description,
  mark = DefaultMark,
  title,
  customButtonStyles = {},
  additionalText = '',
  customElement,
}) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;

  return (
    <WrapperModal title={title} onClose={onClose} onOverlayClick={onClose}>
      <div data-test-id='success-modal' className={css(wrapperStyle)}>
        <div className={css(containerStyle({ mobileScreen }))}>
          <div style={{ textAlign: 'center' }}>
            <span
              style={{
                display: 'block',
                padding: '15px',
              }}
              data-test-id='success-check-mark'
            >
              <svg width='165' height='164' viewBox='0 0 165 164' fill='none' xmlns='http://www.w3.org/2000/svg'>
                {mark}
              </svg>
            </span>
            <div className={css(titleStyle)}>
              <Trans i18nKey='done'>Done</Trans>!
            </div>
            <div className={css(descriptionStyle)}>{description}</div>
            {additionalText && <div className={css(descriptionStyle, { marginTop: '30px' })}>{additionalText}</div>}
            {customElement && <div>{customElement}</div>}
          </div>
        </div>
        <div className={css(buttonWrapperStyle)}>
          <div
            className={css({
              padding: '36px 36px',
              display: 'flex',
              justifyContent: 'center',
            })}
          >
            <Button styles={[buttonStyle, customButtonStyles]} onPress={onClose}>
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
  padding: mobileScreen ? '0 16px' : '0 40px',
});

const titleStyle: Rule = ({ theme }) => ({
  fontSize: theme.font.fixed.f28.fontSize,
  lineHeight: theme.font.fixed.f28.lineHeight,
  letterSpacing: '0px',
  fontWeight: theme.font.weight.bold,
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
  border: `2px solid ${theme.colors.tescoBlue}`,
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  letterSpacing: '0px',
  fontWeight: theme.font.weight.bold,
  color: `${theme.colors.tescoBlue}`,
  width: '50%',
  margin: '0px 4px',
});

export default SuccessModal;
