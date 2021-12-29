import React from 'react';
import { Rule, useStyle } from '@dex-ddl/core';
import DescriptionBlock from 'components/DescriptionBlock';
import { LeftsideMenu } from 'components/LeftsideMenu';

const PersonalDevelopmentPlan = () => {
  const { css } = useStyle();

  const navToGoalPage = () => {
    console.log('navigate to goal page');
  };

  const goToReadMore = () => {
    console.log('goToReadMore');
  };

  return (
    <div className={css(main)}>
      <LeftsideMenu />
      <div>
        <button className={css(buttonIcon)} onClick={navToGoalPage}>
          <div className={css(plusIcon)}>
            <div>+</div>
          </div>
          Create development goal
        </button>

        <div className={css(descriptionMain)}>
          <DescriptionBlock style={descriptionLeft}>
            <div className={css(title)}>What is Personal Development plan?</div>
            <div className={css(details, detailsWithMargin)}>
              Your Performance Development Plan (PDP) is a tailored plan that helps you reflect on the things you are
              great at and identify areas you want to improve.
            </div>

            <div className={css(title)}>How The Performance Development Plan works?</div>
            <div className={css(details)}>
              At Tesco, “how” you do your job is as important as “what” you deliver. An inspiring PDP will help you
              focus on what to develop, whether that’s being at your best in your current role or moving towards a
              bigger or broader role. What’s important is recording and regularly reviewing your plan to a format that
              works for you.
            </div>
          </DescriptionBlock>

          <DescriptionBlock style={descriptionRight}>
            <div className={css(titleReadMore)}>Difference between Development goals and business objectives</div>
            <div onClick={goToReadMore} className={css(readMore)}>
              Read more <div className={css(arrow)} />{' '}
            </div>
          </DescriptionBlock>
        </div>
      </div>
    </div>
  );
};

const main = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  flexDirection: 'row',
  height: '100%',
} as Rule;

const arrow = {
  border: 'solid',
  borderWidth: '0 1px 1px 0',
  display: 'inline-block',
  padding: '4px',
  transform: 'rotate(-45deg)',
  webkitTransform: 'rotate(-45deg)',
} as Rule;

const title = {
  color: '#333333',
  fontFamily: 'TESCO Modern',
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '18px',
  lineHeight: '22px',
  marginBottom: '8px',
} as Rule;

const plusIcon = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '16.67px',
  minWidth: '16.67px',
  width: '16.17px',
  height: '16.17px',
  border: '1px solid #ffffff',
  borderRadius: '30px',
  marginRight: '9.7px',
} as Rule;

const buttonIcon = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '257px',
  height: '40px',
  padding: '10px 20px',
  color: '#FFFFFF',
  backgroundColor: '#00539F',
  fontSize: '16px',
  lineHeight: '20px',
  borderRadius: '32px',
  border: 'none',
  cursor: 'pointer',
  marginTop: '16px',
  marginBottom: '16px',
} as Rule;

const descriptionMain = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  flexDirection: 'row',
  '@media (max-width: 900px)': {
    flexDirection: 'column',
  },
} as Rule;

const details = {
  weight: '400',
  color: '#333333',
  size: '14px',
} as Rule;

const detailsWithMargin = {
  marginBottom: '24px',
} as Rule;

const readMore = {
  color: '#00539F',
  lineHeight: '20px',
  fontSize: '16px',
  fontFamily: 'TESCO Modern',
  fontWeight: 'bold',
  cursor: 'pointer',
} as Rule;

const titleReadMore = {
  fontSize: '18px',
  fontWeight: 'bold',
  fontFamily: 'TESCO Modern',
  color: '#333333',
  paddingBottom: '16px',
} as Rule;

const descriptionLeft = {
  width: '90%',
  marginRight: '8px',
  '@media (max-width: 900px)': {
    flexDirection: 'column',
    margin: '0 0 8px 0',
    width: '100%',
  },
} as Rule;

const descriptionRight = {
  '@media (max-width: 900px)': {
    width: '100%',
  },
} as Rule;

export default PersonalDevelopmentPlan;
