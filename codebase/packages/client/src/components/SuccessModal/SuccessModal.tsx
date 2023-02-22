import React, { CSSProperties, FC, HTMLProps } from 'react';
import { Button, useStyle, Rule, CreateRule, Styles } from '@pma/dex-wrapper';

import { DefaultMark } from 'components/Icon';
import { WrapperModal } from 'features/general/Modal';
import { Trans } from 'components/Translation';
import Spinner from '../Spinner';

export type SuccessModal = {
  onClose: () => void;
  description?: string;
  title: string;
  additionalText?: string;
  mark?: JSX.Element;
  customElement?: JSX.Element;
  customButtonStyles?: Rule | Styles | CSSProperties | {};
  loading?: boolean;
};

type Props = HTMLProps<HTMLInputElement> & SuccessModal;

const SuccessModal: FC<Props> = ({
  onClose,
  description,
  mark,
  title,
  customButtonStyles = {},
  additionalText = '',
  customElement,
  loading,
}) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;

  return (
    <WrapperModal title={title} onClose={onClose}>
      {loading ? (
        <Spinner fullHeight />
      ) : (
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
                  {mark ? mark : <DefaultMark />}
                </svg>
              </span>
              <div className={css(titleStyle)}>
                <Trans i18nKey='done'>Done</Trans>!
              </div>
              <div className={css(descriptionStyle)}>{description}</div>
              {additionalText && <div className={css(descriptionStyle)}>{additionalText}</div>}
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
      )}
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
