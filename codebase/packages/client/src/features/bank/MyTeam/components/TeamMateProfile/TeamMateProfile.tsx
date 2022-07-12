import React, { FC } from 'react';
import { Rule } from '@pma/dex-wrapper';

import { TileWrapper } from 'components/Tile';
import { Accordion, BaseAccordion, Section } from 'components/Accordion';

import { Employee } from 'config/types';

import ProfilePreview from '../ProfilePreview';

type Props = {
  uuid: string;
  employee: Employee;
  fullTeamView?: boolean;
  onClick?: () => void;
  customWrapperStyle?: React.CSSProperties | {};
};

const TeamMateProfile: FC<Props> = ({ uuid, employee, fullTeamView = false, onClick, customWrapperStyle }) => {
  return (
    <div data-test-id='team-mate-profile'>
      <TileWrapper customStyle={customWrapperStyle}>
        <Accordion id={`team-mate-accordion-${uuid}`} customStyle={accordionCustomStyles}>
          <BaseAccordion id={`team-mate-base-accordion-${uuid}`}>
            {() => (
              <>
                <Section defaultExpanded={false}>
                  <ProfilePreview employee={employee} fullTeamView={fullTeamView} onClick={onClick} />
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
