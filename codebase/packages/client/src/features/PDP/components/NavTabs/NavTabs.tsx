import React, { FC } from 'react';
import { useStyle, theme, Rule } from '@dex-ddl/core';
import colors from 'theme/colors';
import { useNavigate } from 'react-router';
import { buildPath } from 'features/Routes';
import { Page } from 'pages';

type Props = {
  currentUUID: string | undefined;
  maxGoals: number;
  goalNum: number;
  goalList: any;
  currentGoal: any;
  setCurrentGoal: (obj: any) => void;
};

const NavTabs: FC<Props> = ({ maxGoals, currentUUID, goalNum, currentGoal, goalList, setCurrentGoal }) => {
  const { css } = useStyle();
  const navigate = useNavigate();
  const isCurrentGoal = Object.keys(currentGoal).length > 0;

  return (
    <div className={css(goalListBlock)}>
      {goalList.length < 1 || !goalList ? (
        <div className={`${css(goal)} ${css(defaultGoalItem)}`}>Goal 1</div>
      ) : (
        goalList.map((el, idx) => {
          return (
            <div className={css(goalListBlock)} key={el.uuid + idx}>
              <div
                key={el?.uuid}
                onClick={() => setCurrentGoal(el)}
                className={`${css(goal)} ${
                  idx <= goalNum && currentGoal?.uuid !== el.uuid ? css(activeGoalItem) : css(defaultGoalItem)
                }`}
              >
                Goal {idx + 1}
              </div>
              {idx === goalNum && idx + 1 < maxGoals && (
                <div
                  onClick={() => {
                    setCurrentGoal({});
                    if (currentUUID) {
                      navigate(buildPath(Page.CREATE_PERSONAL_DEVELOPMENT_PLAN));
                    }
                  }}
                  className={`${css(goal)} ${isCurrentGoal ? css(activeGoalItem) : css(defaultGoalItem)}`}
                >
                  Goal {idx + 2}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

const goalListBlock = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexDirection: 'row',
  paddingBottom: '32px',
} as Rule;

const goal = {
  fontFamily: 'TESCO Modern", Arial, sans-serif',
  fontSize: `${theme.font.fixed.f16}`,
  fontStyle: 'normal',
  fontWeight: `${theme.font.weight.bold}`,
  lineHeight: '20px',
  letterSpacing: '0px',
  paddingRight: '16px',
} as Rule;

const defaultGoalItem = {
  color: `${theme.colors.tescoBlue}`,
  cursor: 'pointer',
} as Rule;

const activeGoalItem = {
  color: `${colors.tescoLightBlue}`,
  cursor: 'pointer',
} as Rule;

export default NavTabs;
