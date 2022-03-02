import React, { FC } from 'react';
import { Trans } from 'components/Translation';
import { Button, useBreakpoints, useStyle, Rule } from '@dex-ddl/core';
import { UseFormReturn } from 'react-hook-form';
import { AllNotesFolderIdTEAM, addNewFolderId } from 'utils';
import { getFoldersSelector } from '@pma/store';
import { useSelector } from 'react-redux';
import SuccessImg from 'images/success.jpg';

export type SuccessModalProps = {
  teamMethods: UseFormReturn;
  cancelTEAMModal: () => void;
  createFolder: boolean;
};

export const SuccessModal: FC<SuccessModalProps> = ({ teamMethods, cancelTEAMModal, createFolder }) => {
  const folders = useSelector(getFoldersSelector) || null;

  const { css } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;

  const { getValues } = teamMethods;

  const values = getValues();

  const propperValue = (): string => {
    let str = '';
    if (values.folder === AllNotesFolderIdTEAM || !values.folder) {
      str = 'All notes';
    } else if (values.folder === addNewFolderId) {
      str = values.folderTitle;
    } else {
      str = folders?.[folders?.findIndex((item) => item?.id === values?.folder)]?.title ?? '';
    }
    return str;
  };

  return (
    <div
      className={css({
        height: '100%',
      })}
    >
      <div
        className={css({
          height: '100%',
          overflow: 'auto',
          padding: mobileScreen ? '0 16px' : '0 40px',
        })}
      >
        <div className={css({ textAlign: 'center' })}>
          <span className={css(imgStyle)}>
            <img src={SuccessImg} alt='Success' />
          </span>
          <div className={css(doneStyle)}>
            <Trans i18nKey='done'>Done</Trans>!
          </div>
          <div className={css(textStyle)}>
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
      <div className={css(containerStyle)}>
        <div className={css(wrapperStyle)}>
          <Button styles={[okBtnStyle]} onPress={cancelTEAMModal}>
            <Trans i18nKey='okay'>Okay</Trans>
          </Button>
        </div>
      </div>
    </div>
  );
};

const wrapperStyle: Rule = {
  padding: '36px 36px',
  display: 'flex',
  justifyContent: 'center',
};
const imgStyle: Rule = {
  display: 'block',
  padding: '15px',
};
const containerStyle: Rule = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  borderTop: '1px solid #E5E5E5',
};

const textStyle: Rule = {
  fontSize: '24px',
  lineHeight: '28px',
  padding: '10px',
};
const okBtnStyle: Rule = ({ theme }) => ({
  border: `1px solid ${theme.colors.tescoBlue}`,
  fontSize: '16px',
  lineHeight: '20px',
  fontWeight: 'bold',
  color: `${theme.colors.white}`,
  width: '50%',
  margin: '0px 4px',
  background: `${theme.colors.tescoBlue}`,
});

const doneStyle: Rule = {
  fontSize: '28px',
  lineHeight: '32px',
  fontWeight: 'bold',
  padding: '10px',
};
