import React, { FC } from 'react';
import { Trans } from 'components/Translation';
import { Button, useBreakpoints, useStyle } from '@dex-ddl/core';
import { SuccessModalProps } from './type';
import successImg from 'images/success.jpg';

export const MODAL_WRAPPER = 'modal-wrapper';

const SuccessModal: FC<SuccessModalProps> = ({
  setSuccessSelectedNoteToEdit,
  setSelectedNoteToEdit,
  setSelectedFolder,
  methods,
}) => {
  const { css, theme } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;

  const { reset } = methods;
  return (
    <div
      className={css({
        height: '100%',
      })}
      data-test-id={MODAL_WRAPPER}
    >
      <div
        className={css({
          height: '100%',
          overflow: 'auto',
          padding: mobileScreen ? '0 16px' : '0 40px',
        })}
      >
        <div style={{ textAlign: 'center' }}>
          <span
            style={{
              display: 'block',
              padding: '15px',
            }}
          >
            <img src={successImg} alt='Success' />
          </span>
          <div
            className={css({
              fontSize: '28px',
              lineHeight: '32px',
              fontWeight: 'bold',
              padding: '10px',
            })}
          >
            <Trans i18nKey='done'>Done</Trans>!
          </div>
          <div
            className={css({
              fontSize: '24px',
              lineHeight: '28px',
              padding: '10px',
            })}
          >
            <Trans i18nKey='your_note_has_been_changed'>Your note has been changed</Trans>
          </div>
        </div>
      </div>
      <div
        className={css({
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          borderTop: '1px solid #E5E5E5',
        })}
      >
        <div
          className={css({
            padding: '36px 36px',
            display: 'flex',
            justifyContent: 'center',
          })}
        >
          <Button
            styles={[
              {
                border: `1px solid ${theme.colors.tescoBlue}`,
                fontSize: '16px',
                lineHeight: '20px',
                fontWeight: 'bold',
                color: `${theme.colors.white}`,
                width: '50%',
                margin: '0px 4px',
                background: `${theme.colors.tescoBlue}`,
              },
            ]}
            onPress={() => {
              setSuccessSelectedNoteToEdit(() => false);
              setSelectedNoteToEdit(() => null);
              setSelectedFolder(() => null);
              reset();
            }}
          >
            <Trans>Okay</Trans>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
