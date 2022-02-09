import React, { FC } from 'react';
import { Trans } from 'components/Translation';
import { Button, Rule, useBreakpoints, useStyle } from '@dex-ddl/core';

import { AllNotesFolderId } from '../../../../utils';
import { getFoldersSelector } from '@pma/store';
import { useSelector } from 'react-redux';
import successImg from 'images/success.jpg';

export const OK_BTN = 'ok_btn';
export const SUCCESS_MODAL_WRAPPER = 'success_modal_wrapper';

export type SuccessModalProps = {
  values: any;
  createFolder: boolean;
  cancelModal: () => void;
};

const SuccessModal: FC<SuccessModalProps> = ({ values, createFolder, cancelModal }) => {
  const { css } = useStyle();

  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  const folders = useSelector(getFoldersSelector) || null;

  const propperValue = (): string => {
    let str: string;
    if (values.folder === AllNotesFolderId || values.folder === '') {
      str = 'All notes';
    } else if (values.folder === 'id_001') {
      str = values.folderTitle;
    } else {
      str = folders?.find((item) => item?.id === values?.folder)?.title ?? '';
    }
    return str;
  };

  return (
    <div
      className={css({
        height: '100%',
      })}
      data-test-id={SUCCESS_MODAL_WRAPPER}
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
            <Trans>Done</Trans>!
          </div>
          <div
            className={css({
              fontSize: '24px',
              lineHeight: '28px',
              padding: '10px',
            })}
          >
            {!createFolder && (
              <Trans id='your_note_has_been_added_into_the_folder' folder={propperValue()}>
                <>
                  Your note has been added into
                  <br /> the folder:
                  <br /> {propperValue()}
                </>
              </Trans>
            )}
            {createFolder && <Trans>Your folder has been added</Trans>}
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
          <Button styles={[buttonStyle]} data-test-id={OK_BTN} onPress={cancelModal}>
            <Trans>Okay</Trans>
          </Button>
        </div>
      </div>
    </div>
  );
};

const buttonStyle: Rule = ({ theme }) => {
  return {
    border: `1px solid ${theme.colors.tescoBlue}`,
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
