import React, { FC } from 'react';
import { useStyle, colors, Rule, fontWeight, Colors, Button } from '@dex-ddl/core';
import { TileWrapper } from 'components/Tile';
import { Graphics, Icon } from 'components/Icon';
import { Avatar } from 'components/Avatar';
import { Accordion, BaseAccordion, Section, Panel, ExpandButton } from 'components/Accordion';
import { Status } from 'config/enum';
import { Trans } from 'components/Translation';
import { Notification } from 'components/Notification';

type ObjectiveComponentProps = {
  objective_id: string;
  objective_main_title: string;
  objective_title: string;
  objective_description?: string;
  objective_fields?: {
    field_id: string;
    field_type: string;
    field_title?: string;
    field_description?: string | undefined;
    field_placeholder?: string | undefined;
    field_value?: string | undefined;
    field_options?: any;
  }[];
}[];
const objectives: ObjectiveComponentProps = [
  {
    objective_id: '1',
    objective_main_title: 'Objective 1',
    objective_title: 'Provide a positive customer experience',
    objective_description: 'I want our customers to be satisfied and always return to us',
    objective_fields: [
      {
        field_id: '1',
        field_type: 'select',
        field_title: 'Organization objective',
        field_description: undefined,
        field_placeholder: 'Select organization objective',
        field_value: 'I exceeded this objective',
        field_options: [
          { value: 'id_1', label: 'I met this objective' },
          { value: 'id_2', label: 'I exceeded this objective' },
          { value: 'id_3', label: 'I did not meet this objective' },
        ],
      },
      {
        field_id: '2',
        field_type: 'textarea',
        field_title: 'How',
        field_description: 'Please fill in how you met this objective (e.g. Values, Behaviours, etc.)',
        field_placeholder: 'Don’t worry, only your approcal manager will see this',
        field_value: 'Don’t worry, only your approcal manager will see this',
      },
      {
        field_id: '3',
        field_type: 'textarea',
        field_title: 'What',
        field_description: 'Please fill in what did you achieve this objective',
        field_placeholder: 'Don’t worry, only your approcal manager will see this',
        field_value: 'Don’t worry, only your approcal manager will see this',
      },
    ],
  },
  {
    objective_id: '2',
    objective_main_title: 'Objective 2',
    objective_title: 'Provide a positive customer experience',
    objective_description: 'I want our customers to be satisfied and always return to us',
    objective_fields: [
      {
        field_id: '4',
        field_type: 'select',
        field_title: 'Organization objective',
        field_description: undefined,
        field_placeholder: 'Select organization objective',
        field_value: 'I met this objective',
        field_options: [
          { value: 'id_1', label: 'I met this objective' },
          { value: 'id_2', label: 'I exceeded this objective' },
          { value: 'id_3', label: 'I did not meet this objective' },
        ],
      },
      {
        field_id: '5',
        field_type: 'textarea',
        field_title: 'How',
        field_description: 'Please fill in how you met this objective (e.g. Values, Behaviours, etc.)',
        field_placeholder: 'Don’t worry, only your approcal manager will see this',
        field_value: 'Don’t worry, only your approcal manager will see this',
      },
      {
        field_id: '6',
        field_type: 'textarea',
        field_title: 'What',
        field_description: 'Please fill in what did you achieve this objective',
        field_placeholder: 'Don’t worry, only your approcal manager will see this',
        field_value: 'Don’t worry, only your approcal manager will see this',
      },
    ],
  },
  {
    objective_id: '3',
    objective_main_title: 'Objective 3',
    objective_title: 'Provide a positive customer experience',
    objective_description: 'I want our customers to be satisfied and always return to us',
    objective_fields: [
      {
        field_id: '7',
        field_type: 'select',
        field_title: 'Organization objective',
        field_description: undefined,
        field_placeholder: 'Select organization objective',
        field_value: 'I met this objective',
        field_options: [
          { value: 'id_1', label: 'I met this objective' },
          { value: 'id_2', label: 'I exceeded this objective' },
          { value: 'id_3', label: 'I did not meet this objective' },
        ],
      },
      {
        field_id: '8',
        field_type: 'textarea',
        field_title: 'How',
        field_description: 'Please fill in how you met this objective (e.g. Values, Behaviours, etc.)',
        field_placeholder: 'Don’t worry, only your approcal manager will see this',
        field_value: 'Don’t worry, only your approcal manager will see this',
      },
      {
        field_id: '9',
        field_type: 'textarea',
        field_title: 'What',
        field_description: 'Please fill in what did you achieve this objective',
        field_placeholder: 'Don’t worry, only your approcal manager will see this',
        field_value: 'Don’t worry, only your approcal manager will see this',
      },
    ],
  },
  {
    objective_id: '4',
    objective_main_title: 'Additional development',
    objective_title: 'Add anything outside of your objectives',
    objective_description: 'Have you taken additional responsibility?',
    objective_fields: [
      {
        field_id: '10',
        field_type: 'textarea',
        field_title: 'Comment here',
        field_description: undefined,
        field_placeholder: 'Don’t worry, only your approcal manager will see this',
        field_value: 'Don’t worry, only your approcal manager will see this',
      },
    ],
  },
];

export type WidgetTeamMateObjectivesProps = {
  id: string;
  status: Status;
};

