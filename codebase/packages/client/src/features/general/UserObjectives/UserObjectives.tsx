import React, { FC, useState } from 'react';
import { Button, CreateRule, Rule, Styles, useStyle, IconButton as BackButton } from '@pma/dex-wrapper';

import { useSelector } from 'react-redux';
import {
  getColleagueMetaSelector,
  getColleagueSelector,
  getPreviousReviewFilesSelector,
  getTimelineMetaSelector,
  getTimelineSelector,
  reviewsMetaSelector,
  schemaMetaSelector,
  timelineTypesAvailabilitySelector,
} from '@pma/store';
import { useNavigate, useParams } from 'react-router';

import { Trans, useTranslation } from 'components/Translation';
import { StepIndicator } from 'components/StepIndicator/StepIndicator';

import { ObjectiveTypes as OT, Section } from 'features/general/Objectives';
import { ShareWidget } from 'features/general/ShareWidget';
import { PreviousReviewFilesModal } from 'features/general/ReviewFiles/components';
import { useToast, Variant } from 'features/general/Toast';
import { UserObjectivesSections } from 'features/general/UserObjectivesSections';
import { OrganizationWidget } from 'features/general/OrganizationWidget';
import { buildPath } from 'features/general/Routes';
import { Page } from 'pages';
import Spinner from 'components/Spinner';
import { File } from 'features/general/ReviewFiles/components/components/File';
import SecondaryWidget from 'features/general/SecondaryWidget';
import { CanPerform, role } from 'features/general/Permission';

import { useUserObjectivesData } from './hooks';

import { ObjectiveType } from 'config/enum';
import { getWidgets } from './utils';
import { Profile } from 'features/general/Profile';

export const TEST_ID = 'user-objectives-page';

