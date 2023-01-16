import React, { FC, useState } from 'react';
import { CreateRule, Rule, useStyle } from '@pma/dex-wrapper';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';

import { CanPerform, role } from 'features/general/Permission';
import { WrapperModal } from 'features/general/Modal';
import { buildPath } from 'features/general/Routes';
import { Checkbox, Item, Option, Select } from 'components/Form';
import { Trans, useTranslation } from 'components/Translation';
import { ButtonsWrapper } from 'components/ButtonsWrapper';

import { formatDateStringFromISO, getFinancialYear, getYearsFromCurrentYear } from 'utils/date';
import success from 'images/success.jpg';
import { checkboxes, getTopics, reportByYearSchema } from './config';

import { useFormWithCloseProtection } from 'hooks/useFormWithCloseProtection';
import { ReportPage } from 'config/enum';
import { Page } from 'pages';
import { filterToRequest } from 'utils';
import useDownloadExelFile from 'hooks/useDownloadExelFile';

const REPORT_URL = 'reports/statistics-report/formats/excel';

export const DOWNLOAD_WRAPPER = 'modal-wrapper';

const DownloadReport: FC = () => {
  const { css, matchMedia } = useStyle();
  const { state } = useLocation();
  const { filters } = (state as any) || {};
  const mobileScreen = matchMedia({ xSmall: true, small: true, medium: true }) || false;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const methods = useFormWithCloseProtection({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(reportByYearSchema),
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const {
    formState: { isValid },
    getValues,
    setValue,
    handleSubmit,
  } = methods;

  const values = getValues();

  const downloadReport = useDownloadExelFile({
    resource: { url: REPORT_URL },
    fileName: `Statistics Report (${formatDateStringFromISO(new Date().toISOString(), 'dd LLL yyyy HH:mm:ms')})`,
    ext: 'xlsx',
    errorMassage: {
      title: t('statistics_not_found', 'Statistics not found'),
      description: t('try_to_select_another_year', 'Try to select another year.'),
    },
  });

  const onSubmit = (data) => {
    const { year, topics } = data;
    downloadReport({
      year,
      topics_in: getTopics(
        //@ts-ignore
        Object.entries(topics).reduce((acc, [keys, value]) => [...(value ? [keys] : []), ...acc], []),
      ),
      ...filterToRequest(filters),
    }).then(() => setShowSuccessModal(true));
  };

  const handleClose = () => navigate(buildPath(Page.REPORT));

  const fieldOptions: Option[] = getYearsFromCurrentYear(getFinancialYear()).map(({ value }) => ({
    value,
    label: `${value} - ${Number(value) + 1}`,
  }));

  return (
    <WrapperModal onClose={handleClose} title={t('download_and_extract', 'Download and Extract')}>
      <div className={css(wrapperModalGiveFeedbackStyle)}>
        {showSuccessModal ? (
          <div data-test-id='success-wrapper' className={css(successContainer)}>
            <img src={success} alt='success' />
            <div className={css(successModalTitle)}>Done!</div>
            <div className={css(successModalText)}>You have downloaded the report onto your device.</div>
            <ButtonsWrapper
              single={true}
              rightIcon={false}
              rightTextNotIcon='okay'
              isValid={true}
              onRightPress={handleClose}
            />
          </div>
        ) : (
          <>
            <h3 className={css(modalTitleStyle({ mobileScreen }))} data-test-id={DOWNLOAD_WRAPPER}>
              <Trans i18nKey='topics_to_download_into_excel_report'>
                Choose which topics you’d like to download into an excel report
              </Trans>
            </h3>
            <div>
              <div className={css({ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' })}>
                {checkboxes(t).map((item) =>
                  item.id !== ReportPage.REPORT_WORK_LEVEL ? (
                    <label key={item.id} className={css(checkboxItemStyle)} data-test-id={item.id}>
                      <Checkbox
                        name={item.id}
                        checked={values?.topics?.[item.id] ?? false}
                        onChange={() =>
                          setValue(`topics.${item.id}`, !values?.topics?.[item.id], {
                            shouldValidate: true,
                          })
                        }
                      />
                      <span className={css({ marginLeft: '15px' })}>{item.label}</span>
                    </label>
                  ) : (
                    <CanPerform
                      key={item.id}
                      perform={[role.TALENT_ADMIN]}
                      yes={() => (
                        <label key={item.id} className={css(checkboxItemStyle)} data-test-id={item.id}>
                          <Checkbox
                            checked={values?.topics?.[item.id] ?? false}
                            onChange={() =>
                              setValue(`topics.${item.id}`, !values?.topics?.[item.id], { shouldValidate: true })
                            }
                          />
                          <span className={css({ marginLeft: '15px' })}>{item.label}</span>
                        </label>
                      )}
                    />
                  ),
                )}
              </div>

              <Item withIcon={false} label={t('select_a_year', 'Select a year')}>
                <Select
                  options={fieldOptions}
                  name={'year'}
                  placeholder={t('please_select', 'Please select')}
                  onChange={({ target: { value } }) => {
                    setValue('year', value, { shouldValidate: true });
                  }}
                />
              </Item>

              <>
                <div className={css(textBlock, { fontWeight: 700 })}>Guidance for colleagues</div>
                <div className={css(textBlock, { marginBottom: '30px' })}>
                  <Trans i18nKey='data_is_confidential'>
                    This data is confidential. If you need to download this data, you must ensure you do not share with
                    anyone else and that you store the data securely with a password.
                  </Trans>
                </div>
              </>
            </div>
            <ButtonsWrapper
              isValid={isValid}
              onLeftPress={handleClose}
              onRightPress={handleSubmit(onSubmit)}
              rightIcon={false}
              rightTextNotIcon={'download'}
            />
          </>
        )}
      </div>
    </WrapperModal>
  );
};

const successContainer: Rule = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
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
    textAlign: 'center',
  };
};

export default DownloadReport;
