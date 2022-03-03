import React, { FC, useEffect, useMemo } from 'react';
import { CreateRule, Rule, Styles, theme, useBreakpoints, useStyle } from '@dex-ddl/core';
import { useDispatch, useSelector } from 'react-redux';
import { downloadPDF, PDPDocument, usePDF } from '@pma/pdf-renderer';
import {
  colleagueUUIDSelector,
  getTimelineMetaSelector,
  PDPActions,
  schemaMetaPDPSelector,
  TimelineActions,
  timelineTypesAvailabilitySelector,
} from '@pma/store';
import { useNavigate } from 'react-router';
import { ObjectiveType, PDPType, ReviewType } from 'config/enum';
import DescriptionBlock from 'components/DescriptionBlock';
import { Page } from 'pages';
import { buildPath } from 'features/Routes';
import { paramsReplacer } from 'utils';
import { Icon } from 'components/Icon';
import { BASE_URL_API } from 'config/constants';
import GoalInfo from '../GoalInfo';
import usePDPSchema from '../../hooks/usePDPSchema';

const reviews = [
  {
    id: 'test-1',
    title: 'Mid-year review',
    description: 'Pharetra donec enim aenean aliquet consectetur ultrices amet vitae',
    reviewType: ReviewType.MYR,
  },
  {
    id: 'test-2',
    title: 'End-year review',
    description: 'Pharetra donec enim aenean aliquet consectetur ultrices amet vitae',
    reviewType: ReviewType.EYR,
  },
];

const annualReviews = [
  {
    id: 'test-3',
    title: 'Annual performance review',
    description: 'Pharetra donec enim aenean aliquet consectetur ultrices amet vitae',
  },
];

export const TEST_ID = 'pdp-page';

function getEditOrCreatePDP(pdpSelector: any[]) {
  if (pdpSelector?.length >= 1 && pdpSelector?.length < 5) return 'Edit PDP';
  return 'Create PDP';
}

