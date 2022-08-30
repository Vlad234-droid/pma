import React, { FC, useMemo } from 'react';
import { useTranslation } from 'components/Translation';
import { PriorityNoteForm } from './components/PriorityNoteForm/PriorityNoteForm';
import SelectPriorityForm from './components/SelectPriorityForm';
import { FormPropsType, FormState, FormType, withForm } from './hoc/withForm';
import { Wrapper } from './components/Wrapper/Wrapper';
import { SuccessMessage } from './components/SuccessMessage/SuccessMessage';

type Props = FormPropsType;

const PriorityNote: FC<Props> = ({
  methods,
  success,
  loading,
  formState,
  formType,
  priorities,
  priority,
  onSubmit,
  onNext,
  onPrevious,
  onClose,
}) => {
  const { t } = useTranslation();

  const title = useMemo(() => {
    switch (formType) {
      case FormType.NEW:
        return t('add_a_note_for_priority', 'Add note');
      case FormType.EDIT:
        return t('edit_a_note_for_priority', 'Edit note');
    }
  }, [formType, t]);

  const description = useMemo(() => {
    switch (formType) {
      case FormType.NEW:
        return t('you_have_added_a_new_note', 'You have added a new note');
      case FormType.EDIT:
        return t('you_have_edited_a_note', 'You have edited a note');
    }
  }, [formType, t]);

  return (
    <Wrapper title={title} onClose={onClose}>
      {(() => {
        if (success) return <SuccessMessage title={title} description={description} onClose={onClose} />;
        switch (formState) {
          case FormState.PROVIDE_NOTE:
            return (
              <PriorityNoteForm
                methods={methods}
                priority={priority}
                loading={loading}
                onClose={onClose}
                onSubmit={onSubmit}
                onPrevious={onPrevious}
              />
            );
          case FormState.SELECT_PRIORITY:
            return <SelectPriorityForm loading={loading} priorities={priorities} onNext={onNext} onClose={onClose} />;
        }
      })()}
    </Wrapper>
  );
};

export default withForm(PriorityNote);
