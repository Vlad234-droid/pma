import React from 'react';
import { CreateRule, Icon, ModalWithHeader, Rule, useBreakpoints, useStyle } from '@dex-ddl/core';
import { useNavigate } from 'react-router';
import { buildPath } from 'features/Routes';
import { Page } from 'pages';

const PersonalDevelopmentHelp = (props) => {
  const { css } = useStyle();
  const navigate = useNavigate();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;

  return (
    <ModalWithHeader
      containerRule={templatesModalWindowStyles({ mobileScreen })}
      title='Personal Development Plan Help'
      modalPosition='middle'
      closeOptions={{
        closeOptionContent: <Icon graphic='close' invertColors={true} />,
        onClose: () => navigate(buildPath(Page.PERSONAL_DEVELOPMENT_PLAN)),
      }}
    >
      <div className={css(main)}>
        <div className={css(title)}>Need help with your Personal Development Plan?</div>
        <div>Below we have listed some points to help you write your personal plan and achieve your goals.</div>

        <div>
          <div className={css(subtitle)}>Reflect</div>
          <ul className={css(customText)}>
            <li>What are my goals, or learning and career aspirations? Why do I want to learn and develop myself?</li>
            <li>Where do I see myself in 12 months/2years/5 years?</li>
            <li>What feedback have I received from my manager/colleagues/direct reports?</li>
            <li>What motivates me? What gives me energy and inspiration to become the best version of myself?</li>
            <li>What strengths do I have that I want to develop further and role model?</li>
          </ul>
        </div>

        <div>
          <div className={css(subtitle)}>Write</div>
          <ul className={css(customText)}>
            <li>Which of my development goals are a priority?</li>
            <li>What will I achieve by meeting my development goals?</li>
            <li>How will I go about achieving my development goals?</li>
            <li>How will I know I have achieved my development goals?</li>
            <li>When do I want to achieve my development goals by?</li>
            <li>What obstacles might I face and how will I overcome them?</li>
            <li>What opportunities might I find to increase my chances of achieving my development goals?</li>
            <li>What support will I need from the people around me (e.g. my line manager, mentor or my colleagues)?</li>
          </ul>
        </div>

        <div>
          <h2 className={css(largeSubtitle)}>Act - Different ways to learn</h2>
          <h3 className={css(subtitle)}>Experiences</h3>
          <div>
            This should make up most of how you learn and develop. Examples include learning on the job, job rotations
            and shadowing, project work, problem solving, and dealing with challenging situations that put you out of
            your comfort zone and stretch your knowledge and skills
          </div>

          <h3>Learning through others</h3>
          <div>
            Examples include talking or listening to colleagues, managers and friends, buddying, mentoring, coaching,
            networking, forums or communities
          </div>

          <h3>Courses and resources</h3>
          <div>
            This should only make up 10% of your development. Examples include training courses (internal or external),
            books, articles, TED talks, e-learning, and other online resources
          </div>
        </div>

        <div>
          <div className={css(subtitle)}>Review</div>
          <ul className={css(customText)}>
            <li>How much did I achieve?</li>
            <li>Was it as much as I was expecting to achieve at this point?</li>
            <li>What do I need to do next?</li>
            <li>
              What else have I learned about myself while going through my learning and development journey? Are there
              any newly recognised strengths or development areas I would like to add to my PDP?
            </li>
            <li>Do I need to do more of the same, or something different?</li>
            <li>Do I need to take more time, or find some additional resources or support? </li>
          </ul>
        </div>
      </div>
    </ModalWithHeader>
  );
};

const title = {
  fontSize: '24px',
  lineHeight: '28px',
  fontWeight: '700',
  paddingBottom: '17px',
} as Rule;

const customText = {
  fontWeight: '400',
  fontSize: '16px',
  lineHeight: '20px',
} as Rule;

const subtitle = {
  fontWeight: '700',
  fontSize: '20px',
  lineHeight: '24px',
  paddingTop: '24px',
} as Rule;

const largeSubtitle = {
  fontWeight: '700',
  fontSize: '20px',
  lineHeight: '24px',
  paddingTop: '24px',
} as Rule;

const templatesModalWindowStyles: CreateRule<{ mobileScreen }> = (props) => {
  const { mobileScreen } = props;

  return {
    width: mobileScreen ? '100%' : '60%',
    padding: '0',
    marginTop: mobileScreen ? '50px' : 0,
    overflow: 'hidden',
    fontFamily: '"TESCO Modern", Arial, sans-serif',
  };
};

const main = {
  padding: '40px',
  overflowY: 'scroll',
  position: 'relative',
  height: '100%',
} as Rule;

export default PersonalDevelopmentHelp;
