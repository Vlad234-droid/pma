import React, { FC, HTMLProps } from 'react';
import { Button, useBreakpoints, useStyle } from '@dex-ddl/core';

import { WrapperModal } from 'features/Modal';
import { Trans } from 'components/Translation';

export type SuccessModal = {
  onClose: () => void;
  description?: string;
  withСheckMark?: boolean;
  title: string;
};

type Props = HTMLProps<HTMLInputElement> & SuccessModal;

const SuccessModal: FC<Props> = ({ onClose, description, withСheckMark = false, title }) => {
  const { css, theme } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;

  return (
    <WrapperModal
      title={title}
      onClose={onClose}
      onOverlayClick={onClose}
    >
      <div
        className={css({
          height: '100%',
        })}
        data-test-id='success-modal'
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
            <svg width='165' height='164' viewBox='0 0 165 164' fill='none' xmlns='http://www.w3.org/2000/svg'>
              {withСheckMark ? (
                <span data-test-id='success-check-mark'>
                  <circle opacity='0.1' cx='82.5' cy='82.0002' r='65.2653' fill='#009E47' />
                  <path d='M51.9166 78.5832L70.9166 97.5832L112.083 56.4165' stroke='#009E47' strokeWidth='1.2' />
                  <circle cx='82' cy='82' r='65' stroke='#009E47' strokeWidth='1.2' />
                </span>
              ) : (
                <>
                  <circle opacity='0.1' cx='82.5' cy='82.0002' r='65.2653' fill='#FF9900' />
                  <path
                    d='M82.4999 37.583V85.4163H48.3333M147.417 81.9997C147.417 117.854 118.354 146.916 82.4999 146.916C46.6454 146.916 17.5833 117.854 17.5833 81.9997C17.5833 46.1452 46.6454 17.083 82.4999 17.083C118.354 17.083 147.417 46.1452 147.417 81.9997Z'
                    stroke='#FF9900'
                    strokeWidth='1.2'
                  />
                </>
              )}
            </svg>
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
              {description}
            </div>
          </div>
        </div>
        <div
          className={css({
            position: 'relative',
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
                  background: 'white',
                  border: `1px solid ${theme.colors.tescoBlue}`,
                  fontSize: '16px',
                  lineHeight: '20px',
                  fontWeight: 'bold',
                  color: `${theme.colors.tescoBlue}`,
                  width: '50%',
                  margin: '0px 4px',
                },
              ]}
              onPress={onClose}
            >
              <Trans i18nKey='okay'>Okay</Trans>
            </Button>
          </div>
        </div>
      </div>
    </WrapperModal>
  );
};

export default SuccessModal;
