import React, { FC } from 'react';
import { useStyle, Rule } from '@dex-ddl/core';
import { TileWrapper } from 'components/Tile';
import { Accordion, BaseAccordion, Section, Panel, ExpandButton } from 'components/Accordion';
import { IconButton, Position } from 'components/IconButton';
import { Trans } from 'components/Translation';

export const TEST_ID = 'test_id';

type ItemType = {
  f_name: string;
  id: number;
  img: string;
  l_name: string;
  title: string;
};

type DraftItemProps = {
  item: ItemType;
  draftFeedback: (id: number) => void;
};
const DraftItem: FC<DraftItemProps> = ({ item, draftFeedback }) => {
  const { css } = useStyle();

  const getPropperTime = (): string => {
    return '1 day ago';
  };

  return (
    <TileWrapper>
      <Accordion
        id={`draft-accordion-${item.id}`}
        customStyle={{
          borderBottom: 'none',
          marginTop: 0,
        }}
      >
        <BaseAccordion id={`draft-base-accordion-${item.id}`}>
          {() => (
            <>
              <Section defaultExpanded={false}>
                <div className={css(Draft_Styles)}>
                  <div className={css(Block_info)}>
                    <div className={css({ alignSelf: 'flex-start' })}>
                      <img className={css(Img_style)} src={item.img} alt='photo' />
                    </div>
                    <div className={css({ marginLeft: '16px' })}>
                      <h3 className={css(Names_Style)}>{`${item.f_name} ${item.l_name}`}</h3>
                      <p className={css(Industry_Style)}>Cashier, Grocery</p>
                    </div>
                  </div>
                  <div className={css({ display: 'flex', justifyContent: 'center', alignItems: 'center' })}>
                    <div className={css({ marginRight: '26px' })}>{getPropperTime()}</div>
                    <div data-test-id={TEST_ID}>
                      <ExpandButton />
                    </div>
                  </div>
                </div>

                <Panel>
                  <TileWrapper
                    boarder={false}
                    customStyle={{
                      padding: '16px',
                      margin: '0px 28px 16px 24px',
                      borderRadius: '10px',
                      background: '#F3F9FC',
                    }}
                  >
                    <h3 className={css(Tile_title)}>Your colleague has requested feedback from you on:</h3>
                    <h3 className={css(Sphere_resond_style)}>{item.title}</h3>
                    <p className={css(Question_style)}>Can you give them feedback on this objective?</p>
                  </TileWrapper>
                  <IconButton
                    customVariantRules={{ default: iconBtnStyle }}
                    iconPosition={Position.RIGHT}
                    onPress={() => draftFeedback(item.id)}
                    graphic='arrowRight'
                    iconProps={{ invertColors: false }}
                  >
                    <Trans i18nKey='give_feedback'>Give feedback</Trans>
                  </IconButton>
                </Panel>
              </Section>
            </>
          )}
        </BaseAccordion>
      </Accordion>
    </TileWrapper>
  );
};

const Draft_Styles: Rule = {
  padding: '24px',
  height: '96px',
  display: 'flex',
  justifyContent: 'space-between',
};

const Block_info: Rule = {
  display: 'inline-flex',
  alignItems: 'center',
};

const Img_style: Rule = {
  width: '48px',
  height: '48px',
  borderRadius: '50%',
};
const Names_Style: Rule = {
  fontWeight: 'bold',
  fontSize: '18px',
  lineHeight: '22px',
  margin: '0px',
  color: '#00539F',
};
const Industry_Style: Rule = {
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
  margin: '4px 0px 0px 0px',
};

const Tile_title: Rule = {
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
  margin: '0px 0px 4px 0px',
};

const Sphere_resond_style: Rule = {
  fontWeight: 'bold',
  fontSize: '18px',
  lineHeight: '22px',
  color: '#00539F',
  margin: '0px 0px 16px 0px',
};
const Question_style: Rule = {
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
  margin: '0px',
};

const iconBtnStyle: Rule = ({ theme }) => ({
  padding: '12px 7px 12px 20px',
  display: 'flex',
  height: '40px',
  borderRadius: '20px',
  justifyContent: 'space-between',
  alignItems: 'center',
  outline: 0,
  background: theme.colors.tescoBlue,
  color: theme.colors.white,
  cursor: 'pointer',
  width: '176px',
  border: '1px solid #00539F',
  whiteSpace: 'nowrap',
  marginLeft: 'auto',
  marginRight: '24px',
  marginBottom: '24px',
  fontWeight: 'bold',
});

export default DraftItem;
