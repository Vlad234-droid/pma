import React, { FC } from 'react';
import { colors, fontWeight, Rule, Styles } from '@dex-ddl/core';
import { Accordion, Header, HeaderProps, Panel, Section } from 'components/Accordion';
import { ButtonWithConfirmation, EditButton } from '../Buttons';
import { currentUserSelector, ReviewsActions } from '@pma/store';
import { ReviewType, Status } from 'config/enum';
import useDispatch from 'hooks/useDispatch';

import { ObjectiveTileExplanations, ObjectiveTileHeader } from '../Tile';
import { useSelector } from 'react-redux';

type Explanation = {
  title: string;
  steps: string[];
};

type Objective = {
  id: number;
  title: string;
  subTitle: string;
  description: string;
  explanations: Explanation[];
  status: Status;
};

type Props = {
  objectives: Objective[];
  canShowStatus: boolean;
};

export const TEST_ID = 'objective-accordion';
const Buttons: FC<{ id: number }> = ({ id }) => {
  const dispatch = useDispatch();
  const { info } = useSelector(currentUserSelector);

  const remove = () => {
    dispatch(
      ReviewsActions.deleteReview({
        pathParams: { colleagueUuid: info.colleagueUUID, type: ReviewType.OBJECTIVE, cycleUuid: 'CURRENT', number: id },
      }),
    );
  };

  return (
    <div style={{ padding: '20px 0' }}>
      <EditButton buttonText={'Edit'} editNumber={id} icon={'edit'} styles={AccordionButtonStyle} />
      <ButtonWithConfirmation
        onSave={remove}
        withIcon={true}
        buttonName='Delete'
        confirmationTitle='Delete'
        confirmationDescription='Are you sure you want to delete objective?'
        styles={[AccordionButtonStyle]}
      />
    </div>
  );
};

const ObjectiveAccordion: FC<Props> = ({ objectives, canShowStatus }) => (
  <Accordion id='objective-accordion'>
    <div data-test-id={TEST_ID}>
      {objectives.map(({ id, title, subTitle, description, explanations, status }) => (
        <Section key={id}>
          <ObjectiveHeader {...{ title, subTitle, description, ...(canShowStatus ? { status } : {}) }} />
          <Panel>
            <ObjectivePanel explanations={explanations} />
            {/*todo do not forget find out what we use DECLINED or RETURNED*/}
            {[Status.DRAFT, Status.DECLINED, Status.RETURNED].includes(status) && <Buttons id={id} />}
          </Panel>
        </Section>
      ))}
    </div>
  </Accordion>
);

export const ObjectiveHeader: FC<
  Omit<HeaderProps, 'children'> & {
    title: string;
    subTitle?: string;
    description?: string;
    status?: Status;
  }
> = ({ title, subTitle, description, status, ...rest }) => {
  return (
    <Header headingLevel={1} title={title} status={status} {...rest}>
      <ObjectiveTileHeader {...{ subTitle, description, withSpacing: false }} />
    </Header>
  );
};

export const ObjectivePanel: FC<{ explanations: Explanation[] }> = ({ explanations }) => (
  <ObjectiveTileExplanations explanations={explanations} />
);

const AccordionButtonStyle: Rule = {
  fontSize: '14px',
  lineHeight: '18px',
  color: colors.tescoBlue,
  fontWeight: fontWeight.bold,
  paddingRight: '20px',
  '& svg': {
    height: '14px',
    width: '14px',
  },
} as Styles;

export default ObjectiveAccordion;
