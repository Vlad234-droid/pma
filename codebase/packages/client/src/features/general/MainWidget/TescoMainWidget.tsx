import React, { FC } from 'react';
import { MainWidget, ContentProps } from 'features/general/MainWidget';
import { useTranslation } from 'components/Translation';
import { getTescoContent } from './getTescoContent';

type Props = ContentProps & {
  customStyle?: React.CSSProperties | {};
};

const TescoMainWidget: FC<Props> = (props) => {
  const { t } = useTranslation();
  const content = getTescoContent(props, t);

  return <MainWidget {...props} {...content} />;
};

export default TescoMainWidget;
