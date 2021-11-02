import React, { FC } from 'react';
import { useStyle, Rule, Styles, colors, fontWeight } from '@dex-ddl/core';
import { Accordion, Header, HeaderProps, Section, Panel } from 'components/Accordion';
import { ButtonWithConfirmation, EditButton } from '../Buttons';
import { ObjectiveActions } from '@pma/store';
import { Status } from 'config/enum';
import useDispatch from 'hooks/useDispatch';

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
            {[Status.DRAFT].includes(status) && <Buttons id={id} />}
          </Panel>
        </Section>
      ))}
    </div>
  </Accordion>
);

const ObjectiveHeader: FC<Omit<HeaderProps, 'children'> & { title: string; subTitle?: string; description?: string }> =
  ({ title, subTitle, description, ...rest }) => {
    const { css } = useStyle();

    return (
      <Header headingLevel={1} title={title} {...rest}>
        <h4 className={css(accordionSubTitleStyles)}>{subTitle}</h4>
        <p className={css(accordionDescriptionStyles)}>{description}</p>
      </Header>
    );
  };

const ObjectivePanel: FC<{ explanations: Explanation[] }> = ({ explanations }) => {
  const { css } = useStyle();

  return (
    <>
      {explanations.map(({ title, steps }, idx) => (
        <div className={css(accordionExplanationStyles)} key={idx}>
          <h4 className={css(accordionSubTitleStyles)}>{title}</h4>
          <ol className={css(accordionList)}>
            {steps.map((step, idx) => (
              <li className={css(accordionDescriptionStyles)} key={idx}>
                {step}
              </li>
            ))}
          </ol>
        </div>
      ))}
    </>
  );
};

const accordionSubTitleStyles: Rule = ({ theme }) => ({
  fontSize: '14px',
  lineHeight: '18px',
  color: theme.colors.base,
  margin: '3px 0',
});

const accordionDescriptionStyles: Rule = ({ theme }) => ({
  fontSize: '14px',
  lineHeight: '18px',
  color: theme.colors.base,
  margin: '3px 0',
});

const accordionExplanationStyles: Rule = {
  marginBottom: '15px',
};

const accordionList = {
  padding: '0 17px',
  margin: 0,
  counterReset: 'list',
  '& > li': {
    listStyle: 'none',
    position: 'relative',
    '&:before': {
      content: 'counter(list) ") "',
      counterIncrement: 'list',
      position: 'absolute',
      left: '-17px',
    },
  },
} as Styles;

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
