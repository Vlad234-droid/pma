import React, { FC } from 'react';
import { useStyle, Rule } from '@dex-ddl/core';
import { SubmitPartProps } from './type';
import { TileWrapper } from 'components/Tile';
import defaultImg from '../../../../../../public/default.png';

export const WITH_SELECTED_TEST = 'with_selected_test';

const SubmitPart: FC<SubmitPartProps> = ({ selectedPerson }) => {
  const { css } = useStyle();

  const data = [
    {
      title: 'What strengths does this colleague have?',
      desc: 'Iaculis amet, nec quis congue aliquam facilisis et amet et. Quam magna ut ultricies enim id morbi. Est enim ipsum commodo quis dolor pellentesque. Massa elit quis vitae libero donec.',
    },
    {
      title: 'What should the colleague improve on?',
      desc: 'Iaculis amet, nec quis congue aliquam facilisis et amet et. Quam magna ut ultricies enim id morbi. Est enim ipsum commodo quis dolor pellentesque. Massa elit quis vitae libero donec.',
    },
    {
      title: 'Anything else?',
      desc: 'Fermentum risus netus vestibulum est. Accumsan et, convallis magna consequat amet et. Turpis tortor pulvinar quisque eget.',
    },
  ];

  return (
    <div data-test-id={WITH_SELECTED_TEST}>
      <div className={css({ height: '1px', background: '#E5E5E5' })} />
      <div className={css({ marginTop: '16px' })}>
        <div className={css(Block_info)}>
          <div className={css({ alignSelf: 'flex-start' })}>
            <img className={css(Img_style)} src={defaultImg} alt='photo' />
          </div>
          <div className={css({ marginLeft: '16px' })}>
            <h3
              className={css(Names_Style)}
            >{`${selectedPerson?.profile?.firstName} ${selectedPerson?.profile?.lastName}`}</h3>
            <p
              className={css(Industry_Style)}
            >{`${selectedPerson?.workRelationships[0].job?.name}, ${selectedPerson?.workRelationships[0].department?.name}`}</p>
            <span className={css(Treatment_Style)}>Please treat me kindly</span>
          </div>
        </div>
        <TileWrapper customStyle={{ padding: '24px', margin: '32px 0px 0px 0px', border: '1px solid #E5E5E5' }}>
          <span className={css(Objective_Styled)}>Objective: Provide a posititve customer experience </span>
          {data.map((item, i) => (
            <div key={i} className={css({ marginTop: '16px' })}>
              <h3 className={css(title_Styled)}>{item.title}</h3>
              <p className={css(desc_Styled)}>{item.desc}</p>
            </div>
          ))}
        </TileWrapper>
      </div>
    </div>
  );
};

const Block_info: Rule = {
  display: 'inline-flex',
  alignItems: 'center',
};
const Objective_Styled: Rule = {
  fontWeight: 'bold',
  fontSize: '16px',
  lineHeight: '20px',
  color: '#00539F',
};

const desc_Styled: Rule = {
  fontWeight: 'normal',
  fontSize: '14px',
  lineHeight: '18px',
  margin: '0px',
};

const title_Styled: Rule = {
  margin: '0px',
  fontWeight: 'bold',
  fontSize: '14px',
  lineHeight: '18px',
};

const Img_style: Rule = {
  width: '72px',
  height: '72px',
  borderRadius: '50%',
};
const Names_Style: Rule = {
  fontWeight: 'bold',
  fontSize: '20px',
  lineHeight: '24px',
  margin: '0px',
};

const Industry_Style: Rule = {
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
  margin: '0px 0px 4px 0px',
};

const Treatment_Style: Rule = {
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
  color: '#00539F',
};

export default SubmitPart;