const UserObjectives: FC = () => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true, medium: true }) || false;
  const { t } = useTranslation();
  const { addToast } = useToast();

  const navigate = useNavigate();

  const [previousReviewFilesModalShow, setPreviousReviewFilesModalShow] = useState(false);
  const [objectives, setObjectives] = useState<OT.Objective[]>([]);

  const { loaded: schemaLoaded } = useSelector(schemaMetaSelector);
  const { loaded: reviewLoaded, loading: reviewLoading } = useSelector(reviewsMetaSelector);
  const { loaded: timelineLoaded } = useSelector(getTimelineMetaSelector);
  const { loaded: colleagueLoaded } = useSelector(getColleagueMetaSelector);
  const { uuid } = useParams<{ uuid: string }>();

  const { descriptions, startDates, statuses } = useSelector(getTimelineSelector(uuid)) || {};
  const timelineTypes = useSelector(timelineTypesAvailabilitySelector(uuid));
  const colleague = useSelector(getColleagueSelector);
  const canShowObjectives = timelineTypes[ObjectiveType.OBJECTIVE];

  const files: File[] = useSelector(getPreviousReviewFilesSelector) || [];
  const canShowMyReview = timelineTypes[ObjectiveType.MYR] && timelineTypes[ObjectiveType.EYR];

  //TODO: temporary solution, in future replace to selector
  const isSubmittingSecondaryWidget = false;

  useUserObjectivesData(uuid, reviewLoaded, schemaLoaded, setObjectives);

  const handleClick = () => {
    addToast({
      id: Date.now().toString(),
      title: t('do_you_know', 'Do you know?'),
      variant: Variant.INFO,
      description: t(
        'that_you_can_submit',
        'That you can submit new objectives at anytime during the performance cycle?',
      ),
    });
  };

  return (
    <div data-test-id={TEST_ID} className={css(bodyBlockStyles({ mobileScreen }))}>
      <div data-test-id={'test-back-btn'} className={css(arrowLeftStyle)}>
        <BackButton
          onPress={() => {
            navigate(-1);
          }}
          graphic='backwardLink'
        />
      </div>
      <div className={css(bodyWrapperStyles)}>
        {!timelineLoaded ? (
          <Spinner id='1' />
        ) : (
          <>
            {!mobileScreen && canShowMyReview && colleagueLoaded && (
              <div className={css(headerWrapperStyles)}>
                <Profile
                  fullName={colleague?.profile?.fullName}
                  department={colleague?.profile?.department}
                  job={colleague?.profile?.job}
                  manager={colleague?.profile?.managerName}
                />
                <div data-test-id={'test-step-indicator'} onClick={handleClick} className={css(timelineWrapperStyles)}>
                  <StepIndicator
                    mainTitle={t('performance_timeline_title', 'Your Contribution timeline')}
                    titles={descriptions}
                    descriptions={startDates}
                    statuses={statuses}
                  />
                </div>
              </div>
            )}
            <div className={css(timelineWrapperStyles)}>
              <UserObjectivesSections
                canShowObjectives={canShowObjectives}
                reviewLoading={reviewLoading}
                objectives={objectives}
                reviewLoaded={true}
              >
                <CanPerform
                  perform={[role.LINE_MANAGER]}
                  yes={() => (
                    <div className={css(secondaryWidgetStyles)}>
                      {getWidgets(t, isSubmittingSecondaryWidget, navigate, uuid).map((props, i) => (
                        <SecondaryWidget customStyle={widgetStyle} key={i} {...props} />
                      ))}
                    </div>
                  )}
                />
              </UserObjectivesSections>

              <Section
                left={{
                  content: (
                    <div>
                      <Trans i18nKey='previous_review_files'>Previous Review Files</Trans>
                    </div>
                  ),
                }}
                right={{
                  content: (
                    <div>
                      <Button
                        mode='inverse'
                        onPress={() => setPreviousReviewFilesModalShow(true)}
                        styles={[linkStyles]}
                      >
                        <Trans i18nKey='view_files'>View files</Trans>
                      </Button>
                    </div>
                  ),
                }}
              >
                <div className={css(emptyBlockStyle)}>
                  <Trans>{`You have ${files.length || 'no'} files`}</Trans>
                </div>
              </Section>
            </div>
          </>
        )}
      </div>
      <div className={css(headWrapperStyles({ mobileScreen }))}>
        {!timelineLoaded && (
          <div data-test-id={'test-timeline-spinner'} className={css(timelineWrapperStyles)}>
            <Spinner id='2' />
          </div>
        )}
        {mobileScreen && timelineLoaded && canShowMyReview && colleagueLoaded && (
          <div className={css(headerWrapperStyles, { marginBottom: '20px' })}>
            <Profile
              fullName={colleague?.profile?.fullName}
              department={colleague?.profile?.department}
              job={colleague?.profile?.job}
              manager={colleague?.profile?.managerName}
            />
            <div className={css(timelineWrapperStyles)}>
              <StepIndicator
                mainTitle={t('performance_timeline_title', 'Your Contribution timeline')}
                titles={descriptions}
                descriptions={startDates}
                statuses={statuses}
              />
            </div>
          </div>
        )}

        <div className={css(widgetsBlock({ mobileScreen }))}>
          <ShareWidget stopShare={true} customStyle={shareWidgetStyles} />
          <OrganizationWidget
            customStyle={{ flex: '1 1 30%', display: 'flex', flexDirection: 'column' }}
            onClick={() => navigate(buildPath(Page.STRATEGIC_DRIVERS))}
          />
        </div>
      </div>
      {previousReviewFilesModalShow && (
        <PreviousReviewFilesModal
          onOverlayClick={() => setPreviousReviewFilesModalShow(false)}
          colleagueUUID={uuid}
          readonly={true}
        />
      )}
    </div>
  );
};

const widgetStyle: Rule = ({ theme }) => ({
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  letterSpacing: '0px',
});
const secondaryWidgetStyles: Rule = () => ({
  margin: '48px 0px',
  display: 'flex',
  flexWrap: 'wrap',
  height: '176px',
  gap: '8px',
});

const bodyBlockStyles: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  flexDirection: mobileScreen ? 'column-reverse' : 'row',
});

const widgetsBlock: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  width: '100%',
  gap: '10px',
  paddingBottom: mobileScreen ? '20px' : '0px',
});

const headWrapperStyles: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  flex: '1 1 30%',
  width: mobileScreen ? '100%' : '30%',
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: mobileScreen ? '0px' : '20px',
});

const headerWrapperStyles: Rule = () => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const timelineWrapperStyles = {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '20px',
} as Styles;

const shareWidgetStyles = {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '20px',
  width: '100%',
} as Styles;

const bodyWrapperStyles: Rule = () => ({
  display: 'flex',
  flexWrap: 'nowrap',
  alignItems: 'stretch',
  flexDirection: 'column',
  width: '100%',
});

const linkStyles = ({ theme }) => ({
  fontSize: '14px',
  lineHeight: '18px',
  color: theme.colors.tescoBlue,
  background: 'transparent',
});

const arrowLeftStyle: Rule = () => {
  return {
    position: 'fixed',
    top: '34px',
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
    left: '16px',
  };
};

const emptyBlockStyle: Rule = { paddingBottom: '20px' };

export default UserObjectives;
