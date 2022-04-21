import React, { FC, useState } from 'react';
import { Button, CreateRule, Rule, useStyle } from '@pma/dex-wrapper';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Checkbox, Item, Select } from 'components/Form';
import { Trans, useTranslation } from 'components/Translation';
import { WrapperModal } from 'features/Modal';
import { ButtonsWrapper } from 'components/ButtonsWrapper';

import { downloadReportStatistics } from '../utils';
import { getCurrentYear } from 'utils/date';
import success from 'images/success.jpg';
import { checkboxes, getRequestParams, getYearsFromCurrentYear, reportByYearSchema } from '../config';
import { ModalStatus } from '../Report';

export const DOWNLOAD_WRAPPER = 'download-wrapper';

type ModalProps = {
  onClose: (selectedCheckboxes?: any) => void;
  modalStatus: null | ModalStatus;
};

const ReportModal: FC<ModalProps> = ({ onClose, modalStatus }) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true, medium: true }) || false;
  const { t } = useTranslation();
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(reportByYearSchema),
  });

  const {
    formState: { isValid },
    getValues,
    setValue,
  } = methods;

  const values = getValues();

  const [selectedCheckboxes, setSelectedCheckboxes] = useState(checkboxes(t));

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const submitReportModal = () => {
    if (modalStatus === ModalStatus.DOWNLOAD) {
      setShowSuccessModal(true);
      downloadReportStatistics({ year: values?.year, topics: getRequestParams(selectedCheckboxes) });
      return;
    }
    onClose(selectedCheckboxes.filter((item) => item.isChecked));
  };

  const handleCheck = (checkboxId) => {
    const itemIndex = selectedCheckboxes.findIndex((item) => item.id === checkboxId);
    const item = {
      ...selectedCheckboxes[itemIndex],
      isChecked: !selectedCheckboxes[itemIndex]['isChecked'],
    };
    const newArray = [...selectedCheckboxes];
    newArray[itemIndex] = item;
    setSelectedCheckboxes(newArray);
  };

  const isDisabledSubmit = () => {
    if (modalStatus === ModalStatus.DOWNLOAD && isValid && selectedCheckboxes.some((item) => item['isChecked']))
      return true;
    return modalStatus === ModalStatus.EDIT && selectedCheckboxes.some((item) => item['isChecked']);
  };
  return (
    <WrapperModal onClose={onClose} title={t('download_and_extract', 'Download and Extract')}>
      <div className={css(wrapperModalGiveFeedbackStyle)}>
        <h3 className={css(modalTitleStyle({ mobileScreen }))} data-test-id={DOWNLOAD_WRAPPER}>
          {modalStatus === ModalStatus.DOWNLOAD ? (
            <Trans i18nKey='topics_to_download_into_excel_report'>
              Choose which topics you’d like to download into an excel report
            </Trans>
          ) : (
            <Trans i18nKey='choose_which_data_you_want_to_see_in_your_dashboard'>
              Choose which data you want to see in your dashboard
            </Trans>
          )}
        </h3>
        <div>
          <div className={css({ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' })}>
            {selectedCheckboxes.map((item) => (
              <label key={item.id} className={css(checkboxItemStyle)} data-test-id={item.id}>
                <Checkbox checked={item.isChecked} onChange={() => handleCheck(item.id)} />
                <span className={css({ marginLeft: '15px' })}>{item.label}</span>
              </label>
            ))}
          </div>
          {modalStatus === ModalStatus.DOWNLOAD && (
            <Item withIcon={false} label={t('select_a_year', 'Select a year')}>
              <Select
                options={getYearsFromCurrentYear(getCurrentYear())}
                name={'year'}
                placeholder={t('please_select', 'Please select')}
                //@ts-ignore
                onChange={({ target: { value } }) => {
                  setValue('year', value, { shouldValidate: true });
                }}
              />
            </Item>
          )}
          {modalStatus === ModalStatus.DOWNLOAD && (
            <>
              <div className={css(textBlock, { fontWeight: 700 })}>Guidance for colleagues</div>
              <div className={css(textBlock, { marginBottom: '30px' })}>
                <Trans i18nKey='data_is_confidential'>
                  This data is confidential. If you need to download this data, you must ensure you do not share with
                  anyone else and that you store the data securely with a password.
                </Trans>
              </div>
            </>
          )}
        </div>
        <ButtonsWrapper
          isValid={isDisabledSubmit()}
          onLeftPress={onClose}
          onRightPress={submitReportModal}
          rightIcon={false}
          rightTextNotIcon={modalStatus === ModalStatus.DOWNLOAD ? 'download' : 'save_changes'}
        />

        {showSuccessModal && (
          <div className={css(successModalWrap)} data-test-id='success-wrapper'>
            <img src={success} alt='success' />
            <div className={css(successModalTitle)}>Done!</div>
            <div className={css(successModalText)}>You have downloaded the report onto your device.</div>
            <Button styles={[successModalBtn]} onPress={onClose}>
              <Trans i18nKey='okay'>Okay</Trans>
            </Button>
          </div>
        )}
      </div>
    </WrapperModal>
  );
};

const wrapperModalGiveFeedbackStyle: Rule = {
  paddingLeft: '40px',
  paddingRight: '40px',
  height: '100%',
  overflow: 'auto',
};

const checkboxItemStyle: Rule = ({ theme }) => {
  return {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: theme.font.fixed.f16.fontSize,
    outline: 'none',
    marginBottom: '15px',
  };
};

const modalTitleStyle: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    color: theme.colors.tescoBlue,
    margin: `${theme.spacing.s0} ${theme.spacing.s0} 30px ${theme.spacing.s0}`,
    ...(mobileScreen
      ? {
          fontSize: theme.font.fixed.f20.fontSize,
          lineHeight: theme.font.fixed.f20.lineHeight,
        }
      : {
          fontSize: '22px',
          lineHeight: theme.font.fixed.f24.lineHeight,
        }),
  });

const textBlock: Rule = ({ theme }) => {
  return {
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f16.lineHeight,
    marginBottom: '5px',
  };
};

const successModalWrap: Rule = ({ theme }) => {
  return {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: theme.spacing.s0,
    left: theme.spacing.s0,
    borderRadius: '32px',
    padding: '120px 40px 40px',
    background: theme.colors.white,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
  };
};

const successModalTitle: Rule = ({ theme }) => {
  return {
    fontSize: theme.font.fixed.f32.fontSize,
    fontWeight: 700,
    margin: '40px 0 15px',
  };
};

const successModalText: Rule = ({ theme }) => {
  return {
    fontSize: theme.font.fixed.f24.fontSize,
    lineHeight: theme.font.fixed.f24.lineHeight,
    maxWidth: '370px',
  };
};

const successModalBtn: Rule = () => {
  return {
    marginTop: 'auto',
    maxWidth: '250px',
    width: '100%',
    fontWeight: 700,
  };
};

export default ReportModal;
