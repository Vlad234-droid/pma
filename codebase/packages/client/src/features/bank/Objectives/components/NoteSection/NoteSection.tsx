import React, { FC, useState } from 'react';
import { Rule, theme } from '@dex-ddl/core';
import { useNavigate } from 'react-router-dom';
import { useStyle } from '@pma/dex-wrapper';
import { Trans, useTranslation } from 'components/Translation';
import { Graphics, Icon } from 'components/Icon';
import { buildPath } from 'features/general/Routes';
import { paramsReplacer } from 'utils';
import { Page } from 'pages';
import { useDispatch, useSelector } from 'react-redux';
import { getPriorityNoteByReviewId, PriorityNotesActions } from '@pma/store';
import { ConfirmModal } from 'features/general/Modal';

type Props = {
  reviewUuid: string;
};

export const NoteSection: FC<Props> = ({ reviewUuid }) => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const note = useSelector((state) => getPriorityNoteByReviewId(state, reviewUuid));

  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = () => {
    navigate(buildPath(paramsReplacer(Page.PRIORITY_NOTE_EDIT, { ':uuid': reviewUuid, ':noteUuid': note.id })));
  };

  const handleDelete = () => {
    dispatch(PriorityNotesActions.deletePriorityNote({ noteId: note?.id, reviewUuid }));
    setIsOpen(false);
  };

  return (
    <>
      {note && (
        <>
          <div className={css(wrapperStyles)}>
            <h3 className={css(titleStyles)}>{t('note', 'Note')}</h3>
            <p className={css(textStyles)}>{note.content}</p>
            <div className={css(buttonWrapperStyles)}>
              <ButtonWithIcon text={t('edit', 'Edit')} graphic={'edit'} onClick={handleEdit} />
              <ButtonWithIcon text={t('delete', 'Delete')} graphic={'delete'} onClick={() => setIsOpen(true)} />
            </div>
          </div>
          {isOpen && (
            <ConfirmModal
              title={''}
              description={t(
                'are_you_sure_you_want_to_delete_the_note',
                `Are you sure you want to delete the note for ${note.title}?`,
              )}
              submitBtnTitle={<Trans i18nKey='confirm'>Confirm</Trans>}
              onSave={handleDelete}
              onCancel={() => setIsOpen(false)}
              onOverlayClick={() => setIsOpen(false)}
            />
          )}
        </>
      )}
    </>
  );
};

type ButtonProps = {
  text: string;
  graphic: Graphics;
  onClick: () => void;
};

const ButtonWithIcon: FC<ButtonProps> = ({ text, graphic, onClick }) => {
  const { css } = useStyle();

  return (
    <button className={css(buttonStyles)} onClick={onClick}>
      <Icon graphic={graphic} title={graphic} fill={theme.colors.tescoBlue} size={'18px'} />
      <span className={css({ paddingLeft: '6px', fontSize: '14px' })}>{text}</span>
    </button>
  );
};

const wrapperStyles: Rule = ({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: theme.spacing.s6,
  margin: `${theme.spacing.s6} 0px`,
  background: 'none',
  borderRadius: '10px',
  // @ts-ignore
  border: `2px solid ${theme.colors.lightGray}`,
});

const titleStyles: Rule = ({ theme }) => ({
  color: theme.colors.tescoBlue,
  fontWeight: theme.font.weight.bold,
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  letterSpacing: '0px',
  margin: `0px`,
});

const textStyles: Rule = ({ theme }) => ({
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f20.lineHeight,
  marginBottom: theme.spacing.s6,
});

const buttonWrapperStyles: Rule = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  border: 'none',
};

const buttonStyles: Rule = ({ theme }) => ({
  display: 'flex',
  cursor: 'pointer',
  appearance: 'none',
  outline: 'none',
  border: 'none',
  alignItems: 'center',
  background: 'none',
  color: theme.colors.tescoBlue,
});
