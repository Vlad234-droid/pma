import React, { FC } from 'react';
import { colors, fontWeight, Rule, Styles } from '@dex-ddl/core';
import { Accordion, Header, HeaderProps, Panel, Section } from 'components/Accordion';
import { ButtonWithConfirmation, EditButton } from '../Buttons';
import { ObjectiveActions } from '@pma/store';
import { Status } from 'config/enum';
import useDispatch from 'hooks/useDispatch';

import { ObjectiveTileHeader, ObjectiveTileExplanations } from '../Tile';

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
};

export const TEST_ID = 'objective-accordion';
const Buttons: FC<{ id: number }> = ({ id }) => {
  const dispatch = useDispatch();

  const remove = () => {
    dispatch(
      ObjectiveActions.deleteObjective({
        performanceCycleUuid: '',
        colleagueUuid: '',
        number: id,
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
        styles={[AccordionButtonStyle]}
      />
    </div>
  );
};

const ObjectiveAccordion: FC<Props> = ({ objectives }) => (
  <Accordion id='objective-accordion'>
    <div data-test-id={TEST_ID}>
      {objectives.map(({ id, title, subTitle, description, explanations, status }) => (
        <Section key={id}>
          <ObjectiveHeader {...{ title, subTitle, description }} />
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
  Omit<HeaderProps, 'children'> & { title: string; subTitle?: string; description?: string }
> = ({ title, subTitle, description, ...rest }) => {
  return (
    <Header headingLevel={1} title={title} {...rest}>
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
