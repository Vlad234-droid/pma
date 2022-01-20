import React, { FC, HTMLProps, useState } from 'react';
import { useBreakpoints, useStyle, CreateRule, Modal, Button, Rule } from '@dex-ddl/core';
import { Trans } from 'components/Translation';
import { Radio } from 'components/Form';

type LabelType = {
  value: string;
  label: string;
};

export type ConfirmModal = {
  title: string;
  description?: string;
  onCancel: () => void;
  onSave: any;
  onOverlayClick?: () => void;
  submitBtnTitle?: string;
  options: Array<LabelType>;
};

type Props = HTMLProps<HTMLInputElement> & ConfirmModal;

export const ConfirmModalWithSelectOptions: FC<Props> = ({
  title,
  description,
  onCancel,
  onSave,
  onOverlayClick,
  submitBtnTitle,
  options,
}) => {
  const { css } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  const [checkedItems, setCheckedItems] = useState<Array<string>>([]);

  const submitForm = () => {
    onSave(checkedItems);
  };

  return (
    <Modal
      modalPosition={'middle'}
      modalContainerRule={[containerRule({ mobileScreen })]}
      title={{
        content: title,
        styles: [modalTitleStyle],
      }}
      onOverlayClick={onOverlayClick}
    >
      {description && (
        <div
          className={css({
            padding: '16px 0',
          })}
        >
          {description}
        </div>
      )}

      {options?.map((item) => {
        const { label } = item;

        return (
          <label key={label} htmlFor={`${label}-status`} className={css(labelStyle)}>
            <Radio
              name={`${label}-status`}
              checked={checkedItems.includes(label)}
              id={`${label}-status`}
              onChange={() => setCheckedItems(() => [label])}
            />
            <span className={css(textLabel)}>
              <Trans>{label}</Trans>
            </span>
          </label>
        );
      })}

      <div className={css(flexStyle)}>
        <Button styles={[cancelBtnStyle]} onPress={onCancel}>
          <Trans>Cancel</Trans>
        </Button>
        <Button styles={[submitBtnStyle]} onPress={submitForm}>
          {submitBtnTitle || <Trans>Submit</Trans>}
        </Button>
      </div>
    </Modal>
  );
};

const textLabel: Rule = {
  fontSize: '16px',
  lineHeight: '20px',
  padding: '2px 0px 0px 11px',
};
const labelStyle: Rule = {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  marginBottom: '24px',
};

const flexStyle: Rule = {
  display: 'flex',
  justifyContent: 'center',
};
const modalTitleStyle: Rule = {
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: '24px',
};

const cancelBtnStyle: Rule = ({ theme }) => ({
  background: 'white',
  border: `1px solid ${theme.colors.tescoBlue}`,
  fontSize: '16px',
  lineHeight: '20px',
  fontWeight: 'bold',
  color: `${theme.colors.tescoBlue}`,
  width: '50%',
  margin: '0px 4px',
});

const submitBtnStyle: Rule = ({ theme }) => ({
  background: `${theme.colors.tescoBlue}`,
  fontSize: '16px',
  lineHeight: '20px',
  fontWeight: 'bold',
  width: '50%',
  margin: '0px 4px 1px 4px',
  opacity: '1',
});

const containerRule: CreateRule<{
  mobileScreen: boolean;
}> = ({ mobileScreen }) => ({
  width: mobileScreen ? '345px' : '500px',
  padding: '24px 38px 24px',
});
