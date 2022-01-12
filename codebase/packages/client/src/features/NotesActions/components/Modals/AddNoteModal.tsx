import React, { FC } from 'react';
import { useStyle, useBreakpoints, Button, Styles, Rule, CreateRule } from '@dex-ddl/core';
import { Notification } from 'components/Notification';
import { GenericItemField } from 'components/GenericForm';
import { Item, Input, Select, Textarea } from 'components/Form';
import { AddNoteModalProps } from '../../type';
import { Trans } from 'components/Translation';
import { IconButton, Position } from 'components/IconButton';
import { Icon as IconComponent } from 'components/Icon';
import { SuccessModal } from '../Modals';

export const ADD_NOTE_MODAL_WRAPPER = 'add_note_modal_wrapper';

const AddNoteModal: FC<AddNoteModalProps> = ({
  methods,
  cancelModal,
  submitForm,
  setPersonalNoteModal,
  setSuccessModal,
  successModal,
  createFolder,
  setCreateFolder,
  foldersWithNotes,
}) => {
  const { css, theme } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;

  const {
    formState: { isValid },
    trigger,
    getValues,
    setValue,
  } = methods;

  const values = getValues();

  const notes: any = {
    require: [
      {
        field_id: '1',
        field_type: 'input',
        field_title: 'Title',
        field_placeholder: 'Enter a title for your note',
      },
      {
        field_id: '2',
        field_type: 'textarea',
        field_title: 'Note',
        field_placeholder: 'Write your note here',
      },
      {
        field_id: '3',
        field_type: 'select',
        field_title: 'Folder (optional)',
        field_placeholder: 'Select a folder',

        field_options: [
          ...foldersWithNotes?.map((item) => ({ value: `${item.id}`, label: item.title })),
          { value: 'id_001', label: '+ Add new folder' },
        ],
      },
    ],
    option: {
      field_id: '4',
      field_type: 'input',
      field_title: 'Folder name',
      field_placeholder: 'Enter a name for your new folder',
    },
  };
  const folder = [
    {
      field_id: '1',
      field_type: 'input',
      field_title: 'Folder name',
      field_placeholder: 'Enter a name for your new folder',
    },
  ];

  if (successModal) {
    return (
      <SuccessModal
        values={values}
        setPersonalNoteModal={setPersonalNoteModal}
        setSuccessModal={setSuccessModal}
        createFolder={createFolder}
        setCreateFolder={setCreateFolder}
        methods={methods}
      />
    );
  }

  return (
    <div className={css(WrapperModalGiveFeedbackStyle)} data-test-id={ADD_NOTE_MODAL_WRAPPER}>
      <div>
        <Notification
          graphic='information'
          iconColor='link'
          text={`Remember these ${
            createFolder ? 'folder' : 'note'
          } are private, but in limited circumstances, they may need to be shared with others so should be kept professional.`}
          closable={false}
          customStyle={{
            background: '#F3F9FC',
            marginBottom: '20px',
          }}
        />
        <form className={css({ marginTop: '40px' })}>
          {!createFolder
            ? notes.require.map((item) => {
                if (item.field_type === 'input') {
                  return (
                    <GenericItemField
                      key={item.field_id}
                      name={`noteTitle`}
                      methods={methods}
                      label={item.field_title}
                      Wrapper={Item}
                      Element={Input}
                      placeholder={item.field_placeholder}
                      value={values.noteTitle}
                    />
                  );
                }
                if (item.field_type === 'textarea') {
                  return (
                    <GenericItemField
                      key={item.field_id}
                      name={`noteText`}
                      methods={methods}
                      label={item.field_title}
                      Wrapper={Item}
                      Element={Textarea}
                      placeholder={item.field_placeholder}
                      value={values.noteText}
                    />
                  );
                }
                if (item.field_type === 'select') {
                  const { field_options } = item;
                  return (
                    <GenericItemField
                      key={item.field_id}
                      name={`folder`}
                      methods={methods}
                      label={item.field_title}
                      Wrapper={({ children }) => (
                        <Item withIcon={false} label={item.field_title}>
                          {children}
                        </Item>
                      )}
                      Element={Select}
                      options={field_options}
                      placeholder={item.field_placeholder}
                      onChange={(_, value) => {
                        setValue('folder', value);
                        trigger('folder');
                      }}
                    />
                  );
                }
              })
            : folder.map((item) => {
                return (
                  <GenericItemField
                    key={item.field_id}
                    name={`folderTitle`}
                    methods={methods}
                    label={item.field_title}
                    Wrapper={Item}
                    Element={Input}
                    placeholder={item.field_placeholder}
                    onChange={() => {
                      trigger('folderTitle');
                    }}
                    value={values.folderTitle}
                  />
                );
              })}

          {!createFolder && values.folder !== '' && values.folder === 'id_001' && (
            <GenericItemField
              key={notes.option.field_id}
              name={`folderTitle`}
              methods={methods}
              Wrapper={Item}
              Element={Input}
              placeholder={notes.option.field_placeholder}
              value={values.folderTitle}
              label={notes.option.field_title}
            />
          )}

          <div className={css(blockStyle)}>
            <div
              className={css({
                position: 'relative',
                bottom: theme.spacing.s0,
                left: theme.spacing.s0,
                right: theme.spacing.s0,
                borderTop: `${theme.border.width.b1} solid ${theme.colors.backgroundDarkest}`,
              })}
            >
              <div
                className={css({
                  padding: mobileScreen ? theme.spacing.s7 : theme.spacing.s9,
                  display: 'flex',
                  justifyContent: 'center',
                })}
              >
                <Button
                  styles={[
                    theme.font.fixed.f16,
                    {
                      fontWeight: theme.font.weight.bold,
                      width: '49%',
                      margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
                      background: theme.colors.white,
                      border: `${theme.border.width.b1} solid ${theme.colors.tescoBlue}`,
                      color: `${theme.colors.tescoBlue}`,
                    },
                  ]}
                  onPress={cancelModal}
                >
                  <Trans>Cancel</Trans>
                </Button>
                <IconButton
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
                  Save
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
          onClick={() => {
            setPersonalNoteModal(() => false);
            setCreateFolder(() => false);
          }}
        >
          <IconComponent graphic='arrowLeft' invertColors={true} />
        </span>
      </div>
    </div>
  );
};
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