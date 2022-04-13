import React, { FC, useState } from 'react';
import { Button, CreateRule, Rule, useStyle } from '@pma/dex-wrapper';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Select, Checkbox, Item } from 'components/Form';
import { Trans, useTranslation } from 'components/Translation';
import { WrapperModal } from 'features/Modal';
import { ButtonsWrapper } from 'components/ButtonsWrapper';

import { downloadReportStatistics } from '../utils';
import { getCurrentYear } from 'utils/date';
import success from 'images/success.jpg';
import { reportByYearSchema, getYearsFromCurrentYear, checkboxes, getRequestParams } from '../config';

export const DOWNLOAD_WRAPPER = 'download-wrapper';

type ModalProps = {
  onClose: () => void;
};

const DownloadReportModal: FC<ModalProps> = ({ onClose }) => {
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

  const handleDownloadReport = () => {
    setShowSuccessModal(true);
    downloadReportStatistics({ year: values?.year, topics: getRequestParams(selectedCheckboxes) });
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

  const isDisabledDownloadBtnHandler = () => {
    if (isValid && selectedCheckboxes.some((item) => item['isChecked'])) return true;
    return false;
  };
  return (
    <WrapperModal onClose={onClose} title={t('download_and_extract', 'Download and Extract')}>
      <div className={css(wrapperModalGiveFeedbackStyle)}>
        <h3 className={css(modalTitleStyle({ mobileScreen }))} data-test-id={DOWNLOAD_WRAPPER}>
          <Trans i18nKey='topics_to_download_into_excel_report'>
            Choose which topics you’d like to download into an excel report
          </Trans>
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
          <div className={css(textBlock, { fontWeight: 700 })}>Guidance for colleagues</div>
          <div className={css(textBlock, { marginBottom: '30px' })}>
            <Trans i18nKey='data_is_confidential'>
              This data is confidential. If you need to download this data, you must ensure you do not share with anyone
              else and that you store the data securely with a password.
            </Trans>
          </div>
        </div>
        <ButtonsWrapper
          isValid={isDisabledDownloadBtnHandler()}
          onLeftPress={onClose}
          onRightPress={handleDownloadReport}
          rightIcon={false}
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

const checkboxItemStyle: Rule = () => {
  return {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: '16px',
    outline: 'none',
    marginBottom: '15px',
  };
};

const modalTitleStyle: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    color: theme.colors.tescoBlue,
    margin: '0px 0px 10px 0px',
    ...(mobileScreen
      ? {
          fontSize: '20px',
          lineHeight: '24px',
        }
      : {
          fontSize: '22px',
          lineHeight: '28px',
        }),
  });

const textBlock: Rule = () => {
  return {
    fontSize: '16px',
    lineHeight: '20px',
    marginBottom: '5px',
  };
};

const successModalWrap: Rule = ({ theme }) => {
  return {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    borderRadius: '32px',
    padding: '120px 40px 40px',
    background: theme.colors.white,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
  };
};

const successModalTitle: Rule = () => {
  return {
    fontSize: '28px',
    fontWeight: 700,
    margin: '40px 0 15px',
  };
};

const successModalText: Rule = () => {
  return {
    fontSize: '24px',
    lineHeight: '28px',
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

export default DownloadReportModal;
