import React, { FC } from 'react';
import { useStyle, Rule } from '@dex-ddl/core';

import WistiaPlayer from 'components/WistiaPlayer';
import { VideoId } from '../../config';

type Props = {
  videoId: VideoId;
  aspectRatio?: number;
  customStylesRule?: Rule;
};

const VideoPlayer: FC<Props> = ({ customStylesRule = {}, ...videoPlayerProps }) => {
  const { css } = useStyle();

  return (
    <div className={css(wrapperRule, customStylesRule)}>
      <WistiaPlayer {...videoPlayerProps} />
    </div>
  );
};

const wrapperRule: Rule = {
  borderRadius: '5px',
  overflow: 'hidden',
};

export default VideoPlayer;