export const WidgetTeamMateObjectives: FC<WidgetTeamMateObjectivesProps> = ({ id, status }) => {
  const { css, theme } = useStyle();

  const getIcon = (status): [Graphics, Colors] => {
    if (!status) {
      return ['roundAlert', 'pending'];
    }
    const contents: { [key: string]: [Graphics, Colors] } = {
      [Status.NOT_AVAILABLE]: ['calender', 'tescoBlue'],
      [Status.AVAILABLE]: ['roundAlert', 'pending'],
      [Status.OVERDUE]: ['roundAlert', 'error'],
      [Status.DRAFT]: ['roundPencil', 'base'],
      [Status.APPROVED]: ['roundTick', 'green'],
      [Status.PENDING]: ['roundClock', 'pending'],
    };

    return contents[status];
  };

  const [graphics, color] = getIcon(status);

  return (
    <>
      <TileWrapper>
        <Accordion
          id={`team-mate-accordion-${id}`}
          customStyle={{
            borderBottom: 'none',
            marginTop: 0,
          }}
        >
          <BaseAccordion id={`team-mate-base-accordion-${id}`}>
            {() => (
              <>
                <Section defaultExpanded={false}>
                  <div className={css(wrapperStyle)}>
                    <div className={css({ display: 'flex', alignItems: 'center' })}>
                      <Avatar size={40} />
                    </div>
                    <div className={css(headerBlockStyle)}>
                      <span className={css(titleStyle)}>Zaire Rosser</span>
                      <span className={css(descriptionStyle)}>Cashier, Grocery</span>
                    </div>
                    <div className={css({ marginLeft: 'auto', display: 'flex', alignItems: 'center' })}>
                      <div className={css({ paddingLeft: '12px' })}>
                        <ExpandButton />
                      </div>
                    </div>
                  </div>
                  <Panel>
                    <div className={css({ padding: '24px 35px 24px 24px' })}>
                      <Notification
                        graphic='information'
                        iconColor='pending'
                        text='It’s time to approve or decline your collegues objectives'
                        customStyle={{
                          background: '#FFDBC2',
                          marginBottom: '20px',
                        }}
                      />
                      {objectives.map((objective) => (
                        <TileWrapper key={objective.objective_id} customStyle={{ marginBottom: '10px' }}>
                          <div style={{ padding: '24px' }}>
                            <div
                              className={css({
                                fontSize: '18px',
                                lineHeight: '22px',
                                color: colors.tescoBlue,
                                fontWeight: fontWeight.bold,
                              })}
                            >
                              {objective.objective_main_title}
                            </div>
                            <div
                              className={css({
                                fontSize: '16px',
                                lineHeight: '20px',
                                fontWeight: fontWeight.bold,
                                paddingTop: theme.spacing.s5,
                              })}
                            >
                              {objective.objective_title}
                            </div>
                            <div
                              className={css({
                                fontSize: '16px',
                                lineHeight: '20px',
                                paddingBottom: theme.spacing.s5,
                              })}
                            >
                              {objective.objective_description}
                            </div>
                            {objective.objective_fields &&
                              objective.objective_fields.map((field) => {
                                return (
                                  <>
                                    <div
                                      className={css({
                                        fontSize: '14px',
                                        lineHeight: '18px',
                                        fontWeight: fontWeight.bold,
                                      })}
                                    >
                                      {field.field_title}
                                    </div>
                                    <div className={css({ padding: '10px 0' })}>{field.field_value}</div>
                                  </>
                                );
                              })}
                          </div>
                        </TileWrapper>
                      ))}
                    </div>
                    <div
                      className={css({
                        padding: '0px 24px 24px 24px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        gap: '16px',
                      })}
                    >
                      <div
                        className={css({
                          fontSize: '16px',
                          lineHeight: '20px',
                          fontWeight: fontWeight.bold,
                        })}
                      >
                        Approve or decline objectives
                      </div>
                      <div>
                        <div className={css({ display: 'inline-block' })}>
                          <Button
                            styles={[
                              {
                                background: theme.colors.white,
                                border: `1px solid ${theme.colors.tescoBlue}`,
                                fontSize: '16px',
                                lineHeight: '20px',
                                fontWeight: fontWeight.bold,
                                color: `${theme.colors.tescoBlue}`,
                                margin: '0px 4px',
                              },
                            ]}
                            onPress={console.log}
                          >
                            <Icon graphic='decline' iconStyles={{ paddingRight: '8px' }} />
                            <Trans i18nKey='decline'>Decline</Trans>
                          </Button>
                        </div>
                        <div className={css({ display: 'inline-block' })}>
                          <Button
                            styles={[
                              {
                                background: `${theme.colors.tescoBlue}`,
                                fontSize: '16px',
                                lineHeight: '20px',
                                fontWeight: fontWeight.bold,
                                margin: '0px 4px 1px 4px',
                              },
                            ]}
                            onPress={console.log}
                          >
                            <Icon graphic='check' invertColors={true} iconStyles={{ paddingRight: '8px' }} />
                            <Trans i18nKey='approve'>Approve</Trans>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Panel>
                </Section>
              </>
            )}
          </BaseAccordion>
        </Accordion>
      </TileWrapper>
    </>
  );
};

const wrapperStyle: Rule = {
  padding: '24px',
  display: 'flex',
};

const headerBlockStyle: Rule = {
  display: 'grid',
  padding: '0 20px',
  alignSelf: 'center',
};

const titleStyle: Rule = {
  fontStyle: 'normal',
  fontWeight: fontWeight.bold,
  fontSize: '18px',
  lineHeight: '22px',
  color: colors.tescoBlue,
};

const descriptionStyle: Rule = {
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '16x',
  lineHeight: '20px',
  color: colors.base,
};
