import React, { FC, useEffect, useState } from 'react';
import { Trans, useTranslation } from 'components/Translation';
import { CreateRule, Rule, Styles, theme, Theme, useBreakpoints, useStyle } from '@dex-ddl/core';
import { ObjectiveType, PDPType, ReviewType } from 'config/enum';

import { IconButton } from 'components/IconButton';

import {
  Accordion,
  Section,
  transformReviewsToObjectives,
  ObjectiveTypes as OT,
} from 'features/Objectives';
import { PreviousReviewFilesModal } from 'features/ReviewFiles/components';
import useDispatch from 'hooks/useDispatch';
import { useSelector } from 'react-redux';
import {
  colleagueUUIDSelector,
  currentUserSelector,
  getTimelineByReviewTypeSelector,
  getTimelineMetaSelector,
  isReviewsInStatus,
  PDPActions,
  reviewsMetaSelector,
  schemaMetaSelector,
  TimelineActions,
  timelineTypesAvailabilitySelector,
} from '@pma/store';
import { useNavigate } from 'react-router';
import useReviewSchema from 'features/Objectives/hooks/useReviewSchema';
import useReviews from 'features/Objectives/hooks/useReviews';
import plus from '../../assets/img/pdp/plusIcon.png';
import download from '../../assets/img/pdp/download.png';
import infoIcon from '../../assets/img/pdp/infoIcon.png';
import DescriptionBlock from 'components/DescriptionBlock';
import GoalInfo from './GoalInfo';
import { Page } from 'pages';
import usePDPShema from 'features/PDP/hooks/usePDPShema';
import { buildPath } from 'features/Routes';

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

const PersonalDevelopmentPlan: FC = () => {
  const { css, theme } = useStyle();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { info } = useSelector(currentUserSelector);
  const pathParams = { colleagueUuid: info.colleagueUUID, type: PDPType.PDP, cycleUuid: 'CURRENT' };
  const [objectives, setObjectives] = useState<OT.Objective[]>([]);

  const { loaded: schemaLoaded } = useSelector(schemaMetaSelector);
  const { loaded: reviewLoaded } = useSelector(reviewsMetaSelector);
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const [schema] = usePDPShema(PDPType.PDP);
  // console.log('--------------', schema);
  const { components = [], markup = { max: 0, min: 0 } } = schema;
  const timelineTypes = useSelector(timelineTypesAvailabilitySelector);
  const canShowMyReview = timelineTypes[ObjectiveType.MYR] && timelineTypes[ObjectiveType.EYR];
  const canShowAnnualReview = !timelineTypes[ObjectiveType.MYR] && timelineTypes[ObjectiveType.EYR];

  const formElements = components.filter((component) => component.type != 'text');

  // todo not clear where reviews might come from. remove this block when its clear
  const createdReviews: any = [];
  if (canShowMyReview) {
    createdReviews.push(...reviews);
  } else if (canShowAnnualReview) {
    createdReviews.push(...annualReviews);
  }

  useEffect(() => {
    if (reviewLoaded && schemaLoaded) {
      console.log(reviewLoaded);
      
      // setObjectives(transformReviewsToObjectives(origin, formElements));
    }
  }, [reviewLoaded, schemaLoaded]);

  const navToGoalPage = () => navigate(buildPath(Page.CREATE_PERSONAL_DEVELOPMENT_GOAL));

  const { loaded } = useSelector(getTimelineMetaSelector) || {};

  useEffect(() => {
    if (!loaded) dispatch(TimelineActions.getTimeline({ colleagueUuid }));
  }, [loaded]);

  useEffect(() => {
    dispatch(PDPActions.getPDPGoal({}));
  }, []);

  const goalListOfItems = [
    {
      title: 'Personal Development Goal: 1',
      subtitle: 'Develop a growth mindset', 
      description: 'I want our customers to be satisfied and always return to us',
      data: [
        {
          title: 'Develop a growth mindset', 
          description: 'I want our customers to be satisfied and always return to us'
        },
        {
          title: 'I want to achieve my goal by', 
          description: '03 September 2022'
        }
      ]
    },
    {
      title: 'Personal Development Goal: 2',
      data: [
        {
          title: 'Develop a growth mindset', 
          description: 'I want our customers to be satisfied and always return to us'
        },
        {
          title: 'I want to achieve my goal by', 
          description: '03 September 2022'
        }
      ]
    },
    {
      title: 'Personal Development Goal: 3',
      data: [
        {
          title: 'Develop a growth mindset', 
          description: 'I want our customers to be satisfied and always return to us'
        },
        {
          title: 'I want to achieve my goal by', 
          description: '03 September 2022'
        }
      ]
    }
  ];

  return (
    <div className={css({ padding: '0 40px' })}>
      <div className={css(buttonBlock({theme}))}>
        <div className={css(controlButtons({theme}))}>
          <button className={`${css(buttonIcon({theme}))} ${css(buttonDownload({theme}))}`} onClick={() =>console.log('download template')}>
            <div className={css(btnIcon)}><img alt='create' src={download} /></div>
            Download template
          </button>

          <button className={css(buttonIcon({theme}))} onClick={navToGoalPage}>
            <div className={css(btnIcon)}><img alt='create' src={plus} /></div>
            Create PDP
          </button>
        </div>

        <div className={css(controlButtons({theme}))}>
          <button onClick={() => navigate(buildPath(Page.PERSONAL_DEVELOPMENT_HELP))} className={css(infoBtn)}><img alt='info' src={infoIcon} /></button>
        </div>
      </div>

      <div className={css(descriptionMain)}>
          <DescriptionBlock>
            <div className={css(title({theme}))}>What is Personal Development Plan?</div>
            <div className={css(details({theme}), detailsWithMargin)}>
              Your Performance Development Plan (PDP) is a tailored plan that helps you reflect on the things you are
              great at and identify areas you want to improve.
            </div>

            <div className={css(title({theme}))}>How The Performance Development Plan works?</div>
            <div className={css(details({theme}))}>
              At Tesco, “how” you do your job is as important as “what” you deliver. An inspiring PDP will help you
              focus on what to develop, whether that’s being at your best in your current role or moving towards a
              bigger or broader role. What’s important is recording and regularly reviewing your plan to a format that
              works for you.
            </div>
          </DescriptionBlock>
      </div>
      
      <div className={css(bodyWrapperStyles)} data-test-id={TEST_ID}>
        <div className={css(timelineWrapperStyles)}>
            {
              goalListOfItems.map( (el,idx) => {
                return (
                  <GoalInfo key={el.title+idx} data={el.data} title={el.title} subtitle={el.subtitle} description={el.description}/>
                )
              })
            }
        </div>
        <div className={css({ flex: '1 1 30%', display: 'flex', flexDirection: 'column' })} />
      </div>
    </div>
  );
};

