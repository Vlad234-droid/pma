import React from 'react';

import { useStyle, CreateRule, Rule } from '@pma/dex-wrapper';

type Props = {
  videoId: string;
  aspectRatio?: number;
};

export const TEST_ID = 'test-id-iframe';

const WistiaPlayer: React.FC<Props> = ({ videoId, aspectRatio = 16 / 9 }) => {
  const { css } = useStyle();

  const sourceUrl = `https://fast.wistia.net/embed/iframe/${videoId}?videoFoam=true`;

  return (
    <div data-test-id={TEST_ID} className={css(containerRule({ aspectRatio }))}>
      <iframe
        src={sourceUrl}
        frameBorder='0'
        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        className={css(frameRule)}
      />
    </div>
  );
};

type ContainerProps = {
  aspectRatio: number;
};

const containerRule: CreateRule<ContainerProps> =
  ({ aspectRatio }) =>
  ({ theme }) => ({
    height: 0,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: theme.colors.backgroundDark,
    /* matches size to video aspect ratio */
    padding: `${(1 / aspectRatio) * 100}% 0 0 0`,
  });

const frameRule: Rule = {
  position: 'absolute',
  top: '-4px',
  right: 'auto',
  bottom: 'auto',
  left: '-4px',
  width: 'calc(100% + 8px)',
  height: 'calc(100% + 8px)',
};

export default WistiaPlayer;
