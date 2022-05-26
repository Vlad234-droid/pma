import React, { FC, HTMLProps } from 'react';
import { Trans } from 'components/Translation';

import { Item, Select } from 'components/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Option } from 'components/Form/types';
import get from 'lodash.get';

import { useStyle, CreateRule, Modal, Button } from '@pma/dex-wrapper';

export type ConfirmModal = {
  title: string;
  description?: string;
  onCancel: () => void;
  onSave: any;
  onOverlayClick?: () => void;
  submitBtnTitle?: string;
  folderSchema: Yup.AnyObjectSchema;
  field_title?: string;
  fieldName: string;
  field_options: Array<Record<string, number | string | boolean>>;
  field_placeholder: string;
};

export const TEST_DESCRIPTION = 'TEST_DESCRIPTION';
export const TEST_SELECT_ID = 'select-test-id';

type Props = HTMLProps<HTMLInputElement> & ConfirmModal;

const ConfirmModalWithDropDown: FC<Props> = ({
  title,
  description,
  onCancel,
  onSave,
  onOverlayClick,
  submitBtnTitle,
  folderSchema,
  field_title = '',
  fieldName,
  field_options,
  field_placeholder,
}) => {
  const { theme, css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(folderSchema),
  });
  const {
    setValue,
    handleSubmit,
    getValues,
    formState: { isValid },
  } = methods;
  const values = getValues();
  const submit = () => {
    onSave({ selectedIdFolder: get(values, fieldName) });
  };

  const submitForm = (e) => {
    handleSubmit(submit)(e);
  };

  return (
    <Modal
      modalPosition={'middle'}
      modalContainerRule={[containerRule({ mobileScreen })]}
      title={{
        content: title,
        styles: [
          {
            fontWeight: 700,
            fontSize: '20px',
            lineHeight: '24px',
          },
        ],
      }}
      onOverlayClick={onOverlayClick}
    >
      {description && (
        <div
          data-test-id={TEST_DESCRIPTION}
          className={css({
            padding: '16px 0',
          })}
        >
          {description}
        </div>
      )}

      <div data-test-id={TEST_SELECT_ID}>
        <Item withIcon={false} label={field_title}>
          <Select
            options={field_options as Option[]}
            name={'targetType'}
            placeholder={field_placeholder}
            //@ts-ignore
            onChange={({ target }) => {
              const { value } = target;
              setValue(fieldName, value, { shouldValidate: true });
            }}
          />
        </Item>
      </div>

      <div
        className={css({
          display: 'flex',
          justifyContent: 'center',
        })}
      >
        <Button
          styles={[
            {
              background: 'white',
              border: `2px solid ${theme.colors.tescoBlue}`,
              fontSize: '16px',
              lineHeight: '20px',
              fontWeight: 'bold',
              color: `${theme.colors.tescoBlue}`,
              width: '50%',
              margin: '0px 4px',
            },
          ]}
          onPress={onCancel}
        >
          <Trans>Cancel</Trans>
        </Button>
        <Button
          isDisabled={!isValid}
          styles={[
            {
              background: `${theme.colors.tescoBlue}`,
              fontSize: '16px',
              lineHeight: '20px',
              fontWeight: 'bold',
              width: '50%',
              margin: '0px 4px 1px 4px',
              opacity: isValid ? '1' : '0.4',
            },
          ]}
          onPress={submitForm}
        >
          {submitBtnTitle || <Trans>Submit</Trans>}
        </Button>
      </div>
    </Modal>
  );
};

const containerRule: CreateRule<{
  mobileScreen: boolean;
}> = ({ mobileScreen }) => ({
  width: mobileScreen ? '345px' : '500px',
  padding: '24px 38px 24px',
});

export default ConfirmModalWithDropDown;
