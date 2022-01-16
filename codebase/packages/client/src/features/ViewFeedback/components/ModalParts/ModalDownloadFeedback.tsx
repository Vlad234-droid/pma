import React, { FC, useState } from 'react';
import { ModalDownloadFeedbackProps, PeopleTypes } from './type';
import { useStyle, useBreakpoints, Rule, Button } from '@dex-ddl/core';
import { IconButton, Position } from 'components/IconButton';
import { SearchPart, SubmitPart } from './components';
import { Trans } from 'components/Translation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { createDownLoadSchema } from './config/schema';
import { SuccessModal } from './index';
import { ColleaguesActions } from '@pma/store';
import { useDispatch } from 'react-redux';

const ModalDownloadFeedback: FC<ModalDownloadFeedbackProps> = ({
  setOpenMainModal,
  ModalSuccess,
  setModalSuccess,
  closeHandler,
  downloadTitle,
  downloadDescription,
}) => {
  const { css, theme } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedPerson, setSelectedPerson] = useState<PeopleTypes | null>(null);

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(createDownLoadSchema),
  });

  const {
    formState: { isValid },
  } = methods;

  if (ModalSuccess) {
    return (
      <SuccessModal
        setOpenMainModal={setOpenMainModal}
        setSelectedPerson={setSelectedPerson}
        setModalSuccess={setModalSuccess}
      />
    );
  }

  return (
    <div className={css({ padding: '0px 40px' })}>
      <h2 className={css(downloadTitleStyled)}>{downloadTitle}</h2>
      <p className={css(downloadDescriptionStyled)}>{downloadDescription}</p>
      <form>
        <SearchPart
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          selectedPerson={selectedPerson}
          setSelectedPerson={setSelectedPerson}
          methods={methods}
        />
        {selectedPerson && <SubmitPart selectedPerson={selectedPerson} />}
        <div
          className={css({
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            background: '#FFFFFF',
            height: '112px',
          })}
        >
          <div
            className={css({
              position: 'relative',
              bottom: theme.spacing.s0,
              left: theme.spacing.s0,
              right: theme.spacing.s0,
              borderTop: `${theme.border.width.b1} solid ${theme.colors.backgroundDarkest}`,
            })}
          >
            <div
              className={css({
                padding: mobileScreen ? theme.spacing.s6 : theme.spacing.s8,
                display: 'flex',
                justifyContent: 'space-between',
              })}
            >
              <Button
                styles={[
                  theme.font.fixed.f16,
                  {
                    fontWeight: theme.font.weight.bold,
                    width: '49%',
                    margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
                    background: theme.colors.white,
                    border: `${theme.border.width.b1} solid ${theme.colors.tescoBlue}`,
                    color: `${theme.colors.tescoBlue}`,
                  },
                ]}
                onPress={closeHandler}
              >
                <Trans>Cancel</Trans>
              </Button>

              <IconButton
                isDisabled={!isValid}
                customVariantRules={{ default: iconBtnStyle, disabled: iconBtnStyleDisabled }}
                graphic='arrowRight'
                iconProps={{ invertColors: true }}
                iconPosition={Position.RIGHT}
                onPress={() => {
                  setModalSuccess(() => true);
                }}
              >
                Download
              </IconButton>
            </div>
          </div>
        </div>
      </form>
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
            dispatch(ColleaguesActions.clearColleagueList());

            if (selectedPerson) {
              setSelectedPerson(() => null);
            } else {
              closeHandler();
            }
          }}
          iconProps={{ invertColors: true }}
        />
      </span>
    </div>
  );
};

const downloadTitleStyled: Rule = {
  margin: '0px 0px 8px 0px',
  fontWeight: 'bold',
  fontSize: '24px',
  lineHeight: '28px',
};

const downloadDescriptionStyled: Rule = {
  margin: '0px',
  fontWeight: 'normal',
  fontSize: '18px',
  lineHeight: '22px',
};

//

const iconBtnStyle: Rule = ({ theme }) => ({
  padding: '0px 6px 0px 20px',
  display: 'flex',
  width: '49%',
  height: '40px',
  borderRadius: '20px',
  justifyContent: 'space-between',
  alignItems: 'center',
  outline: 0,
  background: theme.colors.tescoBlue,
  color: theme.colors.white,
  cursor: 'pointer',
});

const iconBtnStyleDisabled: Rule = ({ theme }) => ({
  padding: '0px 6px 0px 20px',
  display: 'flex',
  width: '49%',
  height: '40px',
  borderRadius: '20px',
  justifyContent: 'space-between',
  alignItems: 'center',
  outline: 0,
  background: theme.colors.tescoBlue,
  color: theme.colors.white,
  pointerEvents: 'none',
  opacity: '0.4',
});

export default ModalDownloadFeedback;
