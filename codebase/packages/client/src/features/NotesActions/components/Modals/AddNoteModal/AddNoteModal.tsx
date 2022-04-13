import React, { FC, useState } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';

import { Notification } from 'components/Notification';
import { GenericItemField } from 'components/GenericForm';
import { Input, Item, Select, Textarea } from 'components/Form';
import { useTranslation } from 'components/Translation';
import SuccessModal from '../SuccessModal';
import { ButtonsWrapper } from 'components/ButtonsWrapper';
import { ArrowLeftIcon } from 'components/ArrowLeftIcon';

import get from 'lodash.get';
import { Option } from 'components/Form/types';
import { AddNoteModalProps } from '../../../type';
import { addNewFolderId, getFolder, getNotes } from 'utils';

export const MODAL_WRAPPER = 'modal-wrapper';

const AddNoteModal: FC<AddNoteModalProps> = ({ methods, cancelModal, submitForm, createFolder, foldersWithNotes }) => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const [successModal, setSuccessModal] = useState<boolean>(false);

  const {
    formState: { isValid },
    trigger,
    getValues,
    setValue,
  } = methods;

  const values = getValues();

  if (successModal) {
    return <SuccessModal values={values} createFolder={createFolder} cancelModal={cancelModal} />;
  }

  const option = createFolder ? 'folder' : 'note';

  return (
    <>
      <div className={css(WrapperModalGiveFeedbackStyle)} data-test-id={MODAL_WRAPPER}>
        <div>
          <Notification
            graphic='information'
            iconColor='link'
            text={t(
              'private_folder_note',
              `Remember these ${option} are private, but in limited circumstances, they may need to be shared with others so should be kept professional.`,
              { option },
            )}
            closable={false}
            customStyle={{
              background: '#F3F9FC',
              marginBottom: '20px',
            }}
          />
          <form className={css({ marginTop: '40px' })}>
            {!createFolder
              ? getNotes(foldersWithNotes, t)?.require.map((item) => {
                  if (item.type === 'input') {
                    return (
                      <GenericItemField
                        key={item.id}
                        name={`noteTitle`}
                        methods={methods}
                        label={item.title}
                        Wrapper={Item}
                        Element={Input}
                        placeholder={item.placeholder}
                        value={values?.noteTitle}
                      />
                    );
                  }
                  if (item.type === 'textarea') {
                    return (
                      <GenericItemField
                        key={item.id}
                        name={`noteText`}
                        methods={methods}
                        label={item.title}
                        Wrapper={Item}
                        Element={Textarea}
                        placeholder={item.placeholder}
                        value={values?.noteText}
                      />
                    );
                  }
                  // TODO: Extract duplicate 6
                  if (item.type === 'select') {
                    const { field_options } = item;
                    return (
                      <Item withIcon={false} label={item.title} key={item.id}>
                        <Select
                          options={field_options as Option[]}
                          name={'targetType'}
                          placeholder={item.placeholder}
                          //@ts-ignore
                          onChange={({ target }) => {
                            const { value } = target;
                            if (get(values, 'folderTitle')) setValue('folderTitle', '', { shouldValidate: false });
                            setValue('folder', value, { shouldValidate: true });
                          }}
                        />
                      </Item>
                    );
                  }
                })
              : getFolder(t)?.map((item) => {
                  return (
                    <GenericItemField
                      key={item.id}
                      name={`folderTitle`}
                      methods={methods}
                      label={item.title}
                      Wrapper={Item}
                      Element={Input}
                      placeholder={item.placeholder}
                      onChange={() => {
                        trigger('folderTitle');
                      }}
                      value={values?.folderTitle}
                    />
                  );
                })}

            {get(values, 'folder') === addNewFolderId && (
              <GenericItemField
                key={getNotes(foldersWithNotes, t)?.option.id}
                name={`folderTitle`}
                methods={methods}
                Wrapper={Item}
                Element={Input}
                placeholder={getNotes(foldersWithNotes, t)?.option.placeholder}
                value={values?.folderTitle}
                label={getNotes(foldersWithNotes, t)?.option.title}
              />
            )}
            <ButtonsWrapper
              isValid={isValid}
              onLeftPress={cancelModal}
              onRightPress={() => {
                submitForm();
                setSuccessModal(() => true);
              }}
            />
          </form>
          <ArrowLeftIcon onClick={cancelModal} data-test-id='arrowRight' />
        </div>
      </div>
    </>
  );
};

const WrapperModalGiveFeedbackStyle: Rule = {
  paddingLeft: '40px',
  paddingRight: '40px',
  height: '100%',
  overflow: 'auto',
};

export default AddNoteModal;
