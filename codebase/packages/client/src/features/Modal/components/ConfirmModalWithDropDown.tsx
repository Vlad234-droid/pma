import React, { FC, HTMLProps, useState } from 'react';
import { Trans } from 'components/Translation';
import { GenericItemField } from 'components/GenericForm';
import { Item, Select } from 'components/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { useBreakpoints, useStyle, CreateRule, Modal, Button } from '@dex-ddl/core';

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
  const { theme, css } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  const [selectedIdFolder, setSelectedIdFolder] = useState<string | null>();

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(folderSchema),
  });
  const {
    trigger,
    handleSubmit,
    formState: { isValid },
  } = methods;

  const data = {
    field_id: '1',
    field_type: 'select',
    field_placeholder,
    field_title,
    field_options,
  };

  const submit = (data) => {
    onSave({ ...data, selectedIdFolder });
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
          className={css({
            padding: '16px 0',
          })}
        >
          {description}
        </div>
      )}

      <div>
        <GenericItemField
          key={data.field_id}
          name={fieldName}
          methods={methods}
          label={data.field_title}
          Wrapper={({ children }) => (
            <Item withIcon={false} label={data.field_title}>
              {children}
            </Item>
          )}
          Element={Select}
          options={data.field_options}
          placeholder={data.field_placeholder}
          onChange={(value) => {
            trigger('folder');
            setSelectedIdFolder(() => value);
          }}
        />
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
              border: `1px solid ${theme.colors.tescoBlue}`,
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
