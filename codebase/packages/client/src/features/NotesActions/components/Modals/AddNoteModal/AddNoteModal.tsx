import React, { FC, useState } from 'react';
import { useStyle, useBreakpoints, Button, Styles, Rule, CreateRule } from '@dex-ddl/core';

import { Notification } from 'components/Notification';
import { GenericItemField } from 'components/GenericForm';
import { Item, Input, Select, Textarea } from 'components/Form';
import { Trans, useTranslation } from 'components/Translation';
import { IconButton, Position } from 'components/IconButton';
import { Icon as IconComponent } from 'components/Icon';
import SuccessModal from '../SuccessModal';
import get from 'lodash.get';
import { Option } from 'components/Form/types';
import { AddNoteModalProps } from '../../../type';
import { getNotes, getFolder, addNewFolderId } from 'utils';

export const MODAL_WRAPPER = 'modal-wrapper';

const AddNoteModal: FC<AddNoteModalProps> = ({ methods, cancelModal, submitForm, createFolder, foldersWithNotes }) => {
  const { css, theme } = useStyle();
  const { t } = useTranslation();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
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

            <div className={css(blockStyle)}>
              <div className={css(wrapperStyle)}>
                <div
                  className={css({
                    padding: mobileScreen ? theme.spacing.s7 : theme.spacing.s9,
                    display: 'flex',
                    justifyContent: 'center',
                  })}
                >
                  <Button styles={[theme.font.fixed.f16, buttonCancelStyle]} onPress={cancelModal}>
                    <Trans i18nKey='cancel'>Cancel</Trans>
                  </Button>
                  <IconButton
                    data-test-id='arrowRight'
                    onPress={() => {
                      submitForm();
                      setSuccessModal(() => true);
                    }}
                    graphic='arrowRight'
                    customVariantRules={{
                      default: submitButtonStyle({ isValid }),
                      disabled: submitButtonStyle({ isValid }),
                    }}
                    iconStyles={iconStyledRule}
                    iconPosition={Position.RIGHT}
                    isDisabled={!isValid}
                  >
                    <Trans i18nKey='save'>Save</Trans>
                  </IconButton>
                </div>
              </div>
            </div>
          </form>
          <span
            className={css({
              position: 'fixed',
              top: theme.spacing.s5,
              left: mobileScreen ? theme.spacing.s5 : theme.spacing.s10,
              textDecoration: 'none',
              border: 'none',
              cursor: 'pointer',
            })}
            onClick={cancelModal}
          >
            <IconComponent graphic='arrowLeft' invertColors={true} />
          </span>
        </div>
      </div>
    </>
  );
};

const wrapperStyle: Rule = ({ theme }) => ({
  position: 'relative',
  bottom: theme.spacing.s0,
  left: theme.spacing.s0,
  right: theme.spacing.s0,
  borderTop: `${theme.border.width.b1} solid ${theme.colors.lightGray}`,
});

const buttonCancelStyle: Rule = ({ theme }) => ({
  fontWeight: theme.font.weight.bold,
  width: '49%',
  margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
  background: theme.colors.white,
  border: `${theme.border.width.b1} solid ${theme.colors.tescoBlue}`,
  color: `${theme.colors.tescoBlue}`,
});

const WrapperModalGiveFeedbackStyle: Rule = {
  paddingLeft: '40px',
  paddingRight: '40px',
  height: '100%',
  overflow: 'auto',
};
const blockStyle: Rule = () => {
  return {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
  };
};

const iconStyledRule: Rule = {
  '& > path': {
    fill: 'white',
  },
} as Styles;

const submitButtonStyle: CreateRule<{ isValid: any }> =
  ({ isValid }) =>
  ({ theme }) => ({
    fontWeight: theme.font.weight.bold,
    width: '50%',
    margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
    background: `${theme.colors.tescoBlue}`,
    color: `${theme.colors.white}`,
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0px 20px',
    borderRadius: `${theme.spacing.s20}`,
    opacity: isValid ? '1' : '0.4',
    pointerEvents: isValid ? 'all' : 'none',
  });

export default AddNoteModal;
