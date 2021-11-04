import React, { FC } from 'react';
import { Trans, useTranslation } from 'components/Translation';
import { Status } from 'config/enum';
import { useStyle, Rule, CreateRule, Colors } from '@dex-ddl/core';

import { CreateButton } from '../Buttons';
import { TileWrapper } from 'components/Tile';
import { Icon, RoundIcon, Graphics } from 'components/Icon';

export type Props = {
  onClick: () => void;
  status?: Status;
  customStyle?: React.CSSProperties | {};
  count?: number;
};

export const TEST_ID = 'main-widget';

const MainWidget: FC<Props> = ({ customStyle, onClick, status, count = 0 }) => {
  const { css, theme } = useStyle();
  const { t } = useTranslation();

  const isStateless = !status;
  const isDraft = status === Status.DRAFT;
  const isPending = status === Status.PENDING || status === Status.WAITING_FOR_APPROVAL;
  const isApproved = status === Status.APPROVED;
  const notApproved = !isApproved;
  const backgroundColor: Colors = notApproved ? 'tescoBlue' : 'white';
  const getContent = (): [Graphics, boolean, string] => {
    switch (true) {
      case isDraft:
        return ['roundPencil', true, t('objective_is_draft', `${count} objective(s) saved as a draft`, { count })];
      case isApproved:
        return [
          'roundTick',
          false,
          t(
            'objective_is_approved',
            `Well done! All ${count} objective(s) have been approved. Your mid year review is scheduled for 06 Sep 2022.`,
            { count },
          ),
        ];
      case isPending:
        return [
          'roundClock',
          true,
          t('objective_is_pending', `${count} objective(s) are waiting for approval`, { count }),
        ];
      case isStateless:
      default:
        return ['add', false, t('create_my_objectives', 'Create my objectives')];
    }
  };

  const [graphic, withStroke, description] = getContent();

  const handleClick = () => {
    notApproved && onClick();
  };

  return (
    <TileWrapper customStyle={customStyle} hover={true} background={backgroundColor}>
      <div className={css(wrapperStyle({ clickable: notApproved }))} onClick={handleClick} data-test-id={TEST_ID}>
        <div className={css(headStyle)}>
          <div>
            <Icon graphic='document' invertColors={notApproved} iconStyles={iconStyles} />
          </div>
          <div className={css(headerBlockStyle)}>
            <span className={css(titleStyle)}>
              <Trans i18nKey='my_business_objectives'>My Business Objectives</Trans>
            </span>
            <span className={css(descriptionStyle)}>
              <span className={css(iconStyle)}>
                {withStroke ? (
                  <RoundIcon graphic={graphic} iconProps={{ invertColors: true }} strokeWidth={3} />
                ) : (
                  <Icon graphic={graphic} invertColors />
                )}
              </span>
              {description}
            </span>
          </div>
        </div>
        {notApproved && (
          <div className={css(bodyStyle)}>
            <div className={css(bodyBlockStyle)}>
              {isStateless ? (
                <CreateButton buttonText='Create objectives' />
              ) : (
                <CreateButton buttonText='View and edit' />
              )}
            </div>
          </div>
        )}
      </div>
    </TileWrapper>
  );
};

const wrapperStyle: CreateRule<{ clickable: boolean }> =
  ({ clickable }) =>
  ({ theme }) => ({
    padding: '24px 30px',
    color: clickable ? theme.colors.white : theme.colors.tescoBlue,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    flexDirection: 'column',
    display: 'flex',
  });

const iconStyles: Rule = () => ({
  width: '52px',
  height: '70px',
  fontStyle: 'normal',
  lineHeight: 0,
  textAlign: 'center',
  textTransform: 'none',
});

const headStyle: Rule = {
  display: 'flex',
};

const headerBlockStyle: Rule = {
  display: 'flex',
  marginLeft: '30px',
  flexDirection: 'column',
};

const bodyBlockStyle: Rule = {
  display: 'grid',
  paddingTop: '14px',
};

const titleStyle: Rule = {
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '20px',
  marginBottom: '12px',
};

const descriptionStyle: Rule = {
  position: 'relative',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '16px',
  paddingLeft: '33px',
};

const iconStyle: Rule = () => ({
  display: 'flex',
  position: 'absolute',
  left: 0,
});

const bodyStyle: Rule = {
  flexWrap: 'wrap',
  gap: '16px 8px',
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'flex-end',
};

export default MainWidget;