const MyPersonalDevelopmentPlan: FC = () => {
  const { css, theme } = useStyle();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;

  const pdpSelector = useSelector(schemaMetaPDPSelector)?.goals || [];
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const [schema] = usePDPSchema(PDPType.PDP);
  const { components = [] } = schema;
  const timelineTypes = useSelector(timelineTypesAvailabilitySelector('me'));
  const canShowMyReview = timelineTypes[ObjectiveType.MYR] && timelineTypes[ObjectiveType.EYR];
  const canShowAnnualReview = !timelineTypes[ObjectiveType.MYR] && timelineTypes[ObjectiveType.EYR];

  const formElements = components.filter((component) => component.type != 'text');

  const documentFormElements = formElements.map((el) => ({ label: el['label'].replace(/\*./g, '') }));

  const documentFormItems = pdpSelector.map((el, idx) => {
    return {
      uuid: el.uuid,
      number: pdpSelector[idx]?.number,
      items: Object.values(el?.properties?.mapJson).map((value) => value),
    };
  });

  const document = useMemo(
    () => <PDPDocument formItems={documentFormElements} items={documentFormItems} />,
    [pdpSelector, pdpSelector.length],
  );

  const [instance, updateInstance] = usePDF({ document });

  // TODO: this probably should be removed or used somewhere
  const createdReviews: any = [];
  if (canShowMyReview) {
    createdReviews.push(...reviews);
  } else if (canShowAnnualReview) {
    createdReviews.push(...annualReviews);
  }

  const navToGoalPage = () => navigate(buildPath(Page.CREATE_PERSONAL_DEVELOPMENT_PLAN));

  const { loaded } = useSelector(getTimelineMetaSelector) || {};

  useEffect(() => {
    if (pdpSelector?.length) {
      updateInstance();
    }
  }, [pdpSelector, pdpSelector?.length]);

  useEffect(() => {
    if (!loaded) {
      dispatch(TimelineActions.getTimeline({ colleagueUuid }));
    }
  }, [loaded]);

  useEffect(() => {
    dispatch(PDPActions.getPDPGoal({}));
  }, []);

  const deleteGoal = (uuid) => {
    dispatch(PDPActions.deletePDPGoal({ uuid }));
  };

  const editGoal = (uuid) => {
    navigate(buildPath(paramsReplacer(`${Page.UPDATE_PERSONAL_DEVELOPMENT_PLAN}`, { ':uuid': uuid })));
  };

  const downloadHref = () => `${BASE_URL_API}/pdp/template`;

  return (
    <div className={css({ padding: '0 40px' })}>
      <div className={css(buttonBlock)}>
        <div className={css(controlButtons({ mobileScreen }))}>
          {pdpSelector?.length !== 5 && (
            <>
              <a className={css(buttonDownload)} href={downloadHref()} download>
                <div className={css(btnIcon)}>
                  <Icon graphic='download' />
                </div>
                Download template
              </a>

              <button className={css(buttonIcon)} onClick={navToGoalPage}>
                <div className={css(btnIcon)}>
                  <Icon graphic='add' fill={theme.colors.white} iconStyles={{ height: '16.67px', width: '16.67px' }} />
                </div>
                {getEditOrCreatePDP(pdpSelector)}
              </button>
            </>
          )}
        </div>

        <div className={css(controlButtons({ mobileScreen }))}>
          <button onClick={() => navigate(buildPath(Page.PERSONAL_DEVELOPMENT_HELP))} className={css(infoBtn)}>
            <Icon graphic='information' />
          </button>
        </div>
      </div>

      <div className={css(descriptionMain)}>
        <DescriptionBlock>
          <div className={css(title)}>What is Personal Development Plan?</div>
          <div className={css(details, detailsWithMargin)}>
            Your Personal Development Plan (PDP) is a tailored plan that helps you reflect on the things you are great
            at and identify areas you want to improve.
            <p>
              Having a Personal Development Plan will help you to put some structure to your development and be clear
              about what you are looking for in your career. How you want your plan to look and what you put in it is up
              to you, the important thing is that it inspires and motivates you. You can use the system to write and
              store your PDP, download the template or make a new plan that suits your ways of working.
            </p>
            <p>
              Remember a PDP is completely personal to you, you don&apos;t have to share it but it might be helpful to
              use it when having development conversations.
            </p>
            <p>
              It&apos;s important you review and update your PDP regularly to ensure it reflects where you are in your
              career at that moment in time.
            </p>
          </div>

          <div className={css(title)}>How The Performance Development Plan works?</div>
          <div className={css(details)}>
            At Tesco, “how” you do your job is as important as “what” you deliver. An inspiring PDP will help you focus
            on what to develop, whether that&apos;s being at your best in your current role or moving towards a bigger
            or broader role. What&apos;s important is recording and regularly reviewing your plan to a format that works
            for you.
          </div>
        </DescriptionBlock>
      </div>

      {pdpSelector?.length > 0 && (
        <div className={css(subtitleBlock)}>
          <div className={css(devPlanTitle)}>My Development Plan</div>
          <div>
            <button className={css(buttonDownloadItems)} onClick={() => downloadPDF(instance.url!, 'pdp-goals.pdf')}>
              <div className={css(btnIcon)}>
                <Icon graphic='download' />
              </div>
              Download
            </button>
          </div>
        </div>
      )}

      <div className={css(bodyWrapperStyles({ mobileScreen }))} data-test-id={TEST_ID}>
        <div className={css(timelineWrapperStyles)}>
          {pdpSelector &&
            pdpSelector.map((el, idx) => {
              return (
                <GoalInfo
                  id={el.uuid}
                  key={`Personal Development Goal: ${idx + 1}`}
                  data={el.properties.mapJson}
                  title={`Personal Development Goal: ${idx + 1}`}
                  subtitle={formElements[0].label}
                  formElements={formElements}
                  deleteGoal={deleteGoal}
                  editGoal={editGoal}
                  description={Object.values(el.properties.mapJson)[0]}
                />
              );
            })}
        </div>
        <div className={css({ flex: '1 1 30%', display: 'flex', flexDirection: 'column' })} />
      </div>
    </div>
  );
};

const subtitleBlock = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'row',
  width: '70%',
  borderBottom: `1px solid ${theme.colors.backgroundDarkest}`,
  paddingTop: '10px',
} as Rule;