const detailsWithMargin = {
  marginBottom: '24px',
} as Rule;

const title: CreateRule<{ theme: Theme; }> = (props) => {
  if (props == null) return {};
  const { theme } = props;
  return {
    color: `${theme.colors.base}`,
    fontFamily: 'TESCO Modern',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: `${theme.font.fixed.f18}`,
    lineHeight: '22px',
    marginBottom: '8px',
  };
};

const descriptionMain = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  flexDirection: 'row',
  '@media (max-width: 900px)': {
    flexDirection: 'column',
  },
  fontFamily: 'TESCO Modern',
  fontSize: `${theme.font.fixed.f14}`,
  fontStyle: 'normal',
  lineHeight: '18px',
  letterSpacing: '0px',
  textAlign: 'left',

} as Rule;

const details: CreateRule<{ theme: Theme; }> = (props) => {
  if (props == null) return {};
  const { theme } = props;
  return {
    fontWeight: 'normal',
    color: `${theme.colors.base}`,
    fontSize: `${theme.font.fixed.f14}`,
    lineHeight: '18px',
  };
};

const infoBtn = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
} as Rule;

const buttonDownload: CreateRule<{ theme: Theme; }> = (props) => {
  if (props == null) return {};
  const { theme } = props;
  return {
    border: `2px solid ${theme.colors.tescoBlue}`,
    backgroundColor: 'transparent',
    // color: `${theme.colors.tescoBlue}`,
    color: '#00539F',
    fontWeight: 'bold',
    marginRight: '15px',
  };
};

const btnIcon = {
  paddingRight: '9.67px',
  height: '18px',
} as Rule;

const buttonIcon: CreateRule<{ theme: Theme; }> = (props) => {
  if (props == null) return {};
  const { theme } = props;
  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
    height: '40px',
    padding: '10px 20px',
    color: `${theme.colors.white}`,
    backgroundColor: `${theme.colors.tescoBlue}`,
    fontSize: `${theme.font.fixed.f16}`,
    fontWeight: 'bold',
    lineHeight: '20px',
    borderRadius: '32px',
    border: 'none',
    cursor: 'pointer',
    marginTop: '16px',
    marginBottom: '16px',
  };
};

const buttonBlock: CreateRule<{ theme: Theme; }> = (props) => {
  if (props == null) return {};
  const { theme } = props;

  return {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    fontFamily: 'TESCO Modern',
  };
};

const controlButtons: CreateRule<{ theme: Theme; }> = (props) => {
  if (props == null) return {};
  const { theme } = props;
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  
  if (mobileScreen) {
    return {
      flexDirection: 'column',
    }
  }

  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
};

const headWrapperStyles: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return {
    display: 'flex',
    gap: '10px',
    margin: '15px 0',
    flexDirection: mobileScreen ? 'column' : 'row',
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

const shareWidgetStyles = {
  flex: '1 1 30%',
  display: 'flex',
  flexDirection: 'column',
} as Styles;

const bodyWrapperStyles: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return {
    display: 'flex',
    flexWrap: 'nowrap',
    marginTop: '16px',
    alignItems: 'stretch',
    paddingBottom: '20px',
    flexDirection: mobileScreen ? 'column' : 'row',
  };
};

const basicTileStyle: Rule = {
  flex: '1 0 216px',
};

const iconStyles: Rule = {
  marginRight: '10px',
};

const iconButtonStyles: Rule = ({ theme }) => ({
  padding: '10px 10px',
  color: theme.colors.tescoBlue,
  fontWeight: 700,
});

const tileStyles: Rule = {
  display: 'flex',
  alignItems: 'center',
};

const widgetWrapperStyle: Rule = {
  display: 'flex',
  flexWrap: 'wrap',
  gridGap: '8px',
  marginTop: '8px',
};

const linkStyles = ({ theme }) => ({
  fontSize: '14px',
  lineHeight: '18px',
  color: theme.colors.tescoBlue,
  background: 'transparent',
});

export default PersonalDevelopmentPlan;
