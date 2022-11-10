import React, { FC } from 'react';
import { theme, useStyle } from '@pma/dex-wrapper';
import { getNotesMetaSelector } from '@pma/store';
import { useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { GenericItemField } from 'components/GenericForm';
import { ButtonsWrapper } from 'components/ButtonsWrapper';
import { useTranslation } from 'components/Translation';
import { Input, Item } from 'components/Form';

import { useFormWithCloseProtection } from 'hooks/useFormWithCloseProtection';
import { schemaFolder } from '../../config';

export const FORM_WRAPPER = 'form-wrapper';

type Props = {
  onSubmit: (data: any) => void;
  onClose: () => void;
};

const PersonalNoteFolderForm: FC<Props> = ({ onSubmit, onClose }) => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const { loading } = useSelector(getNotesMetaSelector);

  const methods = useFormWithCloseProtection({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(schemaFolder),
  });

  const {
    formState: { isValid },
    getValues,
    handleSubmit,
  } = methods;

  const values = getValues();

  return (
    <form className={css({ marginTop: '40px', fontWeight: theme.font.weight.bold })} data-test-id={FORM_WRAPPER}>
      <GenericItemField
        name={'title'}
        methods={methods}
        Wrapper={Item}
        Element={Input}
        placeholder={t('enter_a_name_for_your_new_folder', 'Enter a name for your new folder')}
        value={values?.title}
        label={t('folder_name', 'Folder name')}
      />
      <ButtonsWrapper isValid={isValid && !loading} onLeftPress={onClose} onRightPress={handleSubmit(onSubmit)} />
    </form>
  );
};

export default PersonalNoteFolderForm;
