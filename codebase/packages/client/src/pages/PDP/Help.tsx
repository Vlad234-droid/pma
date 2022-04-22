import React from 'react';
import { CreateRule, Icon, Modal, Rule, theme, useStyle } from '@pma/dex-wrapper';
import { useNavigate } from 'react-router';
import { buildPath } from 'features/Routes';
import { Page } from 'pages';
import { ModalWrapper } from 'components/ModalWrapper';
import { Trans } from 'components/Translation';

const PersonalDevelopmentHelp = () => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const navigate = useNavigate();

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
          <div className={css(title)}>
            <Trans i18nKey='need_help_with_your_personal_development_plan'>
              Need help with your Personal Development Plan?
            </Trans>
          </div>
          <div className={css(description)}>
            <Trans i18nKey='below_we_have_listed_some_points'>
              Below we have listed some points to help you write your personal plan and achieve your goals.
            </Trans>
          </div>

          <div>
            <div className={css(subtitle)}>
              <Trans i18nKey='reflect'>Reflect</Trans>
            </div>
            <ul className={css(customText)}>
              <li>
                <Trans i18nKey='what_are_my_goals'>
                  What are my goals, or learning and career aspirations? Why do I want to learn and develop myself?
                </Trans>
              </li>
              <li>
                <Trans i18nKey='where_do_i_see_myself_in'>Where do I see myself in 12 months/2years/5 years?</Trans>
              </li>
              <li>
                <Trans i18nKey='what_feedback_have_i_received_from_my_manager'>
                  What feedback have I received from my manager/colleagues/direct reports?
                </Trans>
              </li>
              <li>
                <Trans i18nKey='what_motivates_me'>
                  What motivates me? What gives me energy and inspiration to become the best version of myself?
                </Trans>
              </li>
              <li>
                <Trans i18nKey='what_strengths_do_i_have'>
                  What strengths do I have that I want to develop further and role model?
                </Trans>
              </li>
            </ul>
          </div>

          <div>
            <div className={css(subtitle)}>
              <Trans i18nKey='write'>Write</Trans>
            </div>
            <ul className={css(customText)}>
              <li>
                <Trans i18nKey='which_of_my_development_goals_are_a_priority'>
                  Which of my development goals are a priority?
                </Trans>
              </li>
              <li>
                <Trans i18nKey='what_will_i_achieve_by_meeting_my_development_goals'>
                  What will I achieve by meeting my development goals?
                </Trans>
              </li>
              <li>
                <Trans i18nKey='how_will_i_go_about_achieving_my_development_goals'>
                  How will I go about achieving my development goals?
                </Trans>
              </li>
              <li>
                <Trans i18nKey='how_will_i_know_i_have_achieved_my_development_goals'>
                  How will I know I have achieved my development goals?
                </Trans>
              </li>
              <li>
                <Trans i18nKey='when_do_i_want_to_achieve_my_development_goals_by'>
                  When do I want to achieve my development goals by?
                </Trans>
              </li>
              <li>
                <Trans i18nKey='what_obstacles_might_i_face_and_how_will_i_overcome_them'>
                  What obstacles might I face and how will I overcome them?
                </Trans>
              </li>
              <li>
                <Trans i18nKey='what_opportunities_might_i_find'>
                  What opportunities might I find to increase my chances of achieving my development goals?
                </Trans>
              </li>
              <li>
                <Trans i18nKey='what_support_will_i_need_from_the_people'>
                  What support will I need from the people around me (e.g. my line manager, mentor or my colleagues)?
                </Trans>
              </li>
            </ul>
          </div>

          <div>
            <h2 className={css(largeSubtitle)}>
              <Trans i18nKey='act_different_ways_to_learn'>Act - Different ways to learn</Trans>
            </h2>
            <h3 className={css(subtitle)}>
              <Trans i18nKey='experiences'>Experiences</Trans>
            </h3>
            <div className={css(description)}>
              <Trans i18nKey='this_should_make_up_most_of_how_you_learn_and_develop'>
                This should make up most of how you learn and develop. Examples include learning on the job, job
                rotations and shadowing, project work, problem solving, and dealing with challenging situations that put
                you out of your comfort zone and stretch your knowledge and skills
              </Trans>
            </div>

            <h3 className={css(titleBlock)}>
              <Trans i18nKey='learning_through_others'>Learning through others</Trans>
            </h3>
            <div className={css(description)}>
              <Trans i18nKey='examples_include_talking_or_listening_to_colleagues'>
                Examples include talking or listening to colleagues, managers and friends, buddying, mentoring,
                coaching, networking, forums or communities
              </Trans>
            </div>

            <h3 className={css(titleBlock)}>
              <Trans i18nKey='courses_and_resources'>Courses and resources</Trans>
            </h3>
            <div className={css(description)}>
              <Trans i18nKey='this_should_only_make_up'>
                This should only make up 10% of your development. Examples include training courses (internal or
                external), books, articles, TED talks, e-learning, and other online resources
              </Trans>
            </div>
          </div>

          <div>
            <div className={css(subtitle)}>
              <Trans i18nKey='review'>Review</Trans>
            </div>
            <ul className={css(customText)}>
              <li>
                <Trans i18nKey='how_much_did_i_achieve'>How much did I achieve?</Trans>
              </li>
              <li>
                <Trans i18nKey='was_it_as_much_as_i_was_expecting_to_achieve_at_this_point'>
                  Was it as much as I was expecting to achieve at this point?
                </Trans>
              </li>
              <li>
                <Trans i18nKey='what_do_i_need_to_do_next'>What do I need to do next?</Trans>
              </li>
              <li>
                <Trans i18nKey='what_else_have_i_learned_about_myself'>
                  What else have I learned about myself while going through my learning and development journey? Are
                  there any newly recognised strengths or development areas I would like to add to my PDP?
                </Trans>
              </li>
              <li>
                <Trans i18nKey='do_i_need_to_do_more_of_the_same'>
                  Do I need to do more of the same, or something different?
                </Trans>
              </li>
              <li>
                <Trans i18nKey='do_i_need_to_take_more_time'>
                  Do I need to take more time, or find some additional resources or support?
                </Trans>
              </li>
            </ul>
          </div>
        </div>
      </Modal>
    </ModalWrapper>
  );
};

