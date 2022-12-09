import React, { FC } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';

import { TileWrapper } from 'components/Tile';
import { Accordion, BaseAccordion, Panel, Section } from 'components/Accordion';
import { Status } from 'config/enum';
import { Employee } from 'config/types';

import TimeLines from '../Timelines';
import ProfilePreview from '../ProfilePreview';

type Props = {
  uuid: string;
  status: Status;
  employee: Employee;
  fullTeamView?: boolean;
  onClick?: () => void;
  customWrapperStyle?: React.CSSProperties | {};
};

const TeamMateProfile: FC<Props> = ({ uuid, status, employee, fullTeamView = false, onClick, customWrapperStyle }) => {
  const { css } = useStyle();

  return (
    <div data-test-id='team-mate-profile'>
      <TileWrapper customStyle={customWrapperStyle}>
        <Accordion id={`team-mate-accordion-${uuid}`} customStyle={accordionCustomStyles}>
          <BaseAccordion id={`team-mate-base-accordion-${uuid}`}>
            {() => (
              <>
                <Section defaultExpanded={false}>
                  <ProfilePreview
                    status={status}
                    employee={employee}
                    fullTeamView={fullTeamView}
                    hasCalibrationRating={
                      !!employee.reviews.find(
                        ({ type, status }) => type === 'CALIBRATION' && status === Status.WAITING_FOR_APPROVAL,
                      )
                    }
                    onClick={onClick}
                  />
                  <Panel>
                    <div className={css(panelStyles)}>
                      <TimeLines employee={employee} />
                    </div>
                  </Panel>
                </Section>
              </>
            )}
          </BaseAccordion>
        </Accordion>
      </TileWrapper>
    </div>
  );
};

export default TeamMateProfile;

const accordionCustomStyles: Rule = {
  borderBottom: 'none',
  marginTop: 0,
};

const panelStyles: Rule = { padding: '24px 35px 24px 24px' };