const devPlanTitle = {
  color: `${theme.colors.base}`,
  fontFamily: '"TESCO Modern", Arial, sans-serif',
  fontStyle: 'normal',
  fontWeight: `${theme.font.weight.bold}`,
  fontSize: `${theme.font.fixed.f18}`,
  lineHeight: '22px',
} as Rule;

const detailsWithMargin = {
  marginBottom: '24px',
} as Rule;

const title = {
  color: `${theme.colors.base}`,
  fontFamily: '"TESCO Modern", Arial, sans-serif',
  fontStyle: 'normal',
  fontWeight: `${theme.font.weight.bold}`,
  fontSize: `${theme.font.fixed.f18}`,
  lineHeight: '22px',
  marginBottom: '8px',
} as Rule;

const descriptionMain = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  flexDirection: 'row',
  width: '70%',
  '@media (max-width: 900px)': {
    flexDirection: 'column',
  },
  fontFamily: '"TESCO Modern", Arial, sans-serif',
  fontSize: `${theme.font.fixed.f14}`,
  fontStyle: 'normal',
  lineHeight: '18px',
  letterSpacing: '0px',
  textAlign: 'left',
} as Rule;

const details = {
  fontWeight: 'normal',
  color: `${theme.colors.base}`,
  fontSize: `${theme.font.fixed.f14}`,
  lineHeight: '18px',
} as Rule;

const infoBtn = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
} as Rule;

const buttonDownload = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'auto',
  height: '40px',
  padding: '10px 20px',
  fontSize: `${theme.font.fixed.f16}`,
  lineHeight: '20px',
  borderRadius: '32px',
  cursor: 'pointer',
  marginTop: '16px',
  marginBottom: '16px',
  border: `2px solid ${theme.colors.tescoBlue}`,
  backgroundColor: 'transparent',
  color: `${theme.colors.tescoBlue}`,
  fontWeight: `${theme.font.weight.bold}`,
  marginRight: '15px',
  ':hover': {
    color: `${theme.colors.tescoBlue}`,
  },
  ':focus': {
    color: `${theme.colors.tescoBlue}`,
  },
} as Rule;

const buttonDownloadItems = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'auto',
  height: '40px',
  padding: '10px 0',
  fontSize: `${theme.font.fixed.f16}`,
  lineHeight: '20px',
  border: 'none',
  cursor: 'pointer',
  marginTop: '16px',
  marginBottom: '16px',
  backgroundColor: 'transparent',
  color: `${theme.colors.tescoBlue}`,
  fontWeight: `${theme.font.weight.bold}`,
} as Rule;

const btnIcon = {
  paddingRight: '9.67px',
  height: '18px',
} as Rule;

const buttonIcon = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'auto',
  height: '40px',
  padding: '10px 20px',
  color: `${theme.colors.white}`,
  backgroundColor: `${theme.colors.tescoBlue}`,
  fontSize: `${theme.font.fixed.f16}`,
  fontWeight: `${theme.font.weight.bold}`,
  lineHeight: '20px',
  borderRadius: '32px',
  border: 'none',
  cursor: 'pointer',
  marginTop: '16px',
  marginBottom: '16px',
} as Rule;

const buttonBlock = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'row',
  fontFamily: '"TESCO Modern", Arial, sans-serif',
} as Rule;

const controlButtons: CreateRule<{ mobileScreen: boolean }> = (props) => {
  const { mobileScreen } = props;

  if (mobileScreen) {
    return {
      flexDirection: 'column',
    };
  }

  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
};

const timelineWrapperStyles = {
  flex: '3 1 70%',
  display: 'flex',
  flexDirection: 'column',
  '& > div': {
    height: '100%',
  },
} as Styles;

const bodyWrapperStyles: CreateRule<{ mobileScreen: boolean }> = (props) => {
  const { mobileScreen } = props;

  return {
    display: 'flex',
    flexWrap: 'nowrap',
    marginTop: '16px',
    alignItems: 'stretch',
    paddingBottom: '20px',
    flexDirection: mobileScreen ? 'column' : 'row',
  };
};

export default MyPersonalDevelopmentPlan;