const titleBlock: Rule = ({ theme }) => {
  return {
    fontSize: theme.font.fixed.f18.fontSize,
    lineHeight: theme.font.fixed.f18.lineHeight,
    letterSpacing: '0px',
    fontWeight: theme.font.weight.bold,
  };
};

const description: Rule = ({ theme }) => {
  return {
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f16.lineHeight,
    letterSpacing: '0px',
  };
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
const modalCloseOptionStyle: CreateRule<{ mobileScreen }> = ({ mobileScreen }) => ({
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
});

// TODO: Extract duplicate 14
const modalTitleOptionStyle: CreateRule<{ mobileScreen }> = ({ mobileScreen }) => ({
  position: 'fixed',
  top: '22px',
  textAlign: 'center',
  left: 0,
  right: 0,
  color: 'white',
  fontWeight: theme.font.weight.bold,
  letterSpacing: '0px',
  ...(mobileScreen
    ? {
        fontSize: `${theme.font.fixed.f20.fontSize}`,
        lineHeight: `${theme.font.fluid.f24.lineHeight}`,
      }
    : {
        fontSize: `${theme.font.fixed.f24.fontSize}`,
        lineHeight: `${theme.font.fluid.f28.lineHeight}`,
      }),
});

const title: Rule = ({ theme }) => {
  return {
    fontSize: theme.font.fixed.f24.fontSize,
    lineHeight: theme.font.fixed.f24.lineHeight,
    letterSpacing: '0px',
    fontWeight: theme.font.weight.bold,
    paddingBottom: '17px',
  };
};

const customText: Rule = ({ theme }) => {
  return {
    fontWeight: '400',
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f16.lineHeight,
    letterSpacing: '0px',
  };
};

const subtitle = {
  fontWeight: theme.font.weight.bold,
  fontSize: theme.font.fixed.f20.fontSize,
  lineHeight: theme.font.fixed.f20.lineHeight,
  letterSpacing: '0px',
  paddingTop: '24px',
} as Rule;

const largeSubtitle = {
  fontWeight: theme.font.weight.bold,
  fontSize: theme.font.fixed.f20.fontSize,
  lineHeight: theme.font.fixed.f20.lineHeight,
  letterSpacing: '0px',
  paddingTop: '24px',
} as Rule;

const main = {
  padding: '0px 40px',
  overflowY: 'scroll',
  position: 'relative',
  height: '100%',
} as Rule;

export default PersonalDevelopmentHelp;
