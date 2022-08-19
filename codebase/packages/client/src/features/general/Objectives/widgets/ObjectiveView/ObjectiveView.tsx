import React, { FC } from 'react';
import { theme } from '@pma/dex-wrapper';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getTimelineByReviewTypeSelector, metaPDPSelector, timelineTypesAvailabilitySelector } from '@pma/store';
import { ReviewType, Tenant } from 'config/enum';
import Spinner from 'components/Spinner';
import { USER } from 'config/constants';
import { useTenant } from 'features/general/Permission';
import { getTescoContent } from 'features/general/MainWidget/getTescoContent';
import { getTescoBankContent } from 'features/bank/MainWidget';
import { useTranslation } from 'components/Translation';
import { buildPath } from 'features/general/Routes';
import MainWidget from '../../components/MainWidget';

const ObjectiveView: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const timelineObjective = useSelector(getTimelineByReviewTypeSelector(ReviewType.OBJECTIVE, USER.current));
  const timelineMYR = useSelector(getTimelineByReviewTypeSelector(ReviewType.MYR, USER.current));
  const timelineTypes = useSelector(timelineTypesAvailabilitySelector(USER.current));
  const meta = useSelector(metaPDPSelector);

  const { statistics, summaryStatus: status } = timelineObjective;
  const date = timelineMYR?.startTime || null;
  const canShowObjectives = timelineTypes[ReviewType.OBJECTIVE];

  if (!canShowObjectives) return null;
  if (meta.loading) return <Spinner />;

  const tenant = useTenant();
  //TODO: move this logic to separate features
  const getContent = tenant === Tenant.GENERAL ? getTescoContent : getTescoBankContent;

  const { subTitle, description, buttonText, backgroundColor, disabled, viewPage } = getContent(
    { status, nextReviewDate: date },
    t,
  );

  const handleClick = () => {
    navigate(buildPath(viewPage), { state: { backPath: pathname } });
  };

  return (
    <MainWidget
      status={status}
      onClick={handleClick}
      subTitle={subTitle}
      description={description}
      buttonText={buttonText}
      backgroundColor={backgroundColor}
      disabled={disabled}
      customStyle={{
        flex: '4 1 500px',
        fontSize: theme.font.fixed.f16.fontSize,
        lineHeight: theme.font.fixed.f16.lineHeight,
        letterSpacing: '0px',
      }}
    />
  );
};

export default ObjectiveView;
