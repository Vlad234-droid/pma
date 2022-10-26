import React, { FC, useEffect, useState } from 'react';
import { CreateRule, Rule, useStyle } from '@pma/dex-wrapper';

import { CanPerform, role } from 'features/general/Permission';
import { WrapperModal } from 'features/general/Modal';
import { Checkbox } from 'components/Form';
import { Trans, useTranslation } from 'components/Translation';
import { ButtonsWrapper } from 'components/ButtonsWrapper';

import { checkboxes, prepareData } from '../config';

import { ReportPage } from 'config/enum';

export const DOWNLOAD_WRAPPER = 'modal-wrapper';

type ModalProps = {
  onClose: (selectedCheckboxes?: any) => void;
  tiles: Array<string>;
};

const ReportModal: FC<ModalProps> = ({ onClose, tiles }) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true, medium: true }) || false;
  const { t } = useTranslation();

  const [selectedCheckboxes, setSelectedCheckboxes] = useState(checkboxes(t));

  useEffect(() => {
    tiles.length &&
      setSelectedCheckboxes((prev) => {
        return prev.map((checkbox, i) => {
          if (i === prev.length - 1)
            return {
              ...checkbox,
              ...(tiles.length === selectedCheckboxes.length && {
                isChecked: true,
              }),
            };
          return {
            ...checkbox,
            ...(tiles.some((item) => item === checkbox.label) && {
              isChecked: true,
            }),
          };
        });
      });
  }, []);

  const submitReportModal = () => {
    const isCheckAll = selectedCheckboxes.slice(0, -1).every((item) => item.isChecked);
    onClose(prepareData(selectedCheckboxes, isCheckAll, t));
  };

  const handleCheck = (checkboxId) => {
    const itemIndex = selectedCheckboxes.findIndex((item) => item.id === checkboxId);
    const isSelectAll = itemIndex === selectedCheckboxes.length - 1;
    if (isSelectAll) {
      return setSelectedCheckboxes((prev) =>
        prev.map((checkbox) => ({
          ...checkbox,
          isChecked: !prev[itemIndex].isChecked,
        })),
      );
    }
    const item = {
      ...selectedCheckboxes[itemIndex],
      isChecked: !selectedCheckboxes[itemIndex]['isChecked'],
    };
    const newArray = [...selectedCheckboxes];
    newArray[itemIndex] = item;
    setSelectedCheckboxes(newArray);
  };

  const isDisabledSubmit = () => selectedCheckboxes.some((item) => item['isChecked']);
  return (
    <WrapperModal onClose={onClose} title={t('edit_dashboard', 'Edit dashboard')}>
      <div className={css(wrapperModalGiveFeedbackStyle)}>
        <h3 className={css(modalTitleStyle({ mobileScreen }))} data-test-id={DOWNLOAD_WRAPPER}>
          <Trans i18nKey='choose_which_data_you_want_to_see_in_your_dashboard'>
            Choose which data you want to see in your dashboard
          </Trans>
        </h3>
        <div>
          <div className={css({ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' })}>
            {selectedCheckboxes.map((item) =>
              item.id !== ReportPage.REPORT_WORK_LEVEL ? (
                <label key={item.id} className={css(checkboxItemStyle)} data-test-id={item.id}>
                  <Checkbox checked={item.isChecked} onChange={() => handleCheck(item.id)} />
                  <span className={css({ marginLeft: '15px' })}>{item.label}</span>
                </label>
              ) : (
                <CanPerform
                  key={item.id}
                  perform={[role.TALENT_ADMIN]}
                  yes={() => (
                    <label key={item.id} className={css(checkboxItemStyle)} data-test-id={item.id}>
                      <Checkbox checked={item.isChecked} onChange={() => handleCheck(item.id)} />
                      <span className={css({ marginLeft: '15px' })}>{item.label}</span>
                    </label>
                  )}
                />
              ),
            )}
          </div>
        </div>
        <ButtonsWrapper
          isValid={isDisabledSubmit()}
          onLeftPress={onClose}
          onRightPress={submitReportModal}
          rightIcon={false}
          rightTextNotIcon={'save_changes'}
        />
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

export default ReportModal;
