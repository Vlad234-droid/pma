import React, { FC } from 'react';
import { useStyle, Rule } from '@dex-ddl/core';

import { BasicTile } from 'components/Tile';
import { useTranslation } from 'components/Translation';

import contributionImage from 'images/Contribution.jpg';
import checkImage from 'images/Check.jpg';
import feedbackImage from 'images/Feedback.jpg';
import learningImage from 'images/Learning.jpg';

type Props = {
  basicTileStyle: Rule;
};

const Resources: FC<Props> = ({ basicTileStyle }) => {
  const { css } = useStyle();
  const { t } = useTranslation();

  return (
    <>
      <div data-test-id='personal-contribution' className={css(basicTileStyle)} onClick={console.log}>
        <BasicTile
          img={contributionImage}
          title={t('your_contribution', 'Your Contribution')}
          customStyle={{
            height: '100%',
          }}
        >
          <div className={css(contentStyle)}>Coming soon</div>
        </BasicTile>
      </div>
      <div data-test-id='personal-conversation' className={css(basicTileStyle)} onClick={console.log}>
        <BasicTile
          img={checkImage}
          title={t('everyday_conversations', 'Everyday conversations')}
          customStyle={{
            height: '100%',
          }}
        >
          <div className={css(contentStyle)}>Coming soon</div>
        </BasicTile>
      </div>
      <div data-test-id='feedback' className={css(basicTileStyle)}>
        <BasicTile
          img={feedbackImage}
          title={t('feedback_tesco', 'Feedback at Tesco')}
          customStyle={{
            height: '100%',
          }}
        >
          <div className={css(contentStyle)}>Coming soon</div>
        </BasicTile>
      </div>
      <div data-test-id='learning' className={css(basicTileStyle)}>
        <BasicTile
          img={learningImage}
          title={t('learning', 'Learning')}
          customStyle={{
            height: '100%',
          }}
        >
          <div className={css(contentStyle)}>Coming soon</div>
        </BasicTile>
      </div>
    </>
  );
};

export default Resources;

const contentStyle: Rule = {
  fontWeight: 'bold',
  fontStyle: 'italic',
};
