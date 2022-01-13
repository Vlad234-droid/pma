import React, { FC } from 'react';
import { Trans } from 'components/Translation';
import { Button, useBreakpoints, useStyle } from '@dex-ddl/core';
import { UseFormReturn } from 'react-hook-form';
import { NotesTypeTEAM } from '../../../type';
import { AllNotesFolderIdTEAM } from '../../../../../utils/note';
import { getFoldersSelector } from '@pma/store';
import { useSelector } from 'react-redux';

export type SuccessModalProps = {
  setSuccessTEAMModal: React.Dispatch<React.SetStateAction<boolean>>;
  teamMethods: UseFormReturn;
  setTeamNoteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedPerson: React.Dispatch<React.SetStateAction<NotesTypeTEAM | null>>;
};

export const SuccessModal: FC<SuccessModalProps> = ({
  teamMethods,
  setTeamNoteModal,
  setSuccessTEAMModal,
  setSelectedPerson,
}) => {
  const folders = useSelector(getFoldersSelector) || null;

  const { css, theme } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;

  const { reset, getValues } = teamMethods;

  const values = getValues();

  const propperValue = (): string => {
    let str = '';
    if (values.folder === AllNotesFolderIdTEAM || values.folder === '') {
      str = 'All notes';
    } else if (values.folder === 'id_001') {
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
        <div style={{ textAlign: 'center' }}>
          <span
            style={{
              display: 'block',
              padding: '15px',
            }}
          >
            <svg width='165' height='164' viewBox='0 0 165 164' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M51.917 78.5837L70.917 97.5837L112.084 56.417' stroke='#009E47' strokeWidth='1.2' />
              <circle cx='82' cy='82' r='65' stroke='#009E47' strokeWidth='1.2' />
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
            <Trans>Done</Trans>!
          </div>
          <div
            className={css({
              fontSize: '24px',
              lineHeight: '28px',
              padding: '10px',
            })}
          >
            <Trans>
              <>
                Your note has been added into
                <br /> the folder:
                <br /> {propperValue()}
              </>
            </Trans>
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
              reset();
              setTeamNoteModal(() => false);
              setSuccessTEAMModal(() => false);
              setSelectedPerson(() => null);
            }}
          >
            <Trans>Okay</Trans>
          </Button>
        </div>
      </div>
    </div>
  );
};
