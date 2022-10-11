import React, { FC, useMemo } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { getReviewsWithoutPriorityNote } from '@pma/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { buildPath } from 'features/general/Routes';
import { Trans } from 'components/Translation';
import { Icon } from 'components/Icon';
import { Page } from 'pages';
import { Status } from 'config/enum';
import { paramsReplacer } from 'utils';
import { Objective as ObjectiveTypes } from '../../type';
import { Timeline } from 'config/types';

type Props = {
  objectives: ObjectiveTypes[];
  activeTimelinePoints: Timeline | undefined;
};

export const AddNoteButton: FC<Props> = ({ objectives, activeTimelinePoints }) => {
  const { css } = useStyle();
  const navigate = useNavigate();
  const uuid = activeTimelinePoints?.uuid ?? 'new';

  const filteredObjectives = useMemo(
    () =>
      objectives.filter((objective) => objective.status === Status.APPROVED || objective.status === Status.COMPLETED),
    [objectives],
  );
  const canAddNote = useSelector((state) => getReviewsWithoutPriorityNote(state, filteredObjectives)).length !== 0;

  const handleAddNote = () => {
    navigate(buildPath(paramsReplacer(Page.PRIORITY_NOTE, { ':uuid': uuid })));
  };

  return (
    <>
      {canAddNote && (
        <button className={css(buttonStyles)} onClick={handleAddNote}>
          <Icon graphic='add' title={'add'} size={'24px'} />
          <span className={css({ paddingLeft: '10px', fontSize: '16px' })}>
            <Trans i18nKey={'add_notes'}>Add notes</Trans>
          </span>
        </button>
      )}
    </>
  );
};

const buttonStyles: Rule = ({ theme }) => ({
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
});
