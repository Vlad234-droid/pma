import React, { FC, useContext } from 'react';
import { getTescoContent } from './getTescoContent';
import { MainWidgetBase, MainWidgetBaseProps } from './MainWidgetBase';
import { getTescoBankContent } from 'features/bank/MainWidget';
import { getTenant, Tenant } from 'utils';

export const MainWidget: FC<Omit<MainWidgetBaseProps, 'getContent'>> = (props) => {
  const tenant = getTenant();
  const getContent = tenant === Tenant.GENERAL ? getTescoContent : getTescoBankContent;

  return <MainWidgetBase getContent={getContent} {...props} />;
};
