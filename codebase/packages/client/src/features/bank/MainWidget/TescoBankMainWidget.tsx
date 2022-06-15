import React, { FC } from 'react';
import { MainWidget, ContentProps } from 'features/general/MainWidget';
import { useTranslation } from 'components/Translation';
import { getTescoBankContent } from './getTescoBankContent';

type Props = ContentProps & {
  customStyle?: React.CSSProperties | {};
};

export const TescoBankMainWidget: FC<Props> = (props) => {
  const { t } = useTranslation();
  const content = getTescoBankContent(props, t);

  return <MainWidget {...props} {...content} />;
};
