import React, { FC } from 'react';

import { IconButton } from 'components/IconButton';

type Props = {
  onClick: () => void;
};

const InfoIcon: FC<Props> = ({ onClick }) => (
  <IconButton data-test-id='info-icon' graphic='information' onPress={onClick} />
);

export default InfoIcon;
