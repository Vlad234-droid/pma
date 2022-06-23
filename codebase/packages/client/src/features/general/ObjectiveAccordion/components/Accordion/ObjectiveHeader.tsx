import React, { FC } from 'react';
import { Header, HeaderProps } from 'components/Accordion';
import { Status } from 'config/enum';
import StatusBadge from 'components/StatusBadge';
import { ObjectiveTileHeader } from '../Tile';

export const ObjectiveHeader: FC<
  Omit<HeaderProps, 'children'> & {
    title: string;
    subTitle?: string;
    description?: string;
    status?: Status;
  }
> = ({ title, subTitle, description, status, ...rest }) => {
  const statusComponent = status ? <StatusBadge status={status} styles={{ marginRight: '20px' }} /> : null;
  return (
    <Header headingLevel={1} title={title} status={status} component={statusComponent} {...rest}>
      <ObjectiveTileHeader {...{ subTitle, description, withSpacing: false }} />
    </Header>
  );
};
