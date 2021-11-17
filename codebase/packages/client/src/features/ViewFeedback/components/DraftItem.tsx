import React, { FC } from 'react';
import { Rule, Styles, useStyle } from '@dex-ddl/core';
import { TileWrapper } from 'components/Tile';
import { Accordion, BaseAccordion, ExpandButton, Panel, Section } from 'components/Accordion';
import { IconButton } from 'components/IconButton';
import { Trans } from 'components/Translation';

type DraftItemProps = {
  item: any;
  draftFeedback: (id: number) => void;
};

const DraftItem: FC<DraftItemProps> = ({ item, draftFeedback }) => {
  const { css } = useStyle();

  const getPropperTime = (): string => {
    return '2 weeks ago';
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
                    <ExpandButton />
                  </div>
                </div>

                <Panel>
                  <TileWrapper customStyle={{ padding: '24px', margin: '0px 28px 28px 24px' }}>
                    <h2 className={css(Title_style)}>{item.title}</h2>
                    <div className={css(Info_block_style)}>
                      <h3>{item.question1.ask}</h3>
                      <p>{item.question1.answer ? item.question1.answer : '-'}</p>
                    </div>
                    <div className={css(Info_block_style)}>
                      <h3>{item.question2.ask}</h3>
                      <p>{item.question2.answer ? item.question1.answer : '-'}</p>
                    </div>
                    <div className={css(Info_block_style)}>
                      <h3>{item.question3.ask}</h3>
                      <p>{item.question3.answer ? item.question1.answer : '-'}</p>
                    </div>
                  </TileWrapper>
                  <IconButton
                    customVariantRules={{ default: iconBtnStyle }}
                    onPress={() => draftFeedback(item.id)}
                    graphic='share'
                    iconProps={{ invertColors: false }}
                    iconStyles={iconStyle}
                  >
                    <Trans i18nKey='sahre'>Share</Trans>
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
const Title_style: Rule = {
  margin: '0px 0px 16px 0px',
  fontSize: '16px',
  color: '#00539F',
  lineHeight: '20px',
};
const Info_block_style: Rule = {
  marginBottom: '16px',
  '& > h3': {
    margin: '0px',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  '& > p': {
    margin: '0px',
    fontSize: '14px',
  },
} as Styles;

const iconBtnStyle: Rule = ({ theme }) => ({
  padding: '12px 20px 12px 14px',
  display: 'flex',
  height: '40px',
  borderRadius: '20px',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: '111px',
  fontWeight: 'bold',
  outline: 0,
  background: theme.colors.white,
  color: theme.colors.tescoBlue,
  cursor: 'pointer',
  width: '176px',
  border: '1px solid #00539F',
  whiteSpace: 'nowrap',
  marginLeft: 'auto',
  marginRight: '24px',
  marginBottom: '24px',
});

const iconStyle: Rule = {
  marginRight: '12px',
};
export default DraftItem;
