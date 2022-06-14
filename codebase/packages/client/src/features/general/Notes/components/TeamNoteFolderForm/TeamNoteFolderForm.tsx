import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { getColleagueByUuidSelector } from '@pma/store';
import { theme, useStyle } from '@pma/dex-wrapper';
import { yupResolver } from '@hookform/resolvers/yup';

import * as Yup from 'yup';
import { GenericItemField } from 'components/GenericForm';
import { Input, Item } from 'components/Form';
import { useTranslation } from 'components/Translation';
import { ButtonsWrapper } from 'components/ButtonsWrapper';
import { useFormWithCloseProtection } from 'hooks/useFormWithCloseProtection';
import { ColleaguesFinder } from 'features/general/GiveFeedBack';
import { schemaFolder } from '../../schema';

export const MODAL_WRAPPER = 'modal-wrapper';

type Props = {
  onSubmit: (data: any) => void;
  onClose: () => void;
  colleagueUuid: string;
};

const AddNoteModal: FC<Props> = ({ onSubmit, onClose, colleagueUuid }) => {
  const { css } = useStyle();
  const { t } = useTranslation();

  const methods = useFormWithCloseProtection({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(schemaFolder),
  });

  const {
    formState: { isValid },
    getValues,
    handleSubmit,
    setValue,
  } = methods;

  const values = getValues();

  const selectedColleague = useSelector(getColleagueByUuidSelector(values.referenceColleagueUuid));

  return (
    <form className={css({ marginTop: '40px', fontWeight: theme.font.weight.bold })}>
      <ColleaguesFinder
        onSelect={(value) => setValue('referenceColleagueUuid', value, { shouldValidate: true })}
        options={{ 'manager-uuid_eq': colleagueUuid }}
        value={
          values.referenceColleagueUuid
            ? `${selectedColleague?.colleague?.profile?.firstName} ${selectedColleague?.colleague?.profile?.lastName}`
            : ''
        }
      />
      {values.referenceColleagueUuid && (
        <GenericItemField
          name={`title`}
          methods={methods}
          Wrapper={Item}
          Element={Input}
          placeholder={t('enter_a_name_for_your_new_folder', 'Enter a name for your new folder')}
          value={values?.title}
          label={t('folder_name', 'Folder name')}
        />
      )}
      <ButtonsWrapper isValid={isValid} onLeftPress={onClose} onRightPress={handleSubmit(onSubmit)} />
    </form>
  );
};

export default AddNoteModal;
