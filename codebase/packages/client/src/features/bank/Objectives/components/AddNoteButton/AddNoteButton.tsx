import React, { FC, useMemo } from 'react';
import { getReviewsWithoutPriorityNote } from '@pma/store';
import { CreateRule, useStyle } from '@pma/dex-wrapper';
import { useSelector } from 'react-redux';

import { Trans } from 'components/Translation';
import { Icon } from 'components/Icon';
import { Status } from 'config/enum';
import { Objective as ObjectiveTypes } from '../../type';

type Props = {
  objectives: ObjectiveTypes[];
  onClick: () => void;
};

export const AddNoteButton: FC<Props> = ({ objectives, onClick }) => {
  const { css } = useStyle();

  const filteredObjectives = useMemo(
    () =>
      objectives.filter((objective) => objective.status === Status.APPROVED || objective.status === Status.COMPLETED),
    [objectives],
  );

  const isDisabled = useSelector((state) => getReviewsWithoutPriorityNote(state, filteredObjectives)).length === 0;

  return (
    <button className={css(buttonStyles({ isDisabled }))} onClick={onClick}>
      <Icon graphic='add' title={'add'} size={'24px'} />
      <span className={css({ paddingLeft: '10px', fontSize: '16px' })}>
        <Trans i18nKey={'add_notes'}>Add notes</Trans>
      </span>
    </button>
  );
};

const buttonStyles: CreateRule<{ isDisabled: boolean }> =
  ({ isDisabled }) =>
  ({ theme }) => ({
    display: 'flex',
    cursor: 'pointer',
    appearance: 'none',
    outline: 'none',
    alignItems: 'center',
    width: '100%',
    padding: '24px 0px',
    background: 'none',
    color: theme.colors.tescoBlue,
    marginBottom: theme.spacing.s10,
    borderWidth: '0px 0px 2px 0px',
    // @ts-ignore
    borderBottom: `2px solid ${theme.colors.lightGray}`,
    opacity: isDisabled ? 0.6 : 1,
    pointerEvents: isDisabled ? 'none' : 'all',
  });
