import React, { FC } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { ExpandButton } from 'components/Accordion';
import { formatToRelativeDate } from 'utils';
import defaultImg from 'images/default.png';

export const TEST_ID = 'expand_button';

type ProfileProps = {
  firstName: string;
  lastName: string;
  job: string;
  department: string;
  updatedTime: string;
  onExpandPress?: (expanded: boolean) => void;
};

const FeedbackProfileInfo: FC<ProfileProps> = ({
  firstName,
  lastName,
  job,
  department,
  updatedTime,
  onExpandPress,
}) => {
  const { css } = useStyle();
  return (
    <div className={css(draftStyles)}>
      <div className={css(blockInfo)}>
        <div className={css({ alignSelf: 'flex-start' })}>
          <img className={css(imgStyle)} src={defaultImg} alt='photo' />
        </div>
        <div className={css({ marginLeft: '16px' })}>
          <h3 className={css(namesStyle)}>{`${firstName ?? ''} ${lastName ?? ''}`}</h3>
          <p className={css(industryStyle)}>{`${job ?? ''}${department && job ? ',' : ''} ${department ?? ''}`}</p>
        </div>
      </div>
      <div className={css({ display: 'flex', justifyContent: 'center', alignItems: 'center' })}>
        <div className={css({ marginRight: '26px' })}>{formatToRelativeDate(updatedTime)}</div>
        <div data-test-id={TEST_ID}>
          {onExpandPress ? (
            <ExpandButton
              onClick={(expanded) => {
                onExpandPress(expanded);
              }}
            />
          ) : (
            <ExpandButton />
          )}
        </div>
      </div>
    </div>
  );
};

const draftStyles: Rule = {
  display: 'flex',
  justifyContent: 'space-between',
};

const blockInfo: Rule = {
  display: 'inline-flex',
  alignItems: 'center',
};

const imgStyle: Rule = {
  width: '48px',
  height: '48px',
  borderRadius: '50%',
};

const namesStyle: Rule = ({ theme }) => ({
  fontWeight: theme.font.weight.bold,
  fontSize: '18px',
  lineHeight: '22px',
  margin: theme.spacing.s0,
  color: theme.colors.tescoBlue,
});

const industryStyle: Rule = ({ theme }) => ({
  fontWeight: 'normal',
  fontSize: theme.spacing.s4,
  lineHeight: theme.spacing.s5,
  margin: `4px ${theme.spacing.s0} ${theme.spacing.s0} ${theme.spacing.s0}`,
});

export default FeedbackProfileInfo;
