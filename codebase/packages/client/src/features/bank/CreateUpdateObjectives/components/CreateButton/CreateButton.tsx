import React, { FC, memo } from 'react';
import { Button, Rule, useStyle } from '@pma/dex-wrapper';
import { useNavigate } from 'react-router-dom';
import { IconButton } from 'components/IconButton';
import { useTranslation } from 'components/Translation';
import { ReviewType } from 'config/enum';
import { useSelector } from 'react-redux';
import { getReviewSchema, getTimelinesByReviewTypeSelector, USER } from '@pma/store';
import { buildPath } from 'features/general/Routes';
import { Page } from 'pages';
import { useTimelineContainer } from 'contexts/timelineContext';
import { Timeline } from 'config/types';

export type CreateModalProps = {
  withIcon?: boolean;
};

type Props = CreateModalProps;

const CreateButton: FC<Props> = memo(({ withIcon = false }) => {
  const { t } = useTranslation();
  const { css } = useStyle();
  const navigate = useNavigate();
  const { activeTimelines, currentTimelines } = useTimelineContainer();
  const { code: currentCode } = currentTimelines[ReviewType.QUARTER] || {};
  const { code: activeCode } = activeTimelines[ReviewType.QUARTER] || {};
  const isActive = !!activeCode && activeCode === currentCode;

  const schema = useSelector(getReviewSchema(activeCode));

  const timelinePoints: Timeline[] =
    useSelector(getTimelinesByReviewTypeSelector(ReviewType.QUARTER, USER.current)) || [];

  const timelinePoint: Timeline = timelinePoints.find((timelinePoint) => timelinePoint.code === activeCode) as Timeline;

  const objectivesLen = timelinePoint?.statistics
    ? Object.values(timelinePoint?.statistics).reduce((acc, el) => acc + Number(el.count), 0)
    : 0;

  const { markup = { max: 0, min: 0 } } = schema;
  const canCreateObjectives = objectivesLen < markup.max;

  const isDisabled = !isActive || !canCreateObjectives;

  const handleClick = () => navigate(buildPath(Page.CREATE_OBJECTIVES));

  return (
    <div className={css({ display: 'flex', marginBottom: '20px' })}>
      {withIcon ? (
        <IconButton
          isDisabled={isDisabled}
          customVariantRules={{ default: iconBtnStyle, disabled: iconBtnStyle }}
          onPress={handleClick}
          graphic='add'
          iconProps={{ invertColors: true }}
          iconStyles={iconStyle}
        >
          {t('create_priorities', 'Create priorities')}
        </IconButton>
      ) : (
        <Button styles={[buttonStyle]} onPress={handleClick} isDisabled={isDisabled}>
          {t('create_priorities', 'Create priorities')}
        </Button>
      )}
    </div>
  );
});

const iconBtnStyle: Rule = ({ theme }) => ({
  ...theme.font.fixed.f16,
  letterSpacing: '0px',
  padding: '0 16px',
  display: 'flex',
  height: '40px',
  paddingLeft: '12px',
  paddingRight: '12px',
  borderRadius: '20px',
  justifyContent: 'center',
  alignItems: 'center',
  outline: 0,
  background: theme.colors.tescoBlue,
  color: theme.colors.white,
  cursor: 'pointer',
});

const iconStyle: Rule = {
  marginRight: '10px',
};

const buttonStyle: Rule = ({ theme }) => ({
  border: `${theme.border.width.b2} solid ${theme.colors.white}`,
  ...theme.font.fixed.f14,
  letterSpacing: '0px',
});

export default CreateButton;
