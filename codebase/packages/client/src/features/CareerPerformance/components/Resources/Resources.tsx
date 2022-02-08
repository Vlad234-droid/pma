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
      <div data-test-id='personal' className={css(basicTileStyle)} onClick={console.log}>
        <BasicTile
          hover={true}
          img={contributionImage}
          title={t('Your Contribution')}
          description={t('Click here to find the Your Contribution Guide.')}
          customStyle={{
            height: '100%',
          }}
        />
      </div>
      <div data-test-id='personal' className={css(basicTileStyle)} onClick={console.log}>
        <BasicTile
          hover={true}
          img={checkImage}
          title={t('Everyday conversations')}
          description={t('Useful guidance on having great performance conversations.')}
          customStyle={{
            height: '100%',
          }}
        />
      </div>
      <div data-test-id='feedback' className={css(basicTileStyle)}>
        <BasicTile
          hover={true}
          img={feedbackImage}
          title={t('Feedback at Tesco')}
          description={t('Learn more about giving and receiving great feedback.')}
          customStyle={{
            height: '100%',
          }}
        />
      </div>
      <div data-test-id='feedback' className={css(basicTileStyle)}>
        <BasicTile
          hover={true}
          img={learningImage}
          title={t('Learning')}
          description={t('Click here to find the Your Contribution Guide.')}
          customStyle={{
            height: '100%',
          }}
        />
      </div>
    </>
  )
};

export default Resources;
