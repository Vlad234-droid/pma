import React, { FC, useEffect } from 'react';
import { Trans, useTranslation } from 'components/Translation';
import { useStyle, Rule, Button, Styles, colors } from '@pma/dex-wrapper';

import { TileWrapper } from 'components/Tile';
import { Icon, Graphics } from 'components/Icon';
import useDispatch from 'hooks/useDispatch';
import {
  OrgObjectiveActions,
  orgObjectivesSelector,
  colleagueCycleSelector,
  colleagueCycleYearSelector,
} from '@pma/store';
import { useSelector } from 'react-redux';
import { Status } from 'config/enum';

export type Props = {
  onClick: () => void;
  customStyle?: React.CSSProperties | {};
};

export const TEST_ID = 'organization-widget';
export const CLICK_BUTTON_TEST_ID = 'click-button-test-id';

const OrganizationWidget: FC<Props> = ({ onClick, customStyle }) => {
  const { css, theme } = useStyle();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const cycle = useSelector(colleagueCycleSelector);
  const cycleYear = useSelector(colleagueCycleYearSelector);
  const orgObjectives = useSelector(orgObjectivesSelector) || [];
  const hasObjectives = !!orgObjectives.length;
  const isCompleted = cycle?.status && [Status.COMPLETED, Status.FINISHING].includes(cycle.status);

  const getContent = (): [Graphics, string, string] => {
    return [
      'globe',
      t('organization_objectives_description', 'Your organization has 6 drivers share to all colleagues'),
      t('view_objectives', 'View'),
    ];
  };

  const [graphic, description, actionTitle] = getContent();

  useEffect(() => {
    if (!isCompleted) {
      dispatch(OrgObjectiveActions.getOrgPublishedObjectives({ year: cycleYear }));
    }
  }, [isCompleted]);

  if (isCompleted || !hasObjectives) return null;

  return (
    <TileWrapper customStyle={{ ...customStyle }}>
      <div className={css(wrapperStyle)} data-test-id={TEST_ID}>
        <div className={css(headStyle)}>
          <div className={css(headerBlockStyle)}>
            <div className={css({ display: 'flex', alignItems: 'center' })}>
              <Icon
                graphic={graphic}
                iconStyles={{ verticalAlign: 'middle', margin: '0px 10px 0px 0px' }}
                backgroundRadius={10}
              />
              <span className={css(titleStyle)}>
                <Trans i18nKey='organization_objectives'>Strategic drivers</Trans>
              </span>
            </div>
            <span className={css(descriptionStyle)}>{description}</span>
          </div>
        </div>
        <div className={css(bodyStyle)}>
          <div className={css(bodyBlockStyle)}>
            <Button
              data-test-id={CLICK_BUTTON_TEST_ID}
              mode='inverse'
              styles={[btnStyle({ theme }) as Styles]}
              onPress={onClick}
            >
              {actionTitle}
            </Button>
          </div>
        </div>
      </div>
    </TileWrapper>
  );
};

const wrapperStyle: Rule = ({ theme }) => ({
  padding: '16px',
  color: theme.colors.tescoBlue,
  width: '100%',
  height: '100%',
  justifyContent: 'space-between',
  flexDirection: 'column',
  display: 'flex',
});

const headStyle: Rule = {
  display: 'flex',
};

const headerBlockStyle: Rule = {
  display: 'flex',
  flexDirection: 'column',
};

const bodyBlockStyle: Rule = {
  display: 'grid',
  paddingTop: '14px',
};

const titleStyle: Rule = ({ theme }) => ({
  fontStyle: 'normal',
  fontWeight: 'bold',
  ...theme.font.fixed.f16,
  letterSpacing: '0px',
});

const descriptionStyle: Rule = ({ theme }) => ({
  marginTop: '15px',
  position: 'relative',
  fontStyle: 'normal',
  fontWeight: 'normal',
  ...theme.font.fixed.f14,
  letterSpacing: '0px',
  color: colors.base,
});

const bodyStyle: Rule = {
  flexWrap: 'wrap',
  gap: '16px 8px',
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'flex-end',
};

const btnStyle = ({ theme }) => ({
  ...theme.font.fixed.f14,
  letterSpacing: '0px',
  color: theme.colors.tescoBlue,
  height: '30px',
  background: 'transparent',
  border: `2px solid ${theme.colors.tescoBlue}`,
});

export default OrganizationWidget;
