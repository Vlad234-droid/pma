import React, { FC } from 'react';
import { Rule } from '@dex-ddl/core';

import { IconButton } from 'components/IconButton';

type Props = {
  onClick: () => void;
};

const InfoIcon: FC<Props> = ({ onClick }) => <IconButton graphic='information' onPress={onClick} />;

export default InfoIcon;
