import React, { FC } from 'react';
import { Status } from 'config/enum';
import { useStyle, Rule, CreateRule } from '@dex-ddl/core';

import { CreateButton } from '../CreateButton';
import { TileWrapper } from 'components/Tile';
import { Button } from 'components/Button';
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

  const isStateless = !status;
  const isDraft = status === Status.DRAFT;
  const isPending = status === Status.PENDING;
  const isApproved = status === Status.APPROVED;
  const notApproved = !isApproved;

  const getContent = (): [Graphics, boolean, string] => {
    switch (true) {
      case isDraft:
        return ['roundPencil', true, `${count} objective(s) saved as a draft`];
      case isApproved:
        return [
          'roundTick',
          false,
          `Well done! All ${count} objective(s) have been approved. Your mid year review is scheduled for 06 Sep 2022.`,
        ];
      case isPending:
        return ['roundClock', true, `${count} objective(s) are waiting for approval`];
      case isStateless:
      default:
        return ['add', false, 'Create my objectives'];
    }
  };

  const [graphic, withStroke, description] = getContent();

  const handleClick = () => {
    notApproved && onClick();
  };

  return (
    <TileWrapper customStyle={customStyle}>
      <div className={css(wrapperStyle({ clickable: notApproved }))} onClick={handleClick} data-test-id={TEST_ID}>
        <div className={css(headStyle)}>
          <div>
            <Icon graphic='document' invertColors={notApproved} iconStyles={iconStyles} />
          </div>
          <div className={css(headerBlockStyle)}>
            <span className={css(titleStyle)}>My business objectives</span>
            <span className={css(descriptionStyle)}>
              <span className={css(iconStyle)}>
                {withStroke ? (
                  <RoundIcon graphic={graphic} iconProps={{ invertColors: true }} />
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
                <CreateButton />
              ) : (
                <Button
                  styles={{
                    border: `1px solid ${theme.colors.white}`,
                    fontSize: '14px',
                  }}
                  onPress={() => alert('Test')}
                >
                  View and Edit
                </Button>
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
    backgroundColor: clickable ? theme.colors.tescoBlue : theme.colors.white,
    color: clickable ? theme.colors.white : theme.colors.tescoBlue,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    flexDirection: 'column',
    display: 'flex',
    ...(clickable && {
      cursor: 'pointer',
      '&:hover': {
        opacity: 0.8,
      },
    }),
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
