import React, { FC } from 'react';
import { useStyle, colors, Rule, fontWeight, Colors } from '@dex-ddl/core';
import { TileWrapper } from 'components/Tile';
import { Graphics, Icon } from 'components/Icon';
import { Avatar } from 'components/Avatar';
import { Accordion, BaseAccordion, Section, Panel, ExpandButton } from 'components/Accordion';
import { Status } from 'config/enum';

export type WidgetTeamMateProfileProps = {
  id: string;
  status?: Status;
};

export const WidgetTeamMateProfile: FC<WidgetTeamMateProfileProps> = ({ id, status }) => {
  const { css } = useStyle();

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
                      <div className={css({ padding: '12px 12px' })}>
                        <span className={css({ fontSize: '16px', lineHeight: '20px', color: colors.tescoBlue })}>
                          View profile
                        </span>
                      </div>
                      <div className={css({ padding: '0px 12px' })}>
                        <Icon graphic={graphics} fill={color} />
                      </div>
                      <div className={css({ paddingLeft: '12px' })}>
                        <ExpandButton />
                      </div>
                    </div>
                  </div>
                  <Panel>
                    <div className={css({ padding: '24px 35px 24px 24px' })}>
                      <div className={css({ background: '#F6F6F6', padding: '24px', borderRadius: '10px' })}>
                        <div className={css({ justifyContent: 'flex-start' })}>
                          <div
                            className={css({
                              display: 'inline-block',
                              paddingRight: '30px',
                              textAlign: 'center',
                              fontSize: '14px',
                              lineHeight: '18px',
                            })}
                          >
                            <div className={css({ paddingBottom: '6px' })}>Objectives</div>
                            <Icon graphic='roundClock' />
                          </div>
                          <div
                            className={css({
                              display: 'inline-block',
                              paddingRight: '30px',
                              textAlign: 'center',
                              fontSize: '14px',
                              lineHeight: '18px',
                            })}
                          >
                            <div className={css({ paddingBottom: '6px' })}>Mid-year reveiw</div>
                            <Icon graphic='roundCircle' />
                          </div>
                          <div
                            className={css({
                              display: 'inline-block',
                              paddingRight: '30px',
                              textAlign: 'center',
                              fontSize: '14px',
                              lineHeight: '18px',
                            })}
                          >
                            <div className={css({ paddingBottom: '6px' })}>End-year reveiw</div>
                            <Icon graphic='roundCircle' />
                          </div>
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
