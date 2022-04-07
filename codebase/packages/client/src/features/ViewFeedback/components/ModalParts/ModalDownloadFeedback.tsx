import React, { FC, useEffect, useMemo, useState } from 'react';
import { ModalDownloadFeedbackProps } from './type';
import { Button, Rule, useStyle } from '@pma/dex-wrapper';
import { IconButton, Position } from 'components/IconButton';
import { SearchPart, SubmitPart } from './components';
import { Trans } from 'components/Translation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { createDownLoadSchema } from './config/schema';
import { SuccessModal } from './';
import { ColleaguesActions, getColleagueByUuidSelector } from '@pma/store';
import { useDispatch, useSelector } from 'react-redux';
import { downloadPDF, FeedbackDocument, usePDF } from '@pma/pdf-renderer';

export const DOWNLOAD_WRAPPER = 'download-wrapper';

const ModalDownloadFeedback: FC<ModalDownloadFeedbackProps> = ({
  setOpenMainModal,
  modalSuccess,
  setModalSuccess,
  closeHandler,
  downloadTitle,
  downloadDescription,
}) => {
  const { css, theme, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const dispatch = useDispatch();
  const [selected, setSelected] = useState([]);

  const document = useMemo(() => <FeedbackDocument items={selected} />, [selected.length]);

  const [instance, updateInstance] = usePDF({ document });

  useEffect(() => {
    updateInstance();
  }, [selected.length]);

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(createDownLoadSchema),
  });

  const {
    formState: { isValid },
    getValues,
    reset,
  } = methods;

  const formData = getValues();

  const selectedColleague = useSelector(getColleagueByUuidSelector(formData.targetColleagueUuid));

  const clearColleagueList = () => dispatch(ColleaguesActions.clearColleagueList());

  const handleResetForm = () => {
    clearColleagueList();
    reset();
  };

  useEffect(() => {
    return () => {
      clearColleagueList();
    };
  }, []);

  const handleSuccess = () => {
    clearColleagueList();
    reset();
    setOpenMainModal(false);
    setModalSuccess(false);
  };

  if (modalSuccess) {
    return <SuccessModal onSuccess={handleSuccess} />;
  }

  return (
    <div className={css(wrapperDownloadRule)} data-test-id={DOWNLOAD_WRAPPER}>
      <h2 className={css(downloadTitleStyled)}>{downloadTitle}</h2>
      <p className={css(downloadDescriptionStyled)}>{downloadDescription}</p>
      <form>
        <SearchPart setValue={methods.setValue} selectedColleague={selectedColleague} date={formData.date} />
        {selectedColleague && (
          <SubmitPart selectedPerson={selectedColleague.colleague} searchDate={formData.date} onChange={setSelected} />
        )}
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
              //@ts-ignore
              borderTop: `${theme.border.width.b2} solid ${theme.colors.lightGray}`,
            })}
          >
            <div
              className={css({
                padding: mobileScreen ? theme.spacing.s6 : theme.spacing.s8,
                display: 'flex',
                justifyContent: 'space-between',
                gap: '20px',
              })}
            >
              <Button styles={[outlineBtnRule]} onPress={closeHandler}>
                <Trans i18nKey='Cancel'>Cancel</Trans>
              </Button>

              <Button styles={[outlineBtnRule]} onPress={handleResetForm}>
                <Trans i18nKey='search_again'>Search again</Trans>
              </Button>

              <IconButton
                isDisabled={!isValid || selected.length <= 0}
                customVariantRules={{ default: iconBtnStyle, disabled: iconBtnStyleDisabled }}
                graphic='arrowRight'
                iconProps={{ invertColors: true }}
                iconPosition={Position.RIGHT}
                onPress={() => {
                  downloadPDF(instance.url!);
                  setModalSuccess(true);
                }}
              >
                {instance.loading ? (
                  <Trans i18nKey='loading'>Loading...</Trans>
                ) : (
                  <Trans i18nKey='download'>Download</Trans>
                )}
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
          }}
          iconProps={{ invertColors: true }}
        />
      </span>
    </div>
  );
};

const wrapperDownloadRule: Rule = {
  padding: '0px 40px',
  height: '100%',
  overflow: 'auto',
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

// TODO: Extract duplicate 7
const outlineBtnRule: Rule = (theme) => ({
  ...theme.font.fixed.f16,
  fontWeight: theme.font.weight.bold,
  width: '49%',
  margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
  background: theme.colors.white,
  border: `${theme.border.width.b2} solid ${theme.colors.tescoBlue}`,
  color: `${theme.colors.tescoBlue}`,
});

// TODO: Extract duplicate 4
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

// TODO: Extract duplicate 5
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
