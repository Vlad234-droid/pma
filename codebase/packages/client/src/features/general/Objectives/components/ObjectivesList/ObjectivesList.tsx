import React, { FC } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';

import * as T from 'features/general/Review/types';

import { ObjectiveTileHeader, ObjectiveDetails } from '../Tile';

export type ObjectivesListProps = {
  objectives: T.Objective[];
};

const ObjectivesList: FC<ObjectivesListProps> = ({ objectives }) => {
  const { css } = useStyle();

  return (
    <div>
      {objectives.map(({ id, title, subTitle, description, explanations }) => {
        return (
          <div key={id} className={css(divStyles)}>
            <ObjectiveTileHeader {...{ title, subTitle, description }} withSpacing={true} />
            <ObjectiveDetails explanations={explanations} />
          </div>
        );
      })}
    </div>
  );
};

const divStyles: Rule = ({ theme }) => ({
  // @ts-ignore
  borderTop: `2px solid ${theme.colors.lightGray}`,
  paddingTop: '26px',
  marginTop: '25px',
});

export default ObjectivesList;
