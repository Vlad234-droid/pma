import React, { FC } from 'react';
import { colors, Rule, useStyle } from '@dex-ddl/core';
import { useNavigate } from 'react-router-dom';

import { Icon, getIcon } from 'components/Icon';
import { ExpandButton } from 'components/Accordion';
import { Rating, Status } from 'config/enum';
import { Page } from 'pages/types';
import { paramsReplacer } from 'utils';
import { buildPath } from 'features/Routes';
import { Employee } from 'config/types';
import { useTranslation } from 'components/Translation';

import ColleagueInfo from '../ColleagueInfo';

type Props = {
  status: Status;
  employee: Employee;
  fullTeamView?: boolean;
  rating?: Rating;
  onClick?: () => void;
};

const TimelinePreview: FC<Props> = ({
  status,
  employee,
  fullTeamView = false,
  rating,
  onClick,
}) => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [graphics, color] = getIcon(status);

  const viewUserObjectives = (uuid: string) => {
    onClick && onClick();
    navigate(buildPath(paramsReplacer(`${Page.USER_OBJECTIVES}`, { ':uuid': uuid })));
  };

  return (
    <div data-test-id='timeline-preview' className={css(wrapperStyles)} onClick={onClick}>
      <ColleagueInfo
        firstName={employee.firstName}
        lastName={employee.lastName}
        jobName={employee.jobName}
        businessType={employee.businessType}
        manager={fullTeamView ? employee.lineManager : undefined}
      />
      <div className={css(contentStyles)}>
        <div className={css(buttonWrapperStyles)}>
          {rating ? (
            <span className={css(ratingStyles)}>{rating}</span>
          ) : (
            <button
              onClick={() => viewUserObjectives(employee.uuid)}
              className={css(buttonStyles)}
            >
              {t('view_profile', 'View profile')}
            </button>
          )}
        </div>
        {!fullTeamView && !rating && (
          <div className={css(iconWrapperStyles)}>
            <Icon graphic={graphics} fill={color} testId='timeline-icon' />
          </div>
        )}
        {!rating && (
          <div className={css(expandButtonStyles)}>
            <ExpandButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelinePreview;

const wrapperStyles: Rule = {
  padding: '24px',
  display: 'flex',
};

const contentStyles: Rule = {
  marginLeft: 'auto',
  display: 'flex',
  alignItems: 'center',
};

const buttonWrapperStyles: Rule = { padding: '12px 12px' };

const buttonStyles: Rule = ({ theme }) => ({
  fontSize: `${theme.font.fixed.f16.fontSize}`,
  lineHeight: `${theme.font.fixed.f16.lineHeight}`,
  color: colors.tescoBlue,
  cursor: 'pointer',
  border: 'none',
  backgroundColor: 'transparent',
});

const iconWrapperStyles: Rule = { padding: '0px 12px' };

const expandButtonStyles: Rule = { paddingLeft: '12px' };

const ratingStyles: Rule = ({ theme }) => ({
  fontSize: theme.spacing.s4,
  lineHeight: `${theme.font.fixed.f16.lineHeight}`,
  color: theme.colors.tescoBlue,
});
