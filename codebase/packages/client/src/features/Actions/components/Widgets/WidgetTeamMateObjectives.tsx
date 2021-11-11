import React, { FC, useEffect, useState } from 'react';
import { Button, Colors, colors, fontWeight, Rule, useStyle } from '@dex-ddl/core';
import { TileWrapper } from 'components/Tile';
import { Graphics, Icon } from 'components/Icon';
import { Avatar } from 'components/Avatar';
import { Accordion, BaseAccordion, ExpandButton, Panel, Section } from 'components/Accordion';
import { Status } from 'config/enum';
import { Trans } from 'components/Translation';
import { Notification } from 'components/Notification';
import useDispatch from 'hooks/useDispatch';
import ConfirmDeclineModal from './Modal/ConfirmDeclineModal';
import { useSelector } from 'react-redux';

import { Tile as ObjectiveTile } from 'features/Objectives';

import {
  getObjectiveSchema,
  ObjectiveActions,
  objectivesMetaSelector,
  objectivesSelector,
  SchemaActions,
} from '@pma/store';

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

export type WidgetTeamMateObjectivesProps = {
  id: string;
  status: Status;
  colleague: any;
};

export const WidgetTeamMateObjectives: FC<WidgetTeamMateObjectivesProps> = ({ id, status, colleague }) => {
  const { css, theme } = useStyle();
  const [isOpen, setIsOpen] = useState(false);
  const [objectives, setObjectives] = useState([]);

  const {
    components = [],
    meta: { loaded: schemaLoaded = false },
    markup = { max: 0, min: 0 },
  } = useSelector(getObjectiveSchema);
  const formElements = components.filter((component) => component.type != 'text');
  const { loaded: objectivesLoaded } = useSelector(objectivesMetaSelector);
  const { origin } = useSelector(objectivesSelector);

  useEffect(() => {
    if (objectivesLoaded && schemaLoaded) {
      const mappedObjectives = origin?.map((objectiveItem) => {
        const status = objectiveItem.status;
        const objective = objectiveItem?.properties?.mapJson;
        const subTitle = objective['title'] || '';
        const description = objective['description'] || '';
        const explanations = formElements
          .filter(({ key }) => !['title', 'description'].includes(key))
          .map((component) => {
            const { key, label } = component;

            return { title: label, steps: objective[key] ? [objective[key]] : [] };
          });
        return {
          id: Number(objectiveItem.number),
          title: `Objective ${objectiveItem.number}`,
          subTitle: subTitle,
          description: description,
          explanations,
          status,
        };
      });
      setObjectives(mappedObjectives);
    }
  }, [objectivesLoaded, schemaLoaded]);

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

  const dispatch = useDispatch();

  const fetchData = () => {
    dispatch(SchemaActions.getSchema({ formId: 'colleague_objectives_form' }));
    dispatch(ObjectiveActions.getObjectives({ performanceCycleUuid: '', colleagueUuid: colleague.uuid }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateReviews = (method, reason = null) => {
    dispatch(
      method({
        ...(reason ? { reason } : {}),
        colleagueUuid: colleague.uuid,
        reviews: colleague.reviews.filter(({ status }) => status === Status.WAITING_FOR_APPROVAL),
      }),
    );
  };
  const approveColleague = () => updateReviews(ObjectiveActions.approveObjective);
  const declineColleague = (reason) => {
    updateReviews(ObjectiveActions.declineObjective, reason);
    setIsOpen(false);
  };

  return (
    <>
      <TileWrapper>
        <Accordion
          id={`team-mate-accordion-${colleague.uuid}`}
          customStyle={{
            borderBottom: 'none',
            marginTop: 0,
          }}
        >
          <BaseAccordion id={`team-mate-base-accordion-${colleague.uuid}`}>
            {() => (
              <>
                <Section defaultExpanded={false}>
                  <div className={css(wrapperStyle)}>
                    <div className={css({ display: 'flex', alignItems: 'center' })}>
                      <Avatar size={40} />
                    </div>
                    <div className={css(headerBlockStyle)}>
                      <span className={css(titleStyle)}>{`${colleague.firstName} ${colleague.lastName}`}</span>
                      <span className={css(descriptionStyle)}>{`${colleague.jobName}, ${colleague.businessType}`}</span>
                    </div>
                    <div className={css({ marginLeft: 'auto', display: 'flex', alignItems: 'center' })}>
                      <div className={css({ paddingLeft: '12px' })}>
                        <ExpandButton onClick={(expanded) => expanded && fetchData()} />
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
                      {objectives.map(({ id, title, subTitle, description, explanations }) => (
                        <ObjectiveTile key={id} {...{ id, title, subTitle, description, explanations }} />
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
                            onPress={() => setIsOpen(true)}
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
                            onPress={approveColleague}
                          >
                            <Icon graphic='check' invertColors={true} iconStyles={{ paddingRight: '8px' }} />
                            <Trans i18nKey='approve'>Approve</Trans>
                          </Button>
                        </div>
                        {isOpen && (
                          <ConfirmDeclineModal
                            title={'Please provide decline reason'}
                            onSave={declineColleague}
                            onCancel={() => setIsOpen(false)}
                            onOverlayClick={() => setIsOpen(false)}
                          />
                        )}
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
