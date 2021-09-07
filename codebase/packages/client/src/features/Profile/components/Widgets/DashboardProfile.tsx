import React, { FC, HTMLProps } from 'react';
import { Icon, useStyle, Styles, Rule } from '@dex-ddl/core';
import { TileWrapper } from 'components/Tile';
import { Avatar } from 'components/Avatar';
import { TooltipWrapper as Tooltip } from 'components/Tooltip';

export type DashboardProfileProps = {};

type Props = HTMLProps<HTMLInputElement> & DashboardProfileProps;

const wrapperStyle = {
  padding: '20px',
} as Styles;

const headStyle = {
  display: 'flex',
  alignItems: 'flex-start',
} as Styles;

const headerBlockStyle = {
  display: 'grid',
  padding: '0 20px',
  alignSelf: 'center',
} as Styles;

const bodyBlockStyle = {
  minWidth: '200px',
  display: 'grid',
  paddingRight: '20px',
  paddingTop: '14px',
} as Styles;

const titleStyle: Rule = ({ theme }) =>
  ({
    fontStyle: 'normal',
    fontWeight: `${theme.font.weight.bold}`,
    fontSize: '20px',
    lineHeight: '24px',
  } as Styles);

const descriptionStyle = {
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
} as Styles;

const bodyStyle = {
  flexWrap: 'wrap',
  gap: '16px 8px',
  alignItems: 'center',
  display: 'inline-flex',
} as Styles;

const DashboardProfile: FC<Props> = () => {
  const { css } = useStyle();
  return (
    <TileWrapper>
      <div className={css(wrapperStyle)}>
        <div className={css(headStyle)}>
          <Avatar size={65} />
          <div className={css(headerBlockStyle)}>
            <span className={css(titleStyle)}>Jane Jefferies</span>
            <span className={css(descriptionStyle)}>Bakery</span>
          </div>
        </div>
        <div className={css(bodyStyle)}>
          <div className={css(bodyBlockStyle)}>
            <span className={css(titleStyle)}>Line manager</span>
            <span className={css(descriptionStyle)}>Justin Thomas</span>
          </div>
          <div className={css(bodyBlockStyle)}>
            <span className={css(titleStyle)}>Function</span>
            <span className={css(descriptionStyle)}>Store</span>
          </div>
          <div className={css(bodyBlockStyle)}>
            <span className={css(titleStyle)}>
              Business unit bonus
              <span style={{ margin: '5px' }}>
                <span style={{ top: '5px', position: 'relative' }}>
                  <Tooltip text='Accumsan proin ut in convallis eget turpis a pellentesque.'>
                    <Icon graphic='information' />
                  </Tooltip>
                </span>
              </span>
            </span>
            <span className={css(descriptionStyle)}>CS 123</span>
          </div>
        </div>
      </div>
    </TileWrapper>
  );
};

export default DashboardProfile;
