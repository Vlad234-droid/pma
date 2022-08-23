import React, { FC } from 'react';
import { Header, HeaderProps } from 'components/Accordion';
import { useTranslation } from 'components/Translation';
import { Status } from 'config/enum';
import { StatusBadge } from '../StatusBadge';
import { ObjectiveTileHeader } from 'features/general/Objectives/components/Tile';

export const ObjectiveHeader: FC<
  Omit<HeaderProps, 'children'> & {
    title: string;
    subTitle?: string;
    description?: string;
    lastUpdatedTime?: string;
    status?: Status;
  }
> = ({ title, subTitle, description, status, lastUpdatedTime, ...rest }) => {
  const { t } = useTranslation();
  const text =
    status === Status.WAITING_FOR_APPROVAL
      ? t('submitted_date', { date: new Date(lastUpdatedTime || '') })
      : t('full_date', { date: new Date(lastUpdatedTime || '') });
  const statusComponent = status ? <StatusBadge status={status} text={text} styles={{ marginRight: '20px' }} /> : null;
  return (
    <Header headingLevel={1} title={title} status={status} component={statusComponent} {...rest}>
      <ObjectiveTileHeader {...{ subTitle, description, withSpacing: false }} />
    </Header>
  );
};
