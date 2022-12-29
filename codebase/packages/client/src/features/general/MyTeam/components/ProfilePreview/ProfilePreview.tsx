import React, { FC } from 'react';
import { colors, Rule, useStyle } from '@pma/dex-wrapper';
import { useLocation, useNavigate } from 'react-router-dom';

import { Icon, getIcon } from 'components/Icon';
import { ExpandButton } from 'components/Accordion';
import { Status } from 'config/enum';
import { Page } from 'pages/general/types';
import { paramsReplacer } from 'utils';
import { buildPath } from 'features/general/Routes';

import { Employee } from 'config/types';
import { useTranslation } from 'components/Translation';
import ColleagueInfo from 'components/ColleagueInfo';

type Props = {
  status: Status;
  employee: Employee;
  fullTeamView?: boolean;
  rating?: string;
  showCalibrationRating?: boolean;
  onClick?: () => void;
};

const ProfilePreview: FC<Props> = ({
  status,
  employee,
  fullTeamView = false,
  showCalibrationRating = false,
  onClick,
}) => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [graphics, color, title] = getIcon(status, t);

  const viewUserObjectives = (uuid: string) => {
    onClick && onClick();
    navigate(buildPath(paramsReplacer(`${Page.USER_REVIEWS}`, { ':uuid': uuid })), {
      state: {
        backPath: `${pathname}`,
      },
    });
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
          {showCalibrationRating && (
            <div className={css(iconWrapperStyles)}>
              <Icon graphic={'rating'} color={'pending'} title={'calibration'} />
            </div>
          )}
          <div className={css(iconWrapperStyles)}>
            <Icon graphic={graphics} fill={color} title={title} testId='timeline-icon' />
          </div>
        </div>
        <div className={css({ display: 'flex' })}>
          <button onClick={() => viewUserObjectives(employee.uuid)} className={css(buttonStyles)}>
            {t('view_profile', 'View profile')}
          </button>
          <div className={css(expandButtonStyles)}>
            <ExpandButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePreview;

const wrapperStyles: Rule = {
  padding: '24px',
  display: 'flex',
};

const contentStyles: Rule = () => {
  const { matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true, medium: true });

  return {
    marginLeft: 'auto',
    display: 'flex',
    flexDirection: mobileScreen ? 'column' : 'row',
    alignItems: 'center',
    justifyContent: 'center',
  };
};

const buttonWrapperStyles: Rule = () => {
  const { matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true, medium: true });

  return {
    display: 'flex',
    padding: mobileScreen ? '0 0 12px 0' : '12px 12px',
  };
};

const buttonStyles: Rule = ({ theme }) => ({
  fontSize: `${theme.font.fixed.f16.fontSize}`,
  lineHeight: `${theme.font.fixed.f16.lineHeight}`,
  letterSpacing: '0px',
  color: colors.tescoBlue,
  cursor: 'pointer',
  border: 'none',
  backgroundColor: 'transparent',
  whiteSpace: 'nowrap',
});

const iconWrapperStyles: Rule = { padding: '0px 12px' };

const expandButtonStyles: Rule = { paddingLeft: '12px' };

const ratingStyles: Rule = ({ theme }) => ({
  fontSize: theme.spacing.s4,
  lineHeight: `${theme.font.fixed.f16.lineHeight}`,
  letterSpacing: '0px',
  color: theme.colors.tescoBlue,
});
