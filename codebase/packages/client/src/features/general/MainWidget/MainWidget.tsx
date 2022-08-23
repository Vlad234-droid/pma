import React, { FC } from 'react';
import { getTescoContent } from './getTescoContent';
import { MainWidgetBase, MainWidgetBaseProps } from './MainWidgetBase';
import { getTescoBankContent } from 'features/bank/MainWidget';
import { useTenant } from 'features/general/Permission';
import { Tenant } from 'config/enum';

/**
 * @deprecated The component should not be used
 */
export const MainWidget: FC<Omit<MainWidgetBaseProps, 'getContent'>> = (props) => {
  const tenant = useTenant();
  const getContent = tenant === Tenant.GENERAL ? getTescoContent : getTescoBankContent;

  return <MainWidgetBase getContent={getContent} {...props} />;
};
