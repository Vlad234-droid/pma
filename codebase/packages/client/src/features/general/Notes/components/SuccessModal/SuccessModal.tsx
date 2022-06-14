import React, { FC } from 'react';
import { Button, Rule, useStyle, CreateRule } from '@pma/dex-wrapper';

import { Trans } from 'components/Translation';
import successImg from 'images/success.jpg';

export const OK_BTN = 'ok-btn';
export const SUCCESS_MODAL_WRAPPER = 'success-modal-wrapper';

export type SuccessModalProps = {
  folder?: string;
  onOk: () => void;
};

const SuccessModal: FC<SuccessModalProps> = ({ folder, onOk }) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;

  return (
    <div
      className={css({
        height: '100%',
      })}
      data-test-id={SUCCESS_MODAL_WRAPPER}
    >
      <div className={css(blockStyle({ mobileScreen }))}>
        <div style={{ textAlign: 'center' }}>
          <span className={css(imgStyle)}>
            <img src={successImg} alt='Success' />
          </span>
          <div className={css(doneStyle)}>
            <Trans>Done</Trans>!
          </div>
          <div className={css(infoStyle)}>
            {!folder ? (
              <Trans id='your_note_has_been_added_into_the_folder' folder={folder}>
                <>
                  Your note has been added into
                  <br /> the folder:
                  <br /> {folder}
                </>
              </Trans>
            ) : (
              <Trans>Your folder has been added</Trans>
            )}
          </div>
        </div>
      </div>
      <div className={css(btnWrapperStyle)}>
        <div className={css(flexStyle)}>
          <Button styles={[buttonStyle]} data-test-id={OK_BTN} onPress={onOk}>
            <Trans i18nKey='okay'>Okay</Trans>
          </Button>
        </div>
      </div>
    </div>
  );
};

const infoStyle: Rule = ({ theme }) => ({
  fontSize: theme.spacing.s6,
  lineHeight: '28px',
  padding: '10px',
});
const blockStyle: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  height: '100%',
  overflow: 'auto',
  padding: mobileScreen ? '0 16px' : '0 40px',
});
const imgStyle: Rule = {
  display: 'block',
  padding: '15px',
};

const doneStyle: Rule = ({ theme }) => ({
  fontSize: theme.spacing.s7,
  lineHeight: '32px',
  fontWeight: 'bold',
  padding: '10px',
});
const flexStyle: Rule = {
  padding: '36px 36px',
  display: 'flex',
  justifyContent: 'center',
};

const btnWrapperStyle: Rule = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  borderTop: '2px solid #E5E5E5',
};

const buttonStyle: Rule = ({ theme }) => {
  return {
    border: `2px solid ${theme.colors.tescoBlue}`,
    fontSize: '16px',
    lineHeight: '20px',
    fontWeight: 'bold',
    color: `${theme.colors.white}`,
    width: '50%',
    margin: '0px 4px',
    background: `${theme.colors.tescoBlue}`,
  };
};

export default SuccessModal;
