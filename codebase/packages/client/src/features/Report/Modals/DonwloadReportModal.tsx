import React, { FC, useState } from 'react';
import { Button, Icon, ModalWithHeader, Rule, theme, useBreakpoints, useStyle } from '@dex-ddl/core';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { reportByYearSchema, getYearsFromCurrentYear, checkboxes, getRequestParams } from '../config';
import { Select, Checkbox, Item } from 'components/Form';
import { GenericItemField } from 'components/GenericForm';
import success from 'images/success.jpg';
import { getCurrentYear } from 'utils/date';
import { Trans, useTranslation } from 'components/Translation';
import { downloadReportStatistics } from '../utils';

type ModalProps = {
  onClose: () => void;
};

const DonwloadReportModal: FC<ModalProps> = ({ onClose }) => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(reportByYearSchema),
  });

  const {
    formState: { isValid },
    getValues,
  } = methods;

  const values = getValues();

  const [selectedCheckboxes, setSelectedCheckboxes] = useState(checkboxes(t));

  const [showSuccessModal, setShowSuccesModal] = useState(false);

  const handleDownloadReport = () => {
    setShowSuccesModal(true);
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
    if (isValid && selectedCheckboxes.some((item) => item['isChecked'])) return false;
    return true;
  };

  return (
    <ModalWithHeader
      modalPosition='middle'
      title={t('download_and_exctract', 'Download and Exctract')}
      containerRule={modalWrapperStyle}
      closeOptions={{
        closeOptionContent: <Icon graphic='close' />,
        onClose: onClose,
      }}
    >
      <h3 className={css(modalTitleStyle)}>
        <Trans i18nKey='topics_to_download_into_excel_report'>
          Choose which topics you’d like to download into an excel report
        </Trans>
      </h3>
      <div className={css(modalInnerWarp)}>
        <div className={css({ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' })}>
          {selectedCheckboxes.map((item) => (
            <label key={item.id} className={css(checkboxItemStyle)}>
              <Checkbox checked={item.isChecked} onChange={() => handleCheck(item.id)} />
              <span className={css({ marginLeft: '15px' })}>{item.label}</span>
            </label>
          ))}
        </div>

        <GenericItemField
          name={'year'}
          methods={methods}
          Wrapper={({ children }) => (
            <Item label='Select a year' withIcon={false}>
              {children}
            </Item>
          )}
          Element={Select}
          options={getYearsFromCurrentYear(getCurrentYear())}
          placeholder='Please select'
        />

        <div className={css(textBlock, { fontWeight: 700 })}>Guidance for colleagues</div>
        <div className={css(textBlock, { marginBottom: '30px' })}>
          Vitae morbi ullamcorper venenatis ut. Mi auctor bibendum sed ut tempus senectus. Ullamcorper cursus purus
          lacus elementum nulla in lacus nunc. Ultrices urna magna viverra a, amet eget lorem quam. Id leo vel arcu
          nullam proin.
        </div>
      </div>

      <div className={css(formButtonsWrap)}>
        <Button
          onPress={onClose}
          mode='inverse'
          styles={[formButton, { border: `1px solid ${theme.colors.tescoBlue}` }]}
        >
          <Trans i18nKey='cancel'>Cancel</Trans>
        </Button>
        <Button isDisabled={isDisabledDownloadBtnHandler()} onPress={handleDownloadReport} styles={[formButton]}>
          <Trans i18nKey='download'>Download</Trans>
        </Button>
      </div>

      {showSuccessModal && (
        <div className={css(successModalWrap)}>
          <img src={success} alt='success' />
          <div className={css(successModalTitle)}>Done!</div>
          <div className={css(successModalText)}>You have downloaded the report onto your device.</div>
          <Button styles={[successModalBtn]} onPress={onClose}>
            Okay
          </Button>
        </div>
      )}
    </ModalWithHeader>
  );
};

const modalWrapperStyle: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall || isBreakpoint.medium;
  return {
    ...(mobileScreen
      ? {
          width: '100%',
          height: 'calc(100% - 50px)',
          marginTop: '50px',
          padding: 0,
        }
      : {
          width: '60%',
          height: 'calc(100% - 100px)',
          padding: 0,
        }),
  };
};

const modalInnerWarp: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall || isBreakpoint.medium;
  return {
    width: '100%',
    overflowY: 'scroll',
    ...(mobileScreen
      ? {
          padding: '5px 15px',
          height: 'calc(100% - 170px)',
        }
      : {
          height: 'calc(100% - 257px)',
          padding: '5px 40px',
        }),
  };
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

const modalTitleStyle: Rule = ({ theme }) => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall || isBreakpoint.medium;
  return {
    color: theme.colors.tescoBlue,
    ...(mobileScreen
      ? {
          fontSize: '20px',
          lineHeight: '24px',
          padding: '20px',
          margin: 0,
        }
      : {
          fontSize: '24px',
          lineHeight: '28px',
          padding: '40px',
          margin: 0,
        }),
  };
};

const formButtonsWrap: Rule = ({ theme }) => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall || isBreakpoint.medium;
  return {
    display: 'flex',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    borderTop: `1px solid ${theme.colors.backgroundDarkest}`,
    ...(mobileScreen
      ? {
          background: theme.colors.white,
          padding: '20px 10px',
        }
      : {
          background: 'none',
          padding: '40px 30px',
        }),
  };
};

const formButton: Rule = () => {
  return {
    width: '50%',
    margin: '0 5px',
    fontSize: '16px',
    lineHeight: '20px',
    fontWeight: 700,
  };
};

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

export default DonwloadReportModal;
