import React, { FC } from 'react';
import { theme, useStyle } from '@dex-ddl/core';
import { useTranslation } from 'components/Translation';
import { Item, Textarea, Field } from 'components/Form';
import { ButtonsWrapper } from 'components/ButtonsWrapper';
import { Rule } from '@pma/dex-wrapper';
import { Priority } from '../../config/types';
import { UseFormReturn } from 'react-hook-form';
import { Notification } from 'components/Notification';
import Spinner from 'components/Spinner';

type Props = {
  methods: UseFormReturn;
  priority?: Priority;
  loading: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  onPrevious: () => void;
};

export const PriorityNoteForm: FC<Props> = ({ methods, priority, loading, onSubmit, onPrevious, onClose }) => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const { properties } = priority || {};

  const {
    formState: { isValid },
    setValue,
    setError,
    getValues,
    handleSubmit,
  } = methods;

  const values = getValues();

  return (
    <>
      {loading ? (
        <Spinner fullHeight />
      ) : priority ? (
        <>
          <Notification
            graphic='information'
            iconColor='link'
            text={t('private_priority_note', `These will not be shared with your Line Manager.`)}
            closable={false}
            customStyle={{
              background: '#F3F9FC',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
            }}
          />
          <form className={css({ fontWeight: theme.font.weight.bold })}>
            <h3 className={css(titleStyles)}>{properties?.title}</h3>
            <h4 className={css(subTitleStyles)}>{properties?.strategic_driver}</h4>
            <p className={css(regularTextStyles)}>{properties?.description}</p>
            <Field
              name={`content`}
              Wrapper={Item}
              Element={Textarea}
              placeholder={t('enter_your_note_here', 'Enter your notes here')}
              value={values?.content}
              setError={setError}
              setValue={setValue}
              label={t('your_notes', 'Your notes')}
            />
            <ButtonsWrapper
              isValid={isValid}
              rightIcon={false}
              leftText={t('back', 'Back')}
              rightTextNotIcon={t('save_note', 'Save note')}
              onLeftPress={onPrevious}
              onRightPress={handleSubmit(onSubmit)}
            />
          </form>
        </>
      ) : (
        <>
          <div className={css(wrapperStyles)}>
            <h3 className={css(errorStyle)}>{t('there_is_no_such_note', `There is no such note`)}</h3>
          </div>
          <ButtonsWrapper
            single
            isValid
            rightIcon={false}
            onRightPress={onClose}
            rightTextNotIcon={t('close', 'Close')}
          />
        </>
      )}
    </>
  );
};

const titleStyles: Rule = ({ theme }) => ({
  paddingTop: theme.spacing.s4,
  color: theme.colors.tescoBlue,
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  letterSpacing: '0px',
});

const subTitleStyles: Rule = ({ theme }) => ({
  margin: 0,
  letterSpacing: '0px',
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fluid.f16.lineHeight,
  fontWeight: theme.font.weight.bold,
  marginBottom: theme.spacing.s2,
});

const regularTextStyles: Rule = ({ theme }) => ({
  margin: 0,
  padding: '0 0 8px 0',
  letterSpacing: '0px',
  marginBottom: theme.spacing.s10,
  fontSize: theme.font.fixed.f16.fontSize,
  fontWeight: theme.font.weight.regular,
  lineHeight: theme.font.fluid.f16.lineHeight,
});

const errorStyle: Rule = ({ theme }) => ({
  paddingTop: theme.spacing.s4,
  fontSize: theme.font.fixed.f20.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  letterSpacing: '0px',
});

const wrapperStyles: Rule = () => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '50vh',
});
