import React from 'react';
import { CreateRule, Icon, Modal, Rule, theme, useBreakpoints, useStyle } from '@pma/dex-wrapper';
import { useNavigate } from 'react-router';
import { buildPath } from 'features/Routes';
import { Page } from 'pages';
import { ModalWrapper } from 'components/ModalWrapper';

const PersonalDevelopmentHelp = () => {
  const { css } = useStyle();
  const navigate = useNavigate();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;

  return (
    <ModalWrapper isOpen={true}>
      <Modal
        modalPosition={'middle'}
        overlayColor={'tescoBlue'}
        modalContainerRule={[containerRule({ mobileScreen })]}
        closeOptions={{
          content: <Icon graphic='close' invertColors={true} />,
          onClose: () => navigate(buildPath(Page.PERSONAL_DEVELOPMENT_PLAN)),
          styles: [modalCloseOptionStyle({ mobileScreen })],
        }}
        title={{
          content: 'Personal Development Plan Help',
          styles: [modalTitleOptionStyle({ mobileScreen })],
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
              <li>
                What support will I need from the people around me (e.g. my line manager, mentor or my colleagues)?
              </li>
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
              This should only make up 10% of your development. Examples include training courses (internal or
              external), books, articles, TED talks, e-learning, and other online resources
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
              <li>Do I need to take more time, or find some additional resources or support?</li>
            </ul>
          </div>
        </div>
      </Modal>
    </ModalWrapper>
  );
};

const containerRule: CreateRule<{ mobileScreen }> = (props) => {
  const { mobileScreen } = props;
  return {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    ...(mobileScreen
      ? { borderRadius: '24px 24px 0 0 ', padding: '16px 0' }
      : { borderRadius: '32px', padding: `40px 0` }),
    width: '640px',
    height: mobileScreen ? 'calc(100% - 72px)' : 'calc(100% - 102px)',
    marginTop: '72px',
    overflow: 'hidden',
    marginBottom: mobileScreen ? 0 : '30px',
    background: theme.colors.white,
    cursor: 'default',
  };
};

// TODO: Extract duplicate 13
const modalCloseOptionStyle: CreateRule<{ mobileScreen }> = (props) => {
  const { mobileScreen } = props;
  return {
    display: 'inline-block',
    height: '24px',
    paddingLeft: '0px',
    paddingRight: '0px',
    position: 'fixed',
    top: '22px',
    right: mobileScreen ? '20px' : '40px',
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
  };
};

// TODO: Extract duplicate 14
const modalTitleOptionStyle: CreateRule<{ mobileScreen }> = (props) => {
  const { mobileScreen } = props;
  return {
    position: 'fixed',
    top: '22px',
    textAlign: 'center',
    left: 0,
    right: 0,
    color: 'white',
    fontWeight: theme.font.weight.bold,
    ...(mobileScreen
      ? {
          fontSize: `${theme.font.fixed.f20.fontSize}`,
          lineHeight: `${theme.font.fluid.f24.lineHeight}`,
        }
      : {
          fontSize: `${theme.font.fixed.f24.fontSize}`,
          lineHeight: `${theme.font.fluid.f28.lineHeight}`,
        }),
  };
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
  padding: '0px 40px',
  overflowY: 'scroll',
  position: 'relative',
  height: '100%',
} as Rule;

export default PersonalDevelopmentHelp;
