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
        <div className={css(BlockInfo)}>
          <div className={css({ alignSelf: 'flex-start' })}>
            <img className={css(ImgStyle)} src={defaultImg} alt='photo' />
          </div>
          <div className={css({ marginLeft: '16px' })}>
            <h3
              className={css(NamesStyle)}
            >{`${selectedPerson?.profile?.firstName} ${selectedPerson?.profile?.lastName}`}</h3>
            <p
              className={css(IndustryStyle)}
            >{`${selectedPerson?.workRelationships[0].job?.name}, ${selectedPerson?.workRelationships[0].department?.name}`}</p>
            <span className={css(TreatmentStyle)}>Please treat me kindly</span>
          </div>
        </div>
        <TileWrapper customStyle={{ padding: '24px', margin: '32px 0px 0px 0px', border: '1px solid #E5E5E5' }}>
          <span className={css(ObjectiveStyled)}>Objective: Provide a posititve customer experience </span>
          {data.map((item, i) => (
            <div key={i} className={css({ marginTop: '16px' })}>
              <h3 className={css(titleStyled)}>{item.title}</h3>
              <p className={css(descStyled)}>{item.desc}</p>
            </div>
          ))}
        </TileWrapper>
      </div>
    </div>
  );
};

const BlockInfo: Rule = {
  display: 'inline-flex',
  alignItems: 'center',
};
const ObjectiveStyled: Rule = {
  fontWeight: 'bold',
  fontSize: '16px',
  lineHeight: '20px',
  color: '#00539F',
};

const descStyled: Rule = {
  fontWeight: 'normal',
  fontSize: '14px',
  lineHeight: '18px',
  margin: '0px',
};

const titleStyled: Rule = {
  margin: '0px',
  fontWeight: 'bold',
  fontSize: '14px',
  lineHeight: '18px',
};

const ImgStyle: Rule = {
  width: '72px',
  height: '72px',
  borderRadius: '50%',
};
const NamesStyle: Rule = {
  fontWeight: 'bold',
  fontSize: '20px',
  lineHeight: '24px',
  margin: '0px',
};

const IndustryStyle: Rule = {
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
  margin: '0px 0px 4px 0px',
};

const TreatmentStyle: Rule = {
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
  color: '#00539F',
};

export default SubmitPart;
